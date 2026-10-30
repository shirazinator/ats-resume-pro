import React from 'react';

/**
 * High-Growth Tech & Startup ATS Template
 * Sleek modern typography with clean slate/indigo styling.
 * Perfect for YC startups, scale-ups, modern product teams.
 * 100% single-column ATS compliant.
 */
export default function StartupModernTemplate({ resume }) {
  const { personalInfo, summary, skills, experience, education, projects, certifications } = resume;

  return (
    <div className="font-sans text-slate-900 text-[10.5pt] leading-[1.42] bg-white p-8 max-w-[850px] mx-auto select-text shadow-sm">
      {/* Header */}
      <header className="pb-3 border-b-2 border-indigo-600">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              {personalInfo.fullName}
            </h1>
            <p className="text-indigo-600 font-semibold text-[11pt] tracking-wide mt-0.5">
              {personalInfo.jobTitle || "Software Engineer & Builder"}
            </p>
          </div>
          <div className="text-right text-[9pt] text-slate-600 space-y-0.5">
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.email && (
              <div>
                <a href={`mailto:${personalInfo.email}`} className="text-slate-900 font-medium hover:text-indigo-600">{personalInfo.email}</a>
              </div>
            )}
            {personalInfo.linkedin && (
              <div>
                <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-indigo-600 font-medium hover:underline">{personalInfo.linkedin}</a>
              </div>
            )}
            {personalInfo.github && (
              <div>
                <a href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-slate-900 font-medium hover:underline">{personalInfo.github}</a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
            About & Impact
          </h2>
          <p className="text-slate-700 text-[10pt] leading-relaxed pl-4">
            {summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {skills && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
            Core Competencies & Stack
          </h2>
          <div className="pl-4 space-y-1 text-[10pt]">
            {Array.isArray(skills) ? (
              <p><span className="font-semibold text-slate-900">Skills:</span> {skills.join(' • ')}</p>
            ) : (
              <>
                {skills.languages?.length > 0 && (
                  <p><span className="font-semibold text-slate-900">Languages:</span> {skills.languages.join(' • ')}</p>
                )}
                {skills.frameworks?.length > 0 && (
                  <p><span className="font-semibold text-slate-900">Frameworks:</span> {skills.frameworks.join(' • ')}</p>
                )}
                {skills.cloudDevOps?.length > 0 && (
                  <p><span className="font-semibold text-slate-900">Cloud & Tooling:</span> {skills.cloudDevOps.join(' • ')}</p>
                )}
                {skills.databases?.length > 0 && (
                  <p><span className="font-semibold text-slate-900">Databases:</span> {skills.databases.join(' • ')}</p>
                )}
                {skills.toolsAndMethods?.length > 0 && (
                  <p><span className="font-semibold text-slate-900">Practices:</span> {skills.toolsAndMethods.join(' • ')}</p>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[11pt] font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
            Professional Experience
          </h2>
          <div className="space-y-3.5 pl-4">
            {experience.map((exp) => (
              <div key={exp.id} className="resume-section-item">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-950 text-[10.5pt]">{exp.role}</span>
                    <span className="text-indigo-600 font-semibold text-[10.5pt]"> @ {exp.company}</span>
                  </div>
                  <span className="text-[9pt] font-medium text-slate-500">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.location}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-slate-700 text-[10pt]">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-snug">{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[11pt] font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
            Shipped Products & Open Source
          </h2>
          <div className="space-y-2.5 pl-4">
            {projects.map((proj) => (
              <div key={proj.id} className="resume-section-item">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-950">{proj.name}</span>
                    {proj.techStack && (
                      <span className="text-slate-500 text-[9pt] ml-2 font-mono">({proj.techStack})</span>
                    )}
                  </div>
                  {proj.link && (
                    <a href={`https://${proj.link.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-indigo-600 text-[9pt] font-medium hover:underline">
                      {proj.link}
                    </a>
                  )}
                </div>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-slate-700 text-[10pt]">
                    {proj.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-snug">{bullet}</li>
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
          <h2 className="text-[11pt] font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
            Education
          </h2>
          <div className="pl-4 space-y-1">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline resume-section-item">
                <div>
                  <span className="font-bold text-slate-950">{edu.school}</span>
                  <span className="text-slate-700 text-[10pt]"> — {edu.degree} in {edu.field}</span>
                </div>
                <div className="text-[9pt] text-slate-500">
                  {edu.graduationDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
            Certifications
          </h2>
          <ul className="list-disc list-outside ml-8 space-y-0.5 text-[9.5pt] text-slate-700">
            {certifications.map((cert) => (
              <li key={cert.id}>
                <span className="font-semibold text-slate-950">{cert.name}</span> — {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
