import React, { useRef } from 'react';
import {
  FileText, Download, Printer, Upload, Sparkles,
  ChevronDown, Layout, Check, ShieldCheck
} from 'lucide-react';
import { extractTextFromFile, parseResumeTextToStructure } from '../utils/fileParsers';
import { downloadResumeAsDocx } from '../utils/exportDocx';

export default function Navbar({
  selectedTemplate,
  onChangeTemplate,
  onLoadDemo,
  onUploadResume,
  onOpenAIModal,
  resume
}) {
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await extractTextFromFile(file);
      const structuredResume = parseResumeTextToStructure(text);
      onUploadResume(structuredResume);
    } catch (err) {
      alert("Error parsing file: " + err.message);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const handleDownloadDocx = () => {
    downloadResumeAsDocx(resume, `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_ATS_Resume.docx`);
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md bg-slate-900/95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-[3.75rem] py-2 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-white whitespace-nowrap">
              ATS Resume Pro
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
              100% FREE
            </span>
          </div>
        </div>

        {/* Template & Action Controls */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
          {/* Format / Company Selector */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors whitespace-nowrap shrink-0">
              <Layout className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="hidden xl:inline text-slate-400 font-normal">Format:</span>
              <span className="text-white font-bold">
                {selectedTemplate === 'faang' && '🏢 FAANG Tech'}
                {selectedTemplate === 'startup' && '🚀 Startup'}
                {selectedTemplate === 'corporate' && '💼 Wall St'}
                {selectedTemplate === 'executive' && '👔 Executive'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>
            <div className="absolute right-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 hidden group-hover:block hover:block z-50">
              <div className="text-[10px] uppercase font-bold text-slate-500 px-2 py-1">
                Select ATS Target Format
              </div>
              <TemplateOption
                active={selectedTemplate === 'faang'}
                onClick={() => onChangeTemplate('faang')}
                title="🏢 FAANG & Big Tech"
                subtitle="Google, Meta, Apple (Stanford Ivy style)"
              />
              <TemplateOption
                active={selectedTemplate === 'startup'}
                onClick={() => onChangeTemplate('startup')}
                title="🚀 High-Growth Tech & Startup"
                subtitle="YC startups, scaleups, modern stack"
              />
              <TemplateOption
                active={selectedTemplate === 'corporate'}
                onClick={() => onChangeTemplate('corporate')}
                title="💼 Corporate, Consulting & Banking"
                subtitle="McKinsey, Goldman, Wall St serif"
              />
              <TemplateOption
                active={selectedTemplate === 'executive'}
                onClick={() => onChangeTemplate('executive')}
                title="👔 Senior Executive & Leadership"
                subtitle="Directors, VPs, Management"
              />
            </div>
          </div>

          {/* Load Sample Demos */}
          <div className="relative group">
            <button className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700/80 flex items-center gap-1 whitespace-nowrap shrink-0">
              <span>Demos</span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>
            <div className="absolute right-0 mt-1 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 hidden group-hover:block hover:block z-50">
              <button
                onClick={() => onLoadDemo('software_engineer')}
                className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-slate-800 text-slate-200"
              >
                💻 Load Tech/SWE Demo
              </button>
              <button
                onClick={() => onLoadDemo('finance_consultant')}
                className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-slate-800 text-slate-200"
              >
                💼 Load Consultant Demo
              </button>
              <button
                onClick={() => onLoadDemo('empty')}
                className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-slate-800 text-rose-400 border-t border-slate-800 mt-1"
              >
                Clear / Start Blank
              </button>
            </div>
          </div>

          {/* Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.docx,.txt"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            title="Upload PDF, Word DOCX or TXT resume"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="hidden md:inline">Upload</span>
          </button>

          {/* AI Assistant Button */}
          <button
            onClick={onOpenAIModal}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">AI Assist</span>
          </button>

          {/* Export Actions */}
          <div className="flex items-center gap-1.5 pl-1 border-l border-slate-800 shrink-0">
            <button
              onClick={handlePrintPDF}
              className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all whitespace-nowrap shrink-0"
              title="Prints 100% clean, parseable ATS PDF"
            >
              <Printer className="w-3.5 h-3.5 shrink-0" />
              <span>PDF</span>
            </button>
            <button
              onClick={handleDownloadDocx}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              title="Download editable Microsoft Word .docx"
            >
              <Download className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Word</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function TemplateOption({ active, onClick, title, subtitle }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
        active
          ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-[10px] text-slate-500 font-normal">{subtitle}</div>
      </div>
      {active && <Check className="w-3.5 h-3.5 text-indigo-400" />}
    </button>
  );
}
