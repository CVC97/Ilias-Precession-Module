# Design notes — Lernmodul „Kreiselpräzession"

What was built and why: the decisions behind the module and its simulation, for anyone (or any Claude session) who extends this module or builds the next one. **How to** set up, run, deploy and release the simulation is in `README.md`; this file doesn't repeat it.

Built with Claude by Carlo (physics education group, Göttingen), 2026-10-26 to 2026-10-30. It replaces the working documents `build_process.md` and `simulation_implementation.md`.

Related: the simulation repo ([Ilias-Precession-Module-Simulation](https://github.com/CVC97/Ilias-Precession-Module-Simulation), everything on `master`) has its own `design_notes.md` (physics model, module build, bridge, pitfalls) and README (release steps); the rough lab data are in its gitignored `experimental.md`. The infrastructure comes from the [Pohl module](https://github.com/CVC97/Ilias-Pohl-Module); its developer guide is `../ilias-pohl-module/.learning_module_readme.md`.


## 1 Status (2026-11-09)

Live at `https://interapt.uni-goettingen.de/precession/` with simulation release `module-sim-v1.3.0`. Four chapters (Der Kreisel with two sub-chapters) on seven routes with 20 sub-pages, 28 retryable questions, 13 glossary terms, seven embedded simulations (one of them the assembly game on p1, from `module-sim-v1.4.0`, built by Melissa Atik); the target page "Abschluss" with a free simulation, the summary and the HTML report. Open items: section 10.


## 2 Concept

### What the students prepare for

Versuch 4 *Kreiselpräzession* (Grundpraktikum Experimentalphysik I). In the lab they measure the wheel's moment of inertia three ways (geometry; physical pendulum, steps 1–2; precession, steps 4–5: T_P for half a turn with add-on weights 10–60 g, T_R before and after with a light barrier), and in step 6 the nutation period T_N against ω_R after a push to the balanced gyroscope. The Auswertung compares the moments of inertia and asks what the slope of ω_N vs. ω_R means.

### Decisions

| Decision | Why |
|---|---|
| **One linear path**, no strands, no decision pages | Pohl's two strands and decision pages served a choice between experiment and theory; here everything builds on the previous segment. |
| **No scored tests**, only retryable learning questions | In Pohl, tests were mainly a shortcut past the learning pages via the decision pages. Without those they'd be a lot of code (test components, scoring, end page) for a check the learning questions already do. `test-tracking.ts` stays, empty, because data export, summary and report read it. |
| **Infrastructure copied from Pohl as it is** (bridge, PHP API, MySQL tracking, summary, report) | Proven, shared database `interapt`; web development is a means to an end here. Don't modernise or refactor copied code. |
| **One 3D Unity simulation, embedded on six pages** with a preset each | The point of the module is to *see* L⃗, ω⃗ and D⃗ in 3D and how they move. The sim is the main tool, not a side path. |
| **Sim embedded last**, pages first built with placeholders | Content work didn't wait on Unity; the page texts were written as if the sim were there. |
| **No Versuchsanleitung**; the target page is "Abschluss": a free simulation, then the Lernpfad summary | No guide is planned (Carlo, 2026-10-30). The free simulation lets students try the whole experiment as they'll see it in the lab, without helpers: a check whether the picture has stuck. On the target page rather than as an eighth segment (less registration, and the page needs substance without the guide) or as a separate entry (students would jump there before the path). |
| **Nav-bar: every visited page can be opened again** (dev mode: all) | The path is linear and gated, so anything visited has passed its gates; going back to a page or the free simulation shouldn't mean clicking through. Pohl's nav is clickable only in dev mode. Visited pages: `VisitedPages`, per session id in localStorage plus the visits from the saved progress. |
| **Nav-bar as a line of stations: a box means clickable** (Carlo, 2026-11-01) | The path is linear, so the nav shows it directly: Startseite (house) → numbered segments → Abschluss (flag) on one line, with no "Lernweg" label (Pohl's strand switcher reduced to one tab looked like a button). Before, only the mouse cursor told clickable from locked, which phones don't have. Visited rows keep a box with a filled marker; locked rows have no box, grey text and a hollow marker, and are `disabled`. Line and markers use the text's navy, not the lighter blues; the line stays dark through the open segment down to the next node, also past locked sub-pages (Carlo). No `transform` as press effect on the rows: it would move the marker and the piece of line with them. The `(1/3)` prefixes stay. |
| **No floating card: nav, main area and boxes are three surfaces** (Carlo, 2026-11-01) | A rounded inset card contradicted the full-height line between nav and content. Now the main area runs from header to footer, one step lighter than the nav (`--bg-primary` < `--bg-main` < `--card-bg`), and the line stays; the footer takes the nav's colour and the same line along its top. `.card` no longer draws a box: it is the centred 62 rem column, which saved touching 23 templates. **The nav stays off the Startseite** (Carlo), also so the Pohl module can take this design over without changing its start page. |
| **15 px base font, hyphenated justified text** (Carlo, 2026-11-01) | The text stays justified; hyphenation (`hyphens: auto`, not for headings and nav labels) keeps the word gaps small. The base size is set once on `html` (93.75 %, phones 100 %), so text, spacing and the rem-based column scale together. With the 62 rem column (870 px of content) lines reach about 100 characters: don't go wider or smaller. "Weiter" and "Zurück" together fill the column, each taking half minus the gap; a lone button keeps its half on its own side. |
| **Question boxes and the sim panel follow the theme** (Carlo, 2026-11-01) | Replaces Pohl's "stay light in dark mode": they were glaring white blocks on the dark page. All surfaces read theme tokens. Only the Unity canvas and the figures stay light (each figure has its own white plate). The HTML report has its own CSS and paper stays white. |
| **Lab → simple top → lab** (Carlo) | p1 meets the real apparatus; p2 and p4 show the fundamentals on a simple top without counterweight and string around the arrows; p5 bridges back (the add-on weight takes the role of the top's own weight); p6, p7 are the lab's own experiments. |
| **Fewer chapters in the nav, same routes** (collaborators and Carlo, 2026-11-02) | Trägheitsmoment is pages 4–5 of Grundlagen (5 sub-pages are still fine), Präzession and Nutation are sub-chapters of Der Kreisel: indented rows with a dot on the line (merged, Der Kreisel would run to 1/9). `SEGMENTS` (`shared/nav-bar/segments.ts`) holds this and also feeds the start page's list. **Routes, question and tracking IDs stay** (`p3-pendulum` is now only an internal name), so saved visits stay valid; the summary shows p3's pages as 4/5 and 5/5 via `PAGE_OFFSETS`. Portable to Pohl: `SegmentDef.icon` and `sub`. |
| **Stopwatch instead of a number on Messstrategie** (Carlo, 2026-11-02) | The chapter is about measuring, and fewer numbers remain. Not Pohl's wrench: it marks "Versuchsaufbau" there, which here is chapter 1, still numbered. The start page's list uses the same markers, so the numbers match the nav; the Pohl module's list has the same circled numbers. |
| **One word per quantity, symbol right after it** (collaborators and Carlo, 2026-11-02) | `Winkelgeschwindigkeit` with the page's symbol (ω on p2, ω₁ on p4, otherwise ω_R; a magnitude is not ω⃗). "Drehzahl" remains only for what the slider is called: its label, gate hints, tasks in the form "(Regler „Drehzahl“)", the free simulation's list of sliders, the glossary's definition. No "Drehsinn", no "Drehgeschwindigkeit". Symbol at the first mention per page and in every question and feedback text; headings and nav labels are exempt. |
| **The Lehrportal's video on p1, a plain YouTube embed** (collaborators and Carlo, 2026-11-02) | It shows the experiment and its purpose and replaces Bild 4.1 on page 1. No "Weiter" gate and no link to YouTube on the page; the report, which cannot embed it, carries the URL. The labelled photo stays on page 2, where it serves as a reference beside the component list, and question 1 moved there with it. |
| **Assembly game on p1's "Komponenten" page, gated** (Carlo, 2026-11-09; the game: Melissa Atik) | The students build the lab gyroscope in the sim (parts onto markers, a distractor Pendelgewicht, balancing, add-on weight, spin up, let go). It sits between the component list with the photo (the reference) and the light bulb box on balancing, before the three questions, which it prepares: what the axle carries, what the counterweight does, where the light barrier measures. Not a sub-page of its own: inserting one would shift `?page=3`, which saved visits and `p1-explore` refer to. "Weiter" waits until the gyroscope was let go once. |
| **Never spoil the Auswertung** | The slope of ω_N vs. ω_R is I₃/I₁ for a fast gyroscope (Auswertung 5), and the moments of inertia are to be compared. No text, readout, preset or fit gives either, not even numerically: the sim reports no moments of inertia, there is no T_N readout, the cones show I₁/I₃ only geometrically. Segment 6 says only that ω_N ∝ ω_R and that the slope is dimensionless. |

### Learning path

Chapters as the nav shows them: 1 = `p1`, 2 = `p2` + `p3`, 3 = `p4` with the sub-chapters `p5` and `p6`, stopwatch = `p7`. The numbers below are the routes.

| # | Route | Content | Sim |
|---|---|---|---|
| 1 | `p1-setup` | apparatus, what is measured and why | `p1-explore` |
| 2 | `p2-rotation` | ω, L = Iω as vectors, D = r × F, dL/dt = D | `p2-vectors` |
| 3 | `p3-pendulum` | moment of inertia from the physical pendulum, why two opposite positions | — |
| 4 | `p4-gyroscope` | the three axes, Euler's equation in plain terms | `p4-axes` |
| 5 | `p5-precession` | D ⊥ L turns L; ω_P = D/(L sin θ) = m_z g r/(I ω_R) | `p5-precession` |
| 6 | `p6-nutation` | Nutations-, Rastpol-, Gangpolkegel; ω_N grows with ω_R | `p6-nutation` |
| 7 | `p7-measurement` | friction (T_R before/after), half a turn, guiding the gyroscope gently into precession | `p7-release` |
| — | `target/tar-precession` | Abschluss: free simulation, summary, HTML report | `free-lab` |

The order follows the physics, not the lab (which starts with the pendulum).

### Notation and figures

- Lab notation from the script: torque **D** (the script's figures say T; the module says so where a figure shows T), angular momentum **L**, moment of inertia **I**, tilt θ. In segment 4 the indices follow Bild 4.2 (1 = figure axis, 2 = perpendicular).
- θ is the angle between L⃗ (the wheel side) and the vertical, in the texts and in the sim.
- **Colours are the sim's everywhere** (sim and drawn figures): ω uni-blau-1, L uni-blau-3, D physik-gelb, ω_P / precession jura-rot, forces and figure axis graphite. Students must not see L in two colours. The two blues stay (critique from the 2026-11-02 meeting; contrast 3.5:1, lightness 22 vs. 56). Colour means quantity, so apparatus never takes a vector's colour: the figures' stand is metallic grey.
- Every figure has a caption, except the answer options of image questions. Vectors drawn beside the axis for legibility say so there (p2 L⃗ and ω⃗, p5 r⃗).
- Drawn figures are generated SVGs (`tools/make_figures.py`). The script's Bild 4.2/4.3 are redrawn for the **lab case** (I about the pivot ⊥ figure axis ≈ 0.05 kg m² > I about the figure axis ≈ 0.01 kg m²: ω⃗ lies between figure axis and L⃗, the Gangpolkegel rolls on the outside), stated only as an ordering, never as a ratio. Only the setup photo Bild 4.1 is from the script.


## 3 Simulation: architecture

### Two builds in one repo

The simulation repo has the **original** sim (GitHub Pages, tags `sim-v*`, a heavy top on a tip, `WebBridge` with `SetTheta0`/`SetPhiDot0`/`SetShowTorque`) and the **module build** (same `master`, scene `Assets/Module/ModuleScene.unity`, build profile *Web - Module - Release*, `ModuleWebBridge`, tags `module-sim-v*`). The module uses only the module build; the original's names don't exist there.

The module build has two apparatus, chosen by the page: `lab` (the lab gyroscope with counterweight and add-on weight in the notch, r = 0.27 m) and `top` (a simple top, disk on an axle, tip on a tower). It has no Unity UI: the page provides all controls. From `module-sim-v1.4.0` it also has the **assembly mode** (Melissa Atik's game, merged from her fork into the sim repo's `master`), started by the page's preset. Opened directly, without a page, the build starts in the game with its own Unity panel; embedded it never does (`window.parent !== window`).

### Embedding

- **iframe, same origin** (`<base>/sim/index.html`): leaving the page removes the iframe, which frees the WebGL context and WASM heap reliably (Unity's in-page `Quit()` tends to leak); no SSR guarding of Unity code; Unity's globals and keyboard capture stay isolated; origin checks are trivial; student IPs don't go to third-party hosts (GDPR).
- **Messages** via `postMessage`, both sides check origin and `source`/`type`; the sim's template has an allowlist of commands and queues those that arrive before Unity runs.
- **Deploy: the build is a GitHub release of the sim repo, pinned in `sim.version`** (option B). The 18 MB build isn't committed here, and CI can't build Unity. The deploy mirrors the build folder with `--delete`, so the sim must be part of the upload: `tools/fetch-sim.sh` puts it into `frontend/public/sim/` before `ng build`. A missing release stops the deploy before anything is uploaded. Each module version thereby pins its sim version.

### Module side

| Piece | What it does |
|---|---|
| `shared/sim-embed/sim-presets.ts` | **The single config**: per embed the complete preset, controls, readouts, gate rule and gate hint |
| `SimEmbed` | iframe (browser only), loading overlay with the sim loader's percentage, sends the preset, records segments for the gate. The preset waits for the first `state` after `ready` (so the run number before it is known); the overlay stays until a newer run arrives. **Failure releases the gate** (no WebGL 2, the loader's error, or 30 s without progress or `ready`; a late `ready` still recovers): never block a student on technology. |
| `SimPanel` | renders the controls from the config, readouts, hints (`spinLimited`, mouse hint on non-touch devices, gate hint) |
| `SimGateService` | reached gates in `sessionStorage`, so coming back via "Zurück" doesn't lock "Weiter" again |


## 4 The sim contract, in short

Full detail: `ModuleWebBridge.cs` and `ModuleGyroscopeController.cs` in the sim repo.

- **Page → sim** `{source:'precession-module', type:'command', cmd, value}`. **Sim → page** `{source:'precession-sim', type:'ready'}` once, then `type:'state'` at ~10 Hz (real time, also while paused) with `run, segment, time, apparatus, thetaDeg, phiDeg, phiDot, omegaR, omegaP, addOnMassGrams, paused, spinLimited`.
- **`ApplyPreset`** is a complete state and always one restart. **Missing keys take the sim's defaults, not the previous values, and the default helpers are on** (L, ω, D, labels, all cones, trail). Every preset therefore sets all 13 `show` flags (a test checks it) and every push strength it relies on.
- **`SetHelpers`** is partial (only the named flags), no restart.
- **`SetApparatus`, `SetStartMode`, `Restart`** restart the run (`run` + 1, trail cleared, `time` from 0).
- **`SetRpm`, `SetAddOnMassGrams`, `SetTheta0Deg` continue the run** (from v1.1.0; Carlo: a slider must not put the gyroscope back to its start pose). The model is rebuilt with the new values and takes over the state: azimuth φ, wheel angle ψ, θ̇; a new θ₀ tilts the axle at its current azimuth. In guided mode φ̇ shifts by the change of the steady precession rate, so a calm precession stays calm (p5's ω_P is steady at once) and nodding keeps its deviation (p6's nutation goes on after an rpm change, faster and narrower). `segment` + 1, `time` and trail go on. The module records gate entries and restarts the ω_P average per `segment` (falling back to `run` for older builds, where these commands restarted).
- **`SetTimeScale`, `SetPaused`, `SetFriction`**: no restart. `time` is simulated time (stops while paused, slows in slow motion). `SetFriction` takes a factor of the apparatus' lab friction (τ = 120 s; 0 = none, 1 = what the old on/off switch gave), the preset key is `frictionFactor` (from `module-sim-v1.2.0`; older sims ignore the key and read the command's value as on above 0.5).
- **`Push`** (Stoß) changes θ̇ and φ̇ at that moment with the current strengths (`pushThetaDot`, `pushPhiDot`). They come with the preset or, from v1.3.0, alone via `SetPushThetaDot` / `SetPushPhiDot` (no restart); older builds drop those commands. Several `Push` in one physics step count once, so repeated pushes don't make a stronger one. Sent right after `ApplyPreset` it hits the new run (p4).
- **Start modes:** *guided* starts in steady precession (φ̇₀ = steady rate, almost no nodding); *released* starts with the axle at rest (dips ∝ m_z/ω_R², cusps in the trail). Too slow for steady precession, guided silently falls back to released.
- **Readouts:** `phiDeg` is continuous (not wrapped); `omegaP` is instantaneous (average it via `phiDeg`/`time`); `spinLimited` means the drawn spin is slower than the real one (hint "Darstellung der Raddrehung verlangsamt").
- **Physics gating in the sim:** the precession cone only with torque; nutation, Rastpol- and Gangpolkegel only without (0 g) and only after a push.
- **Ranges:** lab up to 800 rpm, θ₀ 60–120° (beyond, the wheel hits the stand), arrows scaled for ~400 rpm. Top up to 3000 rpm, θ₀ 20–100°, **no collision handling**: below ~600 rpm at 60° it falls through its tower.
- **Assembly game** (from v1.4.0): `ApplyPreset` with `mode:"assembly"` starts it (the sim then sets apparatus, values and helpers itself and takes only `timeScale` and `paused`); any other preset ends it and puts every part back. Parts are placed in the canvas (mouse or finger, `Pointer`); the page sends `AssemblyBalance` (counterweight in m, only in the balance phase; the panel's slider is in cm) and `AssemblyAction` `"spin"` / `"release"`. The sim answers every event with `type:'assembly'`: `phase` (build, balance, weight, spin, released), `placed`, `slots`, `selected`, `event`, `part`, `slot`, `seq`. The page writes the hint from event, part and marker (`shared/sim-embed/assembly-hints.ts`). The template also passes `AssemblySelect`, `AssemblyPlace`, `AssemblyReset`, `SetCameraView` (unused by the page). The usual `state` messages keep coming; the release restarts the run.
- **Camera:** mouse drag/zoom only, no touch rotation, no camera command (the assembly game's prepared views aside); default yaw 50°, pitch 35° (the start pose φ = 0 would otherwise point the axle at the camera). One light look, no dark theme.


## 5 Embed and panel design rules (decided)

1. **One learning target per embed.** The sim answers the page's task and nothing else; p5's three tasks are one experiment with three knobs.
2. **Helpers off by default**; a preset switches on only what the target needs.
3. **At most three controls that change the experiment** (sliders and action buttons), in lab language (Drehzahl in U/min, Zusatzgewicht, Neigung, Zeitlupe, Stoß, Loslassen / Geführt starten); the page text uses Winkelgeschwindigkeit and names the slider where a task needs it. Helper switches don't count.
4. **Parameters are always sliders**, also two-valued ones (p1 weight 0/30 g). **Switches only show or hide helpers**, off state grey (not Pohl's red: off isn't an error), one switch per helper (p6: one per cone; ω⃗ comes along with the Rastpol- or Gangpolkegel, the line where they touch).
5. **Panel layout:** sliders in the first row, switches below, readouts, then one button row: the page's buttons, **Pause/Weiter** (always), **Zurücksetzen** (back to the page's start values; only where there is a slider or switch to reset). Phones: sliders and switches stacked, two buttons per row. Restarts and pushes resume a paused sim; slider changes keep it paused (set up, then continue).
6. **Sliders that change the run send on release**; the Zeitlupe slider follows while dragging.
7. **Explanations stay in the page text** (German, MathJax, tracked); the sim shows symbols only. Readouts only where the task needs a number (only p5: ω_R and the averaged ω_P; no T_P and no product, so students find ω_P ∝ 1/ω_R themselves).
8. **Gate:** the sub-page's "Weiter" is shown greyed out until the gate rule holds, **never hidden** (Carlo; also applied to the Pohl module). A short italic hint under the panel says what's needed. Dev mode and a failed load release it.
9. **The free simulation is the one exception** (`free: true` in the config): all lab parameters, no gate, no control limit, no helpers or readouts. Its bearing friction is a slider like every parameter ("Lagerreibung", 0–5 × the lab value, 0 at the start; Carlo replaced the earlier on/off switch); like Zeitlupe it acts while dragging.
10. **The assembly game is played in the canvas.** The panel only adds what the canvas can't: the Ausgleichsgewicht slider (follows while dragging, so the axle tips as it moves), Andrehen and Loslassen. They are greyed out outside their phase (`SimEmbed.available`), never hidden. The hint line for the next step is the panel's first row, right below the canvas. Zurücksetzen puts every part back on the tray.


## 6 The seven embeds

| Embed (page) | Target | Preset essentials | Controls | Gate |
|---|---|---|---|---|
| `p1-assembly` (p1-setup 2/3, after the component list) | where each part sits and what it does; balanced, the axle stays put; with the add-on weight and no spin it tips | `mode: 'assembly'` (the sim sets the rest: lab, 0 rpm while building, 30 g, released at 400 rpm), counterweight slider at 11 cm | Ausgleichsgewicht 8–24 cm (step 0.5; balance ≈ 17.3 cm, the sim accepts ± 4 mm), Andrehen, Loslassen; parts in the canvas | let go once |
| `p1-explore` (p1-setup 3/3) | the phenomenon without theory: with the weight the gyroscope doesn't tip but turns sideways, the slower the wheel the faster | lab, 400 rpm, **0 g** (the "before" of the prediction question), guided, no helpers | Zusatzgewicht 0/30 g, Drehzahl 150–800 | weight on + 2 rpm |
| `p2-vectors` (p2-rotation 2/5; right after the figure, because the questions below would otherwise answer its target beforehand) | L⃗ and ω⃗ along the axis, same direction, ∝ rpm | top, 2400 rpm, 60°, L, ω, labels | Drehzahl 1500–3000, Zeitlupe (slower precession makes the arrows easier to compare; same top as p4) | 2 rpm |
| `p4-axes` (p4-gyroscope 2/3) | figure axis, L⃗ and ω⃗ are three directions when the axis moves; they close in with more spin | top, 1000 rpm, 60°, `pushPhiDot` 4 then `Push`, Zeitlupe 0.25, L, ω, figure axis, labels | Drehzahl 1000–3000, Zeitlupe | 2 rpm |
| `p5-precession` (p5 3/3) | ω_P ∝ 1/ω_R, independent of θ; D⃗ horizontal, ⊥ L⃗ | lab, 400 rpm, 30 g, 90°, guided (steady readout), L, D, vertical axis, precession cone, labels; ω⃗ off (on top of L⃗ for a fast gyroscope) | Drehzahl, Zusatzgewicht 10–60 g, Neigung 60–120° | 2 rpm + 2 θ₀ |
| `p6-nutation` (p6 3/3) | the lab's step 6: nutation of the balanced gyroscope after a push; more spin → faster, narrower; the three cones of Bild 4.2 | lab, 0 g, 200 rpm, still until the first Stoß (`pushThetaDot` 2), L, figure axis, Nutationskegel, labels | Drehzahl 150–600, Zeitlupe, Stoß; switches per cone | a push at 2 rpm |
| `p7-release` (p7-measurement 2/3) | released: dip and cusps; guided: smooth precession (why the script says "guide it in gently") | lab, 250 rpm, 40 g, released, trail only | Loslassen, Geführt starten | both modes |
| `free-lab` (target page) | free experimenting, the experiment as seen in the lab | lab, 400 rpm, 30 g, 90°, guided, `pushThetaDot` 2, nothing shown | Drehzahl, Zusatzgewicht 0–60 g, Neigung; Stoßstärke 0.5–4 rad/s (up/down only, as in the lab; needs sim v1.3.0), Lagerreibung 0–5 ×, Zeitlupe; Stoß (start always guided: Loslassen / Geführt starten removed as too much, that comparison is p7's) | none |

Choices that came from measurements (2026-10-30, test page and headless Chrome):
- `TOP_MIN_RPM = 1000` (p4): with the sideways push the top *rises* (60° → 30° at 1000 rpm); slider changes mid-run reach at most 85.6° (2000 random sequences), inside the top's 20–100°.
- p6: Stoß 2 rad/s gives ±27° at 200 rpm, ±10° at 600 — both trends visible.
- p7: 250 rpm / 40 g makes the released dip ≈ 10° (only ≈ 3° at 400 rpm / 30 g).
- p5: ω_P 0.203 rad/s at 400 rpm, 0.101 at 800, unchanged at 70°.
- p6 variant chosen: balanced + Stoß (the lab's experiment, the only way to show the cones), not "released with weight" (that is p7's topic).

Unused on purpose: friction on the learning pages (sub-page 1 of p7 has no sim; only the free simulation has it), `precessionArc` and `precessionVector` (rejected), any T_N or I-ratio readout. The free simulation adds no spoiler risk beyond p6: timing the nutation with a phone stopwatch was already possible there.


## 7 Pitfalls and lessons

- **Preset defaults are "on"** (see 4): a missing `show` key shows a helper.
- **Push sign quirk:** positive `pushThetaDot` raises the wheel on `lab` but lowers the disk on `top`. Only p6 uses it (lab, positive).
- **`frontend/public/` is not served by default** in this Angular setup (`assets` only had `src/assets`): `angular.json` maps `public/sim` → `sim`.
- **Local DB:** `db_host` must be `127.0.0.1`; with `localhost` PHP looks for a Unix socket instead of the Docker port.
- **Screenshots of the Unity canvas** in headless Chrome need `--use-angle=swiftshader --enable-unsafe-swiftshader` (WebGL 2). Puppeteer is a devDependency; theme via `localStorage.theme`, dev mode via `sessionStorage.devMode` before load.
- **Physics checks without Unity:** `GyroscopeModel.cs` is plain C#: run it and the EditMode tests with `dotnet` (NUnit), and compile the sim's scripts with `dotnet build Assembly-CSharp.csproj` (Unity-generated) while the editor holds the project lock.
- **The sim's state is the truth for gates**, but the panel shows `current` (what the page sent): the sim's reply lags by up to 100 ms.
- **Unity's `.unityweb`** works on the university's Apache with the decompression fallback, no `Content-Encoding` rules needed (checked live).
- **Angular TestBed:** a spec can't create a second test module; switch `config` on the existing component instead.
- **Stale component after template or CSS edits:** a long-running `ng serve` showed the new header in the server-rendered HTML, then the old one after hydration (2026-11-01; a fresh server with `--no-hmr` was correct). If a change seems missing, restart `ng serve` before debugging it.


## 8 Reusing this for another module or simulation

Generic and reusable as they are: `SimEmbed` (loading, failure, gate recording), `SimPanel` (slider / switch / button rows, readouts, Pause/Zurücksetzen), `SimGateService`, the greyed-out gated "Weiter", `VisitedPages` with the nav-bar rule and the line of stations (any linear module), `tools/fetch-sim.sh` with `sim.version` and the release flow (README), the deploy step.

To adapt: the message `source` names, the state fields and commands (`SimState`, `SimCommand`, `SET_COMMAND`), the readouts, and `sim-presets.ts`. On the Unity side the pattern is: a bridge MonoBehaviour with one method per command, a `.jslib` that posts JSON to `window.parent`, a WebGL template that checks origin and allowlist and queues commands until Unity runs, `ApplyPreset` as a complete state with explicit defaults, a run counter (and a segment counter if parameters can change without a restart).

Design the presets page by page *before* the code: one target, the fewest controls and helpers, the matching page text, the gate. That was the most valuable step.


## 9 Conventions for extending the module

Registering a learning page: README, *Adding a Learning Page*. Beyond that:

- Content lives outside the components: `<page>-content.ts` (HTML + LaTeX strings), `<page>-questions.ts`; the report registry imports the same strings, so texts and the HTML report stay in sync. LaTeX with double backslashes (`$\\omega_P$`).
- Links in content strings: `<a data-glossary="slug" class="glossary-link">`, `<a data-route="/learning/x" data-query="page=2" class="glossary-link">`, handled by the page's click listener.
- Sub-pages via `?page=N` (`currentView` + `route.queryParams`). Control flow `@if` / `@for`.
- SSR is built but not deployed: still guard `window`, `document`, storage with `isPlatformBrowser()`.
- Colours only via the CSS variables in `styles.css`, also in question boxes and the sim panel (dark mode; `styles_summary.css` has the summary's own); breakpoints 600 / 900 / 1200 px; overrides in the component CSS. A block placed outside `.card` needs the column itself (see `.summary-container`).
- Question IDs and tracking IDs are stored in the database: choose once, never change. Retryable types: single-choice, multiple-choice, multiple-choice-image, image-choice (Pohl's learning drag-and-drop is an empty stub).
- Student-facing text: German, formal "Sie". Wording of quantities and symbols: section 2.


## 10 Open items

- **Assembly game, release and QA:** needs `module-sim-v1.4.0` in `sim.version` (until then the live sim would ignore `mode` and show a running lab gyroscope on p1 page 2 whose gate never opens: release the sim before deploying the module). Tested end to end with a local build in headless Chrome (2026-11-09); dragging with a finger on phones and tablets is untested. The hint texts mirror the sim's `AssemblyMode.Texts` (standalone panel): check both when changing one.

- **Video check (Carlo):** watch the p1 video for Auswertung spoilers (slope, I₃/I₁). The question revision on branch `fragen` makes `p1-setup-4-erwartung` an observation after the simulation, so seeing precession in the earlier video no longer conflicts with a prediction task.
- **Metallic stand in the sim:** `ModuleBase.mat` has exactly ω's colour; requested from the sim repo (`ModuleTower.mat` as the model). Afterwards bump `sim.version`.
- **Slope question revised (`fragen`):** `p5-precession-4-steigung` compares two slopes qualitatively at fixed mass and lever arm. The explicit coefficient is no longer an answer option or success message. The nutation-slope interpretation remains for the Auswertung.
- **Physics details not verifiable from the material** (Carlo to confirm): pendulum part (wheel clamped, pendulum weight screwed in, two opposite positions because of unbalance); light barrier one interruption per turn; the notch side of the add-on weight; the reason for timing half a precession turn (`measureText1b` gives only the friction argument); nutation measured on the balanced gyroscope.
- **Sim polish:** p7's trail (thin light grey on the light stage) has weak contrast; the mouse wheel over the sim zooms instead of scrolling the page; no touch rotation on phones/tablets; p4 at 1000 rpm: the disk can hide the short arrows in some phases (re-check with the new camera); the Push sign quirk; `precessionArc`/`precessionVector` can be deleted sim-side.
- **QA not done systematically:** load time first visit vs. cached, memory when switching sub-pages and segments repeatedly.
- **Backend open issues (login model, data protection and others):** kept with the shared backend, in *Open Issues* of the Pohl module's developer guide (`../ilias-pohl-module/.learning_module_readme.md`). The PHP and the schema are identical in both modules: change them together.
- **Inherited from Pohl:** a cold load straight onto a learning page can log `MathJax.typesetPromise is not a function` (later renders work). The script figures are small and slightly upscaled.


## 11 Physics reference (for consistent wording)

- Euler: (dL/dt)_Raum = (dL/dt)_Körper + ω × L.
- Precession: D = ω_P × L, ω_P = D/(L sin θ). Lab: D = m_z g r sin θ, L = I ω_R, so ω_P = m_z g r/(I ω_R), **independent of θ**, ∝ 1/ω_R, the slope gives I. Simple top: D = m g l sin θ.
- Steady precession, exactly (indices of segment 4): m_z g r = ω_P (I₁ω_R − I₂ω_P cos θ). The correction vanishes at θ = 90° (the part of L⃗ from the precession is then parallel to ω⃗_P), so a slow wheel spoils the horizontal measurement through the dip and nodding, which tilt the axle, not through this term directly. "Näherung für den schnellen Kreisel" is the module's name for the approximation; no separate established German term was found.
- The Euler Exkurs (p4 3/3) stops at the vector form: solving the force-free component form leads straight to I₃/I₁.
- Physical pendulum: T = 2π √(I/(m g d)) (I about the pivot axis; account for the pendulum weight's own contribution).
- Nutation: ω_N ∝ ω_R; for a fast gyroscope supported at its centre of mass ω_N = (I₃/I₁) ω_R. **That is the answer to Auswertung 5: never state it.**
- Balanced lab gyroscope (0 g): force-free, L⃗ fixed in space; after a push the figure axis circles L⃗ on the Nutationskegel; Rastpolkegel (ω⃗ around L⃗, fixed in space) and Gangpolkegel (ω⃗ around the figure axis, fixed in the body) roll on each other.
- Released start: φ̇₀ = 0 → dip ∝ m_z/ω_R², cusps in the axle path. Guided: φ̇₀ = steady rate → almost no nutation.
- Sim symbols: θ tilt of L⃗'s side from the vertical, φ precession angle, ψ spin angle, ω₃ spin about the figure axis.
