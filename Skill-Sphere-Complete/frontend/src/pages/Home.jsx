import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, CheckSquare, Briefcase, Sparkles, ArrowRight, Flame, Target, Rocket, ShieldCheck } from 'lucide-react';
import { getTrackerSummary } from '../services/api';

export default function Home() {
  const [stats, setStats] = useState({ streak: 5, hours: 7.0, skills: 3 });

  useEffect(() => {
    getTrackerSummary().then((data) => {
      if (data) {
        setStats({
          streak: data.daily_streak || 5,
          hours: data.total_hours_this_week || 7.0,
          skills: data.total_skills_tracked || 3,
        });
      }
    });
  }, []);

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto px-4 pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-950/60 border border-teal-500/40 text-teal-300 text-xs font-semibold mb-6 shadow-sm shadow-teal-500/20">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>AI-Powered Full-Stack Career Ecosystem</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Level Up Your Skills. <br />
          <span className="text-gradient">Accelerate Your Career.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Skill Sphere combines daily habit tracking, Gemini-powered skill gap intelligence, and career opportunity matching to help developers go from learner to hired.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/ai-radar"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-all shadow-lg shadow-teal-500/25 hover:scale-105"
          >
            <Compass className="w-5 h-5" />
            Launch AI Radar
          </Link>

          <Link
            to="/tracker"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition-all hover:scale-105"
          >
            <CheckSquare className="w-5 h-5 text-teal-400" />
            Track Daily Learning
          </Link>
        </div>

        {/* Live Metrics Row */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto p-4 rounded-2xl glass-panel">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-amber-400 text-xl font-bold">
              <Flame className="w-5 h-5 fill-amber-400" />
              <span>{stats.streak} Days</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Active Streak</p>
          </div>
          <div className="text-center border-x border-slate-800">
            <div className="text-xl font-bold text-teal-400">
              {stats.hours} hrs
            </div>
            <p className="text-xs text-slate-400 mt-1">Logged This Week</p>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-indigo-400">
              {stats.skills} Active
            </div>
            <p className="text-xs text-slate-400 mt-1">Skills Tracked</p>
          </div>
        </div>
      </section>

      {/* Feature Pillar Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Three Pillars of Growth</h2>
          <p className="text-slate-400 text-sm mt-2">Everything you need to master in-demand tech and land your dream role.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: AI Radar */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between border-t-2 border-t-teal-500">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-950/80 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Skill Radar</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Analyze your current tech stack against market trends. Powered by Gemini 1.5 to pinpoint missing skills and generate custom 3-week sprint roadmaps.
              </p>
            </div>
            <Link
              to="/ai-radar"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400 hover:text-teal-300 mt-4 group"
            >
              Analyze Your Stack <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 2: Daily Tracker */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between border-t-2 border-t-indigo-500">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-700/30 flex items-center justify-center text-indigo-400 mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Daily Learning Tracker</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Maintain consistency with streak trackers, time logs, and project milestone checklists. Never lose momentum on your hackathon projects.
              </p>
            </div>
            <Link
              to="/tracker"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 mt-4 group"
            >
              Log Daily Hours <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 3: Career Accelerator */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between border-t-2 border-t-cyan-500">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Career Accelerator</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Match your skills with current AI-ready job postings. Get tailored technical interview practice questions generated specifically for your target role.
              </p>
            </div>
            <Link
              to="/career"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 mt-4 group"
            >
              Explore Matches <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
