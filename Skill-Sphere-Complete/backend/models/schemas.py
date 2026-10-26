from pydantic import BaseModel, Field
from typing import List, Optional

# --- AI Radar Schemas ---
class SkillGapItem(BaseModel):
    skill: str
    importance: str = Field(description="High, Medium, or Emerging")
    current_level: str = Field(description="None, Beginner, Intermediate, Advanced")
    recommended_action: str

class AIRadarRequest(BaseModel):
    current_skills: List[str] = Field(default_factory=list, example=["Python", "SQL", "Git"])
    target_role: str = Field(example="AI Engineer / Full-Stack Developer")
    experience_level: Optional[str] = Field(default="Intermediate", example="Beginner / Student")

class AIRadarResponse(BaseModel):
    target_role: str
    match_score: int = Field(description="0-100 percentage")
    market_velocity: str = Field(description="Rapidly growing, Stable, High Demand")
    skill_gaps: List[SkillGapItem]
    ai_insights: str
    learning_sprints: List[str]

# --- Tracker Schemas ---
class TrackerLogRequest(BaseModel):
    skill: str = Field(example="FastAPI & Async Python")
    hours_spent: float = Field(example=2.5)
    notes: Optional[str] = Field(default="", example="Built router structure and tested Gemini integration")
    category: str = Field(default="Backend", example="Backend, Frontend, AI/ML, DevOps")

class MilestoneItem(BaseModel):
    id: str
    title: str
    category: str
    completed: bool
    deadline: Optional[str] = None

class TrackerSummaryResponse(BaseModel):
    daily_streak: int
    total_hours_this_week: float
    total_skills_tracked: int
    recent_logs: List[dict]
    milestones: List[MilestoneItem]

# --- Career & Jobs Schemas ---
class JobItem(BaseModel):
    id: str
    title: str
    company: str
    location: str
    type: str = "Full-Time / Internship"
    match_percentage: int
    required_skills: List[str]
    missing_skills: List[str]
    salary_range: Optional[str] = None

class JobMatchRequest(BaseModel):
    skills: List[str] = Field(default_factory=list, example=["React", "TypeScript", "Python", "FastAPI"])
    target_role: str = Field(example="Full-Stack Engineer")
    location_preference: Optional[str] = Field(default="Remote", example="Remote / Hybrid")

class JobMatchResponse(BaseModel):
    top_matches: List[JobItem]
    career_readiness_score: int
    recommended_certifications_or_projects: List[str]
    tailored_interview_question: str
