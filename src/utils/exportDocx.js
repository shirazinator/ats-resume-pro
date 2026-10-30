import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, UnderlineType } from 'docx';

/**
 * Generates and downloads an ATS-compliant Word Document (.docx)
 */
export async function downloadResumeAsDocx(resume, filename = "ATS_Optimized_Resume.docx") {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
            size: 22, // 11pt (22 half-pts)
            color: "111827",
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 in
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: [
          // Header: Full Name
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: resume.personalInfo.fullName.toUpperCase(),
                bold: true,
                size: 32, // 16pt
                color: "0f172a",
              }),
            ],
            spacing: { after: 100 },
          }),

          // Contact Coordinates Line
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: [
                  resume.personalInfo.location,
                  resume.personalInfo.phone,
                  resume.personalInfo.email,
                  resume.personalInfo.linkedin,
                  resume.personalInfo.github
                ].filter(Boolean).join("  |  "),
                size: 20, // 10pt
                color: "475569",
              }),
            ],
            spacing: { after: 240 },
          }),

          // PROFESSIONAL SUMMARY
          ...(resume.summary ? [
            createSectionHeader("PROFESSIONAL SUMMARY"),
            new Paragraph({
              children: [
                new TextRun({
                  text: resume.summary,
                  size: 21,
                }),
              ],
              spacing: { after: 200 },
            }),
          ] : []),

          // TECHNICAL & PROFESSIONAL SKILLS
          createSectionHeader("TECHNICAL & PROFESSIONAL SKILLS"),
          ...createSkillsParagraphs(resume.skills),

          // WORK EXPERIENCE
          createSectionHeader("PROFESSIONAL EXPERIENCE"),
          ...(resume.experience || []).flatMap(exp => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.role}  —  ${exp.company}`,
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: `   (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate} | ${exp.location})`,
                  italics: true,
                  size: 20,
                  color: "64748b",
                }),
              ],
              spacing: { before: 140, after: 60 },
            }),
            ...(exp.bullets || []).map(bullet => 
              new Paragraph({
                bullet: { level: 0 },
                children: [
                  new TextRun({
                    text: bullet,
                    size: 21,
                  }),
                ],
                spacing: { after: 60 },
              })
            ),
          ]),

          // PROJECTS
          ...(resume.projects && resume.projects.length > 0 ? [
            createSectionHeader("KEY PROJECTS"),
            ...resume.projects.flatMap(proj => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: proj.name,
                    bold: true,
                    size: 22,
                  }),
                  ...(proj.techStack ? [
                    new TextRun({
                      text: `  [${proj.techStack}]`,
                      color: "475569",
                      size: 20,
                    }),
                  ] : []),
                  ...(proj.link ? [
                    new TextRun({
                      text: `  (${proj.link})`,
                      italics: true,
                      size: 20,
                      color: "2563eb",
                    }),
                  ] : []),
                ],
                spacing: { before: 140, after: 60 },
              }),
              ...(proj.bullets || []).map(bullet => 
                new Paragraph({
                  bullet: { level: 0 },
                  children: [
                    new TextRun({
                      text: bullet,
                      size: 21,
                    }),
                  ],
                  spacing: { after: 60 },
                })
              ),
            ]),
          ] : []),

          // EDUCATION
          createSectionHeader("EDUCATION"),
          ...(resume.education || []).flatMap(edu => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.degree} in ${edu.field}`,
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: `  —  ${edu.school}`,
                  size: 22,
                }),
                new TextRun({
                  text: `   (${edu.graduationDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''})`,
                  italics: true,
                  size: 20,
                  color: "64748b",
                }),
              ],
              spacing: { before: 100, after: 80 },
            }),
          ]),

          // CERTIFICATIONS
          ...(resume.certifications && resume.certifications.length > 0 ? [
            createSectionHeader("CERTIFICATIONS & ACCREDITATIONS"),
            ...(resume.certifications || []).map(cert => 
              new Paragraph({
                bullet: { level: 0 },
                children: [
                  new TextRun({
                    text: cert.name,
                    bold: true,
                    size: 21,
                  }),
                  new TextRun({
                    text: ` — ${cert.issuer} (${cert.year})`,
                    size: 20,
                    color: "475569",
                  }),
                ],
                spacing: { after: 60 },
              })
            ),
          ] : []),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function createSectionHeader(title) {
  return new Paragraph({
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 24, // 12pt
        color: "0f172a",
      }),
    ],
    spacing: { before: 220, after: 80 },
    border: {
      bottom: {
        color: "cbd5e1",
        space: 2,
        value: "single",
        size: 6,
      },
    },
  });
}

function createSkillsParagraphs(skills) {
  if (!skills) return [];

  if (Array.isArray(skills)) {
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: skills.join(", "),
            size: 21,
          }),
        ],
        spacing: { after: 120 },
      }),
    ];
  }

  const entries = [];
  if (skills.languages?.length) entries.push(`Languages: ${skills.languages.join(", ")}`);
  if (skills.frameworks?.length) entries.push(`Frameworks & Libraries: ${skills.frameworks.join(", ")}`);
  if (skills.cloudDevOps?.length) entries.push(`Cloud & DevOps: ${skills.cloudDevOps.join(", ")}`);
  if (skills.databases?.length) entries.push(`Databases: ${skills.databases.join(", ")}`);
  if (skills.toolsAndMethods?.length) entries.push(`Tools & Methodologies: ${skills.toolsAndMethods.join(", ")}`);

  return entries.map(entry => {
    const [category, items] = entry.split(": ");
    return new Paragraph({
      children: [
        new TextRun({
          text: `${category}: `,
          bold: true,
          size: 21,
        }),
        new TextRun({
          text: items || "",
          size: 21,
        }),
      ],
      spacing: { after: 40 },
    });
  });
}
