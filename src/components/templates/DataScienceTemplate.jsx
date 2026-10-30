import React from 'react';

/**
 * Data Science, AI & Machine Learning ATS Standard Template
 * Specialized for AI Engineers, ML Scientists, and Quantitative Analysts.
 * Emphasizes Model Development, Data Pipelines, Metrics, and Technical Stack.
 * 100% single column, parseable ATS format.
 */
export default function DataScienceTemplate({ resume }) {
  const { personalInfo, summary, skills, experience, education, projects, certifications } = resume;

  return (
    <div className="font-sans text-slate-900 text-[10.5pt] leading-[1.38] bg-white p-8 max-w-[850px] mx-auto select-text shadow-sm">
      {/* Header */}
      <header className="border-b-2 border-teal-700 pb-2.5">
        <div className="flex justify-between items-baseline flex-wrap gap-1">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 uppercase">
              {personalInfo.fullName}
            </h1>
            <p className="text-teal-700 font-semibold text-[10.5pt] mt-0.5">
              {personalInfo.jobTitle || "Data Scientist & Machine Learning Specialist"}
            </p>
          </div>
          <div className="text-right text-[9pt] text-slate-600 font-mono space-y-0.5">
            {personalInfo.location && <div>{personalInfo.location}</div>}
            <div>
              {personalInfo.phone && <span>{personalInfo.phone} • </span>}
              <a href={`mailto:${personalInfo.email}`} className="text-teal-800 hover:underline">{personalInfo.email}</a>
            </div>
            {personalInfo.github && (
              <div>
                <a href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-teal-800 hover:underline">{personalInfo.github}</a>
                {personalInfo.linkedin && (
                  <span> • <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-teal-800 hover:underline">{personalInfo.linkedin}</a></span>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Profile */}
      {summary && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5 flex items-center justify-between">
            <span>Specialization & Quantitative Summary</span>
          </h2>
          <p className="text-slate-800 text-justify text-[10pt] leading-relaxed">
            {summary}
          </p>
        </section>
      )}

      {/* Machine Learning & Technical Stack */}
      {skills && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5">
            Machine Learning & Quantitative Toolset
          </h2>
          <div className="space-y-1 text-[10pt]">
            {Array.isArray(skills) ? (
              <p><span className="font-semibold text-slate-950">Expertise:</span> {skills.join(', ')}</p>
            ) : (
              <>
                {skills.languages?.length > 0 && (
                  <p><span className="font-semibold text-slate-950">Modeling Languages:</span> {skills.languages.join(', ')}</p>
                )}
                {skills.frameworks?.length > 0 && (
                  <p><span className="font-semibold text-slate-950">ML/DL Frameworks:</span> {skills.frameworks.join(', ')}</p>
                )}
                {skills.cloudDevOps?.length > 0 && (
                  <p><span className="font-semibold text-slate-950">Data Infrastructure & Cloud:</span> {skills.cloudDevOps.join(', ')}</p>
                )}
                {skills.databases?.length > 0 && (
                  <p><span className="font-semibold text-slate-950">Data Warehousing & SQL:</span> {skills.databases.join(', ')}</p>
                )}
                {skills.toolsAndMethods?.length > 0 && (
                  <p><span className="font-semibold text-slate-950">Statistical Methods & MLOps:</span> {skills.toolsAndMethods.join(', ')}</p>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {experience && experience.length > 0 && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-2">
            Applied Industry Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="resume-section-item">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-950 text-[10.5pt]">{exp.company}</span>
                    <span className="text-teal-800 font-semibold italic text-[10pt]"> — {exp.role}</span>
                  </div>
                  <span className="text-[9pt] font-medium text-slate-600 whitespace-nowrap">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.location}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-slate-800 text-[10pt]">
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

      {/* Selected ML Projects & Research */}
      {projects && projects.length > 0 && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-2">
            Machine Learning Systems & Research
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id} className="resume-section-item">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-950">{proj.name}</span>
                    {proj.techStack && (
                      <span className="text-slate-600 text-[9pt] font-mono ml-2">[{proj.techStack}]</span>
                    )}
                  </div>
                  {proj.link && (
                    <a href={`https://${proj.link.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-teal-700 text-[9pt] hover:underline font-mono">
                      {proj.link}
                    </a>
                  )}
                </div>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-slate-800 text-[10pt]">
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
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5">
            Academic Background
          </h2>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline resume-section-item">
                <div>
                  <span className="font-bold text-slate-950">{edu.school}</span>
                  <span className="text-slate-800 text-[10pt]"> — {edu.degree} in {edu.field}</span>
                  {edu.honors && <span className="text-slate-600 italic text-[9.5pt]"> ({edu.honors})</span>}
                </div>
                <div className="text-[9.5pt] font-medium text-slate-600 text-right whitespace-nowrap">
                  <span>{edu.graduationDate}</span>
                  {edu.gpa && <span className="ml-2 font-semibold">• GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Publications */}
      {certifications && certifications.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1">
            Certifications & Specialized Training
          </h2>
          <ul className="list-disc list-outside ml-4 space-y-0.5 text-[9.5pt] text-slate-800">
            {certifications.map((cert) => (
              <li key={cert.id} className="pl-0.5">
                <span className="font-semibold text-slate-950">{cert.name}</span> — {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
