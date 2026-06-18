import React from "react";
import { CredibilityReport } from "../types";
import "./Report.css";

interface ReportProps {
  report: CredibilityReport;
}

export const Report: React.FC<ReportProps> = ({ report }) => {
  const getScoreColor = (score: number): string => {
    if (score >= 80) return "#28a745";
    if (score >= 60) return "#ffc107";
    if (score >= 40) return "#ff9800";
    return "#dc3545";
  };

  const getGradeColor = (grade: string): string => {
    if (grade === "A") return "#28a745";
    if (grade === "B") return "#17a2b8";
    if (grade === "C") return "#ffc107";
    if (grade === "D") return "#ff9800";
    return "#dc3545";
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <img src={report.avatarUrl} alt={report.username} className="avatar" />
        <div className="header-content">
          <h1>{report.username}</h1>
          <a href={report.profileUrl} target="_blank" rel="noopener noreferrer" className="profile-link">
            View Profile on GitHub
          </a>
        </div>
      </div>

      <div className="dev-score-card">
        <div className="score-display">
          <div className="score-number">{report.devScore}</div>
          <div className="score-label">DevScore</div>
        </div>
        <div className="grade-display" style={{ backgroundColor: getGradeColor(report.grade) }}>
          <div className="grade-letter">{report.grade}</div>
        </div>
      </div>

      <div className="scores-grid">
        <div className="score-item">
          <div className="score-label">Profile Completeness</div>
          <div className="score-bar">
            <div
              className="score-fill"
              style={{
                width: `${report.scores.profileCompleteness}%`,
                backgroundColor: getScoreColor(report.scores.profileCompleteness),
              }}
            />
          </div>
          <div className="score-value">{report.scores.profileCompleteness}/100</div>
        </div>

        <div className="score-item">
          <div className="score-label">Repo Activity</div>
          <div className="score-bar">
            <div
              className="score-fill"
              style={{
                width: `${report.scores.repoActivity}%`,
                backgroundColor: getScoreColor(report.scores.repoActivity),
              }}
            />
          </div>
          <div className="score-value">{report.scores.repoActivity}/100</div>
        </div>

        <div className="score-item">
          <div className="score-label">Language Diversity</div>
          <div className="score-bar">
            <div
              className="score-fill"
              style={{
                width: `${report.scores.languageDiversity}%`,
                backgroundColor: getScoreColor(report.scores.languageDiversity),
              }}
            />
          </div>
          <div className="score-value">{report.scores.languageDiversity}/100</div>
        </div>

        <div className="score-item">
          <div className="score-label">Account Consistency</div>
          <div className="score-bar">
            <div
              className="score-fill"
              style={{
                width: `${report.scores.accountConsistency}%`,
                backgroundColor: getScoreColor(report.scores.accountConsistency),
              }}
            />
          </div>
          <div className="score-value">{report.scores.accountConsistency}/100</div>
        </div>
      </div>

      <div className="stats-section">
        <h3>Developer Stats</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-label">Total Repos</div>
            <div className="stat-value">{report.stats.totalRepos}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Followers</div>
            <div className="stat-value">{report.stats.totalFollowers}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Account Age</div>
            <div className="stat-value">{report.stats.accountAge} years</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Languages</div>
            <div className="stat-value">{report.stats.languagesUsed.length}</div>
          </div>
        </div>
      </div>

      {report.stats.languagesUsed.length > 0 && (
        <div className="languages-section">
          <h3>Languages Used</h3>
          <div className="language-tags">
            {report.stats.languagesUsed.map((lang) => (
              <span key={lang} className="language-tag">
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}

      {report.bestRepo && (
        <div className="best-repo-section">
          <h3>🌟 Best Repository</h3>
          <div className="repo-card">
            <div className="repo-name">{report.bestRepo.name}</div>
            {report.bestRepo.language && (
              <div className="repo-language">{report.bestRepo.language}</div>
            )}
            <div className="repo-stars">⭐ {report.bestRepo.stars} stars</div>
            <a href={report.bestRepo.url} target="_blank" rel="noopener noreferrer" className="repo-link">
              View Repository
            </a>
          </div>
        </div>
      )}

      <div className="timestamp">
        Generated: {new Date(report.timestamp).toLocaleString()}
      </div>
    </div>
  );
};
