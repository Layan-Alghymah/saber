# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### سابر (artifacts/saber)
- **Type**: React + Vite web app
- **Preview path**: `/`
- **Description**: Arabic RTL news fact-checking platform
- **Features**:
  - Homepage with news input and "تحقق" button
  - Animated loading screen with progress and source scanning animation
  - Result screen showing Verified/Misleading status, confidence %, explanation, official sources (SPA, government portals), and recommendation
  - Trending news page with filter tabs (all/verified/misleading) and confidence scores
- **Design**: Dark blue + green color scheme, RTL Arabic layout (Noto Kufi Arabic font), mobile-first
- **Logic**: Simulated AI results using predefined response pools (no real API)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
