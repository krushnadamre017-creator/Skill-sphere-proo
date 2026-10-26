const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Helper for making API requests with fallback resilience
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`Request to ${endpoint} failed, checking demo fallback:`, err.message);
    throw err;
  }
}

// AI Radar Endpoints
export async function getRadarTrends() {
  try {
    return await apiRequest('/api/ai/trends');
  } catch {
    return {
      updated_at: 'Today (Demo Cache)',
      hot_skills: [
        { skill: 'Gemini & LLM API Integration', category: 'AI / Engineering', growth: '+142%', level: 'High' },
        { skill: 'FastAPI & Async Microservices', category: 'Backend', growth: '+95%', level: 'High' },
        { skill: 'React 19 & Next.js', category: 'Frontend', growth: '+78%', level: 'Medium' },
        { skill: 'Vector Search & RAG Pipelines', category: 'AI Infrastructure', growth: '+190%', level: 'High' },
        { skill: 'Tailwind CSS & Modern UI', category: 'UI/UX', growth: '+64%', level: 'Medium' },
      ],
    };
  }
}

export async function analyzeSkillGap(currentSkills, targetRole, experienceLevel = 'Intermediate') {
  try {
    return await apiRequest('/api/ai/analyze', {
      method: 'POST',
      body: JSON.stringify({
        current_skills: currentSkills,
        target_role: targetRole,
        experience_level: experienceLevel,
      }),
    });
  } catch {
    return {
      target_role: targetRole || 'Full-Stack AI Developer',
      match_score: 78,
      market_velocity: 'High Growth & Demand',
      skill_gaps: [
        {
          skill: 'Gemini Multimodal API',
          importance: 'High',
          current_level: 'Beginner',
          recommended_action: 'Build real-time prompt-engineered features with JSON mode.',
        },
        {
          skill: 'FastAPI Microservice Patterns',
          importance: 'High',
          current_level: 'Intermediate',
          recommended_action: 'Structure routes into clean domain routers with Pydantic v2 schemas.',
        },
        {
          skill: 'Vector Stores & Embeddings',
          importance: 'Medium',
          current_level: 'None',
          recommended_action: 'Implement similarity search using Chroma or pgvector.',
        },
      ],
      ai_insights:
        'The developer ecosystem is shifting rapidly towards full-stack engineers who can ship functional AI workflows. Your backend foundations provide a strong springboard.',
      learning_sprints: [
        'Week 1: FastAPI routers, Pydantic schemas & Gemini API wrapper',
        'Week 2: React Vite UI integration, reactive states & Tailwind styling',
        'Week 3: Milestone tracking, demo polish & hackathon pitch submission',
      ],
    };
  }
}

// Daily Tracker Endpoints
export async function getTrackerSummary() {
  try {
    return await apiRequest('/api/track/summary');
  } catch {
    return {
      daily_streak: 5,
      total_hours_this_week: 7.0,
      total_skills_tracked: 3,
      recent_logs: [
        { id: '1', date: '2026-10-25', skill: 'FastAPI Dependency Injection', hours_spent: 2.5, category: 'Backend' },
        { id: '2', date: '2026-10-24', skill: 'Tailwind Grid & Glassmorphism', hours_spent: 3.0, category: 'Frontend' },
        { id: '3', date: '2026-10-23', skill: 'Gemini Prompt Optimization', hours_spent: 1.5, category: 'AI/ML' },
      ],
      milestones: [
        { id: 'm1', title: 'Setup Monorepo & FastAPI Boilerplate', category: 'Backend', completed: true, deadline: 'Day 1' },
        { id: 'm2', title: 'Connect Gemini API with Fallback Handling', category: 'AI/ML', completed: true, deadline: 'Day 1' },
        { id: 'm3', title: 'Design React & Tailwind Navigation Shell', category: 'Frontend', completed: false, deadline: 'Day 2' },
        { id: 'm4', title: 'Ship MLH Hackathon Demo Video & Pitch', category: 'Project', completed: false, deadline: 'Day 3' },
      ],
    };
  }
}

export async function logLearningActivity(payload) {
  return await apiRequest('/api/track/log', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function toggleMilestoneStatus(milestoneId) {
  return await apiRequest(`/api/track/milestone/${milestoneId}/toggle`, {
    method: 'POST',
  });
}

// Career & Jobs Endpoints
export async function matchJobs(skills, targetRole, locationPreference = 'Remote') {
  try {
    return await apiRequest('/api/career/match', {
      method: 'POST',
      body: JSON.stringify({
        skills,
        target_role: targetRole,
        location_preference: locationPreference,
      }),
    });
  } catch {
    return {
      top_matches: [
        {
          id: 'job-101',
          title: 'AI Application Engineer',
          company: 'SphereAI Labs',
          location: 'Remote',
          type: 'Full-Time',
          match_percentage: 88,
          required_skills: ['Python', 'FastAPI', 'Gemini API', 'React'],
          missing_skills: ['Docker'],
          salary_range: '$110k - $140k',
        },
        {
          id: 'job-102',
          title: 'Full-Stack Developer (AI Ecosystem)',
          company: 'Nexus Cloud',
          location: 'Remote / Hybrid',
          type: 'Full-Time',
          match_percentage: 75,
          required_skills: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI'],
          missing_skills: ['TypeScript'],
          salary_range: '$100k - $130k',
        },
      ],
      career_readiness_score: 82,
      recommended_certifications_or_projects: [
        'Deploy an end-to-end multi-agent Gemini assistant',
        'Contribute to open-source FastAPI plugins',
      ],
      tailored_interview_question:
        'How would you handle rate-limiting and stream token responses to a React client when using Gemini 1.5 in a high-concurrency FastAPI app?',
    };
  }
}
