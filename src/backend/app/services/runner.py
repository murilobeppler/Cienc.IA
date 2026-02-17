import subprocess
import os
import uuid
import asyncio
from ..models.pipeline import PipelineRunResponse, PipelineStatus

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))
PIPELINES_DIR = os.path.join(PROJECT_ROOT, "pipelines")
RUNS_DIR = os.path.join(PROJECT_ROOT, "runs")

# Ensure runs directory exists
os.makedirs(RUNS_DIR, exist_ok=True)

def execute_nextflow(pipeline_name: str, params: dict) -> PipelineRunResponse:
    run_id = str(uuid.uuid4())
    pipeline_path = os.path.join(PIPELINES_DIR, pipeline_name, "main.nf")
    
    if not os.path.exists(pipeline_path):
        return PipelineRunResponse(
            run_id=run_id,
            status=PipelineStatus.FAILED,
            message=f"Pipeline {pipeline_name} not found at {pipeline_path}"
        )

    # In a real async scenario, this would be a Celery task
    # For now, we verify we can construct the command
    cmd = ["nextflow", "run", pipeline_path, "-name", f"run_{run_id}"]
    
    # Just for demo/verification, we don't actually block and run full processing causing timeout
    # In production, use background tasks (BackgroundTasks in FastAPI)
    
    return PipelineRunResponse(
        run_id=run_id,
        status=PipelineStatus.PENDING,
        message=f"Pipeline execution prepared for {pipeline_name}. Command: {' '.join(cmd)}"
    )

async def execute_nextflow_async(script_content: str, run_id: int, params: dict = None):
    """
    Execute a Nextflow script asynchronously.
    
    Args:
        script_content: The Nextflow script as a string
        run_id: Unique run identifier
        params: Additional parameters
    
    Returns:
        dict with execution details
    """
    # Create a temporary directory for this run
    run_dir = os.path.join(RUNS_DIR, f"run_{run_id}")
    os.makedirs(run_dir, exist_ok=True)
    
    # Write script to file
    script_path = os.path.join(run_dir, "main.nf")
    with open(script_path, 'w') as f:
        f.write(script_content)
    
    # Prepare command
    cmd = [
        "nextflow",
        "run",
        script_path,
        "-work-dir", os.path.join(run_dir, "work"),
        "-name", f"run_{run_id}"
    ]
    
    # Add params if provided
    if params:
        for key, value in params.items():
            cmd.extend([f"--{key}", str(value)])
    
    # Execute in background (non-blocking)
    # In production, use Celery or similar
    process = await asyncio.create_subprocess_exec(
        *cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
        cwd=run_dir
    )
    
    return {
        "run_id": run_id,
        "run_dir": run_dir,
        "process_id": process.pid,
        "command": " ".join(cmd)
    }
