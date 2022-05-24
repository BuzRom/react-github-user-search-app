export type UserType = {
  id: string;
  bio: string
  login: string
  name: string
  email: string
  location: string
  followers: number
  following: number
  created_at: string
  avatar_url: string
  public_repos: number
  repos_url: string
}

export type RepositoryType = {
  id: string;
  name: string
  html_url: string
  forks_count: number
  stargazers_count: number
}
