import React, { useState } from 'react';
import { AgeGroup } from '../types';
import { 
  Baby, 
  Footprints, 
  Smile, 
  GraduationCap, 
  Sparkles, 
  Zap, 
  User, 
  HeartHandshake,
  Search,
  CheckCircle2
} from 'lucide-react';

interface AgeSelectorProps {
  ageGroups: AgeGroup[];
  selectedAgeGroup: AgeGroup;
  onSelectAgeGroup: (group: AgeGroup) => void;
}

export const AgeSelector: React.FC<AgeSelectorProps> = ({
  ageGroups,
  selectedAgeGroup,
  onSelectAgeGroup
}) => {
  const [exactAgeInput, setExactAgeInput] = useState<string>('');
  const [exactUnit, setExactUnit] = useState<'years' | 'months'>('years');
  const [inputFeedback, setInputFeedback] = useState<string | null>(null);

  const getIcon = (name: string, isSelected: boolean) => {
    const className = `w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`;
    switch (name) {
      case 'Baby':
        return <Baby className={className} />;
      case 'Footprints':
        return <Footprints className={className} />;
      case 'Smile':
        return <Smile className={className} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'User':
        return <User className={className} />;
      case 'HeartHandshake':
        return <HeartHandshake className={className} />;
      default:
        return <User className={className} />;
    }
  };

  const handleExactAgeChange = (value: string, unit: 'years' | 'months') => {
    setExactAgeInput(value);
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) {
      setInputFeedback(null);
      return;
    }

    const ageInMonths = unit === 'years' ? num * 12 : num;

    const matched = ageGroups.find(
      (g) => ageInMonths >= g.minAgeMonths && ageInMonths <= g.maxAgeMonths
    );

    if (matched) {
      onSelectAgeGroup(matched);
      setInputFeedback(`Matched: ${matched.name} (${matched.badge})`);
    } else if (ageInMonths > 1400) {
      const older = ageGroups.find((g) => g.id === 'older_adults');
      if (older) {
        onSelectAgeGroup(older);
        setInputFeedback(`Matched: ${older.name} (${older.badge})`);
      }
    } else {
      setInputFeedback('Age out of normal range');
    }
  };

  return (
    <section id="age-selector-container" className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400">
            Step 1: Select or Input Age Group
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Choose a developmental stage or enter exact age for tailored medical metrics.
          </p>
        </div>

        {/* Quick Exact Age Input Widget */}
        <div
          id="exact-age-input-box"
          className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800"
        >
          <Search className="w-4 h-4 text-slate-400 ml-1.5 shrink-0" />
          <input
            id="exact-age-numeric-field"
            type="number"
            min="0"
            max="120"
            step="any"
            placeholder="Input age..."
            value={exactAgeInput}
            onChange={(e) => handleExactAgeChange(e.target.value, exactUnit)}
            className="w-24 sm:w-28 text-xs font-semibold bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex items-center rounded-lg bg-slate-200 dark:bg-slate-800 p-0.5 text-xs font-medium">
            <button
              type="button"
              id="unit-toggle-years"
              onClick={() => {
                setExactUnit('years');
                if (exactAgeInput) handleExactAgeChange(exactAgeInput, 'years');
              }}
              className={`px-2 py-1 rounded-md transition-all ${
                exactUnit === 'years'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Yrs
            </button>
            <button
              type="button"
              id="unit-toggle-months"
              onClick={() => {
                setExactUnit('months');
                if (exactAgeInput) handleExactAgeChange(exactAgeInput, 'months');
              }}
              className={`px-2 py-1 rounded-md transition-all ${
                exactUnit === 'months'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Mos
            </button>
          </div>
        </div>
      </div>

      {inputFeedback && (
        <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 animate-fadeIn">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>{inputFeedback}</span>
        </div>
      )}

      {/* Age Group Grid / Chips */}
      <div
        id="age-groups-grid"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2"
      >
        {ageGroups.map((group) => {
          const isSelected = selectedAgeGroup.id === group.id;
          return (
            <button
              key={group.id}
              id={`age-group-btn-${group.id}`}
              type="button"
              onClick={() => {
                onSelectAgeGroup(group);
                setInputFeedback(null);
              }}
              className={`group relative flex flex-col items-start text-left p-2.5 sm:p-3 rounded-xl border transition-all duration-150 ${
                isSelected
                  ? 'bg-indigo-50/80 border-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-400 shadow-sm ring-1 ring-indigo-600 dark:ring-indigo-400'
                  : 'bg-white border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <div
                  className={`p-1.5 rounded-lg ${
                    isSelected
                      ? 'bg-indigo-100 dark:bg-indigo-900/60'
                      : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                >
                  {getIcon(group.iconName, isSelected)}
                </div>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {group.badge}
                </span>
              </div>
              <span
                className={`text-xs font-bold leading-tight line-clamp-1 ${
                  isSelected
                    ? 'text-indigo-950 dark:text-white'
                    : 'text-slate-900 dark:text-slate-200'
                }`}
              >
                {group.name}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {group.recommendedHoursMin}–{group.recommendedHoursMax} hrs/day
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
