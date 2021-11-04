const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const targetDir = path.resolve(__dirname, 'files');

fs.readdir(targetDir, (err, files) => {
  if(err){
    console.log(err);
  } else {

    // files.forEach(file => {
    //   const pathToFile = path.join(path.join(__dirname, 'copyFiles'), file);
    //   fsPromises.unlink(pathToFile);
    // });

    fs.mkdir(path.join(__dirname, 'copyFiles'), { recursive: true }, (err) => {
      if (err) {
        console.log('something wrong ...');
      } else {
        files.forEach(file => {
          const copyFilePath = path.join(__dirname, 'copyFiles', file);
          const originalFilePath = path.join(__dirname, 'files', file);
          fsPromises.copyFile(originalFilePath, copyFilePath);
        });
        console.log('Files copyed');
      }
    });
  }
});
