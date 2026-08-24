export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI & Vision' | 'Enterprise SaaS' | 'EdTech' | 'Creative & Web';
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  challenges: string[];
  solutions: string[];
  metrics: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: { name: string; level: number; icon: string; highlight?: boolean }[];
}

export interface LearningItem {
  title: string;
  category: string;
  status: 'In Progress' | 'Advanced' | 'Exploring';
  progress: number;
  description: string;
  highlights: string[];
}

export interface ValueProp {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  details: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Ibrahim",
    avatar: "/ibrahim.jpeg",
    fullTitle: "AI Engineering Student & Backend Developer",
    role: "AI Engineering Student",
    secondaryRoles: [
      "AI Engineering Student",
      "Backend Developer",
      "AI Systems Engineer"
    ],
    bio: "Current Artificial Intelligence Engineering student at Mansoura National University passionate about architecting scalable backend systems, high-throughput APIs, and integrating state-of-the-art AI models into production-ready software systems.",
    extendedBio: "Based in Egypt, I bridge the gap between heavy computer science theory and modern enterprise software engineering. My focus centers on high-concurrency backend services, microservices architecture, retrieval-augmented generation (RAG), and computer vision applications.",
    location: "Tanta, Egypt",
    university: "Mansoura National University",
    faculty: "Faculty of Engineering",
    department: "Artificial Intelligence Engineering",
    degree: "AI Engineering Student (Undergraduate)",
    email: "ibrahimahmed172018@gmail.com",
    github: "https://github.com/ibrahimahmed172018-hub",
    linkedin: "https://www.linkedin.com/in/ebrahim-abd-el-ghany-56518b389",
    whatsapp: "https://wa.me/201023678882",
    phone: "+201023678882",
    twitter: "",
    status: "Open for Internships & AI/Backend Engineering Roles",
    languages: [
      { name: "Arabic", level: "Native / Bilingual" },
      { name: "English", level: "Professional (B2 Level)" }
    ]
  },

  projects: [
    {
      id: "mbc-dent",
      title: "MBC Dent",
      subtitle: "Dental Supplies & Lab Equipment E-Commerce Enterprise",
      category: "Enterprise SaaS",
      description: "An enterprise B2B & B2C e-commerce platform and inventory system for dental clinics and laboratories, featuring real-time stock sync and automated medical order processing.",
      fullDescription: "MBC Dent (mbcdent-eg.com) is a specialized digital marketplace and supply platform engineered for a leading dental equipment and lab consumables distributor in Egypt. It powers full catalog management, real-time inventory tracking for high-end medical equipment, automated invoicing, secure client portal ordering, and high-concurrency request handling.",
      image: "/projects/mbc-dent.png",
      technologies: ["Node.js", "FastAPI", "TypeScript", "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "Redis", "Docker"],
      challenges: [
        "Managing complex medical equipment variations, catalog categorization, and real-time inventory sync across multiple warehouse locations.",
        "Ensuring low-latency product search and filtering across thousands of specialized dental products and lab consumables.",
        "Handling secure client ordering workflows and automated invoice generation for enterprise dental clinics."
      ],
      solutions: [
        "Engineered high-throughput PostgreSQL relational schemas with Drizzle ORM and Redis caching for instant stock updates.",
        "Implemented asynchronous order processing pipelines using Node.js & FastAPI backends for maximum reliability.",
        "Deployed a responsive Tailwind CSS storefront with sub-second page transitions and client portal integration."
      ],
      metrics: [
        "Live Production Platform",
        "Sub-100ms API Response",
        "B2B Medical Supply Sync"
      ],
      githubUrl: "private",
      liveUrl: "https://mbcdent-eg.com",
      featured: true
    },
    {
      id: "educational-lms",
      title: "Retina LMS Platform",
      subtitle: "Multi-Academy Enterprise Learning Management Platform",
      category: "Enterprise SaaS",
      description: "An enterprise-grade, multi-academy Learning Management System featuring real-time course streaming, automated grading engines, role-based access control (RBAC), and analytical student dashboards.",
      fullDescription: "Retina LMS (retina-lms.up.railway.app) is a high-concurrency educational platform engineered for academies and educational institutions. Powered by React 19, TanStack Start & Router, Drizzle ORM, and PostgreSQL/Supabase, it provides multi-tenant academy isolation, automated quiz evaluation, secure PDF report generation, and sub-second page transitions.",
      image: "/projects/educational-lms.png",
      technologies: ["React 19", "TanStack Router", "TanStack Start", "TypeScript", "PostgreSQL", "Drizzle ORM", "Supabase", "Tailwind CSS", "Bun"],
      challenges: [
        "Architecting multi-tenant data isolation and role-based access control (RBAC) across Students, Instructors, and Academy Administrators.",
        "Processing large-scale concurrent quiz submissions and instant automated grading with analytical performance breakdowns.",
        "Delivering sub-second route transitions and persistent media playback state across complex nested routes."
      ],
      solutions: [
        "Designed a granular row-level security (RLS) matrix and Drizzle ORM query layer enforcing strict multi-academy data boundaries.",
        "Implemented asynchronous queue workers for rapid exam scoring, automated grade computation, and email notification dispatches.",
        "Leveraged TanStack Start SSR & client-side caching to achieve sub-100ms API response times and zero-reload user experience."
      ],
      metrics: [
        "Live Production Platform",
        "< 80ms API Latency",
        "Multi-Academy Support"
      ],
      githubUrl: "private",
      liveUrl: "https://retina-lms.up.railway.app",
      featured: true
    },
    {
      id: "retina",
      title: "Retina Creative Agency",
      subtitle: "Creative Agency Showcase & Digital Services Platform",
      category: "Enterprise SaaS",
      description: "An interactive agency showcase and digital service portal built for Retina Creative Agency, featuring dynamic service catalogs, graphic design offerings, and fast backend inquiry processing.",
      fullDescription: "Retina Creative Agency (retina-phi.vercel.app) is a high-performance agency portal engineered to showcase creative design services, branding portfolios, and web production packages. The platform pairs a responsive frontend interface with a lightweight Python FastAPI & SQLite backend for rapid client project inquiries and dynamic service catalog management.",
      image: "/projects/retina.png",
      technologies: ["HTML5", "CSS3", "JavaScript", "FastAPI", "Python", "SQLite"],
      challenges: [
        "Crafting a fluid, high-conversion visual showcase that mirrors the agency's creative identity without introducing page bloat.",
        "Building a fast, lightweight backend handling client project estimates, service package inquiries, and contact dispatches.",
        "Ensuring cross-browser performance, fast asset delivery, and responsive layouts across all mobile and desktop viewports."
      ],
      solutions: [
        "Engineered a custom modular frontend using HTML5, CSS3, and JavaScript for smooth micro-animations and zero layout shift.",
        "Implemented a Python FastAPI micro-backend with SQLite storage for asynchronous inquiry logging and client notification routing.",
        "Deployed to Vercel with optimized asset compression, achieving sub-second load times and high SEO performance."
      ],
      metrics: [
        "Live Agency Platform",
        "Sub-100ms API Inquiries",
        "Custom FastAPI Backend"
      ],
      githubUrl: "https://github.com/ibrahimahmed172018-hub/retina-lms",
      liveUrl: "https://retina-phi.vercel.app/",
      featured: true
    },
    {
      id: "ismail-portfolio",
      title: "Ismail Mohamed Portfolio",
      subtitle: "Ultra-Fast 60FPS Creative Director & Design Exhibition Platform",
      category: "Creative & Web",
      description: "A dark-themed portfolio and exhibition platform for Senior Graphic Designer Ismail Mohamed, featuring 60FPS Bezier canvas animations, interactive PDF reader, high-speed WebP asset streaming, and Resend email integration.",
      fullDescription: "Ismail Mohamed Portfolio (ismail-port) is an interactive, high-performance web platform engineered for Senior Creative Director Ismail Mohamed (Founder of Retina Creative Agency). Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS, it streams 72+ authentic branding, social media, and packaging artworks with instantaneous WebP loading (<10ms load times), hardware-accelerated Bezier spline canvas animations, an in-app interactive PDF guide reader, and resilient Resend email API integration.",
      image: "/projects/ismail-portfolio.png",
      technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5 Canvas", "Sharp", "WebP", "Resend API"],
      challenges: [
        "Handling 70+ massive high-resolution graphic design files (150MB+ raw) without causing mobile network lag or memory bottlenecks.",
        "Designing a hardware-accelerated background animation replicating live Adobe Photoshop vector tools (Bezier splines, anchor points, pen nibs) running at 60 FPS.",
        "Implementing an in-app interactive PDF lightbox viewer for client brand strategy documents alongside a reliable automated email dispatch pipeline."
      ],
      solutions: [
        "Engineered a batch compression pipeline using Sharp to convert all 72 artworks into modern WebP format (<60KB each), reducing total gallery bandwidth by 95% with zero quality loss.",
        "Implemented an adaptive HTML5 Canvas with frame-rate throttling (60 FPS on desktop, lightweight on mobile) and dormant touch physics.",
        "Built a resilient Next.js Route Handler for contact dispatches with dual-fallback delivery, and an embedded PDF reader with fullscreen and zoom controls."
      ],
      metrics: [
        "72+ Artworks Streamed",
        "< 10ms Asset Load Time",
        "60 FPS Canvas Splines"
      ],
      githubUrl: "https://github.com/ibrahimahmed172018-hub/ismail-port",
      liveUrl: "https://ismailmohamed.vercel.app",
      featured: true
    }
  ] as Project[],

  skillCategories: [
    {
      title: "Backend Architecture",
      description: "Building robust, scalable, and secure server-side applications & APIs.",
      iconName: "Server",
      skills: [
        { name: "Node.js / Express", level: 92, icon: "NodeJS", highlight: true },
        { name: "FastAPI / Python", level: 90, icon: "FastAPI", highlight: true },
        { name: "RESTful & GraphQL APIs", level: 95, icon: "API" },
        { name: "Microservices", level: 85, icon: "Layers" },
        { name: "Authentication (JWT / OAuth2)", level: 92, icon: "Shield" },
        { name: "Distributed Caching (Redis)", level: 88, icon: "Database" }
      ]
    },
    {
      title: "Artificial Intelligence",
      description: "Integrating deep learning models, LLMs, computer vision, and AI workflows.",
      iconName: "BrainCircuit",
      skills: [
        { name: "Machine Learning Concepts", level: 88, icon: "Brain", highlight: true },
        { name: "Computer Vision (OpenCV)", level: 86, icon: "Eye", highlight: true },
        { name: "PyTorch & TensorFlow", level: 82, icon: "Cpu" },
        { name: "AI APIs (OpenAI / Anthropic)", level: 94, icon: "Sparkles", highlight: true },
        { name: "RAG & Vector DBs", level: 85, icon: "GitBranch" },
        { name: "Model Deployment & ONNX", level: 80, icon: "Box" }
      ]
    },
    {
      title: "Frontend Engineering",
      description: "Crafting fluid, high-performance, and responsive user interfaces.",
      iconName: "Layout",
      skills: [
        { name: "React 19 / Next.js 15", level: 94, icon: "React", highlight: true },
        { name: "TypeScript", level: 92, icon: "TypeScript", highlight: true },
        { name: "Tailwind CSS", level: 96, icon: "Tailwind" },
        { name: "Framer Motion", level: 90, icon: "Framer" },
        { name: "State Management (Zustand/Query)", level: 90, icon: "Workflow" }
      ]
    },
    {
      title: "Databases & Storage",
      description: "Designing efficient relational schemas, ORMs, and persistent stores.",
      iconName: "Database",
      skills: [
        { name: "PostgreSQL", level: 92, icon: "PostgreSQL", highlight: true },
        { name: "Drizzle ORM & Prisma", level: 90, icon: "Code" },
        { name: "SQLite / LibSQL", level: 88, icon: "FileText" },
        { name: "MongoDB", level: 84, icon: "Database" },
        { name: "Redis Caching", level: 88, icon: "Zap" }
      ]
    },
    {
      title: "DevOps & Cloud",
      description: "Containerizing services and deploying resilient infrastructure.",
      iconName: "Cloud",
      skills: [
        { name: "Docker & Containerization", level: 86, icon: "Docker", highlight: true },
        { name: "Git & GitHub Workflows", level: 95, icon: "Git" },
        { name: "Vercel & Cloudflare", level: 92, icon: "Globe" },
        { name: "Linux Administration", level: 85, icon: "Terminal" },
        { name: "CI/CD Pipelines", level: 82, icon: "Repeat" }
      ]
    }
  ] as SkillCategory[],

  learningJourney: [
    {
      title: "AI Engineering & Agentic Architectures",
      category: "Artificial Intelligence",
      status: "In Progress",
      progress: 88,
      description: "Mastering agent workflows, custom tool calling, context window optimization, vector embeddings, and autonomous task execution loops.",
      highlights: [
        "Function calling & structured JSON outputs",
        "Pinecone / ChromaDB vector search",
        "LLM evaluation & latency reduction"
      ]
    },
    {
      title: "FastAPI & High-Throughput Async Python",
      category: "Backend Architecture",
      status: "Advanced",
      progress: 92,
      description: "Deep dive into ASGI servers, Pydantic v2 data serialization, async SQL engines, and background tasks.",
      highlights: [
        "Asynchronous ORM query optimization",
        "OpenAPI documentation automation",
        "OAuth2 JWT authentication schemes"
      ]
    },
    {
      title: "Node.js & Distributed Systems",
      category: "Backend Architecture",
      status: "Advanced",
      progress: 94,
      description: "Building event-driven backends, cluster worker threads, stream pipelines, and low-latency microservices.",
      highlights: [
        "Event loop non-blocking performance",
        "Redis message queues & worker nodes",
        "gRPC & WebSockets integration"
      ]
    },
    {
      title: "Machine Learning & Neural Networks",
      category: "AI & Math",
      status: "In Progress",
      progress: 85,
      description: "Studying loss functions, gradient descent optimization, convolutional networks, and deep learning math fundamentals at MNU.",
      highlights: [
        "PyTorch model training pipelines",
        "Feature scaling & dataset preprocessing",
        "Model evaluation metrics (Precision/Recall/F1)"
      ]
    },
    {
      title: "System Design & Clean Code Standards",
      category: "Engineering Principles",
      status: "Advanced",
      progress: 90,
      description: "Applying Domain-Driven Design (DDD), SOLID principles, fault-tolerant patterns, and scalable database sharding techniques.",
      highlights: [
        "Decoupled service abstractions",
        "Database indexing strategies",
        "Rate limiting & circuit breaker patterns"
      ]
    }
  ] as LearningItem[],

  whyWorkWithMe: [
    {
      title: "Algorithmic Problem Solving",
      subtitle: "First-principles engineering mindset",
      description: "Approaching engineering obstacles with analytical precision. Breaking complex system requirements into manageable, testable, and optimized software modules.",
      icon: "Code2",
      details: [
        "Structured debugging & root cause analysis",
        "Time & space complexity optimization",
        "Resilient error handling strategies"
      ]
    },
    {
      title: "Rapid Stack Adaptation",
      subtitle: "Fast learning curve",
      description: "Quickly learning new frameworks, specialized SDKs, and emerging AI technologies with high autonomy and immediate productivity.",
      icon: "Zap",
      details: [
        "Rapid prototyping to production deployment",
        "Hands-on experimentation with modern tooling",
        "Continuous technical skill expansion"
      ]
    },
    {
      title: "High-Performance Backend Dev",
      subtitle: "Scalable server architectures",
      description: "Crafting bulletproof backend APIs, asynchronous queues, microservices, and database models designed for high concurrency and low latency.",
      icon: "Server",
      details: [
        "Node.js & FastAPI expert API design",
        "Relational schema modeling & ORMs",
        "Distributed caching with Redis"
      ]
    },
    {
      title: "Production AI Integration",
      subtitle: "Connecting AI to real SaaS",
      description: "Transforming cutting-edge AI models, computer vision algorithms, and LLM pipelines into practical, high-value end-user software products.",
      icon: "Sparkles",
      details: [
        "Computer vision feed inference (OpenCV)",
        "LLM API integration & prompt engineering",
        "Vector search & retrieval augmented generation"
      ]
    },
    {
      title: "System Thinking & Reliability",
      subtitle: "Architectural foresight",
      description: "Viewing software as an interconnected system. Prioritizing modularity, security, failure fallback mechanisms, and long-term maintainability.",
      icon: "Layers",
      details: [
        "Microservices & event-driven decoupling",
        "API security & permission boundaries",
        "High availability & scalability principles"
      ]
    },
    {
      title: "Clean Architecture Standards",
      subtitle: "Readable, maintainable codebases",
      description: "Adhering strictly to modern code conventions, type safety, modular structures, and comprehensive documentation to empower team collaboration.",
      icon: "CheckCircle2",
      details: [
        "Strict TypeScript & Python type annotations",
        "Domain-driven layer separation",
        "Reusable, self-documenting code"
      ]
    }
  ] as ValueProp[],

  stats: [
    { label: "Production Projects", value: "3" },
    { label: "Code Commits", value: "350+" },
    { label: "API Latency Goal", value: "< 100ms" },
    { label: "Academic Excellence", value: "AI Eng" }
  ]
};
