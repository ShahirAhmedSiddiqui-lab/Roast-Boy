const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend directory
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'RoastBoy backend is running' });
});

// Main roast endpoint
app.post('/api/roast', async (req, res) => {
  try {
    const { bio } = req.body;

    if (!bio || bio.trim().length === 0) {
      return res.status(400).json({
        error: 'Bio cannot be empty',
        message: 'Please provide a bio to roast'
      });
    }

    if (bio.length > 2000) {
      return res.status(400).json({
        error: 'Bio too long',
        message: 'Bio must be 2000 characters or less'
      });
    }

    console.log('🔥 Received bio for roasting:', bio);

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Create the roasting prompt
    const roastPrompt = `You are RoastBoy, a savage AI roaster who gives hilarious, brutal, but ultimately good-natured roasts of people's bios.

User's bio to roast:
"${bio}"

Your task:
1. Create a BRUTAL, HILARIOUS roast that points out the generic/cliché aspects of this bio. Be funny and savage.
2. Then provide an IMPROVED VERSION of their bio that's actually interesting, authentic, and compelling.

Format your response as JSON (no markdown, just pure JSON):
{
  "roast": "The brutal roast goes here - make it funny and savage",
  "improvedBio": "The improved version of their bio that's genuine and compelling"
}

Remember: Be savage but not mean-spirited. The goal is humor and light-hearted roasting.`;

    // Call Gemini API
    const result = await model.generateContent(roastPrompt);
    const response = result.response;
    const text = response.text();

    // Parse the JSON response
    let parsedResponse;
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text);
      return res.status(500).json({
        error: 'Failed to parse AI response',
        message: 'The AI response was not in the expected format'
      });
    }

    console.log('🔥 Roast generated successfully');

    res.json({
      success: true,
      roast: parsedResponse.roast,
      improvedBio: parsedResponse.improvedBio,
      originalBio: bio
    });
  } catch (error) {
    console.error('❌ Error in /api/roast:', error);

    if (error.message && error.message.includes('API key')) {
      return res.status(500).json({
        error: 'API Configuration Error',
        message: 'Gemini API key is not properly configured'
      });
    }

    res.status(500).json({
      error: 'Failed to generate roast',
      message: error.message || 'An unexpected error occurred'
    });
  }
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.get('/result.html', (req, res) => {
  res.sendFile(path.join(frontendPath, 'result.html'));
});

app.get('/result', (req, res) => {
  res.sendFile(path.join(frontendPath, 'result.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🔥 RoastBoy backend running on http://localhost:${PORT}`);
  console.log(`📝 API endpoint: POST http://localhost:${PORT}/api/roast`);
});
