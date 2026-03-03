const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Groq } = require('groq-sdk');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

app.post('/api/analyze-soil', async (req, res) => {
    const { soilType, cropType, nitrogen, phosphorus, potassium } = req.body;

    if (!soilType || !cropType || nitrogen === undefined || phosphorus === undefined || potassium === undefined) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const systemPrompt = "You are an agricultural soil expert. Your task is to analyze crop suitability based on soil type, crop type, and NPK levels. \n\nCRITICAL: First, validate if the 'soilType' and 'cropType' are valid agricultural terms. If either is a person's name, a place, nonsense, or non-agricultural, set 'isValid' to false. \n\nRespond strictly in JSON format with: \n1. suitability (e.g., 'Suitable', 'Not Suitable', 'Invalid Input')\n2. isValid (boolean: true if inputs are valid agricultural terms, false otherwise)\n3. reason (detailed explanation)\n4. fertilizerRecommendation (specific products like Urea, DAP, NPK 20-20-20)\n5. pesticideRecommendation (specific pesticides or 'None')\n6. improvementSuggestions.\n\nIf isValid is false, suitability should be 'Invalid Input' and you should explain why in the reason field.";

    const userPrompt = `Input Data:
Soil Type: ${soilType}
Crop Type: ${cropType}
Nitrogen (N): ${nitrogen}
Phosphorus (P): ${phosphorus}
Potassium (K): ${potassium}

Analyze the suitability and provide recommendations.`;

    try {
        console.log('Sending request to GROQ with data:', { soilType, cropType, nitrogen, phosphorus, potassium });
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });

        console.log('GROQ Response received');
        const content = completion.choices[0].message.content;
        console.log('Raw Content:', content);
        const result = JSON.parse(content);
        res.json(result);
    } catch (error) {
        console.error('Detailed GROQ API Error:', error);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
