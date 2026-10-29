/** Portfolio content. Update professional details here. */
export const site = {
  name: "Manivasagan A.", shortName: "Mani", title: "Full Stack Developer",
  tagline: "Full Stack Developer in Chennai building web applications, real-time experiences, and reliable backend systems with React, Node.js, PostgreSQL, Redis, and Docker.",
  location: "Chennai, India",
  availabilityStatus: "Open to developer opportunities",
  links: {
    github: { username: "mvasagan099", url: "https://github.com/mvasagan099" },
    linkedin: { url: "https://www.linkedin.com/in/manivasagan-a-90b304339" },
    email: "mvasagan099@gmail.com",
  },
};
export const hero = {
  whoami: site.name,
  focus: ["Thoughtful interfaces", "Reliable APIs", "Real-time experiences"],
  stack: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
  status: "Learning. Building. Shipping.",
};
export const technicalHighlights = ["Web & mobile", "Real-time systems", "API development", "Cloud deployment"];
export const timeline = [
  { label: "Computer Science & Engineering", description: "B.E. CSE · Saraswathy College of Engineering and Technology · Anna University affiliated" },
  { label: "Building across web & mobile", description: "React applications, Flutter, and Android packaging with Capacitor." },
  { label: "Full Stack Developer", description: "Lords and Kings Enterprises Private Limited · Chennai · July 2026–present" },
  { label: "Exploring applied machine learning", description: "Time-series research, model evaluation, and Python APIs." },
];
export const engineeringPrinciples = [
  { number: "01", title: "Understand", description: "Start with the user, the problem, and the constraints." },
  { number: "02", title: "Build", description: "Connect a clear interface to a well-structured backend." },
  { number: "03", title: "Verify", description: "Test failure paths, reconnects, and real device behavior." },
  { number: "04", title: "Improve", description: "Ship, observe what happens, and keep making it better." },
];
export const experience = [{
  role: "Full Stack Developer", company: "Lords and Kings Enterprises Private Limited",
  date: "July 2026 — Present",
  description: "Building and maintaining web applications and backend services in Chennai, working across the interface, API, database, and deployment layers.",
  technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
  contributions: [
    "Develop attendance and administration workflows with location and photo capture.",
    "Build real-time application features, API integrations, and database-backed interfaces.",
    "Debug production issues, improve responsive layouts, and package applications for mobile devices.",
  ],
}];
export const certifications: { title: string; issuer: string; date?: string; url?: string }[] = [];
export const achievements: { title: string; description: string; date?: string }[] = [];
export const githubSection = {
  username: site.links.github.username, url: site.links.github.url,
  repos: [{ name: "portfolio", description: "The source behind this site. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.", language: "TypeScript", url: "https://github.com/mvasagan099/portfolio" }],
};
