# Lernmodul zur Kreiselpräzession

Lernmodul zum Experiment "Kreiselpräzession" (Versuch 4) des Grundpraktikums zur Experimentalphysik I der Georg-August-Universität Göttingen.

Students reach the module through ILIAS. It prepares them for the lab session in one linear path: the setup, the physics of rotation (angular velocity, angular momentum and torque as vectors), the physical pendulum, the gyroscope, precession, nutation and the measurement strategy. It ends with the experiment guide and a personal summary of the learning path.

<!-- The infrastructure (ILIAS bridge, PHP API, MySQL tracking, summary and HTML report) is taken from the [Pohl module](https://github.com/CVC97/Ilias-Pohl-Module) of the same group. Compared to it, this module has one linear path instead of two strands, no decision pages and no scored tests. A 3D Unity simulation of the gyroscope (separate repository `ilias-precession-simulation`) is embedded on six pages. -->

The project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4, with strong help of Claude (Opus).

This README says how to run, deploy and extend the module. **Why** it is built the way it is (concept, simulation design per page, the sim contract, pitfalls, open items) is in [design_notes.md](design_notes.md).


## Project Structure Tree

```
ilias_bridge.html                               // entry point from ILIAS; username + key form
.htaccess                                       // routing: /api/* → PHP, rest → index.html (RewriteBase / locally)
docker-compose.yml                              // local MySQL container (dev only)
sim.version                                     // simulation release used by fetch-sim and the deploy
.gitignore
README.md
design_notes.md                                 // decisions and their reasons, open items
│
├── .github/
│   └── workflows/
│           deploy.yml                          // CI/CD: build + SFTP deploy on push to master
│
├── tools/
│       fetch-sim.sh                            // simulation build → frontend/public/sim/ (npm run fetch-sim)
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
    ├── public/sim/                             // Unity simulation build (gitignored, from npm run fetch-sim)
    │
    └── src/
        │   index.html                          // app shell + MathJax configuration
        │   main.ts / main.server.ts / server.ts  // browser + (unused) SSR entry points
        │   build-info.ts                       // BUILD_TIMESTAMP; injected by CI at build time
        │   styles.css                          // main stylesheet (colours, layout, light/dark theme)
        │   styles_glossary.css                 // glossary pages
        │   styles_evaluation.css               // learning Q&A components
        │   styles_simulation.css               // simulation control panel
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

You need Docker, PHP 8 with `pdo_mysql`, Node.js 22 or newer, `curl` and `unzip`.

### First-time setup

```bash
git clone https://github.com/CVC97/Ilias-Precession-Module.git ilias-precession-module
cd ilias-precession-module
cp api/config.example.php api/config.php
```

Edit `api/config.php` so that it matches the Docker database from `docker-compose.yml`:

```php
'db_host'     => '127.0.0.1',       // not 'localhost': PHP would then look for a local socket, not the Docker port
'db_port'     => 3306,
'db_user'     => 'pohl_user',
'db_password' => 'pohl_password',
'db_name'     => 'interapt',
'module_name' => 'precession',
'module_key'  => 'test',            // the course key you type on the bridge page; any value locally
```

Install the dependencies and download the simulation (the release named in `sim.version`, into `frontend/public/sim/`, about 18 MB):

```bash
cd frontend
npm install
npm run fetch-sim
```

### Starting the module

Three processes, each in its own terminal, all started from the project root:

```bash
# terminal 1: database (the first start creates the tables from api/schema.sql)
sudo docker compose up

# terminal 2: PHP API
php -S localhost:8000 api/router.php

# terminal 3: Angular dev server
cd frontend && npx ng serve
```

Then open:
- **`http://localhost:8000/bridge`**: start like a student, via the bridge page (registered user, progress is saved)
- **`http://localhost:4200`**: the app directly (rogue user session, nothing is saved)

To empty the local database (deletes all users and progress; the tables are created again on the next `up`):

```bash
sudo docker compose down -v
```


## Deploying to the Server

### Automatic (CI/CD — primary method)

Which simulation build is live: `https://interapt.uni-goettingen.de/precession/sim/sim-version.txt`.

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

Every panel has the page's sliders in the first row, switches (only for helpers) below them, and a button row at the bottom with the page's buttons plus **Pause/Weiter** and, where there is a slider or switch, **Zurücksetzen** (back to the page's start values). From sim release `module-sim-v1.1.0` on, a slider change continues the running gyroscope instead of putting it back to its start pose.

| Preset | Page | Purpose | Controls | Gate |
|---|---|---|---|---|
| `p1-explore` | p1-setup (3/3) | first contact: the weight makes the axis turn sideways | Zusatzgewicht (0/30 g), Drehzahl | weight on + 2 rpm |
| `p2-vectors` | p2-rotation (2/3) | L and ω along the axis (simple top) | Drehzahl | 2 rpm |
| `p4-axes` | p4-gyroscope (2/3) | L, ω and figure axis visibly apart (simple top) | Drehzahl, Zeitlupe | 2 rpm |
| `p5-precession` | p5-precession (3/3) | ω_P ∝ 1/ω_R, independent of θ; readouts ω_R, ω_P | Drehzahl, Zusatzgewicht, Neigung | 2 rpm + 2 θ₀ |
| `p6-nutation` | p6-nutation (3/3) | nutation of the balanced gyroscope after a push, the three cones | Drehzahl, Zeitlupe, Stoß; one switch per cone (ω⃗ with Rast-/Gangpolkegel) | push at 2 rpm |
| `p7-release` | p7-measurement (2/3) | released vs. guided start | Loslassen, Geführt starten | both modes |

#### Updating the simulation

The simulation build is not in this repo. `sim.version` names a release of the simulation repo, and `npm run fetch-sim` (also run by the deploy) downloads its `ModuleWeb.zip`. A new simulation version therefore goes through a release. The commands assume that both repos sit next to each other; to get the simulation repo there (from the folder that contains `ilias-precession-module`):

```bash
git clone -b module-sim https://github.com/CVC97/Ilias-Precession-Module-Simulation.git ilias-precession-simulation
```

**When is this needed?** Only when something in the simulation repo changed (C# scripts, scene, assets). Changes in this repo alone, e.g. the control panel (`sim-panel/`) or the presets (`sim-presets.ts`), need no new build: commit and deploy as usual (step 7).

In the examples the new version is `module-sim-v1.2.0`; count up from the tag in `sim.version`.

**1. Build in Unity** (simulation repo, branch `module-sim`): *File → Build Profiles → Web - Module - Release → Build*, output folder `Builds/ModuleWeb`. Counting up the version in *Project Settings → Player → Version* helps to tell builds apart; the module itself only goes by the release tag.

**2. Pack** the build into `Builds/ModuleWeb.zip` (the file the release needs):

```bash
cd ../ilias-precession-simulation
Tools/package-module-build.sh
```

**3. Try it in the module** before releasing it. Pass the zip's path: without it, fetch-sim installs the release named in `sim.version`, i.e. the old build. (A relative path counts from where you type it.)

```bash
cd ../ilias-precession-module/frontend
npm run fetch-sim -- ../../ilias-precession-simulation/Builds/ModuleWeb.zip
npx ng serve
```

**4. Commit, tag and push** the simulation repo (stop `ng serve` with Ctrl+C first):

```bash
cd ../../ilias-precession-simulation
git add -A
git commit -m "…"
git tag module-sim-v1.2.0
git push origin module-sim module-sim-v1.2.0
```

**5. Upload the build to the release** of that tag: on GitHub *Ilias-Precession-Module-Simulation → Releases → Draft a new release*, choose the tag `module-sim-v1.2.0`, attach `Builds/ModuleWeb.zip` (the file name must stay `ModuleWeb.zip`), *Publish release*.

**6. Pin the release in the module** and check that it downloads. First write the new tag into `sim.version`, otherwise fetch-sim fetches the old release:

```bash
cd ../ilias-precession-module
echo module-sim-v1.2.0 > sim.version
bash tools/fetch-sim.sh          # same as npm run fetch-sim in frontend/
```

It should end with `Simulation module-sim-v1.2.0 → frontend/public/sim`. A `404` means the release or its `ModuleWeb.zip` is missing (step 5).

**7. Commit and push to `master`** in the module (or merge your branch into `master`, see *Deploying to the Server*):

```bash
git commit -am "Simulation module-sim-v1.2.0"
git push
```

The deploy downloads the release named in `sim.version` itself. If it doesn't exist, the deploy stops before uploading anything. Afterwards `https://interapt.uni-goettingen.de/precession/sim/sim-version.txt` shows the new tag.


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
