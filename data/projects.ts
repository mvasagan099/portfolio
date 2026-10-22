import type { Project } from "@/types";

/**
 * Project data. Content is kept separate from UI components so the portfolio
 * scales easily. All fields render only if present in this data file — nothing
 * here is auto-generated or fabricated.
 */
export const projects: Project[] = [
  {
    slug: "gaming-hub",
    title: "Gaming Hub",
    shortDescription: "Real-time multiplayer gaming platform.",
    oneLiner: "Real-time multiplayer platform built on a distributed architecture.",
    longDescription:
      "A real-time multiplayer gaming platform designed to demonstrate production-grade backend architecture: scalable real-time communication, resilient data persistence, and containerized deployment.",
    technologies: ["Next.js", "Node.js", "Socket.IO", "Redis", "PostgreSQL", "Docker", "Nginx"],
    category: "Real-Time Systems",
    featured: true,
    order: 1,
    status: "Architecture reference",
    githubUrl: "#", // REQUIRED
    liveUrl: undefined,
    problem:
      "Building a multiplayer experience requires coordinating many connected clients with low latency while keeping server state consistent and durable.",
    approach:
      "A client-server topology where an API service and a Socket.IO gateway sit behind Nginx, sharing state through Redis for real-time coordination and persisting durable data in PostgreSQL.",
    architecture: {
      enabled: true,
      type: "Current Architecture",
    },
    challenges: [
      {
        challenge: "Coordinating many concurrent real-time connections.",
        solution: "Use Redis as a shared pub/sub layer so multiple gateway instances can broadcast to connected clients consistently.",
      },
      {
        challenge: "Keeping durable game/session data reliable.",
        solution: "Persist authoritative state to PostgreSQL while using Redis for fast, ephemeral in-memory coordination.",
      },
      {
        challenge: "Routing and scaling the deployment.",
        solution: "Terminate TLS and route traffic through Nginx, with each component containerized and horizontally scalable.",
      },
    ],
    learned: [
      "Designing for concurrency and state consistency in real-time systems.",
      "Layering in-memory coordination with durable persistence.",
      "Containerizing and reverse-proxying a multi-service architecture.",
    ],
    futureImprovements: [
      "Add observability and structured logging across components.",
      "Introduce horizontal scaling with connection-aware load balancing.",
      "Add automated load and resilience testing.",
    ],
  },
];
