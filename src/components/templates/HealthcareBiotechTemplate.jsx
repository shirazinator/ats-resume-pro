import React from 'react';

/**
 * Healthcare, Biotech & Clinical ATS Template
 * Designed for Nurses, Physicians, Clinical Researchers, Biotech Specialists.
 * Features Licensure, Clinical Competencies, Regulatory Protocols (HIPAA/FDA).
 * 100% single column and ATS compliant.
 */
export default function HealthcareBiotechTemplate({ resume }) {
  const { personalInfo, summary, skills, experience, education, projects, certifications } = resume;

  return (
    <div className="font-sans text-slate-900 text-[10.5pt] leading-[1.38] bg-white p-8 max-w-[850px] mx-auto select-text shadow-sm">
      {/* Header */}
      <header className="border-b-2 border-emerald-800 pb-2.5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 uppercase">
          {personalInfo.fullName}
        </h1>
        <p className="text-emerald-800 font-semibold text-[10.5pt] mt-0.5">
          {personalInfo.jobTitle || "Healthcare & Biotech Clinical Specialist"}
        </p>
        <div className="flex flex-wrap items-center gap-x-2 text-[9pt] text-slate-600 mt-1 font-medium">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && (
            <span>
              • <a href={`mailto:${personalInfo.email}`} className="text-emerald-800 hover:underline">{personalInfo.email}</a>
            </span>
          )}
          {personalInfo.linkedin && (
            <span>
              • <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-emerald-800 hover:underline">{personalInfo.linkedin}</a>
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5">
            Clinical & Professional Profile
          </h2>
          <p className="text-slate-800 text-justify text-[10pt] leading-relaxed">
            {summary}
          </p>
        </section>
      )}

      {/* Clinical Competencies & Regulatory Skills */}
      {skills && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5">
            Clinical Competencies & Technical Skills
          </h2>
          <div className="space-y-1 text-[10pt]">
            {Array.isArray(skills) ? (
              <p><span className="font-semibold text-slate-950">Expertise:</span> {skills.join(', ')}</p>
            ) : (
              <>
                {skills.frameworks?.length > 0 && (
                  <p><span className="font-semibold text-slate-950">Clinical Protocols & Care:</span> {skills.frameworks.join(', ')}</p>
                )}
                {skills.toolsAndMethods?.length > 0 && (
                  <p><span className="font-semibold text-slate-950">Regulatory & Compliance:</span> {skills.toolsAndMethods.join(', ')}</p>
                )}
                {skills.cloudDevOps?.length > 0 && (
                  <p><span className="font-semibold text-slate-950">EMR Systems & Analytics:</span> {skills.cloudDevOps.join(', ')}</p>
                )}
                {skills.languages?.length > 0 && (
                  <p><span className="font-semibold text-slate-950">Laboratory & Bio-Instrumentation:</span> {skills.languages.join(', ')}</p>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* Clinical & Professional Experience */}
      {experience && experience.length > 0 && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-2">
            Clinical & Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="resume-section-item">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-950 text-[10.5pt]">{exp.company}</span>
                    <span className="text-emerald-800 font-semibold italic text-[10pt]"> — {exp.role}</span>
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

      {/* Clinical Trials & Projects */}
      {projects && projects.length > 0 && (
        <section className="mt-3.5">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-2">
            Clinical Research & Quality Improvement Initiatives
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id} className="resume-section-item">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-950">{proj.name}</span>
                  {proj.techStack && (
                    <span className="text-slate-600 text-[9pt] font-medium ml-2">[{proj.techStack}]</span>
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

      {/* Licensure & Certifications (High Priority) */}
      {certifications && certifications.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1">
            Professional Licensure & Certifications
          </h2>
          <ul className="list-disc list-outside ml-4 space-y-0.5 text-[9.5pt] text-slate-800">
            {certifications.map((cert) => (
              <li key={cert.id} className="pl-0.5">
                <span className="font-bold text-slate-950">{cert.name}</span> — {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[11pt] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5">
            Education & Medical Training
          </h2>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline resume-section-item">
                <div>
                  <span className="font-bold text-slate-950">{edu.school}</span>
                  <span className="text-slate-800 text-[10pt]"> — {edu.degree} in {edu.field}</span>
                </div>
                <div className="text-[9.5pt] text-slate-600 text-right whitespace-nowrap">
                  <span>{edu.graduationDate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
