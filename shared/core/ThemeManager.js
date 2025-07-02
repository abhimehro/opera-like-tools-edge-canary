/**
 * HAZEOVER THEME MANAGER - Shared Core Logic
 * Universal theme management system for all browsers
 * Coordinates scheduling, storage, and theme application
 */

import { getCurrentTimeMode, getNextTransition, isValidThemeMode } from './ThemeScheduler.js';
import { storage } from '../utils/StorageManager.js';
import { createBrowserTheme } from '../themes/BaseThemes.js';

export class ThemeManager {
  constructor(browserName, browserSelectors = {}, customCSS = '') {
    this.browserName = browserName;
    this.browserSelectors = browserSelectors;
    this.customCSS = customCSS;
    this.storage = storage;
    this.intervalId = null;
    this.isInitialized = false;
    
    console.log(`🎨 HazeOver Theme Manager initialized for ${browserName}`);
  }

  /**
   * Initialize the theme system
   * @param {boolean} startAutoMode - Whether to start automatic theme switching
   * @returns {Promise<string>} Initial theme mode
   */
  async initialize(startAutoMode = true) {
    try {
      // Get initial theme mode
      const currentMode = getCurrentTimeMode();
      
      // Apply initial theme
      await this.applyTheme(currentMode);
      
      // Start automatic checking if requested
      if (startAutoMode) {
        await this.startAutoMode();
      }
      
      this.isInitialized = true;
      console.log(`🚀 HazeOver Theme Manager initialized: ${currentMode} mode`);
      
      return currentMode;
    } catch (error) {
      console.error('❌ Theme Manager initialization failed:', error);
      throw error;
    }
  }

  /**
   * Apply a theme to the current page
   * @param {string} mode - Theme mode to apply
   * @param {boolean} isManual - Whether this is a manual override
   * @returns {Promise<boolean>} Success status
   */
  async applyTheme(mode, isManual = false) {
    if (!isValidThemeMode(mode)) {
      throw new Error(`Invalid theme mode: ${mode}`);
    }

    try {
      // Create browser-specific theme
      const theme = createBrowserTheme(mode, this.browserName, this.browserSelectors, this.customCSS);
      
      // Remove existing theme styles
      this.removeExistingTheme();
      
      // Apply new theme CSS
      this.injectThemeCSS(theme);
      
      // Set document attributes for CSS targeting
      this.setDocumentAttributes(mode);
      
      // Store current mode
      await this.storage.setCurrentMode(mode);
      
      // If manual override, set storage flags
      if (isManual) {
        await this.storage.setManualOverride(mode);
        console.log(`🎯 Manual theme override: ${mode} mode (1 hour)`);
      }
      
      // Dispatch custom event
      this.dispatchThemeEvent(mode, theme.colors);
      
      console.log(`🎨 Theme applied: ${mode.toUpperCase()} mode for ${this.browserName}`);
      return true;
      
    } catch (error) {
      console.error(`❌ Failed to apply ${mode} theme:`, error);
      return false;
    }
  }

  /**
   * Start automatic theme switching based on time
   * @param {number} intervalMs - Check interval in milliseconds
   * @returns {Promise<void>}
   */
  async startAutoMode(intervalMs = 60000) { // Default: check every minute
    // Stop existing interval if running
    this.stopAutoMode();
    
    this.intervalId = setInterval(async () => {
      try {
        // Skip if manual override is active
        if (await this.storage.isManualOverrideActive()) {
          return;
        }
        
        const newMode = getCurrentTimeMode();
        const currentMode = await this.storage.getCurrentMode();
        
        // Only apply if mode has changed
        if (newMode !== currentMode) {
          await this.applyTheme(newMode);
          console.log(`🔄 Auto-switched to ${newMode} mode`);
        }
      } catch (error) {
        console.error('❌ Auto theme check failed:', error);
      }
    }, intervalMs);
    
    console.log(`⏰ Auto theme switching started (${intervalMs}ms interval)`);
  }

