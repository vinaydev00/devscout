import { GitHubUser, GitHubRepo, CredibilityReport } from "./types.ts";

export function calculateProfileCompleteness(user: GitHubUser): number {
  let score = 0;
  const maxPoints = 5;

  if (user.name) score++;
  if (user.bio) score++;
  if (user.company) score++;
  if (user.blog) score++;
  if (user.avatar_url && user.avatar_url !== "") score++;

  return Math.round((score / maxPoints) * 100);
}

export function calculateRepoActivity(
  user: GitHubUser,
  repos: GitHubRepo[]
): number {
  if (repos.length === 0) return 0;

  const now = new Date();
  const accountCreated = new Date(user.created_at);
  const accountAgeMonths =
    (now.getTime() - accountCreated.getTime()) / (1000 * 60 * 60 * 24 * 30);

  // Activity metrics
  const repoCount = Math.min(user.public_repos, 100);
  const recentRepos = repos.filter((r) => {
    const pushedDate = new Date(r.pushed_at);
    const monthsAgo =
      (now.getTime() - pushedDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    return monthsAgo < 6;
  }).length;

  const avgStars =
    repos.length > 0
      ? repos.reduce((sum, r) => sum + r.stars, 0) / repos.length
      : 0;

  const repoScore = Math.min(repoCount * 2, 30);
  const recentScore = Math.min(recentRepos * 5, 35);
  const starsScore = Math.min(avgStars / 2, 35);

  return Math.round((repoScore + recentScore + starsScore) / 100 * 100);
}

export function calculateLanguageDiversity(repos: GitHubRepo[]): number {
  const languages = new Set<string>();
  const filteredRepos = repos.filter((r) => r.stars > 0 || r.language);

  filteredRepos.forEach((repo) => {
    if (repo.language) languages.add(repo.language);
  });

  const uniqueLanguages = languages.size;

  if (uniqueLanguages === 0) return 0;
  if (uniqueLanguages === 1) return 20;
  if (uniqueLanguages === 2) return 40;
  if (uniqueLanguages === 3) return 60;
  if (uniqueLanguages === 4) return 75;
  return Math.min(uniqueLanguages * 15, 100);
}

export function calculateAccountConsistency(
  user: GitHubUser,
  repos: GitHubRepo[]
): number {
  const now = new Date();
  const accountCreated = new Date(user.created_at);
  const lastUpdated = new Date(user.updated_at);
  const accountAgeMonths =
    (now.getTime() - accountCreated.getTime()) / (1000 * 60 * 60 * 24 * 30);

  let score = 0;
  const maxScore = 100;

  // Consistency: account longevity
  const longevityScore = Math.min(accountAgeMonths / 12 * 30, 30); // Max 30 points for 1+ years
  score += longevityScore;

  // Consistency: repos to followers ratio (engaged community)
  const followerEngagement = Math.min(user.followers / 10, 25); // Max 25 points
  score += followerEngagement;

  // Consistency: active contributions (commits across multiple repos)
  const activeRepos = repos.filter((r) => {
    const pushed = new Date(r.pushed_at);
    const monthsAgo =
      (now.getTime() - pushed.getTime()) / (1000 * 60 * 60 * 24 * 30);
    return monthsAgo < 12;
  }).length;
  const repoConsistency = Math.min(activeRepos * 2, 25); // Max 25 points
  score += repoConsistency;

  // Consistency: profile maintenance (updated profile)
  const monthsSinceUpdate =
    (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24 * 30);
  const maintenanceScore = monthsSinceUpdate < 6 ? 20 : monthsSinceUpdate < 12 ? 10 : 0;
  score += maintenanceScore;

  return Math.min(Math.round((score / maxScore) * 100), 100);
}

export function getGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

export function generateCredibilityReport(
  user: GitHubUser,
  repos: GitHubRepo[]
): CredibilityReport {
  const profileCompleteness = calculateProfileCompleteness(user);
  const repoActivity = calculateRepoActivity(user, repos);
  const languageDiversity = calculateLanguageDiversity(repos);
  const accountConsistency = calculateAccountConsistency(user, repos);

  const devScore = Math.round(
    (profileCompleteness * 0.2 +
      repoActivity * 0.35 +
      languageDiversity * 0.25 +
      accountConsistency * 0.2) /
      100 * 100
  );

  const now = new Date();
  const accountCreated = new Date(user.created_at);
  const accountAge = Math.floor(
    (now.getTime() - accountCreated.getTime()) / (1000 * 60 * 60 * 24 * 365)
  );

  const languages = new Set<string>();
  repos.forEach((r) => {
    if (r.language) languages.add(r.language);
  });

  const bestRepo = repos.length > 0
    ? repos.reduce((best, current) =>
        current.stars > (best.stars || 0) ? current : best
      )
    : undefined;

  return {
    username: user.login,
    avatarUrl: user.avatar_url,
    profileUrl: user.html_url,
    devScore,
    grade: getGrade(devScore),
    scores: {
      profileCompleteness,
      repoActivity,
      languageDiversity,
      accountConsistency,
    },
    stats: {
      totalRepos: user.public_repos,
      totalFollowers: user.followers,
      accountAge,
      languagesUsed: Array.from(languages).sort(),
    },
    bestRepo: bestRepo
      ? {
          name: bestRepo.name,
          url: bestRepo.url,
          language: bestRepo.language,
          stars: bestRepo.stars,
        }
      : undefined,
    timestamp: new Date().toISOString(),
  };
}
