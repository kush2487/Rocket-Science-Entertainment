# 🏗 Architecture — Rocket Science Entertainment Landing Page

This document describes the full technical architecture of the RSE landing page: how the app is structured, how data and state flow through components, how animations work, and how the build pipeline is configured.

---

## 1. High-Level Architecture

```
Browser
  └── index.html (Vite entry)
        └── main.tsx  (ReactDOM.createRoot)
              └── App.tsx  (Root layout)
                    ├── Navbar.tsx
                    ├── Hero.tsx
                    ├── About.tsx
                    ├── OurWork.tsx
                    ├── SisterChannels.tsx
                    └── Footer.tsx
```

The app is a **Single Page Application (SPA)** with no router. Navigation is handled entirely via smooth-scroll anchor links (`href="#section-id"`). There is no backend, no API calls, and no state management library — all state is local React `useState`.

---

## 2. Build Pipeline

```
Source (TypeScript + TSX)
        │
        ▼
   TypeScript Compiler (tsc)
   — type checks only (noEmit)
        │
        ▼
      Vite 8
   — esbuild transforms TSX → JS
   — @tailwindcss/vite scans classes → generates CSS
   — tree-shakes unused code
        │
        ▼
     dist/
     ├── index.html
     ├── assets/index-[hash].js    (~351 KB raw / 111 KB gzip)
     └── assets/index-[hash].css   (~26 KB raw / 5 KB gzip)
```

### Why Tailwind v4 (Vite plugin approach)?
Tailwind CSS v4 no longer requires a `tailwind.config.ts` file. The `@tailwindcss/vite` plugin automatically scans all source files for utility classes and generates only the CSS that is actually used. A single `@import "tailwindcss"` in `index.css` is all that is needed.

---

## 3. Component Architecture

### 3.1 Component Hierarchy

```
App.tsx
├── Navbar.tsx
│     └── InstagramIcon.tsx
├── Hero.tsx
│     └── <YouTube /> (react-youtube)
├── About.tsx
├── OurWork.tsx
│     └── VideoCard (local sub-component)
│           └── <YouTube /> (react-youtube)
├── SisterChannels.tsx
└── Footer.tsx
      └── InstagramIcon.tsx
```

### 3.2 Component Responsibilities

| Component | Responsibility | External Dependencies |
|---|---|---|
| `App.tsx` | Root layout, section ordering | — |
| `Navbar.tsx` | Navigation, mobile drawer, scroll detection | Framer Motion, Lucide, InstagramIcon |
| `Hero.tsx` | Full-screen video carousel, auto-cycle timer | Framer Motion, react-youtube |
| `About.tsx` | Static text content, scroll animation | Framer Motion |
| `OurWork.tsx` | Video grid, thumbnail → player toggle | Framer Motion, react-youtube, Lucide |
| `SisterChannels.tsx` | Sister brand card, logo image | Framer Motion, Lucide |
| `Footer.tsx` | Address, Maps embed, social links | Framer Motion, Lucide, InstagramIcon |
| `InstagramIcon.tsx` | Inline SVG icon | — |
| `lib/utils.ts` | `cn()` class merge helper | clsx, tailwind-merge |

---

## 4. State Management

There is no global state. All state is component-local via React `useState`.

| Component | State | Type | Purpose |
|---|---|---|---|
| `Navbar` | `scrolled` | boolean | Toggles blur/bg-dark styles |
| `Navbar` | `open` | boolean | Mobile drawer open/close |
| `Hero` | `current` | number | Index of active showreel video (0–3) |
| `Hero` | `_direction` | number | Slide direction (reserved for future transitions) |
| `OurWork > VideoCard` | `playing` | boolean | Switches from thumbnail to live YouTube embed |

---

## 5. Animation Architecture

All animations use **Framer Motion**. Two patterns are used:

### Pattern A — Entry animations (one-time, on mount)
Used in `Hero.tsx` and `Navbar.tsx` mobile drawer.

```tsx
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.3 }}
/>
```

Runs once when the component mounts.

### Pattern B — Scroll-triggered animations (useInView)
Used in `About`, `OurWork`, `SisterChannels`, `Footer`.

```tsx
const ref = useRef(null)
const inView = useInView(ref, { once: true, margin: '-100px' })

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 40 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6 }}
/>
```

- `once: true` — animation fires only the first time the element enters the viewport
- `margin: '-100px'` — animation triggers 100px before the element fully enters
- Staggered delays used in `OurWork` (`delay: index * 0.12`) for cascading card reveal

### Pattern C — Presence animation
Used in `Navbar.tsx` mobile drawer and `Hero.tsx` video crossfade.

```tsx
<AnimatePresence>
  {open && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    />
  )}
</AnimatePresence>
```

`AnimatePresence` allows `exit` animations to play before the element is removed from the DOM.

---

## 6. YouTube Video Architecture

