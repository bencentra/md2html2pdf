const fs = require('fs');
const path = require('path');

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

let name = '';
let type = '';

function readFile(file) {
  const pathToFile = path.join(process.cwd(), file);
  return new Promise(function(resolve, reject) {
    fs.readFile(pathToFile, 'utf8', function(error, data) {
      if (error) {
        reject(error);
      }
      else {
        resolve(data);
      }
    })
  });
}

function writeFile(file, contents) {
  const pathToFile = path.join(process.cwd(), file);
  return new Promise(function(resolve, reject) {
    fs.writeFile(pathToFile, contents, function(error) {
      if (error) {
        reject(error);
      }
      else {
        resolve(true);
      }
    });
  });
}

function makeHtml(markdown) {
  const html = mdtohtml.makeHtml(markdown);
  return writeFile(`${name}.html`, html);
}

function makePdf(html) {
  return new Promise(function(resolve) {
    const pathToFile = path.join(process.cwd(), `${name}.pdf`);
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
  })
}

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

function isMarkdown(type) {
  return (['md', 'markdown'].indexOf(type.toLowerCase()) > -1);
}

function isHtml(type) {
  return (type.toLowerCase() === 'html');
}

function isPdf(type) {
  return (type.toLowerCase() === 'pdf');
}

const converter = {

  convertMarkdownToHtml(input) {
    return readFile(input)
      .then(makeHtml)
      .then(log('resume.html created successfully!'))
      .catch(errorHandler);
  },

  convertHtmlToPdf(input) {
    return readFile(input)
      .then(makePdf)
      .then(log('resume.pdf created successfully!'))
      .catch(errorHandler);
  },

  convert(options) {
    const basename = path.basename(options.file);
    const dirname = path.dirname(options.file);
    name = basename.split('.').shift();
    type = basename.split('.').pop();
    if (isMarkdown(type) && options.html) {
      return this.convertMarkdownToHtml(options.file);
    }
    else if (isHtml(type) && options.pdf) {
      return this.convertHtmlToPdf(options.file);
    }
    else if (isMarkdown(type) && options.pdf) {
      return this.convertMarkdownToHtml(options.file)
        .then(function() {
          const newFile = `${dirname}/${name}.html`;
          return this.convertHtmlToPdf(newFile);
        }.bind(this));
    }
    else {
      console.log('Invalid conversion');
    }
  }

}

module.exports = converter;
