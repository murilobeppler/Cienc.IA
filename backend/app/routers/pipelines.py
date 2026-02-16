from fastapi import APIRouter, BackgroundTasks
from ..models.pipeline import PipelineRunRequest, PipelineRunResponse, PipelineStatus
from ..services.runner import execute_nextflow

router = APIRouter(
    prefix="/pipelines",
    tags=["pipelines"]
)

@router.post("/run", response_model=PipelineRunResponse)
async def run_pipeline(request: PipelineRunRequest, background_tasks: BackgroundTasks):
    # In the future, we pass background_tasks to the runner to execute async
    result = execute_nextflow(request.pipeline_name, request.params)
    return result
