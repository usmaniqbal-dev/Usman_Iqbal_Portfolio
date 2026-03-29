import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Shield } from 'lucide-react';
import { useTheme, themes } from '@/context/ThemeContext';

interface NavigationProps {
  onAdminClick: () => void;
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Salesforce', href: '#salesforce' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation({ onAdminClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, cycleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section
      const sections = navLinks.map((link) => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const currentTheme = themes.find((t) => t.id === theme);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          background: isScrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Usman Ali</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`nav-link text-sm font-medium ${
                    activeSection === link.href.slice(1) ? 'active' : ''
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Button */}
              <motion.button
                onClick={cycleTheme}
                className="theme-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={`Current: ${currentTheme?.name}`}
              >
                {currentTheme?.icon}
              </motion.button>

              {/* Admin Button */}
              <motion.button
                onClick={onAdminClick}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
                ) : (
                  <Menu className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 lg:hidden"
          >
            <div
              className="mx-4 p-6 rounded-2xl"
              style={{
                background: 'var(--nav-bg)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      activeSection === link.href.slice(1)
                        ? 'bg-[var(--bg-card)] text-[var(--accent-primary)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onAdminClick();
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white text-base font-medium flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Admin Login
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
