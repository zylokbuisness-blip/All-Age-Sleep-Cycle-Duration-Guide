import React from 'react';
import { AgeGroup } from '../types';
import { Clock, RefreshCw, SunMedium, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

interface AgeOverviewCardProps {
  ageGroup: AgeGroup;
}

export const AgeOverviewCard: React.FC<AgeOverviewCardProps> = ({ ageGroup }) => {
  return (
    <section
      id="age-overview-panel"
      className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-all"
    >
      {/* Header with Title and Age Range */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
              {ageGroup.badge}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Developmental Stage: {ageGroup.ageRangeLabel}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {ageGroup.name} Sleep Requirements
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
          <ShieldAlert className="w-3.5 h-3.5 text-indigo-500" />
          <span>NSF & AASM Consensus</span>
        </div>
      </div>

      {/* Primary Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
        {/* Metric 1: Recommended Duration */}
        <div
          id="metric-recommended-duration"
          className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-100 dark:border-slate-800"
        >
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1.5">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Medically Recommended
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {ageGroup.recommendedHoursMin} – {ageGroup.recommendedHoursMax}
            </span>
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              Hours / Day
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            May be appropriate for some individuals: {ageGroup.mayBeAppropriateMin}–{ageGroup.mayBeAppropriateMax} hours.
          </p>
        </div>

        {/* Metric 2: 90-Minute Sleep Cycles Required */}
        <div
          id="metric-recommended-cycles"
          className="rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 p-4 border border-indigo-100 dark:border-indigo-900/50"
        >
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 mb-1.5">
            <RefreshCw className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              90-Min Sleep Cycles
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black tracking-tight text-indigo-950 dark:text-indigo-200">
              {ageGroup.recommendedCyclesMin} – {ageGroup.recommendedCyclesMax}
            </span>
            <span className="text-sm font-semibold text-indigo-800 dark:text-indigo-300">
              Cycles
            </span>
          </div>
          <p className="mt-2 text-xs text-indigo-900/80 dark:text-indigo-300/80">
            {ageGroup.isUltradian90Min
              ? `Equals ${ageGroup.recommendedCyclesMin * 1.5}h to ${ageGroup.recommendedCyclesMax * 1.5}h of continuous rest without mid-cycle awakening.`
              : `Infant cycle duration is approx. ${ageGroup.standardCycleMinutes} mins; 90-min equivalent shown for standardized timing.`}
          </p>
        </div>

        {/* Metric 3: Daytime Naps & Circadian Phase */}
        <div
          id="metric-naps-circadian"
          className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-100 dark:border-slate-800"
        >
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1.5">
            <SunMedium className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Nap Frequency & Rhythm
            </span>
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white leading-snug">
            {ageGroup.napFrequency}
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            {ageGroup.napAdvice}
          </p>
        </div>
      </div>

      {/* Clinical Notes & Tips */}
      <div className="rounded-xl bg-slate-100/70 dark:bg-slate-800/40 p-4 text-xs">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <p className="font-semibold text-slate-900 dark:text-white">
              Medical & Physiological Insights:
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {ageGroup.clinicalSummary}
            </p>
            <div className="pt-1 text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Circadian Tendency: </span>
              {ageGroup.circadianTendency}
            </div>
          </div>
        </div>

        {/* Bullet Tips */}
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/60">
          <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
            Clinical Sleep Recommendations for {ageGroup.name}:
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600 dark:text-slate-400">
            {ageGroup.keyTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-indigo-500 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {!ageGroup.isUltradian90Min && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 px-3 py-2 text-xs text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>
            Note on Pediatric Ultradian Cycles: Newborns and young children have shorter sleep cycles (~{ageGroup.standardCycleMinutes} minutes). The calculator below computes wake/bed times calibrated to complete sleep intervals for this developmental stage.
          </span>
        </div>
      )}
    </section>
  );
};
