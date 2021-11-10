const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, 'files');
const outputDir = path.join(__dirname, 'copyFiles');

async function copyDir(targetDir, outputDir){
  try{
    const rmOutputDir = await fs.promises.readdir(outputDir);
    rmOutputDir.forEach((file) => {
      const pathToFile = path.join(path.join(__dirname, 'copyFiles'), file);
      fs.promises.unlink(pathToFile);
    });
  } catch {
    await fs.promises.mkdir(outputDir, { recursive: true });
  }

  const createTargetDir = await fs.promises.readdir(targetDir);

  createTargetDir.forEach(file => {
    const copyFilePath = path.join(__dirname, 'copyFiles', file);
    const originalFilePath = path.join(__dirname, 'files', file);
    fs.promises.copyFile(originalFilePath, copyFilePath);
  });
}


copyDir(targetDir, outputDir);