const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5500', 'http://localhost:8000', 'http://127.0.0.1:5500'],
    credentials: true
}));
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Backend is running!' });
});

// Main analyze endpoint
app.post('/analyze', async (req, res) => {
    try {
        const { artistName, bio, followers, captions, musicLink } = req.body;

        // Validate required fields
        if (!artistName || !bio || followers === undefined || !captions) {
            return res.status(400).json({
                error: 'Missing required fields: artistName, bio, followers, captions'
            });
        }

        // Check if API key is configured
        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({
                error: 'OpenAI API key not configured. Please set OPENAI_API_KEY in .env file'
            });
        }

        // Build the prompt for OpenAI
        const prompt = `You are Clienta Pulse Scout, an expert AI analyst for artist collaboration intelligence.

Analyze the following artist profile and provide a detailed assessment for collaboration fit.

ARTIST INFORMATION:
Name: ${artistName}
Followers: ${followers.toLocaleString()}
Bio: ${bio}
Recent Content: ${captions}
${musicLink ? `Music Link: ${musicLink}` : ''}

Based on this information, provide your analysis in the following JSON format ONLY (no markdown, no extra text):
{
  "artistName": "${artistName}",
  "stage": "Emerging/Developing/Established/Major",
  "genre": "Primary Genre",
  "score": 85,
  "strengths": [
    "Strength 1",
    "Strength 2",
    "Strength 3"
  ],
  "weaknesses": [
    "Area for improvement 1",
    "Area for improvement 2"
  ],
  "outreach": "A personalized 2-3 sentence message suggesting collaboration opportunities that would resonate with this artist based on their style and current position."
}

Requirements:
- Score should be 0-100 based on collaboration potential
- Be specific and constructive in strengths and weaknesses
- Make the outreach message personalized and action-oriented
- Return ONLY valid JSON, nothing else`;

        // Call OpenAI API
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1000
        });

        // Extract the response text
        const content = response.choices[0].message.content.trim();

        // Parse JSON response
        let analysisResult;
        try {
            analysisResult = JSON.parse(content);
        } catch (parseError) {
            console.error('Failed to parse OpenAI response:', content);
            return res.status(500).json({
                error: 'Failed to parse AI response. Please try again.',
                details: 'The AI response was not in the expected JSON format.'
            });
        }

        // Validate response structure
        if (!analysisResult.score || !analysisResult.stage || !analysisResult.genre || 
            !analysisResult.strengths || !analysisResult.weaknesses || !analysisResult.outreach) {
            return res.status(500).json({
                error: 'AI response missing required fields',
                received: analysisResult
            });
        }

        // Return results
        res.json({
            artistName: analysisResult.artistName || artistName,
            stage: analysisResult.stage,
            genre: analysisResult.genre,
            score: parseInt(analysisResult.score),
            strengths: Array.isArray(analysisResult.strengths) ? analysisResult.strengths : [analysisResult.strengths],
            weaknesses: Array.isArray(analysisResult.weaknesses) ? analysisResult.weaknesses : [analysisResult.weaknesses],
            outreach: analysisResult.outreach
        });

    } catch (error) {
        console.error('Error in /analyze endpoint:', error);

        // Handle specific error types
        if (error.status === 401) {
            return res.status(401).json({
                error: 'Invalid OpenAI API key. Please check your OPENAI_API_KEY in .env'
            });
        }

        if (error.status === 429) {
            return res.status(429).json({
                error: 'Rate limited by OpenAI. Please wait a moment and try again.'
            });
        }

        res.status(500).json({
            error: 'Failed to analyze artist',
            message: error.message
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        availableEndpoints: [
            'POST /analyze',
            'GET /health'
        ]
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   Clienta Pulse Scout - Backend        ║
║   Running on http://localhost:${PORT}       ║
║   Ready to analyze artists!            ║
╚════════════════════════════════════════╝
    `);
});
