import React from 'react';

/**
 * Corporate, Consulting & Finance ATS Template
 * Wall Street / Ivy League prestigious serif typography (Merriweather / Georgia).
 * Tailored for McKinsey, Bain, Goldman Sachs, JPMorgan, Deloitte, Fortune 500.
 * 100% ATS compliant, single-column linear hierarchy.
 */
export default function CorporateFinanceTemplate({ resume }) {
  const { personalInfo, summary, skills, experience, education, projects, certifications } = resume;

  return (
    <div className="font-serif text-neutral-900 text-[10.5pt] leading-[1.4] bg-white p-8 max-w-[850px] mx-auto select-text shadow-sm">
      {/* Header */}
      <header className="text-center pb-2.5 border-b-2 border-neutral-900">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950 uppercase mb-1">
          {personalInfo.fullName}
        </h1>
        <div className="text-[9.5pt] text-neutral-700 italic mb-1 font-sans">
          {personalInfo.jobTitle}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-2 text-[9pt] text-neutral-700 font-sans">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && (
            <span>
              • <a href={`mailto:${personalInfo.email}`} className="text-neutral-900 hover:underline">{personalInfo.email}</a>
            </span>
          )}
          {personalInfo.linkedin && (
            <span>
              • <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-neutral-900 hover:underline">{personalInfo.linkedin}</a>
            </span>
          )}
        </div>
      </header>

      {/* Executive Summary */}
      {summary && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-400 pb-0.5 mb-1.5 font-sans">
            Executive Summary
          </h2>
          <p className="text-neutral-800 text-justify text-[10pt] leading-relaxed">
            {summary}
          </p>
        </section>
      )}

      {/* Core Competencies & Skills */}
      {skills && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-400 pb-0.5 mb-1.5 font-sans">
            Core Competencies & Expertise
          </h2>
          <div className="space-y-1 text-[10pt]">
            {Array.isArray(skills) ? (
              <p><span className="font-bold text-neutral-950">Expertise:</span> {skills.join(', ')}</p>
            ) : (
              <>
                {skills.languages?.length > 0 && (
                  <p><span className="font-bold text-neutral-950">Financial Modeling & Quant:</span> {skills.languages.join(', ')}</p>
                )}
                {skills.frameworks?.length > 0 && (
                  <p><span className="font-bold text-neutral-950">Strategic Advisory:</span> {skills.frameworks.join(', ')}</p>
                )}
                {skills.cloudDevOps?.length > 0 && (
                  <p><span className="font-bold text-neutral-950">Analytics & Enterprise Systems:</span> {skills.cloudDevOps.join(', ')}</p>
                )}
                {skills.toolsAndMethods?.length > 0 && (
                  <p><span className="font-bold text-neutral-950">Governance & Leadership:</span> {skills.toolsAndMethods.join(', ')}</p>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {experience && experience.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-400 pb-0.5 mb-2 font-sans">
            Professional Experience
          </h2>
          <div className="space-y-3.5">
            {experience.map((exp) => (
              <div key={exp.id} className="resume-section-item">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-neutral-950 text-[10.5pt]">{exp.company}</span>
                    <span className="text-neutral-800 italic text-[10pt]"> — {exp.role}</span>
                  </div>
                  <span className="text-[9.5pt] text-neutral-600 font-sans whitespace-nowrap">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.location}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-neutral-800 text-[10pt]">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-snug pl-0.5">{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Selected Strategic Engagements / Projects */}
      {projects && projects.length > 0 && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-400 pb-0.5 mb-2 font-sans">
            Selected Strategic Initiatives
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id} className="resume-section-item">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-neutral-950">{proj.name}</span>
                  {proj.techStack && (
                    <span className="text-neutral-600 text-[9pt] italic font-sans">{proj.techStack}</span>
                  )}
                </div>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-neutral-800 text-[10pt]">
                    {proj.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-snug pl-0.5">{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-400 pb-0.5 mb-1.5 font-sans">
            Education & Academic Credentials
          </h2>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline resume-section-item">
                <div>
                  <span className="font-bold text-neutral-950">{edu.school}</span>
                  <span className="text-neutral-800 text-[10pt]"> — {edu.degree} in {edu.field}</span>
                  {edu.honors && <span className="text-neutral-600 italic text-[9.5pt]"> ({edu.honors})</span>}
                </div>
                <div className="text-[9.5pt] text-neutral-600 font-sans text-right whitespace-nowrap">
                  <span>{edu.graduationDate}</span>
                  {edu.gpa && <span className="ml-2 font-semibold">• GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Designations */}
      {certifications && certifications.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-400 pb-0.5 mb-1 font-sans">
            Professional Certifications & Designations
          </h2>
          <ul className="list-disc list-outside ml-4 space-y-0.5 text-[9.5pt] text-neutral-800">
            {certifications.map((cert) => (
              <li key={cert.id} className="pl-0.5">
                <span className="font-bold text-neutral-950">{cert.name}</span> — {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
