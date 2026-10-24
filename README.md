# Nexora AI

Nexora AI is a premium dark-themed AI SaaS platform. Phase 1 establishes the React frontend, TypeScript Express API, MongoDB connection, and shared workspace types. Authentication, AI generation, and the full 3D hero experience are not implemented in this phase.

## Prerequisites

- Node.js 20 or newer (Node.js 24 is supported)
- npm 10 or newer
- A MongoDB Atlas cluster and database user for running the API

## Monorepo structure

```text
apps/web       React, Vite, TypeScript, Tailwind CSS
apps/api       Express, TypeScript, Mongoose API
packages/shared Shared TypeScript types
```

## Install and configure

From the repository root:

```sh
npm install
```

Copy `.env.example` to `apps/api/.env`, then fill in `MONGODB_URI` with your own Atlas connection string. In Atlas, create a database user, allow your development IP in Network Access, and copy the driver's connection string from the cluster's Connect dialog. Replace its username, password, host, and database placeholders. URL-encode special characters in the password. Never commit the resulting `.env` file or expose it through frontend `VITE_*` variables.

## Development

```sh
npm run dev       # frontend and API together
npm run dev:web   # frontend at http://localhost:5173
npm run dev:api   # API at http://localhost:5000 (waits for MongoDB)
```

The API validates `PORT`, `NODE_ENV`, `CLIENT_URL`, and `MONGODB_URI` at startup. The health endpoint is [http://localhost:5000/api/health](http://localhost:5000/api/health); it reports API status, timestamp, and database connection status. The API does not start listening until MongoDB connects.

## Typecheck and production build

```sh
npm run typecheck
npm run build
```

The shared package builds first, followed by the API and frontend. No production collections or sample user data are created by this setup.
