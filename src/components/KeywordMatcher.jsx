import React from 'react';
import { Target, Check, Plus, AlertCircle, Sparkles } from 'lucide-react';

export default function KeywordMatcher({
  matchedKeywords = [],
  missingKeywords = [],
  onAddKeywordToSkills,
  onOpenJobDescModal,
  hasJobDescription
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">Target Job Keywords</h3>
        </div>
        <button
          onClick={onOpenJobDescModal}
          className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 font-medium border border-indigo-500/30 transition-colors flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {hasJobDescription ? "Change Target JD" : "Paste Target Job Description"}
        </button>
      </div>

      {!hasJobDescription ? (
        <div className="p-4 rounded-lg bg-slate-800/60 border border-dashed border-slate-700 text-center">
          <p className="text-xs text-slate-300">
            No target job description provided yet.
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Paste a job description or choose a demo to unlock exact ATS keyword matching and comparison!
          </p>
          <button
            onClick={onOpenJobDescModal}
            className="mt-3 text-xs px-3.5 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
          >
            Target a Job Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Matched Keywords */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                Matched in Resume ({matchedKeywords.length})
              </span>
            </div>
            {matchedKeywords.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No direct keyword matches yet.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {matchedKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium"
                  >
                    <Check className="w-3 h-3 text-emerald-400" />
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Missing Keywords */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-amber-400">
                <AlertCircle className="w-3.5 h-3.5" />
                Missing High-Priority Keywords ({missingKeywords.length})
              </span>
              <span className="text-[11px] text-slate-500">Click "+" to inject into Skills</span>
            </div>
            {missingKeywords.length === 0 ? (
              <p className="text-xs text-emerald-400 font-medium">
                🎯 Outstanding! 100% of target keywords matched!
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
                {missingKeywords.map((kw, i) => (
                  <button
                    key={i}
                    onClick={() => onAddKeywordToSkills(kw)}
                    title={`Click to add "${kw}" to your Skills section`}
                    className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-all group font-medium"
                  >
                    <Plus className="w-3 h-3 text-amber-400 group-hover:scale-125 transition-transform" />
                    {kw}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
