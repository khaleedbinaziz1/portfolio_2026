# 🏆 2026 Portfolio Redesign — Architectural Monochrome & Kinetic Opal

## Design Philosophy: "Architectural Monochrome & Kinetic Opal"
- **Color Temperature & Palette**: Replaced harsh high-saturation neon gradients with ultra-luxury **Obsidian Graphite (`#08090d`)**, **Platinum Alabaster (`#f1f3f7`)**, and surgical **Kinetic Opal (`#7dd3fc`, `#a78bfa`, `#5eead4`)** micro-accents. Whisper-thin hairline borders (`1px solid rgba(255, 255, 255, 0.06)`).
- **Calibrated Typographic Scale**: Eliminated shouting, aggressive font sizes. Headings scaled gracefully to `clamp(1.75rem, 3.2vw, 2.4rem)` with tight negative tracking (`-0.025em`) and balanced editorial line heights (`1.15`). Body copy is clean and silky (`15.5px`, `1.68` line height).
- **Interactive Three.js WebGL Kinetic Sculpture**: In the Hero, a floating crystalline geodesic wireframe sculpture with shimmering iridescent vertex nodes and ambient micro-dust particles rotates with silky mouse inertia.
- **Fluid Magnetic Cursor**: Velocity-based elongation, spring dampening, and smooth frosted glass expansion on interactive targets.
- **Interactive Micro-Animations Throughout**:
  - Interactive engineering principle switcher in About Bento Grid.
  - Interactive ambient audio equalizer in Navigation.
  - 3D perspective card tilts and mouse spotlights with direct DOM writes.
  - Staggered word and layout transitions in Projects, Skills, and Experience.
  - 1-click email copy with animated feedback tooltip.

## Verification
- `npx tsc --noEmit`: **0 errors**.
- Dev server on `http://localhost:3099/`: **200 OK** on `/` and `/case-studies/autopilot-pos`.
