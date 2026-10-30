export const SAMPLE_JOB_DESCRIPTIONS = {
  software_engineer: `Senior Software Engineer - Full Stack / Distributed Systems
Company: CloudScale Tech (or Google / Meta / Amazon)

Responsibilities:
- Architect and scale distributed backend microservices handling 50M+ daily active requests with 99.99% uptime.
- Build responsive, accessible web applications using React, TypeScript, Next.js, and Tailwind CSS.
- Optimize high-throughput PostgreSQL, MongoDB, and Redis caching layers to reduce API latency.
- Design and maintain automated CI/CD deployment pipelines on AWS (ECS, Lambda, S3, CloudFront) and Kubernetes (Docker, Helm).
- Lead code reviews, mentor junior engineers, and champion engineering best practices (TDD, microservices, unit testing).

Requirements:
- 4+ years of professional experience with Python, Go, Node.js, or Java.
- Strong proficiency in modern JavaScript/TypeScript and React ecosystem.
- Deep hands-on experience with AWS Cloud infrastructure, Docker containerization, and Kubernetes.
- Proven track record of system design, database indexing, and performance optimization.
- Experience with GraphQL, RESTful APIs, Kafka event streaming, and Elasticsearch.
- Bachelor's or Master's degree in Computer Science or equivalent practical experience.`,

  finance_consultant: `Management Consultant / Strategy & Operations Analyst
Company: McKinsey & Company / Deloitte / Goldman Sachs

Responsibilities:
- Lead strategic transformation and operational efficiency programs for Fortune 500 enterprise clients.
- Build robust financial models, DCF valuations, and predictive forecast models in Excel and Python.
- Synthesize complex datasets to deliver actionable C-level executive presentations and business cases.
- Drive cost reduction and revenue acceleration initiatives delivering over $15M+ in annualized EBITDA impact.
- Facilitate cross-functional workshops with senior stakeholders across finance, operations, and technology.

Requirements:
- 3+ years experience in management consulting, investment banking, or corporate strategy.
- Advanced expertise in Financial Modeling, Valuation, Cost Optimization, and Market Due Diligence.
- High proficiency in Tableau, PowerBI, SQL, and Advanced Excel (VBA).
- Strong track record of executive communication, stakeholder management, and project leadership.
- MBA or Bachelor's in Finance, Economics, or Business Administration.`,

  product_manager: `Senior Product Manager - Core Platform
Company: Stripe / Shopify / Uber

Responsibilities:
- Define 3-year product vision, strategy, and quarterly roadmap for merchant checkout and payments platform.
- Partner with engineering, design, and data science to ship high-impact features increasing user conversion by 18%.
- Conduct rigorous A/B testing, user interviews, and funnel cohort analysis using Mixpanel and SQL.
- Own end-to-end product lifecycle from ideation and PRD creation through sprint execution and GTM launch.
- Communicate roadmap progress and strategic trade-offs to executive stakeholders.

Requirements:
- 4+ years in Product Management owning technical software or B2B SaaS products.
- Deep analytical rigor: SQL, product analytics, A/B testing methodologies, and metrics tracking (DAU, CAC, LTV).
- Demonstrated experience collaborating closely with agile engineering teams and technical architects.
- Superb written PRD documentation and verbal communication skills.`
};

