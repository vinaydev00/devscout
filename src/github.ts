import { Octokit } from "octokit";
import { GitHubUser, GitHubRepo } from "./types.ts";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  try {
    const { data } = await octokit.rest.users.getByUsername({ username });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch user ${username}: ${error}`);
  }
}

export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const { data } = await octokit.rest.repos.listForUser({
      username,
      per_page: 100,
      sort: "stars",
    });

    return data.map((repo: any) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      open_issues: repo.open_issues_count,
      created_at: repo.created_at,
      pushed_at: repo.pushed_at,
      updated_at: repo.updated_at,
    }));
  } catch (error) {
    throw new Error(`Failed to fetch repos for ${username}: ${error}`);
  }
}

export async function fetchUserLanguages(
  username: string,
  repos: GitHubRepo[]
): Promise<string[]> {
  const languages = new Set<string>();

  for (const repo of repos.slice(0, 30)) {
    if (repo.language) {
      languages.add(repo.language);
    }
  }

  return Array.from(languages).sort();
}
