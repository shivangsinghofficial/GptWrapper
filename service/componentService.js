const {interactWithGpt} = require('../gptClient');
const pathModule = require('path');
const {writeTofile, readFile, deleteFile, createDirectory, checkFileExists} = require('../helper/fileWriter');
const Utils = require('../helper/util');
const {saveSourceData} = require('./crawlerService');
const componentLib = 'componentLib';

async function extractComponent(srcUrl, componentName) {
    const srcFilePath = pathModule.join(__dirname,  Utils.getFileName(srcUrl));
    const srcPageCode = await readFile(srcFilePath);
    let cssLinks;
    extractCSSLinks(srcUrl, srcPageCode).then((links) => {
        cssLinks = links;
        console.log("CSS Links array = ", cssLinks);
        return links;
    });
    const prompt = Utils.getCreateStaticComponentPrompt(componentName, srcPageCode);
    // console.log("Prompt" + prompt);
    const response = await interactWithGpt(prompt);
    const content = JSON.parse(JSON.stringify(response.content));
    // createDirectory(componentLib);
    // const componentFileName = componentName + '.html';
    // const componentFilePath = pathModule.join(__dirname,  componentFileName);
    // if (checkFileExists(componentFilePath)) {
    //     await deleteFile(componentFilePath);
    // }
    // writeTofile(componentFilePath, content);
    return [cssLinks, content];
}

async function scrapeAndExtractComponent(srcUrl, componentName) {
    try {
        await saveSourceData(srcUrl); // Wait for saveSourceData to complete
        const extractedComponent = await extractComponent(srcUrl, componentName); // Wait for extractComponent to complete
        return extractedComponent; // Return the result
    } catch (error) {
        console.error('Error in scrapeAndExtractComponent:', error);
        return "Error occurred while extracting component"; // Handle errors
    }
}

async function extractCSSLinks(srcUrl, html) {
    // Regular expression pattern to match link tags with type="text/css" and rel="stylesheet"
    console.log("Extract CSS Link started");
    const pattern = /<link\s+(?:[^>]*?\s+)?type="text\/css"\s+(?:[^>]*?\s+)?rel="stylesheet"\s+(?:[^>]*?\s+)?href="([^"]*)"\s*(?:[^>]*?\s+)?\/?>/gi;
    const matches = [];
    let match;

    while ((match = pattern.exec(html)) !== null) {
        matches.push(srcUrl + match[1]);
    }

    return matches;
}


module.exports = {scrapeAndExtractComponent}


