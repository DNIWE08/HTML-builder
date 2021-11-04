const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process');
const { stdin: input, stdout: output } = require('process');

let writeStream = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

const rl = readline.createInterface({ input, output });

rl.write('Print some text... \n');

rl.addListener('line', (input) => {
  if (input === 'exit') {
    rl.write('end...');
    process.exit(0);
  }
  writeStream.write(`${input} `);
});

rl.addListener('close', () => {
  rl.write('end...');
  process.exit(0);
});
