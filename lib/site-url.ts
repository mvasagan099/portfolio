/** Set SITE_URL to the final public origin when deploying to your own domain. */
export const siteUrl = (process.env.SITE_URL || "https://manivasagan-developer-portfolio.validharp514.chatgpt.site").replace(/\/$/, "");
