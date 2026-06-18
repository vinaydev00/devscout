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
