from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from typing import List
from ..database import get_session, Project, Pipeline, PipelineRun
from ..models.project import (
    ProjectCreate, ProjectResponse,
    PipelineCreate, PipelineUpdate, PipelineResponse,
    PipelineExecuteRequest, PipelineExecuteResponse,
    PipelineRunStatus
)
from ..services.runner import execute_nextflow_async
from datetime import datetime

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

# ============= PROJECTS =============

@router.post("/", response_model=ProjectResponse)
def create_project(project: ProjectCreate, session: Session = Depends(get_session)):
    """Create a new project."""
    db_project = Project(**project.dict())
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project

@router.get("/", response_model=List[ProjectResponse])
def list_projects(session: Session = Depends(get_session)):
    """List all projects."""
    projects = session.exec(select(Project)).all()
    return projects

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, session: Session = Depends(get_session)):
    """Get a specific project."""
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

# ============= PIPELINES =============

@router.post("/pipelines", response_model=PipelineResponse)
def create_pipeline(pipeline: PipelineCreate, session: Session = Depends(get_session)):
    """Create a new pipeline in a project."""
    # Verify project exists
    project = session.get(Project, pipeline.project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db_pipeline = Pipeline(**pipeline.dict())
    session.add(db_pipeline)
    session.commit()
    session.refresh(db_pipeline)
    return db_pipeline

@router.get("/pipelines", response_model=List[PipelineResponse])
def list_pipelines(project_id: int = None, session: Session = Depends(get_session)):
    """List all pipelines, optionally filtered by project."""
    statement = select(Pipeline)
    if project_id:
        statement = statement.where(Pipeline.project_id == project_id)
    pipelines = session.exec(statement).all()
    return pipelines

@router.get("/pipelines/{pipeline_id}", response_model=PipelineResponse)
def get_pipeline(pipeline_id: int, session: Session = Depends(get_session)):
    """Get a specific pipeline."""
    pipeline = session.get(Pipeline, pipeline_id)
    if not pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    return pipeline

@router.put("/pipelines/{pipeline_id}", response_model=PipelineResponse)
def update_pipeline(
    pipeline_id: int,
    updates: PipelineUpdate,
    session: Session = Depends(get_session)
):
    """Update a pipeline (edit script or name)."""
    pipeline = session.get(Pipeline, pipeline_id)
    if not pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    
    update_data = updates.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(pipeline, key, value)
    
    pipeline.updated_at = datetime.utcnow()
    session.add(pipeline)
    session.commit()
    session.refresh(pipeline)
    return pipeline

@router.post("/pipelines/{pipeline_id}/execute", response_model=PipelineExecuteResponse)
async def execute_pipeline(
    pipeline_id: int,
    request: PipelineExecuteRequest,
    session: Session = Depends(get_session)
):
    """Execute a pipeline."""
    pipeline = session.get(Pipeline, pipeline_id)
    if not pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    
    # Create a run record
    run = PipelineRun(
        pipeline_id=pipeline_id,
        status="pending",
        started_at=datetime.utcnow()
    )
    session.add(run)
    session.commit()
    session.refresh(run)
    
    # Execute asynchronously
    try:
        result = await execute_nextflow_async(pipeline.script, run.id, request.params)
        return PipelineExecuteResponse(
            run_id=run.id,
            status="running",
            message=f"Pipeline execution started. Run ID: {run.id}"
        )
    except Exception as e:
        run.status = "failed"
        run.logs = str(e)
        session.add(run)
        session.commit()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/runs/{run_id}", response_model=PipelineRunStatus)
def get_run_status(run_id: int, session: Session = Depends(get_session)):
    """Get the status of a pipeline run."""
    run = session.get(PipelineRun, run_id)
    if not run:
        raise HTTPException(status_code=404, detail="Run not found")
    return run
