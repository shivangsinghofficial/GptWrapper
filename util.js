class Utils {
    static getFileName(url) {
        const domain = new URL(url).hostname;
        return domain;
    }

    static getCreateStaticComponentPrompt(componentName, sourceCode) {
        const prompt = `
Extract code for a specific component from website source.
Component Name: ${componentName}
Source Code:

${sourceCode}

Only provide the extracted code in prettified format of the specified component, No other text`;

    return prompt.trim();
    }
}

module.exports = Utils;