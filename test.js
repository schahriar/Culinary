var culinary = require("./culinary");
var colors = culinary.colors;
var style = culinary.style;

// Get screen dimensions using .size or .dimensions
var screen = culinary.size();
// Save cursor position
culinary.save();
// Move cursor to the first visible line and erase that line (Commands can be chained)
culinary.position(0, screen.height).eraseLine().cursorTo(5).eraseLine();
// Write time in bold green and restore cursor
culinary.write(style((new Date()).toString()).addStyles("blue","bold")).restore();

culinary.cursor(true).hideCursor().showCursor();
//culinary.write(style("Super text!").spice("bgBlack","blue")).nextLine();
culinary.write(style(" Nothing is as " + style("important").addStyles("red","bgWhite","bold") + " as that!").addStyles("green"));