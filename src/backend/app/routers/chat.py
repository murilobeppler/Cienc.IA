from fastapi import APIRouter, HTTPException
from ..models.chat import (
    ChatRequest, ChatResponse,
    PipelineGenerationRequest, PipelineGenerationResponse,
    ScriptValidationRequest, ScriptValidationResponse
)
from ..services.llm_service import (
    chat_with_ai,
    generate_pipeline_from_description,
    validate_nextflow_script
)

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)

@router.post("/message", response_model=ChatResponse)
async def send_message(request: ChatRequest):
    """
    Send a message to the AI assistant and get a response.
    """
    try:
        # Convert context to Gemini format (assistant -> model)
        context_history = []
        for msg in request.context:
            role = "model" if msg.role == "assistant" else msg.role
            context_history.append({
                "role": role,
                "parts": [msg.content]
            })
        
        response = await chat_with_ai(request.message, context_history)
        return ChatResponse(response=response, success=True)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-pipeline", response_model=PipelineGenerationResponse)
async def generate_pipeline(request: PipelineGenerationRequest):
    """
    Generate a Nextflow pipeline script from a natural language description.
    """
    try:
        result = await generate_pipeline_from_description(request.description)
        
        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["explanation"])
        
        return PipelineGenerationResponse(
            script=result["script"],
            explanation=result["explanation"],
            success=result["success"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/validate-script", response_model=ScriptValidationResponse)
async def validate_script(request: ScriptValidationRequest):
    """
    Validate a Nextflow script for syntax and best practices.
    """
    try:
        result = await validate_nextflow_script(request.script)
        
        # Parse the validation response
        # This is a simple parser - can be improved
        validation_text = result["validation"]
        
        is_valid = "VALID: yes" in validation_text.lower()
        
        return ScriptValidationResponse(
            is_valid=is_valid,
            issues=[],
            suggestions=[]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
