import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import SitesPage from './features/inventory/SitesPage.jsx';
import SiteDashboard from './features/inventory/SiteDashboard.jsx';
import PhaseLayout from './features/inventory/PhaseLayout.jsx';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/sites" replace />} />
          <Route path="/sites" element={<SitesPage />} />
          <Route path="/sites/:siteId" element={<SiteDashboard />} />
          <Route path="/sites/:siteId/:phaseId" element={<PhaseLayout />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