export const INITIAL_RESUMES = {
  software_engineer: {
    personalInfo: {
      fullName: "Alex Rivera",
      jobTitle: "Senior Full-Stack & Systems Engineer",
      email: "alex.rivera.dev@gmail.com",
      phone: "+1 (415) 890-3421",
      location: "San Francisco, CA (Open to Remote)",
      linkedin: "linkedin.com/in/alex-rivera-tech",
      github: "github.com/alexrivera",
      portfolio: "alexrivera.io"
    },
    summary: "Senior Software Engineer with 5+ years of experience architecting distributed cloud systems and scalable web applications. Spearheaded microservices migration handling 40M+ daily events with 99.99% reliability on AWS and Kubernetes. Proven expertise in React, TypeScript, Node.js, and PostgreSQL, driving high-performance engineering culture and agile product delivery.",
    skills: {
      languages: ["TypeScript", "JavaScript", "Python", "Go", "SQL"],
      frameworks: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "GraphQL"],
      cloudDevOps: ["AWS (ECS, Lambda, S3)", "Docker", "Kubernetes", "CI/CD (GitHub Actions)", "Terraform"],
      databases: ["PostgreSQL", "Redis", "MongoDB", "Elasticsearch"],
      toolsAndMethods: ["Microservices", "RESTful APIs", "System Design", "TDD", "Git", "Agile/Scrum"]
    },
    experience: [
      {
        id: "exp-1",
        company: "Apex Cloud Solutions",
        role: "Senior Software Engineer",
        location: "San Francisco, CA",
        startDate: "Jan 2023",
        endDate: "Present",
        current: true,
        bullets: [
          "Architected and deployed distributed event-driven microservices on AWS ECS and Kubernetes, processing 45M+ daily requests with 99.99% availability.",
          "Engineered real-time data ingestion pipeline utilizing Redis caching and PostgreSQL partitioning, slashing average API response latency by 42% (from 320ms to 185ms).",
          "Mentored a cross-functional squad of 6 junior and mid-level engineers, establishing rigorous CI/CD test automation pipelines that elevated code coverage from 68% to 94%."
        ]
      },
      {
        id: "exp-2",
        company: "Veloce Technologies",
        role: "Full-Stack Software Engineer",
        location: "San Jose, CA",
        startDate: "Jun 2021",
        endDate: "Dec 2022",
        current: false,
        bullets: [
          "Developed core merchant analytics dashboard in React, TypeScript, and Next.js, serving 120K+ monthly active merchants and boosting platform engagement by 28%.",
          "Constructed scalable RESTful & GraphQL APIs with Node.js and Express, integrating Stripe payments infrastructure generating $8.5M+ in processed transactions.",
          "Optimized bundle size and client-side rendering performance, reducing First Contentful Paint (FCP) by 1.4s across mobile web traffic."
        ]
      },
      {
        id: "exp-3",
        company: "NextGen Software Labs",
        role: "Associate Software Engineer",
        location: "Austin, TX",
        startDate: "Aug 2019",
        endDate: "May 2021",
        current: false,
        bullets: [
          "Designed automated regression test suites using Jest and Cypress, preventing critical production defects across weekly release cycles.",
          "Containerized legacy monolithic services with Docker, cutting staging deployment times from 45 minutes to 7 minutes.",
          "Collaborated with product designers and backend engineers to implement accessible UI components conforming strictly to WCAG 2.1 AA standards."
        ]
      }
    ],
    education: [
      {
        id: "edu-1",
        school: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        location: "Berkeley, CA",
        graduationDate: "May 2019",
        gpa: "3.85 / 4.0",
        honors: "Dean's Honor List, Magna Cum Laude"
      }
    ],
    projects: [
      {
        id: "proj-1",
        name: "Distributed Task Scheduler (Go & Redis)",
        techStack: "Go, Redis, Docker, gRPC",
        link: "github.com/alexrivera/dist-scheduler",
        bullets: [
          "Engineered a distributed, fault-tolerant job queue system in Go supporting priority scheduling and dead-letter queue recovery handling 10,000 tasks/second.",
          "Implemented leader election using Raft consensus algorithm with automatic worker failover under 500ms."
        ]
      },
      {
        id: "proj-2",
        name: "DevMetrics Cloud Dashboard",
        techStack: "React, TypeScript, Tailwind CSS, AWS Lambda",
        link: "devmetrics.io",
        bullets: [
          "Created open-source monitoring tool for tracking GitHub Actions deployment metrics with 1,200+ GitHub stars.",
          "Implemented custom analytics charts utilizing SVG rendering with sub-100ms client-side calculations."
        ]
      }
    ],
    certifications: [
      {
        id: "cert-1",
        name: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services (AWS)",
        year: "2023"
      },
      {
        id: "cert-2",
        name: "Certified Kubernetes Administrator (CKA)",
        issuer: "Cloud Native Computing Foundation",
        year: "2022"
      }
    ]
  },

  finance_consultant: {
    personalInfo: {
      fullName: "Sophia Vance",
      jobTitle: "Senior Management Consultant",
      email: "sophia.vance.consulting@gmail.com",
      phone: "+1 (212) 450-8790",
      location: "New York, NY",
      linkedin: "linkedin.com/in/sophia-vance-strat",
      github: "",
      portfolio: ""
    },
    summary: "Strategic Management Consultant with 5+ years of experience leading enterprise transformations, financial valuations, and operational turnarounds for Fortune 100 clients. Proven success driving $24M+ in cumulative EBITDA expansion through cost optimization, supply chain redesign, and post-merger integration. Expert in DCF financial modeling, SQL, Tableau, and executive C-suite advisory.",
    skills: {
      languages: ["Financial Modeling", "Valuation (DCF/LBO)", "Data Analysis (SQL, Python)"],
      frameworks: ["Cost Optimization", "Strategic Planning", "M&A Due Diligence", "Supply Chain Strategy"],
      cloudDevOps: ["Advanced Excel (VBA)", "Tableau", "PowerBI", "Alteryx"],
      databases: ["Enterprise ERP (SAP)", "Salesforce Analytics"],
      toolsAndMethods: ["Executive Presentations", "Change Management", "Cross-Functional Leadership"]
    },
    experience: [
      {
        id: "exp-1",
        company: "Bain & Company",
        role: "Senior Strategy Consultant",
        location: "New York, NY",
        startDate: "Sep 2022",
        endDate: "Present",
        current: true,
        bullets: [
          "Directed strategic restructuring program for a global retail client with $3.2B revenue, delivering $18.5M in recurring annual SG&A cost savings.",
          "Constructed comprehensive DCF and operational sensitivity models guiding an $850M private equity acquisition and synergy realization plan.",
          "Presented weekly strategic deliverables and board-level presentations directly to the CEO, CFO, and executive steering committee."
        ]
      },
      {
        id: "exp-2",
        company: "Deloitte Consulting LLP",
        role: "Strategy & Operations Consultant",
        location: "Chicago, IL",
        startDate: "Aug 2019",
        endDate: "Aug 2022",
        current: false,
        bullets: [
          "Led 4-member cross-functional analytics squad executing inventory optimization program, slashing working capital requirements by $12.3M across 14 distribution centers.",
          "Synthesized customer churn patterns using SQL and Tableau to identify high-risk accounts, boosting renewal rates by 14.8%.",
          "Standardized operating procedures and KPI scorecards for 250+ operations staff across North American business units."
        ]
      }
    ],
    education: [
      {
        id: "edu-1",
        school: "Columbia Business School",
        degree: "Master of Business Administration (MBA)",
        field: "Finance & Strategic Management",
        location: "New York, NY",
        graduationDate: "May 2019",
        gpa: "3.90 / 4.0",
        honors: "Beta Gamma Sigma Honor Society"
      },
      {
        id: "edu-2",
        school: "University of Michigan, Ross School of Business",
        degree: "Bachelor of Business Administration (BBA)",
        field: "Finance & Accounting",
        location: "Ann Arbor, MI",
        graduationDate: "May 2017",
        gpa: "3.82 / 4.0",
        honors: "High Distinction"
      }
    ],
    projects: [
      {
        id: "proj-1",
        name: "Enterprise Digital Transformation Playbook",
        techStack: "Financial Analysis, Operating Model Design",
        link: "",
        bullets: [
          "Authored industry whitepaper on cloud migration ROI benchmarks cited by 40+ enterprise corporate development leaders.",
          "Developed automated financial synergy calculator used firm-wide by 85+ consultants for commercial due diligence."
        ]
      }
    ],
    certifications: [
      {
        id: "cert-1",
        name: "Chartered Financial Analyst (CFA) – Level II Passed",
        issuer: "CFA Institute",
        year: "2021"
      },
      {
        id: "cert-2",
        name: "Project Management Professional (PMP)",
        issuer: "PMI",
        year: "2020"
      }
    ]
  }
};
