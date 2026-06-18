import React from "react";
import "./SearchBox.css";

interface SearchBoxProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, isLoading }) => {
  const [username, setUsername] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          className="search-input"
        />
        <button type="submit" disabled={isLoading} className="search-button">
          {isLoading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
    </div>
  );
};
