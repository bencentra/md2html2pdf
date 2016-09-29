#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const Converter = require('./src/converter');
const pkg = require('./package.json');

const defaults = {
  outputType: 'html'
};

function convertFile(file) {
  const converter = new Converter(program);
  converter.convert(file);
}

program
  .version(pkg.version)
  .arguments('<file>')
  .option('-h --html', 'Convert <file> to HTML')
  .option('-p --pdf', 'Convert <file> to PDF')
  .option('-t --title', 'Title of the generated HTML file', '')
  .option('-s --stylesheet', 'Stylesheet to apply to generated HTML')
  .action(convertFile)
  .parse(process.argv);
