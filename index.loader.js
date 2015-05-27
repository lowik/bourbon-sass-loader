'use strict';

module.exports = function(/*content*/) {
};

module.exports.pitch = function(remainingRequest) {
	this.cacheable(true);

	// Webpack 1.7.3 uses this.resourcePath. Leaving in remaining request for possibly older versions of Webpack
	var configFilePath = this.resourcePath || remainingRequest;

	if (!configFilePath) {
		var msg = "No configuration file specified. Please specify the configuration file, like: 'bourbon-sass-loader!./bourbon.config.js' or use require('bourbon-sass-loader').";
		throw new Error(msg);
	}

	var config = require(configFilePath);
	//console.log('\nconfig: ', config);

	var styleLoader = config.styleLoader || 'style-loader!css-loader!sass-loader';

	// Add style loaders before generate scss loader with config file path
	return 'module.exports = require(' + JSON.stringify('-!' + styleLoader + '!' + require.resolve('./generate-scss-loader.js') + '!' + configFilePath) + ');';
};
