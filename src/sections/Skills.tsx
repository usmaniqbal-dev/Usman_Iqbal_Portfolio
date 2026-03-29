import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Code2, Globe, Database, Cloud, Cpu, Layers } from 'lucide-react';
import { getPortfolioData, type Skill } from '@/data/portfolioData';

const categoryIcons: Record<string, React.ElementType> = {
  'Programming': Code2,
  'Web Development': Globe,
  'Database': Database,
  'Salesforce': Cloud,
  'AI & Projects': Cpu,
};

const categoryColors: Record<string, string> = {
  'Programming': 'from-orange-500 to-red-500',
  'Web Development': 'from-blue-500 to-cyan-500',
  'Database': 'from-green-500 to-emerald-500',
  'Salesforce': 'from-blue-600 to-indigo-600',
  'AI & Projects': 'from-purple-500 to-pink-500',
};

export default function Skills() {
  const data = getPortfolioData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Group skills by category
  const skillsByCategory = data.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(skillsByCategory);

  const filteredCategories = selectedCategory
    ? [selectedCategory]
    : categories;

  return (
    <section id="skills" className="section relative overflow-hidden">
      {/* Background Decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--accent-primary)',
            }}
          >
            My Skills
          </motion.span>
          <h2 className="section-title">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive overview of my technical skills and proficiency levels
            across various domains
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white'
                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
            }`}
          >
            All Skills
          </button>
          {categories.map((category) => {
            const Icon = categoryIcons[category] || Layers;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category}
              </button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory || 'all'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {filteredCategories.map((category, categoryIndex) => {
              const Icon = categoryIcons[category] || Layers;
              const skills = skillsByCategory[category];

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + categoryIndex * 0.1 }}
                  className="card"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[category]} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{category}</h3>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {skills.length} skills
                      </p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-5">
                    {skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: 0.4 + categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span
                            className="text-sm font-semibold"
                            style={{ color: 'var(--accent-primary)' }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div className="skill-bar">
                          <motion.div
                            className="skill-progress"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{
                              duration: 1,
                              delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05,
                              ease: 'easeOut',
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Skill Level Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {[
            { range: '90-100%', label: 'Expert', color: 'from-green-500 to-emerald-500' },
            { range: '70-89%', label: 'Advanced', color: 'from-blue-500 to-cyan-500' },
            { range: '50-69%', label: 'Intermediate', color: 'from-yellow-500 to-orange-500' },
            { range: 'Below 50%', label: 'Beginner', color: 'from-red-500 to-pink-500' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`}
              />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {item.range} - {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
