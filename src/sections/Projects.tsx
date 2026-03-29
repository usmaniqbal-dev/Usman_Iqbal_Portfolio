import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code2, Cpu, Smartphone, Cloud } from 'lucide-react';
import { getPortfolioData } from '@/data/portfolioData';

const projectIcons: Record<string, React.ElementType> = {
  'JARVIS AI Assistant': Cpu,
  'Python Game Development': Code2,
  'Android Banking App Concept': Smartphone,
  'Salesforce CRM Dashboard': Cloud,
};

export default function Projects() {
  const data = getPortfolioData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section id="projects" className="section relative overflow-hidden">
      {/* Background Decoration */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--accent-primary)',
            }}
          >
            My Work
          </motion.span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A collection of projects showcasing my skills in AI, web development,
            mobile apps, and Salesforce CRM
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {data.projects.map((project, index) => {
            const Icon = projectIcons[project.title] || Code2;
            const isHovered = hoveredProject === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative"
              >
                <div
                  className="card h-full overflow-hidden"
                  style={{
                    transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'var(--accent-gradient)',
                      }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                        </motion.a>
                      )}
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{
                            background: 'var(--accent-gradient)',
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink className="w-5 h-5 text-white" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Project Content */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--accent-primary)] transition-colors">
                    {project.title}
                  </h3>
                  <p
                    className="mb-4 leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--accent-primary)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Hover Effect Overlay */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, transparent 0%, var(--shadow-color) 100%)',
                          borderRadius: '16px',
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href={data.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Github className="w-5 h-5" />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
