const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.use(bodyParser.json());

// Ensure we are serving static files from the public directory
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Get the gemini-pro model
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        // Generate content based on the user message
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = await response.text();

        // Log response data to console
        console.log('Gemini API Response:', text);

        // Send the generated text back to the client
        res.json({ reply: text });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
