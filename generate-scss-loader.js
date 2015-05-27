'use strict';

var utils = require('./module-utils');
var path = require('path');
var fs = require('fs');

var addImportReturnDependency = function(loader, fileName) {
	var fileNameResolved = path.resolve(loader.context, fileName);
	//console.log('\nfileNameResolved: ', fileNameResolved);

	if (fs.existsSync(fileNameResolved)) {
		loader.addDependency(fileNameResolved);
		return '@import "' + fileNameResolved + '";\n';
	} else {
		var msg = 'Could not find file ' + fileName + '. Check your config.';
		throw new Error(msg);
	}
};

module.exports = function(content) {
	this.cacheable(true);
	//console.log(content);

	var config = this.exec(content, this.resourcePath);
	//console.log('\nconfig is ', config);

	if (!config) {
		var msg = "No configuration file specified. Please specify the configuration file, like: 'bourbon-sass-loader!./bourbon.config.js' or use require('bourbon-sass-loader').";
		throw new Error(msg);
	}

	var bourbonPath = utils.getBourbonPath(this.context);
	//console.log('\nbourbonPath is ', bourbonPath);

	if (!config.bourbon) {
		throw new Error('No valid config found. Please check config.bourbon');
	}

	var source = '';
	var key;
	for (key in config.bourbon) {
		if (config.bourbon[key]) {
			source += '@import "' + path.join(bourbonPath, key) + '";\n';
		}
	}

	if (config.neat) {
		var neatPath = utils.getNeatPath(this.context);
		//console.log('neatPath is ', neatPath);

		for (key in config.neat) {
			if (config.neat[key]) {
				source += '@import "' + path.join(neatPath, key) + '";\n';
			}
		}
	}

	if (config.mainSass) {
		source += addImportReturnDependency(this, config.mainSass);
	}

	source = source.replace(/\\/g, '/');
	//console.log("\nGenerated scss file is:\n" + source);
	return source;
};
