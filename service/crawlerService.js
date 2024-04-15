const { writeTofile, checkFileExists, createDirectory } = require('../helper/fileWriter.js');
const Utils = require('../helper/util.js');
const pathModule = require('path');
const htmlMinifier = require('html-minifier');

async function saveSourceData(url) {
  createDirectory('sourceFiles');
  const srcFileName = Utils.getFileName(url);
  const filePath = pathModule.join(__dirname, srcFileName);
  if (checkFileExists(filePath)) {
      console.log("URL source code already exists, skipping the web scraping");
  } else {
      try {
          const response = await fetch(url);
          if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
          }
          const data = await response.text();
          const minifiedHTML = htmlMinifier.minify(data, {
              collapseWhitespace: true,
              minifyCSS: true,
              minifyJS: true,
              removeComments: true
          });
          await writeTofile(filePath, minifiedHTML);
          console.log('File has been written successfully.');
      } catch (err) {
          console.log('Fetch Error :-S', err);
      }
  }
}

module.exports = {saveSourceData}