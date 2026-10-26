from fastapi import APIRouter, HTTPException
from models.schemas import AIRadarRequest, AIRadarResponse
from services.gemini_service import gemini_service

router = APIRouter(tags=["AI Radar"])

@router.post("/analyze", response_model=AIRadarResponse)
def analyze_skills(payload: AIRadarRequest):
    """
    Analyzes user skills against market demand for a target role using Gemini API.
    """
    try:
        result = gemini_service.analyze_skill_gap(
            current_skills=payload.current_skills,
            target_role=payload.target_role,
            experience_level=payload.experience_level or "Intermediate"
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate radar analysis: {str(e)}")

@router.get("/trends")
def get_market_trends():
    """
    Returns curated AI & tech skill trends, market growth velocity, and popularity metrics.
    """
    return {
        "updated_at": "Today",
        "hot_skills": [
            {"skill": "Gemini & LLM API Integration", "category": "AI / Engineering", "growth": "+142%", "level": "High"},
            {"skill": "FastAPI & Async Microservices", "category": "Backend", "growth": "+95%", "level": "High"},
            {"skill": "React 19 & Next.js", "category": "Frontend", "growth": "+78%", "level": "Medium"},
            {"skill": "Vector Search & RAG Pipelines", "category": "AI Infrastructure", "growth": "+190%", "level": "High"},
            {"skill": "Tailwind CSS & Modern Design Systems", "category": "UI/UX", "growth": "+64%", "level": "Medium"}
        ]
    }
