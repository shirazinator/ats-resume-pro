import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, CheckCircle, ShieldCheck } from 'lucide-react';
import TechFaangTemplate from './templates/TechFaangTemplate';
import StartupModernTemplate from './templates/StartupModernTemplate';
import CorporateFinanceTemplate from './templates/CorporateFinanceTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';

export default function ResumePreview({ resume, selectedTemplate }) {
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
      case 'faang':
      default:
        return <TechFaangTemplate resume={resume} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Top Bar Controls */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px] bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ATS Certified Format (Single-Column)</span>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 rounded-lg p-1 border border-slate-700">
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
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-colors ml-1"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Preview Container with zoom scale */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 flex justify-center bg-slate-950/90">
        <div
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
          className="transition-transform duration-150 w-full max-w-[850px]"
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
