/**
 * A URL is "real" when the user has actually configured it.
 * The portfolio ships with safe placeholders so nothing fabricated
 * gets presented as fact; these helpers treat those as "not set".
 */
export function isProfileUrl(url: string): boolean {
  return !!url && url !== "#" && url !== "https://github.com/";
}

export function isConfiguredGithub(username: string): boolean {
  return !!username && username !== "github-username";
}

export function isConfiguredEmail(email: string): boolean {
  return !!email && email !== "hello@example.com";
}