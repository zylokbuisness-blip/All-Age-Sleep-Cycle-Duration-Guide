import React from 'react';
import { Moon, Sun, MoonStar, Clock, BookOpen, Compass, HelpCircle } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onNavigate
}) => {
  return (
    <header
      id="app-header"
      className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 transition-colors"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand identity */}
        <div
          id="brand-header"
          onClick={() => onNavigate('calculator-section')}
          className="flex cursor-pointer items-center gap-2.5 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <MoonStar className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              All-Age Sleep Cycle & Duration Guide
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Medical sleep duration & 90-minute cycle calculator
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <nav className="hidden md:flex items-center gap-1 mr-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <button
              id="nav-calculator"
              onClick={() => onNavigate('calculator-section')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              Calculator
            </button>
            <button
              id="nav-science"
              onClick={() => onNavigate('cycle-science-section')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-indigo-500" />
              90-Min Cycles
            </button>
            <button
              id="nav-guide-table"
              onClick={() => onNavigate('guide-table-section')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              Age Matrix
            </button>
            <button
              id="nav-faq"
              onClick={() => onNavigate('faq-section')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
              FAQ
            </button>
          </nav>

          {/* Dark Mode Toggle */}
          <button
            id="theme-toggle-button"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors shadow-xs"
          >
            {darkMode ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
