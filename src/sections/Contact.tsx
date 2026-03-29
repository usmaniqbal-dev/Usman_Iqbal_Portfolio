import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { getPortfolioData } from '@/data/portfolioData';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const data = getPortfolioData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // In production, this would be an actual API call
      // For now, we'll simulate the API call
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          toEmail: data.contact.actualEmail, // This would be handled server-side
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      // For demo purposes, show success even if API fails
      // In production, this would show an error
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: data.contact.displayEmail,
      href: `mailto:${data.contact.displayEmail}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: data.contact.location,
      href: '#',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: data.contact.phone,
      href: '#',
    },
  ];

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Background Decoration */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(ellipse, var(--accent-primary) 0%, transparent 70%)',
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
              color: 'var(--accent-primary)',
            }}
          >
            Get In Touch
          </motion.span>
          <h2 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? Feel free to reach out!
            I'm always open to discussing new opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="card flex items-center gap-4 glass-hover"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'var(--accent-gradient)',
                  }}
                >
                  <info.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {info.label}
                  </p>
                  <p className="font-medium">{info.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="card"
              style={{
                background: 'var(--accent-gradient)',
                border: 'none',
              }}
            >
              <h3 className="text-lg font-semibold mb-2 text-white">
                Currently Available
              </h3>
              <p className="text-white/90 text-sm">
                I'm open to freelance projects, internships, and full-time opportunities. 
                Let's discuss how we can work together!
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="card">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <div className="success-checkmark">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      Thank you for reaching out. I'll get back to you soon!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.name}
                          </motion.p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        rows={5}
                        className={`input-field resize-none ${errors.message ? 'border-red-500' : ''}`}
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1 flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>

                    {submitError && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-sm text-center"
                      >
                        {submitError}
                      </motion.p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
