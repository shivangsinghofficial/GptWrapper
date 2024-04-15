const {interactWithGpt} = require('./gptClient');
const pathModule = require('path');
const {executeCommand} = require('./commandExecutor');
const {writeTofile, readFile, deleteFile, createDirectory, checkFileExists} = require('./fileWriter');
const Utils = require('./util');
const htmlFileName = 'test.html';
const componentLib = 'componentLib';

async function createPage() {
    var response = await interactWithGpt("Give me the code to create a basic html page. CODE ONLY!");
    const content = JSON.parse(JSON.stringify(response.content));
    var response2 = await interactWithGpt("Give me the code to create a basic html page and add headers in the page saying welcome  to osbi");
    writeTofile(htmlFileName, content);
    executeCommand(`start ${htmlFileName}`);
}

async function extractComponent(componentName, srcUrl) {
    const srcFilePath = pathModule.join(__dirname, 'sourceFiles',  Utils.getFileName(srcUrl));
    const srcPageCode = await readFile(srcFilePath);
    const prompt = Utils.getCreateStaticComponentPrompt(componentName, srcPageCode);
    console.log("Prompt" + prompt);
    const response = await interactWithGpt(prompt);
    const content = JSON.parse(JSON.stringify(response.content));
    createDirectory(componentLib);
    const componentFileName = componentName + '.html';
    const componentFilePath = pathModule.join(__dirname, componentLib,  componentFileName);
    if (checkFileExists(componentFilePath)) {
        await deleteFile(componentFilePath);
    }
    writeTofile(componentFilePath, content);
}

module.exports = {createPage, extractComponent}


