/**
 * HAZEOVER SHARED UTILITIES - Main Export
 * Central export file for all shared HazeOver functionality
 * Import everything you need from a single location
 */

// Core functionality
export { ThemeManager } from './core/ThemeManager.js';
export { 
  getCurrentTimeMode, 
  getNextTransition, 
  isValidThemeMode,
  THEME_SCHEDULE 
} from './core/ThemeScheduler.js';

// Storage utilities
export { StorageManager, storage } from './utils/StorageManager.js';

// Theme definitions
export {
  BASE_COLOR_SCHEMES,
  BASE_CSS_TEMPLATE,
  COMMON_SELECTORS,
  generateThemeCSS,
  getThemeColors,
  getAvailableModes,
  isValidMode,
  createBrowserTheme
} from './themes/BaseThemes.js';

/**
 * Quick setup function for browser implementations
 * @param {string} browserName - Name of the browser ('edge-canary', 'opera', etc.)
 * @param {object} browserSelectors - Browser-specific CSS selectors
 * @param {string} customCSS - Additional CSS rules
 * @returns {ThemeManager} Configured theme manager instance
 */
export function createHazeOverThemeManager(browserName, browserSelectors = {}, customCSS = '') {
  return new ThemeManager(browserName, browserSelectors, customCSS);
}

/**
 * Initialize HazeOver theming with minimal setup
 * @param {string} browserName - Browser identifier
 * @param {object} options - Configuration options
 * @returns {Promise<ThemeManager>} Initialized theme manager
 */
export async function initializeHazeOver(browserName, options = {}) {
  const {
    browserSelectors = {},
    customCSS = '',
    autoStart = true,
    checkInterval = 60000
  } = options;
  
  const themeManager = new ThemeManager(browserName, browserSelectors, customCSS);
  await themeManager.initialize(autoStart);
  
  if (autoStart) {
    await themeManager.startAutoMode(checkInterval);
  }
  
  console.log(`🚀 HazeOver initialized for ${browserName}`);
  return themeManager;
}

/**
 * Get current HazeOver status across all systems
 * @returns {Promise<object>} Complete status information
 */
export async function getHazeOverStatus() {
  const currentMode = getCurrentTimeMode();
  const nextTransition = getNextTransition();
  const storageStatus = {
    currentMode: await storage.getCurrentMode(),
    isOverrideActive: await storage.isManualOverrideActive()
  };
  
  return {
    time: {
      current: new Date().toISOString(),
      mode: currentMode,
      nextTransition
    },
    storage: storageStatus,
    version: '1.0.0',
    shared: true
  };
}

// Version info
export const HAZEOVER_SHARED_VERSION = '1.0.0';

console.log(`📦 HazeOver Shared Utilities v${HAZEOVER_SHARED_VERSION} loaded`);
