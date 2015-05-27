// Copy this to your project
// Convention is to name sass partials to start with an "_"

var bourbonConfig = require('bourbon-sass-loader').bourbonConfig;
var neatConfig = require('bourbon-sass-loader').neatConfig;

module.exports = {

	// jsLoader: 'babel-loader',
	// styleLoader: 'style-loader!css-loader!sass-loader',
	// mainSass: './path/to/_mainSass.scss',

	bourbon: bourbonConfig,
	neat: neatConfig
};
