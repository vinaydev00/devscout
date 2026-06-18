export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string;
  company?: string;
  blog?: string;
  bio?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  name: string;
  url: string;
  description?: string;
  language?: string;
  stars: number;
  forks: number;
  open_issues: number;
  created_at: string;
  pushed_at: string;
  updated_at: string;
}

export interface CredibilityReport {
  username: string;
  avatarUrl: string;
  profileUrl: string;
  devScore: number;
  grade: string;
  scores: {
    profileCompleteness: number;
    repoActivity: number;
    languageDiversity: number;
    accountConsistency: number;
  };
  stats: {
    totalRepos: number;
    totalFollowers: number;
    accountAge: number;
    languagesUsed: string[];
  };
  bestRepo?: {
    name: string;
    url: string;
    language?: string;
    stars: number;
  };
  timestamp: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
