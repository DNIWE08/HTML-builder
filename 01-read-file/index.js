const fs = require('fs');
const path = require('path');
const process = require('process');

let readStream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), 'utf8');

readStream.addListener('data', (massage) => {
  process.stdout.write(massage);
});
