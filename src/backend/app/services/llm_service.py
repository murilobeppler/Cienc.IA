import os
import google.generativeai as genai
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize model - Using gemini-2.5-flash (stable, 1M tokens)
model = genai.GenerativeModel('models/gemini-2.5-flash')

PIPELINE_GENERATION_PROMPT = """You are an expert bioinformatics engineer specializing in Nextflow pipeline development.

Given the user's experiment description, generate a complete, executable Nextflow script.

Guidelines:
1. Use Nextflow DSL2 syntax
2. Include proper channels, processes, and workflows
3. Add comments explaining each section
4. Use best practices (containers, publishDir, etc.)
5. Make it production-ready and modular

User's experiment description:
{description}

Generate the complete Nextflow pipeline script:"""

async def generate_pipeline_from_description(description: str) -> dict:
    """
    Generate a Nextflow pipeline script from natural language description.
    
    Args:
        description: User's experiment description
        
    Returns:
        dict with 'script', 'explanation', and 'parameters'
    """
    try:
        # Check if API key is configured
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            return {
                "script": "",
                "explanation": "❌ GEMINI_API_KEY não configurada. Veja SETUP_GEMINI.md",
                "success": False
            }
        
        prompt = PIPELINE_GENERATION_PROMPT.format(description=description)
        print(f"[LLM] Generating pipeline for: {description[:50]}...")
        
        response = model.generate_content(prompt)
        
        # Check if response was blocked
        if not response.text:
            return {
                "script": "",
                "explanation": "⚠️ Resposta bloqueada pela API. Tente reformular sua solicitação.",
                "success": False
            }
        
        script = response.text
        print(f"[LLM] Pipeline generated successfully ({len(script)} chars)")
        
        return {
            "script": script,
            "explanation": "✅ Pipeline Nextflow gerado com sucesso!",
            "success": True
        }
    except Exception as e:
        print(f"[LLM ERROR] {type(e).__name__}: {str(e)}")
        return {
            "script": "",
            "explanation": f"❌ Erro ao gerar pipeline: {type(e).__name__} - {str(e)}",
            "success": False
        }

async def chat_with_ai(message: str, context: Optional[list] = None) -> str:
    """
    General chat with AI assistant.
    
    Args:
        message: User message
        context: Conversation history (optional)
        
    Returns:
        AI response
    """
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            return "❌ GEMINI_API_KEY não configurada. Configure no arquivo .env do backend."
        
        # Start a chat session
        chat = model.start_chat(history=context or [])
        response = chat.send_message(message)
        
        if not response.text:
            return "⚠️ Resposta vazia da API. Tente novamente."
        
        return response.text
    except Exception as e:
        print(f"[CHAT ERROR] {type(e).__name__}: {str(e)}")
        return f"❌ Erro: {type(e).__name__} - {str(e)}"

async def validate_nextflow_script(script: str) -> dict:
    """
    Validate Nextflow script syntax using AI.
    
    Args:
        script: Nextflow script to validate
        
    Returns:
        dict with validation results
    """
    validation_prompt = f"""Analyze this Nextflow script for syntax errors and best practices:

{script}

Provide:
1. Syntax validation (valid/invalid)
2. List of issues found
3. Suggestions for improvements

Format your response as:
VALID: yes/no
ISSUES: list of issues or "none"
SUGGESTIONS: list of suggestions"""

    try:
        response = model.generate_content(validation_prompt)
        return {
            "validation": response.text,
            "success": True
        }
    except Exception as e:
        return {
            "validation": f"Error: {str(e)}",
            "success": False
        }
