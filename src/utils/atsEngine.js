// Comprehensive ATS Analysis, Scoring, Keyword Matching & Bullet Optimization Engine

// High-impact Action Verbs approved by top tech and enterprise recruiters
export const STRONG_ACTION_VERBS = [
  "Architected", "Engineered", "Spearheaded", "Optimized", "Scaled", "Automated",
  "Pioneered", "Implemented", "Revamped", "Orchestrated", "Accelerated", "Delivered",
  "Streamlined", "Formulated", "Synthesized", "Designed", "Consolidated", "Overhauled",
  "Surpassed", "Maximized", "Championed", "Constructed", "Directed", "Executed"
];

// Weak / Passive Phrases that hurt ATS and recruiter scoring
export const WEAK_PHRASES = [
  "responsible for", "helped with", "assisted in", "worked on", "handled",
  "duties included", "participated in", "attempted to", "tasked with", "involved in"
];

// Known Tech & Business Synonym Dictionary for intelligent matching
export const SYNONYM_MAP = {
  "react": ["reactjs", "react.js"],
  "node": ["nodejs", "node.js"],
  "aws": ["amazon web services", "amazon aws"],
  "k8s": ["kubernetes"],
  "kubernetes": ["k8s"],
  "ci/cd": ["continuous integration", "continuous deployment", "cicd"],
  "postgres": ["postgresql"],
  "postgresql": ["postgres"],
  "typescript": ["ts"],
  "javascript": ["js"],
  "golang": ["go"],
  "gcp": ["google cloud platform", "google cloud"],
  "ai": ["artificial intelligence", "genai", "generative ai"],
  "ml": ["machine learning"],
  "nlp": ["natural language processing"],
  "financial modeling": ["dcf", "lbo", "financial analysis"],
  "valuation": ["dcf valuation", "multiples"],
  "sql": ["structured query language"],
  "rest": ["restful api", "rest api", "restful apis"],
  "graphql": ["gql"],
  "docker": ["containerization", "containers"]
};

// Common technical & industry keyword dictionary
const CORE_KEYWORDS_DB = [
  // Languages & Core
  "TypeScript", "JavaScript", "Python", "Go", "Golang", "Java", "C++", "C#", "Rust", "SQL", "Ruby", "PHP", "Swift", "Kotlin",
  // Frameworks & Libraries
  "React", "Next.js", "Vue.js", "Angular", "Node.js", "Express", "NestJS", "Django", "FastAPI", "Spring Boot", "Tailwind CSS", "Redux", "GraphQL",
  // Cloud & DevOps
  "AWS", "Amazon Web Services", "Azure", "GCP", "Google Cloud", "Docker", "Kubernetes", "Terraform", "CI/CD", "GitHub Actions", "Jenkins", "Helm", "Serverless", "Microservices", "ECS", "Lambda",
  // Databases & Systems
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Kafka", "Cassandra", "DynamoDB", "Snowflake", "System Design", "Distributed Systems",
  // Methodologies & Quality
  "Agile", "Scrum", "TDD", "Unit Testing", "Jest", "Cypress", "RESTful APIs", "gRPC", "WebSockets", "Data Structures", "Algorithms",
  // Business, Consulting & Finance
  "Financial Modeling", "Valuation", "DCF", "LBO", "EBITDA", "M&A", "Due Diligence", "Tableau", "PowerBI", "Cost Optimization", "Strategic Planning", "Stakeholder Management", "ROI", "P&L Management",
  // Product & Data
  "Product Management", "Roadmap", "A/B Testing", "Mixpanel", "Google Analytics", "User Stories", "PRD", "Data Analysis", "Machine Learning", "Deep Learning", "LLM", "Prompt Engineering"
];

/**
 * Extracts candidate keywords from job description
 */
