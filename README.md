# 🎵 Clienta Pulse Scout

**AI-Powered Artist Analysis & Collaboration Intelligence**

Clienta Pulse Scout is a web application that uses OpenAI's GPT to analyze artists and provide detailed collaboration insights, including fit scores, strengths, weaknesses, and personalized outreach messaging.

## 🏗️ Architecture

```
Clienta Pulse Scout
├── Frontend (HTML/CSS/JavaScript)
│   ├── index.html       - User interface
│   ├── style.css        - Styling
│   └── script.js        - API communication
│
└── Backend (Node.js/Express)
    ├── server.js        - Express server & OpenAI integration
    ├── package.json     - Dependencies
    └── .env             - Configuration (API keys)
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14+) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **OpenAI API Key** - [Get one free](https://platform.openai.com/api-keys)

### Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/ClientaPulse/clienta-pulse-scout.git
cd clienta-pulse-scout

# Install backend dependencies
npm install
```

### Step 2: Configure Environment Variables

1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

2. Add your OpenAI API key to `.env`:
   ```
   OPENAI_API_KEY=sk_your_api_key_here
   PORT=3000
   ```

   > 🔒 **Never commit `.env` to GitHub!** It's already in `.gitignore`.

### Step 3: Run the Backend

```bash
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║   Clienta Pulse Scout - Backend        ║
║   Running on http://localhost:3000     ║
║   Ready to analyze artists!            ║
╚════════════════════════════════════════╝
```

### Step 4: Open the Frontend

Open `index.html` in your browser or use a local server:

**Option A: Live Server (VS Code)**
- Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- Right-click `index.html` → "Open with Live Server"

**Option B: Python HTTP Server**
```bash
python -m http.server 5500
```
Then visit `http://localhost:5500`

**Option C: Node HTTP Server**
```bash
npx http-server -p 8000
```
Then visit `http://localhost:8000`

### Step 5: Test It Out

1. Fill in the artist information form
2. Click **"🔍 Analyze Artist"**
3. Wait for AI analysis
4. View the detailed report!

## 📊 API Endpoints

### POST `/analyze`

Analyzes an artist and returns AI-generated insights.

**Request:**
```json
{
  "artistName": "Taylor Swift",
  "bio": "Pop/Folk artist with strong storytelling",
  "followers": 150000000,
  "captions": "Just dropped new album...",
  "musicLink": "https://spotify.com/artist/..."
}
```

**Response:**
```json
{
  "artistName": "Taylor Swift",
  "stage": "Major",
  "genre": "Pop",
  "score": 92,
  "strengths": [
    "Massive fanbase",
    "Strong lyrical content",
    "Multi-genre versatility"
  ],
  "weaknesses": [
    "High collaboration rate (selective partners)",
    "Established production style"
  ],
  "outreach": "Your storytelling approach would complement artists focusing on introspective narratives..."
}
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "Backend is running!"
}
```

## 🔧 Deployment

### Frontend Deployment

**GitHub Pages** (Free)
1. Push to `main` branch
2. Go to repository Settings → Pages
3. Set source to `main` branch
4. Frontend will be live at `https://ClientaPulse.github.io/clienta-pulse-scout`

**Netlify / Vercel**
- Connect your GitHub repository
- Frontend auto-deploys on every push

### Backend Deployment

**Render** (Recommended - Free tier available)
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Set Start Command: `npm start`
5. Add environment variable: `OPENAI_API_KEY`

**Railway**
1. Go to [railway.app](https://railway.app)
2. Create new project
3. Deploy from GitHub
4. Add `OPENAI_API_KEY` variable

**Vercel Functions**
1. Deploy backend as serverless function
2. Use `/api/analyze` endpoint

## 📝 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | ✅ Yes | Your OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys) |
| `PORT` | ❌ No | Backend port (default: 3000) |

## 🎨 Features

✅ **Artist Analysis**
- Stage assessment (Emerging/Developing/Established/Major)
- Genre identification
- Collaboration fit scoring (0-100)

✅ **Detailed Reports**
- Strengths & weaknesses
- Personalized outreach messaging
- AI-powered insights

✅ **Responsive Design**
- Mobile-friendly interface
- Beautiful gradient UI
- Loading states & error handling

✅ **Secure**
- API keys never exposed to frontend
- CORS protected backend
- Input validation

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **AI**: OpenAI GPT-3.5-turbo
- **Hosting**: Render, Railway, Vercel, GitHub Pages

## 📚 API Cost Estimates

OpenAI pricing (as of 2024):
- **GPT-3.5-turbo**: ~$0.0005 per analysis
- **Free tier**: $5 credits (≈10,000 analyses)

[Check current pricing](https://openai.com/pricing)

## 🚨 Troubleshooting

### Backend not connecting?
```bash
# Check if backend is running
curl http://localhost:3000/health

# Check for errors in terminal
# Make sure Port 3000 is not blocked
```

### OpenAI API errors?
```
❌ Error: Invalid API key
→ Verify OPENAI_API_KEY in .env is correct

❌ Error: Rate limited
→ Wait a moment and retry (free tier has limits)

❌ Error: Insufficient credits
→ Add a payment method to your OpenAI account
```

### CORS errors?
- Backend is running and CORS is configured
- Frontend is accessing correct URL
- Check browser console for specific error

## 📖 File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | User interface with form and results |
| `style.css` | Modern gradient styling |
| `script.js` | Frontend logic & API calls |
| `server.js` | Express backend & OpenAI integration |
| `package.json` | Dependencies & scripts |
| `.env.example` | Environment variable template |
| `.gitignore` | Files to exclude from version control |

## 🤝 Contributing

Feel free to submit issues, fork the repo, and send pull requests!

## 📄 License

MIT License - feel free to use this project however you'd like.

## 🔗 Links

- **OpenAI API**: https://platform.openai.com
- **Express Documentation**: https://expressjs.com
- **Deploy on Render**: https://render.com
- **Deploy on Railway**: https://railway.app

---

**Built with ❤️ by Clienta Pulse**
