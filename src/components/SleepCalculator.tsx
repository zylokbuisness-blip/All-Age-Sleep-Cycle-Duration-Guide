import React, { useState, useEffect, useMemo } from 'react';
import { AgeGroup, CalculatorMode, SleepCycleOption } from '../types';
import {
  calculateBedtimeOptions,
  calculateWakeUpOptions,
  formatTime24
} from '../utils/calculator';
import {
  Clock,
  Moon,
  Sun,
  BedDouble,
  Sparkles,
  Sliders,
  Check,
  Info,
  CheckCircle,
  Copy,
  ChevronRight
} from 'lucide-react';

interface SleepCalculatorProps {
  ageGroup: AgeGroup;
}

export const SleepCalculator: React.FC<SleepCalculatorProps> = ({ ageGroup }) => {
  const [mode, setMode] = useState<CalculatorMode>('wake_up_at');
  
  // Default target time: 07:00 AM for wake_up_at, 22:30 for bedtime_at
  const [selectedTime, setSelectedTime] = useState<string>('07:00');
  const [latencyMinutes, setLatencyMinutes] = useState<number>(14);
  const [showLatencyControl, setShowLatencyControl] = useState<boolean>(false);
  const [copiedTime, setCopiedTime] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<SleepCycleOption | null>(null);

  // When switching modes, set sensible defaults
  useEffect(() => {
    if (mode === 'wake_up_at') {
      setSelectedTime('07:00');
    } else if (mode === 'bedtime_at') {
      setSelectedTime('22:30');
    } else if (mode === 'sleep_now') {
      const now = new Date();
      setSelectedTime(formatTime24(now));
    }
  }, [mode]);

  // Compute options dynamically
  const calculatedOptions = useMemo(() => {
    const [hours, mins] = selectedTime.split(':').map((v) => parseInt(v, 10));
    const now = new Date();
    const targetDate = new Date();
    targetDate.setHours(hours || 0, mins || 0, 0, 0);

    if (mode === 'wake_up_at') {
      // If target wake up time is earlier than current time today, assume tomorrow morning
      return calculateBedtimeOptions(targetDate, ageGroup, latencyMinutes);
    } else if (mode === 'bedtime_at') {
      return calculateWakeUpOptions(targetDate, ageGroup, latencyMinutes);
    } else {
      // sleep_now
      return calculateWakeUpOptions(now, ageGroup, latencyMinutes);
    }
  }, [selectedTime, mode, ageGroup, latencyMinutes]);

  // Set default selected option to the optimal one
  useEffect(() => {
    const optimal = calculatedOptions.find((o) => o.status === 'optimal') || calculatedOptions[0];
    if (optimal) {
      setSelectedOption(optimal);
    }
  }, [calculatedOptions]);

  const handleCopyTime = (timeStr: string) => {
    navigator.clipboard.writeText(timeStr);
    setCopiedTime(timeStr);
    setTimeout(() => setCopiedTime(null), 2000);
  };

  const adjustMinutes = (deltaMinutes: number) => {
    const [h, m] = selectedTime.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m + deltaMinutes, 0, 0);
    setSelectedTime(formatTime24(date));
  };

  return (
    <section
      id="calculator-section"
      className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-all"
    >
      {/* Title & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400">
            Step 2: Interactive Sleep Cycle Calculator
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Customized for <span className="font-bold text-slate-900 dark:text-white">{ageGroup.name}</span> ({ageGroup.recommendedHoursMin}–{ageGroup.recommendedHoursMax} hrs / {ageGroup.recommendedCyclesMin}–{ageGroup.recommendedCyclesMax} cycles)
          </p>
        </div>

        {/* Latency toggle button */}
        <button
          type="button"
          id="toggle-latency-btn"
          onClick={() => setShowLatencyControl(!showLatencyControl)}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
        >
          <Sliders className="w-3.5 h-3.5 text-indigo-500" />
          <span>Fall-asleep time: {latencyMinutes}m</span>
        </button>
      </div>

      {/* Latency Fine-Tuning Drawer */}
      {showLatencyControl && (
        <div className="my-3 p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-bold text-slate-900 dark:text-white">
                Sleep Onset Latency:
              </span>{' '}
              <span className="text-slate-600 dark:text-slate-300">
                The time between lights-out and actual slumber. (Medical average: 14 mins).
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {[0, 10, 14, 20, 30].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setLatencyMinutes(mins)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                    latencyMinutes === mins
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {mins === 0 ? '0m (asleep immediately)' : `${mins}m`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mode Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5">
        <button
          type="button"
          id="calc-mode-wake-up"
          onClick={() => setMode('wake_up_at')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
            mode === 'wake_up_at'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/20'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 dark:bg-slate-800/60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <Sun className="w-4 h-4" />
          <span>I need to wake up at...</span>
        </button>

        <button
          type="button"
          id="calc-mode-bedtime"
          onClick={() => setMode('bedtime_at')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
            mode === 'bedtime_at'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/20'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 dark:bg-slate-800/60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <Moon className="w-4 h-4" />
          <span>I plan to sleep at...</span>
        </button>

        <button
          type="button"
          id="calc-mode-sleep-now"
          onClick={() => setMode('sleep_now')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
            mode === 'sleep_now'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/20'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 dark:bg-slate-800/60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <BedDouble className="w-4 h-4" />
          <span>Sleep right now</span>
        </button>
      </div>

      {/* Target Time Selection Bar */}
      {mode !== 'sleep_now' ? (
        <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <label htmlFor="target-time-input" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {mode === 'wake_up_at' ? 'Target Wake-Up Time' : 'Target Bedtime'}
              </label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  id="target-time-input"
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="text-xl sm:text-2xl font-black bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Quick nudge buttons */}
          <div className="flex items-center gap-1.5 self-end sm:self-center">
            <button
              type="button"
              id="nudge-minus-15"
              onClick={() => adjustMinutes(-15)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              -15 min
            </button>
            <button
              type="button"
              id="nudge-plus-15"
              onClick={() => adjustMinutes(15)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              +15 min
            </button>
            {mode === 'wake_up_at' ? (
              <>
                <button
                  type="button"
                  id="quick-preset-6am"
                  onClick={() => setSelectedTime('06:00')}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  6:00 AM
                </button>
                <button
                  type="button"
                  id="quick-preset-7am"
                  onClick={() => setSelectedTime('07:00')}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  7:00 AM
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  id="quick-preset-10pm"
                  onClick={() => setSelectedTime('22:00')}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  10:00 PM
                </button>
                <button
                  type="button"
                  id="quick-preset-11pm"
                  onClick={() => setSelectedTime('23:00')}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  11:00 PM
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Going to bed right now
              </span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Calculates wake-up alarms factoring in {latencyMinutes} minutes to fall asleep.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="mt-6 mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
          <span>
            {mode === 'wake_up_at' ? 'Recommended Bedtimes' : 'Recommended Wake-Up Times'}
          </span>
          <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
            (End of full {ageGroup.standardCycleMinutes}-min sleep cycles)
          </span>
        </h3>
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hidden sm:inline-flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5" />
          Optimal for {ageGroup.name} highlighted
        </span>
      </div>

      {/* Calculated Options Grid */}
      <div
        id="calculated-options-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        {calculatedOptions.map((opt, idx) => {
          const isOptimal = opt.status === 'optimal';
          const isAcceptable = opt.status === 'acceptable';
          const isSelected = selectedOption?.cycles === opt.cycles;

          return (
            <div
              key={idx}
              id={`sleep-option-${opt.cycles}-cycles`}
              onClick={() => setSelectedOption(opt)}
              className={`relative cursor-pointer rounded-xl p-4 border transition-all duration-150 ${
                isSelected
                  ? 'ring-2 ring-indigo-600 dark:ring-indigo-400'
                  : ''
              } ${
                isOptimal
                  ? 'bg-emerald-50/60 border-emerald-300 dark:bg-emerald-950/30 dark:border-emerald-800/70 shadow-xs'
                  : isAcceptable
                  ? 'bg-sky-50/50 border-sky-200 dark:bg-sky-950/30 dark:border-sky-800/60'
                  : 'bg-white border-slate-200 dark:bg-slate-800/60 dark:border-slate-700/60 opacity-80'
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    isOptimal
                      ? 'bg-emerald-600 text-white dark:bg-emerald-500'
                      : isAcceptable
                      ? 'bg-sky-600 text-white dark:bg-sky-500'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {opt.statusLabel}
                </span>

                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {opt.cycles} {opt.cycles === 1 ? 'cycle' : 'cycles'}
                </span>
              </div>

              {/* Primary Time Display */}
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  {opt.timeFormatted}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {opt.hoursText} of sleep
                </span>
              </div>

              {/* Description */}
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {opt.description}
              </p>

              {/* Bottom Actions */}
              <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Includes {opt.includesLatencyMinutes}m to fall asleep
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyTime(opt.timeFormatted);
                  }}
                  className="flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                >
                  {copiedTime === opt.timeFormatted ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Cycle Breakdown for Selected Option */}
      {selectedOption && (
        <div
          id="cycle-timeline-details"
          className="mt-6 p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Biological Cycle Breakdown for {selectedOption.timeFormatted} ({selectedOption.cycles} Complete Cycles)
              </h4>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {selectedOption.hoursText} actual sleep duration
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 pt-1">
            {Array.from({ length: selectedOption.cycles }).map((_, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
              >
                <div className="flex items-center justify-between font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  <span>Cycle {i + 1}</span>
                  <span className="text-[10px] text-slate-400">
                    {ageGroup.standardCycleMinutes}m
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  {i === 0
                    ? 'Initial NREM & Deep Delta Repair'
                    : i === 1
                    ? 'Growth hormone & muscle recovery'
                    : i === selectedOption.cycles - 1
                    ? 'Long REM cycle & natural cortisol rise'
                    : 'Cognitive memory consolidation'}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-slate-600 dark:text-slate-400">
            <strong className="text-slate-800 dark:text-slate-200">Why this works: </strong>
            Waking up at {selectedOption.timeFormatted} catches you at the end of Cycle {selectedOption.cycles}, during light Stage 1/2 or following REM sleep. This prevents waking during Stage 3 Slow-Wave deep sleep, which is the primary medical cause of painful morning grogginess (sleep inertia).
          </p>
        </div>
      )}
    </section>
  );
};
