from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None

class ProjectResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    created_at: datetime
    updated_at: datetime

class PipelineCreate(BaseModel):
    project_id: int
    name: str
    script: str

class PipelineUpdate(BaseModel):
    name: Optional[str] = None
    script: Optional[str] = None

class PipelineResponse(BaseModel):
    id: int
    project_id: int
    name: str
    script: str
    status: str
    created_at: datetime
    updated_at: datetime

class PipelineExecuteRequest(BaseModel):
    pipeline_id: int
    params: Optional[dict] = {}

class PipelineExecuteResponse(BaseModel):
    run_id: int
    status: str
    message: str

class PipelineRunStatus(BaseModel):
    id: int
    pipeline_id: int
    status: str
    logs: Optional[str]
    output_dir: Optional[str]
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
