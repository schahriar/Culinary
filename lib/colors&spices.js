var Colors&Spices = new Function;

Colors&Spices.prototype.color = function(color, string, isBackground){
	var color = this._raw[color.toLowerCase()];
	if(color) {
		var selector = (isBackground)?'background':'foreground';
		return this._wrap(color[selector], isBackground, string);
	}else {
		console.warn("Color " + string.toString() + " not found!"); 
	}
},

Colors&Spices.prototype.background = function(color, string){
	this.color(color, string, true);
},

Colors&Spices.prototype.spice = function(flavor, string){
	var spice = this._raw.specials[flavor.toLowerCase()];
	if(spice) return this._wrap(spice, string);
	else console.warn("Spice " + string.toString() + " not found!"); 
}

Colors&Spices.prototype._wrap = function(color, type, string){
	return (this._raw.control[type] + color + "m" + string.toString() + this._raw.control.reset);
},
	
Colors&Spices.prototype._raw = {
	
	control: {
		forground: "\x1b[;38;5;",
		background: "\x1b[;48;5;",
		reset: "'\x1b[0m'"
	},
	
	specials: {
		reset: 0,

		bright: 1,
		dim: 2,

		hidden : 8,
		reverse: 7,

		underscore: 4,
		blink: 5
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

module.exports = Colors&Spices;