import React, { useState } from 'react';
import { AgeGroup } from '../types';
import { BookOpen, Check, ChevronRight, ExternalLink, Filter } from 'lucide-react';

interface SleepGuideTableProps {
  ageGroups: AgeGroup[];
  selectedAgeGroup: AgeGroup;
  onSelectAgeGroup: (group: AgeGroup) => void;
}

export const SleepGuideTable: React.FC<SleepGuideTableProps> = ({
  ageGroups,
  selectedAgeGroup,
  onSelectAgeGroup
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'pediatric' | 'youth' | 'adult'>('all');

  const filteredGroups = ageGroups.filter((g) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'pediatric') return ['newborns', 'infants', 'toddlers', 'preschoolers'].includes(g.id);
    if (filterCategory === 'youth') return ['school_age', 'teens'].includes(g.id);
    if (filterCategory === 'adult') return ['young_adults', 'adults', 'older_adults'].includes(g.id);
    return true;
  });

  const handleSelect = (group: AgeGroup) => {
    onSelectAgeGroup(group);
    const target = document.getElementById('age-overview-panel');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="guide-table-section"
      className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-all"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Reference Standards
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Complete Medical Sleep Duration Matrix by Age
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Consensus recommendations synthesized from the National Sleep Foundation (NSF), American Academy of Sleep Medicine (AASM), and CDC.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              filterCategory === 'all'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Ages
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('pediatric')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              filterCategory === 'pediatric'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            0–5 Yrs
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('youth')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              filterCategory === 'youth'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            6–17 Yrs
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('adult')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              filterCategory === 'adult'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            18+ Yrs
          </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto mt-4">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-3">Age Group</th>
              <th className="py-3 px-3">Age Bracket</th>
              <th className="py-3 px-3">Recommended Hours</th>
              <th className="py-3 px-3">May Be Appropriate</th>
              <th className="py-3 px-3">90-Min Cycles</th>
              <th className="py-3 px-3">Nap Frequency</th>
              <th className="py-3 px-3">Physiological Priority</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
            {filteredGroups.map((group) => {
              const isSelected = selectedAgeGroup.id === group.id;
              return (
                <tr
                  key={group.id}
                  id={`table-row-${group.id}`}
                  onClick={() => handleSelect(group)}
                  className={`group cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-100 font-semibold'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {group.name}
                      </span>
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 dark:text-slate-400">
                    {group.badge}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">
                    {group.recommendedHoursMin} – {group.recommendedHoursMax} hrs
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 dark:text-slate-400">
                    {group.mayBeAppropriateMin} – {group.mayBeAppropriateMax} hrs
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-indigo-600 dark:text-indigo-400">
                    {group.recommendedCyclesMin} – {group.recommendedCyclesMax} cycles
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400">
                    {group.napFrequency}
                  </td>
                  <td className="py-3.5 px-3 max-w-xs text-slate-600 dark:text-slate-400 truncate" title={group.clinicalSummary}>
                    {group.clinicalSummary}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                      {isSelected ? 'Active' : 'Select'}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View */}
      <div className="grid grid-cols-1 gap-3 md:hidden mt-4">
        {filteredGroups.map((group) => {
          const isSelected = selectedAgeGroup.id === group.id;
          return (
            <div
              key={group.id}
              onClick={() => handleSelect(group)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-50/70 border-indigo-400 dark:bg-indigo-950/40 dark:border-indigo-600'
                  : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  {group.name}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {group.badge}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs my-2">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Recommended</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {group.recommendedHoursMin}–{group.recommendedHoursMax} hrs
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">90-Min Cycles</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {group.recommendedCyclesMin}–{group.recommendedCyclesMax} cycles
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                {group.clinicalSummary}
              </p>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>{group.napFrequency}</span>
                <span className="flex items-center gap-0.5">
                  {isSelected ? 'Currently Loaded' : 'Calculate For This Age'}
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
        <span>
          Data sources: National Sleep Foundation (NSF) Sleep Duration Consensus & American Academy of Sleep Medicine (AASM).
        </span>
        <span className="font-semibold text-slate-600 dark:text-slate-300">
          Click any row to test in calculator
        </span>
      </div>
    </section>
  );
};
