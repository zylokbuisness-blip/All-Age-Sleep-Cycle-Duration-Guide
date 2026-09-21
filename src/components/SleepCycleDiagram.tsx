import React, { useState } from 'react';
import { SLEEP_STAGES } from '../data/sleepData';
import { SleepStage } from '../types';
import { Activity, Brain, Waves, Sparkles, Moon, Zap, ShieldCheck } from 'lucide-react';

export const SleepCycleDiagram: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<SleepStage>(SLEEP_STAGES[2]); // Default to N3 Deep Sleep

  const getStageBorderColor = (name: string, isSelected: boolean) => {
    if (!isSelected) return 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';
    if (name.includes('N1')) return 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30';
    if (name.includes('N2')) return 'border-sky-500 bg-sky-50/60 dark:bg-sky-950/30';
    if (name.includes('N3')) return 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/30';
    return 'border-violet-500 bg-violet-50/60 dark:bg-violet-950/30';
  };

  const getStageBadgeColor = (name: string) => {
    if (name.includes('N1')) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
    if (name.includes('N2')) return 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300';
    if (name.includes('N3')) return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300';
    return 'bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300';
  };

  return (
    <section
      id="cycle-science-section"
      className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-all"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Sleep Science & Physiology
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Anatomy of the 90-Minute Ultradian Sleep Cycle
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Human sleep is not uniform. The brain cycles through 4 discrete phases roughly every 90 minutes.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl self-start md:self-auto">
          <Activity className="w-4 h-4 text-indigo-500" />
          <span>Polysomnography (EEG) Standard</span>
        </div>
      </div>

      {/* Visual Progression Bar */}
      <div className="my-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span>0 min (Lights Out)</span>
          <span>45 min (Mid-Cycle Deep Slumber)</span>
          <span>90 min (Cycle Completion & Awakening Window)</span>
        </div>

        {/* 4 Stage Visual Segment Bar */}
        <div className="h-6 w-full rounded-xl overflow-hidden flex shadow-inner border border-slate-200 dark:border-slate-700">
          <div
            title="N1 Stage: 5%"
            className="w-[8%] bg-emerald-400 hover:opacity-90 transition-opacity flex items-center justify-center text-[10px] font-bold text-emerald-950"
          >
            N1
          </div>
          <div
            title="N2 Stage: 50%"
            className="w-[48%] bg-sky-400 hover:opacity-90 transition-opacity flex items-center justify-center text-[11px] font-bold text-sky-950"
          >
            N2 (Light & Spindles)
          </div>
          <div
            title="N3 Stage: 22%"
            className="w-[24%] bg-indigo-600 hover:opacity-90 transition-opacity flex items-center justify-center text-[11px] font-bold text-white"
          >
            N3 (Deep Delta)
          </div>
          <div
            title="REM Stage: 20%"
            className="w-[20%] bg-violet-500 hover:opacity-90 transition-opacity flex items-center justify-center text-[11px] font-bold text-white"
          >
            REM (Dream)
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1.5 px-1">
          <span>Light Transition</span>
          <span>Core Sleep & Memory</span>
          <span>Physical Repair / HGH</span>
          <span>Cognitive / Emotional</span>
        </div>
      </div>

      {/* Interactive Stage Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
        {SLEEP_STAGES.map((stage, idx) => {
          const isSelected = selectedStage.name === stage.name;
          return (
            <button
              key={idx}
              type="button"
              id={`stage-card-${stage.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedStage(stage)}
              className={`p-3.5 rounded-xl text-left border transition-all duration-150 cursor-pointer ${getStageBorderColor(
                stage.name,
                isSelected
              )} ${isSelected ? 'ring-2 ring-indigo-500 shadow-xs' : 'hover:border-slate-300 dark:hover:border-slate-700'}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${getStageBadgeColor(stage.name)}`}>
                  {stage.percentage} of cycle
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {stage.durationMinutes}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                {stage.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {stage.phase}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detailed Stage Inspector Panel */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {selectedStage.name} — {selectedStage.phase}
            </h4>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span>Duration: {selectedStage.durationMinutes}</span>
            <span>•</span>
            <span>Proportion: {selectedStage.percentage}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              Biological & Health Function
            </h5>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedStage.functionDesc}
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Waves className="w-3.5 h-3.5 text-sky-500" />
              Electroencephalogram (EEG) Waves
            </h5>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedStage.brainWave}
            </p>
          </div>
        </div>
      </div>

      {/* The Sleep Inertia Explainer Banner */}
      <div className="mt-5 p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-xs">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-sm font-bold text-slate-900 dark:text-white">
              The Science of "Sleep Inertia" & Morning Grogginess
            </h5>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Have you ever slept 8 hours but woke up feeling exhausted, while on 6 hours or 7.5 hours you felt instantly awake? This phenomenon is called <strong>sleep inertia</strong>. If your alarm jolts you out of slow-wave deep sleep (NREM Stage 3), your brain requires up to 60 minutes to flush adenosine and resume high-frequency prefrontal activity. By timing your sleep in multiples of 90 minutes, you naturally wake up at the conclusion of REM or in light Stage 1/2 sleep—when your brain is already physiologically primed for consciousness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
