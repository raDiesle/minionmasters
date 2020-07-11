const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// SOURCE FOLDER
const SRC_FOLDER = 'batch_jobs/generated/img';
const TARGET_FOLDER = './public/generated/img/';

function readFilesSync(dir) {
    const files = [];

    fs.readdirSync(dir).forEach(filename => {
        const name = path.parse(filename).name;
        const ext = path.parse(filename).ext;
        const filepath = path.resolve(dir, filename);
        const stat = fs.statSync(filepath);
        const isFile = stat.isFile();

        if (isFile) files.push({filepath, name, ext, stat});
    });

    files.sort((a, b) => {
        // natural sort alphanumeric strings
        // https://stackoverflow.com/a/38641281
        return a.name.localeCompare(b.name, undefined, {numeric: true, sensitivity: 'base'});
    });

    return files;
}


if (!fs.existsSync(TARGET_FOLDER)) {
    fs.mkdirSync(TARGET_FOLDER);
}

const files = readFilesSync(SRC_FOLDER);
files.forEach(file => {
    console.log(file.name + file.ext);
    sharp(file.filepath)
        .resize({width: 80})
        .toFile(TARGET_FOLDER + file.name + file.ext, function (err, info) {
            if (err) {
                console.log("error:");
                console.log(err);
            } else {
                console.log(info);
            }
        });
}); 