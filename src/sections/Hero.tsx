import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { getPortfolioData } from '@/data/portfolioData';

export default function Hero() {
  const data = getPortfolioData();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get current accent color from CSS variable
      const root = document.documentElement;
      const accentColor = getComputedStyle(root).getPropertyValue('--accent-primary').trim() || '#e94560';

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = accentColor;
            ctx.globalAlpha = (1 - distance / 150) * 0.2;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Gradient Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, var(--accent-secondary) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {data.hero.badgeText}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            >
              Hi, I'm{' '}
              <span className="gradient-text">{data.name}</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl mb-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              {data.title}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base mb-8 max-w-xl mx-auto lg:mx-0"
              style={{ color: 'var(--text-secondary)' }}
            >
              {data.hero.shortBio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <button
                onClick={() => scrollToSection('#projects')}
                className="btn-primary flex items-center gap-2"
              >
                View Projects
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-secondary flex items-center gap-2"
              >
                Contact Me
                <Mail className="w-4 h-4" />
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <FileText className="w-4 h-4" />
                View CV
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              <a
                href={data.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={data.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${data.contact.displayEmail}`}
                className="social-icon"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="profile-glow" />
              
              {/* Profile Image Container */}
              <motion.div
                className="profile-image-container"
                animate={{
                  rotateY: [0, 10, 0, -10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={data.profileImage}
                  alt={data.name}
                  className="profile-image"
                />
              </motion.div>

              {/* Floating Badges */}
              <motion.div
                className="absolute -top-4 -left-4 px-4 py-2 rounded-xl glass"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-sm font-semibold gradient-text">AI & ML</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl glass"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <span className="text-sm font-semibold gradient-text">Salesforce</span>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 px-4 py-2 rounded-xl glass"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <span className="text-sm font-semibold gradient-text">Full Stack</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div
          className="w-8 h-12 rounded-full border-2 flex items-start justify-center p-2"
          style={{ borderColor: 'var(--accent-primary)' }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full"
            style={{ background: 'var(--accent-primary)' }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
