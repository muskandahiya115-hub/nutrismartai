# Project memory

## Product intent & audience

- NutriSmart AI Wellness Website: modern, responsive frontend for health/nutrition tools.
- Core features: BMI calculator, daily calorie calculator, vegetarian meal planner, nutrition tips, contact form (saves messages to DB via backend).
- Target audience: health-conscious users interested in vegetarian nutrition and self-service wellness metrics.

## Brand personality & voice

- Wellness-focused, helpful, modern, trustworthy.
- Emphasis on vegetarian/healthy living; tone is encouraging and practical.

## Visual design & UX direction

- Green and cream color theme; keep existing design/layout/colors unchanged across updates.
- Built with Tailwind CSS; icons from `lucide-react`.
- React + Vite frontend; components imported via `@/` path alias (maps to `src/`).
- Responsive layout; production-quality, non-cookie-cutter UI expected.
- Calculators and meal planner have built-in offline fallback logic so the site still works if backend is unreachable.

## Decisions, constraints & rationale

- Backend: Express app deployed on Render at `https://nutrismartai-backend.onrender.com`.
- Frontend: deployed on Vercel.
- API base URL exposed to frontend only via Vite env var `VITE_API_BASE_URL`; all requests go through one shared API client (no hardcoded localhost).
- If `VITE_API_BASE_URL` is missing, calculators and diet planner fall back to local offline logic.
- Backend endpoint paths must match existing Express routes (e.g. health check, BMI, daily calorie, vegetarian meal plans, contact/message persistence).
- CORS: Render backend `CORS_ORIGIN` must be set to the Vercel frontend URL; verified live that BMI/health endpoints accept the deployed origin.
- Supabase service-role/secret keys are backend-only (Render env settings); never imported or exposed in frontend code.
- No UI/icon/theme packages beyond Tailwind + `lucide-react` unless explicitly requested.
- README must document Vercel env var (`VITE_API_BASE_URL`), fallback behavior, endpoint list, and the two-sided CORS/env checklist.

## Open questions & assumptions

- Exact Express route paths inferred from feature names; confirm full route list if backend contract changes.
- Assumed Vercel is the frontend host (env var instructions target Vercel); adjust if another host is used.
- Assumed contact form is the only DB-writing feature; verify if other features persist data.