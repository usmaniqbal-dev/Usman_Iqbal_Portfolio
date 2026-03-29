export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface PortfolioData {
  // Profile
  name: string;
  title: string;
  profileImage: string;
  
  // Hero Section
  hero: {
    badgeText: string;
    shortBio: string;
  };
  
  // About Section
  about: {
    description: string;
    careerGoal: string;
    education: {
      degree: string;
      university: string;
      campus: string;
      status: string;
    };
    stats: {
      yearsLearning: string;
      projectsCompleted: string;
      technologies: string;
      dedication: string;
    };
  };
  
  // Skills
  skills: Skill[];
  
  // Projects
  projects: Project[];
  
  // Contact
  contact: {
    displayEmail: string;
    actualEmail: string;
    phone: string;
    location: string;
  };
  
  // Social Links
  social: {
    github: string;
    linkedin: string;
  };
  
  // Footer
  footer: {
    copyrightText: string;
  };
}

export const defaultPortfolioData: PortfolioData = {
  // Profile
  name: 'Usman Ali',
  title: 'Computer Science Student | AI & Salesforce Enthusiast | Full Stack Developer',
  profileImage: '/images/profile.png',
  
  // Hero Section
  hero: {
    badgeText: 'Available for opportunities',
    shortBio: 'Final-year BSCS student at Superior University specializing in Salesforce administration and full-stack web, app, and software development. Currently working as a Salesforce Administrator at Modeverse, with a strong drive to build impactful, scalable, and innovative digital solutions.',
  },
  
  // About Section
  about: {
    description: `Usman Ali is a Final Year Bachelor of Computer Science student at Superior University, Gold Campus, Pakistan. He has strong interest in Artificial Intelligence, Machine Learning, Salesforce CRM, Web Development, and Mobile App Development.

He is passionate about building intelligent systems, scalable web applications, and enterprise-level CRM solutions.`,
    careerGoal: 'To become a professional Software Engineer and Salesforce Expert, contributing to innovative technology solutions and cloud-based enterprise systems.',
    education: {
      degree: 'Bachelor of Computer Science',
      university: 'Superior University',
      campus: 'Gold Campus, Pakistan',
      status: 'Final Year Student',
    },
    stats: {
      yearsLearning: '4+',
      projectsCompleted: '20+',
      technologies: '15+',
      dedication: '100%',
    },
  },
  
  // Skills
  skills: [
    // Programming
    { id: '1', name: 'C++', category: 'Programming', level: 85 },
    { id: '2', name: 'Python', category: 'Programming', level: 90 },
    { id: '3', name: 'SQL', category: 'Programming', level: 80 },
    { id: '4', name: 'Java', category: 'Programming', level: 60 },
    { id: '5', name: 'Dart', category: 'Programming', level: 55 },
    // Web Development
    { id: '6', name: 'HTML', category: 'Web Development', level: 95 },
    { id: '7', name: 'CSS', category: 'Web Development', level: 90 },
    { id: '8', name: 'JavaScript', category: 'Web Development', level: 85 },
    { id: '9', name: 'React JS', category: 'Web Development', level: 80 },
    { id: '10', name: 'Node.js', category: 'Web Development', level: 75 },
    // Database
    { id: '11', name: 'SQL Server', category: 'Database', level: 80 },
    { id: '12', name: 'MySQL', category: 'Database', level: 85 },
    { id: '13', name: 'Stored Procedures', category: 'Database', level: 70 },
    { id: '14', name: 'Database Design', category: 'Database', level: 75 },
    // Salesforce
    { id: '15', name: 'Custom Objects', category: 'Salesforce', level: 85 },
    { id: '16', name: 'Page Layouts', category: 'Salesforce', level: 90 },
    { id: '17', name: 'Validation Rules', category: 'Salesforce', level: 80 },
    { id: '18', name: 'Flow Builder', category: 'Salesforce', level: 75 },
    { id: '19', name: 'Reports & Dashboards', category: 'Salesforce', level: 85 },
    { id: '20', name: 'CRM Customization', category: 'Salesforce', level: 80 },
  ],
  
  // Projects
  projects: [
    {
      id: '1',
      title: 'JARVIS AI Assistant',
      description: 'An intelligent AI assistant with ChatGPT integration and image generation capabilities. Built with Python and modern AI APIs.',
      technologies: ['Python', 'OpenAI API', 'Speech Recognition', 'Tkinter'],
      github: 'https://github.com/usmaniqbal-dev',
    },
    {
      id: '2',
      title: 'Python Game Development',
      description: 'Interactive games built using Python with pygame library, featuring engaging gameplay and smooth graphics.',
      technologies: ['Python', 'Pygame', 'OOP', 'Game Design'],
      github: 'https://github.com/usmaniqbal-dev',
    },
    {
      id: '3',
      title: 'Android Banking App Concept',
      description: 'A modern banking application concept with secure transactions, account management, and intuitive UI/UX design.',
      technologies: ['Dart', 'Flutter', 'Firebase', 'UI/UX'],
      github: 'https://github.com/usmaniqbal-dev',
    },
    {
      id: '4',
      title: 'Salesforce CRM Dashboard',
      description: 'Custom Salesforce dashboard with automated workflows, reports, and business process automation.',
      technologies: ['Salesforce', 'Apex', 'Visualforce', 'SOQL'],
      github: 'https://github.com/usmaniqbal-dev',
    },
  ],
  
  // Contact
  contact: {
    displayEmail: 'usmaniqbal@gmail.com',
    actualEmail: 'hackboy9870071@gmail.com',
    phone: '+92 XXX XXXXXXX',
    location: 'Lahore, Pakistan',
  },
  
  // Social Links
  social: {
    github: 'https://github.com/usmaniqbal-dev',
    linkedin: 'https://www.linkedin.com/in/usmaniqbaltech/',
  },
  
  // Footer
  footer: {
    copyrightText: 'All rights reserved.',
  },
};

export function getPortfolioData(): PortfolioData {
  const saved = localStorage.getItem('portfolio-data');
  if (saved) {
    return { ...defaultPortfolioData, ...JSON.parse(saved) };
  }
  return defaultPortfolioData;
}

export function savePortfolioData(data: Partial<PortfolioData>) {
  const current = getPortfolioData();
  const updated = { ...current, ...data };
  localStorage.setItem('portfolio-data', JSON.stringify(updated));
}