### Hero (Full-Screen Background Video)

```
<section> (position: relative, overflow: hidden, h-screen)
  └── <motion.div> (fade crossfade wrapper)
        └── .yt-cover (position: relative)
              └── <YouTube> (react-youtube)
                    └── <iframe> (absolute, oversized via CSS)
```

**CSS trick for full-screen cover:**
```css
.yt-cover iframe {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 56.25vw;      /* 16:9 aspect */
  min-height: 100vh;
  min-width: 177.78vh;  /* 16:9 inverse for tall viewports */
  pointer-events: none; /* prevents user from clicking the iframe */
}
```

**YouTube player parameters:**
```
autoplay: 1   — starts automatically
mute: 1       — required for autoplay in browsers
controls: 0   — hides YouTube controls
rel: 0        — no related videos at end
modestbranding: 1
iv_load_policy: 3  — no annotations
disablekb: 1  — keyboard controls disabled
```

**Auto-cycle logic:**
```
setInterval(next, 15000)  — advances to next video every 15 seconds
onEnd callback            — also advances on natural video end
```

### OurWork (Click-to-Play Cards)

Each `VideoCard` starts as a static image:
```
<img src="https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg" />
```

On click, `playing` state is set to `true` and the image is replaced with:
```
<YouTube videoId={id} opts={{ playerVars: { autoplay: 1, controls: 1 } }} />
```

This avoids loading YouTube iframes for all 4 cards on page load, improving performance.

---

## 7. Styling Architecture

### Tailwind CSS v4 Setup
- **No config file** — Vite plugin auto-scans source files
- All utility classes are written inline in JSX `className` props
- No custom Tailwind theme — amber colours come from Tailwind's built-in palette

### Color Tokens (used throughout)

| Usage | Value |
|---|---|
| Page background (main) | `#0a0a0a` (bg-[#0a0a0a]) |
| Section background (alt) | `#080808` (bg-[#080808]) |
| Footer background | `#050505` (bg-[#050505]) |
| Card background | `#111` (bg-[#111]) |
| Accent / Gold | `amber-400` = `#fbbf24` |
| Body text | `white` |
| Muted text | `white/70`, `white/60`, `white/50` |
| Borders | `white/10`, `amber-400/40` |

### Global Styles (`src/index.css`)

```css
@import "tailwindcss";          /* Tailwind v4 entry */

body {
  background-color: #0a0a0a;
  color: #fff;
  margin: 0;
  font-family: Inter, sans-serif;
}

html { scroll-behavior: smooth; }

/* Full-screen YouTube cover trick */
.yt-cover iframe { ... }
```

---

## 8. Asset Handling

| Asset | Location | How Used |
|---|---|---|
| Machine Dreams logo | `public/assets/machine-dreams-logo.png` | `<img src="/assets/machine-dreams-logo.png" />` — served as static file by Vite |
| YouTube thumbnails | External CDN (`img.youtube.com`) | Fetched at runtime per video ID |
| YouTube videos | External (YouTube embed API) | Loaded via react-youtube iframe |
| Google Maps | External (Google Maps embed) | `<iframe src="maps.google.com/...">` |

All `public/` files are copied as-is to `dist/` with no transformation.

---

## 9. Performance Characteristics

| Metric | Approach |
|---|---|
| Initial load | No videos loaded at mount — Hero auto-plays one at a time |
| OurWork thumbnails | Static images only; iframe loads on user click |
| Animation perf | Framer Motion uses CSS transforms (GPU accelerated) |
| CSS size | Tailwind scans and purges → only ~26 KB of CSS |
| JS bundle | Single chunk ~351 KB (111 KB gzip) including React + Framer Motion |
| Font loading | System font stack (Inter) — no external font requests |

---

## 10. Development vs Production

| Aspect | Development (npm run dev) | Production (npm run build) |
|---|---|---|
| Server | Vite dev server with HMR | Static files in dist/ |
| CSS | On-demand via Vite plugin | Extracted to .css file |
| JS | Un-minified, source maps | Minified, tree-shaken |
| Assets | Served from public/ | Copied to dist/ |
| Type check | Not enforced live | tsc -b runs before vite build |

---

## 11. Planned / Future Extensions

| Feature | Suggested Approach |
|---|---|
| Real logo (RSE) | Replace text logo in Navbar with `<img src="/assets/rse-logo.png" />` |
| More sister channels | Add more entries to an array in `SisterChannels.tsx` |
| Contact form | Add Formspree or EmailJS integration in Footer |
| Analytics | Add `gtag` or Plausible script in `index.html` |
| CMS-driven content | Replace hardcoded video IDs and text with a headless CMS (Contentful, Sanity) |
| SEO | Add `react-helmet-async` for dynamic `<title>` and `<meta>` tags |
| Routing | Add React Router if more pages are needed (e.g. /work, /about) |