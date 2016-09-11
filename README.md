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

    -h, --help     output usage information
    -V, --version  output the version number
    -h --html      Convert <file> to HTML
    -p --pdf       Convert <file> to PDF
```

For example, to convert the `example.md` file from this project:

```bash
# Markdown to HTML, creates "example.html"
md2html2pdf --html example.md
# HTML to PDF, creates "example.pdf"
md2html2pdf --pdf example.html
# Markdown to PDF, creates "example.html" and "example.pdf"
md2html2pdf --pdf example.md
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
