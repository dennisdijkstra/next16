# Next 16 Fullstack Project

Modern fullstack app with a Next.js frontend and an Express + Prisma backend.

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS
- Express (Node.js)
- Prisma
- PostgreSQL
- Redis

## Project Structure

- `client/` – Next.js frontend (auth pages, main app, UI components)
- `server/src/` – Express API (routes, controllers, middleware, services)
- `server/prisma/` – Prisma schema and migrations
- `server/generated/prisma/` – generated Prisma client code

## Getting Started

1. Install dependencies:

```bash
cd client && npm install
cd ../server && npm install
```

2. Create environment files:

- `client/.env`:
  - `NEXT_PUBLIC_API_URL`

- `server/.env`:
  - `PORT`
  - `DATABASE_URL`
  - `REDIS_URL`
  - `JWT_ACCESS_TOKEN_SECRET`
  - `JWT_REFRESH_TOKEN_SECRET`
  - `TOKEN_KEY`
  - `DOMAIN`
  - `SENDGRID_API_KEY`

3. Apply database migrations from `server/`:

```bash
npx prisma migrate dev
```

4. Run both apps in separate terminals:

```bash
# terminal 1
cd client && npm run dev

# terminal 2
cd server && npm run dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:<PORT>`

## Development

- Run `npm run lint` in `client/` and `server/`.
- Re-run Prisma migrations after schema changes.
- Regenerate build output in `server/` with `npm run build` when needed.
