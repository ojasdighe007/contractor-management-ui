# Contractor Management UI

A React starter template scaffolded with **Vite**, **Tailwind CSS**, **React Router**, and **ESLint + Prettier**.

## Tech stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/) — dev server and bundler
- [React Router v6](https://reactrouter.com/) — client-side routing
- [Tailwind CSS 3](https://tailwindcss.com/) — utility-first styling
- [ESLint 8](https://eslint.org/) + [Prettier 3](https://prettier.io/) — linting and formatting

## Getting started

### Prerequisites

- Node.js **>= 18.18** (LTS recommended)
- npm **>= 9** (or pnpm / yarn — adjust commands accordingly)

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

The app will start on [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview
```

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
