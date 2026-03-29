import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AdminModal from '@/components/AdminModal';
import AdminDashboard from '@/components/AdminDashboard';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';
import Salesforce from '@/sections/Salesforce';
import Contact from '@/sections/Contact';
import './App.css';

function AppContent() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const loggedIn = sessionStorage.getItem('admin-logged-in') === 'true';
    setIsAdminLoggedIn(loggedIn);

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminModalOpen(true);
    }
  };

  const handleLogin = () => {
    setIsAdminLoggedIn(true);
    setIsAdminDashboardOpen(true);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('admin-logged-in');
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: 'var(--bg-primary)' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center"
            >
              <motion.div
                className="w-16 h-16 rounded-xl mx-auto mb-4"
                style={{ background: 'var(--accent-gradient)' }}
                animate={{
                  rotate: [0, 360],
                  borderRadius: ['20%', '50%', '20%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.p
                className="text-lg font-semibold gradient-text"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!isLoading && (
        <>
          <Navigation onAdminClick={handleAdminClick} />

          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Salesforce />
            <Contact />
          </main>

          <Footer />

          {/* Admin Modal */}
          <AdminModal
            isOpen={isAdminModalOpen}
            onClose={() => setIsAdminModalOpen(false)}
            onLogin={handleLogin}
          />

          {/* Admin Dashboard */}
          <AdminDashboard
            isOpen={isAdminDashboardOpen}
            onClose={() => setIsAdminDashboardOpen(false)}
            onLogout={handleLogout}
          />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
