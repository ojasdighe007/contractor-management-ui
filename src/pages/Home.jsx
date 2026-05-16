function Home() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
      <p className="text-slate-600">
        This is a Vite + React starter template with Tailwind CSS, React Router, and
        ESLint + Prettier preconfigured.
      </p>
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-700">
          Edit{' '}
          <code className="rounded bg-slate-100 px-1 py-0.5">src/pages/Home.jsx</code> to
          get started.
        </p>
      </div>
    </section>
  );
}

export default Home;
