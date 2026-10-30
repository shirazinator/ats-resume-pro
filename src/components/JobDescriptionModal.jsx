import React, { useState } from 'react';
import { X, Sparkles, Briefcase, FileText } from 'lucide-react';
import { SAMPLE_JOB_DESCRIPTIONS } from '../constants/initialData';

export default function JobDescriptionModal({ isOpen, onClose, currentJD, onSaveJD }) {
  const [jdText, setJdText] = useState(currentJD || '');

  if (!isOpen) return null;

  const handleSelectPreset = (key) => {
    setJdText(SAMPLE_JOB_DESCRIPTIONS[key] || '');
  };

  const handleApply = () => {
    onSaveJD(jdText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Target Job Description</h2>
              <p className="text-xs text-slate-400">ATS bots rank resumes against specific job postings. Paste yours below.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets Bar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800/80">
          <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Or test with a 1-click industry benchmark:
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSelectPreset('software_engineer')}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              💻 Tech / FAANG Software Engineer
            </button>
            <button
              onClick={() => handleSelectPreset('finance_consultant')}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              💼 McKinsey / Goldman Consultant
            </button>
            <button
              onClick={() => handleSelectPreset('product_manager')}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              📊 Stripe / Uber Product Manager
            </button>
          </div>
        </div>

        {/* Text Area */}
        <div className="p-5 flex-1 overflow-y-auto">
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Paste Job Posting Text (Requirements, Responsibilities, Skills):
          </label>
          <textarea
            rows={12}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste complete job description here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/40">
          <button
            onClick={() => setJdText('')}
            className="text-xs text-slate-400 hover:text-slate-200 underline"
          >
            Clear Text
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
            >
              Analyze & Match Keywords
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
