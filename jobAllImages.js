const fetch = require("node-fetch");

var http = require('http');
var fs = require('fs');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

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

(async () => {
    const allImageData = await fetchImageData();
    await asyncForEach(allImageData.query.allimages, async (imageData) => {
        console.log(imageData.timestamp + imageData.name);
        await download(imageData.url.replace("https", "http"), "./public/img/" + imageData.name)
    });
})();
