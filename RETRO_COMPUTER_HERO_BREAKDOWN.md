 # How the Retro Computer Hero Works (edhinrichsen/retro-computer-website)

This doc summarizes how [edhinrichsen/retro-computer-website](https://github.com/edhinrichsen/retro-computer-website) implements the **3D retro computer hero**: a Commodore PET–style machine whose **monitor shows a real, interactive terminal** (UNIX-like shell + markdown).

---

## 1. High-level idea

- The **hero is a full-screen WebGL canvas** (THREE.js).
- On it, a **3D model of a retro computer** is placed in the scene.
- The **monitor’s screen** is not a static texture: it’s a **render target**. A separate 2D “terminal” scene is rendered into a texture, then that texture is applied to the 3D screen mesh.
- So: **terminal UI (text + shell) is drawn off-screen → texture → shown on the 3D monitor**.

---

## 2. HTML / DOM structure

From `index.html`:

- **`<div id="home"></div>`** – Anchor for “home” (no content; used for scroll/nav).
- **`<canvas class="webgl"></canvas>`** – The main WebGL canvas (full-screen, fixed). This is the only “hero” visual once loaded.
- **`<div id="hero-backup">`** – Fallback hero content (e.g. “Hi there, I’m Ed”, “Software Engineer”, “Digital Designer”). Shown **behind** the canvas (z-index 0) so it’s visible only if the 3D view doesn’t cover it or before load. In practice the canvas covers it.
- **`#loading`** – “Booting…” overlay with progress bar; hidden when assets are ready.
- **`#textarea`** – Invisible, used to capture **keyboard input** and feed it into the terminal (so you can type into the 3D screen).

So the “hero” the user sees is: **full-screen canvas → 3D scene → computer model with live terminal on the screen**.

---

## 3. Entry and load flow

- **`main.ts`**  
  - Imports and runs `WebGL()`.  
  - Listens to scroll and sets `document.documentElement.dataset.scroll` for CSS (e.g. nav behavior).

- **`webgl/loader.ts`**  
  - Uses THREE.js loaders (and a `LoadingManager`) to load:
    - **GLB model**: `public/models/Commodore710_33.5.glb` (computer + screen + keyboard + CRT + shadow plane).
    - **Fonts**: `public-pixel`, `chill` (for text on the “monitor”).
    - **Textures**: baked computer/floor, environment map.
  - Updates the loading bar and “Booting…” text; when everything is loaded, hides the loader and **calls the callback** that starts the 3D app.

So the hero only appears after **all assets (model, fonts, textures) are loaded**; until then you see “Booting…”.

---

## 4. 3D scene (webgl/index.ts)

- **Scene**: Single THREE.Scene, background color `0xf6d4b1`, ambient light.
- **Camera**: PerspectiveCamera; position/rotation set so you look at the computer (e.g. from in front).
- **Computer**: Built from the GLB:
  - **Screen** mesh → material is **replaced** with the “terminal” render texture (see below).
  - **Computer**, **CRT**, **Keyboard**, **ShadowPlane** → use baked texture from loader.
- **Interaction**:
  - **Parallax**: On pointer move while pressed, `computerParallax.x/y` are updated and used to nudge the camera so the computer moves slightly with drag.
  - **Scroll**: Scroll position drives:
    - Camera Z (zoom out as you scroll down).
    - Computer position/rotation (moves and rotates with scroll).
    - Canvas opacity (fades out when scrolled past).
  - Optional **morph** on CRT mesh for a subtle “power on” effect.

So the “hero” is: **one 3D group (computer + screen + keyboard + shadow)** with the **screen mesh’s material** coming from the terminal render pipeline.

---

## 5. “Monitor” content: render-to-texture pipeline

The content you see **on the 3D monitor** is produced by a **separate 2D scene** rendered to a texture.

### 5.1 Screen module (webgl/screen/index.ts)

- **Scene**: `sceneRTT` – a small orthographic 2D scene used only for render-to-texture (RTT).
- **ScreenTextEngine**: Draws **text and UI** in that scene (pixel font for titles, chill font for body; text is 3D meshes from TextGeometry).
- **ScreenRenderEngine**: Renders `sceneRTT` into a **WebGLRenderTarget**, then passes that through:
  - **Bloom** (UnrealBloomPass) for a glow.
  - **Lag** (custom shader) for a CRT-style persistence/trail.
  - **Noise** (custom shader) for scanlines/CRT look.
- The **final texture** from this pipeline is what gets applied to the **Screen mesh** in the main 3D scene.

So: **Text/terminal content → RTT → post-processing (bloom, lag, noise) → texture on 3D screen**.

### 5.2 Text on the “monitor” (webgl/screen/textEngine.ts)

- Uses THREE.js **TextGeometry** with the loaded fonts (public-pixel, chill).
- **placeText** / **placeMarkdown**: Add text or markdown to the RTT scene (positioned in 2D); supports headings, lists, images (from file-system).
- **userInput**: Updates the displayed line when the user types (backed by the hidden `#textarea`).
- **scroll** / **scrollToEnd**: Scroll the “terminal” view.
- **Caret**: A small plane mesh that blinks as the cursor.

So the “hero” text (e.g. “Hi there, I’m Ed”) is **not** HTML; it’s **geometry in a 2D RTT scene**, then that scene is rendered to the texture that goes on the 3D screen.

### 5.3 Terminal logic (terminal/index.ts)

- On init:
  - **Places the title content** from `file-system/home/user/title/title.md` (markdown: image, “Hi there,”, “I’m Ed H”, “Software Engineer”, “Digital Designer”, “Welcome to ED-Linux…”, “Scroll or type help”).
  - **Places** the prompt `user:~$`.
- **Bash** instance processes commands (e.g. `help`, `ls`, `cd`, `cat`, `show`); output is sent to `screenTextEngine.placeText` / `placeMarkdown` so it appears on the 3D screen.
- **Input**: A hidden `#textarea` captures typing; on keypress/focus, its value is compared to the previous value, a **Change** (add/delete) is computed, and **userInput** updates the on-screen line. So the “monitor” shows a real, editable command line.

So the **hero content** is: **title markdown + shell prompt + command output**, all rendered as 3D text in the RTT scene and shown on the 3D computer.

---

## 6. Summary table

| Part | Role |
|------|------|
| **Canvas** | Full-screen; shows the 3D scene (computer + env). |
| **GLB model** | Commodore PET–style computer (screen, case, CRT, keyboard, shadow). |
| **Screen mesh** | Its material = texture from the “terminal” RTT pipeline. |
| **RTT scene** | 2D scene with text meshes (title, prompt, command output). |
| **Text engine** | Places text/markdown, handles input line and caret. |
| **Terminal** | Loads title.md, shows `user:~$`, runs shell; feeds changes to text engine. |
| **Post-processing** | Bloom, lag (CRT trail), noise (scanlines) → final screen texture. |
| **Scroll** | Moves camera and computer; fades canvas so page content appears. |
| **#textarea** | Invisible input; keyboard goes here and is reflected on the 3D screen. |

---

## 7. How you could adapt this to your portfolio

- **Without 3D**: Keep your current Hero (HTML + CSS + typing animation). You could still add a “terminal” feel: e.g. a **canvas or div** that looks like a CRT and shows a **render-to-texture** or **canvas 2D** “terminal” (title + prompt + typing) with scanlines/noise in CSS or a small shader.
- **With 3D**: Use THREE.js (or React Three Fiber) to add a **simple 3D “monitor”** (box or low-poly model). Render your terminal UI (React or canvas) to a **canvas**, use it as a THREE texture, and apply it to the monitor mesh. Scroll can move the camera or the computer like in the reference.
- **Shell in the hero**: Reuse the idea of a **hidden input** (or contentEditable) for keyboard, and a **text layout engine** (simpler than his: just lines of text + caret) that draws into a small canvas or a div, then that becomes the “screen” (either in 3D or in a 2D “CRT” frame).

If you tell me whether you want “3D computer” or “2D CRT frame with terminal,” I can outline concrete steps and file changes for your repo.