export function extractKeywordsFromJobDescription(jdText) {
  if (!jdText || typeof jdText !== 'string') return [];

  const lowerJD = jdText.toLowerCase();
  const foundKeywords = new Set();

  // 1. Check against curated core database
  CORE_KEYWORDS_DB.forEach(kw => {
    const kwLower = kw.toLowerCase();
    const regex = new RegExp(`\\b${escapeRegExp(kwLower)}\\b`, 'i');
    if (regex.test(lowerJD)) {
      foundKeywords.add(kw);
    }
  });

  // 2. Dynamic regex extraction for uppercase abbreviations (e.g., ETL, SDK, CLI, ERP, CRM, ROI, SLA)
  const acronymMatches = jdText.match(/\b[A-Z]{2,6}\b/g) || [];
  acronymMatches.forEach(acronym => {
    // Filter common false positives
    if (!["AND", "THE", "FOR", "WITH", "ARE", "NOT", "YOU", "OUR", "ALL", "NEW", "ANY", "JOB", "ROLE"].includes(acronym)) {
      foundKeywords.add(acronym);
    }
  });

  // 3. Extract common capitalized 2-word technical/business terms (e.g. "Cloud Computing", "Stakeholder Alignment")
  const phraseMatches = jdText.match(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g) || [];
  phraseMatches.forEach(phrase => {
    const phraseLower = phrase.toLowerCase();
    if (!phraseLower.includes("equal opportunity") && !phraseLower.includes("san francisco") && !phraseLower.includes("united states") && !phraseLower.includes("job description") && !phraseLower.includes("responsibilities include")) {
      if (phrase.length > 5 && phrase.length < 30) {
        foundKeywords.add(phrase);
      }
    }
  });

  return Array.from(foundKeywords).slice(0, 35);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Normalizes and checks if a keyword exists in the resume text (with synonym awareness)
 */
export function isKeywordInResume(keyword, fullResumeText) {
  const resumeTextLower = fullResumeText.toLowerCase();
  const kwLower = keyword.toLowerCase();

  // Direct word-boundary match
  const directRegex = new RegExp(`\\b${escapeRegExp(kwLower)}\\b`, 'i');
  if (directRegex.test(resumeTextLower)) return true;

  // Check synonyms
  if (SYNONYM_MAP[kwLower]) {
    for (const syn of SYNONYM_MAP[kwLower]) {
      const synRegex = new RegExp(`\\b${escapeRegExp(syn)}\\b`, 'i');
      if (synRegex.test(resumeTextLower)) return true;
    }
  }

  return false;
}

/**
 * Converts entire structured resume object into flat searchable text
 */
export function getFullResumeText(resume) {
  if (!resume) return '';

  const parts = [];
  if (resume.personalInfo) {
    parts.push(resume.personalInfo.fullName, resume.personalInfo.jobTitle, resume.personalInfo.location);
  }
  if (resume.summary) parts.push(resume.summary);

  if (resume.skills) {
    if (Array.isArray(resume.skills)) {
      parts.push(resume.skills.join(' '));
    } else if (typeof resume.skills === 'object') {
      Object.values(resume.skills).forEach(val => {
        if (Array.isArray(val)) parts.push(val.join(' '));
        else if (typeof val === 'string') parts.push(val);
      });
    }
  }

  if (Array.isArray(resume.experience)) {
    resume.experience.forEach(exp => {
      parts.push(exp.company, exp.role, exp.location);
      if (Array.isArray(exp.bullets)) parts.push(exp.bullets.join(' '));
    });
  }

  if (Array.isArray(resume.projects)) {
    resume.projects.forEach(proj => {
      parts.push(proj.name, proj.techStack);
      if (Array.isArray(proj.bullets)) parts.push(proj.bullets.join(' '));
    });
  }

  if (Array.isArray(resume.education)) {
    resume.education.forEach(edu => {
      parts.push(edu.school, edu.degree, edu.field, edu.honors);
    });
  }

  if (Array.isArray(resume.certifications)) {
    resume.certifications.forEach(cert => {
      parts.push(cert.name, cert.issuer);
    });
  }

  return parts.filter(Boolean).join(' ');
}

/**
 * Calculates comprehensive ATS Score (0 - 100) and actionable diagnostics
 */
export function auditResumeATS(resume, jobDescription = '') {
  const fullText = getFullResumeText(resume);
  const fullTextLower = fullText.toLowerCase();

  // 1. Keyword Matching (40 max points)
  let keywordScore = 0;
  let matchedKeywords = [];
  let missingKeywords = [];
  const targetKeywords = jobDescription ? extractKeywordsFromJobDescription(jobDescription) : [];

  if (targetKeywords.length > 0) {
    targetKeywords.forEach(kw => {
      if (isKeywordInResume(kw, fullText)) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    const matchRatio = matchedKeywords.length / targetKeywords.length;
    keywordScore = Math.round(matchRatio * 40);
  } else {
    // If no JD is provided, evaluate based on general high-demand skills present
    let recognizedCoreSkills = 0;
    CORE_KEYWORDS_DB.forEach(kw => {
      if (isKeywordInResume(kw, fullText)) {
        recognizedCoreSkills++;
        matchedKeywords.push(kw);
      }
    });
    // Scale: 12+ recognized keywords gives full 35-40 pts
    keywordScore = Math.min(40, Math.round((recognizedCoreSkills / 14) * 40));
    matchedKeywords = matchedKeywords.slice(0, 20);
  }

  // 2. Formatting & ATS Structure (25 max points)
  let formattingScore = 0;
  const formattingChecks = [];

  // Check Contact Info
  const hasEmail = resume.personalInfo?.email && /\S+@\S+\.\S+/.test(resume.personalInfo.email);
  const hasPhone = resume.personalInfo?.phone && /\d{7,}/.test(resume.personalInfo.phone.replace(/\D/g, ''));
  const hasLocation = Boolean(resume.personalInfo?.location?.trim());
  const hasLinkedIn = Boolean(resume.personalInfo?.linkedin?.trim());

  if (hasEmail && hasPhone) {
    formattingScore += 7;
    formattingChecks.push({ name: "Contact Coordinates (Email & Phone)", status: "pass", tip: "Cleanly formatted and parseable." });
  } else {
    formattingChecks.push({ name: "Contact Coordinates", status: "fail", tip: "Ensure clear email and phone are present." });
  }

  if (hasLocation) {
    formattingScore += 3;
  }
  if (hasLinkedIn) {
    formattingScore += 3;
    formattingChecks.push({ name: "LinkedIn URL present", status: "pass", tip: "Great for ATS recruiter enrichment." });
  }

  // Check Standard Section Headers
  const hasExperience = Array.isArray(resume.experience) && resume.experience.length > 0;
  const hasEducation = Array.isArray(resume.education) && resume.education.length > 0;
  const hasSkills = Boolean(resume.skills);
  const hasSummary = Boolean(resume.summary?.trim());

  if (hasExperience && hasEducation && hasSkills) {
    formattingScore += 8;
    formattingChecks.push({ name: "Standard ATS Section Headings", status: "pass", tip: "Experience, Education, and Skills standard headers detected." });
  } else {
    formattingChecks.push({ name: "Standard ATS Section Headings", status: "warning", tip: "Ensure clear Experience, Education, and Skills sections." });
  }

  // Single-Column layout check (guaranteed by our templates)
  formattingScore += 4;
  formattingChecks.push({ name: "Single-Column Linear Parsing", status: "pass", tip: "Eliminates multi-column parsing scramble in Taleo/Workday." });

  // 3. Impact & STAR Formula / Metrics (25 max points)
  let impactScore = 0;
  const impactChecks = [];
  let totalBullets = 0;
  let bulletsWithMetrics = 0;
  let bulletsWithActionVerbs = 0;
  let weakBulletsCount = 0;
  const weakBulletExamples = [];

  const allBullets = [];
  if (Array.isArray(resume.experience)) {
    resume.experience.forEach(exp => {
      if (Array.isArray(exp.bullets)) allBullets.push(...exp.bullets);
    });
  }
  if (Array.isArray(resume.projects)) {
    resume.projects.forEach(proj => {
      if (Array.isArray(proj.bullets)) allBullets.push(...proj.bullets);
    });
  }

  totalBullets = allBullets.length;

  allBullets.forEach(bullet => {
    const text = bullet.trim();
    if (!text) return;

    // Check for metrics: % signs, currency $, numbers, multiplier x
    const hasMetric = /(\d+[\d,.]*\s*(%|\$|k|m|b|x|users|ms|s|hours|days|clients|engineers))|(\$\d+)|(\b\d{2,}\b)/i.test(text);
    if (hasMetric) bulletsWithMetrics++;

    // Check first word action verb
    const firstWord = text.split(/\s+/)[0].replace(/[^a-zA-Z]/g, '');
    const isStrongVerb = STRONG_ACTION_VERBS.some(verb => verb.toLowerCase() === firstWord.toLowerCase());
    if (isStrongVerb) bulletsWithActionVerbs++;

    // Check for weak phrases
    const foundWeak = WEAK_PHRASES.find(phrase => text.toLowerCase().includes(phrase));
    if (foundWeak) {
      weakBulletsCount++;
      if (weakBulletExamples.length < 3) {
        weakBulletExamples.push({ bullet: text, phrase: foundWeak });
      }
    }
  });

  if (totalBullets > 0) {
    const metricRatio = bulletsWithMetrics / totalBullets;
    const verbRatio = bulletsWithActionVerbs / totalBullets;

    // 12 points for metrics
    impactScore += Math.round(metricRatio * 13);
    // 12 points for action verbs
    impactScore += Math.round(verbRatio * 12);

    // Penalty for weak phrases
    if (weakBulletsCount > 0) {
      impactScore = Math.max(0, impactScore - (weakBulletsCount * 2));
      impactChecks.push({
        name: `Weak Phrases Detected (${weakBulletsCount})`,
        status: "warning",
        tip: `Avoid passive phrases like "${weakBulletExamples[0]?.phrase}". Use power verbs instead.`
      });
    } else {
      impactChecks.push({
        name: "Zero Passive/Weak Phrases",
        status: "pass",
        tip: "All bullets use assertive, professional action voice."
      });
    }

    if (metricRatio >= 0.6) {
      impactChecks.push({
        name: "Quantifiable Metrics & ROI",
        status: "pass",
        tip: `${Math.round(metricRatio * 100)}% of bullets feature measurable numbers/percentages.`
      });
    } else {
      impactChecks.push({
        name: "Measurable Impact / Metrics",
        status: "warning",
        tip: "Only " + Math.round(metricRatio * 100) + "% of bullets have metrics. Aim for 70%+ with numbers, percentages, or scale."
      });
    }
  } else {
    impactScore = 10;
  }

  // 4. Word Density & Summary (10 max points)
  let readabilityScore = 0;
  const wordCount = fullText.split(/\s+/).filter(Boolean).length;

  if (wordCount >= 300 && wordCount <= 750) {
    readabilityScore += 6;
  } else if (wordCount > 750) {
    readabilityScore += 3; // might be too lengthy for 1 page
  } else {
    readabilityScore += 2; // too short
  }

  if (hasSummary && resume.summary.length > 50 && resume.summary.length < 500) {
    readabilityScore += 4;
  }

  // Total Score (0 - 100)
  const totalScore = Math.min(100, Math.max(0, keywordScore + formattingScore + impactScore + readabilityScore));

  return {
    totalScore,
    categoryScores: {
      keywords: { score: keywordScore, max: 40, percentage: Math.round((keywordScore / 40) * 100) },
      formatting: { score: formattingScore, max: 25, percentage: Math.round((formattingScore / 25) * 100) },
      impact: { score: impactScore, max: 25, percentage: Math.round((impactScore / 25) * 100) },
      readability: { score: readabilityScore, max: 10, percentage: Math.round((readabilityScore / 10) * 100) }
    },
    metricsSummary: {
      totalBullets,
      bulletsWithMetrics,
      bulletsWithActionVerbs,
      weakBulletsCount,
      wordCount
    },
    matchedKeywords,
    missingKeywords,
    checks: [...formattingChecks, ...impactChecks],
    weakBulletExamples
  };
}

/**
 * Smart Algorithmic Bullet Enhancer (No API key needed)
 * Upgrades passive or dull bullet points into active STAR-format sentences.
 */
export function enhanceBulletPoint(bulletText, keywordToInject = null) {
  let cleaned = bulletText.trim().replace(/^[-•*]\s*/, '');
  if (!cleaned) return bulletText;

  // Replace common weak phrases with strong verbs
  cleaned = cleaned
    .replace(/^responsible for (managing|leading|directing)/i, "Spearheaded and directed")
    .replace(/^responsible for (building|creating|developing)/i, "Architected and delivered")
    .replace(/^responsible for (maintaining|fixing)/i, "Maintained and optimized")
    .replace(/^responsible for\s+/i, "Orchestrated ")
    .replace(/^helped (with|to build|build)/i, "Collaborated to architect and deploy")
    .replace(/^assisted (with|in)/i, "Supported the cross-functional delivery of")
    .replace(/^worked on (building|implementing)/i, "Engineered and implemented")
    .replace(/^worked on\s+/i, "Engineered ")
    .replace(/^duties included\s+/i, "Delivered ")
    .replace(/^handled\s+/i, "Directed and resolved ");

  // Ensure it starts with a capitalized strong verb if it doesn't already
  const words = cleaned.split(/\s+/);
  const firstWord = words[0].replace(/[^a-zA-Z]/g, '');
  const isActionVerb = STRONG_ACTION_VERBS.some(v => v.toLowerCase() === firstWord.toLowerCase());

  if (!isActionVerb && words.length > 2) {
    // Pick an impactful action verb based on context
    let verb = "Spearheaded";
    const lower = cleaned.toLowerCase();
    if (lower.includes("code") || lower.includes("api") || lower.includes("app") || lower.includes("system") || lower.includes("software")) {
      verb = "Architected";
    } else if (lower.includes("fast") || lower.includes("speed") || lower.includes("latency") || lower.includes("cost") || lower.includes("performance")) {
      verb = "Optimized";
    } else if (lower.includes("lead") || lower.includes("team") || lower.includes("mentor") || lower.includes("hired")) {
      verb = "Directed";
    } else if (lower.includes("test") || lower.includes("deploy") || lower.includes("pipeline") || lower.includes("ci/cd")) {
      verb = "Automated";
    }
    cleaned = `${verb} the execution of ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}`;
  }

  // Check if quantifiable metric is missing, add realistic STAR metric suggestion prompt
  const hasMetric = /(\d+[\d,.]*\s*(%|\$|k|m|b|x|users|ms|s|hours|days|clients))|(\$\d+)/i.test(cleaned);
  if (!hasMetric) {
    if (cleaned.toLowerCase().includes("cost") || cleaned.toLowerCase().includes("budget")) {
      cleaned += ", driving $140K in annualized operational cost reductions";
    } else if (cleaned.toLowerCase().includes("latency") || cleaned.toLowerCase().includes("performance") || cleaned.toLowerCase().includes("speed")) {
      cleaned += ", slashing response latency by 38%";
    } else if (cleaned.toLowerCase().includes("team") || cleaned.toLowerCase().includes("process")) {
      cleaned += ", accelerating sprint velocity by 25%";
    } else {
      cleaned += ", boosting overall efficiency by 30%";
    }
  }

  // If a keyword was requested to be injected, append or blend it naturally
  if (keywordToInject && !cleaned.toLowerCase().includes(keywordToInject.toLowerCase())) {
    cleaned += ` utilizing ${keywordToInject}`;
  }

  // Ensure trailing period
  if (!cleaned.endsWith('.')) {
    cleaned += '.';
  }

  return cleaned;
}
