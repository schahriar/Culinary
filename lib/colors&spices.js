var colors = require('colors/safe');

var ColorsNSpices = function(string){
	if(string) this.string = string.toString();
	else this.string = " "; // Define empty character
	
	// Colors seems to disable itself on normal behaving environments
	colors.enabled = true;

	return this;
};

var addSpice = function(string, spice) {
	if((!colors[spice])||(!spice)) return string;
	return colors[spice](string);
}

var spice = function() {	
	// Converts arguments to Array
	var args = Array.prototype.slice.apply( arguments );
	var build = this.string;

	if((!this)||(!this.string)) return "";
	
	args.forEach(function(spice) { build = addSpice(build, spice) });

	return build;
}

// Aliases
ColorsNSpices.prototype.spice = spice;
ColorsNSpices.prototype.addStyle = ColorsNSpices.prototype.spice;
ColorsNSpices.prototype.addStyles = ColorsNSpices.prototype.spice;
ColorsNSpices.prototype.setStyle = ColorsNSpices.prototype.spice;
ColorsNSpices.prototype.setStyles = ColorsNSpices.prototype.spice;
//

module.exports.colors = colors;
module.exports.spice = spice;
module.exports.cook = ColorsNSpices;
