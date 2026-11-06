/** Build-time public origin. Set SITE_URL when deploying to another domain. */
const configured =
  process.env.SITE_URL ||
  "https://manivasagan-developer-portfolio.mvasagan099.chatgpt.site";
const parsed = new URL(configured);
if (
  !["https:", "http:"].includes(parsed.protocol) ||
  parsed.username ||
  parsed.password ||
  parsed.search ||
  parsed.hash ||
  parsed.pathname !== "/"
)
  throw new Error(
    "SITE_URL must be an HTTP(S) origin without a path, query, or credentials."
  );
export const siteUrl = parsed.origin;
