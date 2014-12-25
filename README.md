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

## Methods
#### write(string:String) 
Similar to *console.log* but does not create a new line or accept more than a String argument. For more advanced writing check out [herb](www.npmjs.com/package/herb)

#### up(n:Integer), down(n:Integer), back(n:Integer), forth(n:Integer)
Allows you to move the cursor **n** number of times relative to its current position. Other aliases for *back* and *forth* are **left** and **right**.

#### scrollUp(), scrollDown()
Scrolls the content by a single line. Useful for modifications to native logs.

#### nextLine()
Moves to the next line. Similar behavior as "\n".

### save(), restore()
Allows for saving and restoration of the current cursor position. There is currently no way (that I am aware of) that enables multiple saves and restoration. **Use it wisely!**

### clearScreen(direction:String), cls()
Allows for clearing content relative to the direction or entirely. **Direction** can be set **up**, **down** or **entire** to clear the entire console screen.

### eraseLine(direction:String), clearLine(direction:String)
Allows for clearing line content relative to the direction or entirely. **Direction** can be set **left**, **right** or **entire** to clear the entire line.

## Colors & Spices
- **Colors:** Black, White, Green, Blue, Cyan, Magenta, Red, Yellow
- **Backgrounds:** bgBlack, bgWhite, bgGreen, bgBlue, bgCyan, bgMagenta, bgRed, bgYellow
- **Spices:** bold, underline, italic, **hidden**, invert, reset

## Contributing
If you are interested you can contact me directly at <info@schahriar.com>!

## License
MIT © Schahriar SaffarShargh <info@schahriar.com>
