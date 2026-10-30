import { describe, it, expect } from 'vitest';
import {
  extractKeywordsFromJobDescription,
  isKeywordInResume,
  auditResumeATS,
  enhanceBulletPoint,
  STRONG_ACTION_VERBS,
  WEAK_PHRASES
} from '../src/utils/atsEngine';
import { INITIAL_RESUMES, SAMPLE_JOB_DESCRIPTIONS } from '../src/constants/initialData';

describe('ATS Engine Tests', () => {
  describe('Keyword Extraction from Job Description', () => {
    it('should extract core technical keywords from software engineer job posting', () => {
      const jd = SAMPLE_JOB_DESCRIPTIONS.software_engineer;
      const keywords = extractKeywordsFromJobDescription(jd);

      expect(keywords).toBeInstanceOf(Array);
      expect(keywords.length).toBeGreaterThan(5);
      expect(keywords.map(k => k.toLowerCase())).toContain('react');
      expect(keywords.map(k => k.toLowerCase())).toContain('typescript');
      expect(keywords.map(k => k.toLowerCase())).toContain('aws');
      expect(keywords.map(k => k.toLowerCase())).toContain('kubernetes');
      expect(keywords.map(k => k.toLowerCase())).toContain('postgresql');
    });

    it('should extract business & consulting keywords from finance posting', () => {
      const jd = SAMPLE_JOB_DESCRIPTIONS.finance_consultant;
      const keywords = extractKeywordsFromJobDescription(jd);

      expect(keywords.map(k => k.toLowerCase())).toContain('financial modeling');
      expect(keywords.map(k => k.toLowerCase())).toContain('valuation');
      expect(keywords.map(k => k.toLowerCase())).toContain('tableau');
    });

    it('should handle empty or null job descriptions gracefully', () => {
      expect(extractKeywordsFromJobDescription('')).toEqual([]);
      expect(extractKeywordsFromJobDescription(null)).toEqual([]);
    });
  });

  describe('Synonym & Fuzzy Keyword Matching', () => {
    it('should match synonyms accurately (e.g. React.js and React)', () => {
      const resumeText = "Experienced front-end engineer building applications in React.js and Next.js.";
      expect(isKeywordInResume("React", resumeText)).toBe(true);
      expect(isKeywordInResume("React.js", resumeText)).toBe(true);
    });

    it('should match K8s and Kubernetes', () => {
      const resumeText = "Managed high-availability microservices on K8s cluster.";
      expect(isKeywordInResume("Kubernetes", resumeText)).toBe(true);
      expect(isKeywordInResume("K8s", resumeText)).toBe(true);
    });

    it('should match AWS and Amazon Web Services', () => {
      const resumeText = "Deployed serverless infrastructure on Amazon Web Services.";
      expect(isKeywordInResume("AWS", resumeText)).toBe(true);
    });

    it('should match Postgres and PostgreSQL', () => {
      const resumeText = "Optimized relational database queries in PostgreSQL.";
      expect(isKeywordInResume("Postgres", resumeText)).toBe(true);
      expect(isKeywordInResume("PostgreSQL", resumeText)).toBe(true);
    });

    it('should return false when a keyword is genuinely missing', () => {
      const resumeText = "Full stack Python developer with Django and MySQL.";
      expect(isKeywordInResume("Kubernetes", resumeText)).toBe(false);
      expect(isKeywordInResume("Ruby", resumeText)).toBe(false);
    });
  });

  describe('ATS Scoring & Audit Engine', () => {
    it('should produce a comprehensive score between 0 and 100 for FAANG demo', () => {
      const resume = INITIAL_RESUMES.software_engineer;
      const jd = SAMPLE_JOB_DESCRIPTIONS.software_engineer;

      const audit = auditResumeATS(resume, jd);

      expect(audit.totalScore).toBeGreaterThanOrEqual(75);
      expect(audit.totalScore).toBeLessThanOrEqual(100);
      expect(audit.categoryScores.keywords.score).toBeGreaterThan(25);
      expect(audit.categoryScores.formatting.score).toBeGreaterThan(20);
      expect(audit.categoryScores.impact.score).toBeGreaterThan(15);
      expect(audit.matchedKeywords.length).toBeGreaterThan(5);
    });

    it('should detect passive weak phrases and penalize them', () => {
      const weakResume = {
        personalInfo: { fullName: "Test User", email: "test@example.com", phone: "+1234567890", location: "NYC" },
        summary: "I was responsible for working on applications.",
        skills: { languages: ["JavaScript"] },
        experience: [
          {
            id: "exp-1",
            company: "Company",
            role: "Developer",
            location: "Remote",
            startDate: "2020",
            endDate: "2022",
            bullets: [
              "Responsible for managing servers.",
              "Helped with customer support."
            ]
          }
        ],
        education: [{ id: "edu-1", school: "School", degree: "BS", field: "CS", graduationDate: "2020" }]
      };

      const audit = auditResumeATS(weakResume);
      expect(audit.metricsSummary.weakBulletsCount).toBe(2);
      expect(audit.weakBulletExamples.length).toBeGreaterThan(0);
    });
  });

  describe('STAR Formula & Action Verb Bullet Enhancer', () => {
    it('should replace passive "responsible for managing" with strong action verb', () => {
      const original = "Responsible for managing a team of 5 engineers.";
      const enhanced = enhanceBulletPoint(original);

      expect(enhanced.toLowerCase()).not.toContain("responsible for");
      expect(enhanced).toMatch(/^Spearheaded/);
    });

    it('should inject metric placeholders when no numbers or metrics exist', () => {
      const original = "Worked on optimizing database queries and system latency.";
      const enhanced = enhanceBulletPoint(original);

      expect(enhanced).toMatch(/(\d+%)|(\$\d+)/);
    });

    it('should seamlessly inject target missing keywords', () => {
      const original = "Engineered real-time notification service for 50,000 users.";
      const enhanced = enhanceBulletPoint(original, "Redis");

      expect(enhanced).toContain("Redis");
      expect(enhanced.endsWith('.')).toBe(true);
    });
  });
});
