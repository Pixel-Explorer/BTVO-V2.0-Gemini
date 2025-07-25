# Multi-Agent Collaboration Guide

## App Overview
Buddy Tales: AI Dialogue Studio is a React application located in `buddy-tales_-ai-dialogue-studio/`. It relies on the Google Gemini API to transform uploaded scripts into multi-character audio scenes.

## Agent Roles

### System Architect
- Maintains overall architecture and repository structure.
- Reviews major design changes and coordinates cross-agent efforts.
- Updates architecture documentation in the README when needed.

### Backend Engineer
- Implements server-side utilities in `buddy-tales_-ai-dialogue-studio/services`.
- Manages environment configuration (e.g., `.env` files) and the `Dockerfile`.
- Works with the Frontend Engineer on API boundaries and with DevOps on deployment.

### Frontend Engineer
- Develops React components under `components/` and hooks under `hooks/`.
- Updates `App.tsx` and related UI logic.
- Ensures accessibility and consistent styling.

### QA Tester
- Creates manual or automated test routines.
- Places test scripts in the `tests/` directory.
- Ensures `npm run build` succeeds before merging any pull request.

### DevOps / Deployment Engineer
- Maintains the `Dockerfile` and deployment instructions in the README.
- Sets up CI/CD workflows when necessary.

### Technical Writer
- Keeps the README and other documentation current.
- Works with all agents to document features and architecture.

## Workflow
1. Work in a feature branch and submit pull requests to `main`.
2. Run `npm install` once, then `npm run build` before committing.
3. Provide clear commit messages in present tense (e.g., "Add character selection component").
4. Summarize any testing performed in the pull request description.
5. Agents review each other's pull requests within their expertise.

## Directory Layout
- `buddy-tales_-ai-dialogue-studio/` – main React app
  - `components/` – UI components
  - `hooks/` – reusable hooks
  - `services/` – API and Gemini helpers
  - `utils/` – helper functions
- `Dockerfile` – container configuration
- `tests/` – location for QA scripts and test data
- `README.md` – setup and deployment instructions

## Communication
Agents coordinate using issues and pull requests. The System Architect resolves architectural questions after consulting relevant agents.
