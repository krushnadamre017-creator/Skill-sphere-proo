import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, TrendingUp, AlertCircle, CheckCircle2, ChevronRight, Loader2, Plus, X } from 'lucide-react';
import { analyzeSkillGap, getRadarTrends } from '../services/api';

const DEFAULT_POPULAR_SKILLS = ['Python', 'FastAPI', 'React', 'TypeScript', 'Docker', 'Gemini API', 'PostgreSQL', 'Tailwind CSS'];

export default function AIRadar() {
  const [skills, setSkills] = useState(['Python', 'FastAPI', 'React']);
  const [skillInput, setSkillInput] = useState('');
  const [targetRole, setTargetRole] = useState('AI Application Engineer');
  const [experienceLevel, setExperienceLevel] = useState('Intermediate');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    getRadarTrends().then((res) => {
      if (res && res.hot_skills) {
        setTrends(res.hot_skills);
      }
    });
    // Trigger initial demo analysis
    handleAnalyze();
  }, []);

  const addSkill = (skillToAdd) => {
    const trimmed = skillToAdd.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const data = await analyzeSkillGap(skills, targetRole, experienceLevel);
      setAnalysis(data);
    } catch (err) {
      console.error('Failed to analyze skills:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-teal-400 font-semibold text-xs tracking-wider uppercase">
          <Compass className="w-4 h-4" />
          <span>Intelligent Market Radar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
          AI Skill Radar & Gap Intelligence
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          Enter your current technical toolkit and target ambition. Our Gemini 1.5 pipeline maps your profile against real-time market trends.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Input Form & Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              Configure Profile
            </h2>

            {/* Target Role Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                Target Role
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
              >
                <option value="AI Application Engineer">AI Application Engineer</option>
                <option value="Full-Stack Developer (AI Ecosystem)">Full-Stack Developer (AI Ecosystem)</option>
                <option value="Backend Microservices Specialist">Backend Microservices Specialist</option>
                <option value="Machine Learning / MLOps Fellow">Machine Learning / MLOps Fellow</option>
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                Current Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Student', 'Intermediate', 'Senior'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setExperienceLevel(lvl)}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      experienceLevel === lvl
                        ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Skills Tag Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                Your Current Skills ({skills.length})
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="e.g. Docker, GraphQL"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(skillInput);
                    }
                  }}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={() => addSkill(skillInput)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-teal-400 rounded-xl border border-slate-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-rose-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Suggestions */}
              <div className="mt-3 pt-3 border-t border-slate-800/80">
                <p className="text-[11px] text-slate-400 mb-2">Quick add suggestions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {DEFAULT_POPULAR_SKILLS.filter((s) => !skills.includes(s)).slice(0, 5).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => addSkill(s)}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Run Analysis Button */}
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Consulting Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Radar Analysis</span>
                </>
              )}
            </button>
          </div>

          {/* Market Trends Card */}
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Surging Tech Trends
            </h3>
            <div className="space-y-2">
              {trends.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/50 last:border-0">
                  <div>
                    <span className="font-medium text-slate-200">{item.skill}</span>
                    <span className="block text-[10px] text-slate-500">{item.category}</span>
                  </div>
                  <span className="font-mono text-teal-400 font-semibold">{item.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Analysis Output */}
        <div className="lg:col-span-2 space-y-6">
          {analysis ? (
            <>
              {/* Score & Summary Card */}
              <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-semibold uppercase text-teal-400 tracking-wider">
                      Target Fit Assessment
                    </span>
                    <h2 className="text-2xl font-bold text-white mt-1">{analysis.target_role}</h2>
                    <div className="inline-flex items-center gap-2 mt-2 px-2.5 py-1 rounded-md bg-indigo-950/70 border border-indigo-700/40 text-xs text-indigo-300">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                      <span>Demand: {analysis.market_velocity}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <div className="text-right">
                      <div className="text-3xl font-extrabold text-teal-400">{analysis.match_score}%</div>
                      <div className="text-[11px] text-slate-400 font-medium">Readiness Match</div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-teal-500/30 border-t-teal-400 flex items-center justify-center font-bold text-xs text-teal-300">
                      Fit
                    </div>
                  </div>
                </div>

                {/* Gemini AI Strategic Insights */}
                <div className="mt-5 p-4 rounded-xl bg-teal-950/20 border border-teal-500/20 text-xs sm:text-sm text-slate-200 leading-relaxed flex gap-3">
                  <Sparkles className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-teal-300 block mb-1">Gemini AI Strategic Insights</span>
                    {analysis.ai_insights}
                  </div>
                </div>
              </div>

              {/* Identified Skill Gaps */}
              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                  Identified Skill Gaps & Recommended Actions
                </h3>

                <div className="space-y-3">
                  {analysis.skill_gaps.map((gap, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{gap.skill}</span>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                            gap.importance === 'High'
                              ? 'bg-rose-950/80 text-rose-300 border border-rose-800/40'
                              : 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                          }`}>
                            {gap.importance} Priority
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{gap.recommended_action}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] text-slate-500 block">Current Level</span>
                        <span className="text-xs font-semibold text-slate-300">{gap.current_level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3-Week Sprints */}
              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                  AI Suggested 3-Week Learning Sprints
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {analysis.learning_sprints.map((sprint, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-mono font-bold text-teal-400 block mb-1">
                          Phase 0{idx + 1}
                        </span>
                        <p className="text-xs text-slate-300 leading-snug">{sprint}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="glass-panel rounded-2xl p-12 text-center text-slate-400">
              <Compass className="w-10 h-10 mx-auto text-slate-600 mb-3 animate-pulse" />
              <p>Configure your target role and skills on the left to generate the radar analysis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
