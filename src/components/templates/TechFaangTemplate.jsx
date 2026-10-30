import React from 'react';

/**
 * FAANG & Big Tech ATS Standard Template
 * Follows strict Stanford / Ivy League engineering resume guidelines:
 * 100% single column, high density, right-aligned dates/locations, standard headers.
 */
export default function TechFaangTemplate({ resume }) {
  const { personalInfo, summary, skills, experience, education, projects, certifications } = resume;

  return (
    <div className="font-sans text-gray-900 text-[10.5pt] leading-[1.38] bg-white p-8 max-w-[850px] mx-auto select-text shadow-sm">
      {/* Header */}
      <header className="text-center pb-2 border-b border-gray-900">
        <h1 className="text-2xl font-bold tracking-tight text-gray-950 uppercase mb-1">
          {personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-x-2 text-[9.5pt] text-gray-700 font-medium">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && (
            <span>
              • <a href={`mailto:${personalInfo.email}`} className="text-gray-900 hover:underline">{personalInfo.email}</a>
            </span>
          )}
          {personalInfo.linkedin && (
            <span>
              • <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">{personalInfo.linkedin}</a>
            </span>
          )}
          {personalInfo.github && (
            <span>
              • <a href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline">{personalInfo.github}</a>
            </span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {summary && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-0.5 mb-1.5">
            Professional Summary
          </h2>
          <p className="text-gray-800 text-justify text-[10pt] leading-relaxed">
            {summary}
          </p>
        </section>
      )}

      {/* Technical Skills */}
      {skills && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-0.5 mb-1.5">
            Technical Skills
          </h2>
          <div className="space-y-1 text-[10pt]">
            {Array.isArray(skills) ? (
              <p><span className="font-semibold text-gray-900">Skills:</span> {skills.join(', ')}</p>
            ) : (
              <>
                {skills.languages?.length > 0 && (
                  <p><span className="font-semibold text-gray-950">Languages:</span> {skills.languages.join(', ')}</p>
                )}
                {skills.frameworks?.length > 0 && (
                  <p><span className="font-semibold text-gray-950">Frameworks & Libraries:</span> {skills.frameworks.join(', ')}</p>
                )}
                {skills.cloudDevOps?.length > 0 && (
                  <p><span className="font-semibold text-gray-950">Cloud & DevOps:</span> {skills.cloudDevOps.join(', ')}</p>
                )}
                {skills.databases?.length > 0 && (
                  <p><span className="font-semibold text-gray-950">Databases & Storage:</span> {skills.databases.join(', ')}</p>
                )}
                {skills.toolsAndMethods?.length > 0 && (
                  <p><span className="font-semibold text-gray-950">Tools & Architectures:</span> {skills.toolsAndMethods.join(', ')}</p>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-0.5 mb-2">
            Work Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="resume-section-item">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-gray-950 text-[10.5pt]">{exp.company}</span>
                    <span className="text-gray-800 font-semibold italic text-[10pt]"> — {exp.role}</span>
                  </div>
                  <span className="text-[9.5pt] font-medium text-gray-700 whitespace-nowrap">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.location}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-gray-800 text-[10pt]">
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

      {/* Key Projects */}
      {projects && projects.length > 0 && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-0.5 mb-2">
            Technical Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id} className="resume-section-item">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-gray-950">{proj.name}</span>
                    {proj.techStack && (
                      <span className="text-gray-600 text-[9.5pt] font-mono ml-2">[{proj.techStack}]</span>
                    )}
                  </div>
                  {proj.link && (
                    <a href={`https://${proj.link.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-blue-700 text-[9pt] hover:underline">
                      {proj.link}
                    </a>
                  )}
                </div>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-gray-800 text-[10pt]">
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
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-0.5 mb-1.5">
            Education
          </h2>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline resume-section-item">
                <div>
                  <span className="font-bold text-gray-950">{edu.school}</span>
                  <span className="text-gray-800 text-[10pt]"> — {edu.degree} in {edu.field}</span>
                  {edu.honors && <span className="text-gray-600 italic text-[9.5pt]"> ({edu.honors})</span>}
                </div>
                <div className="text-[9.5pt] font-medium text-gray-700 text-right whitespace-nowrap">
                  <span>{edu.graduationDate}</span>
                  {edu.gpa && <span className="ml-2 font-semibold">• GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-0.5 mb-1">
            Certifications
          </h2>
          <ul className="list-disc list-outside ml-4 space-y-0.5 text-[10pt] text-gray-800">
            {certifications.map((cert) => (
              <li key={cert.id} className="pl-0.5">
                <span className="font-semibold text-gray-950">{cert.name}</span> — {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
