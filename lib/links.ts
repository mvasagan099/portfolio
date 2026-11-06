export function isProfileUrl(url: string): boolean {
  try { const u = new URL(url); return ["https:", "http:"].includes(u.protocol) && !!u.hostname; } catch { return false; }
}
export function isConfiguredGithub(username: string): boolean {
  return !!username && username !== "github-username";
}
export function isConfiguredEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !email.endsWith("@example.com");
}
