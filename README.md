# CiencIA

CiencIA is a platform designed for scientific research and education, integrating advanced AI capabilities with project management and data visualization tools. This repository contains the source code for the backend API, frontend user interface, and data processing pipelines.

## Project Structure

The repository is organized as follows:

```
ciencIA/
├── src/
│   ├── backend/        # FastAPI backend service
│   ├── frontend/       # Next.js frontend application
│   └── pipelines/      # Data processing pipelines (Nextflow, etc.)
├── docs/               # Project documentation and design prompts
├── tests/              # Test suites
└── README.md           # This file
```

## Getting Started

### Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **Git**

### Installation

#### Backend (Python)

1. Navigate to the backend directory:
   ```bash
   cd src/backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - **Windows:** `venv\Scripts\activate`
   - **Linux/Mac:** `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

#### Frontend (Node.js)

1. Navigate to the frontend directory:
   ```bash
   cd src/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Usage

- Access the **Frontend** at `http://localhost:3000`
- Access the **Backend API** documentation at `http://localhost:8000/docs`

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## License

[License Name] - see the LICENSE file for details.
