from pydantic import BaseModel
from typing import Optional
from enum import Enum

class PipelineStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"

class PipelineRunRequest(BaseModel):
    pipeline_name: str = "multiomics-pipeline"
    project_id: str
    params: Optional[dict] = {}

class PipelineRunResponse(BaseModel):
    run_id: str
    status: PipelineStatus
    message: str
