from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CiencIA API",
    description="Backend for the CiencIA Bio-SaaS Platform",
    version="0.1.0"
)

# CORS Configuration
origins = [
    "http://localhost:3000",  # Next.js Frontend
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
from app.database import create_db_and_tables

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
async def root():
    return {"message": "Welcome to CiencIA API - The Engine of Biological Discovery"}

@app.get("/health")
async def health_check():
    return {"status": "ok", "components": {"database": "sqlite", "nextflow_engine": "ready"}}

from app.routers import pipelines, chat, alphafold, projects
app.include_router(pipelines.router)
app.include_router(chat.router)
app.include_router(alphafold.router)
app.include_router(projects.router)
