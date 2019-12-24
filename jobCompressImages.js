const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');


function readFilesSync(dir) {
    const files = [];
  
    fs.readdirSync(dir).forEach(filename => {
      const name = path.parse(filename).name;
      const ext = path.parse(filename).ext;
      const filepath = path.resolve(dir, filename);
      const stat = fs.statSync(filepath);
      const isFile = stat.isFile();
  
      if (isFile) files.push({ filepath, name, ext, stat });
    });
  
    files.sort((a, b) => {
      // natural sort alphanumeric strings
      // https://stackoverflow.com/a/38641281
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });
  
    return files;
  }



    /*
    (async () => {
    const files = await imagemin(['public/img/*.{jpg,png}'], {
        destination: 'public/img_c',
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
 */


const files = readFilesSync('public/img/');

files.forEach(file => {
    console.log(file.name + file.ext);
    sharp(file.filepath)
    .resize({height: 128})
    .toFile('./public/img_sharp/' + file.name + file.ext, function(err, info) {
        if(err){
          console.log("error:");
          console.log(err);
        }else {
          console.log(info);
          }
    });
}); 