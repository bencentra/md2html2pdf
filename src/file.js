const fs = require('fs');
const path = require('path');

class File {

  constructor(file) {
    this.path = file;
    this.basename = path.basename(this.path);
    this.dirname = path.dirname(this.path);
    this.name = this.basename.split('.').shift();
    this.type = this.basename.split('.').pop();
  }

  isMarkdown() {
    return (['md', 'markdown'].indexOf(this.type.toLowerCase()) > -1);
  }

  isHtml() {
    return (this.type.toLowerCase() === 'html');
  }

  isPdf() {
    return (this.type.toLowerCase() === 'pdf');
  }

  static readFile(file) {
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

  static writeFile(file, contents) {
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

}

module.exports = File;
