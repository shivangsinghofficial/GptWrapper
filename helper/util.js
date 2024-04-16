class Utils {
    static getFileName(url) {
        const domain = new URL(url).hostname;
        return domain;
    }

    static getCreateStaticComponentPrompt(componentName, sourceCode) {
        const prompt = `
Extract code for a specific component from website source with id: topNav.
Only provide the extracted code, NO EXTRA TEXT
Component Name: ${componentName}
Source Code:

${sourceCode}
`;

    return prompt.trim();
    }

    static getJsx(code) {
        const prompt = `
Convert to jsx
${code}   
        `;
        return prompt.trim();
    }

    static extractReturnContent(str) {
        let startIndex = str.indexOf('<');
        let lastIndex = str.lastIndexOf('>');
        return str.substring(startIndex, lastIndex + 1);
    }
}

module.exports = Utils;