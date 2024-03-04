const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = "AIzaSyDY6CBCkviybkF6_xz6TMkxdBZBMGW8zOI"; // Replace with your actual API key
const MODEL_NAME = "gemini-1.0-pro-001";

app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const userInput = req.body.message;

    if (!userInput) {
        return res.status(400).send({ error: 'No message provided' });
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const chat = model.startChat({
            // Your original configuration here...
        });

        const result = await chat.sendMessage(userInput);
        const response = result.response;

        res.send({ reply: response.text() });
    } catch (error) {
        console.error('Failed to generate reply:', error);
        res.status(500).send({ error: 'Failed to generate reply' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
