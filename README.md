# Supabase Compliance Checker

A full‑stack application that verifies whether a customer's Supabase configuration is set up properly for compliance. This project checks for:

- **MFA (Multi-Factor Authentication):**  
  Lists users using the Supabase Admin API and verifies if MFA is enabled (using a custom field in `user_metadata`).

- **Row Level Security (RLS):**  
  (Simulated) Checks if RLS is enabled on the necessary tables.

- **Point in Time Recovery (PITR):**  
  (Simulated) Verifies if PITR is enabled for projects.

Additionally, the application collects evidence (with timestamps) and can forward this evidence to a Delve endpoint. It also provides endpoints to simulate automatic fixes for detected compliance issues.

> **Important:**  
> - **Admin Endpoints:** The project uses Supabase Admin API endpoints (e.g., listing users) that require a Service Role Key. **Never expose this key in client‑side code.**  
> - **Delve Integration:** The Delve integration is simulated via a helper function. Replace the placeholder URL and API key with your actual Delve integration details if needed.

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Authenticate with Supabase:**  
  The customer provides their Supabase URL and Service Role Key so the backend can perform admin operations.

- **Compliance Checks:**  
  - **MFA Check:** Lists users and checks whether MFA is enabled by inspecting a custom `mfa_enrolled` field in `user_metadata`.  
  - **RLS Check:** (Simulated) Returns RLS status for tables.  
  - **PITR Check:** (Simulated) Returns PITR status for projects.

- **Evidence Collection:**  
  All scan results are collected along with a timestamp, and evidence is logged.

- **Delve Integration:**  
  The backend forwards the compliance evidence to a Delve endpoint (simulation). Replace with actual integration as needed.

- **Auto‑Fix Endpoints:**  
  Simulated endpoints allow the system to auto‑fix issues (MFA, RLS, and PITR) on demand.

## Folder Structure

Below is the complete folder structure for the project:

# my-supabase-compliance-app/
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       ├── routes/
│       │   ├── scan.ts
│       │   └── fix.ts
│       └── utils/
│           ├── supabaseClient.ts
│           ├── db.ts
│           └── delve.ts
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── results/
    │       └── page.tsx
    └── lib/
        ├── types.ts
        └── apiservice.ts


### Explanation

- **Backend:**  
  The backend is built using Node.js with Express and TypeScript. It contains two main routes:
  - **`scan.ts`:** Accepts Supabase credentials, runs compliance checks (MFA, RLS, PITR), collects evidence, and sends it to Delve.
  - **`fix.ts`:** Simulates auto‑fix actions for compliance issues.
  
  Utility functions are provided to create the Supabase client, simulate database checks, and integrate with Delve.

- **Frontend:**  
  The frontend is built using Next.js (with the App Router) and TypeScript. It provides:
  - A **Home page** (`page.tsx`) to capture customer credentials.
  - A **Results page** (`results/page.tsx`) to display scan results and provide auto‑fix actions.
  
  Shared types and API service functions are located in the `lib/` folder.

## Prerequisites

- **Node.js** (v14 or later recommended)
- **npm** or **yarn**
- A valid **Supabase project URL** and **Service Role Key** (required for admin endpoints)
- (Optional) Delve API credentials if you wish to integrate with Delve

## Backend Setup

1. **Navigate to the `backend/` folder:**

   ```bash
   cd my-supabase-compliance-app/backend
Install dependencies:

- ** npm install **
Run in Development Mode:

- ** npm run dev **
Or build and run in production mode:


- **npm run build**
- **npm start**
The backend server will run on port 3001 by default.

Frontend Setup
Navigate to the frontend/ folder:


cd my-supabase-compliance-app/frontend
Install dependencies:


- **npm install**
Start the Next.js Development Server:


- **npm run dev**
The frontend server will run on port 3000 by default.

Running the Application
Open your browser and navigate to:

http://localhost:3000
