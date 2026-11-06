import type { Project } from "@/types";

export const projects: Project[] = [
  {
    "slug": "gaming-hub",
    "title": "Gaming Hub",
    "shortDescription": "Keeping multiplayer experiences in sync.",
    "oneLiner": "A web and mobile gaming platform with real-time matches, reconnection, and tournament workflows.",
    "longDescription": "A collection of casual multiplayer games built with React, TypeScript, and Phaser. The backend combines Fastify APIs with Socket.IO for shared match state, Redis for coordination, and PostgreSQL for persistent application data.",
    "technologies": [
      "React",
      "TypeScript",
      "Phaser.js",
      "Fastify",
      "Socket.IO",
      "Redis",
      "PostgreSQL",
      "Docker"
    ],
    "category": "Real-time",
    "status": "Ongoing development",
    "problem": "A multiplayer game needs more than a responsive screen: players must agree on when a match starts, what the current state is, and how to resume after a connection drops.",
    "approach": "Coordinate match readiness, countdowns, and authoritative starts on the server. Keep real-time events separate from durable records, and package the services with Docker.",
    "architecture": {
      "enabled": true,
      "type": "System overview",
      "layers": [
        [
          "React + Phaser client"
        ],
        [
          "Fastify API",
          "Socket.IO gateway"
        ],
        [
          "PostgreSQL records",
          "Redis coordination"
        ]
      ]
    },
    "challenges": [
      {
        "challenge": "Players joining or reconnecting at different times.",
        "solution": "Use a ready-check, synchronized countdown, and a server-managed match lifecycle."
      },
      {
        "challenge": "Tournament sessions need predictable endings.",
        "solution": "Add match time limits, scheduling, and detection of stuck sessions."
      }
    ],
    "learned": [
      "Designing reconnect behavior alongside the normal match flow.",
      "Separating real-time coordination from persistent application data."
    ],
    "futureImprovements": [
      "Validate performance under realistic concurrent-player loads.",
      "Improve tracing of match state and connection events."
    ],
    "featured": true,
    "order": 1
  },
  {
    "slug": "attendance-app",
    "title": "Attendance App",
    "shortDescription": "Attendance that connects the field to HR.",
    "oneLiner": "A location-aware attendance workflow for Android users and HR administrators.",
    "longDescription": "A React and Supabase application packaged with Capacitor for Android, with a desktop workflow for HR. It supports location and photo capture, attendance history, monthly reporting, and administrator controls.",
    "technologies": [
      "React",
      "Vite",
      "Supabase",
      "Capacitor",
      "Android"
    ],
    "category": "Web & mobile",
    "status": "Maintenance & improvements",
    "problem": "Field attendance needs supporting information, while HR needs a practical way to review records and prepare monthly reports.",
    "approach": "Capture attendance with a photo and device location, store records in Supabase, and give administrators searchable records and monthly reports. Add minimum-version enforcement for app updates.",
    "architecture": {
      "enabled": true,
      "type": "Workflow overview",
      "layers": [
        [
          "Android attendance client"
        ],
        [
          "Location + photo capture",
          "Supabase authentication"
        ],
        [
          "Attendance records",
          "HR review + reports"
        ]
      ]
    },
    "challenges": [
      {
        "challenge": "Managing app versions across installed devices.",
        "solution": "Check a centrally configured minimum version and direct users to update when required."
      },
      {
        "challenge": "Making daily records useful to HR.",
        "solution": "Add date, guard, and location filters alongside monthly attendance reporting."
      }
    ],
    "learned": [
      "Working with native device permissions in a web-based mobile application.",
      "Turning operational records into useful administrative workflows."
    ],
    "futureImprovements": [
      "Expand offline capture and synchronization testing.",
      "Improve permission guidance across Android versions."
    ],
    "featured": true,
    "order": 2
  },
  {
    "slug": "calculator-messenger",
    "title": "Calculator Messenger",
    "shortDescription": "Mobile messaging, with privacy in mind.",
    "oneLiner": "A Flutter messaging application with a calculator-style lock, offline storage, and calls.",
    "longDescription": "An Android application combining a calculator interface with PIN and biometric access, Supabase messaging, LiveKit calls, and Firebase notifications. Work includes encrypted SQLite storage, offline synchronization, app lifecycle handling, and release automation.",
    "technologies": [
      "Flutter",
      "Dart",
      "Supabase",
      "SQLite",
      "LiveKit",
      "Firebase"
    ],
    "category": "Web & mobile",
    "status": "Release verification in progress",
    "problem": "Messaging must remain usable across interruptions, offline periods, device authentication, and transitions to the camera or media picker.",
    "approach": "Keep lock state and app lifecycle handling explicit. Use encrypted local storage for offline data, synchronize with Supabase, and validate Android releases through a gated CI workflow.",
    "architecture": {
      "enabled": true,
      "type": "Application overview",
      "layers": [
        [
          "Flutter app + access lock"
        ],
        [
          "Supabase messaging",
          "LiveKit calls"
        ],
        [
          "Encrypted SQLite cache",
          "Firebase notifications"
        ]
      ]
    },
    "challenges": [
      {
        "challenge": "Returning from a media picker could interrupt the chat flow.",
        "solution": "Handle the picker lifecycle with a controlled handoff to the lock controller."
      },
      {
        "challenge": "Offline data needs to survive app restarts.",
        "solution": "Use encrypted SQLite storage and migrate existing cached messages."
      }
    ],
    "learned": [
      "Handling mobile lifecycle events and authentication as one connected flow.",
      "Making release checks part of the delivery process."
    ],
    "futureImprovements": [
      "Finish release APK size and launch verification.",
      "Broaden device testing for biometric and offline behavior."
    ],
    "featured": true,
    "order": 3
  },
  {
    "slug": "market-model-research",
    "title": "Market Model Research",
    "shortDescription": "Better questions before better predictions.",
    "oneLiner": "A research dashboard for evaluating 60-minute NIFTY futures models on unseen data.",
    "longDescription": "A Python and FastAPI research system with a Next.js dashboard, deployed on AWS EC2. The work explores XGBoost and LightGBM, time-series evaluation, calibration, and signal selection using historical futures candles.",
    "technologies": [
      "Python",
      "FastAPI",
      "XGBoost",
      "LightGBM",
      "Next.js",
      "AWS EC2"
    ],
    "category": "Applied ML",
    "status": "Research · paper and shadow modes only",
    "problem": "A model can look promising during training without providing a reliable advantage on unseen market data. Directional accuracy alone also does not establish profitability.",
    "approach": "Evaluate chronological holdouts, compare against baselines, inspect calibration, and account for execution costs before qualifying signals. Keep live broker trading disabled while evidence is inconclusive.",
    "architecture": {
      "enabled": true,
      "type": "Research pipeline",
      "layers": [
        [
          "Historical futures candles"
        ],
        [
          "Features + chronological splits"
        ],
        [
          "Model evaluation",
          "FastAPI + Next.js dashboard"
        ]
      ]
    },
    "challenges": [
      {
        "challenge": "Avoiding misleading conclusions from headline accuracy.",
        "solution": "Compare with baseline behavior and inspect macro-F1, calibration, and signal coverage."
      },
      {
        "challenge": "Keeping research separate from trading.",
        "solution": "Use paper and shadow modes; retain HOLD when no signal threshold qualifies."
      }
    ],
    "learned": [
      "Treating inconclusive results as a useful research outcome.",
      "Evaluating time-series models with attention to data leakage and realistic costs."
    ],
    "futureImprovements": [
      "Investigate regime-aware features and adaptive signal selection.",
      "Collect additional prospective evidence before changing readiness decisions."
    ],
    "featured": true,
    "order": 4
  },
  {
    "slug": "coupon-platform",
    "title": "Coupon Platform",
    "shortDescription": "Connecting purchases, redemption, and account workflows.",
    "oneLiner": "A standalone coupon-management platform with redemption APIs and account security workflows.",
    "longDescription": "A coupon platform with purchase and redemption flows, redemption history, support tickets, and API-based integration with a separate application wallet. The work also includes two-factor authentication and country-aware currency handling.",
    "technologies": [
      "React",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "2FA"
    ],
    "category": "Platforms",
    "status": "Ongoing development",
    "problem": "Coupon purchases and redemptions need a clear record of what happened, while integrations need a consistent way to verify and redeem a coupon.",
    "approach": "Separate purchase, verification, and redemption workflows. Provide a redemption API, expose account history to users, and add authentication checks around sensitive account actions.",
    "architecture": {
      "enabled": true,
      "type": "Workflow overview",
      "layers": [
        [
          "Purchase + account interface"
        ],
        [
          "Coupon verification",
          "Redemption API"
        ],
        [
          "Transaction history",
          "Support workflows"
        ]
      ]
    },
    "challenges": [
      {
        "challenge": "Keeping redemption useful across applications.",
        "solution": "Provide dedicated verification and redemption endpoints with a visible redemption history."
      },
      {
        "challenge": "Protecting sensitive account workflows.",
        "solution": "Add authenticator and email OTP flows alongside withdrawal verification."
      }
    ],
    "learned": [
      "Designing service boundaries around an existing product workflow.",
      "Handling currency display and account verification consistently."
    ],
    "futureImprovements": [
      "Expand integration and failure-path testing.",
      "Make account and redemption feedback clearer."
    ],
    "order": 5,
    "featured": true
  },
  {
    "slug": "workforce-website",
    "title": "Workforce & Security Website",
    "shortDescription": "A clear digital presence for a people-focused business.",
    "oneLiner": "A responsive website presenting manpower and security services with a straightforward enquiry path.",
    "longDescription": "A company website for manpower and security services, with work on page structure, animation, responsive layouts, and service messaging. The project includes the L&K HiringsPro hiring presence and updates to manpower-service content.",
    "technologies": [
      "JavaScript",
      "HTML",
      "CSS",
      "Responsive design"
    ],
    "category": "Platforms",
    "status": "Website development & updates",
    "problem": "Visitors need to understand the available services quickly, navigate comfortably on mobile, and find the next step without unnecessary friction.",
    "approach": "Organize content around the services and the visitor’s intent. Use a consistent visual theme, readable layouts, and restrained animation while refining service pages.",
    "architecture": {
      "enabled": true,
      "type": "Visitor journey",
      "layers": [
        [
          "Discover services"
        ],
        [
          "Explore manpower",
          "Explore security"
        ],
        [
          "Enquiry + hiring information"
        ]
      ]
    },
    "challenges": [
      {
        "challenge": "Making different service offerings easy to scan.",
        "solution": "Give each service a clear place in the page structure and navigation."
      },
      {
        "challenge": "Balancing animation with mobile usability.",
        "solution": "Refine responsive layouts and keep motion secondary to readable content."
      }
    ],
    "learned": [
      "Translating business services into a coherent site structure.",
      "Iterating on content and responsive presentation together."
    ],
    "futureImprovements": [
      "Continue accessibility and performance reviews.",
      "Add more genuine service imagery when available."
    ],
    "order": 6,
    "featured": true
  }
];
