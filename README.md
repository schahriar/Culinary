![Culinary Logo](logo.png)

Add advanced command-line interface to your NodeJS program with **Culinary**!
======

## Installation
```javascript
npm install culinary --save
```

## Usage
```javascript
var culinary = require('culinary');
var style = culinary.style;

// Get screen dimensions using .size or .dimensions
var screen = culinary.size();

// Save cursor position
culinary.save();
// Move cursor to the first visible line and erase that line (Commands can be chained)
culinary.position(0, 0).eraseLine();

// Write time in bold green and restore cursor
culinary.write(style((new Date()).toString()).spice("green","bold")).restore();

```

## Colors & Spices
- **Colors:** Black, White, Green, Blue, Cyan, Magenta, Red, Yellow
- **Backgrounds:** bgBlack, bgWhite, bgGreen, bgBlue, bgCyan, bgMagenta, bgRed, bgYellow
- **Spices:** bold, underline, italic, **hidden**, invert, reset

## Contributing
If you are interested you can contact me directly at <info@schahriar.com>!

## License
MIT © Schahriar SaffarShargh <info@schahriar.com>
