const fs = require('fs');
const path = require('path');
const File = require('./file');

const showdownOptions = {
  tables: true,
  strikethrough: true,
  ghCodeBlocks: true
};
const wkhtmltopdfOptions = {
  pageSize: 'letter'
};

const showdown  = require('showdown');
const mdtohtml = new showdown.Converter(showdownOptions);
const wkhtmltopdf = require('wkhtmltopdf');
const mustache = require('mustache');

function errorHandler() {
  const errors = arguments;
  console.error.apply(this, errors);
}

function log() {
  const messages = arguments;
  return function() {
    console.log.apply(this, messages);
  }
}

class Converter {

  constructor(options) {
    this.options = options;
  }

  convert(input) {
    this.file = new File(input);
    if (this.file.isMarkdown() && this.options.html) {
      return this.convertMarkdownToHtml(this.file.path);
    }
    else if (this.file.isHtml() && this.options.pdf) {
      return this.convertHtmlToPdf(this.file.path);
    }
    else if (this.file.isMarkdown() && this.options.pdf) {
      return this.convertMarkdownToHtml(this.file.path)
        .then(function() {
          const newFile = `${this.file.dirname}/${this.file.name}.html`;
          return this.convertHtmlToPdf(newFile);
        }.bind(this));
    }
    else {
      console.log('Invalid conversion');
    }
  }

  convertMarkdownToHtml(input) {
    return File.readFile(input)
      .then(this.makeHtml.bind(this))
      .then(log('resume.html created successfully!'))
      .catch(errorHandler);
  }

  convertHtmlToPdf(input) {
    return File.readFile(input)
      .then(this.makePdf.bind(this))
      .then(log('resume.pdf created successfully!'))
      .catch(errorHandler);
  }

  makeHtml(markdown) {
    const html = mdtohtml.makeHtml(markdown);
    return Promise.all([
      File.readFile('templates/basic.html'),
      File.readFile('example.css')
    ]).then(values => {
      const [template, css] = values;
      return mustache.render(template, {
        html,
        css
      });
    }).then(combinedHtml => File.writeFile(`${this.file.name}.html`, combinedHtml));
  }

  makePdf(html) {
    return new Promise(resolve => {
      const pathToFile = path.join(process.cwd(), `${this.file.name}.pdf`);
      const stream = fs.createWriteStream(pathToFile);
      const errors = [];
      wkhtmltopdf(html, wkhtmltopdfOptions).pipe(stream);
      stream.on('error', function(error) {
        errors.push(error);
      });
      stream.on('finish', function() {
        if (errors.length === 0) {
          resolve(true);
        } else {
          reject(errors);
        }
      });
    });
  }

}

module.exports = Converter;
