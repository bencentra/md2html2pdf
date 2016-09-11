#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const converter = require('./src/converter');
const pkg = require('./package.json');

const defaults = {
  outputType: 'html'
};

function convertFile(file) {
  converter.convert({
    file,
    html: program.html,
    pdf: program.pdf
  });
}

program
  .version(pkg.version)
  .arguments('<file>')
  .option('-h --html', 'Convert <file> to HTML')
  .option('-p --pdf', 'Convert <file> to PDF')
  .action(convertFile)
  .parse(process.argv);
