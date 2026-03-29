import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Code2, ArrowUp } from 'lucide-react';
import { getPortfolioData } from '@/data/portfolioData';

export default function Footer() {
  const data = getPortfolioData();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: Github,
      href: data.social.github,
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: data.social.linkedin,
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: `mailto:${data.contact.displayEmail}`,
      label: 'Email',
    },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Salesforce', href: '#salesforce' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer
      className="relative pt-16 pb-8"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
      }}
    >
      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: 'var(--accent-gradient)',
          boxShadow: '0 4px 20px var(--shadow-color)',
        }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'var(--accent-gradient)',
                }}
              >
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">{data.name}</span>
            </div>
            <p className="mb-6 max-w-md" style={{ color: 'var(--text-secondary)' }}>
              {data.title}. Passionate about building intelligent systems, 
              scalable web applications, and enterprise-level CRM solutions.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                  whileHover={{
                    scale: 1.1,
                    background: 'var(--accent-primary)',
                    color: 'white',
                    borderColor: 'var(--accent-primary)',
                  }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-[var(--accent-primary)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3" style={{ color: 'var(--text-secondary)' }}>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a
                  href={`mailto:${data.contact.displayEmail}`}
                  className="hover:text-[var(--accent-primary)] transition-colors"
                >
                  {data.contact.displayEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                <a
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-primary)] transition-colors"
                >
                  LinkedIn Profile
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                <a
                  href={data.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-primary)] transition-colors"
                >
                  GitHub Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{ background: 'var(--border-color)' }}
        />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            © {currentYear} {data.name}. {data.footer.copyrightText}
          </p>
          <p
            className="text-sm flex items-center gap-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
