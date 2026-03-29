import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Cloud,
  Settings,
  BarChart3,
  Workflow,
  Shield,
  Users,
  Zap,
  Database,
  CheckCircle2,
  Lock,
  LineChart,
} from 'lucide-react';

const salesforceFeatures = [
  {
    icon: Cloud,
    title: 'Cloud-Based CRM',
    description: 'World\'s #1 customer relationship management platform powered by cloud technology',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Automate business processes and streamline operations with powerful tools',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Real-time insights and customizable dashboards for data-driven decisions',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security with compliance certifications and data protection',
  },
];

const mySalesforceSkills = [
  { icon: Database, name: 'Custom Objects & Fields', level: 85 },
  { icon: Settings, name: 'Page Layouts & Record Types', level: 90 },
  { icon: Lock, name: 'Validation Rules', level: 80 },
  { icon: Workflow, name: 'Flow Builder & Automation', level: 75 },
  { icon: LineChart, name: 'Reports & Dashboards', level: 85 },
  { icon: Users, name: 'CRM Customization', level: 80 },
];

const businessBenefits = [
  'Increased sales productivity by 30%',
  'Improved customer satisfaction scores',
  'Streamlined business processes',
  'Enhanced data visibility and reporting',
  'Reduced manual data entry tasks',
  'Better lead management and tracking',
];

export default function Salesforce() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="salesforce" className="section relative overflow-hidden">
      {/* Background Decoration */}
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #00A1E0 0%, transparent 70%)',
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
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: '#00A1E0',
            }}
          >
            Salesforce Expertise
          </motion.span>
          <h2 className="section-title">
            Salesforce <span style={{ color: '#00A1E0' }}>CRM</span> Specialist
          </h2>
          <p className="section-subtitle">
            Leveraging the world's leading CRM platform to drive business growth
            and customer success
          </p>
        </motion.div>

        {/* What is Salesforce */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00A1E0 0%, #0070D1 100%)' }}
              >
                <Cloud className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">What is Salesforce?</h3>
              </div>
            </div>
            <div className="space-y-4" style={{ color: 'var(--text-secondary)' }}>
              <p className="leading-relaxed">
                Salesforce is the world's leading cloud-based Customer Relationship Management (CRM) 
                platform that helps businesses connect with their customers in a whole new way. 
                It provides a comprehensive suite of tools for sales, service, marketing, and more.
              </p>
              <p className="leading-relaxed">
                With over 150,000 companies worldwide using Salesforce, it has become the standard 
                for enterprise CRM solutions, enabling organizations to streamline their operations, 
                improve customer relationships, and drive revenue growth.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {salesforceFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="card glass-hover"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: 'linear-gradient(135deg, #00A1E0 0%, #0070D1 100%)' }}
                >
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* My Salesforce Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00A1E0 0%, #0070D1 100%)' }}
            >
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">My Salesforce Skills</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Proficient in various Salesforce administration and customization areas
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mySalesforceSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: 'var(--bg-card)' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0, 161, 224, 0.1)' }}
                >
                  <skill.icon className="w-5 h-5" style={{ color: '#00A1E0' }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">{skill.name}</h4>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-progress"
                      style={{ background: 'linear-gradient(90deg, #00A1E0 0%, #0070D1 100%)' }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.7 + index * 0.05 }}
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold" style={{ color: '#00A1E0' }}>
                  {skill.level}%
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Business Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          <div
            className="card"
            style={{
              background: 'linear-gradient(135deg, #00A1E0 0%, #0070D1 100%)',
              border: 'none',
            }}
          >
            <h3 className="text-xl font-semibold mb-4 text-white">
              Why Salesforce Matters
            </h3>
            <p className="text-white/90 leading-relaxed mb-6">
              Salesforce is not just a CRM; it's a complete ecosystem that empowers 
              businesses to transform their customer relationships. With its AI-powered 
              insights, automation capabilities, and extensive customization options, 
              Salesforce helps organizations of all sizes achieve their business goals.
            </p>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">150K+</div>
                <div className="text-sm text-white/70">Companies</div>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">#1</div>
                <div className="text-sm text-white/70">CRM Platform</div>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">30%</div>
                <div className="text-sm text-white/70">Avg. ROI</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Business Impact</h3>
            <div className="space-y-3">
              {businessBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#00A1E0' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
