import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, AlertTriangle, XCircle, Sparkles, TrendingUp, FileText, Target, ShieldCheck } from 'lucide-react';

export default function ScoreDashboard({ auditResult, onFixSection }) {
  const { totalScore, categoryScores, metricsSummary, checks, weakBulletExamples } = auditResult;
  const previousScoreRef = useRef(totalScore);

  useEffect(() => {
    if (totalScore >= 85 && previousScoreRef.current < 85) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
    previousScoreRef.current = totalScore;
  }, [totalScore]);

  // Color logic for score
  let scoreColor = "text-rose-500 border-rose-500";
  let scoreBg = "bg-rose-500/10";
  let scoreBadge = "Needs Optimization";
  if (totalScore >= 80) {
    scoreColor = "text-emerald-400 border-emerald-400";
    scoreBg = "bg-emerald-500/10";
    scoreBadge = "ATS Interview Ready";
  } else if (totalScore >= 60) {
    scoreColor = "text-amber-400 border-amber-400";
    scoreBg = "bg-amber-500/10";
    scoreBadge = "Moderate ATS Pass Rate";
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-6">
      {/* Top Banner: Score Gauge */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className={`relative flex items-center justify-center w-20 h-20 rounded-full border-4 ${scoreColor} ${scoreBg} shadow-inner shrink-0`}>
            <span className="text-2xl font-black tracking-tight text-white">{totalScore}</span>
            <span className="absolute -bottom-1 text-[9px] font-bold tracking-wider text-slate-400">/100</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">Overall ATS Score</h3>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${scoreBg} ${scoreColor.split(' ')[0]}`}>
                {scoreBadge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Evaluated against enterprise ATS parsing bots (Workday, Greenhouse, Taleo) and recruiter screeners.
            </p>
          </div>
        </div>

        {/* Quick Stats Pills */}
        <div className="grid grid-cols-3 gap-2 w-full sm:w-auto text-center">
          <div className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60">
            <div className="text-xs text-slate-400 font-medium">Action Verbs</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">
              {metricsSummary.bulletsWithActionVerbs} / {metricsSummary.totalBullets}
            </div>
          </div>
          <div className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60">
            <div className="text-xs text-slate-400 font-medium">Metrics / ROI</div>
            <div className="text-sm font-bold text-indigo-400 mt-0.5">
              {metricsSummary.bulletsWithMetrics} / {metricsSummary.totalBullets}
            </div>
          </div>
          <div className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60">
            <div className="text-xs text-slate-400 font-medium">Word Count</div>
            <div className="text-sm font-bold text-sky-400 mt-0.5">
              {metricsSummary.wordCount}
            </div>
          </div>
        </div>
      </div>

      {/* Category Progress Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <CategoryBar
          icon={<Target className="w-4 h-4 text-emerald-400" />}
          label="Keyword Match (Target JD)"
          score={categoryScores.keywords.score}
          max={categoryScores.keywords.max}
          percentage={categoryScores.keywords.percentage}
          color="bg-emerald-500"
        />
        <CategoryBar
          icon={<ShieldCheck className="w-4 h-4 text-blue-400" />}
          label="ATS Formatting & Structure"
          score={categoryScores.formatting.score}
          max={categoryScores.formatting.max}
          percentage={categoryScores.formatting.percentage}
          color="bg-blue-500"
        />
        <CategoryBar
          icon={<TrendingUp className="w-4 h-4 text-indigo-400" />}
          label="Impact & STAR Formula"
          score={categoryScores.impact.score}
          max={categoryScores.impact.max}
          percentage={categoryScores.impact.percentage}
          color="bg-indigo-500"
        />
        <CategoryBar
          icon={<FileText className="w-4 h-4 text-purple-400" />}
          label="Density & Readability"
          score={categoryScores.readability.score}
          max={categoryScores.readability.max}
          percentage={categoryScores.readability.percentage}
          color="bg-purple-500"
        />
      </div>

      {/* Diagnostics & Red Flag Alerts */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          <span>ATS Compliance Audit Checklist</span>
          <span className="text-slate-500">{checks.filter(c => c.status === 'pass').length} / {checks.length} Passed</span>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {checks.map((check, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 p-2 rounded-lg text-xs border ${
                check.status === 'pass'
                  ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-300'
                  : 'bg-amber-500/10 border-amber-500/20 text-slate-200'
              }`}
            >
              {check.status === 'pass' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="font-semibold text-white">{check.name}</div>
                <div className="text-slate-400 mt-0.5">{check.tip}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryBar({ icon, label, score, max, percentage, color }) {
  return (
    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-800">
      <div className="flex items-center justify-between text-xs mb-1.5">
        <div className="flex items-center gap-1.5 font-medium text-slate-300">
          {icon}
          <span>{label}</span>
        </div>
        <span className="font-bold text-white">{score} <span className="text-slate-500 font-normal">/ {max}</span></span>
      </div>
      <div className="w-full h-2 bg-slate-700/60 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
