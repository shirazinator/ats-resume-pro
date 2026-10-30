import React, { useState } from 'react';
import {
  User, FileText, Briefcase, Award, GraduationCap,
  FolderGit2, Sparkles, Plus, Trash2, CheckCircle2, ChevronRight
} from 'lucide-react';
import { enhanceBulletPoint, STRONG_ACTION_VERBS } from '../utils/atsEngine';

export default function ResumeEditor({ resume, onChangeResume, missingKeywords = [] }) {
  const [activeTab, setActiveTab] = useState('experience');

  const updatePersonalInfo = (field, value) => {
    onChangeResume({
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        [field]: value
      }
    });
  };

  const updateSummary = (value) => {
    onChangeResume({
      ...resume,
      summary: value
    });
  };

  // Work Experience Handlers
  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: "New Company Inc.",
      role: "Software Engineer",
      location: "San Francisco, CA",
      startDate: "2023",
      endDate: "Present",
      current: true,
      bullets: [
        "Architected and deployed scalable services, boosting response efficiency by 30%."
      ]
    };
    onChangeResume({
      ...resume,
      experience: [newExp, ...(resume.experience || [])]
    });
  };

  const handleUpdateExperience = (id, field, value) => {
    onChangeResume({
      ...resume,
      experience: resume.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    });
  };

  const handleDeleteExperience = (id) => {
    onChangeResume({
      ...resume,
      experience: resume.experience.filter(exp => exp.id !== id)
    });
  };

  const handleUpdateBullet = (expId, bulletIdx, newText) => {
    onChangeResume({
      ...resume,
      experience: resume.experience.map(exp => {
        if (exp.id !== expId) return exp;
        const newBullets = [...exp.bullets];
        newBullets[bulletIdx] = newText;
        return { ...exp, bullets: newBullets };
      })
    });
  };

  const handleAddBullet = (expId) => {
    onChangeResume({
      ...resume,
      experience: resume.experience.map(exp => {
        if (exp.id !== expId) return exp;
        return {
          ...exp,
          bullets: [...exp.bullets, "Spearheaded key initiatives delivering measurable business and technical value."]
        };
      })
    });
  };

  const handleDeleteBullet = (expId, bulletIdx) => {
    onChangeResume({
      ...resume,
      experience: resume.experience.map(exp => {
        if (exp.id !== expId) return exp;
        return {
          ...exp,
          bullets: exp.bullets.filter((_, idx) => idx !== bulletIdx)
        };
      })
    });
  };

  const handleEnhanceSingleBullet = (expId, bulletIdx) => {
    const exp = resume.experience.find(e => e.id === expId);
    if (!exp) return;
    const currentBullet = exp.bullets[bulletIdx];
    const topMissingKeyword = missingKeywords[0] || null;
    const enhanced = enhanceBulletPoint(currentBullet, topMissingKeyword);
    handleUpdateBullet(expId, bulletIdx, enhanced);
  };

  const handleAutoOptimizeAllBullets = () => {
    let kwIdx = 0;
    const updatedExperience = (resume.experience || []).map(exp => {
      const optimizedBullets = (exp.bullets || []).map(bullet => {
        const keywordToInject = missingKeywords[kwIdx % Math.max(1, missingKeywords.length)] || null;
        kwIdx++;
        return enhanceBulletPoint(bullet, keywordToInject);
      });
      return { ...exp, bullets: optimizedBullets };
    });

    onChangeResume({
      ...resume,
      experience: updatedExperience
    });
  };

  // Skills Handlers
  const handleAddSkill = (category, skillName) => {
    if (!skillName.trim()) return;
    const currentCategoryList = resume.skills[category] || [];
    if (!currentCategoryList.includes(skillName.trim())) {
      onChangeResume({
        ...resume,
        skills: {
          ...resume.skills,
          [category]: [...currentCategoryList, skillName.trim()]
        }
      });
    }
  };

  const handleRemoveSkill = (category, skillToRemove) => {
    onChangeResume({
      ...resume,
      skills: {
        ...resume.skills,
        [category]: (resume.skills[category] || []).filter(s => s !== skillToRemove)
      }
    });
  };

  // Education Handlers
  const handleAddEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      school: "University Name",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "City, State",
      graduationDate: "2022",
      gpa: "3.8",
      honors: "Honors"
    };
    onChangeResume({
      ...resume,
      education: [...(resume.education || []), newEdu]
    });
  };

  const handleDeleteEducation = (id) => {
    onChangeResume({
      ...resume,
      education: (resume.education || []).filter(e => e.id !== id)
    });
  };

  const handleUpdateEducation = (id, field, value) => {
    onChangeResume({
      ...resume,
      education: (resume.education || []).map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
      {/* Top Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto text-xs font-semibold">
        <TabButton
          active={activeTab === 'experience'}
          onClick={() => setActiveTab('experience')}
          icon={<Briefcase className="w-3.5 h-3.5" />}
          label="Experience"
        />
        <TabButton
          active={activeTab === 'skills'}
          onClick={() => setActiveTab('skills')}
          icon={<Award className="w-3.5 h-3.5" />}
          label="Skills & Stack"
        />
        <TabButton
          active={activeTab === 'summary'}
          onClick={() => setActiveTab('summary')}
          icon={<FileText className="w-3.5 h-3.5" />}
          label="Summary"
        />
        <TabButton
          active={activeTab === 'contact'}
          onClick={() => setActiveTab('contact')}
          icon={<User className="w-3.5 h-3.5" />}
          label="Contact"
        />
        <TabButton
          active={activeTab === 'education'}
          onClick={() => setActiveTab('education')}
          icon={<GraduationCap className="w-3.5 h-3.5" />}
          label="Education"
        />
        <TabButton
          active={activeTab === 'projects'}
          onClick={() => setActiveTab('projects')}
          icon={<FolderGit2 className="w-3.5 h-3.5" />}
          label="Projects"
        />
      </div>

      {/* Tab Contents */}
      <div className="p-5 flex-1 overflow-y-auto space-y-5">
        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white">Work Experience</h4>
                <p className="text-xs text-slate-400">ATS bots evaluate active voice, metrics, and technical keywords in bullets.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAutoOptimizeAllBullets}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  title="Rewrites weak passive verbs into STAR formula action verbs and metric placeholders"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Auto-Optimize All Bullets
                </button>
                <button
                  onClick={handleAddExperience}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Role
                </button>
              </div>
            </div>

            {resume.experience?.map((exp) => (
              <div key={exp.id} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 mr-3">
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => handleUpdateExperience(exp.id, 'role', e.target.value)}
                      placeholder="Role / Title"
                      className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-semibold focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Company"
                      className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Delete Role"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                    placeholder="Start (e.g. Jan 2022)"
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={exp.current ? 'Present' : exp.endDate}
                    onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                    placeholder="End Date"
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => handleUpdateExperience(exp.id, 'location', e.target.value)}
                    placeholder="Location"
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-300 focus:outline-none focus:border-indigo-500 col-span-2 sm:col-span-1"
                  />
                </div>

                {/* Bullets */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Achievement Bullets (XYZ / STAR Formula):
                  </div>
                  {exp.bullets?.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2 group">
                      <span className="text-slate-600 mt-2 text-xs">•</span>
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => handleUpdateBullet(exp.id, idx, e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
                      />
                      <div className="flex flex-col gap-1 shrink-0">
                        <button
                          onClick={() => handleEnhanceSingleBullet(exp.id, idx)}
                          title="Auto-enhance bullet with strong action verb & metric"
                          className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/25 border border-indigo-500/20 text-[10px] font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Sparkles className="w-3 h-3 text-indigo-400" />
                          STAR
                        </button>
                        <button
                          onClick={() => handleDeleteBullet(exp.id, idx)}
                          title="Delete bullet"
                          className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddBullet(exp.id)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 mt-1 pt-1"
                  >
                    <Plus className="w-3 h-3" />
                    Add Bullet Point
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white">Skills & Technical Competencies</h4>
              <p className="text-xs text-slate-400">
                Categorized skills allow ATS systems to map qualifications directly to the role requirements.
              </p>
            </div>

            <SkillCategoryGroup
              title="Languages"
              category="languages"
              skills={resume.skills?.languages || []}
              onAdd={handleAddSkill}
              onRemove={handleRemoveSkill}
            />
            <SkillCategoryGroup
              title="Frameworks & Libraries"
              category="frameworks"
              skills={resume.skills?.frameworks || []}
              onAdd={handleAddSkill}
              onRemove={handleRemoveSkill}
            />
            <SkillCategoryGroup
              title="Cloud & DevOps Infrastructure"
              category="cloudDevOps"
              skills={resume.skills?.cloudDevOps || []}
              onAdd={handleAddSkill}
              onRemove={handleRemoveSkill}
            />
            <SkillCategoryGroup
              title="Databases & Storage"
              category="databases"
              skills={resume.skills?.databases || []}
              onAdd={handleAddSkill}
              onRemove={handleRemoveSkill}
            />
            <SkillCategoryGroup
              title="Tools, Architectures & Methodologies"
              category="toolsAndMethods"
              skills={resume.skills?.toolsAndMethods || []}
              onAdd={handleAddSkill}
              onRemove={handleRemoveSkill}
            />
          </div>
        )}

        {/* SUMMARY TAB */}
        {activeTab === 'summary' && (
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-bold text-white">Professional Summary</h4>
              <p className="text-xs text-slate-400">
                A 2-4 sentence executive overview showcasing years of experience, core specialization, and highest measurable achievements.
              </p>
            </div>
            <textarea
              rows={6}
              value={resume.summary || ''}
              onChange={(e) => updateSummary(e.target.value)}
              placeholder="e.g. Senior Software Engineer with 5+ years of experience architecting distributed systems..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
            />
          </div>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white">Contact & Professional Profiles</h4>
              <p className="text-xs text-slate-400">ATS bots parse headers for name, phone, email, location, and LinkedIn.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <InputField
                label="Full Name"
                value={resume.personalInfo.fullName}
                onChange={(val) => updatePersonalInfo('fullName', val)}
              />
              <InputField
                label="Target Job Title"
                value={resume.personalInfo.jobTitle}
                onChange={(val) => updatePersonalInfo('jobTitle', val)}
              />
              <InputField
                label="Email Address"
                value={resume.personalInfo.email}
                onChange={(val) => updatePersonalInfo('email', val)}
              />
              <InputField
                label="Phone Number"
                value={resume.personalInfo.phone}
                onChange={(val) => updatePersonalInfo('phone', val)}
              />
              <InputField
                label="Location (City, State / Remote)"
                value={resume.personalInfo.location}
                onChange={(val) => updatePersonalInfo('location', val)}
              />
              <InputField
                label="LinkedIn Profile"
                value={resume.personalInfo.linkedin}
                onChange={(val) => updatePersonalInfo('linkedin', val)}
              />
              <InputField
                label="GitHub / Code Portfolio"
                value={resume.personalInfo.github}
                onChange={(val) => updatePersonalInfo('github', val)}
              />
              <InputField
                label="Personal Website / Portfolio"
                value={resume.personalInfo.portfolio}
                onChange={(val) => updatePersonalInfo('portfolio', val)}
              />
            </div>
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white">Education & Degrees</h4>
                <p className="text-xs text-slate-400">Standardized degree, major, institution, and graduation year.</p>
              </div>
              <button
                onClick={handleAddEducation}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Degree
              </button>
            </div>

            {resume.education?.map((edu) => (
              <div key={edu.id} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{edu.school || "Institution"}</span>
                  <button
                    onClick={() => handleDeleteEducation(edu.id)}
                    className="p-1 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => handleUpdateEducation(edu.id, 'school', e.target.value)}
                    placeholder="University / College"
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200"
                  />
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Degree (e.g. Bachelor of Science)"
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200"
                  />
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) => handleUpdateEducation(edu.id, 'field', e.target.value)}
                    placeholder="Major / Field (e.g. Computer Science)"
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200"
                  />
                  <input
                    type="text"
                    value={edu.graduationDate}
                    onChange={(e) => handleUpdateEducation(edu.id, 'graduationDate', e.target.value)}
                    placeholder="Graduation Date (e.g. May 2021)"
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white">Technical & Business Projects</h4>
                <p className="text-xs text-slate-400">Great for demonstrating practical hands-on proficiency.</p>
              </div>
            </div>

            {resume.projects?.map((proj) => (
              <div key={proj.id} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2">
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => {
                    const updated = resume.projects.map(p => p.id === proj.id ? { ...p, name: e.target.value } : p);
                    onChangeResume({ ...resume, projects: updated });
                  }}
                  placeholder="Project Name"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 text-xs text-white font-bold"
                />
                <input
                  type="text"
                  value={proj.techStack || ''}
                  onChange={(e) => {
                    const updated = resume.projects.map(p => p.id === proj.id ? { ...p, techStack: e.target.value } : p);
                    onChangeResume({ ...resume, projects: updated });
                  }}
                  placeholder="Tech Stack (e.g. React, Node.js, AWS, Redis)"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 text-xs text-slate-300 font-mono"
                />
                {proj.bullets?.map((b, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-slate-500 text-xs">•</span>
                    <input
                      type="text"
                      value={b}
                      onChange={(e) => {
                        const newBullets = [...proj.bullets];
                        newBullets[i] = e.target.value;
                        const updated = resume.projects.map(p => p.id === proj.id ? { ...p, bullets: newBullets } : p);
                        onChangeResume({ ...resume, projects: updated });
                      }}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-xs text-slate-300"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
        active
          ? 'border-indigo-500 text-indigo-400 bg-slate-900'
          : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function InputField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-slate-400 mb-1">{label}</label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
      />
    </div>
  );
}

function SkillCategoryGroup({ title, category, skills = [], onAdd, onRemove }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        onAdd(category, inputValue.trim());
        setInputValue('');
      }
    }
  };

  return (
    <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
        <span>{title}</span>
        <span className="text-[11px] text-slate-500">{skills.length} skills</span>
      </div>
      <div className="flex flex-wrap gap-1.5 min-h-[32px]">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-slate-200"
          >
            {skill}
            <button
              onClick={() => onRemove(category, skill)}
              className="text-slate-500 hover:text-rose-400 ml-0.5"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type skill and press Enter..."
        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
      />
    </div>
  );
}
