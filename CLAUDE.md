# CLAUDE.md — Amaya Backend (coffee)

REST API + SSR admin panel for Amaya Roasting Co. Companion frontend: the
`coffee-react` repo. Live: `https://api.amaya.uz`.

## Stack
- TypeScript + Express 4, run via `ts-node` (dev) / compiled `dist` in Docker (prod)
- MongoDB Atlas + Mongoose 6 (external `mongodb+srv://`, no local DB)
- Auth: JWT in an httpOnly cookie (`accessToken`); express-session (Mongo-backed) for the admin panel
- Socket.IO for realtime; Multer for uploads; EJS for the `/admin` SSR views
- Security middleware: helmet, cors (allowlist), express-rate-limit

## Commands
- `npm run start:dev` — nodemon + ts-node
- `npm run build` — `tsc && node extra.js` (copies non-TS assets into `dist`)
- `npm run start:prod` — `NODE_ENV=production node dist/server.js`
- `npm test` — `vitest run` (unit tests for pure helpers)

## Layout
- `src/server.ts` — entry: loads env, validates required vars, connects Mongo, listens
- `src/app.ts` — Express app: middleware, CORS, sessions, rate limiting, routers, Socket.IO
- `src/router.ts` — SPA/API routes; `src/router-admin.ts` — EJS admin routes
- `src/controllers/` — request handlers; `src/models/*.service.ts` — business logic
- `src/schema/` — Mongoose models; `src/libs/` — types, enums, config, utils, Errors
- `src/views/` — EJS templates; `uploads/` — user-uploaded files served at `/uploads`

## Security notes (already in place — don't regress)
- Order prices are computed **server-side** from the DB, never trusted from the client.
- `accessToken` cookie is httpOnly + `secure` in prod; invalid/expired tokens → 401 (not 500).
- CORS is an allowlist from `CORS_ORIGINS` (defaults include amaya.uz + localhost:3000).
- Auth endpoints (`/member/login`, `/member/signup`, `/admin/login`) are rate-limited.
- Product search input is escaped before building a RegExp (`src/libs/utils/query.ts`) to
  avoid regex injection / ReDoS. Use `escapeRegExp` for any new user-supplied `$regex`.
- `server.ts` fails fast if `MONGO_URL`, `SESSION_SECRET`, or `SECRET_TOKEN` are missing.

## Environment
`.env` (dev) / `.env.production` (prod), loaded by NODE_ENV in `server.ts`:
```
PORT=4003
MONGO_URL=...
SESSION_SECRET=...
SECRET_TOKEN=...          # JWT signing secret
CORS_ORIGINS=https://amaya.uz,https://www.amaya.uz   # optional; comma-separated
```
Prod runs on port 4003 (behind nginx as `api.amaya.uz`); the code default is 3003.

## Deployment (Docker)
- Push to `master` → GitHub Actions (`.github/workflows/deploy.yml`).
- `check` job: `npm ci` → `npm test` → `npm run build`.
- `deploy` job: SSH to OCI (`ubuntu@141.147.164.154`), `git reset --hard origin/master`,
  `docker compose -f docker-compose.prod.yml build && up -d`, then curl `/product/all`.
- Runs as container `amaya-api` (image `amaya-api:latest`), published on `127.0.0.1:4003`;
  nginx (`api.amaya.uz`) proxies to it. `restart: unless-stopped`.
- Working dir on server: `/home/max/amaya-project/coffee`.
- **Uploads persist** via bind mount `./uploads:/app/uploads` (multer writes there, served
  at `/uploads`). Never bake uploads into the image; never remove that volume.
- `.env.production` lives on the server (gitignored), injected via compose `env_file`.
- Secrets: `OCI_HOST`, `OCI_USER`, `OCI_SSH_KEY`.
- Frontend (`coffee-react`) stays a static nginx build — not containerized.
- No longer pm2 (was `pm2 AMAYA` before the 2026-07 Docker migration).

## Conventions
- No emojis in code/commits. No `Co-Authored-By` in commits.
- Don't add comments/types to code you didn't change.
- Commit prefixes in use: `feat`, `fix`, `security`, `refactor`, `ci`, `chore`, `docs`, `test`.
