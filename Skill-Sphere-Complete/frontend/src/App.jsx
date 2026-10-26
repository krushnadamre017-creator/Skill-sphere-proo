import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AIRadar from './pages/AIRadar';
import Tracker from './pages/Tracker';
import Career from './pages/Career';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-radar" element={<AIRadar />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/career" element={<Career />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
