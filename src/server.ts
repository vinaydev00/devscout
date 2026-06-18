import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { fetchGitHubUser, fetchUserRepos, fetchUserLanguages } from "./github.ts";
import { generateCredibilityReport } from "./scorer.ts";
import { APIResponse, CredibilityReport } from "./types.ts";

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

// Serve static files from client build
const clientPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientPath));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ success: true, status: "ok" });
});

// Main endpoint: Generate credibility report
app.post("/api/analyze", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || typeof username !== "string") {
      return res.status(400).json({
        success: false,
        error: "Username is required",
      } as APIResponse);
    }

    // Fetch user data and repos
    const [user, repos] = await Promise.all([
      fetchGitHubUser(username),
      fetchUserRepos(username),
    ]);

    // Generate report
    const report = generateCredibilityReport(user, repos);

    res.json({
      success: true,
      data: report,
    } as APIResponse<CredibilityReport>);
  } catch (error: any) {
    console.error("Error analyzing user:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to analyze user",
    } as APIResponse);
  }
});

// Serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`DevScout server running on http://localhost:${PORT}`);
});
