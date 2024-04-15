const { Configuration, OpenAI } = require('openai');

const apiKey = "";
const openai = new OpenAI({
    apiKey: `${apiKey}`, // This is the default and can be omitted
  });

async function interactWithGpt(prompt) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
          });
        console.log("Response below");
        console.log(chatCompletion.choices[0].message);
        return chatCompletion.choices != null ? chatCompletion.choices[0].message : null;
    } catch(error) {
        console.error('Error',error);
        return null;
    }
    
  }

module.exports = { interactWithGpt }
