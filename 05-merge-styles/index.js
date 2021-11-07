const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, 'styles');
const outputDir = path.resolve(__dirname, 'project-dist', 'bundle.css');

fs.readdir(targetDir, (err, files) => {
  if(err){
    console.log(err);
  } else {
    const cssFiles = files.filter((file) => {
      return path.extname(file) === '.css';
    });

    let writeStream = fs.createWriteStream(outputDir, 'utf8');

    for (const cssFile of cssFiles) {
      const currCssFile = path.resolve(targetDir, cssFile);
      fs.stat(currCssFile, (err, stats) => {
        if(!stats.isDirectory()){
          const currentReadStream = fs.createReadStream(currCssFile, 'utf8');

          currentReadStream.pipe(writeStream, { end: false });

          currentReadStream.on('error', function (error) {
            console.error(error);
            writeStream.close();
          });
        }
      });
    }
  }
});
