var ColorsNSpices = function(string, decoder){
	if(string) this.string = string.toString();
	else this.string = " "; // Define empty character

	this._decode = decoder;
	return this;
};

ColorsNSpices.prototype.spice = function() {
	var _this = this;
	
	// Converts arguments to Array
	var args = Array.prototype.slice.apply( arguments );
	var specials = ["reset","bold","bright","dim","strike","strikethrough","hidden","invert","reverse","underscore","underline","blink","italic"];
	
	args.forEach(function(spice){
		var code = undefined;
		if(specials.indexOf(spice) >= 0) {
			code = _this._raw.specials[spice.toLowerCase()];
			_this.special += code + ";";
		}else if(spice.substring(0,2) == "bg"){
			code = _this._raw[spice.substring(2).toLowerCase()]['background'];
			_this.background = code;
		}else {
			code = _this._raw[spice.toLowerCase()]['foreground']; 
			_this.color = code;
		}
	});
	
	return (_this._wrap(_this.string)).toString('uft8');
}

// Aliases
ColorsNSpices.prototype.addStyle = ColorsNSpices.prototype.spice;
ColorsNSpices.prototype.addStyles = ColorsNSpices.prototype.spice;
ColorsNSpices.prototype.setStyle = ColorsNSpices.prototype.spice;
ColorsNSpices.prototype.setStyles = ColorsNSpices.prototype.spice;
//

ColorsNSpices.prototype._exists = function (n) { return n === (n | 0); };

ColorsNSpices.prototype._wrap = function(string){
	var build = "";
	if(this._exists(this.special)) build += this.special + this._raw.next;
	if(this._exists(this.background)) build += this.background + this._raw.next;
	if(this._exists(this.color)) build += this.color + this._raw.next;

	// Remove last ;
	build = build.slice(0,-1);

	return this._decode(this._raw.bracket.concat(build,"m")) + string + this._decode(this._reset());
}

ColorsNSpices.prototype._reset = function(){
	var build = "";

	if(this._exists(this.color)) build += this._raw.bracket.concat("39", "m");
	if(this._exists(this.background)) build += this._raw.bracket.concat("49", "m");
	// Bold reset is equal to dim reset at 22
	if(this._exists(this.special)) build += this._raw.bracket.concat("2",(this.special == 1)?2:this.special, "m");
	
	return build;
}
	
ColorsNSpices.prototype._raw = {

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

module.exports = ColorsNSpices;
