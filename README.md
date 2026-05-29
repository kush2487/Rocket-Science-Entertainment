# 🚀 Rocket Science Entertainment — Landing Page

A dark cinematic landing page for **Rocket Science Entertainment (RSE)**, a Bangalore-based creative production house. Inspired by [theviralfever.com](https://theviralfever.com/), featuring a full-screen showreel hero, portfolio grid, sister channels section, and a contact/map footer — all with smooth scroll animations.

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Sections & Code Location](#sections--code-location)
- [Environment & Config Files](#environment--config-files)
- [Key Design Decisions](#key-design-decisions)
- [Adding Assets](#adding-assets)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)

---

## 🛠 Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 19.x |
| Language | TypeScript | 6.x |
| Build Tool | Vite | 8.x |
| Styling | Tailwind CSS | v4.x |
| Animations | Framer Motion | 12.x |
| YouTube Embed | react-youtube | 10.x |
| Icons | Lucide React | 1.17.x |
| Utility | clsx + tailwind-merge | latest |

---

## ✅ Prerequisites

Make sure you have the following installed:

- **Node.js** >= 18.x — [Download](https://nodejs.org/)
- **npm** >= 9.x (comes with Node)
- A modern browser (Chrome / Edge / Firefox)

Verify your setup:

```bash
node -v
npm -v
```

---

## 🚀 Getting Started

### 1. Navigate to the project folder

```bash
cd "landing page/rse-landing"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The site will be live at **http://localhost:5173**

### 4. (Optional) Add the Machine Dreams logo

Place your logo file at:

```
public/assets/machine-dreams-logo.png
```

It will automatically appear in the Sister Channels section.

---

## 📁 Project Structure

```
rse-landing/
├── public/
│   └── assets/
│       └── machine-dreams-logo.png   ← Drop logo here
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              ← Sticky navigation bar
│   │   ├── Hero.tsx                ← Full-screen showreel hero
│   │   ├── About.tsx               ← About RSE section
│   │   ├── OurWork.tsx             ← Portfolio video grid
│   │   ├── SisterChannels.tsx      ← Machine Dreams card
│   │   ├── Footer.tsx              ← Contact, map, copyright
│   │   └── InstagramIcon.tsx       ← Custom Instagram SVG icon
│   │
│   ├── lib/
│   │   └── utils.ts                ← cn() utility (clsx + tailwind-merge)
│   │
│   ├── App.tsx                     ← Root layout — composes all sections
│   ├── main.tsx                    ← React DOM entry point
│   └── index.css                   ← Tailwind v4 import + global styles
│
├── vite.config.ts                  ← Vite config (Tailwind v4 plugin, @ alias)
├── tsconfig.json                   ← TS project references root
├── tsconfig.app.json               ← TS config for src/
├── tsconfig.node.json              ← TS config for vite.config
└── package.json
```

---

## 🗂 Sections & Code Location

### 1. Navbar — src/components/Navbar.tsx

- RSE text logo (ROCKET + amber SCIENCE)
- Smooth scroll anchor links: Home, About, Our Work, Sister Channels, Contact
- Instagram icon (custom SVG via InstagramIcon.tsx) linking to @rocketscienceentertainment
- Scroll behaviour: backdrop-blur + dark background kicks in after 20px of scroll
- Mobile: animated slide-down drawer (Framer Motion AnimatePresence) with hamburger toggle
- State: scrolled (boolean via window.scroll listener), open (drawer visibility)

### 2. Hero / Showreel — src/components/Hero.tsx

- Full-viewport YouTube video player (CSS trick: iframe sized to 100vw / 56.25vw to fill screen)
- Auto-cycles through 4 showreel videos every 15 seconds
- Videos (muted, autoplay, no controls):
  - Slot 1: xr27fg5bVK8
  - Slot 2: 9KfANH2K3WE
  - Slot 3: 8tpbYNE4VMg
  - Slot 4: jdQeBIL6nvA
- Dark gradient overlay (top + bottom) for text readability
- Animated headline: ROCKET + amber SCIENCE + ENTERTAINMENT
- Tagline: Lights · Camera · Launch 🚀
- Prev / Next arrow buttons + bottom dot indicators
- State: current (active video index), _direction (slide direction)

### 3. About — src/components/About.tsx

- Amber eyebrow label: Lights · Camera · Launch 🚀
- Large heading: About Us
- 3 paragraphs describing RSE identity, team, and location
- Animation: useInView from Framer Motion — elements fade + slide up on scroll
- once: true so animations do not re-trigger on scroll back

### 4. Our Work — src/components/OurWork.tsx

- Heading: Our Previous Work
- 2x2 responsive grid (single column mobile, 2 columns sm+)
- Each VideoCard sub-component:
  - Displays YouTube maxresdefault thumbnail while idle
  - Amber circular play button overlay
  - Hover: image scales up, overlay lightens
  - Title shown in gradient strip at bottom
  - Click: switches to embedded YouTube player with controls
- Animation: each card fades + slides up with 0.12s staggered delay

### 5. Sister Channels — src/components/SisterChannels.tsx

- Heading: Sister Channels
- Single centered card for Machine Dreams Productions
- Logo loaded from /assets/machine-dreams-logo.png
- If file missing, img hides itself gracefully via onError
- Card has deep blue gradient background matching logo aesthetic
- External link (href="#") — update when URL is available
- Animation: scale-in on scroll via useInView

### 6. Footer / Contact — src/components/Footer.tsx

- Left column: RSE text logo, address, email link, Instagram link
- Right column: Google Maps iframe embed for JP Nagar
- Map styled with grayscale(80%) invert(10%) CSS filter for dark theme
- Horizontal rule divider
- Copyright line + tagline
- Animation: left column slides from left, map slides from right

### 7. Utility Files

| File | Purpose |
|---|---|
| src/lib/utils.ts | Exports cn() — merges Tailwind classes using clsx + tailwind-merge |
| src/components/InstagramIcon.tsx | Custom inline SVG Instagram icon |
| src/index.css | Tailwind v4 import + body reset + .yt-cover iframe CSS |

---

## ⚙️ Environment & Config Files

### vite.config.ts
- Registers @vitejs/plugin-react (JSX fast refresh)
- Registers @tailwindcss/vite (Tailwind v4 Vite plugin — no tailwind.config.ts needed)
- Sets @ as an alias for ./src

### tsconfig.app.json
- Target: ES2023
- JSX: react-jsx
- Module resolution: bundler
- Strict unused variable/parameter checks enabled

---

## 🎨 Key Design Decisions

| Decision | Detail |
|---|---|
| Color scheme | Background #0a0a0a / #080808 / #050505, accent amber-400 (#fbbf24) |
| Typography | Inter system font, font-black for headings, wide letter-spacing for labels |
| Video full-screen | YouTube iframe oversized (min-width: 177.78vh) to cover any aspect ratio |
| Animations | All scroll animations use useInView({ once: true }) — fire once only |
| Mobile nav | Framer Motion AnimatePresence height animation for smooth drawer |
| No shadcn/ui CLI | Components hand-built with Tailwind — same quality, no CLI complexity |

---

## 🖼 Adding Assets

Machine Dreams Logo:
```
public/assets/machine-dreams-logo.png
```
Recommended: PNG with transparent background, landscape orientation.

---

## 🏗 Building for Production

```bash
npm run build
```

Output goes to dist/. Approximate bundle sizes:
- JS: ~351 KB (111 KB gzip)
- CSS: ~26 KB (5 KB gzip)

Preview the production build locally:
```bash
npm run preview
```

---

## 🌐 Deployment

The dist/ folder is a plain static site — deploy anywhere:

| Platform | Steps |
|---|---|
| Vercel | vercel --prod or connect GitHub repo |
| Netlify | Drag and drop dist/ folder, or connect repo with build command: npm run build |
| GitHub Pages | npm install gh-pages -D, add "deploy": "gh-pages -d dist" script |

For sub-path deployments (e.g. GitHub Pages), set base in vite.config.ts:

```ts
export default defineConfig({
  base: '/your-repo-name/',
  ...
})
```

---

## 📞 Contact Info in the Page

- Company: Rocket Science Entertainment
- Location: JP Nagar, Bangalore, Karnataka, India
- Instagram: @rocketscienceentertainment (https://www.instagram.com/rocketscienceentertainment)