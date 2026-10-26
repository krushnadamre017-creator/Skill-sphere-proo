import React, { useState, useEffect } from 'react';
import { CheckSquare, Flame, Clock, Award, Plus, Calendar, Check, Circle, Loader2 } from 'lucide-react';
import { getTrackerSummary, logLearningActivity, toggleMilestoneStatus } from '../services/api';

export default function Tracker() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [skill, setSkill] = useState('');
  const [hours, setHours] = useState('1.5');
  const [category, setCategory] = useState('Backend');
  const [notes, setNotes] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const loadData = async () => {
    try {
      const data = await getTrackerSummary();
      setSummary(data);
    } catch (err) {
      console.error('Failed to load tracker summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogSubmit = async (e) => {
    e.preventDefault();
    if (!skill.trim() || !hours) return;
    setSubmitting(true);

    try {
      const res = await logLearningActivity({
        skill: skill.trim(),
        hours_spent: parseFloat(hours),
        category,
        notes: notes.trim(),
      });

      // Update state locally
      if (res && res.entry) {
        setSummary((prev) => ({
          ...prev,
          daily_streak: res.current_streak || prev.daily_streak + 1,
          total_hours_this_week: parseFloat((prev.total_hours_this_week + parseFloat(hours)).toFixed(1)),
          recent_logs: [res.entry, ...prev.recent_logs],
        }));
      }

      setSkill('');
      setNotes('');
      setToastMessage('Session logged successfully!');
      setTimeout(() => setToastMessage(''), 3000);
    } catch (err) {
      console.error('Log error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleMilestone = async (id) => {
    // Optimistic UI toggle
    setSummary((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) =>
        m.id === id ? { ...m, completed: !m.completed } : m
      ),
    }));

    try {
      await toggleMilestoneStatus(id);
    } catch (err) {
      console.error('Toggle error:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wider uppercase">
          <CheckSquare className="w-4 h-4" />
          <span>Consistency Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
          Daily Learning & Project Tracker
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          Build unbreakable engineering habits. Log your hours, complete project milestones, and keep your daily streak alive.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 flex items-center gap-5 border-l-4 border-l-amber-500">
          <div className="w-14 h-14 rounded-xl bg-amber-950/60 border border-amber-600/30 flex items-center justify-center text-amber-400">
            <Flame className="w-7 h-7 fill-amber-400 animate-bounce" />
          </div>
          <div>
            <span className="text-3xl font-extrabold text-white">{summary?.daily_streak || 0}</span>
            <span className="text-xs text-amber-300 font-bold ml-1.5 uppercase">Days Streak</span>
            <p className="text-xs text-slate-400 mt-1">Keep learning every 24 hours</p>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex items-center gap-5 border-l-4 border-l-teal-500">
          <div className="w-14 h-14 rounded-xl bg-teal-950/60 border border-teal-600/30 flex items-center justify-center text-teal-400">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <span className="text-3xl font-extrabold text-white">{summary?.total_hours_this_week || 0}</span>
            <span className="text-xs text-teal-300 font-bold ml-1.5 uppercase">Hours This Week</span>
            <p className="text-xs text-slate-400 mt-1">Target: 10 hrs / week</p>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex items-center gap-5 border-l-4 border-l-indigo-500">
          <div className="w-14 h-14 rounded-xl bg-indigo-950/60 border border-indigo-600/30 flex items-center justify-center text-indigo-400">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <span className="text-3xl font-extrabold text-white">{summary?.total_skills_tracked || 0}</span>
            <span className="text-xs text-indigo-300 font-bold ml-1.5 uppercase">Skills Logged</span>
            <p className="text-xs text-slate-400 mt-1">Active areas of mastery</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Log Session Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-teal-400" />
              Log Learning Session
            </h2>

            {toastMessage && (
              <div className="p-3 rounded-xl bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{toastMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Skill / Topic
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FastAPI Routes, Tailwind Grid"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Hours Spent
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="12"
                    required
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                    <option value="AI/ML">AI / ML</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Project">Project Sprint</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Session Notes (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="What breakthroughs or blockers did you encounter?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Save Learning Entry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Milestones & Recent Logs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Milestones */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-teal-400" />
                Hackathon Project Milestones
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                {summary?.milestones.filter((m) => m.completed).length} / {summary?.milestones.length} Completed
              </span>
            </div>

            <div className="space-y-2.5">
              {summary?.milestones.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleToggleMilestone(m.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                    m.completed
                      ? 'bg-slate-900/40 border-slate-800 text-slate-400 line-through'
                      : 'bg-slate-900/80 border-slate-700/80 hover:border-teal-500/50 text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                        m.completed ? 'bg-teal-500 text-slate-950' : 'border border-slate-600 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                    <span className="text-sm font-medium">{m.title}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {m.category}
                    </span>
                    <span className="text-xs font-mono text-teal-400 font-semibold">{m.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Logs Feed */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              Recent Activity Logs
            </h3>

            <div className="space-y-3">
              {summary?.recent_logs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{log.skill}</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/40">
                        {log.category}
                      </span>
                    </div>
                    {log.notes && <p className="text-xs text-slate-400">{log.notes}</p>}
                  </div>

                  <div className="flex items-center sm:flex-col sm:items-end justify-between text-xs">
                    <span className="font-mono text-teal-400 font-semibold">{log.hours_spent} hrs</span>
                    <span className="text-[11px] text-slate-500">{log.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
