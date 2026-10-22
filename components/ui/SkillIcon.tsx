type SkillIconProps = {
  name: string;
  className?: string;
};

// Simple monogram glyphs (no brand SVG library, no emojis).
const glyphs: Record<string, string> = {
  next: "N",
  react: "R",
  typescript: "TS",
  tailwind: "T",
  node: "N",
  nest: "N",
  api: "API",
  socket: "W",
  postgres: "PG",
  mysql: "MY",
  redis: "RD",
  prisma: "PR",
  docker: "DK",
  nginx: "NG",
  git: "G",
  cicd: "CI",
  python: "PY",
  xgboost: "XG",
  pandas: "PD",
  sklearn: "SK",
};

/**
 * Lightweight, dependency-free icon for skill cards. Uses compact monograms
 * so we avoid shipping a large brand-SVG icon library.
 */
export function SkillIcon({ name, className }: SkillIconProps) {
  return (
    <span className={`inline-flex items-center justify-center ${className ?? ""}`}>
      {glyphs[name] ?? name.charAt(0).toUpperCase()}
    </span>
  );
}