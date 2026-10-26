import React, { useState, useEffect } from 'react';
import { Briefcase, Sparkles, Building, MapPin, DollarSign, HelpCircle, Check, Loader2, ArrowUpRight, Copy } from 'lucide-react';
import { matchJobs } from '../services/api';

export default function Career() {
  const [skills, setSkills] = useState(['Python', 'FastAPI', 'React', 'Git']);
  const [targetRole, setTargetRole] = useState('AI Application Engineer');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    handleMatch();
  }, []);

  const handleMatch = async () => {
    setLoading(true);
    try {
      const res = await matchJobs(skills, targetRole);
      setData(res);
    } catch (err) {
      console.error('Job match error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyInterviewQuestion = () => {
    if (data?.tailored_interview_question) {
      navigator.clipboard.writeText(data.tailored_interview_question);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs tracking-wider uppercase">
          <Briefcase className="w-4 h-4" />
          <span>Talent & Opportunity Matching</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
          Career Accelerator & Interview Prep
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          Connect your stack with high-impact AI developer roles. Practice AI-generated technical interview questions crafted for your exact gap areas.
        </p>
      </div>

      {/* Top Readiness & Question Row */}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Readiness Score Card */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between border-t-2 border-t-cyan-500">
            <div>
              <span className="text-xs font-semibold uppercase text-cyan-400 tracking-wider">
                Overall Readiness
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">Career Readiness Index</h2>
              <p className="text-xs text-slate-400 mt-2">
                Based on required skills across matched opportunities.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-4xl font-extrabold text-cyan-400">
                {data.career_readiness_score}%
              </div>
              <div className="text-right text-xs text-slate-400">
                <span className="text-teal-400 font-bold block">Interview Ready</span>
                For Junior / Mid-Level
              </div>
            </div>
          </div>

          {/* Gemini AI Tailored Interview Question */}
          <div className="lg:col-span-2 glass-panel rounded-2xl p-6 space-y-3 border-t-2 border-t-indigo-500 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>Gemini 1.5 Tailored Technical Question</span>
              </div>
              <button
                type="button"
                onClick={copyInterviewQuestion}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <p className="text-sm text-slate-200 font-medium leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800 italic">
              "{data.tailored_interview_question}"
            </p>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tip: Practice explaining your trade-offs, async flow handling, and failure recovery.</span>
            </div>
          </div>
        </div>
      )}

      {/* Matched Roles List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-teal-400" />
            Curated High-Fit Positions ({data?.top_matches?.length || 0})
          </h2>
          <button
            type="button"
            onClick={handleMatch}
            disabled={loading}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 transition-colors"
          >
            {loading ? 'Refreshing...' : 'Refresh Matches'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.top_matches.map((job) => (
            <div
              key={job.id}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-teal-400 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      <span>{job.company}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-950/80 border border-teal-500/40 text-teal-300">
                    {job.match_percentage}% Match
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{job.location}</span>
                  </div>
                  {job.salary_range && (
                    <div className="flex items-center gap-1 text-teal-400 font-mono">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>{job.salary_range}</span>
                    </div>
                  )}
                </div>

                {/* Skills Chips */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase">Required Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {job.required_skills.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {job.missing_skills.length > 0 && (
                    <div className="pt-1">
                      <span className="text-[10px] text-amber-400 font-semibold uppercase block mb-1">
                        Skill to gain:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {job.missing_skills.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] px-2 py-0.5 rounded bg-amber-950/70 border border-amber-800/40 text-amber-300"
                          >
                            + {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Applying or saving ${job.title} at ${job.company}!`)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 border border-slate-700"
              >
                <span>Quick Apply / Save</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
