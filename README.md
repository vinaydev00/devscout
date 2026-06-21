# DevScout 🚀 >  Status: Core functionality complete. Deployment in progress.

**Instant GitHub Developer Credibility Report Generator**

Recruiters and hiring managers spend 5+ minutes manually skimming a candidate's GitHub profile to judge credibility — checking repo count, activity, language diversity, and profile completeness. DevScout automates this process, generating a professional "Developer Credibility Report" in seconds.

## 🎯 Features

- **DevScore (0-100)**: Automated credibility scoring with letter grade (A-F)
- **Multi-Dimensional Analysis**:
  - Profile Completeness (name, bio, company, blog, avatar)
  - Repository Activity (recent commits, stars, forks)
  - Language Diversity (languages used across projects)
  - Account Consistency (longevity, followers, engagement)
- **Best Repository Highlight**: Automatically identifies and showcases the developer's most starred repo
- **Instant Results**: 5-second analysis vs. 5-minute manual review
- **Beautiful UI**: Professional, responsive report interface

## 🏗️ Architecture

### Stack
- **Backend**: Node.js + Express + TypeScript
- **Frontend**: React + TypeScript + Vite
- **API Integration**: GitHub REST API via Octokit
- **Deployment**: Docker + GitHub Actions CI/CD

### Project Structure
```
devscout/
├── src/                      # Backend source
│   ├── server.ts            # Express server
│   ├── github.ts            # GitHub API client
│   ├── scorer.ts            # Scoring engine
│   └── types.ts             # TypeScript types
├── client/                   # React frontend
│   ├── src/
│   │   ├── App.tsx          # Main app component
│   │   ├── components/      # React components
│   │   └── types.ts         # Frontend types
│   └── index.html           # HTML template
├── Dockerfile               # Docker image definition
├── docker-compose.yml       # Compose configuration
├── package.json             # Root dependencies
└── .github/workflows/       # GitHub Actions CI/CD
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn
- GitHub Personal Access Token (optional, for increased API rate limits)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/devscout.git
cd devscout
```

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env and add your GitHub token (optional)
```

3. **Install dependencies**
```bash
npm install
cd client && npm install && cd ..
```

### Development

Run both server and client in development mode:
```bash
npm run dev
```

This starts:
- Backend API on `http://localhost:3000`
- Frontend on `http://localhost:5173`

### Build

Build the entire application:
```bash
npm run build
```

Outputs:
- `dist/` - Compiled server code
- `client/dist/` - Compiled React app

### Production

Start the production server:
```bash
npm start
```

## 🐳 Docker Deployment

### Using Docker Compose
```bash
docker-compose up --build
```

Access the application at `http://localhost:3000`

### Using Docker CLI
```bash
docker build -t devscout .
docker run -p 3000:3000 -e GITHUB_TOKEN=your_token devscout
```

## 📊 Scoring Methodology

### Component Scores (0-100)

**Profile Completeness (20% weight)**
- Name, bio, company, blog, avatar each worth 20 points

**Repository Activity (35% weight)**
- Repo count (up to 30 pts)
- Recent updates in last 6 months (up to 35 pts)
- Average stars per repo (up to 35 pts)

**Language Diversity (25% weight)**
- 1 language: 20 pts
- 2 languages: 40 pts
- 3 languages: 60 pts
- 4 languages: 75 pts
- 5+ languages: up to 100 pts

**Account Consistency (20% weight)**
- Account longevity (30 pts for 1+ years)
- Follower engagement (25 pts)
- Active repositories (25 pts)
- Profile maintenance (20 pts)

### Letter Grades
- **A**: 90-100 (Outstanding credibility)
- **B**: 80-89 (Strong credibility)
- **C**: 70-79 (Solid credibility)
- **D**: 60-69 (Developing credibility)
- **F**: <60 (Limited credibility)

## 🔌 API Endpoints

### POST /api/analyze
Analyze a GitHub user and generate a credibility report.

**Request:**
```json
{
  "username": "torvalds"
}
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
    },
    "timestamp": "2024-06-18T12:00:00Z"
  }
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "success": true,
  "status": "ok"
}
```

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | No | GitHub API token for authenticated requests (increases rate limits) |
| `PORT` | No | Server port (default: 3000) |
| `NODE_ENV` | No | Environment mode (development/production) |

## 📦 Dependencies

### Backend
- `express` - Web framework
- `octokit` - GitHub API client
- `cors` - CORS middleware
- `dotenv` - Environment configuration
- `typescript` - Type safety

### Frontend
- `react` - UI library
- `axios` - HTTP client
- `vite` - Build tool

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📝 License

MIT - See [LICENSE](LICENSE) for details

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📊 Use Cases

- **Recruiter Screening**: Quickly evaluate candidates before interviews
- **HR Analytics**: Analyze team technical depth and language coverage
- **Tech Leads**: Assess new hire GitHub credibility
- **Career Planning**: Self-assessment and progress tracking

## 🐛 Known Limitations

- GitHub API rate limits: 60 requests/hour (unauthenticated), 5000/hour (authenticated)
- Only analyzes public repositories
- Language detection depends on GitHub's classification accuracy

## 🚦 Roadmap

- [ ] GitHub authentication for OAuth login
- [ ] Historical score tracking and trends
- [ ] Batch analysis for multiple users
- [ ] Export reports to PDF/CSV
- [ ] Custom scoring weights
- [ ] Comparison view for multiple profiles
- [ ] API rate limit handling
- [ ] Caching layer

## 📞 Support

For issues or questions, please:
- Open an issue on GitHub
- Check existing documentation
- Review API response error messages

---

**Made with ❤️ for recruiters, hiring managers, and developers**
