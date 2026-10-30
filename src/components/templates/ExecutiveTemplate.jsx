import React from 'react';

/**
 * Executive & Leadership ATS Template
 * Designed for Engineering Managers, Directors, VPs, and Senior Executives.
 * Features Executive Competencies, Revenue/Scale Impact, and Team Leadership.
 * 100% single column and ATS compliant.
 */
export default function ExecutiveTemplate({ resume }) {
  const { personalInfo, summary, skills, experience, education, projects, certifications } = resume;

  return (
    <div className="font-sans text-zinc-900 text-[10.5pt] leading-[1.4] bg-white p-8 max-w-[850px] mx-auto select-text shadow-sm">
      {/* Header */}
      <header className="border-b-2 border-zinc-800 pb-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-950 uppercase">
              {personalInfo.fullName}
            </h1>
            <p className="text-zinc-700 font-bold text-[11pt] tracking-wide uppercase mt-0.5">
              {personalInfo.jobTitle || "Executive Leader & Director"}
            </p>
          </div>
          <div className="text-left md:text-right text-[9pt] text-zinc-600 space-y-0.5 mt-2 md:mt-0 font-medium">
            <div>{[personalInfo.location, personalInfo.phone].filter(Boolean).join(" • ")}</div>
            <div>
              <a href={`mailto:${personalInfo.email}`} className="text-zinc-900 hover:underline">{personalInfo.email}</a>
              {personalInfo.linkedin && (
                <span> • <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">{personalInfo.linkedin}</a></span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      {summary && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-extrabold uppercase tracking-widest text-zinc-950 border-b border-zinc-300 pb-0.5 mb-1.5">
            Executive Profile
          </h2>
          <p className="text-zinc-800 text-justify text-[10pt] leading-relaxed">
            {summary}
          </p>
        </section>
      )}

      {/* Core Competencies */}
      {skills && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-extrabold uppercase tracking-widest text-zinc-950 border-b border-zinc-300 pb-0.5 mb-1.5">
            Core Leadership Competencies
          </h2>
          <div className="space-y-1 text-[10pt]">
            {Array.isArray(skills) ? (
              <p><span className="font-bold text-zinc-950">Expertise:</span> {skills.join(' • ')}</p>
            ) : (
              <>
                {skills.frameworks?.length > 0 && (
                  <p><span className="font-bold text-zinc-950">Strategic Leadership:</span> {skills.frameworks.join(' • ')}</p>
                )}
                {skills.languages?.length > 0 && (
                  <p><span className="font-bold text-zinc-950">Technical Governance:</span> {skills.languages.join(' • ')}</p>
                )}
                {skills.cloudDevOps?.length > 0 && (
                  <p><span className="font-bold text-zinc-950">Operations & Scale:</span> {skills.cloudDevOps.join(' • ')}</p>
                )}
                {skills.toolsAndMethods?.length > 0 && (
                  <p><span className="font-bold text-zinc-950">Methodologies:</span> {skills.toolsAndMethods.join(' • ')}</p>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* Career Experience */}
      {experience && experience.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[11pt] font-extrabold uppercase tracking-widest text-zinc-950 border-b border-zinc-300 pb-0.5 mb-2">
            Executive Experience
          </h2>
          <div className="space-y-3.5">
            {experience.map((exp) => (
              <div key={exp.id} className="resume-section-item">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-extrabold text-zinc-950 text-[10.5pt]">{exp.role}</span>
                    <span className="text-zinc-800 font-semibold text-[10pt]"> | {exp.company}</span>
                  </div>
                  <span className="text-[9.5pt] font-semibold text-zinc-600 whitespace-nowrap">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.location}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-zinc-800 text-[10pt]">
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

      {/* Major Projects & Business Initiatives */}
      {projects && projects.length > 0 && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-extrabold uppercase tracking-widest text-zinc-950 border-b border-zinc-300 pb-0.5 mb-2">
            Selected Strategic Initiatives
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id} className="resume-section-item">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-zinc-950">{proj.name}</span>
                  {proj.techStack && (
                    <span className="text-zinc-600 text-[9pt] font-mono">[{proj.techStack}]</span>
                  )}
                </div>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-zinc-800 text-[10pt]">
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
          <h2 className="text-[11pt] font-extrabold uppercase tracking-widest text-zinc-950 border-b border-zinc-300 pb-0.5 mb-1.5">
            Education & Executive Programs
          </h2>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline resume-section-item">
                <div>
                  <span className="font-bold text-zinc-950">{edu.degree} in {edu.field}</span>
                  <span className="text-zinc-700 text-[10pt]"> — {edu.school}</span>
                </div>
                <div className="text-[9.5pt] font-medium text-zinc-600 text-right whitespace-nowrap">
                  <span>{edu.graduationDate}</span>
                  {edu.gpa && <span className="ml-2 font-semibold">• GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Governance */}
      {certifications && certifications.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-extrabold uppercase tracking-widest text-zinc-950 border-b border-zinc-300 pb-0.5 mb-1">
            Board Memberships & Certifications
          </h2>
          <ul className="list-disc list-outside ml-4 space-y-0.5 text-[9.5pt] text-zinc-800">
            {certifications.map((cert) => (
              <li key={cert.id} className="pl-0.5">
                <span className="font-bold text-zinc-950">{cert.name}</span> — {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
