import { AgeGroup, SleepStage } from '../types';

export const AGE_GROUPS: AgeGroup[] = [
  {
    id: 'newborns',
    name: 'Newborns',
    badge: '0–3 Months',
    ageRangeLabel: '0 to 3 months',
    minAgeMonths: 0,
    maxAgeMonths: 3,
    recommendedHoursMin: 14,
    recommendedHoursMax: 17,
    mayBeAppropriateMin: 11,
    mayBeAppropriateMax: 19,
    recommendedCyclesMin: 9,
    recommendedCyclesMax: 11,
    standardCycleMinutes: 50, // Newborns have ~50 min ultradian cycles
    isUltradian90Min: false,
    napFrequency: '3 to 5 daytime sleep bouts',
    napAdvice: 'Sleep is polyphasic across day and night. Night-day circadian rhythm does not fully stabilize until ~8–12 weeks of age.',
    clinicalSummary: 'Newborns spend approximately 50% of their sleep in Active (REM-like) sleep, which is essential for rapid brain synaptic connectivity and neural growth.',
    circadianTendency: 'Polyphasic; driven by feeding intervals rather than light-dark circadian entrainment.',
    keyTips: [
      'Encourage daytime light exposure and quiet, dark nighttime feeding environments to cultivate day-night distinction.',
      'Place baby to sleep safely on their back on a firm, flat surface (AAP Safe Sleep Guidelines).',
      'Expect frequent waking every 2 to 3 hours for hydration and nutritional intake.'
    ],
    stagesNote: 'Newborn sleep alternates between Active sleep (fluttering eyes, vocalizations, muscle twitches) and Quiet sleep (slow, rhythmic breathing).',
    iconName: 'Baby'
  },
  {
    id: 'infants',
    name: 'Infants',
    badge: '4–11 Months',
    ageRangeLabel: '4 to 11 months',
    minAgeMonths: 4,
    maxAgeMonths: 11,
    recommendedHoursMin: 12,
    recommendedHoursMax: 15,
    mayBeAppropriateMin: 10,
    mayBeAppropriateMax: 18,
    recommendedCyclesMin: 8,
    recommendedCyclesMax: 10,
    standardCycleMinutes: 60,
    isUltradian90Min: false,
    napFrequency: '2 to 3 naps per day',
    napAdvice: 'Total sleep includes 9–10 hours overnight and 3–4 hours split across daytime morning and afternoon naps.',
    clinicalSummary: 'Circadian rhythms solidify around 4–6 months. Melatonin secretion aligns with evening darkness, allowing longer stretches of consolidated night sleep.',
    circadianTendency: 'Biphasic to triphasic; consolidation into a long nocturnal sleep block emerges.',
    keyTips: [
      'Establish a predictable 20-minute soothing bedtime routine (bath, quiet story, lullaby).',
      'Watch for sleep regression around 4 and 8–9 months coinciding with physical milestones like rolling and crawling.',
      'Put infant down drowsy but awake to foster self-soothing associations.'
    ],
    stagesNote: 'Sleep cycles lengthen from 50 to 60 minutes and begin exhibiting mature NREM stages including sleep spindles and deep slow waves.',
    iconName: 'Baby'
  },
  {
    id: 'toddlers',
    name: 'Toddlers',
    badge: '1–2 Years',
    ageRangeLabel: '1 to 2 years (12–35 months)',
    minAgeMonths: 12,
    maxAgeMonths: 35,
    recommendedHoursMin: 11,
    recommendedHoursMax: 14,
    mayBeAppropriateMin: 9,
    mayBeAppropriateMax: 16,
    recommendedCyclesMin: 7,
    recommendedCyclesMax: 9,
    standardCycleMinutes: 60,
    isUltradian90Min: false,
    napFrequency: '1 to 2 naps (consolidating to 1 nap by 18 mos)',
    napAdvice: 'Toddlers typically transition from two naps to a single 1.5–2.5 hour afternoon nap between 14 and 18 months.',
    clinicalSummary: 'Sleep is paramount for motor learning, language acquisition, and emotional regulation. Night terrors and bedtime resistance often emerge during this stage.',
    circadianTendency: 'Biphasic (overnight stretch plus one midday siesta).',
    keyTips: [
      'Maintain consistent nap and night bedtime hours—even on weekends—to maintain circadian consistency.',
      'Limit screen stimulation at least 60 minutes before lights out.',
      'Provide a comforting transitional object (small blanket or stuffed animal if over 12 months).'
    ],
    stagesNote: 'Cycles average 60 minutes; deep stage 3 slow-wave sleep accounts for a high percentage of early nighttime sleep.',
    iconName: 'Footprints'
  },
  {
    id: 'preschoolers',
    name: 'Preschoolers',
    badge: '3–5 Years',
    ageRangeLabel: '3 to 5 years',
    minAgeMonths: 36,
    maxAgeMonths: 71,
    recommendedHoursMin: 10,
    recommendedHoursMax: 13,
    mayBeAppropriateMin: 8,
    mayBeAppropriateMax: 14,
    recommendedCyclesMin: 7,
    recommendedCyclesMax: 9,
    standardCycleMinutes: 75,
    isUltradian90Min: false,
    napFrequency: '0 to 1 afternoon nap',
    napAdvice: 'Most children gradually drop their daytime nap between ages 3 and 5. If napping stops, replace it with 45 minutes of quiet rest.',
    clinicalSummary: 'Active imaginations can trigger vivid nighttime dreams or fear of the dark. Consistent routines prevent bedtime stalling and behavioral sleeplessness.',
    circadianTendency: 'Consolidating into single nocturnal monophasic sleep.',
    keyTips: [
      'Keep bedroom dark and cool (around 68°F / 20°C); use a dim amber nightlight if child fears the dark.',
      'Encourage daytime gross motor outdoor play to boost sleep pressure and nighttime sleep depth.',
      'Avoid high-sugar snacks or drinks within 2 hours of bedtime.'
    ],
    stagesNote: 'Sleep cycle transitions closer to adult architecture, lengthening to 70–75 minutes with robust delta wave production.',
    iconName: 'Smile'
  },
  {
    id: 'school_age',
    name: 'School-Age Children',
    badge: '6–12 Years',
    ageRangeLabel: '6 to 12 years',
    minAgeMonths: 72,
    maxAgeMonths: 155,
    recommendedHoursMin: 9,
    recommendedHoursMax: 12,
    mayBeAppropriateMin: 7,
    mayBeAppropriateMax: 12,
    recommendedCyclesMin: 6,
    recommendedCyclesMax: 8,
    standardCycleMinutes: 90,
    isUltradian90Min: true,
    napFrequency: 'Rarely nap; monophasic sleep',
    napAdvice: 'Children this age should obtain all their sleep overnight. Regular daytime drowsiness is a clear sign of chronic nighttime sleep restriction.',
    clinicalSummary: 'Essential for cognitive focus, executive function, academic retention, emotional stability, and immune defense.',
    circadianTendency: 'Naturally early risers (morning chronotype tendency), transitioning gradually toward later schedules around puberty.',
    keyTips: [
      'Enforce digital curfews: charge tablets, phones, and gaming consoles outside the bedroom.',
      'Maintain an 8:00 PM – 9:00 PM bedtime to accommodate early school start times.',
      'Support relaxation before bed with reading, drawing, or light stretching.'
    ],
    stagesNote: 'Cycles reach the mature 90-minute length with high levels of Slow-Wave Sleep (N3) where human growth hormone (HGH) peaks.',
    iconName: 'GraduationCap'
  },
  {
    id: 'teens',
    name: 'Teens & Adolescents',
    badge: '13–17 Years',
    ageRangeLabel: '13 to 17 years',
    minAgeMonths: 156,
    maxAgeMonths: 215,
    recommendedHoursMin: 8,
    recommendedHoursMax: 10,
    mayBeAppropriateMin: 7,
    mayBeAppropriateMax: 11,
    recommendedCyclesMin: 5,
    recommendedCyclesMax: 6, // 5 to 6.5 full 90-minute cycles
    standardCycleMinutes: 90,
    isUltradian90Min: true,
    napFrequency: 'Occasional short power nap (under 25 min)',
    napAdvice: 'If sleep-deprived, a 20-minute nap before 3:00 PM helps restore cognitive sharpness without disrupting bedtime sleep drive.',
    clinicalSummary: 'Biological circadian phase delay occurs during puberty: melatonin releases approximately 2 hours later in the evening compared to adults.',
    circadianTendency: 'Delayed sleep phase (evening chronotype preference). Natural biological drive to sleep around 11:00 PM and wake around 8:00 AM.',
    keyTips: [
      'Mitigate blue-light suppression: use night-shift mode and avoid phones in bed.',
      'Avoid oversleeping on weekends by more than 1.5 hours to avoid "social jetlag".',
      'Restrict caffeine intake after 1:00 PM.'
    ],
    stagesNote: 'Operates on standard 90-minute ultradian cycles (N1 → N2 → N3 → REM). Sleep debt impairs prefrontal cortex development and mood stability.',
    iconName: 'Sparkles'
  },
  {
    id: 'young_adults',
    name: 'Young Adults',
    badge: '18–25 Years',
    ageRangeLabel: '18 to 25 years',
    minAgeMonths: 216,
    maxAgeMonths: 311,
    recommendedHoursMin: 7,
    recommendedHoursMax: 9,
    mayBeAppropriateMin: 6,
    mayBeAppropriateMax: 11,
    recommendedCyclesMin: 5,
    recommendedCyclesMax: 6,
    standardCycleMinutes: 90,
    isUltradian90Min: true,
    napFrequency: 'Targeted power naps (15–20 min)',
    napAdvice: 'Keep naps short to avoid entering slow-wave deep sleep, which triggers post-nap grogginess (sleep inertia).',
    clinicalSummary: 'Brain maturation continues into the mid-20s. 5 to 6 full 90-minute cycles ensure sufficient REM sleep for emotional resilience and complex learning.',
    circadianTendency: 'Intermediate to evening chronotype; starts shifting earlier toward age 25.',
    keyTips: [
      'Synchronize your circadian clock by seeking direct sunlight within 30 minutes of waking.',
      'Be mindful of alcohol: while sedating, it fragments sleep and severely suppresses REM cycles.',
      'Aim for 5 complete 90-minute sleep cycles (7.5 hours) as the prime baseline.'
    ],
    stagesNote: 'Classic 90-minute cycles: early cycles are dominated by restorative deep N3 sleep; late morning cycles are dominated by vivid REM sleep.',
    iconName: 'Zap'
  },
  {
    id: 'adults',
    name: 'Adults',
    badge: '26–64 Years',
    ageRangeLabel: '26 to 64 years',
    minAgeMonths: 312,
    maxAgeMonths: 779,
    recommendedHoursMin: 7,
    recommendedHoursMax: 9,
    mayBeAppropriateMin: 6,
    mayBeAppropriateMax: 10,
    recommendedCyclesMin: 5,
    recommendedCyclesMax: 6,
    standardCycleMinutes: 90,
    isUltradian90Min: true,
    napFrequency: 'Optional 20-minute power nap before 2:00 PM',
    napAdvice: 'A 20-minute nap boosts alertness; avoid napping after 3:00 PM to protect adenosine sleep pressure for the night.',
    clinicalSummary: 'Consistent 7–9 hours (5–6 cycles) reduces cardiovascular risk, regulates insulin sensitivity, optimizes immune defense, and facilitates cellular waste clearance via the glymphatic system.',
    circadianTendency: 'Standard monophasic circadian rhythm (typically 10:30 PM–11:30 PM bedtime, 6:30 AM–7:30 AM wake).',
    keyTips: [
      'Maintain the same wake-up time 7 days a week to anchor your circadian rhythm.',
      'Ensure the sleep environment is quiet, pitch black, and climate-controlled (65°F–68°F / 18°C–20°C).',
      'Cut off caffeine 8 to 10 hours prior to anticipated bedtime.'
    ],
    stagesNote: 'Adults experience 4 to 6 discrete 90-minute ultradian cycles per night. Waking at the end of a cycle avoids sleep inertia.',
    iconName: 'User'
  },
  {
    id: 'older_adults',
    name: 'Older Adults',
    badge: '65+ Years',
    ageRangeLabel: '65+ years',
    minAgeMonths: 780,
    maxAgeMonths: 1400,
    recommendedHoursMin: 7,
    recommendedHoursMax: 8,
    mayBeAppropriateMin: 5,
    mayBeAppropriateMax: 9,
    recommendedCyclesMin: 4,
    recommendedCyclesMax: 5,
    standardCycleMinutes: 90,
    isUltradian90Min: true,
    napFrequency: '1 midday nap (20–30 minutes)',
    napAdvice: 'A brief early afternoon rest can compensate for increased nighttime awakenings without disrupting evening sleep onset.',
    clinicalSummary: 'Aging alters sleep architecture: percentage of slow-wave N3 deep sleep decreases, sleep becomes lighter with more micro-awakenings, and circadian phase shifts earlier.',
    circadianTendency: 'Advanced sleep phase syndrome tendency (feeling sleepy early in evening, e.g. 9:00 PM, waking early at 5:00 AM).',
    keyTips: [
      'Spend time outdoors in afternoon daylight to delay the early evening melatonin surge.',
      'Stay physically active during the day to deepen nighttime sleep stages.',
      'Limit evening fluids 2 hours before bed to reduce nocturia awakenings.'
    ],
    stagesNote: 'Cycles remain approximately 90 minutes, though Stage 3 delta sleep is naturally reduced, resulting in more time spent in light Stage 2 sleep.',
    iconName: 'HeartHandshake'
  }
];

