from pydantic import BaseModel
from typing import Optional, List

class ChatMessage(BaseModel):
    role: str  # 'user' or 'assistant'
    content: str

class ChatRequest(BaseModel):
    message: str
    context: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    response: str
    success: bool

class PipelineGenerationRequest(BaseModel):
    description: str
    experiment_type: Optional[str] = None

class PipelineGenerationResponse(BaseModel):
    script: str
    explanation: str
    success: bool
    parameters: Optional[dict] = None

class ScriptValidationRequest(BaseModel):
    script: str

class ScriptValidationResponse(BaseModel):
    is_valid: bool
    issues: List[str] = []
    suggestions: List[str] = []
