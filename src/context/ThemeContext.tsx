import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeType = 'dark-blue' | 'purple' | 'green-tech' | 'light';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes: { id: ThemeType; name: string; icon: string }[] = [
  { id: 'dark-blue', name: 'Dark Blue', icon: '🌙' },
  { id: 'purple', name: 'Purple', icon: '💜' },
  { id: 'green-tech', name: 'Green Tech', icon: '💚' },
  { id: 'light', name: 'Light', icon: '☀️' },
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('portfolio-theme') as ThemeType;
    return saved || 'purple';
  });

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  const cycleTheme = () => {
    const currentIndex = themes.findIndex((t) => t.id === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].id);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
