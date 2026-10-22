/**
 * Central site configuration.
 *
 * EDIT THIS FILE to update personal details. Values marked "REQUIRED" must be
 * filled with real data before going live. Nothing here is auto-claimed as fact;
 * fields we cannot verify are left empty / set to safe placeholders so they can
 * be filled in manually without touching any component code.
 */

export const site = {
  name: "Manivasagan A.",
  shortName: "Mani",
  title: "Software Developer",
  tagline: "I build scalable software systems.",
  // Availability indicator. Set to null to hide entirely.
  availabilityStatus: null as string | null,

  links: {
    // REQUIRED: fill with real profile URLs.
    github: {
      username: "mvasagan099",
      url: "https://github.com/mvasagan099",
    },
    linkedin: {
      url: "#", // REQUIRED
    },
    email: "hello@example.com", // REQUIRED
  },
};

export const hero = {
  // Values shown in the developer terminal component.
  whoami: "Manivasagan A.",
  focus: ["Full-stack development", "Real-time systems", "Backend architecture", "Machine learning"],
  stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "Python", "XGBoost"],
  status: "Building and learning.",
};

export const technicalHighlights = [
  "Real-time systems",
  "Backend architecture",
  "Full-stack applications",
  "Machine learning",
];

export const timeline = [
  { label: "Computer Science & Engineering", description: "Foundation in computing fundamentals" },
  { label: "Web Development", description: "Building for the browser" },
  { label: "Full-Stack Development", description: "End-to-end product engineering" },
  { label: "Backend & Real-Time Systems", description: "Architecture, concurrency, data" },
  { label: "Machine Learning", description: "Applied models and pipelines" },
];

export const engineeringPrinciples: {
  number: string;
  title: string;
  description: string;
}[] = [
  { number: "01", title: "Understand the problem", description: "Clarify requirements and constraints before writing code." },
  { number: "02", title: "Design the architecture", description: "Choose the right structure for scale, clarity, and change." },
  { number: "03", title: "Build the system", description: "Implement with clean, maintainable, testable code." },
  { number: "04", title: "Test and debug", description: "Verify behavior, handle failure modes, and iterate." },
  { number: "05", title: "Deploy and improve", description: "Ship, observe, measure, and refine continuously." },
];

export const experience: {
  role: string;
  company: string;
  date: string;
  description: string;
  technologies: string[];
  contributions: string[];
}[] = [
  {
    role: "Software Developer",
    company: "Full-stack & ML projects",
    date: "", // REQUIRED
    description: "Hands-on projects across full-stack web development, real-time systems, and machine learning.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "Python", "XGBoost"],
    contributions: [
      "Designed and built full-stack applications end to end.",
      "Implemented real-time communication and backend services.",
      "Trained and evaluated machine-learning models on structured data.",
    ],
  },
];

export const certifications = [] as {
  title: string;
  issuer: string;
  date?: string;
  url?: string;
}[];

export const achievements = [] as {
  title: string;
  description: string;
  date?: string;
}[];

export const githubSection = {
  username: "mvasagan099",
  url: "https://github.com/mvasagan099",
  repos: [
    {
      name: "Gaming Hub",
      description: "Real-time multiplayer gaming platform architecture.",
      language: "TypeScript",
      url: "#", // REQUIRED
    },
    {
      name: "Trade Prediction",
      description: "Machine learning pipeline for structured financial data.",
      language: "Python",
      url: "#", // REQUIRED
    },
  ],
};
