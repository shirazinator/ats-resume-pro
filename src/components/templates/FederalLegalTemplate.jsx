import React from 'react';

/**
 * Federal, Defense, Aerospace & Legal ATS Template
 * Built for USAJOBS compliance, Defense Contractors, Legal & Regulatory positions.
 * Strict chronological structure, Security Clearances, Formal Standard Headings.
 * 100% single column and ATS compliant.
 */
export default function FederalLegalTemplate({ resume }) {
  const { personalInfo, summary, skills, experience, education, projects, certifications } = resume;

  return (
    <div className="font-serif text-black text-[10.5pt] leading-[1.38] bg-white p-8 max-w-[850px] mx-auto select-text shadow-sm">
      {/* Header */}
      <header className="text-center pb-2 border-b-2 border-black">
        <h1 className="text-2xl font-bold tracking-tight text-black uppercase mb-0.5">
          {personalInfo.fullName}
        </h1>
        <div className="text-[9.5pt] text-neutral-800 font-sans font-bold uppercase tracking-wider mb-1">
          {personalInfo.jobTitle}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-2 text-[9pt] text-neutral-700 font-sans">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && (
            <span>
              • <a href={`mailto:${personalInfo.email}`} className="text-black hover:underline">{personalInfo.email}</a>
            </span>
          )}
          {personalInfo.linkedin && (
            <span>
              • <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-neutral-900 hover:underline">{personalInfo.linkedin}</a>
            </span>
          )}
        </div>
      </header>

      {/* Security Clearance & Core Qualifications */}
      {summary && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5 font-sans">
            Clearance & Executive Profile
          </h2>
          <p className="text-black text-justify text-[10pt] leading-relaxed">
            {summary}
          </p>
        </section>
      )}

      {/* Formal Competencies & Technical Skills */}
      {skills && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5 font-sans">
            Technical Knowledge & Regulatory Standards
          </h2>
          <div className="space-y-1 text-[10pt]">
            {Array.isArray(skills) ? (
              <p><span className="font-bold text-black font-sans">Competencies:</span> {skills.join(', ')}</p>
            ) : (
              <>
                {skills.frameworks?.length > 0 && (
                  <p><span className="font-bold text-black font-sans">Compliance & Standards:</span> {skills.frameworks.join(', ')}</p>
                )}
                {skills.languages?.length > 0 && (
                  <p><span className="font-bold text-black font-sans">Specialized Methodologies:</span> {skills.languages.join(', ')}</p>
                )}
                {skills.cloudDevOps?.length > 0 && (
                  <p><span className="font-bold text-black font-sans">Secure Systems & Infrastructure:</span> {skills.cloudDevOps.join(', ')}</p>
                )}
                {skills.toolsAndMethods?.length > 0 && (
                  <p><span className="font-bold text-black font-sans">Operations & Governance:</span> {skills.toolsAndMethods.join(', ')}</p>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* Chronological Professional Experience */}
      {experience && experience.length > 0 && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2 font-sans">
            Professional Experience (Chronological)
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="resume-section-item">
                <div className="flex justify-between items-baseline font-sans">
                  <div>
                    <span className="font-bold text-black text-[10.5pt]">{exp.company}</span>
                    <span className="text-neutral-800 italic text-[10pt]"> — {exp.role}</span>
                  </div>
                  <span className="text-[9pt] font-medium text-neutral-600 whitespace-nowrap">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.location}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-black text-[10pt]">
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

      {/* Key Programs & Projects */}
      {projects && projects.length > 0 && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2 font-sans">
            Key Programs & Governance Initiatives
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id} className="resume-section-item">
                <div className="flex justify-between items-baseline font-sans">
                  <span className="font-bold text-black">{proj.name}</span>
                  {proj.techStack && (
                    <span className="text-neutral-600 text-[9pt] italic">({proj.techStack})</span>
                  )}
                </div>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-black text-[10pt]">
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
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5 font-sans">
            Education & Academic Degrees
          </h2>
          <div className="space-y-1">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline resume-section-item font-sans">
                <div>
                  <span className="font-bold text-black">{edu.school}</span>
                  <span className="text-neutral-800 text-[10pt]"> — {edu.degree} in {edu.field}</span>
                </div>
                <div className="text-[9pt] text-neutral-600 text-right whitespace-nowrap">
                  <span>{edu.graduationDate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Accreditations & Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1 font-sans">
            Accreditations, Clearances & Licenses
          </h2>
          <ul className="list-disc list-outside ml-4 space-y-0.5 text-[9.5pt] text-black">
            {certifications.map((cert) => (
              <li key={cert.id} className="pl-0.5">
                <span className="font-bold text-black">{cert.name}</span> — {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
