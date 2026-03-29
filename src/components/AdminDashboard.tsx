import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  LogOut,
  User,
  Code2,
  Briefcase,
  Palette,
  Mail,
  Save,
  Plus,
  Trash2,
  Edit2,
  Check,
  LayoutDashboard,
  ChevronRight,
  Image,
  Type,
  Home,
  GraduationCap,
  Phone,
  MapPin,
  FileText,
} from 'lucide-react';
import {
  getPortfolioData,
  savePortfolioData,
  type Skill,
  type Project,
} from '@/data/portfolioData';
import { useTheme, themes } from '@/context/ThemeContext';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

type TabType = 'profile' | 'hero' | 'about' | 'skills' | 'projects' | 'theme' | 'contact' | 'footer';

export default function AdminDashboard({ isOpen, onClose, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [data, setData] = useState(getPortfolioData());
  const { theme, setTheme } = useTheme();
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({ name: '', category: 'Programming', level: 50 });
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    technologies: [],
  });
  const [techInput, setTechInput] = useState('');
  const [imagePreview, setImagePreview] = useState(data.profileImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setData(getPortfolioData());
      setImagePreview(getPortfolioData().profileImage);
    }
  }, [isOpen]);

  const handleSave = () => {
    savePortfolioData(data);
    setSaveMessage('Changes saved successfully!');
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin-logged-in');
    onLogout();
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setData((prev) => ({ ...prev, profileImage: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Skill Management
  const addSkill = () => {
    if (newSkill.name && newSkill.category && newSkill.level) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.name,
        category: newSkill.category,
        level: newSkill.level,
      };
      setData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
      setNewSkill({ name: '', category: 'Programming', level: 50 });
    }
  };

  const updateSkill = (skill: Skill) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === skill.id ? skill : s)),
    }));
    setEditingSkill(null);
  };

  const deleteSkill = (id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  // Project Management
  const addProject = () => {
    if (newProject.title && newProject.description) {
      const project: Project = {
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description,
        technologies: newProject.technologies || [],
        github: newProject.github || 'https://github.com/usmaniqbal-dev',
      };
      setData((prev) => ({ ...prev, projects: [...prev.projects, project] }));
      setNewProject({ title: '', description: '', technologies: [] });
      setTechInput('');
    }
  };

  const updateProject = (project: Project) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === project.id ? project : p)),
    }));
    setEditingProject(null);
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addTech = () => {
    if (techInput.trim()) {
      setNewProject((prev) => ({
        ...prev,
        technologies: [...(prev.technologies || []), techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setNewProject((prev) => ({
      ...prev,
      technologies: prev.technologies?.filter((t) => t !== tech) || [],
    }));
  };

  const tabs: { id: TabType; name: string; icon: React.ElementType }[] = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'hero', name: 'Hero Section', icon: Home },
    { id: 'about', name: 'About', icon: GraduationCap },
    { id: 'skills', name: 'Skills', icon: Code2 },
    { id: 'projects', name: 'Projects', icon: Briefcase },
    { id: 'theme', name: 'Theme', icon: Palette },
    { id: 'contact', name: 'Contact', icon: Mail },
    { id: 'footer', name: 'Footer', icon: FileText },
  ];

  const categories = ['Programming', 'Web Development', 'Database', 'Salesforce', 'AI & Projects'];

  const updateNestedField = (path: string[], value: any) => {
    setData((prev) => {
      const newData = { ...prev };
      let current: any = newData;
      for (let i = 0; i < path.length - 1; i++) {
        current[path[i]] = { ...current[path[i]] };
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
          style={{ background: 'var(--bg-primary)' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--accent-gradient)' }}
              >
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Admin Dashboard</h2>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Manage your portfolio content
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="btn-primary flex items-center gap-2 text-sm"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              <button
                onClick={handleLogout}
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[var(--bg-card)] transition-colors"
              >
                <X className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              </button>
            </div>
          </div>

          {/* Save Message */}
          <AnimatePresence>
            {saveMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/30"
              >
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-green-500">{saveMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex h-[calc(100vh-73px)]">
            {/* Sidebar */}
            <div
              className="w-64 border-r overflow-y-auto"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <nav className="p-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`admin-nav-item w-full ${activeTab === tab.id ? 'active' : ''}`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
                  <h3 className="text-xl font-semibold mb-6">Profile Settings</h3>
                  <div className="space-y-6">
                    {/* Profile Image */}
                    <div className="card">
                      <label className="block text-sm font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>
                        Profile Image
                      </label>
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Profile Preview"
                            className="w-24 h-24 rounded-full object-cover border-4"
                            style={{ borderColor: 'var(--accent-primary)' }}
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="btn-secondary flex items-center gap-2"
                          >
                            <Image className="w-4 h-4" />
                            Upload New Image
                          </button>
                          <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                            Recommended: Square image, at least 400x400px
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="card">
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                        <Type className="w-4 h-4 inline mr-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                        className="input-field"
                      />
                    </div>

                    {/* Title */}
                    <div className="card">
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                        Professional Title
                      </label>
                      <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Hero Tab */}
              {activeTab === 'hero' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
                  <h3 className="text-xl font-semibold mb-6">Hero Section</h3>
                  <div className="space-y-6">
                    <div className="card">
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                        Badge Text (e.g., "Available for opportunities")
                      </label>
                      <input
                        type="text"
                        value={data.hero.badgeText}
                        onChange={(e) => updateNestedField(['hero', 'badgeText'], e.target.value)}
                        className="input-field"
                      />
                    </div>

                    <div className="card">
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                        Short Bio (shown under title)
                      </label>
                      <textarea
                        value={data.hero.shortBio}
                        onChange={(e) => updateNestedField(['hero', 'shortBio'], e.target.value)}
                        rows={4}
                        className="input-field resize-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* About Tab */}
              {activeTab === 'about' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
                  <h3 className="text-xl font-semibold mb-6">About Section</h3>
                  <div className="space-y-6">
                    {/* Description */}
                    <div className="card">
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                        Description (About text)
                      </label>
                      <textarea
                        value={data.about.description}
                        onChange={(e) => updateNestedField(['about', 'description'], e.target.value)}
                        rows={6}
                        className="input-field resize-none"
                      />
                    </div>

                    {/* Career Goal */}
                    <div className="card">
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                        Career Goal
                      </label>
                      <textarea
                        value={data.about.careerGoal}
                        onChange={(e) => updateNestedField(['about', 'careerGoal'], e.target.value)}
                        rows={3}
                        className="input-field resize-none"
                      />
                    </div>

                    {/* Education */}
                    <div className="card">
                      <h4 className="font-medium mb-4">Education Details</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                            Degree
                          </label>
                          <input
                            type="text"
                            value={data.about.education.degree}
                            onChange={(e) => updateNestedField(['about', 'education', 'degree'], e.target.value)}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                            University
                          </label>
                          <input
                            type="text"
                            value={data.about.education.university}
                            onChange={(e) => updateNestedField(['about', 'education', 'university'], e.target.value)}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                            Campus
                          </label>
                          <input
                            type="text"
                            value={data.about.education.campus}
                            onChange={(e) => updateNestedField(['about', 'education', 'campus'], e.target.value)}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                            Status
                          </label>
                          <input
                            type="text"
                            value={data.about.education.status}
                            onChange={(e) => updateNestedField(['about', 'education', 'status'], e.target.value)}
                            className="input-field"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="card">
                      <h4 className="font-medium mb-4">Statistics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                            Years of Learning
                          </label>
                          <input
                            type="text"
                            value={data.about.stats.yearsLearning}
                            onChange={(e) => updateNestedField(['about', 'stats', 'yearsLearning'], e.target.value)}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                            Projects Completed
                          </label>
                          <input
                            type="text"
                            value={data.about.stats.projectsCompleted}
                            onChange={(e) => updateNestedField(['about', 'stats', 'projectsCompleted'], e.target.value)}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                            Technologies
                          </label>
                          <input
                            type="text"
                            value={data.about.stats.technologies}
                            onChange={(e) => updateNestedField(['about', 'stats', 'technologies'], e.target.value)}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                            Dedication
                          </label>
                          <input
                            type="text"
                            value={data.about.stats.dedication}
                            onChange={(e) => updateNestedField(['about', 'stats', 'dedication'], e.target.value)}
                            className="input-field"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <h3 className="text-xl font-semibold mb-6">Skills Management</h3>

                  {/* Add New Skill */}
                  <div className="card mb-6">
                    <h4 className="font-medium mb-4">Add New Skill</h4>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Skill name"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill((prev) => ({ ...prev, name: e.target.value }))}
                        className="input-field"
                      />
                      <select
                        value={newSkill.category}
                        onChange={(e) => setNewSkill((prev) => ({ ...prev, category: e.target.value }))}
                        className="input-field"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Level (0-100)"
                          value={newSkill.level}
                          onChange={(e) =>
                            setNewSkill((prev) => ({ ...prev, level: parseInt(e.target.value) || 0 }))
                          }
                          className="input-field"
                        />
                        <button onClick={addSkill} className="btn-primary px-4">
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {data.skills.map((skill) => (
                      <div key={skill.id} className="card flex items-center gap-4">
                        {editingSkill?.id === skill.id ? (
                          <>
                            <input
                              type="text"
                              value={editingSkill.name}
                              onChange={(e) =>
                                setEditingSkill((prev) => (prev ? { ...prev, name: e.target.value } : null))
                              }
                              className="input-field flex-1"
                            />
                            <select
                              value={editingSkill.category}
                              onChange={(e) =>
                                setEditingSkill((prev) =>
                                  prev ? { ...prev, category: e.target.value } : null
                                )
                              }
                              className="input-field w-40"
                            >
                              {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              ))}
                            </select>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={editingSkill.level}
                              onChange={(e) =>
                                setEditingSkill((prev) =>
                                  prev ? { ...prev, level: parseInt(e.target.value) || 0 } : null
                                )
                              }
                              className="input-field w-24"
                            />
                            <button
                              onClick={() => updateSkill(editingSkill)}
                              className="w-10 h-10 rounded-lg bg-green-500/20 text-green-500 flex items-center justify-center"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="flex-1 font-medium">{skill.name}</span>
                            <span
                              className="px-3 py-1 rounded-full text-xs"
                              style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)' }}
                            >
                              {skill.category}
                            </span>
                            <span className="w-12 text-right font-medium" style={{ color: 'var(--accent-primary)' }}>
                              {skill.level}%
                            </span>
                            <button
                              onClick={() => setEditingSkill(skill)}
                              className="w-10 h-10 rounded-lg hover:bg-[var(--bg-card)] flex items-center justify-center"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteSkill(skill.id)}
                              className="w-10 h-10 rounded-lg hover:bg-red-500/20 flex items-center justify-center text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <h3 className="text-xl font-semibold mb-6">Projects Management</h3>

                  {/* Add New Project */}
                  <div className="card mb-6">
                    <h4 className="font-medium mb-4">Add New Project</h4>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Project title"
                        value={newProject.title}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, title: e.target.value }))}
                        className="input-field"
                      />
                      <textarea
                        placeholder="Project description"
                        value={newProject.description}
                        onChange={(e) =>
                          setNewProject((prev) => ({ ...prev, description: e.target.value }))
                        }
                        rows={3}
                        className="input-field resize-none"
                      />
                      <input
                        type="url"
                        placeholder="GitHub URL (optional)"
                        value={newProject.github || ''}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, github: e.target.value }))}
                        className="input-field"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add technology"
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                          className="input-field flex-1"
                        />
                        <button onClick={addTech} className="btn-secondary">
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {newProject.technologies?.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-sm flex items-center gap-2"
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                          >
                            {tech}
                            <button onClick={() => removeTech(tech)} className="text-red-500">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <button onClick={addProject} className="btn-primary w-full">
                        <Plus className="w-5 h-5 mr-2" />
                        Add Project
                      </button>
                    </div>
                  </div>

                  {/* Projects List */}
                  <div className="space-y-3">
                    {data.projects.map((project) => (
                      <div key={project.id} className="card">
                        {editingProject?.id === project.id ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={editingProject.title}
                              onChange={(e) =>
                                setEditingProject((prev) =>
                                  prev ? { ...prev, title: e.target.value } : null
                                )
                              }
                              className="input-field"
                            />
                            <textarea
                              value={editingProject.description}
                              onChange={(e) =>
                                setEditingProject((prev) =>
                                  prev ? { ...prev, description: e.target.value } : null
                                )
                              }
                              rows={3}
                              className="input-field resize-none"
                            />
                            <input
                              type="url"
                              value={editingProject.github || ''}
                              onChange={(e) =>
                                setEditingProject((prev) =>
                                  prev ? { ...prev, github: e.target.value } : null
                                )
                              }
                              placeholder="GitHub URL"
                              className="input-field"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateProject(editingProject)}
                                className="btn-primary flex-1"
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Save
                              </button>
                              <button
                                onClick={() => setEditingProject(null)}
                                className="btn-secondary"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium mb-1">{project.title}</h4>
                              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                                {project.description}
                              </p>
                              {project.github && (
                                <p className="text-xs mb-2" style={{ color: 'var(--accent-primary)' }}>
                                  {project.github}
                                </p>
                              )}
                              <div className="flex flex-wrap gap-1">
                                {project.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-0.5 rounded-full text-xs"
                                    style={{
                                      background: 'var(--bg-card)',
                                      color: 'var(--accent-primary)',
                                    }}
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-1 ml-4">
                              <button
                                onClick={() => setEditingProject(project)}
                                className="w-8 h-8 rounded-lg hover:bg-[var(--bg-card)] flex items-center justify-center"
                                style={{ color: 'var(--text-secondary)' }}
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteProject(project.id)}
                                className="w-8 h-8 rounded-lg hover:bg-red-500/20 flex items-center justify-center text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Theme Tab */}
              {activeTab === 'theme' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
                  <h3 className="text-xl font-semibold mb-6">Theme Settings</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`card text-left transition-all ${theme === t.id ? 'ring-2 ring-[var(--accent-primary)]' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{t.icon}</span>
                          <div>
                            <h4 className="font-medium">{t.name}</h4>
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                              {theme === t.id ? 'Active' : 'Click to apply'}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Contact Tab */}
              {activeTab === 'contact' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="card">
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                        <Mail className="w-4 h-4 inline mr-2" />
                        Display Email (shown on website)
                      </label>
                      <input
                        type="email"
                        value={data.contact.displayEmail}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, displayEmail: e.target.value },
                          }))
                        }
                        className="input-field"
                      />
                    </div>

                    <div className="card">
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                        <Mail className="w-4 h-4 inline mr-2" />
                        Actual Email (where messages are sent)
                      </label>
                      <input
                        type="email"
                        value={data.contact.actualEmail}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, actualEmail: e.target.value },
                          }))
                        }
                        className="input-field"
                      />
                      <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                        This email receives contact form submissions (hidden from frontend)
                      </p>
                    </div>

                    <div className="card">
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={data.contact.phone}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, phone: e.target.value },
                          }))
                        }
                        className="input-field"
                      />
                    </div>

                    <div className="card">
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Location
                      </label>
                      <input
                        type="text"
                        value={data.contact.location}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, location: e.target.value },
                          }))
                        }
                        className="input-field"
                      />
                    </div>

                    <div className="card">
                      <h4 className="font-medium mb-4">Social Links</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                            GitHub URL
                          </label>
                          <input
                            type="url"
                            value={data.social.github}
                            onChange={(e) =>
                              setData((prev) => ({
                                ...prev,
                                social: { ...prev.social, github: e.target.value },
                              }))
                            }
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                            LinkedIn URL
                          </label>
                          <input
                            type="url"
                            value={data.social.linkedin}
                            onChange={(e) =>
                              setData((prev) => ({
                                ...prev,
                                social: { ...prev.social, linkedin: e.target.value },
                              }))
                            }
                            className="input-field"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Footer Tab */}
              {activeTab === 'footer' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
                  <h3 className="text-xl font-semibold mb-6">Footer Settings</h3>
                  <div className="card">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      Copyright Text
                    </label>
                    <input
                      type="text"
                      value={data.footer.copyrightText}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          footer: { ...prev.footer, copyrightText: e.target.value },
                        }))
                      }
                      className="input-field"
                    />
                    <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                      This text appears after the year and name in the footer
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
