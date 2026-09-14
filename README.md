# Intentional — Milestone 1
Local-first PWA implementation of the frozen Productivity Core.

## Run
1. Install Node.js 22+.
2. `npm install`
3. `npm test`
4. `npm run dev`
5. `npm run build` for the static deployable `dist/` folder.

## Milestone 1 boundaries
Included: local IndexedDB schema, activity/occurrence model, 1/2/3 effort points, daily/weekly recurrence foundation, four domains, intentions, reflections, Deliberate Day derivation, Intentional Rest Day, immutable productivity events, JSON backup/restore, minimal Today UI, offline/PWA configuration.

Not yet included: game layer, Help Me Decide, Start/Now, reward currency, art, cloud sync, accounts.

## Architecture
`core/` is pure business logic. `application/` coordinates transactions. `storage/` owns Dexie and backup/restore. `ui/` is replaceable React presentation. Productivity events are the one-way future boundary to the game.

## Important
This is the first implementation pass. Before using it as the only copy of important personal history, run the automated suite after installing dependencies and perform the planned 7-day iPhone trial with frequent JSON backups.

## Milestone 2 game vertical slice
This build adds the first intentionally small game layer without changing the productivity-first architecture:
- Spark is derived idempotently from confirmed ProductivityEvents (task points, domain outcomes, Deliberate Day).
- 18×16 settlement grid with movable, collision-checked buildings.
- Opening state: overgrown Cottage + Carpenter; Furniture Store is a Carpenter construction goal.
- Carpenter has stable settlement improvements.
- Furniture Store has permanent basics plus four deterministic daily rotating items.
- 10×8 Cottage interior grid supports owned furniture placement and collision checks.
- NPC progress is persisted per building, with a lightweight relationship scaffold for later dialogue/backstory.
- Game data has its own Dexie tables and can never mutate Productivity Core records.
- Backup schema v2 includes game state and can still restore a v1 productivity-only backup.

The art is intentionally placeholder UI. This slice is for proving the loop before creating production game art.

## Cloudflare Workers deployment

This package is ready for Cloudflare Workers static-assets deployment.

- Install: `npm install`
- Build: `npm run build`
- Build output: `dist`
- Wrangler deploy: `npm run deploy`

`wrangler.jsonc` points Cloudflare at `./dist` and enables SPA fallback.

Before replacing a version already in use on your phone, make an in-app backup. This app is local-first and that browser's IndexedDB contains its current data.

## Building-entry root fix
The root application live query no longer subscribes to `npcProgress`, because NPC progress is bookkeeping and is not rendered by the current UI. Entering a building updates local Grow navigation first, then records the NPC interaction on the next event-loop turn. This prevents an NPC database write from participating in the same reactive render cycle as the building-entry state change.

## Carpenter fallback navigation
Grow includes a permanent `Carpenter` button beside Town and Home. It uses the same centralized building-entry route as the settlement Carpenter. Tapping the building remains the intended primary interaction; this control is the reliable fallback.
