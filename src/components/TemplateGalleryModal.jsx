import React from 'react';
import { X, Check, ShieldCheck, Sparkles, Layout } from 'lucide-react';

export const TEMPLATES_CATALOG = [
  {
    id: 'faang',
    name: '🏢 FAANG & Big Tech Standard',
    category: 'Software & Cloud Engineering',
    bestFor: 'Google, Meta, Amazon, Apple, Microsoft, Netflix',
    description: 'Stanford / Ivy League single-column layout. High density, right-aligned dates, metric-heavy (XYZ formula).',
    atsPassRate: '99.4%',
    badge: 'Most Popular'
  },
  {
    id: 'startup',
    name: '🚀 High-Growth Tech & Startup',
    category: 'Product & Full-Stack',
    bestFor: 'YC Startups, Scaleups, Modern Engineering Teams',
    description: 'Modern clean sans-serif with crisp indigo accents. Highlights live projects, GitHub repos, and end-to-end product delivery.',
    atsPassRate: '98.9%',
    badge: 'Modern'
  },
  {
    id: 'corporate',
    name: '💼 Corporate, Consulting & Banking',
    category: 'Finance & Strategy',
    bestFor: 'McKinsey, Goldman Sachs, Bain, Deloitte, Fortune 500',
    description: 'Prestigious Wall Street serif typography (Merriweather/Times). Emphasizes financial models, EBITDA, and leadership.',
    atsPassRate: '99.2%',
    badge: 'Executive'
  },
  {
    id: 'executive',
    name: '👔 Executive & Senior Leadership',
    category: 'Management & Directors',
    bestFor: 'VPs, Engineering Managers, Directors, C-Level',
    description: 'Executive Profile focus, core competencies taxonomy, cross-functional organizational scale, and strategic outcomes.',
    atsPassRate: '98.7%',
    badge: 'Leadership'
  },
  {
    id: 'datascience',
    name: '🔬 AI, Data Science & Research',
    category: 'Machine Learning & Quant',
    bestFor: 'AI Engineers, Data Scientists, Quant Researchers',
    description: 'Specialized for ML pipelines, PyTorch/TensorFlow models, quantitative analysis, data structures, and patents.',
    atsPassRate: '99.1%',
    badge: 'Technical'
  },
  {
    id: 'newgrad',
    name: '🎓 Graduate & Career Switcher',
    category: 'Entry-Level & Students',
    bestFor: 'College Grads, Bootcamp Students, Interns, Juniors',
    description: 'Education and capstone projects placed first to maximize credentials when full-time industry tenure is under 2 years.',
    atsPassRate: '98.8%',
    badge: 'Entry-Level'
  },
  {
    id: 'healthcare',
    name: '🩺 Healthcare, Biotech & Clinical',
    category: 'Medical & Pharmaceutical',
    bestFor: 'Nurses, Clinical Researchers, Biotech, Physicians',
    description: 'Strict clinical compliance, highlighting licensures, clinical protocols (HIPAA/FDA/GCP), and patient care metrics.',
    atsPassRate: '99.0%',
    badge: 'Healthcare'
  },
  {
    id: 'federal',
    name: '⚖️ Federal, Defense & Governance',
    category: 'Government & Aerospace',
    bestFor: 'USAJOBS, Defense (Lockheed, Raytheon), Legal, Cleared',
    description: 'Formal chronological hierarchy with explicit Security Clearance, compliance certifications, and regulatory oversight.',
    atsPassRate: '99.3%',
    badge: 'Federal'
  }
];

export default function TemplateGalleryModal({ isOpen, onClose, selectedTemplate, onSelectTemplate }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Choose ATS-Certified Format</h2>
              <p className="text-xs text-slate-400">
                All 8 templates strictly adhere to single-column, bot-safe parsing standards (Greenhouse, Workday, Taleo, Lever).
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEMPLATES_CATALOG.map((tmpl) => {
            const isSelected = selectedTemplate === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => {
                  onSelectTemplate(tmpl.id);
                  onClose();
                }}
                className={`cursor-pointer rounded-xl p-4.5 border text-left transition-all relative flex flex-col justify-between group ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-600/10 ring-2 ring-indigo-500/30'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {tmpl.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {tmpl.atsPassRate} Bot Pass
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {tmpl.name}
                  </h3>
                  <div className="text-[11px] text-indigo-400 font-medium mt-0.5">
                    Target: {tmpl.bestFor}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                    100% Machine-Readable
                  </span>
                  <button
                    className={`text-xs px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-300 group-hover:bg-indigo-600 group-hover:text-white'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Active Format</span>
                      </>
                    ) : (
                      <span>Apply Format</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Guaranteed zero graphics, zero text-box traps, and zero table parsing breaks.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
