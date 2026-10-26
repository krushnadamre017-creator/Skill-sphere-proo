from fastapi import APIRouter
from typing import List
from models.schemas import JobMatchRequest, JobMatchResponse, JobItem
from services.gemini_service import gemini_service

router = APIRouter(tags=["Career & Jobs"])

SAMPLE_JOBS = [
    JobItem(
        id="job-101",
        title="AI Application Engineer",
        company="SphereAI Labs",
        location="Remote",
        type="Full-Time",
        match_percentage=85,
        required_skills=["Python", "FastAPI", "Gemini API", "React", "Docker"],
        missing_skills=[],
        salary_range="$110k - $140k"
    ),
    JobItem(
        id="job-102",
        title="Full-Stack Developer (AI Ecosystem)",
        company="Nexus Cloud",
        location="San Francisco / Remote",
        type="Full-Time",
        match_percentage=75,
        required_skills=["React", "TypeScript", "Tailwind CSS", "Node.js", "Python"],
        missing_skills=[],
        salary_range="$100k - $130k"
    ),
    JobItem(
        id="job-103",
        title="Junior ML & Software Fellow",
        company="TechVentures Hackathon Incubator",
        location="Remote",
        type="Fellowship / Internship",
        match_percentage=92,
        required_skills=["Python", "Git", "Problem Solving", "APIs"],
        missing_skills=[],
        salary_range="$45/hr"
    )
]

@router.post("/match", response_model=JobMatchResponse)
def match_jobs_and_career(payload: JobMatchRequest):
    """
    Matches candidate skills to tech roles, calculates readiness score, and generates a tailored interview prompt.
    """
    user_skills_normalized = set(s.strip().lower() for s in payload.skills)
    processed_jobs: List[JobItem] = []
    
    for job in SAMPLE_JOBS:
        req_skills_set = set(s.lower() for s in job.required_skills)
        matched = user_skills_normalized.intersection(req_skills_set)
        missing = [s for s in job.required_skills if s.lower() not in user_skills_normalized]
        
        calc_match = int((len(matched) / max(len(req_skills_set), 1)) * 100) if user_skills_normalized else job.match_percentage
        # Ensure a sensible baseline for demonstration
        calc_match = max(40, min(98, calc_match))
        
        processed_jobs.append(
            JobItem(
                id=job.id,
                title=job.title,
                company=job.company,
                location=job.location,
                type=job.type,
                match_percentage=calc_match,
                required_skills=job.required_skills,
                missing_skills=missing,
                salary_range=job.salary_range
            )
        )
    
    # Sort by match percentage descending
    processed_jobs.sort(key=lambda j: j.match_percentage, reverse=True)
    
    top_missing = processed_jobs[0].missing_skills if processed_jobs else []
    interview_q = gemini_service.generate_career_interview_question(
        target_role=payload.target_role,
        missing_skills=top_missing
    )
    
    readiness = int(sum(j.match_percentage for j in processed_jobs) / max(len(processed_jobs), 1))

    return JobMatchResponse(
        top_matches=processed_jobs,
        career_readiness_score=readiness,
        recommended_certifications_or_projects=[
            f"Build a showcase portfolio project addressing {top_missing[0]}" if top_missing else "Ship a multi-modal Gemini demo app",
            "Contribute to open-source FastAPI or React UI libraries",
            "Participate in live MLH hackathon track sprints"
        ],
        tailored_interview_question=interview_q
    )

@router.get("/featured")
def get_featured_jobs():
    """
    Returns featured jobs directly.
    """
    return {"jobs": SAMPLE_JOBS}
