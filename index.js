const compressor = require('./src/compressor');
const fs = require('fs');

if (!fs.existsSync("compressed-images")) {
    fs.mkdirSync("compressed-images");
}

if (fs.existsSync("images")) {
    compressor.compress("./images");
} else {
    console.log("./images dir not found. Make sure the directory exists.");
}