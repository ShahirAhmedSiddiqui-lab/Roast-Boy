# RoastBoy - AI Bio Roaster

A single-page web app where users paste their bio → Gemini roasts it + generates an improved version → user can copy the improved bio.

## 🌟 Features

- ✨ Savage but good-natured roasts powered by Google Gemini AI
- 📝 AI-generated improved bio suggestions
- 📋 One-click copy to clipboard
- 🔥 Share your roast on social media
- 📱 Fully responsive design
- ⚡ Fast inference with Gemini Flash API

## Stack

- **Frontend**: HTML/CSS/JavaScript (Tailwind CSS)
- **Backend**: Serverless API functions (Node.js)
- **AI**: Google Gemini 2.5 Flash API
- **Deployment**: Vercel (recommended)

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v14+)
- Gemini API Key from [Google AI Studio](https://ai.google.dev)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShahirAhmedSiddiqui-lab/Roast-Boy.git
   cd Roast-Boy
   ```

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Create `.env` file**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your Gemini API key
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

5. **Open the app**
   - Open `frontend/index.html` in your browser
   - Or navigate to: `http://localhost:3000`

## 🌐 Deploy to Vercel

### Option 1: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository: `Roast-Boy`
4. Add environment variables:
   - `GEMINI_API_KEY`: Your Gemini API key
5. Click "Deploy"
6. Your app is live! 🎉

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

After deployment, your app will be available at:
```
https://your-project-name.vercel.app
```

## 📂 Project Structure

```
Roast Boy/
├── api/
│   └── roast.js              # Serverless API function
├── backend/
│   ├── index.js              # Express server (local dev only)
│   ├── .env                  # Environment variables (not in git)
│   └── package.json
├── frontend/
│   ├── index.html            # Landing page
│   └── result.html           # Results page
├── vercel.json               # Vercel configuration
├── package.json              # Root dependencies
├── .env.example              # Example env file
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## 🔌 API Endpoints

### POST `/api/roast`

Generates a roast and improved bio.

**Request:**
```json
{
  "bio": "Your bio text here"
}
```

**Response:**
```json
{
  "success": true,
  "roast": "The savage roast...",
  "improvedBio": "The improved version...",
  "originalBio": "Your original bio text..."
}
```

## 🔐 Security

- ✅ API keys are protected in `.env` (not committed to git)
- ✅ `.gitignore` prevents accidental credential exposure
- ✅ `.env.example` shows what variables are needed
- ✅ Safe to make the repository public

## 🛠️ Local Development

### Running the Express Server

For local development with hot reload:

```bash
cd backend
npm start
```

The server will start at `http://localhost:3000`

### File Structure for Local Dev

```
backend/
├── index.js          # Express server
├── package.json      # Dependencies
└── .env              # Local environment variables
```

## 📝 Environment Variables

Create a `.env` file in the `backend/` directory or configure in Vercel:

```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
NODE_ENV=development
```

For Vercel deployment, set these in the dashboard:
- Environment Variables → Add `GEMINI_API_KEY`

## 🎯 How to Use

1. **Landing Page**: Paste your boring bio
2. **Click "ROAST ME"**: AI generates:
   - A savage, hilarious roast
   - An improved, compelling bio
3. **Copy or Share**: Use your new bio anywhere
4. **Try Another**: Get roasted again! 🔥

## 🚢 Deployment Checklist

- [ ] Push code to GitHub
- [ ] Set up Vercel project
- [ ] Configure `GEMINI_API_KEY` env variable
- [ ] Deploy to Vercel
- [ ] Test the live app
- [ ] Share with friends! 🔥

## 🐛 Troubleshooting

### "API key not configured" error
- Make sure `GEMINI_API_KEY` is set in Vercel environment variables
- Check the environment variable name matches exactly

### CORS errors
- API endpoint needs to be on the same domain (handled by Vercel)
- For local development, use `http://localhost:3000`

### Frontend not loading
- Make sure Vercel is configured to serve static files from `frontend/`
- Check `vercel.json` rewrites configuration

## 📚 Resources

- [Google Gemini API Docs](https://ai.google.dev)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

**Built for the brave.** 🔥

Made with ❤️ by [Your Name]
