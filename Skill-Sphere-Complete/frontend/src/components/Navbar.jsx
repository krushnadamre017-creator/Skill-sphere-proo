import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, CheckSquare, Briefcase, Zap, Sparkles } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: 'AI Radar', path: '/ai-radar', icon: Compass },
    { name: 'Daily Tracker', path: '/tracker', icon: CheckSquare },
    { name: 'Career Accelerator', path: '/career', icon: Briefcase },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Skill Sphere <span className="text-teal-400 font-extrabold text-sm uppercase px-1.5 py-0.5 rounded bg-teal-950/60 border border-teal-500/30">Pro</span>
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-teal-300 bg-slate-800/60'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Overview
            </Link>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-teal-300 bg-slate-800/60 shadow-inner'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Hackathon Badge & CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/70 border border-indigo-700/50 text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>MLH Hackathon Build</span>
            </div>
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all font-mono shadow-md shadow-teal-500/20"
            >
              API Docs
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
