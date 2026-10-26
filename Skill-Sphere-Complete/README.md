# 🌐 Skill Sphere | AI-Powered Learning & Career Acceleration

> **Built for the MLH Hackathon** — An intelligent full-stack ecosystem engineered to help developers maintain daily learning habits, identify high-growth technical gaps with **Google Gemini 1.5**, and accelerate career readiness.

---

## 🏛️ Monorepo Architecture

```
Skill-Sphere-Workspace/
├── backend/                  # FastAPI Python backend
│   ├── routes/               # Modular domain routers
│   │   ├── ai_radar.py       # AI skill gap analysis & market trend endpoints
│   │   ├── tracker.py        # Daily streak, habits & milestone endpoints
│   │   └── jobs.py           # Job matching & Gemini interview generator
│   ├── services/
│   │   └── gemini_service.py # Google Gemini client with resilient fallbacks
│   ├── models/
│   │   └── schemas.py        # Pydantic v2 validation contracts
│   ├── config.py             # Environment configuration & CORS policy
│   ├── main.py               # FastAPI application entry point
│   ├── requirements.txt      # Python dependencies
│   └── .env.example          # Sample environment variables
│
├── frontend/                 # React 18 + Vite frontend
│   ├── src/
│   │   ├── components/       # Shared UI components (Navbar, Footer)
│   │   ├── pages/            # Feature views (Home, AIRadar, Tracker, Career)
│   │   ├── services/         # API client with offline/demo resilience
│   │   ├── App.jsx           # React Router v6 navigation shell
│   │   ├── index.css         # Tailwind directives & glassmorphic styling
│   │   └── main.jsx          # React DOM entry point
│   ├── package.json          # Frontend dependencies & scripts
│   ├── vite.config.js        # Vite build tool & backend proxy config
│   ├── tailwind.config.js    # Tailwind styling theme & color palette
│   └── index.html            # HTML shell with Plus Jakarta Sans typography
│
├── .gitignore                # Unified git ignore rules
└── README.md                 # Complete hackathon documentation
```

---

## ⚡ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Backend** | [FastAPI](https://fastapi.tiangolo.com/) | High-performance async RESTful API framework |
| **Server** | [Uvicorn](https://www.uvicorn.org/) | Lightning-fast ASGI production web server |
| **AI / LLM** | [Google Generative AI](https://ai.google.dev/) | Gemini 1.5 Flash for personalized gap analysis & interview questions |
| **Frontend** | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) | Modern reactive user interface and rapid hot-reloading |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Responsive glassmorphism and developer-centric dark palette |
| **Routing** | [React Router v6](https://reactrouter.com/) | Dynamic client-side single-page app navigation |
| **Icons** | [Lucide React](https://lucide.dev/) | Sleek, modern iconography |

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- Python 3.10+ (Python 3.12 or 3.13 recommended)
- Node.js 18+ and npm (or pnpm/yarn)
- *(Optional)* Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

---

### 2. Backend Setup (FastAPI)

1. Open your terminal and navigate to the backend folder:
   ```bash
   cd Skill-Sphere-Workspace/backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   # Windows:
   python -m venv .venv
   .venv\Scripts\activate

   # macOS / Linux:
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure your environment variables:
   ```bash
   cp .env.example .env
   ```
   Add your `GEMINI_API_KEY` in `.env` (the application includes built-in fallback mock data if no key is supplied, ensuring seamless zero-crash demos).

5. Launch the backend server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   - API Root: `http://localhost:8000/`
   - Interactive Swagger Docs: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

---

### 3. Frontend Setup (React / Vite)

1. Open a second terminal window and navigate to the frontend folder:
   ```bash
   cd Skill-Sphere-Workspace/frontend
   ```

2. Install npm packages:
   ```bash
   npm install
   ```

3. Launch the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser to:
   ```
   http://localhost:5173
   ```

---

## 🎯 Key Features

1. **AI Skill Radar (`/api/ai` & `/ai-radar`)**:
   - Compares your current skills against target roles.
   - Computes market velocity and candidate readiness scores.
   - Generates actionable 3-week learning sprint roadmaps via Gemini 1.5.

2. **Daily Learning Tracker (`/api/track` & `/tracker`)**:
   - Habit-forming daily learning streak counter with flame indicators.
   - Quick logging for study sessions by category (Backend, Frontend, AI/ML, DevOps).
   - Interactive project milestone checklist tailored for hackathon delivery.

3. **Career Accelerator (`/api/career` & `/career`)**:
   - Matches candidate toolkits against curated high-growth AI and developer roles.
   - Surfaces missing requirements per job with priority badges.
   - Generates customized technical interview practice prompts using Gemini.

---

## 🏆 MLH Hackathon Demo Highlights

- **Resilient Fallback Mode**: Even without a live `GEMINI_API_KEY` or during offline venue conditions, the frontend and backend gracefully present realistic structured responses.
- **Unified Monorepo**: Easy for judges and collaborators to clone, run, and review in minutes.
- **Production-Ready Standards**: Uses Pydantic v2 schemas, CORS middleware, strict router separation, and modern accessible Tailwind layout.
