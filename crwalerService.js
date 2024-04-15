const { writeTofile, checkFileExists, createDirectory } = require('./fileWriter.js');
const Utils = require('./util.js');
const pathModule = require('path');
const htmlMinifier = require('html-minifier');

function getSourceData(url) {
    createDirectory('sourceFiles');
    const srcFileName = Utils.getFileName(url);
    const filePath = pathModule.join(__dirname, 'sourceFiles', srcFileName);
    if (checkFileExists(filePath)) {
        console.log("URL source code already exists, skipping the web scrapping");
    } else {
        fetch(url)
        .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          // Examine the text in the response
          response.text().then(function(data) {
            // data contains all the plain html of the url you previously set, 
            // you can use it as you want, it is typeof string
            console.log(data);
            const minifiedHTML = htmlMinifier.minify(data, {
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
              });
            writeTofile(filePath, minifiedHTML);
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    }
   
}

module.exports = {getSourceData}