const fs = require('fs');
const fsPromise = require('fs').promises;

function writeTofile(fileName, fileContent) {
    // Write content to file
    fs.writeFile(fileName, fileContent,  { flag: 'wx' }, (error) => {
        if (error) {
            console.error('Error writing to file:', error);
            return;
        }
        console.log(`Content has been written to ${fileName} successfully.`);
    });
}

async function readFile(fileName) {
    try {
        const data = await fsPromise.readFile(fileName, 'utf8');
        return data;
    } catch (error) {
        console.error('Error reading file:', error);
        throw error; // Throw the error to be caught by the caller
    }
}

function deleteFile(filePath) {
    fs.unlink(filePath, function (err) {
        if (err) throw err;
        console.log('File deleted');
    });
}

module.exports = {writeTofile, readFile, deleteFile};
