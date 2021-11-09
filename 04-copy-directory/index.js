const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const targetDir = path.resolve(__dirname, 'files');
const outputDir = path.join(__dirname, 'copyFiles');

async function copyDir(targetDir, outputDir){
  
  const rmOutputDir = await fsPromises.readdir(outputDir);
  
  rmOutputDir.forEach(file => {
    const pathToFile = path.join(path.join(__dirname, 'copyFiles'), file);
    fsPromises.unlink(pathToFile);
  });

  fs.readdir(targetDir, (err, files) => {
    if (err) {
      console.log(err);
    } else {


      fs.mkdir(outputDir, { recursive: true }, (err) => {
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
}

copyDir(targetDir, outputDir);