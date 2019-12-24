const fs = require('fs');
const path = require('path');
const resizeImg = require('resize-img');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

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

  

(async () => {
    const files = readFilesSync('public/img_c/');
asyncForEach(files, async (file) => {

    const image = await resizeImg(fs.readFileSync(file.filepath), {
		height: 128
	});

	fs.writeFileSync('public/img_rz/' + file.name, image);
});
})();