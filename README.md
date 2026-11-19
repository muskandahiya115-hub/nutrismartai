# NutriSmart AI – Full-Stack Project

The project has two parts:

- **Frontend** (the repository root): a React + Vite website with the NutriSmart AI homepage, BMI and calorie calculators, vegetarian Indian diet planner, nutrition tips and contact form. It can run fully without the backend; the calculators work entirely in the browser.
- **Backend** (`server/`): a Node.js + Express API that exposes the same health tools over HTTP, serves the vegetarian Indian meal library, and permanently stores contact form submissions in a Supabase database.

The frontend design, colours, text and calculator behaviour are unchanged.

---

## Project structure

```
.
├── src/                  # React frontend (unchanged)
├── server/               # Express backend
│   ├── server.js         # App entry point: routes, CORS, error handling
│   ├── routes/           # health, bmi, calories, mealPlan, contact
│   ├── middleware/cors.js
│   ├── lib/              # Supabase client, validation helpers
│   ├── data/meals.js     # Vegetarian Indian meal library
│   └── .env.example      # Environment variables to copy
├── render.yaml           # Render deployment settings for the API
└── package.json          # Frontend scripts
```

---

## Running the frontend

```bash
npm install
npm run dev
```

The site opens on http://localhost:5173. A production build works with:

```bash
npm run build
npm run preview
```

The frontend never needs environment variables; everything currently runs client-side.

---

## Running the backend

```bash
cd server
npm install
cp .env.example .env   # then fill in the values (see below)
npm run dev            # or: npm start
```

The API starts on http://localhost:5000 (change with `PORT` in `server/.env`).

### Environment variables (`server/.env`)

| Variable | Required | Purpose |
| --- | --- | --- |
| `CORS_ORIGIN` | Yes | Comma-separated list of frontend URLs allowed to call the API, e.g. `http://localhost:5173,https://your-app.vercel.app` |
| `SUPABASE_URL` | Only for the contact form | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Only for the contact form | Your Supabase service role key (keep this secret) |
| `PORT` | No | Local port; Render sets it automatically |

If the Supabase variables are missing, every endpoint still works except `POST /api/contact`, which answers with a clear “storage not configured” error instead of crashing.

---

## API reference

All routes are prefixed with `/api`. Errors always return JSON: `{ "error": "message" }`.

### 1. Health check
`GET /api/health`

```json
{ "status": "ok", "service": "NutriSmart AI API", "uptimeSeconds": 42, "timestamp": "2026-11-19T10:00:00.000Z" }
```

### 2. BMI
`POST /api/bmi`

```json
{ "heightCm": 170, "weightKg": 65 }
```

Response:

```json
{
  "bmi": 22.5,
  "category": "Healthy weight",
  "tone": "green",
  "healthyWeightRangeKg": { "min": 53.5, "max": 72.0 }
}
```

### 3. Daily calories
`POST /api/calories`

```json
{
  "age": 28, "gender": "female", "heightCm": 165,
  "weightKg": 60, "activityLevel": "moderate", "goal": "maintain"
}
```

`activityLevel`: `sedentary`, `light`, `moderate`, `active`, `very-active`.
`goal`: `lose`, `maintain`, `gain`.

Response:

```json
{
  "bmr": 1345, "maintenance": 2085, "target": 2085, "goal": "maintain",
  "macros": { "protein": 104, "carbs": 261, "fat": 70 }
}
```

### 4. Vegetarian Indian meal plan
`GET /api/meal-plan?goal=balanced` — builds a random day plan (breakfast, lunch, dinner, snack) with totals.
`GET /api/meal-plan/meals?type=lunch&goal=balanced` — lists the meal library with optional filters.

`goal`: `weight-loss`, `balanced`, `muscle-gain`. `type`: `breakfast`, `lunch`, `dinner`, `snack`.

### 5. Contact form
`POST /api/contact`

```json
{ "name": "Asha Rao", "email": "asha@example.com", "topic": "Diet plan request", "message": "I would like a plan for pregnancy." }
```

Response: `201 { "ok": true, "id": "..." }`. Messages are validated server-side and stored in the `contact_messages` table.

---

## Deploying the backend on Render

1. Push this repository to GitHub, then in Render choose **New → Web Service** and select the repo.
2. Set **Root Directory** to `server` (the included `render.yaml` already describes this service).
   - Build command: `npm install`
   - Start command: `npm start`
3. Add the environment variables under **Environment**:
   - `CORS_ORIGIN` = your Vercel frontend URL (e.g. `https://nutrismart-ai.vercel.app`) plus `http://localhost:5173` for local testing, separated by commas.
   - `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` if you want the contact form to store messages.
4. Deploy. Render’s health check points at `/api/health`, so the dashboard shows when the API is live.
5. Any Vercel preview URL (`*.vercel.app`) is accepted automatically, so preview deploys work too.

## Deploying the frontend on Vercel

Import the repository into Vercel as a normal Vite project (framework preset: Vite, build command `npm run build`, output `dist`). Vercel automatically ignores the `server/` folder.

Add this environment variable under **Settings → Environment Variables** (Production, Preview and Development):

| Variable | Value |
| --- | --- |
| `VITE_API_BASE_URL` | `https://nutrismartai-backend.onrender.com` |

Vite only exposes variables that start with `VITE_`, and the backend URL is public information, so it is safe to ship in the frontend. Supabase secret keys (the service role key) are used only by the backend on Render and are never placed in frontend code or Vercel.

Without `VITE_API_BASE_URL` the site still works: the BMI and calorie calculators and the diet planner fall back to built-in browser logic, and the contact form shows a friendly message instead of saving to the database. Setting the variable switches all of these features to the live backend.

## Connecting the frontend to the backend

The frontend is already wired to the backend through `src/utils/apiClient.ts`, which reads `VITE_API_BASE_URL` and calls these endpoints:

- `POST /api/bmi` — BMI calculator
- `POST /api/calories` — daily calorie calculator
- `GET /api/meal-plan?goal=...` — vegetarian Indian diet planner
- `POST /api/contact` — contact form

After deploying both apps, make sure the two sides agree on origins:

1. In Vercel: `VITE_API_BASE_URL` = your Render URL (no trailing slash needed).
2. In Render: `CORS_ORIGIN` includes your Vercel URL, e.g. `https://nutrismart-ai.vercel.app`. Any `*.vercel.app` preview domain is accepted automatically.

Changing either variable requires a redeploy of that side to take effect.

---

## Notes

- The frontend was intentionally left untouched, so nothing about the current site changed.
- `contact_messages` is protected with row-level security: anyone may insert a message, but no one can read, edit or delete messages through the public database API — only this backend, with its secret key, can write them.
