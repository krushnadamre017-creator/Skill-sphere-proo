import os
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routes import ai_radar, tracker, jobs

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Skill Sphere API - AI-powered ecosystem for daily learning, project tracking, and career acceleration."
)

# CORS Middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include separate feature routes
app.include_router(ai_radar.router, prefix="/api/ai")
app.include_router(tracker.router, prefix="/api/track")
app.include_router(jobs.router, prefix="/api/career")

# Static files directory
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(STATIC_DIR):
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    """
    Serves the interactive Skill Sphere web application.
    If requested with Accept: application/json, returns API metadata.
    """
    accept = request.headers.get("accept", "")
    if "application/json" in accept and "text/html" not in accept:
        return JSONResponse({
            "message": "Welcome to the Skill Sphere API!",
            "version": settings.VERSION,
            "docs_url": "/docs"
        })
    
    index_path = os.path.join(STATIC_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path, media_type="text/html")

    return JSONResponse({
        "message": "Welcome to the Skill Sphere API!",
        "version": settings.VERSION,
        "docs_url": "/docs"
    })

@app.get("/app", response_class=HTMLResponse)
def serve_webapp():
    index_path = os.path.join(STATIC_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path, media_type="text/html")
    return {"message": "Skill Sphere Web App not found in static folder."}

@app.get("/api")
def api_root():
    return {
        "message": "Welcome to the Skill Sphere API!",
        "version": settings.VERSION,
        "docs_url": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": settings.PROJECT_NAME}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=True)
