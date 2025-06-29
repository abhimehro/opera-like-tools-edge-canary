/**
 * HAZEOVER THEME SCHEDULER - Shared Core Logic
 * Browser-agnostic time-based theme scheduling
 * Used by: Edge Canary, Opera, Chrome, Firefox (future)
 */

// Universal time-based theme configuration matching HazeOver schedule
export const THEME_SCHEDULE = {
  day: { start: 7, end: 17.5 },      // 07:00 - 17:30
  evening: { start: 17.5, end: 19 }, // 17:30 - 19:00  
  night: { start: 19, end: 7 }       // 19:00 - 07:00 (next day)
};

/**
 * Get current time mode based on schedule
 * @returns {string} 'day', 'evening', or 'night'
 */
export function getCurrentTimeMode() {
  const now = new Date();
  const currentHour = now.getHours() + (now.getMinutes() / 60);
  
  if (currentHour >= THEME_SCHEDULE.day.start && currentHour < THEME_SCHEDULE.day.end) {
    return 'day';
  } else if (currentHour >= THEME_SCHEDULE.evening.start && currentHour < THEME_SCHEDULE.evening.end) {
    return 'evening';
  } else {
    return 'night';
  }
}

/**
 * Calculate next theme transition time
 * @param {string} currentMode - Current theme mode
 * @returns {object} Next transition info
 */
export function getNextTransition(currentMode = null) {
  const now = new Date();
  const currentHour = now.getHours() + (now.getMinutes() / 60);
  const mode = currentMode || getCurrentTimeMode();
  
  let nextMode, nextTime;
  
  switch (mode) {
    case 'day':
      nextMode = 'evening';
      nextTime = THEME_SCHEDULE.evening.start;
      break;
    case 'evening':
      nextMode = 'night';
      nextTime = THEME_SCHEDULE.night.start;
      break;
    case 'night':
      nextMode = 'day';
      nextTime = THEME_SCHEDULE.day.start;
      if (currentHour >= THEME_SCHEDULE.night.start) {
        // Next day
        nextTime += 24;
      }
      break;
  }
  
  const msUntilNext = ((nextTime - currentHour) * 3600 * 1000);
  
  return {
    nextMode,
    nextTime: nextTime % 24,
    msUntilNext: msUntilNext > 0 ? msUntilNext : msUntilNext + (24 * 3600 * 1000),
    formattedTime: `${Math.floor(nextTime % 24)}:${String(Math.floor((nextTime % 1) * 60)).padStart(2, '0')}`
  };
}

/**
 * Validate if a theme mode is valid
 * @param {string} mode - Theme mode to validate
 * @returns {boolean} True if valid
 */
export function isValidThemeMode(mode) {
  return ['day', 'evening', 'night'].includes(mode);
}

/**
 * Get time range for a specific mode
 * @param {string} mode - Theme mode
 * @returns {object} Start and end times
 */
export function getTimeRangeForMode(mode) {
  if (!isValidThemeMode(mode)) {
    throw new Error(`Invalid theme mode: ${mode}`);
  }
  
  return THEME_SCHEDULE[mode];
}

/**
 * Check if current time is within a specific mode's range
 * @param {string} mode - Theme mode to check
 * @returns {boolean} True if current time is in mode range
 */
export function isTimeInModeRange(mode) {
  const currentHour = new Date().getHours() + (new Date().getMinutes() / 60);
  const range = getTimeRangeForMode(mode);
  
  if (mode === 'night') {
    // Night mode spans midnight
    return currentHour >= range.start || currentHour < range.end;
  } else {
    return currentHour >= range.start && currentHour < range.end;
  }
}

console.log('📅 HazeOver Theme Scheduler (Shared) loaded');
