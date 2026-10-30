# Lernmodul zur Kreiselpräzession

Lernmodul zum Experiment "Kreiselpräzession" (Versuch 4) des Grundpraktikums zur Experimentalphysik I der Georg-August-Universität Göttingen.

Students reach the module through ILIAS. It prepares them for the lab session in one linear path: the setup, the physics of rotation (angular velocity, angular momentum and torque as vectors), the physical pendulum, the gyroscope, precession, nutation and the measurement strategy. It ends with the experiment guide and a personal summary of the learning path.

<!-- The infrastructure (ILIAS bridge, PHP API, MySQL tracking, summary and HTML report) is taken from the [Pohl module](https://github.com/CVC97/Ilias-Pohl-Module) of the same group. Compared to it, this module has one linear path instead of two strands, no decision pages and no scored tests. A 3D Unity simulation of the gyroscope (separate repository `ilias-precession-simulation`) will be embedded on several pages; until then those pages show a placeholder. -->

The project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4, with strong help of Claude (Opus).


## Project Structure Tree

```
ilias_bridge.html                               // entry point from ILIAS; username + key form
.htaccess                                       // routing: /api/* → PHP, rest → index.html (RewriteBase / locally)
docker-compose.yml                              // local MySQL container (dev only)
.gitignore
README.md
│
├── .github/
│   └── workflows/
│           deploy.yml                          // CI/CD: build + SFTP deploy on push to master
│
├── tools/
│       make_figures.py                         // generates the drawn SVG figures in assets/images
│
├── api/                                        // PHP backend
│       config.php                              // DB credentials + module config (gitignored)
│       config.example.php                      // template for config.php
│       db.php                                  // PDO connection (singleton)
│       module.php                              // resolves MODULE_NAME → modules.id
│       router.php                              // local dev router (php -S only)
│       schema.sql                              // database schema (run once to initialise)
│       │
│       ├── users/
│       │       check.php                       // POST /api/users/check
│       │       create.php                      // POST /api/users/create
│       │
│       └── progress/
│               save.php                        // POST /api/progress/save
│               load.php                        // GET  /api/progress/{username}
│
└── frontend/                                   // Angular application
    │   angular.json                            // build configuration (stylesheets, icons, etc.)
    │   proxy.conf.json                         // dev proxy: /api → localhost:8000
    │
    └── src/
        │   index.html                          // app shell + MathJax configuration
        │   main.ts / main.server.ts / server.ts  // browser + (unused) SSR entry points
        │   build-info.ts                       // BUILD_TIMESTAMP; injected by CI at build time
        │   styles.css                          // main stylesheet (colours, layout, light/dark theme)
        │   styles_glossary.css                 // glossary pages
        │   styles_evaluation.css               // learning Q&A components
        │   styles_simulation.css               // simulation controls (for Phase 6)
        │   styles_target.css                   // target page
        │   styles_summary.css                  // Lernpfad summary accordion
        │
        ├── assets/                             // icons, images per page, downloadable guide
        │
        └── app/
            │   app.ts / app.html               // root component — layout shell, triggers loadProgress()
            │   app.routes.ts                   // client-side routing (all routes)
            │   app.routes.server.ts            // SSR render mode per route
            │
            ├── core/services/                  // project-wide services (see below)
            │
            ├── shared/
            │   ├── header/ footer/
            │   ├── nav-bar/                    // sidebar (drawer on mobile): segments and sub-pages
            │   ├── glossary-overlay/           // glossary popups opened from content links
            │   ├── sim-embed/                  // Unity sim in an iframe (postMessage bridge) + sim-presets.ts
            │   ├── sim-panel/                  // control panel below the sim: sliders, switches, buttons, readouts
            │   └── evaluation/                 // retryable Q&A types for learning pages
            │       │   question.types.ts
            │       └── single-choice/ multiple-choice/ multiple-choice-image/ image-choice/
            │
            └── features/
                ├── home/                       // start page
                ├── glossary/                   // glossary index
                ├── glossary_features/          // one component per glossary term
                ├── learning_features/          // p1–p7 learning pages
                └── target_features/            // tar-precession: guide download + summary
```


## Running Locally

**First-time setup** — copy and fill in the API config:
```bash
cp api/config.example.php api/config.php
# edit api/config.php with your local DB credentials; module_name = 'precession'
cd frontend && npm install
npm run fetch-sim        # the Unity simulation release pinned in ../sim.version → public/sim/
```

Three processes must be running simultaneously, each in its own terminal:

**1. Database (Docker):**
```bash
sudo docker compose up
```

**2. PHP API** (run from project root):
```bash
php -S localhost:8000 api/router.php
```

**3. Angular dev server:**
```bash
cd frontend && npx ng serve
```

Then open **`http://localhost:8000/bridge`** to start from the bridge page (registered user, progress is saved).
The Angular app is also accessible directly at **`http://localhost:4200`** (rogue user session, no DB writes).

**Developer helpers:** `Shift+Alt+D` toggles dev mode (all nav entries clickable, simulation gates open, preset and live state shown below each sim). `?solutions=1` shows the learning questions as solved (dev builds only).

**Tests:**
```bash
cd frontend
npx ng test --watch=false        # all unit tests
npm run test:learning            # Q&A components + consistency of question data, templates and report
```


## Deploying to the Server

### Automatic (CI/CD — primary method)

Pushing to `master` triggers `.github/workflows/deploy.yml`:
1. Installs Node, runs `npm ci`, fetches the simulation release named in `sim.version` (`tools/fetch-sim.sh`), builds the Angular app with `--base-href "https://interapt.uni-goettingen.de/precession/"`
2. Writes a production `.htaccess` (`RewriteBase /precession/`) into the build output
3. Uploads via SFTP: Angular dist incl. that `.htaccess` → `precession/`, `api/` (excluding `config.php`), `ilias_bridge.html`

**One-time setup** — add these secrets in GitHub → repo → Settings → Secrets and variables → Actions:
`SFTP_HOST`, `SFTP_PORT`, `SFTP_USER`, `SFTP_PASS`, `SFTP_REMOTE_DIR`

To skip the pipeline for a commit, include `[skip ci]` in the commit message. A deploy can also be started manually via **GitHub → Actions → Build & Deploy → Run workflow**.

### First-time server setup

Create `api/config.php` on the server (copy from `config.example.php`) with the production credentials, `module_name => 'precession'` and the course key. The database `interapt` is shared with the other modules; the `precession` row in `modules` is created automatically on first use.


## API

| Method | Endpoint | File | Description |
|--------|----------|------|-------------|
| POST | `/api/users/check` | `users/check.php` | Validate course key; check if username exists |
| POST | `/api/users/create` | `users/create.php` | Register a new user |
| POST | `/api/progress/save` | `progress/save.php` | Save page visits and question results |
| GET | `/api/progress/{username}` | `progress/load.php` | Load all saved progress for a user |


## Database Schema

| Table | Purpose |
|-------|---------|
| `modules` | One row per learning module (e.g. `precession`, `pohl`) — scopes all user data |
| `users` | One row per username per module |
| `page_visits` | Page visit durations per session |
| `module_results` | Learning question answers (retryable) |
| `test_results` | Test answers — unused in this module, kept for compatibility with the shared API |


## Project Services

- **theme.ts:** light / dark mode
- **session.ts:** reads `session_id` from the URL (set by the bridge), falls back to a `rogue_user_` identifier for direct access
- **analytics.ts:** page visit durations on route changes
- **results-tracking.ts:** learning question answers; allows retries, counts attempts
- **test-tracking.ts:** kept empty (no tests in this module); data-export, summary and report still read it
- **data-export.ts:** saves progress on `beforeunload`, loads it on startup; skips rogue users
- **summary.service.ts:** builds the Lernpfad summary; `MODULE_LABELS`, `PAGE_LABELS` and `PAGE_TOTALS` hold the display names
- **html-report.service.ts:** generates the downloadable HTML report (images embedded, answers coloured)
- **learning-report-registry.ts:** `PAGE_REGISTRY` — page content per route and sub-page for the report
- **dev-mode.ts**, **report-mode.ts**, **shuffle-order.ts**, **nav-drawer.ts:** helpers as in the Pohl module


## Adding a Learning Page

Every learning page needs, besides its component (`<page>.ts/.html/.css`) and its `<page>-content.ts` / `<page>-questions.ts`:

1. Route in `app.routes.ts`
2. Segment and sub-pages in `SEGMENTS` and the route in `segmentFromUrl()` (`shared/nav-bar/nav-bar.ts`)
3. Tracking ID in `MODULE_LABELS`, route in `PAGE_LABELS` and `PAGE_TOTALS` (`summary.service.ts`)
4. One `PAGE_REGISTRY` entry per sub-page (`learning-report-registry.ts`)
5. An entry in `PAGES` of `features/learning_features/learning-question-feedback.spec.ts`

Tracking and question IDs are stored in the database: choose them once and keep them.

Conventions: routes `learning/p<n>-<name>`, tracking IDs `p<n>-<name>-module`, question IDs `p<n>-<name>-<k>-<description>`. Notation follows the lab script: torque **D**, angular momentum **L**, moment of inertia **I**, tilt angle θ. All user-facing text is German with formal "Sie".


## Features

### Learning Path

One linear path of seven segments, followed by the target page. Questions are retryable and tracked.

- **p1-setup** → `/learning/p1-setup` — Einstieg: Versuchsaufbau (3 pages)

<details>
<summary>Questions (4)</summary>

  - `p1-setup-1-kreisel-teile`
  - `p1-setup-2-ausgleichsgewicht`
  - `p1-setup-3-messgeraete`
  - `p1-setup-4-erwartung`

</details>

- **p2-rotation** → `/learning/p2-rotation` — Grundlagen der Rotation (3 pages)

<details>
<summary>Questions (5)</summary>

  - `p2-rotation-1-omega-richtung`
  - `p2-rotation-2-drehzahl-drehimpuls`
  - `p2-rotation-3-ring-scheibe`
  - `p2-rotation-4-antriebsschnur`
  - `p2-rotation-5-drehmoment-aussagen`

</details>

- **p3-pendulum** → `/learning/p3-pendulum` — Trägheitsmoment: physikalisches Pendel (2 pages)

<details>
<summary>Questions (4)</summary>

  - `p3-pendulum-1-traegheitsmoment`
  - `p3-pendulum-2-annahmen`
  - `p3-pendulum-3-gegenueber`
  - `p3-pendulum-4-zehn-perioden`

</details>

- **p4-gyroscope** → `/learning/p4-gyroscope` — Der Kreisel (3 pages)

<details>
<summary>Questions (3)</summary>

  - `p4-gyroscope-1-l-richtung`
  - `p4-gyroscope-2-schneller-kreisel`
  - `p4-gyroscope-3-raumfest`

</details>

- **p5-precession** → `/learning/p5-precession` — Präzession (3 pages)

<details>
<summary>Questions (5)</summary>

  - `p5-precession-1-drehmoment-richtung`
  - `p5-precession-2-betrag-l`
  - `p5-precession-3-drehzahl`
  - `p5-precession-4-steigung`
  - `p5-precession-5-abhaengigkeiten`

</details>

- **p6-nutation** → `/learning/p6-nutation` — Nutation (3 pages)

<details>
<summary>Questions (3)</summary>

  - `p6-nutation-1-nutationskegel`
  - `p6-nutation-2-kegel`
  - `p6-nutation-3-drehzahl`

</details>

- **p7-measurement** → `/learning/p7-measurement` — Messstrategie und Fehlerquellen (3 pages)

<details>
<summary>Questions (4)</summary>

  - `p7-measurement-1-tr-vorher-nachher`
  - `p7-measurement-2-halbe-umdrehung`
  - `p7-measurement-3-sanft-einleiten`
  - `p7-measurement-4-fehlerquellen`

</details>


### Target Feature

- **tar-precession** → `/target/tar-precession` — Versuchsanleitung (`assets/target/Versuchsanleitung_Kreiselpraezession.pdf`) and the personal Lernpfad summary, downloadable as an HTML report.


### Simulation

The Unity simulation ([Ilias-Precession-Module-Simulation](https://github.com/CVC97/Ilias-Precession-Module-Simulation), module build) runs in an iframe from `<base>/sim/` (same origin) on six sub-pages. `SimEmbed` talks to it with `postMessage`: it sends the page's preset, keeps a loading overlay until that preset runs, and records every run for the page's gate; the "Weiter" button of that sub-page stays greyed out until the gate rule is met (dev mode and a failed sim load release it). All presets, controls, readouts and gate rules are in `shared/sim-embed/sim-presets.ts`.

| Preset | Page | Purpose | Controls | Gate |
|---|---|---|---|---|
| `p1-explore` | p1-setup (3/3) | first contact: the weight makes the axis turn sideways | weight on/off, Drehzahl | weight on + 2 rpm |
| `p2-vectors` | p2-rotation (2/3) | L and ω along the axis (simple top) | Drehzahl | 2 rpm |
| `p4-axes` | p4-gyroscope (2/3) | L, ω and figure axis visibly apart (simple top) | Drehzahl, Zeitlupe, Neu starten | 2 rpm |
| `p5-precession` | p5-precession (3/3) | ω_P ∝ 1/ω_R, independent of θ; readouts ω_R, ω_P | Drehzahl, Zusatzgewicht, Neigung | 2 rpm + 2 θ₀ |
| `p6-nutation` | p6-nutation (3/3) | nutation of the balanced gyroscope after a push, the three cones | Stoß, Drehzahl, Kegel | push at 2 rpm |
| `p7-release` | p7-measurement (2/3) | released vs. guided start | Loslassen, Geführt starten | both modes |

**Updating the simulation:** build *Web - Module - Release* in Unity, run `Tools/package-module-build.sh` in the simulation repo, commit and tag it (`module-sim-vX.Y.Z`), create a GitHub release for the tag with `Builds/ModuleWeb.zip` attached, then put the tag into `sim.version` here. `npm run fetch-sim -- path/to/ModuleWeb.zip` installs a local zip instead, to try a build before releasing it.


### Glossary Features

- **angular-momentum** ("Drehimpuls")
- **angular-velocity** ("Winkelgeschwindigkeit")
- **cones** ("Nutations-, Rastpol- und Gangpolkegel")
- **cross-product** ("Kreuzprodukt und Rechte-Hand-Regel")
- **figure-axis** ("Figurenachse")
- **instantaneous-axis** ("Momentane Drehachse")
- **moment-of-inertia** ("Trägheitsmoment")
- **newton-notation** ("Newtonsche Notation")
- **nutation** ("Nutation")
- **parallel-axis** ("Steinerscher Satz")
- **physical-pendulum** ("Physikalisches Pendel")
- **precession** ("Präzession")
- **torque** ("Drehmoment")


### Figures

Figures marked as such are taken from the lab script (Bild 4.1–4.3). The vector figures (`p2_rotation`, `p3_pendulum`, `p7_measurement`) are generated:
```bash
python3 tools/make_figures.py frontend/src/assets/images
```