  /**
   * Stop automatic theme switching
   */
  stopAutoMode() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('⏹️ Auto theme switching stopped');
    }
  }

  /**
   * Set theme manually (with temporary override)
   * @param {string} mode - Theme mode to set
   * @param {number} durationMs - Override duration (default: 1 hour)
   * @returns {Promise<boolean>} Success status
   */
  async setThemeManually(mode, durationMs = 3600000) {
    const success = await this.applyTheme(mode, true);
    
    if (success) {
      // Clear override after duration
      setTimeout(async () => {
        await this.clearManualOverride();
        console.log('🔄 Manual override expired, resuming automatic switching');
      }, durationMs);
    }
    
    return success;
  }

  /**
   * Clear manual override and resume automatic switching
   * @returns {Promise<boolean>} Success status
   */
  async clearManualOverride() {
    try {
      await this.storage.clearManualOverride();
      
      // Apply current time-based theme
      const currentMode = getCurrentTimeMode();
      await this.applyTheme(currentMode);
      
      console.log('🔄 Manual override cleared');
      return true;
    } catch (error) {
      console.error('❌ Failed to clear manual override:', error);
      return false;
    }
  }

  /**
   * Get current theme status
   * @returns {Promise<object>} Theme status information
   */
  async getStatus() {
    const currentMode = getCurrentTimeMode();
    const storedMode = await this.storage.getCurrentMode();
    const isOverrideActive = await this.storage.isManualOverrideActive();
    const nextTransition = getNextTransition(currentMode);
    
    return {
      currentMode,
      storedMode,
      isOverrideActive,
      nextTransition,
      isAutoModeActive: this.intervalId !== null,
      isInitialized: this.isInitialized,
      browserName: this.browserName
    };
  }

  /**
   * Remove existing theme styles from document
   * @private
   */
  removeExistingTheme() {
    // Remove HazeOver theme styles
    const existingStyles = document.querySelectorAll('style[id*="hazeover"], style[id*="theme"]');
    existingStyles.forEach(style => style.remove());
    
    // Remove theme data attributes
    document.body.removeAttribute('data-time-mode');
    document.documentElement.removeAttribute('data-hazeover-theme');
    document.documentElement.removeAttribute('data-theme-mode');
  }

  /**
   * Inject theme CSS into document
   * @param {object} theme - Theme object with CSS
   * @private
   */
  injectThemeCSS(theme) {
    const styleElement = document.createElement('style');
    styleElement.id = `hazeover-${this.browserName}-theme-style`;
    styleElement.textContent = theme.css;
    document.head.appendChild(styleElement);
  }

  /**
   * Set document attributes for CSS targeting
   * @param {string} mode - Theme mode
   * @private
   */
  setDocumentAttributes(mode) {
    document.body.setAttribute('data-time-mode', mode);
    document.documentElement.setAttribute('data-hazeover-theme', mode);
    document.documentElement.setAttribute('data-theme-mode', mode);
    document.documentElement.setAttribute('data-browser', this.browserName);
  }

  /**
   * Dispatch custom theme change event
   * @param {string} mode - Theme mode
   * @param {object} colors - Theme colors
   * @private
   */
  dispatchThemeEvent(mode, colors) {
    const event = new CustomEvent('hazeOverThemeChanged', {
      detail: {
        mode,
        colors,
        browser: this.browserName,
        timestamp: Date.now()
      }
    });
    
    window.dispatchEvent(event);
  }

  /**
   * Cleanup resources
   */
  destroy() {
    this.stopAutoMode();
    this.removeExistingTheme();
    this.isInitialized = false;
    console.log(`🗑️ Theme Manager destroyed for ${this.browserName}`);
  }
}

// Export utilities for standalone use
export {
  getCurrentTimeMode,
  getNextTransition,
  isValidThemeMode
} from './ThemeScheduler.js';

export { storage } from '../utils/StorageManager.js';

console.log('🎛️ HazeOver Theme Manager (Shared) loaded');
