const fs = require('fs');
const path = require('path');

const outputDir = path.resolve(__dirname, 'project-dist');
const htmlDir = path.resolve(__dirname, 'components');
const htmlTemplateFile = path.resolve(__dirname, 'template.html');
const htmlResultFile = path.resolve(outputDir, 'index.html');
const styleDir = path.resolve(__dirname, 'styles');
const outputStyleDir = path.resolve(__dirname, 'project-dist', 'style.css');
const assetsDir = path.resolve(__dirname, 'assets');
const outputAssetsDir = path.resolve(outputDir, 'assets');

async function cleanOutputFiles(pathBundle) {
  await fs.promises.rm(pathBundle, { recursive: true, force: true });
  await fs.promises.mkdir(pathBundle, { recursive: true });
}

async function createHtml(htmlDir){
  const htmlFolder = await fs.promises.readdir(htmlDir);
  const htmlFiles = htmlFolder.filter((file) => {
    return path.extname(file) === '.html';
  });
  const currentReadStream = fs.createReadStream(htmlTemplateFile, 'utf8');
  currentReadStream.addListener('data', async (data) => {
    let htmlTemplate = data.toString();
    for(const htmlFile of htmlFiles){
      const htmlFilePath = path.resolve(htmlDir, htmlFile);
      const readedFile = await fs.promises.readFile(htmlFilePath);
      const name = path.basename(htmlFile, '.html');
      htmlTemplate = htmlTemplate.replace(`{{${name}}}`, readedFile);
      await fs.promises.writeFile(htmlResultFile, htmlTemplate, 'utf8');
    }
  });
}

async function copyStyles(targetDir, outputDir){
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
          }
        });
      }
    }
  });
}

async function copyDir(targetDir, outputDir){
  fs.readdir(targetDir, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      fs.mkdir(outputDir, { recursive: true }, (err) => {
        if (err) {
          console.log('something wrong ...');
        } else {
          files.forEach(file => {
            const filePath = path.join(targetDir, file);
            const currDir = path.join(outputDir, filePath.split('\\').slice(-1).toString());
            fs.stat(filePath, (err, stats) => {
              if(stats.isDirectory()){
                copyDir(filePath, currDir);
              } else {
                const copyFilePath = path.join(targetDir, file);
                const originalFilePath = path.join(currDir);
                fs.promises.copyFile(copyFilePath, originalFilePath);
              }
            });
          });
        }
      });
    }
  });
}

async function build(){
  await cleanOutputFiles(outputDir);
  await createHtml(htmlDir);
  await copyStyles(styleDir, outputStyleDir);
  await copyDir(assetsDir, outputAssetsDir);
}

build();