export const SLEEP_STAGES: SleepStage[] = [
  {
    name: 'NREM Stage 1 (N1)',
    phase: 'Transition / Light Sleep',
    percentage: '4% – 5%',
    durationMinutes: '5 – 10 min',
    functionDesc: 'The bridge between wakefulness and slumber. Muscle tone relaxes, heart rate and breathing slow, and hypnic jerks (involuntary twitches) can occur.',
    brainWave: 'Alpha fading into Theta waves (4–7 Hz)',
    color: 'emerald'
  },
  {
    name: 'NREM Stage 2 (N2)',
    phase: 'True Light Sleep',
    percentage: '45% – 55%',
    durationMinutes: '35 – 50 min',
    functionDesc: 'Body temperature drops and eye movement stops. Characterized by rapid bursts of brain activity (sleep spindles) and K-complexes essential for synaptic memory consolidation.',
    brainWave: 'Theta waves with Sleep Spindles & K-Complexes',
    color: 'sky'
  },
  {
    name: 'NREM Stage 3 (N3)',
    phase: 'Slow-Wave / Deep Sleep',
    percentage: '20% – 25%',
    durationMinutes: '20 – 40 min',
    functionDesc: 'The deepest, most restorative sleep stage. Blood pressure drops, human growth hormone (HGH) releases, tissues repair, muscles rebuild, and the brain glymphatic waste-clearing system activates.',
    brainWave: 'High-amplitude Delta waves (0.5–2 Hz)',
    color: 'indigo'
  },
  {
    name: 'REM Sleep',
    phase: 'Rapid Eye Movement / Dream Sleep',
    percentage: '20% – 25%',
    durationMinutes: '15 – 30 min',
    functionDesc: 'Brain activity surges to near-waking levels, eyes dart behind closed lids, and temporary skeletal muscle paralysis (atonia) prevents acting out vivid dreams. Vital for emotional processing, neural plasticity, and creative problem-solving.',
    brainWave: 'Mixed-frequency desynchronized waves (similar to wakefulness)',
    color: 'violet'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'Why is the 90-minute sleep cycle so critical for waking refreshed?',
    answer: 'A standard adult sleep cycle progresses through light sleep, deep slow-wave sleep, and REM sleep, completing roughly every 90 minutes. If your alarm sounds in the middle of deep slow-wave sleep (Stage 3), you will experience severe "sleep inertia"—that heavy, disoriented grogginess that can linger for up to an hour. Timing your wake-up for the tail end of a 90-minute cycle ensures you awaken during light sleep or right after REM, feeling clear-headed and energized.'
  },
  {
    question: 'Do infants and toddlers also have 90-minute sleep cycles?',
    answer: 'No. Newborns and infants have much shorter ultradian sleep cycles—typically 50 to 60 minutes long. Their sleep is divided into Active (REM-like) and Quiet sleep. As children mature through preschool and elementary ages, their neurological architecture lengthens and stabilizes into the classic 90-minute adult sleep cycle.'
  },
  {
    question: 'What is the average sleep latency (time to fall asleep)?',
    answer: 'Clinical sleep studies show that healthy individuals take an average of 10 to 20 minutes (mean: 14 minutes) to transition from lights-out to Stage 1 sleep. Our calculator automatically factors in this 14-minute latency so that your actual asleep time aligns with full 90-minute cycles.'
  },
  {
    question: 'Is it better to get 6 hours (4 cycles) or 7 hours of interrupted sleep?',
    answer: 'Generally, waking up at the completion of 4 full cycles (6 hours) will leave you feeling less physically groggy in the moment than being interrupted mid-cycle at 7 hours. However, for chronic daily health, most adults require 5 cycles (7.5 hours) or 6 cycles (9 hours) to obtain sufficient slow-wave physical restoration and REM cognitive processing.'
  },
  {
    question: 'What is delayed sleep phase in teenagers?',
    answer: 'During puberty, the biological release of melatonin shifts by approximately two hours later in the evening compared to both younger children and mature adults. This is a genuine biological shift, not mere bedtime rebellion. Consequently, high school students naturally feel tired around 11:00 PM or midnight, making early school start times a challenge for adequate sleep.'
  }
];
