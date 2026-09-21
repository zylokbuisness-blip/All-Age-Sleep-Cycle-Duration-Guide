import { AgeGroup, SleepCycleOption } from '../types';

export function formatTime12(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 is 12 AM
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
}

export function formatTime24(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function parseTimeToDate(timeString: string, baseDate = new Date()): Date {
  const [hoursStr, minutesStr] = timeString.split(':');
  const d = new Date(baseDate);
  d.setHours(parseInt(hoursStr, 10), parseInt(minutesStr, 10), 0, 0);
  return d;
}

export function calculateWakeUpOptions(
  bedtimeDate: Date,
  ageGroup: AgeGroup,
  latencyMinutes: number
): SleepCycleOption[] {
  const options: SleepCycleOption[] = [];
  const cycleMinutes = ageGroup.standardCycleMinutes;

  // Let's generate a healthy range of cycles depending on the age group
  // For standard 90-min: 3 to 7 cycles (4.5h to 10.5h)
  // For 60-min: 5 to 11 cycles
  const minCycles = Math.max(3, ageGroup.recommendedCyclesMin - 2);
  const maxCycles = Math.min(12, ageGroup.recommendedCyclesMax + 2);

  for (let cycles = minCycles; cycles <= maxCycles; cycles++) {
    const totalSleepMinutes = cycles * cycleMinutes;
    const totalDurationMinutes = totalSleepMinutes + latencyMinutes;

    const wakeDate = new Date(bedtimeDate.getTime() + totalDurationMinutes * 60 * 1000);
    const sleepHours = totalSleepMinutes / 60;

    let status: SleepCycleOption['status'] = 'insufficient';
    let statusLabel = 'Insufficient';
    let description = 'May lead to sleep debt and fatigue.';

    if (sleepHours >= ageGroup.recommendedHoursMin && sleepHours <= ageGroup.recommendedHoursMax) {
      status = 'optimal';
      statusLabel = 'Optimal Target';
      description = `Aligns perfectly with medical guidelines (${ageGroup.recommendedHoursMin}–${ageGroup.recommendedHoursMax} hrs).`;
    } else if (
      (sleepHours >= ageGroup.mayBeAppropriateMin && sleepHours < ageGroup.recommendedHoursMin) ||
      (sleepHours > ageGroup.recommendedHoursMax && sleepHours <= ageGroup.mayBeAppropriateMax)
    ) {
      status = 'acceptable';
      statusLabel = 'Acceptable';
      description = sleepHours < ageGroup.recommendedHoursMin ? 'Slightly below target range.' : 'Slightly above standard target.';
    } else if (sleepHours > ageGroup.mayBeAppropriateMax) {
      status = 'excessive';
      statusLabel = 'High Duration';
      description = 'Above typical recommended duration.';
    }

    const hours = Math.floor(totalSleepMinutes / 60);
    const mins = totalSleepMinutes % 60;
    const hoursText = mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;

    options.push({
      timeFormatted: formatTime12(wakeDate),
      time24h: formatTime24(wakeDate),
      cycles,
      totalSleepMinutes,
      hoursText,
      status,
      statusLabel,
      description,
      includesLatencyMinutes: latencyMinutes
    });
  }

  // Sort by cycles (or reverse if desired)
  return options;
}

export function calculateBedtimeOptions(
  targetWakeDate: Date,
  ageGroup: AgeGroup,
  latencyMinutes: number
): SleepCycleOption[] {
  const options: SleepCycleOption[] = [];
  const cycleMinutes = ageGroup.standardCycleMinutes;

  const minCycles = Math.max(3, ageGroup.recommendedCyclesMin - 2);
  const maxCycles = Math.min(12, ageGroup.recommendedCyclesMax + 2);

  for (let cycles = minCycles; cycles <= maxCycles; cycles++) {
    const totalSleepMinutes = cycles * cycleMinutes;
    const totalDurationMinutes = totalSleepMinutes + latencyMinutes;

    const bedtimeDate = new Date(targetWakeDate.getTime() - totalDurationMinutes * 60 * 1000);
    const sleepHours = totalSleepMinutes / 60;

    let status: SleepCycleOption['status'] = 'insufficient';
    let statusLabel = 'Insufficient';
    let description = 'May lead to daytime fatigue and cognitive grogginess.';

    if (sleepHours >= ageGroup.recommendedHoursMin && sleepHours <= ageGroup.recommendedHoursMax) {
      status = 'optimal';
      statusLabel = 'Optimal Target';
      description = `Within NSF recommended range (${ageGroup.recommendedHoursMin}–${ageGroup.recommendedHoursMax} hrs).`;
    } else if (
      (sleepHours >= ageGroup.mayBeAppropriateMin && sleepHours < ageGroup.recommendedHoursMin) ||
      (sleepHours > ageGroup.recommendedHoursMax && sleepHours <= ageGroup.mayBeAppropriateMax)
    ) {
      status = 'acceptable';
      statusLabel = 'Acceptable';
      description = sleepHours < ageGroup.recommendedHoursMin ? 'Acceptable if well-rested on previous days.' : 'Generous sleep duration.';
    } else if (sleepHours > ageGroup.mayBeAppropriateMax) {
      status = 'excessive';
      statusLabel = 'High Duration';
      description = 'Longer than typical daily requirement.';
    }

    const hours = Math.floor(totalSleepMinutes / 60);
    const mins = totalSleepMinutes % 60;
    const hoursText = mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;

    options.push({
      timeFormatted: formatTime12(bedtimeDate),
      time24h: formatTime24(bedtimeDate),
      cycles,
      totalSleepMinutes,
      hoursText,
      status,
      statusLabel,
      description,
      includesLatencyMinutes: latencyMinutes
    });
  }

  // Bedtimes are often best presented descending from most sleep to least sleep, so user sees the best bedtime first
  return options.reverse();
}
