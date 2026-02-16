import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

print("🔍 Listando modelos disponíveis do Gemini:\n")

for model in genai.list_models():
    if 'generateContent' in model.supported_generation_methods:
        print(f"✅ {model.name}")
        print(f"   Descrição: {model.description[:100] if model.description else 'N/A'}...")
        print()

print("\n💡 Use um desses nomes no arquivo llm_service.py")
