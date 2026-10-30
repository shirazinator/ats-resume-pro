import { describe, it, expect } from 'vitest';
import { parseResumeTextToStructure } from '../src/utils/fileParsers';

describe('Resume File & Text Parsing Engine', () => {
  const sampleRawText = `
Johnathan Doe
Senior Cloud Architect
john.doe@techscale.io | +1 (555) 234-5678 | San Francisco, CA
linkedin.com/in/john-doe-cloud | github.com/johndoe

PROFESSIONAL SUMMARY
Cloud Architect with 8+ years scaling enterprise microservices on AWS and GCP. Led 14 engineers.

TECHNICAL SKILLS
Python, Go, JavaScript, TypeScript, React, Node.js, AWS, Kubernetes, Docker, PostgreSQL, Redis

PROFESSIONAL EXPERIENCE
Cloud Scale Networks - Principal Architect
2021 - Present | Remote
- Architected zero-trust multi-region infrastructure handling 80M daily API events with 99.99% uptime.
- Reduced annualized cloud infrastructure expenses by $280,000 through automated ECS right-sizing.
- Spearheaded migration of 12 monolithic apps to Kubernetes.

EDUCATION
University of Washington - Bachelor of Science in Computer Science
2016 | GPA: 3.8
`;

  it('should parse contact coordinates accurately from raw resume text', () => {
    const parsed = parseResumeTextToStructure(sampleRawText);

    expect(parsed.personalInfo.fullName).toBe("Johnathan Doe");
    expect(parsed.personalInfo.email).toBe("john.doe@techscale.io");
    expect(parsed.personalInfo.phone).toContain("555");
    expect(parsed.personalInfo.linkedin).toBe("linkedin.com/in/john-doe-cloud");
    expect(parsed.personalInfo.github).toBe("github.com/johndoe");
  });

  it('should extract structured experience, roles, and bullets', () => {
    const parsed = parseResumeTextToStructure(sampleRawText);

    expect(parsed.experience).toBeInstanceOf(Array);
    expect(parsed.experience.length).toBeGreaterThan(0);
    expect(parsed.experience[0].bullets.length).toBeGreaterThan(0);
    expect(parsed.experience[0].bullets[0]).toContain("Architected");
  });

  it('should extract skills into categorized arrays', () => {
    const parsed = parseResumeTextToStructure(sampleRawText);

    expect(parsed.skills).toBeDefined();
    expect(parsed.skills.languages.length).toBeGreaterThan(0);
  });
});
