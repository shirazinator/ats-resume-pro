import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, ShieldCheck, Layout, Sparkles } from 'lucide-react';
import TechFaangTemplate from './templates/TechFaangTemplate';
import StartupModernTemplate from './templates/StartupModernTemplate';
import CorporateFinanceTemplate from './templates/CorporateFinanceTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import DataScienceTemplate from './templates/DataScienceTemplate';
import NewGradTemplate from './templates/NewGradTemplate';
import HealthcareBiotechTemplate from './templates/HealthcareBiotechTemplate';
import FederalLegalTemplate from './templates/FederalLegalTemplate';

export default function ResumePreview({ resume, selectedTemplate, onChangeTemplate, onOpenTemplateGallery }) {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.65));
  const handleResetZoom = () => setZoom(1);

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'startup':
        return <StartupModernTemplate resume={resume} />;
      case 'corporate':
        return <CorporateFinanceTemplate resume={resume} />;
      case 'executive':
        return <ExecutiveTemplate resume={resume} />;
      case 'datascience':
        return <DataScienceTemplate resume={resume} />;
      case 'newgrad':
        return <NewGradTemplate resume={resume} />;
      case 'healthcare':
        return <HealthcareBiotechTemplate resume={resume} />;
      case 'federal':
        return <FederalLegalTemplate resume={resume} />;
      case 'faang':
      default:
        return <TechFaangTemplate resume={resume} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Bar Controls */}
      <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2 flex-wrap">
        {/* Quick Format Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <FormatPill
            active={selectedTemplate === 'faang'}
            onClick={() => onChangeTemplate('faang')}
            label="🏢 FAANG"
          />
          <FormatPill
            active={selectedTemplate === 'startup'}
            onClick={() => onChangeTemplate('startup')}
            label="🚀 Startup"
          />
          <FormatPill
            active={selectedTemplate === 'corporate'}
            onClick={() => onChangeTemplate('corporate')}
            label="💼 Wall St"
          />
          <FormatPill
            active={selectedTemplate === 'datascience'}
            onClick={() => onChangeTemplate('datascience')}
            label="🔬 AI / ML"
          />
          <FormatPill
            active={selectedTemplate === 'newgrad'}
            onClick={() => onChangeTemplate('newgrad')}
            label="🎓 New Grad"
          />
          <button
            onClick={onOpenTemplateGallery}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 font-bold border border-indigo-500/30 whitespace-nowrap flex items-center gap-1 transition-all"
          >
            <Layout className="w-3 h-3" />
            <span>All 8 Formats</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-800/80 rounded-lg p-1 border border-slate-700 shrink-0">
          <button
            onClick={handleZoomOut}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-slate-300 px-1.5 min-w-[3rem] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-colors ml-0.5"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Preview Container with zoom scale */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 flex justify-center bg-slate-950/90 relative">
        <div
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
          className="transition-transform duration-150 w-full max-w-[850px] mb-8"
        >
          {/* Printable Element with ID for media print */}
          <div
            id="printable-resume"
            className="bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden"
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}

function FormatPill({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all ${
        active
          ? 'bg-indigo-600 text-white shadow-sm'
          : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700/80 border border-slate-700/60'
      }`}
    >
      {label}
    </button>
  );
}
