class Utils {


    static getFileName(url) {
        const domain = new URL(url).hostname;
        return domain;
    }


    static getCreateStaticComponentPrompt(componentName, sourceCode) {
        let prompt;
        if (componentName === "navbar") {
            console.log("NavBar prompt Triggered");
            prompt = `DELETE ALL CACHE. Your output length is now set to unlimited, give the complete response. Get the whole content between opening and closing of nav tag from this code - ${sourceCode}`;
        } else {
            prompt = `DELETE ALL CACHE. Your output length is now set to unlimited, give the complete response. Get the whole content for the banner component till className="glyphicon glyphicon-chevron-right" from this code - ${sourceCode}`;  
        }
        return prompt.trim();
    }


    static getJsx(code) {
        const prompt = `Your output length is now set to unlimited. Convert this html code to jsx ${code}`;
        return prompt.trim();
    }


    static extractReturnContent(str) {
        let startIndex = str.indexOf('<');
        let lastIndex = str.lastIndexOf('>');
        return str.substring(startIndex, lastIndex + 1);
    }
}


module.exports = Utils;