import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/sleepData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq-section"
      className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-all"
    >
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions & Sleep Science
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Evidence-based answers to help you structure your circadian schedule.
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/80 mt-3">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-3.5">
              <button
                type="button"
                id={`faq-toggle-${idx}`}
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left gap-3 group"
              >
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div
                  id={`faq-answer-${idx}`}
                  className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-1 animate-fadeIn"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
