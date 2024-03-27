const {interactWithGpt} = require('./gptClient');
const pathModule = require('path');
const {executeMultipleCommands, executeCommand} = require('./commandExecutor');
const {writeTofile, readFile, deleteFile} = require('./fileWriter');
const htmlFileName = 'test.html';

async function createPage() {
    var response = await interactWithGpt("Give me the code to create a basic html page. CODE ONLY!");
    const content = JSON.parse(JSON.stringify(response.content));
    var response2 = await interactWithGpt("Give me the code to create a basic html page and add headers in the page saying welcome  to osbi");
    writeTofile(htmlFileName, content);
    executeCommand(`start ${htmlFileName}`);
}

async function addComponent(componentName) {
    const path = pathModule.join(__dirname, htmlFileName);
    const existingPageData = await readFile('test.html');
    console.log("existingPageData = " + existingPageData);
    const prompt = `I have a existing html file with content. \n ${existingPageData}. Now update the same code to add a footer. Return code only, nothing extra`;
    console.log("Prompt" + prompt);
    const response = await interactWithGpt(prompt);
    const content = JSON.parse(JSON.stringify(response.content));
    await deleteFile(path);
    writeTofile(htmlFileName, content);
}

module.exports = {createPage, addComponent}


