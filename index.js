const express = require("express");
const {scrapeAndExtractComponent} = require("./service/componentService");
const app = express();

app.use(express.json());

app.listen(4000, () => {
    console.log("Server started on port 4000");
})

app.post('/api/v1/extract-component', async (req, res) => {
    const requestBody = req.body;
    const srcUrl = requestBody.url;
    const componentName = requestBody.component;
    
    console.log("request url = ", srcUrl);
    try {
        const extractedComponent = await scrapeAndExtractComponent(srcUrl, componentName);
        res.status(200).json({ componentCode: extractedComponent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});