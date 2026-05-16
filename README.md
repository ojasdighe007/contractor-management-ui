# Contractor Management UI

A React starter template scaffolded with **Vite**, **Tailwind CSS**, **React Router**, and **ESLint + Prettier**.

## Tech stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/) — dev server and bundler
- [React Router v6](https://reactrouter.com/) — client-side routing
- [Tailwind CSS 3](https://tailwindcss.com/) — utility-first styling
- [ESLint 8](https://eslint.org/) + [Prettier 3](https://prettier.io/) — linting and formatting

## Setup

Follow these steps to get the project running locally from scratch.

### 1. Prerequisites

Make sure the following are installed:

- **Node.js** `>= 18.18` (LTS recommended — install via [nvm](https://github.com/nvm-sh/nvm) or [the official installer](https://nodejs.org/))
- **npm** `>= 9` (ships with Node) — or use `pnpm` / `yarn` if you prefer
- **Git** (to clone the repository)

Verify versions:

```bash
node -v   # should print v18.18.x or newer
npm -v    # should print 9.x or newer
git --version
```

### 2. Clone the repository

```bash
git clone https://github.com/ojasdighe007/contractor-management-ui.git
cd contractor-management-ui
```

### 3. Install dependencies

```bash
npm install
```

This installs React, Vite, Tailwind, React Router, ESLint, Prettier, and all related tooling defined in `package.json`.

### 4. Start the dev server

```bash
npm run dev
```

The app will open automatically at [http://localhost:5173](http://localhost:5173) with hot module reloading. Edit any file under `src/` and the browser will refresh.

### 5. Verify the build

Before pushing changes or deploying, confirm everything compiles, lints, and formats cleanly:

```bash
npm run lint           # static analysis (ESLint)
npm run format:check   # formatting (Prettier)
npm run build          # production bundle into dist/
npm run preview        # serve the dist/ build locally
```

### 6. (Optional) Environment variables

Vite reads variables prefixed with `VITE_` from a `.env` file at the project root. Create one if/when you need them:

```bash
# .env  (already gitignored)
VITE_API_BASE_URL=http://localhost:8000
```

Access them in code via `import.meta.env.VITE_API_BASE_URL`.

### Troubleshooting

| Symptom | Fix |
| --- | --- |
| `EACCES` / permission errors during `npm install` | Don't use `sudo`. Reinstall Node via `nvm` so npm owns its own prefix. |
| Port `5173` already in use | Stop the other process, or change `server.port` in `vite.config.js`. |
| Tailwind classes not applied | Confirm `src/index.css` is imported in `src/main.jsx` and the file path is covered by `content` in `tailwind.config.js`. |
| ESLint complains about unknown JSX globals | Run `npm install` again — the `react` plugin must resolve. |

## Available scripts

| Script                  | What it does                                  |
| ----------------------- | --------------------------------------------- |
| `npm run dev`           | Start the Vite dev server with HMR            |
| `npm run build`         | Build the production bundle into `dist/`     |
| `npm run preview`       | Preview the production build locally          |
| `npm run lint`          | Run ESLint on the project                     |
| `npm run lint:fix`      | Run ESLint and auto-fix where possible        |
| `npm run format`        | Format files with Prettier                    |
| `npm run format:check`  | Check formatting without writing changes      |

## Project structure

```
.
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration (Tailwind + Autoprefixer)
├── .eslintrc.cjs           # ESLint configuration
├── .prettierrc             # Prettier configuration
└── src/
    ├── main.jsx            # App bootstrap (Router + StrictMode)
    ├── App.jsx             # Top-level routes
    ├── index.css           # Tailwind directives + base styles
    ├── components/
    │   └── Navbar.jsx
    └── pages/
        ├── Home.jsx
        ├── About.jsx
        └── NotFound.jsx
```

## Adding routes

Define routes in `src/App.jsx`:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  {/* Add new routes here */}
  <Route path="*" element={<NotFound />} />
</Routes>
```
