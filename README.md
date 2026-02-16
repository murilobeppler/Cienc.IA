# CiencIA - BioSaaS Platform

**Democratizing access to scientific research tools with AI.**

## Architecture
- **Frontend**: Next.js 15+ (App Router, TailwindCSS)
- **Backend**: FastAPI (Python 3.11)
- **Engine**: Nextflow (Bioinformatics Pipelines)
- **AI**: LLM Agent Integration (Planned)

## Prerequisites
- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- Java 11+ (for Nextflow)
- Nextflow (`curl -s https://get.nextflow.io | bash`)

## specialized Tools Setup (Bioinformatics)
Ensure you have the necessary containers or binaries for your pipelines.
The default pipeline uses Docker containers.

## Getting Started

### 0. Configure Gemini API (Required for AI Features)

Before running the backend, you need to configure your Gemini API key:

1. Get API key from: https://makersuite.google.com/app/apikey
2. Copy `.env.example` to `.env` in the `backend` folder
3. Add your key: `GEMINI_API_KEY=your_key_here`

See [SETUP_GEMINI.md](./SETUP_GEMINI.md) for detailed instructions.

### 1. Backend (API)
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```
API will be available at `http://localhost:8000` / `http://localhost:8000/docs`

### 2. Frontend (UI)
```bash
cd frontend
npm install
npm run dev
```
App will be available at `http://localhost:3000`

### 3. Pipelines (Nextflow)
Test the pipeline engine:
```bash
cd pipelines/multiomics-pipeline
nextflow run main.nf
```

## Project Structure
- `/frontend`: Web application
- `/backend`: API and Orchestration logic
- `/pipelines`: Nextflow scripts and modules
