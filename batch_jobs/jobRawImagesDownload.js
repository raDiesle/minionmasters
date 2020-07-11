const fetch = require("node-fetch");

const http = require('http');
const fs = require('fs');

const TARGET_FOLDER = './batch_jobs/generated';
const TARGET_SUB_FOLDER = '/img/';

const download = (url, path) => new Promise((resolve, reject) => {
    http.get(url, response => {
        const statusCode = response.statusCode;

        if (statusCode !== 200) {
            return reject('Download error!');
        }

        const writeStream = fs.createWriteStream(path);
        response.pipe(writeStream);

        writeStream.on('error', () => reject('Error writing to file!'));
        writeStream.on('finish', () => writeStream.close(resolve));
    });
}).catch(err => console.error(err));

async function fetchImageData() {
    // let url = "https://minionmasters.gamepedia.com/api.php?action=query&list=allimages&aiprop=url&ailimit=max&format=json";
    let url = "https://minionmasters.gamepedia.com/api.php?action=query&list=allimages&ailimit=max&aiprop=timestamp|url&aisort=timestamp&aidir=older&format=json";
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


const generatedImFolder = TARGET_FOLDER + TARGET_SUB_FOLDER;

if (!fs.existsSync(generatedImFolder)) {
    fs.mkdirSync(generatedImFolder);
}
(async () => {
    const allImageData = await fetchImageData();
    allImageData.query.allimages.forEach(imageData => {
        download(imageData.url.replace("https", "http"), generatedImFolder + imageData.name);
        console.log(imageData.timestamp + imageData.name);
    });
})();

module.exports.generatedImFolder = generatedImFolder;