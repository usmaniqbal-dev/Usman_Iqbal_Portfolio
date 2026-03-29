import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const ADMIN_CREDENTIALS = {
  username: 'usman52422',
  password: '622452',
};

export default function AdminModal({ isOpen, onClose, onLogin }: AdminModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Store login state
      sessionStorage.setItem('admin-logged-in', 'true');
      onLogin();
      onClose();
      // Reset form
      setUsername('');
      setPassword('');
    } else {
      setError('Invalid username or password');
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="modal-content max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'var(--accent-gradient)',
                  }}
                >
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Admin Login</h2>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Enter credentials to access dashboard
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--bg-card)] transition-colors"
              >
                <X className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="admin-username"
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Username
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: 'var(--text-secondary)' }}
                  />
                  <input
                    type="text"
                    id="admin-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="input-field pl-12"
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: 'var(--text-secondary)' }}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="admin-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="input-field pl-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-sm text-red-500">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !username || !password}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Login
                  </>
                )}
              </button>
            </form>

            {/* Hint */}
            <p
              className="text-xs text-center mt-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              Default: usman52422 / 622452
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
