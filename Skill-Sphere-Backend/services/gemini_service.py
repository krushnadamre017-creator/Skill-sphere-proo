import json
import logging
from typing import List, Dict, Any
from config import settings

logger = logging.getLogger("skill_sphere.gemini")

class GeminiService:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.client = None
        self._init_client()

    def _init_client(self):
        if self.api_key:
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.api_key)
                self.client = genai.GenerativeModel("gemini-1.5-flash")
                logger.info("Gemini AI client successfully initialized with provided API key.")
            except Exception as e:
                logger.warning(f"Failed to initialize Gemini AI client: {e}. Running in mock/fallback mode.")
                self.client = None
        else:
            logger.info("No GEMINI_API_KEY provided. Operating in demo mock fallback mode.")

    def analyze_skill_gap(self, current_skills: List[str], target_role: str, experience_level: str) -> Dict[str, Any]:
        """
        Uses Gemini to generate personalized skill gap analysis, demand velocity, and sprint recommendations.
        """
        if self.client:
            prompt = f"""
            You are an expert tech career advisor and AI talent strategist.
            Analyze the following candidate profile:
            - Target Role: {target_role}
            - Current Skills: {', '.join(current_skills) if current_skills else 'None specified'}
            - Experience Level: {experience_level}

            Respond strictly in valid JSON with this exact structure:
            {{
                "target_role": "{target_role}",
                "match_score": <integer between 40 and 95>,
                "market_velocity": "<High Growth | Extremely High Demand | Emerging>",
                "skill_gaps": [
                    {{
                        "skill": "<skill name>",
                        "importance": "<High | Medium | Emerging>",
                        "current_level": "<None | Beginner | Intermediate>",
                        "recommended_action": "<concise action item>"
                    }}
                ],
                "ai_insights": "<2-3 sentences of strategic market analysis and advice>",
                "learning_sprints": [
                    "<Sprint 1 focus and deliverables>",
                    "<Sprint 2 focus and deliverables>",
                    "<Sprint 3 focus and deliverables>"
                ]
            }}
            Do not wrap in markdown quotes if possible, output pure JSON.
            """
            try:
                response = self.client.generate_content(prompt)
                raw_text = response.text.strip()
                if raw_text.startswith("```json"):
                    raw_text = raw_text.replace("```json", "", 1).replace("```", "").strip()
                elif raw_text.startswith("```"):
                    raw_text = raw_text.replace("```", "", 1).replace("```", "").strip()
                return json.loads(raw_text)
            except Exception as e:
                logger.error(f"Error calling Gemini API: {e}. Using intelligent fallback.")

        # Intelligent Fallback for Hackathon Demo
        skills_set = set(s.lower() for s in current_skills)
        score = min(88, max(45, len(current_skills) * 15))
        return {
            "target_role": target_role,
            "match_score": score,
            "market_velocity": "High Growth & Demand",
            "skill_gaps": [
                {
                    "skill": "Generative AI & LLM Orchestration",
                    "importance": "High",
                    "current_level": "Beginner" if "python" in skills_set else "None",
                    "recommended_action": "Build end-to-end agents using Gemini 1.5 and LangChain/LlamaIndex."
                },
                {
                    "skill": "Async Microservices & FastAPI",
                    "importance": "High",
                    "current_level": "Intermediate" if "python" in skills_set else "Beginner",
                    "recommended_action": "Design clean RESTful architectures with Pydantic v2 schemas and token authentication."
                },
                {
                    "skill": "Modern Cloud & Vector Databases",
                    "importance": "Medium",
                    "current_level": "None",
                    "recommended_action": "Experiment with Pinecone/Qdrant or pgvector for semantic retrieval."
                }
            ],
            "ai_insights": f"The demand for {target_role} is surging across AI-first startups. Mastering real-world integrations with LLMs and reactive full-stack patterns will put you in the top 10% of applicants.",
            "learning_sprints": [
                "Week 1: Core API Architecture & Gemini Integration",
                "Week 2: State management, React UI & Real-time dashboards",
                "Week 3: Containerization, deployment & portfolio showcase"
            ]
        }

    def generate_career_interview_question(self, target_role: str, missing_skills: List[str]) -> str:
        """
        Generates an AI-tailored technical interview question based on the candidate's target role.
        """
        if self.client:
            prompt = f"Generate 1 challenging yet realistic technical interview question for a {target_role} candidate, specifically touching on {', '.join(missing_skills[:2]) if missing_skills else 'system design and AI'}."
            try:
                response = self.client.generate_content(prompt)
                return response.text.strip()
            except Exception as e:
                logger.error(f"Gemini error generating question: {e}")

        return f"How would you architect a low-latency caching layer for an AI-powered service processing asynchronous requests in {target_role}?"

gemini_service = GeminiService()
