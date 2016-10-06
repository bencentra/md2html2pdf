# md2html2pdf

A command-line tool for converting Markdown to HTML to PDF. You can use it to write documents, web pages, blog posts, resumes, and more in Markdown and convert to different formats for sharing and publishing.

## Installation

Requires Node 6 or above.

Install `wkhtmltopdf` for your system: http://wkhtmltopdf.org/downloads.html

Install `md2html2pdf` globally: `npm install -g md2html2pdf`

## Usage

```bash
$ md2html2pdf --help

  Usage: md2html2pdf [options] <file>

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -h --html               Convert <file> to HTML
    -p --pdf                Convert <file> to PDF
    -t --title [title]      Title of the generated HTML file
    -s --stylesheet [path]  Stylesheet to apply to generated HTML
    -x --template [path]    Template to use to generate HTML
```

### Basic Examples

To convert the example file from this project, `cd example` and run:

```bash
# Markdown to HTML, creates "example.html"
md2html2pdf --html example.md
# HTML to PDF, creates "example.pdf"
md2html2pdf --pdf example.html
# Markdown to PDF, creates "example.html" and "example.pdf"
md2html2pdf --pdf example.md
```

### Customizing the HTML

Use the `--title` option to provide a title for the HTML file:

```bash
md2html2pdf --title "My Cool File" --html example.md
```

Use the `--stylesheet` option to pass in a CSS file you'd like to add to the HTML:

```bash
md2html2pdf --stylesheet example.css --html example.md
```

The HTML file is generated from a simple [template](templates/basic.html). The template uses [Mustache](https://github.com/janl/mustache.js/) and expects the following options:
* `html` - The HTML generated from the Markdown
* `css` - The CSS read in from the `--stylesheet` option
* `title` - The title of the html page from the `--title` option (defaults to `''`)

You can provide your own template file using the `--template` option:

```bash
md2html2pdf --template template.html --html example.md
```

## Development

Fork/clone the project, then:

```bash
cd md2html2pdf
# Get nvm: https://github.com/creationix/nvm
nvm use
# Install dependencies
npm install
# Override global executable for testing
npm link
```

## License

MIT
