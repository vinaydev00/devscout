import React, { useState } from "react";
import axios from "axios";
import { SearchBox } from "./components/SearchBox";
import { Report } from "./components/Report";
import { CredibilityReport, APIResponse } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [report, setReport] = useState<CredibilityReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (username: string) => {
    setError(null);
    setReport(null);
    setIsLoading(true);

    try {
      const response = await axios.post<APIResponse<CredibilityReport>>(
        "/api/analyze",
        { username }
      );

      if (response.data.success && response.data.data) {
        setReport(response.data.data);
      } else {
        setError(response.data.error || "Failed to analyze user");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.message ||
          "Failed to analyze user. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">DevScout</h1>
          <p className="app-subtitle">
            Instant GitHub Developer Credibility Analysis
          </p>
        </div>
      </header>

      <main className="app-main">
        <SearchBox onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className="error-message">
            <span>❌ {error}</span>
          </div>
        )}

        {report && <Report report={report} />}

        {!report && !error && !isLoading && (
          <div className="welcome-message">
            <p>Enter a GitHub username to generate a credibility report</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2024 DevScout. Made for recruiters and hiring managers.</p>
      </footer>
    </div>
  );
};

export default App;
