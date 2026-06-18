# DevScout - Quick Setup Guide

## ⚡ 60-Second Setup

### Option 1: Local Development (Recommended for Development)

```bash
# 1. Install dependencies
npm install
cd client && npm install && cd ..

# 2. Copy environment file
cp .env.example .env
# (Optional: Add GITHUB_TOKEN for higher API rate limits)

# 3. Start development server (runs both backend & frontend)
npm run dev
```

**Result**: 
- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

### Option 2: Docker (Recommended for Production)

```bash
# 1. Build and run with Docker Compose
docker-compose up --build
```

**Result**: Application running on `http://localhost:3000`

### Option 3: Manual Build & Run

```bash
# 1. Install dependencies
npm install && cd client && npm install && cd ..

# 2. Build both server and client
npm run build

# 3. Start production server
npm start
```

**Result**: Application running on `http://localhost:3000`

---

## 📋 Available Commands

### Development
```bash
npm run dev              # Start dev server (backend + frontend)
npm run dev:server      # Start backend only (port 3000)
npm run dev:client      # Start frontend only (port 5173)
```

### Building
```bash
npm run build            # Build server + client
npm run build:client     # Build React app only
```

### Quality
```bash
npm run lint            # Run ESLint on backend code
npm test                # Run tests
```

### Production
```bash
npm start               # Run production server
```

---

## 🔧 Environment Variables

Create a `.env` file from `.env.example`:

```env
# GitHub API Token (optional but recommended)
# Get one at: https://github.com/settings/tokens
# Required scopes: public_repo, read:user
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxx

# Server port (default: 3000)
PORT=3000

# Environment mode
NODE_ENV=development
```

---

## 🐳 Docker Commands

```bash
# Build image
docker build -t devscout .

# Run container
docker run -p 3000:3000 -e GITHUB_TOKEN=your_token devscout

# Using Docker Compose
docker-compose up --build

# View logs
docker-compose logs -f

# Stop container
docker-compose down
```

---

## 📝 Project Structure

```
devscout/
├── src/                          # Backend (Node.js + TypeScript)
│   ├── server.ts                # Express server setup
│   ├── github.ts                # GitHub API integration
│   ├── scorer.ts                # Scoring algorithm
│   └── types.ts                 # Shared TypeScript types
│
├── client/                       # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── App.tsx              # Main React component
│   │   ├── App.css              # Styling
│   │   ├── main.tsx             # React entry point
│   │   ├── types.ts             # Type definitions
│   │   └── components/
│   │       ├── SearchBox.tsx    # Search component
│   │       ├── SearchBox.css
│   │       ├── Report.tsx       # Report display component
│   │       └── Report.css
│   ├── index.html               # HTML template
│   ├── vite.config.ts           # Vite configuration
│   └── tsconfig.json            # TypeScript config
│
├── Dockerfile                    # Docker image definition
├── docker-compose.yml           # Docker Compose setup
├── package.json                 # Root dependencies
├── tsconfig.json                # Backend TypeScript config
├── .eslintrc.json              # ESLint configuration
├── .editorconfig                # Editor settings
├── .gitignore                   # Git ignore rules
├── .env.example                 # Example environment variables
├── README.md                    # Full documentation
├── CONTRIBUTING.md              # Contributing guidelines
└── RELEASE_NOTES.md             # Release information
```

---

## 🌐 API Usage

### Analyze a GitHub User

**Endpoint:** `POST /api/analyze`

**Request:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"username": "torvalds"}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "username": "torvalds",
    "devScore": 95,
    "grade": "A",
    "scores": {
      "profileCompleteness": 100,
      "repoActivity": 98,
      "languageDiversity": 95,
      "accountConsistency": 92
    },
    "stats": {
      "totalRepos": 45,
      "totalFollowers": 250000,
      "accountAge": 19,
      "languagesUsed": ["C", "Shell", "Python"]
    },
    "bestRepo": {
      "name": "linux",
      "url": "https://github.com/torvalds/linux",
      "language": "C",
      "stars": 180000
    }
  }
}
```

### Health Check

**Endpoint:** `GET /api/health`

```bash
curl http://localhost:3000/api/health
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port
PORT=3001 npm run dev
```

### GitHub API Rate Limit
- Add a `GITHUB_TOKEN` to `.env`
- Get token at: https://github.com/settings/tokens/new
- Required scopes: `public_repo`, `read:user`

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules client/node_modules package-lock.json
npm install && cd client && npm install
```

### Build Issues
```bash
# Clean build
npm run build
```

---

## 📊 Scoring Details

DevScore is calculated from 4 components:

1. **Profile Completeness (20%)**: Name, bio, company, blog, avatar
2. **Repository Activity (35%)**: Repo count, recent updates, stars
3. **Language Diversity (25%)**: Number of unique programming languages
4. **Account Consistency (20%)**: Account age, followers, contribution consistency

**Grades:**
- A: 90-100 (Outstanding)
- B: 80-89 (Strong)
- C: 70-79 (Solid)
- D: 60-69 (Developing)
- F: <60 (Limited)

---

## 🚀 Next Steps

1. Set up your `.env` with a GitHub token
2. Run `npm run dev` to start locally
3. Visit `http://localhost:5173` in your browser
4. Try analyzing a GitHub profile (e.g., "torvalds")
5. Customize scoring weights in `src/scorer.ts` as needed

---

## 📚 Additional Resources

- [README.md](README.md) - Full documentation
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute
- [RELEASE_NOTES.md](RELEASE_NOTES.md) - Version history
- [GitHub API Docs](https://docs.github.com/en/rest)

---

**Happy analyzing! 🎉**
