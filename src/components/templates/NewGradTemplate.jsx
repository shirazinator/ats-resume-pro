import React from 'react';

/**
 * Entry-Level, Graduate & Career-Switcher ATS Template
 * Education-first layout recommended by university career centers (MIT, Stanford, Berkeley).
 * Emphasizes Degree, GPA, Coursework, Capstone Projects & Practical Skills.
 * 100% single column and ATS compliant.
 */
export default function NewGradTemplate({ resume }) {
  const { personalInfo, summary, skills, experience, education, projects, certifications } = resume;

  return (
    <div className="font-sans text-neutral-900 text-[10.5pt] leading-[1.38] bg-white p-8 max-w-[850px] mx-auto select-text shadow-sm">
      {/* Header */}
      <header className="text-center pb-2 border-b-2 border-neutral-900">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950 uppercase mb-0.5">
          {personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-x-2 text-[9pt] text-neutral-700 font-medium">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && (
            <span>
              • <a href={`mailto:${personalInfo.email}`} className="text-neutral-900 hover:underline">{personalInfo.email}</a>
            </span>
          )}
          {personalInfo.github && (
            <span>
              • <a href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">{personalInfo.github}</a>
            </span>
          )}
          {personalInfo.linkedin && (
            <span>
              • <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">{personalInfo.linkedin}</a>
            </span>
          )}
        </div>
      </header>

      {/* EDUCATION (PLACED FIRST FOR ENTRY-LEVEL / NEW GRADS) */}
      {education && education.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-0.5 mb-1.5">
            Education
          </h2>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="resume-section-item">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-neutral-950">{edu.school}</span>
                    <span className="text-neutral-800 text-[10pt]"> — {edu.degree} in {edu.field}</span>
                  </div>
                  <span className="text-[9.5pt] font-semibold text-neutral-700 whitespace-nowrap">
                    {edu.graduationDate}
                  </span>
                </div>
                <div className="text-[9.5pt] text-neutral-600 flex justify-between mt-0.5">
                  <span>{edu.honors ? `Honors: ${edu.honors}` : 'Relevant Coursework: Data Structures, Algorithms, Systems Architecture'}</span>
                  {edu.gpa && <span className="font-bold text-neutral-800">Cumulative GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TECHNICAL SKILLS */}
      {skills && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-0.5 mb-1.5">
            Technical Competencies
          </h2>
          <div className="space-y-1 text-[10pt]">
            {Array.isArray(skills) ? (
              <p><span className="font-semibold text-neutral-950">Skills:</span> {skills.join(', ')}</p>
            ) : (
              <>
                {skills.languages?.length > 0 && (
                  <p><span className="font-semibold text-neutral-950">Programming Languages:</span> {skills.languages.join(', ')}</p>
                )}
                {skills.frameworks?.length > 0 && (
                  <p><span className="font-semibold text-neutral-950">Frameworks & Libraries:</span> {skills.frameworks.join(', ')}</p>
                )}
                {skills.cloudDevOps?.length > 0 && (
                  <p><span className="font-semibold text-neutral-950">Developer Tools & Platforms:</span> {skills.cloudDevOps.join(', ')}</p>
                )}
                {skills.databases?.length > 0 && (
                  <p><span className="font-semibold text-neutral-950">Databases & Storage:</span> {skills.databases.join(', ')}</p>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* TECHNICAL PROJECTS (HIGH PRIORITY) */}
      {projects && projects.length > 0 && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-0.5 mb-2">
            Selected Technical & Capstone Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id} className="resume-section-item">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-neutral-950">{proj.name}</span>
                    {proj.techStack && (
                      <span className="text-neutral-600 text-[9pt] font-mono ml-2">[{proj.techStack}]</span>
                    )}
                  </div>
                  {proj.link && (
                    <a href={`https://${proj.link.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-blue-700 text-[9pt] hover:underline">
                      {proj.link}
                    </a>
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

      {/* EXPERIENCE / INTERNSHIPS */}
      {experience && experience.length > 0 && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-0.5 mb-2">
            Professional Experience & Internships
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="resume-section-item">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-neutral-950 text-[10.5pt]">{exp.company}</span>
                    <span className="text-neutral-800 italic text-[10pt]"> — {exp.role}</span>
                  </div>
                  <span className="text-[9pt] font-medium text-neutral-600 whitespace-nowrap">
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

      {/* CERTIFICATIONS & ACTIVITIES */}
      {certifications && certifications.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-0.5 mb-1">
            Certifications & Leadership Activities
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
