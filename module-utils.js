'use strict';

var fs = require('fs');
var path = require('path');

var seachModuleRecursive = function(configPath, nLevelsUp, moduleName) {
	if (nLevelsUp > 10) {
		return null;
	}

	var i;
	var levelsUp = configPath;
	for (i = 0; i < nLevelsUp; i++) {
		levelsUp += '/..';
	}

	var parentPath = path.resolve(levelsUp);
	if (parentPath === '/') {
		return null;
	}

	var modulePath = path.resolve(path.join(levelsUp, 'node_modules', moduleName));
	//console.log('try modulePath: ', modulePath);

	if (!fs.existsSync(modulePath)) {
		return seachModuleRecursive(configPath, ++nLevelsUp, moduleName);
	} else {
		return modulePath;
	}
};

var searchModule = function(configPath, moduleName) {
	var modulePath = seachModuleRecursive(configPath, 0, moduleName);
	if (!modulePath) {
		var msg = "Could not find module '" + moduleName + "'. Missing 'npm install " + moduleName + "'?";
		throw new Error(msg);
	}
	return modulePath;
};

module.exports = {
	getBourbonPath: function(configPath) {
		var bourbonPath = searchModule(configPath, 'bourbon');
		return path.join(bourbonPath, 'app', 'assets', 'stylesheets');
	},

	getNeatPath: function(configPath) {
		var neatPath = searchModule(configPath, 'bourbon-neat');
		return path.join(neatPath, 'app', 'assets', 'stylesheets');
	},
};
