import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";

import Home from "./pages/Home";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { Careers } from "./components/Careers";
import TournamentHub from "./components/TournamentHub";
import { TeamRoster } from "./components/TeamRoster";
import StreamsHighlights from "./components/StreamsHighlights";
import { Management } from "./pages/Management";

import { AdminDashboard } from "./admin/AdminDashboard";
import  {AdminLogin}  from "./admin/AdminLogin";
import ProtectedRoute from "./routes/ProtectedRoute";
import { JoinSection } from "./components/JoinSection";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Hide navbar & footer on admin pages
  const hideLayout =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/protected");

  return (
    <div className="relative min-h-screen bg-brand-dark text-white">
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          {!hideLayout && <Navbar />}

          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/career" element={<Careers />} />
              <Route path="/tournaments" element={<TournamentHub />} />
              <Route path="/teams" element={<TeamRoster />} />
              <Route path="/media" element={<StreamsHighlights />} />
              <Route path="/management" element={<Management />} />
              <Route path="/join" element={<JoinSection />} />


              {/* Admin Login */}
              <Route path="/protected" element={<AdminLogin />} />
              {/* <Route path="/protected" element={<AdminDashboard />} /> */}

              {/* Protected Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          {!hideLayout && <Footer />}
        </>
      )}
    </div>
  );
}

export default App;
