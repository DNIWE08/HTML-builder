const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, 'secret-folder');

fs.readdir(targetDir, (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      const filePath = path.join(__dirname, 'secret-folder', file);
      fs.stat(filePath, (err, stats) => {
        if(!stats.isDirectory()){
          const fileExt = path.extname(file);
          const fileName = path.basename(file, fileExt);
          const fileSize = `${stats.size / 1024} kbyte`;
          console.log(fileName, ' - ', fileExt.slice(1), ' - ', fileSize);
        }
      });
    });
  }
});