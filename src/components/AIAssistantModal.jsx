import React, { useState } from 'react';
import { X, Sparkles, Key, Bot, Check, AlertCircle } from 'lucide-react';

export default function AIAssistantModal({ isOpen, onClose, resume, jobDescription, onApplyAIUpdate }) {
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [promptType, setPromptType] = useState('summary');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSaveKey = () => {
    localStorage.setItem('gemini_api_key', apiKey.trim());
  };

  const handleRunAI = async () => {
    setIsLoading(true);
    setError('');
    setAiOutput('');

    try {
      const activeKey = apiKey.trim() || localStorage.getItem('gemini_api_key');
      if (!activeKey) {
        throw new Error("Please enter a free Gemini API key, or use the built-in STAR optimizer on the editor tab.");
      }

      let systemPrompt = "";
      if (promptType === 'summary') {
        systemPrompt = `You are an elite Fortune 500 Executive Resume Writer and ATS Algorithm Specialist.
Write a punchy, 3-sentence, high-impact ATS-optimized professional summary for:
Candidate Title: ${resume.personalInfo.jobTitle}
Skills: ${JSON.stringify(resume.skills)}
Target Job: ${jobDescription || 'Senior Industry Specialist'}

Rules:
1. Include strong action verbs and high-value keywords.
2. Highlight scale, impact, and measurable business outcomes.
3. Keep it strictly ATS-friendly without fluff.`;
      } else if (promptType === 'bullets') {
        systemPrompt = `You are an elite Tech/Executive Resume Writer and ATS Specialist.
Rewrite the following work experience bullets into the Google XYZ / STAR formula ("Accomplished [X] measured by [Y] by doing [Z]"):
Current bullets:
${JSON.stringify(resume.experience?.map(e => e.bullets).flat().slice(0, 5))}
Target Job Context: ${jobDescription || 'Senior Specialist'}

Return 4-5 polished, powerful bullet points with active verbs, realistic metrics/KPIs, and target keywords.`;
      } else {
        systemPrompt = customPrompt;
      }

      // Call Google Gemini 1.5 Flash API (free tier)
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: systemPrompt }]
          }]
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || `API error (${res.status})`);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
      setAiOutput(text);
      handleSaveKey();
    } catch (err) {
      setError(err.message || "Failed to contact Gemini API. Check your API key and connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToResume = () => {
    if (!aiOutput) return;

    if (promptType === 'summary') {
      onApplyAIUpdate({ summary: aiOutput.replace(/```[a-z]*\n?/g, '').trim() });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI ATS Resume Enhancer</h2>
              <p className="text-xs text-slate-400">Powered by Google Gemini Flash (100% Free Tier)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {/* API Key Box */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                Google Gemini API Key (Free):
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:underline text-[11px]"
              >
                Get a free key in 30 seconds →
              </a>
            </div>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste your AI Studio Gemini API key..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[11px] text-slate-500">
              Note: Key is stored locally in your browser only. (You don't need a key to use the built-in STAR optimizer on the Editor tab!)
            </p>
          </div>

          {/* Prompt Type selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Choose AI Task:</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setPromptType('summary')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  promptType === 'summary'
                    ? 'border-emerald-500 bg-emerald-500/10 text-white font-semibold'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                ✨ Generate Executive Summary
                <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                  Tailored to match target job keywords
                </span>
              </button>
              <button
                onClick={() => setPromptType('bullets')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  promptType === 'bullets'
                    ? 'border-emerald-500 bg-emerald-500/10 text-white font-semibold'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                🚀 Polish Bullets with XYZ Formula
                <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                  Transforms duties into quantified achievements
                </span>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {aiOutput && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>AI Generated Output:</span>
                {promptType === 'summary' && (
                  <button
                    onClick={handleApplyToResume}
                    className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold"
                  >
                    Apply to Summary
                  </button>
                )}
              </div>
              <div className="text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                {aiOutput}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex justify-end gap-2 bg-slate-950/40">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800"
          >
            Close
          </button>
          <button
            onClick={handleRunAI}
            disabled={isLoading}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Generating with Gemini...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate with AI</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
