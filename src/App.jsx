import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import ScoreDashboard from './components/ScoreDashboard';
import KeywordMatcher from './components/KeywordMatcher';
import ResumeEditor from './components/ResumeEditor';
import ResumePreview from './components/ResumePreview';
import JobDescriptionModal from './components/JobDescriptionModal';
import AIAssistantModal from './components/AIAssistantModal';
import AutoUpdateBanner from './components/AutoUpdateBanner';
import { INITIAL_RESUMES, SAMPLE_JOB_DESCRIPTIONS } from './constants/initialData';
import { auditResumeATS } from './utils/atsEngine';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, FileCheck2 } from 'lucide-react';

export default function App() {
  // Restore user drafts from localStorage if available
  const [resume, setResume] = useState(() => {
    try {
      const saved = localStorage.getItem('ats_resume_draft');
      return saved ? JSON.parse(saved) : INITIAL_RESUMES.software_engineer;
    } catch {
      return INITIAL_RESUMES.software_engineer;
    }
  });

  const [jobDescription, setJobDescription] = useState(() => {
    return localStorage.getItem('ats_jd_draft') || SAMPLE_JOB_DESCRIPTIONS.software_engineer;
  });

  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    return localStorage.getItem('ats_template') || 'faang';
  });

  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [leftTab, setLeftTab] = useState('editor'); // 'editor' | 'diagnostics'

  // Auto-save changes to localStorage so user never loses work on refresh or updates
  useEffect(() => {
    try {
      localStorage.setItem('ats_resume_draft', JSON.stringify(resume));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }, [resume]);

  useEffect(() => {
    localStorage.setItem('ats_jd_draft', jobDescription);
  }, [jobDescription]);

  useEffect(() => {
    localStorage.setItem('ats_template', selectedTemplate);
  }, [selectedTemplate]);

  // Run ATS Audit dynamically whenever resume or job description updates
  const auditResult = useMemo(() => {
    return auditResumeATS(resume, jobDescription);
  }, [resume, jobDescription]);

  // Load sample demo resumes
  const handleLoadDemo = (key) => {
    if (key === 'empty') {
      setResume({
        personalInfo: {
          fullName: "Your Name",
          jobTitle: "Your Target Job Title",
          email: "your.name@example.com",
          phone: "+1 (555) 000-0000",
          location: "City, State",
          linkedin: "linkedin.com/in/yourprofile",
          github: "github.com/yourhandle",
          portfolio: ""
        },
        summary: "",
        skills: {
          languages: [],
          frameworks: [],
          cloudDevOps: [],
          databases: [],
          toolsAndMethods: []
        },
        experience: [],
        education: [],
        projects: [],
        certifications: []
      });
      setJobDescription('');
    } else if (INITIAL_RESUMES[key]) {
      setResume(INITIAL_RESUMES[key]);
      setJobDescription(SAMPLE_JOB_DESCRIPTIONS[key] || '');
      if (key === 'finance_consultant') setSelectedTemplate('corporate');
      else setSelectedTemplate('faang');
    }
  };

  // Add missing keyword directly to resume skills
  const handleAddKeywordToSkills = (keyword) => {
    const currentTools = resume.skills?.toolsAndMethods || [];
    if (!currentTools.includes(keyword)) {
      setResume(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          toolsAndMethods: [...(prev.skills?.toolsAndMethods || []), keyword]
        }
      }));
    }
  };

  // Apply updates from AI assistant modal
  const handleApplyAIUpdate = (updates) => {
    setResume(prev => ({
      ...prev,
      ...updates
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        selectedTemplate={selectedTemplate}
        onChangeTemplate={setSelectedTemplate}
        onLoadDemo={handleLoadDemo}
        onUploadResume={setResume}
        onOpenAIModal={() => setIsAIModalOpen(true)}
        resume={resume}
      />

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Diagnostics, Keyword Matcher & Live Editor (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5 h-[calc(100vh-6rem)]">
          {/* Sub Navigation on Left Column */}
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setLeftTab('editor')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                leftTab === 'editor'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Resume Editor</span>
            </button>
            <button
              onClick={() => setLeftTab('diagnostics')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                leftTab === 'diagnostics'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ATS Score & Keywords ({auditResult.totalScore}/100)</span>
            </button>
          </div>

          {/* Conditional Left Views */}
          <div className="flex-1 overflow-y-auto space-y-5 pr-1">
            {leftTab === 'diagnostics' ? (
              <>
                <ScoreDashboard
                  auditResult={auditResult}
                  onFixSection={(sec) => setLeftTab('editor')}
                />
                <KeywordMatcher
                  matchedKeywords={auditResult.matchedKeywords}
                  missingKeywords={auditResult.missingKeywords}
                  onAddKeywordToSkills={handleAddKeywordToSkills}
                  onOpenJobDescModal={() => setIsJobModalOpen(true)}
                  hasJobDescription={Boolean(jobDescription)}
                />
              </>
            ) : (
              <>
                {/* Mini Score Banner inside Editor Tab */}
                <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Current ATS Score:</span>
                    <span className={`font-black text-sm px-2 py-0.5 rounded ${
                      auditResult.totalScore >= 80 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {auditResult.totalScore} / 100
                    </span>
                  </div>
                  <button
                    onClick={() => setLeftTab('diagnostics')}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                  >
                    View Breakdown →
                  </button>
                </div>

                <ResumeEditor
                  resume={resume}
                  onChangeResume={setResume}
                  missingKeywords={auditResult.missingKeywords}
                />
              </>
            )}
          </div>
        </div>

        {/* Right Column: Live ATS Formatted Resume Preview (7 cols) */}
        <div className="lg:col-span-7 h-[calc(100vh-6rem)]">
          <ResumePreview
            resume={resume}
            selectedTemplate={selectedTemplate}
          />
        </div>
      </main>

      {/* Target Job Description Modal */}
      <JobDescriptionModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        currentJD={jobDescription}
        onSaveJD={setJobDescription}
      />

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        resume={resume}
        jobDescription={jobDescription}
        onApplyAIUpdate={handleApplyAIUpdate}
      />
      {/* Auto Update Detector */}
      <AutoUpdateBanner />
    </div>
  );
}
