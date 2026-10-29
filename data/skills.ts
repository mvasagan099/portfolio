import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Building fast, accessible interfaces.",
    skills: [
      { name: "Next.js", icon: "next" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    title: "Backend",
    description: "Designing APIs and services.",
    skills: [
      { name: "Node.js", icon: "node" },
      { name: "Fastify", icon: "api" },
      { name: "REST APIs", icon: "api" },
      { name: "WebSockets", icon: "socket" },
    ],
  },
  {
    title: "Databases",
    description: "Modeling and querying data.",
    skills: [
      { name: "PostgreSQL", icon: "postgres" },
      { name: "MySQL", icon: "mysql" },
      { name: "Redis", icon: "redis" },
      { name: "Prisma", icon: "prisma" },
    ],
  },
  {
    title: "DevOps / Infrastructure",
    description: "Packaging and shipping robustly.",
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "Nginx", icon: "nginx" },
      { name: "Git", icon: "git" },
      { name: "CI/CD", icon: "cicd" },
    ],
  },
  {
    title: "Mobile & Platforms",
    description: "Bringing web and native capabilities together.",
    skills: [
      { name: "Flutter", icon: "flutter" },
      { name: "Dart", icon: "dart" },
      { name: "Capacitor", icon: "capacitor" },
      { name: "Supabase", icon: "supabase" },
    ],
  },
  {
    title: "Applied ML · Exploring",
    description: "Building applied models.",
    skills: [
      { name: "Python", icon: "python" },
      { name: "XGBoost", icon: "xgboost" },
      { name: "Pandas", icon: "pandas" },
      { name: "Scikit-learn", icon: "sklearn" },
    ],
  },
];
