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
