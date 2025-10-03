
### Path2Wellness — Patient Care Plan Management (ENT & Obstetrics)

A full‑stack web application for managing and delivering patient care plans in ENT and Obstetrics. It supports role‑based access for admins and patients, enabling secure authentication, care plan creation/editing, and patient‑friendly viewing.

## Features
- **Secure auth**: JWT-based login for admins and patients
- **Admin portal**: Create, update, and manage ENT and Obstetrics care plans
- **Patient dashboard**: View assigned care plans with a clean UI
- **Validated APIs**: Request validation and auth middleware
- **Modular services**: Clean separation of controllers, routes, and services

## Tech Stack
- **Frontend**: React (Context API, custom services, protected routes)
- **Backend**: Node.js, Express
- **Database**: MongoDB (via Mongoose models)
- **Auth**: JWT, role-based guards
- **Tooling**: PowerShell scripts for local testing, seed scripts

## Monorepo Structure
- `BACKEND/`: Express server, controllers, routes, middleware, models, seed/test scripts
- `FRONTEND/`: React app with auth, admin, and patient components

## Getting Started (Local)
1. Backend
   - `cd BACKEND`
   - `npm install`
   - Create `.env` with:
     - `MONGO_URI=<your_mongo_connection_string>`
     - `JWT_SECRET=<strong_secret>`
     - `PORT=5000` (optional)
   - (Optional) Seed users: `node scripts/seedUsers.js`
   - Run: `npm start`
2. Frontend
   - `cd FRONTEND`
   - `npm install`
   - Run: `npm start`
3. Open the app at `http://localhost:3000` (frontend). Backend runs on `http://localhost:5000`.

## Key Endpoints (Backend)
- `POST /api/auth/login` — Authenticate and receive JWT
- `GET /api/ent` | `POST /api/ent` — List/Create ENT care plans (admin protected)
- `GET /api/obstetrics` | `POST /api/obstetrics` — List/Create Obstetrics care plans (admin protected)

## Frontend Highlights
- `src/contexts/AuthContext.js` — Session and role management
- `src/components/common/ProtectedRoute.js` — Route guarding
- `src/components/admin/*` — Admin dashboard and modals to create/edit plans
- `src/components/patient/*` — Patient dashboards for ENT/Obstetrics
- `src/services/*` — API, auth, and domain services

## Scripts
- Backend: `npm start`, `npm run dev` (if configured), `node scripts/seedUsers.js`
- Frontend: `npm start`, `npm run build`

## Security & Validation
- JWT verification via `BACKEND/middleware/auth.js`
- Request validation via `BACKEND/middleware/validation.js`
- Mongoose models for `User`, `EntCarePlan`, `ObstetricsCarePlan`

## Roadmap
- Assign care plans to specific patients
- Audit logs for changes
- Role management UI
- Tests (unit/integration) for services and controllers

If you want, I can turn this into a polished `README.md` in your repo.
