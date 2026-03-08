<div align="center">

# 🎨 VibeStudio

### A vibe coding platform — describe what you want, get runnable UI code instantly

**Prompt-to-code · Isolated sandbox execution · Background jobs · Auth + Billing · Full history**

[![TypeScript](https://img.shields.io/badge/TypeScript-60%25-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Gemini](https://img.shields.io/badge/Google-Gemini_API-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![E2B](https://img.shields.io/badge/E2B-Sandbox_Execution-FF6B35?style=flat-square)](https://e2b.dev/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vibe-studio-five.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**Live Demo: [vibe-studio-five.vercel.app](https://vibe-studio-five.vercel.app)**

</div>

---

## Overview

**VibeStudio** is an AI-powered vibe coding platform — similar to [v0.dev](https://v0.dev) — where you describe what you want to build in plain English and receive generated, production-ready UI code in seconds. The generated code runs instantly inside isolated **E2B sandboxes**, so there is zero risk to your machine and zero environment setup required.

Under the hood, **Google Gemini API** handles the prompt-to-code intelligence, **Inngest** manages background job processing, **Clerk** handles authentication and billing, and **Prisma + PostgreSQL** stores every generation in your personal history.

---

## Key Features

| Feature | Description |
|---|---|
| 🤖 **Prompt-to-Code Generation** | Describe UI in plain text and get runnable React/Next.js code via Google Gemini API |
| 🏖️ **Isolated E2B Sandbox Execution** | Code runs in secure cloud sandboxes — no local setup, no risk |
| ⚙️ **Background Job Processing** | Inngest handles async generation jobs reliably and at scale |
| 🔐 **Auth + Billing** | Clerk authentication with built-in subscription plan management |
| 📜 **Generation History** | Every prompt and generated output saved to PostgreSQL via Prisma |
| 🎨 **shadcn/ui Components** | Beautiful, accessible UI built with shadcn/ui |
| 🔄 **Smart Data Fetching** | TanStack Query for efficient server state caching and invalidation |
| 🌍 **Deployed on Vercel** | Production-ready deployment with zero config |

---

## Tech Stack

### Frontend
- **Next.js** (App Router) — Full-stack React framework
- **TypeScript / JavaScript** — Hybrid codebase
- **shadcn/ui** — Accessible, customizable UI component library
- **TanStack Query** — Async state management and server data caching
- **Zustand** — Lightweight global client state

### AI & Execution
- **Google Gemini API** — Powers the prompt-to-code UI generation
- **E2B Sandbox** — Isolated cloud execution environments for generated code
- **sandbox-templates/next-js** — Custom Next.js E2B sandbox template

### Backend & Jobs
- **Next.js API Routes** — Server-side API handling via App Router
- **Inngest** — Durable background functions for async code generation pipeline
- **Prisma ORM** — Type-safe database access layer
- **PostgreSQL** — Stores users, projects, and full generation history

### Auth & Billing
- **Clerk** — User authentication and session management
- **Clerk Billing** — Subscription plans and usage-based billing gates

### Infrastructure
- **Docker Compose** — Local PostgreSQL setup
- **Vercel** — Production deployment platform

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     CLIENT (Next.js)                     │
│    shadcn/ui + TanStack Query + Zustand + Clerk UI      │
└───────────────────────┬──────────────────────────────────┘
                        │ Server Actions / API Routes
                        ▼
┌──────────────────────────────────────────────────────────┐
│               NEXT.JS BACKEND (App Router)               │
│   Verifies auth (Clerk) → checks billing plan           │
│   Triggers Inngest job → returns jobId to client        │
└──────┬─────────────────────────────────┬────────────────┘
       │ Inngest Event                   │ Prisma
       ▼                                 ▼
┌──────────────┐                ┌────────────────────┐
│   INNGEST    │                │    POSTGRESQL      │
│  Background  │                │  Users, Projects,  │
│  Job Runner  │                │  Generation History│
└──────┬───────┘                └────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────┐
│                  GEMINI API (Google AI)                  │
│     Processes prompt → Generates React/Next.js code     │
└──────────────────────┬───────────────────────────────────┘
                       │ Generated Code
                       ▼
┌──────────────────────────────────────────────────────────┐
│                   E2B SANDBOX                            │
│   Spins up isolated Next.js environment                 │
│   Executes generated code safely in the cloud           │
│   Returns live preview URL back to client               │
└──────────────────────────────────────────────────────────┘
```

---

## User Flow

```
[User] → types a plain-text UI prompt
  e.g. "Build a dashboard with sidebar, dark mode toggle, and stats cards"
  ↓
[Clerk] → verifies authentication + billing plan entitlement
  ↓
[Next.js API Route] → validates and enqueues the request
  ↓
[Inngest] → triggers background generation job pipeline
  ↓
[Google Gemini API]
  → receives system prompt + user prompt
  → generates production-ready React/Next.js component code
  ↓
[E2B Sandbox]
  → spins up isolated Next.js sandbox from custom template
  → writes generated code into sandbox filesystem
  → installs dependencies + starts dev server
  → returns live preview URL
  ↓
[Prisma → PostgreSQL]
  → saves prompt, generated code, preview URL, status, timestamp
  ↓
[Client]
  → displays live preview in iframe
  → shows generated code with syntax highlighting
  → entry appears in generation history
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) (for local PostgreSQL)
- A [Google Gemini API key](https://ai.google.dev/)
- An [E2B account](https://e2b.dev/) and API key
- A [Clerk account](https://clerk.com/) for auth + billing
- An [Inngest account](https://www.inngest.com/) for background jobs

---

### 1. Clone the Repository

```bash
git clone https://github.com/TirthBhatt1208/VibeStudio.git
cd VibeStudio
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/vibestudio

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# E2B Sandbox
E2B_API_KEY=your_e2b_api_key

# Clerk Auth + Billing
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

### 4. Start PostgreSQL with Docker

```bash
docker-compose up -d
```

### 5. Run Database Migrations

```bash
npx prisma migrate dev
npx prisma generate
```

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Start the Inngest Dev Server (separate terminal)

```bash
npx inngest-cli@latest dev
```

---

## Project Structure

```
VibeStudio/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Clerk auth pages (sign-in, sign-up)
│   │   ├── (dashboard)/              # Protected dashboard routes
│   │   │   ├── page.js               # Main prompt input UI
│   │   │   └── history/              # Generation history page
│   │   ├── api/
│   │   │   ├── generate/             # Prompt → Gemini → E2B API route
│   │   │   └── inngest/              # Inngest background job handler
│   │   └── layout.js                 # Root layout with Clerk provider
│   ├── components/
│   │   ├── ui/                       # shadcn/ui base components
│   │   ├── CodeEditor.jsx            # Generated code display with highlighting
│   │   ├── SandboxPreview.jsx        # E2B iframe live preview
│   │   ├── PromptInput.jsx           # Main prompt input component
│   │   └── HistoryCard.jsx           # Past generation card component
│   ├── lib/
│   │   ├── gemini.js                 # Google Gemini API client
│   │   ├── e2b.js                    # E2B sandbox client
│   │   ├── inngest.js                # Inngest client + function definitions
│   │   ├── prisma.js                 # Prisma client singleton
│   │   └── utils.js                  # Shared utility functions
│   └── store/                        # Zustand global state stores
├── prisma/
│   └── schema.prisma                 # Database schema
├── generated/
│   └── prisma/                       # Auto-generated Prisma client types
├── sandbox-templates/
│   └── next-js/                      # Custom E2B Next.js sandbox template
├── public/                           # Static assets
├── docker-compose.yml                # Local PostgreSQL + services
├── next.config.mjs                   # Next.js config
├── components.json                   # shadcn/ui config
└── prisma.config.ts                  # Prisma configuration
```

---

## Database Schema (Prisma)

```prisma
model User {
  id          String       @id @default(cuid())
  clerkId     String       @unique
  email       String       @unique
  createdAt   DateTime     @default(now())
  projects    Project[]
}

model Project {
  id          String       @id @default(cuid())
  userId      String
  user        User         @relation(fields: [userId], references: [id])
  title       String
  createdAt   DateTime     @default(now())
  generations Generation[]
}

model Generation {
  id            String   @id @default(cuid())
  projectId     String
  project       Project  @relation(fields: [projectId], references: [id])
  prompt        String
  generatedCode String   @db.Text
  previewUrl    String?
  status        String   @default("pending") // pending | running | done | error
  createdAt     DateTime @default(now())
}
```

---

## API Routes

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/generate` | Submit a prompt — triggers Inngest generation job |
| `GET` | `/api/generate/:jobId` | Poll generation job status |
| `POST` | `/api/inngest` | Inngest job handler endpoint (internal) |
| `GET` | `/api/history` | Fetch authenticated user's generation history |
| `DELETE` | `/api/history/:id` | Delete a specific generation entry |

---

## Inngest Background Jobs

| Function | Trigger Event | Description |
|---|---|---|
| `generate-ui-code` | `vibestudio/prompt.submitted` | Calls Gemini API with the user's prompt and system context |
| `run-in-sandbox` | `vibestudio/code.generated` | Spins up E2B sandbox, writes and executes the code |
| `save-generation` | `vibestudio/sandbox.ready` | Persists the full result to PostgreSQL via Prisma |

---

## Auth & Billing (Clerk)

VibeStudio uses **Clerk** for both authentication and billing:

- **Authentication** — Sign up / sign in with email or social providers
- **Protected Routes** — Middleware guards all dashboard routes from unauthenticated access
- **Billing Plans** — Free tier (limited generations/month) and paid plan (unlimited) via Clerk Billing
- **Usage Gating** — API routes check the user's plan before triggering any generation job

---

## E2B Sandbox

The `sandbox-templates/next-js/` directory contains the custom E2B sandbox template:

- Pre-configured Next.js environment ready to run generated code
- Dependencies pre-installed for fast sandbox boot times
- Each generation gets a fully isolated, clean sandbox instance
- Sandboxes auto-expire after the preview session ends — no cost bleed

---

## Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## Roadmap

- [ ] Multi-file project generation (pages, components, API routes)
- [ ] Chat-style iterative refinement (follow-up prompts on the same project)
- [ ] Export generated code as a downloadable ZIP
- [ ] Custom sandbox templates (plain React, Vue, Svelte)
- [ ] Public gallery of community-generated UIs
- [ ] Collaborative sessions — share your vibe session via link

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Contact

**Tirth Bhatt**

- GitHub: [@TirthBhatt1208](https://github.com/TirthBhatt1208)
- Live: [vibe-studio-five.vercel.app](https://vibe-studio-five.vercel.app)

---

<div align="center">

**If you find VibeStudio useful, please consider giving it a ⭐ on GitHub!**

Made with ❤️ by Tirth Bhatt

</div>