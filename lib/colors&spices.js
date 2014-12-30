var decode = require('punycode').ucs2.decode;

var ColorsNSpices = function(string){
	if(string) this.string = string.toString();
	else this.string = " "; // Define empty character

	return this;
};

_spice = function() {	
	// Converts arguments to Array
	var args = Array.prototype.slice.apply( arguments );
	var string = this.string;

	if((!this)||(!this.string)) return "";
	
	var special = this.special || 0, background = this.background || 49, color = this.color || 39;
	var specials = ["reset","bold","bright","dim","strike","strikethrough","hidden","invert","reverse","underscore","underline","blink","italic"];
		
	args.forEach(function(spice){
		var code = undefined;
		if(!spice) return string;
		
		if(specials.indexOf(spice) >= 0) {
			code = _raw.specials[spice.toLowerCase()];
			special += code + ";";
		}else if(spice.substring(0,2) == "bg"){
			if(!_raw[spice.substring(2).toLowerCase()]) return string;

			code = _raw[spice.substring(2).toLowerCase()]['background'];
			background = code;
		}else {
			if(!_raw[spice.toLowerCase()]) return string;

			code = _raw[spice.toLowerCase()]['foreground'];
			color = code;
		}
	});
	
	return (_wrap(string, special, background, color)).toString('uft8');
}

// Aliases
ColorsNSpices.prototype.spice = _spice;
ColorsNSpices.prototype.addStyle = ColorsNSpices.prototype.spice;
ColorsNSpices.prototype.addStyles = ColorsNSpices.prototype.spice;
ColorsNSpices.prototype.setStyle = ColorsNSpices.prototype.spice;
ColorsNSpices.prototype.setStyles = ColorsNSpices.prototype.spice;
//

var _wrap = function(string, special, background, color){
	return _decode(_raw.bracket + special + background + _raw.next + color + "m") + string + _decode(_raw.bracket + _raw.specials.reset + "m");
}

var _decode = function(string){
	// Decodes the string to ucs2 and returns the Buffer with escape code
	return new Buffer([ 0x1b ].concat(decode(string.toString())));
}
	
var _raw = {

	bracket: "[",
	next: ";",
	
	specials: {
		reset: 0,
		
		bright: 1,
		bold: 1,

		dim: 2,
		hidden : 8,

		strike: 9,
		strikethrough: 9,

		reverse: 7,
		invert: 7,

		underscore: 4,
		underline: 4,

		blink: 5,
		italic: 5
	},

	// Hate to remove Chalk but this seems to do the job
	black: { background: 40, foreground: 30 },
	red: { background: 41, foreground: 31 },
	green: { background: 42, foreground: 32 },
	yellow: { background: 43, foreground: 33 },
	blue: { background: 44, foreground: 34 },
	magenta: { background: 45, foreground: 35 },
	cyan: { background: 46, foreground: 36 },
	white: { background: 47, foreground: 37 },
}

module.exports.spice = _spice;
module.exports.cook = ColorsNSpices;
