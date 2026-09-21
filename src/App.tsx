import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AgeSelector } from './components/AgeSelector';
import { AgeOverviewCard } from './components/AgeOverviewCard';
import { SleepCalculator } from './components/SleepCalculator';
import { SleepCycleDiagram } from './components/SleepCycleDiagram';
import { SleepGuideTable } from './components/SleepGuideTable';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AGE_GROUPS } from './data/sleepData';
import { AgeGroup } from './types';
import { Sparkles, MoonStar, Clock, HeartPulse } from 'lucide-react';

export default function App() {
  // Dark mode state with persistence & system preference fallback
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sleep_guide_dark_mode');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Selected age group state (defaults to Adults)
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>(() => {
    return AGE_GROUPS.find((g) => g.id === 'adults') || AGE_GROUPS[7];
  });

  // Sync dark class on html root
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('sleep_guide_dark_mode', 'true');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('sleep_guide_dark_mode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      {/* Top sticky navigation */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onNavigate={handleNavigate}
      />

      {/* Main Content Body */}
      <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Subtle Welcome & Value Proposition Banner */}
        <section
          id="hero-intro-banner"
          className="rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-900 text-white p-5 sm:p-7 shadow-md relative overflow-hidden border border-indigo-950"
        >
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evidence-Based Sleep Calculator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Wake Up Energized, Not Exhausted.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every person’s sleep architecture evolves with age. Select any age group below to calculate precise bedtime and wake-up schedules aligned with full 90-minute ultradian cycles—helping you avoid the painful grogginess of mid-cycle alarm awakenings.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>90-Min Cycle Optimization</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-emerald-400" />
                <span>All 9 Age Brackets (0–65+)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MoonStar className="w-4 h-4 text-amber-400" />
                <span>Zero Morning Sleep Inertia</span>
              </div>
            </div>
          </div>
          {/* Subtle decorative glow */}
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        </section>

        {/* Step 1: Interactive Age Group Selector / Numeric input */}
        <AgeSelector
          ageGroups={AGE_GROUPS}
          selectedAgeGroup={selectedAgeGroup}
          onSelectAgeGroup={setSelectedAgeGroup}
        />

        {/* Dynamic Medical Overview for Selected Age Group */}
        <AgeOverviewCard ageGroup={selectedAgeGroup} />

        {/* Step 2: Interactive Tailored Sleep Calculator */}
        <SleepCalculator ageGroup={selectedAgeGroup} />

        {/* Educational 90-Minute Ultradian Sleep Cycle Breakdown */}
        <SleepCycleDiagram />

        {/* Full Age Matrix Table & Breakdown for SEO & Educational Reference */}
        <SleepGuideTable
          ageGroups={AGE_GROUPS}
          selectedAgeGroup={selectedAgeGroup}
          onSelectAgeGroup={setSelectedAgeGroup}
        />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
