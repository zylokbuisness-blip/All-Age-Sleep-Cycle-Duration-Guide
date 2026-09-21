import React from 'react';
import { ArrowUp, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="app-footer"
      className="w-full border-t border-slate-200 bg-slate-100/60 dark:border-slate-800 dark:bg-slate-950/80 py-8 px-4 sm:px-6 transition-colors"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                All-Age Sleep Cycle & Duration Guide
              </span>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                v2.0
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Engineered for individuals, parents, and caregivers to calculate optimal 90-minute sleep cycles and bedtime routines anchored in clinical pediatric and adult sleep standards.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs shrink-0"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to top</span>
          </button>
        </div>

        {/* Medical disclaimer */}
        <div className="mt-5 p-3 rounded-xl bg-slate-200/50 dark:bg-slate-900/60 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-700 dark:text-slate-300">Medical Disclaimer: </strong>
            This application is designed for educational, organizational, and general wellness purposes. Sleep guidelines are synthesized from consensus reports by the National Sleep Foundation (NSF), the American Academy of Sleep Medicine (AASM), and the Centers for Disease Control and Prevention (CDC). This tool does not constitute medical advice or diagnose sleep pathology (such as obstructive sleep apnea, severe narcolepsy, or chronic clinical insomnia). Please consult a licensed medical professional or certified somnologist for persistent sleep disorders.
          </p>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          <span>
            © {new Date().getFullYear()} All-Age Sleep Cycle & Duration Guide. Designed for restful circadian health.
          </span>
        </div>
      </div>
    </footer>
  );
};
