/**
 * HAZEOVER STORAGE MANAGER - Shared Storage Utilities
 * Browser-agnostic storage management for theme state
 * Supports: localStorage, chrome.storage, and fallback methods
 */

/**
 * Storage manager with multiple backend support
 */
export class StorageManager {
  constructor(storageType = 'auto') {
    this.storageType = storageType;
    this.prefix = 'hazeover-theme-';
    this.initializeStorage();
  }

  /**
   * Initialize storage based on available APIs
   */
  initializeStorage() {
    if (this.storageType === 'auto') {
      // Auto-detect best storage method
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        this.storageType = 'chrome';
        this.storage = chrome.storage.local;
      } else if (typeof browser !== 'undefined' && browser.storage && browser.storage.local) {
        this.storageType = 'webext';
        this.storage = browser.storage.local;
      } else if (typeof localStorage !== 'undefined') {
        this.storageType = 'local';
        this.storage = localStorage;
      } else {
        this.storageType = 'memory';
        this.storage = new Map();
      }
    }
    
    console.log(`💾 HazeOver Storage initialized: ${this.storageType}`);
  }

  /**
   * Get a value from storage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key not found
   * @returns {Promise<*>} Stored value or default
   */
  async get(key, defaultValue = null) {
    const fullKey = this.prefix + key;
    
    try {
      switch (this.storageType) {
        case 'chrome':
        case 'webext':
          return new Promise((resolve) => {
            this.storage.get([fullKey], (result) => {
              resolve(result[fullKey] !== undefined ? result[fullKey] : defaultValue);
            });
          });
          
        case 'local':
          const value = this.storage.getItem(fullKey);
          return value !== null ? JSON.parse(value) : defaultValue;
          
        case 'memory':
          return this.storage.get(fullKey) || defaultValue;
          
        default:
          return defaultValue;
      }
    } catch (error) {
      console.warn(`⚠️ Storage get error for ${key}:`, error);
      return defaultValue;
    }
  }

  /**
   * Set a value in storage
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   * @returns {Promise<boolean>} Success status
   */
  async set(key, value) {
    const fullKey = this.prefix + key;
    
    try {
      switch (this.storageType) {
        case 'chrome':
        case 'webext':
          return new Promise((resolve) => {
            this.storage.set({ [fullKey]: value }, () => {
              resolve(!chrome.runtime.lastError);
            });
          });
          
        case 'local':
          this.storage.setItem(fullKey, JSON.stringify(value));
          return true;
          
        case 'memory':
          this.storage.set(fullKey, value);
          return true;
          
        default:
          return false;
      }
    } catch (error) {
      console.warn(`⚠️ Storage set error for ${key}:`, error);
      return false;
    }
  }

  /**
   * Remove a value from storage
   * @param {string} key - Storage key
   * @returns {Promise<boolean>} Success status
   */
  async remove(key) {
    const fullKey = this.prefix + key;
    
    try {
      switch (this.storageType) {
        case 'chrome':
        case 'webext':
          return new Promise((resolve) => {
            this.storage.remove([fullKey], () => {
              resolve(!chrome.runtime.lastError);
            });
          });
          
        case 'local':
          this.storage.removeItem(fullKey);
          return true;
          
        case 'memory':
          this.storage.delete(fullKey);
          return true;
          
        default:
          return false;
      }
    } catch (error) {
      console.warn(`⚠️ Storage remove error for ${key}:`, error);
      return false;
    }
  }

  /**
   * Clear all HazeOver storage
   * @returns {Promise<boolean>} Success status
   */
  async clear() {
    try {
      switch (this.storageType) {
        case 'chrome':
        case 'webext':
          return new Promise((resolve) => {
            this.storage.get(null, (items) => {
              const keysToRemove = Object.keys(items).filter(key => key.startsWith(this.prefix));
              if (keysToRemove.length > 0) {
                this.storage.remove(keysToRemove, () => {
                  resolve(!chrome.runtime.lastError);
                });
              } else {
                resolve(true);
              }
            });
          });
          
        case 'local':
          const keys = Object.keys(this.storage).filter(key => key.startsWith(this.prefix));
          keys.forEach(key => this.storage.removeItem(key));
          return true;
          
        case 'memory':
          const memoryKeys = Array.from(this.storage.keys()).filter(key => key.startsWith(this.prefix));
          memoryKeys.forEach(key => this.storage.delete(key));
          return true;
          
        default:
          return false;
      }
    } catch (error) {
      console.warn('⚠️ Storage clear error:', error);
      return false;
    }
  }

  /**
   * Get current theme mode from storage
   * @returns {Promise<string|null>} Current theme mode
   */
  async getCurrentMode() {
    return await this.get('mode');
  }

  /**
   * Set current theme mode in storage
   * @param {string} mode - Theme mode to store
   * @returns {Promise<boolean>} Success status
   */
  async setCurrentMode(mode) {
    const success = await this.set('mode', mode);
    if (success) {
      await this.set('last-update', Date.now());
    }
    return success;
  }

  /**
   * Check if manual override is active
   * @returns {Promise<boolean>} True if override is active
   */
  async isManualOverrideActive() {
    const override = await this.get('manual-override');
    const until = await this.get('manual-until');
    
    if (override === true && until) {
      return Date.now() < until;
    }
    return false;
  }

  /**
   * Set manual override
   * @param {string} mode - Theme mode for override
   * @param {number} durationMs - Override duration in milliseconds
   * @returns {Promise<boolean>} Success status
   */
  async setManualOverride(mode, durationMs = 3600000) { // Default 1 hour
    const until = Date.now() + durationMs;
    const success1 = await this.set('manual-override', true);
    const success2 = await this.set('manual-until', until);
    const success3 = await this.setCurrentMode(mode);
    
    return success1 && success2 && success3;
  }

  /**
   * Clear manual override
   * @returns {Promise<boolean>} Success status
   */
  async clearManualOverride() {
    const success1 = await this.remove('manual-override');
    const success2 = await this.remove('manual-until');
    
    return success1 && success2;
  }
}

// Create default storage instance
export const storage = new StorageManager();

console.log('💾 HazeOver Storage Manager (Shared) loaded');
