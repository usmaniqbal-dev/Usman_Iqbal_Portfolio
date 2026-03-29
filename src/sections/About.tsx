import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Target, Code2, Lightbulb, Rocket, Award } from 'lucide-react';
import { getPortfolioData } from '@/data/portfolioData';

const features = [
  {
    icon: Code2,
    title: 'Full Stack Development',
    description: 'Building scalable web applications with modern technologies',
  },
  {
    icon: Lightbulb,
    title: 'AI & Machine Learning',
    description: 'Creating intelligent systems and automation solutions',
  },
  {
    icon: Rocket,
    title: 'Salesforce CRM',
    description: 'Enterprise-level CRM customization and automation',
  },
  {
    icon: Award,
    title: 'Mobile Development',
    description: 'Cross-platform mobile app development',
  },
];

export default function About() {
  const data = getPortfolioData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section relative overflow-hidden">
      {/* Background Decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)',
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
            About Me
          </motion.span>
          <h2 className="section-title">
            Let Me <span className="gradient-text">Introduce</span> Myself
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Education Card */}
            <div className="card mb-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'var(--accent-gradient)',
                  }}
                >
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Education</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    {data.about.education.degree}
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                    {data.about.education.university}, {data.about.education.campus}
                  </p>
                  <span
                    className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--accent-primary)',
                    }}
                  >
                    {data.about.education.status}
                  </span>
                </div>
              </div>
            </div>

            {/* About Text */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Who I Am</h3>
              <div className="space-y-4" style={{ color: 'var(--text-secondary)' }}>
                {data.about.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Career Goal & Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Career Goal Card */}
            <div
              className="card"
              style={{
                background: 'var(--accent-gradient)',
                border: 'none',
              }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Career Goal</h3>
                  <p className="text-white/90 leading-relaxed">
                    {data.about.careerGoal}
                  </p>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="card glass-hover"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{
                      background: 'var(--accent-gradient)',
                    }}
                  >
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { value: data.about.stats.yearsLearning, label: 'Years of Learning' },
            { value: data.about.stats.projectsCompleted, label: 'Projects Completed' },
            { value: data.about.stats.technologies, label: 'Technologies' },
            { value: data.about.stats.dedication, label: 'Dedication' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
