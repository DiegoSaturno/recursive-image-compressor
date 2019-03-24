const fs = require('fs');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const mime = require('mime');
const mkdirp = require('mkdirp');
const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

navigateAndCompress = (path) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file, index) => {
            let currentPath = `${path}/${file}`;
            if (fs.lstatSync(currentPath).isDirectory()) {
                navigateAndCompress(currentPath);
            } else {
                let mimeType = mime.getType(currentPath);
                let destinationFolder = `./compressed-images/${path.replace("./images/", "")}`;

                if (isMimeValid(mimeType)) {                    
                    applyCompression([currentPath], destinationFolder)
                        .then(() => console.log('Imagem comprimida e salva no novo caminho.'))
                        .catch((err) => console.log(err));
                } else {
                    let copiedFilePath = `${destinationFolder}/{file}`;
                    createDir(destinationFolder);
                    copy(currentPath, copiedFilePath);
                }
            }
        });
    }
}

createDir = (path) => { 
    mkdirp.sync(destinationFolder);
}

copy = (current, destination) => {
    fs.copyFileSync(currentPath, copiedFilePath);
}

isMimeValid = (mime) => {
    return allowedMimes.includes(mimeType);
}

async function applyCompression(path, destination) {    
    const files = await imagemin(path, destination, {
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: '75'
            }),
            imageminGifsicle({
                optimizationLevel: '2'
            })
        ]
    });
}

module.exports = {  
    compress: recursiveNavigation
};