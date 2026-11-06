export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  oneLiner: string;
  technologies: string[];
  category: string;
  featured: boolean;
  order: number;
  status?: string;
  githubUrl?: string;
  liveUrl?: string;
  problem?: string;
  approach?: string;
  architecture?: {
    enabled: boolean;
    type?: string;
    layers: string[][];
  };
  challenges?: {
    challenge: string;
    solution: string;
  }[];
  learned?: string[];
  futureImprovements?: string[];
};

export type EngineeringStep = {
  number: string;
  title: string;
  description: string;
};

export type Skill = {
  name: string;
  icon?: string;
};

export type SkillCategory = {
  title: string;
  description: string;
  skills: Skill[];
};

export type TimelineItem = {
  label: string;
  description?: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  date: string;
  description: string;
  technologies: string[];
  contributions?: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  date?: string;
  url?: string;
};

export type Achievement = {
  title: string;
  description: string;
  date?: string;
};
