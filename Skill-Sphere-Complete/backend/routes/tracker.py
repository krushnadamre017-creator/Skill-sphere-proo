from fastapi import APIRouter
from datetime import datetime, date
from typing import List
from models.schemas import TrackerLogRequest, TrackerSummaryResponse, MilestoneItem

router = APIRouter(tags=["Tracker"])

# In-memory store for demonstration purposes
demo_logs = [
    {
        "id": "1",
        "date": "2026-10-25",
        "skill": "FastAPI Dependency Injection",
        "hours_spent": 2.5,
        "notes": "Reviewed route structuring and middleware CORS configuration",
        "category": "Backend"
    },
    {
        "id": "2",
        "date": "2026-10-24",
        "skill": "Tailwind Grid & Glassmorphism",
        "hours_spent": 3.0,
        "notes": "Created dashboard cards and responsive layout",
        "category": "Frontend"
    },
    {
        "id": "3",
        "date": "2026-10-23",
        "skill": "Gemini 1.5 Flash Prompt Tuning",
        "hours_spent": 1.5,
        "notes": "Configured structured JSON responses from LLM",
        "category": "AI/ML"
    }
]

demo_milestones = [
    MilestoneItem(id="m1", title="Setup Monorepo & FastAPI Boilerplate", category="Backend", completed=True, deadline="Day 1"),
    MilestoneItem(id="m2", title="Connect Gemini API with Fallback Handling", category="AI/ML", completed=True, deadline="Day 1"),
    MilestoneItem(id="m3", title="Design React & Tailwind Navigation Shell", category="Frontend", completed=False, deadline="Day 2"),
    MilestoneItem(id="m4", title="Ship MLH Hackathon Demo Video & Pitch", category="Project", completed=False, deadline="Day 3")
]

current_streak = 5

@router.get("/summary", response_model=TrackerSummaryResponse)
def get_tracker_summary():
    """
    Returns daily learning streak, total hours, milestones, and recent study logs.
    """
    total_hours = sum(log["hours_spent"] for log in demo_logs)
    unique_skills = len(set(log["skill"] for log in demo_logs))
    
    return TrackerSummaryResponse(
        daily_streak=current_streak,
        total_hours_this_week=round(total_hours, 1),
        total_skills_tracked=unique_skills,
        recent_logs=demo_logs,
        milestones=demo_milestones
    )

@router.post("/log")
def log_learning_activity(payload: TrackerLogRequest):
    """
    Logs hours spent on a skill, updates streak and history.
    """
    global current_streak
    new_entry = {
        "id": str(len(demo_logs) + 1),
        "date": str(date.today()),
        "skill": payload.skill,
        "hours_spent": payload.hours_spent,
        "notes": payload.notes,
        "category": payload.category
    }
    demo_logs.insert(0, new_entry)
    current_streak += 1
    
    return {
        "status": "success",
        "message": f"Successfully logged {payload.hours_spent} hours for {payload.skill}!",
        "current_streak": current_streak,
        "entry": new_entry
    }

@router.post("/milestone/{milestone_id}/toggle")
def toggle_milestone(milestone_id: str):
    """
    Toggles the completion status of a project milestone.
    """
    for m in demo_milestones:
        if m.id == milestone_id:
            m.completed = not m.completed
            return {"status": "success", "milestone": m}
    return {"status": "not_found", "message": "Milestone ID not found"}
