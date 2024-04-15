class Utils {
    static getFileName(url) {
        const domain = new URL(url).hostname;
        return domain;
    }
}

module.exports = Utils;