export const HOME_PAGE_CONTENT = {
  hero: {
    title: "Hello, I'm Ravindu!",
    subtitle: "AI Engineer · Small Language Models · MLOps · Robotics",
    paragraphs: [
      "I build AI systems designed for the real world — fine-tuning small language models, shipping end-to-end MLOps pipelines, and exploring where AI meets physical systems.",
      "Previously Research & AI Intern at WSO2. Currently finishing my B.Sc. in Artificial Intelligence at the University of Moratuwa.",
    ],
    socialLabel: "Social Links:",
  },

  about: {
    title: "About",
    paragraphs: [
      "Ravindu Tharuka Weerasinghe — AI undergraduate at the University of Moratuwa (CGPA: 3.86, Dean's List 4/6 semesters), with an IEEE-published research paper and hands-on industry experience.",
      "Previously Research & AI Intern at WSO2, where I fine-tuned small language models with LoRA and co-built an automated MLOps pipeline that runs end-to-end from a GitHub commit to a deployed model.",
    ],
    cta: {
      text: "More Info",
      href: "/about/",
    },
  },

  currently: {
    title: "Now",
    items: [
      "Building an adaptive multi-agent RAG platform with LangGraph, pgvector, and Redis",
      "Exploring neuro-symbolic AI — combining SLMs with Prolog-based expert system reasoning",
      "Finishing my B.Sc. in Artificial Intelligence at the University of Moratuwa",
      "Preparing for an AI engineering role with a long-term focus on robotics and embodied AI",
    ],
    cta: {
      text: "More Info",
      href: "/now/",
    },
  },

  focusAreas: {
    title: "Focus Areas",
    text: "Small Language Models · MLOps · RAG Systems · NLP · Computer Vision · Robotics · Neuro-Symbolic AI",
  },

  // New section — render as a highlight strip or card row on the homepage
  highlights: {
    title: "Highlights",
    items: [
      {
        label: "IEEE Publication",
        description:
          "Type II Diabetes Risk Prediction — 95.27% ROC-AUC on 100k+ NHANES records",
        href: "https://ieeexplore.ieee.org/document/11499955",
      },
      {
        label: "WSO2 Internship",
        description:
          "Research & AI Intern — SLM fine-tuning, automated MLOps pipelines, production AI tooling on Choreo",
        href: "/about/",
      },
      {
        label: "TechTriathlon 2024",
        description: "Winner",
        href: undefined,
      },
      {
        label: "DataXplore 2026",
        description: "Winner",
        href: undefined,
      },
      {
        label: "EXMO 2023",
        description:
          "Exhibited AutoChess — a fully autonomous physical chess-playing machine",
        href: "https://github.com/rtweera/autochess",
      },
    ],
  },

  // New section — render as a compact tech tag cloud or grouped list
  techStack: {
    title: "Tech",
    groups: [
      {
        label: "AI & ML",
        items: ["PyTorch", "Unsloth", "MLflow", "Ollama", "PGVector"],
      },
      {
        label: "Data Science",
        items: ["NumPy", "scikit-learn", "Pandas", "Seaborn", "SHAP"],
      },
      {
        label: "Backend",
        items: ["FastAPI", "Flask", "Node.js"],
      },
      {
        label: "Frontend",
        items: ["React", "Angular", "PrimeNG", "Tailwind"],
      },
      {
        label: "Databases",
        items: ["MongoDB", "PostgreSQL", "Redis"],
      },
      {
        label: "Cloud & Deploy",
        items: ["AWS", "Choreo", "GCP", "Docker"],
      },
      {
        label: "Languages",
        items: ["Python", "Java", "JavaScript", "C"],
      },
    ],
  },
} as const;

export const HOMEPAGE_EDITORIAL = {
  projects: [
    {
      number: "01",
      slug: "autochess",
      title: "AutoChess",
      category: "ROBOTICS / EMBEDDED SYSTEMS",
      description:
        "A physical chessboard senses moves, computes a response with an embedded chess engine, and moves pieces using an XY gantry.",
      art: "autochess",
    },
    {
      number: "02",
      slug: "sentiview-icms",
      title: "SentiView",
      category: "APPLIED AI / CUSTOMER COMMUNICATIONS",
      description:
        "An email analytics service that ingests messages, applies AI classification and summarisation, and feeds a customer communications dashboard.",
      art: "sentiview",
    },
    {
      number: "03",
      slug: "chapters-blog-backend",
      title: "AI Blog Microservice",
      category: "BACKEND / DISTRIBUTED SYSTEMS",
      description:
        "A FastAPI and MongoDB backend for blog posts, comments, replies, reactions, and dashboard analytics, with Keycloak JWT authentication.",
      art: "microservice",
    },
    {
      number: "04",
      title: "StumblePanni",
      category: "TOURISM / SRI LANKA",
      description: "A tourist assistance application for exploring Sri Lanka.",
      art: "stumblepanni",
    },
  ],
  closing:
    "My background spans AI, computer vision, NLP, backend and distributed systems, robotics, and electronics. I care about building useful, reliable systems that connect software with the physical world.",
} as const;
