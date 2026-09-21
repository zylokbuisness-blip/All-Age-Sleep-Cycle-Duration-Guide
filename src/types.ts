export interface AgeGroup {
  id: string;
  name: string;
  badge: string;
  ageRangeLabel: string;
  minAgeMonths: number;
  maxAgeMonths: number;
  recommendedHoursMin: number;
  recommendedHoursMax: number;
  mayBeAppropriateMin: number;
  mayBeAppropriateMax: number;
  recommendedCyclesMin: number;
  recommendedCyclesMax: number;
  standardCycleMinutes: number; // 90 min for children/adults, 50-60 min for infants
  isUltradian90Min: boolean;
  napAdvice: string;
  napFrequency: string;
  clinicalSummary: string;
  circadianTendency: string;
  keyTips: string[];
  stagesNote: string;
  iconName: string;
}

export type CalculatorMode = 'wake_up_at' | 'bedtime_at' | 'sleep_now';

export interface SleepCycleOption {
  timeFormatted: string; // e.g., "6:30 AM"
  time24h: string; // "06:30"
  cycles: number;
  totalSleepMinutes: number;
  hoursText: string; // e.g., "7h 30m"
  status: 'optimal' | 'acceptable' | 'insufficient' | 'excessive';
  statusLabel: string;
  description: string;
  includesLatencyMinutes: number;
}

export interface SleepStage {
  name: string;
  phase: string;
  percentage: string;
  durationMinutes: string;
  functionDesc: string;
  brainWave: string;
  color: string;
}
