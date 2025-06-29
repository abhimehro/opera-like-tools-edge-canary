/**
 * HazeOver Orion Background Service Worker
 * Privacy-first theme management for Orion RC Browser
 * WebKit-optimized with zero telemetry
 */

import { OrionThemeManager } from '../../shared/managers/OrionThemeManager.js';
import { ThemeScheduler } from '../../shared/core/ThemeScheduler.js';
import { OrionConfig } from '../../shared/configs/orion-config.js';

// Initialize Orion-specific components
const orionThemeManager = new OrionThemeManager();
const themeScheduler = new ThemeScheduler();

// Orion background service configuration
const OrionBackgroundService = {
  
  // Service state
  isInitialized: false,
  privacyMode: true,
  currentTheme: null,
  
  /**
   * Initialize the Orion background service
   */
  async init() {
    if (this.isInitialized) return;
    
    console.log('🌟 Initializing HazeOver background service for Orion RC Browser');
    
    try {
      // 1. Setup privacy-first storage
      await this.initializePrivacyStorage();
      
      // 2. Setup theme scheduling
      await this.initializeThemeScheduling();
      
      // 3. Setup message handlers
      this.setupMessageHandlers();
      
      // 4. Setup browser-specific handlers
      this.setupOrionHandlers();
      
      // 5. Setup privacy-safe alarms
      this.setupPrivacyAlarms();
      
      // 6. Load saved theme preferences
      await this.loadThemePreferences();
      
      this.isInitialized = true;
      console.log('✅ HazeOver Orion background service initialized');
      
    } catch (error) {
      console.error('❌ Error initializing Orion background service:', error);
    }
  },
  
  /**
   * Initialize privacy-safe storage
   */
  async initializePrivacyStorage() {
    console.log('🔒 Setting up privacy-first storage...');
    
    // Set privacy mode flag
    await chrome.storage.local.set({
      'hazeover-orion-privacy': true,
      'hazeover-telemetry': false,
      'hazeover-analytics': false,
      'hazeover-external-requests': false
    });
    
    // Clear any existing sync data (privacy-first approach)
    try {
      await chrome.storage.sync.clear();
      console.log('🧹 Cleared sync storage for privacy');
    } catch (error) {
      console.log('ℹ️ Sync storage not available or already clear');
    }
  },
  
  /**
   * Initialize theme scheduling with privacy considerations
   */
  async initializeThemeScheduling() {
    console.log('⏰ Setting up privacy-safe theme scheduling...');
    
    // Configure scheduler for privacy
    themeScheduler.configure({
      browser: 'orion',
      privacy: true,
      telemetry: false,
      storage: 'local-only'
    });
    
    // Load existing schedules
    const schedules = await this.getStoredSchedules();
    if (schedules && schedules.length > 0) {
      console.log(`📅 Loaded ${schedules.length} theme schedules`);
      schedules.forEach(schedule => {
        themeScheduler.addSchedule(schedule);
      });
    }
  },
  
  /**
   * Setup message handlers for communication
   */
  setupMessageHandlers() {
    console.log('📨 Setting up Orion message handlers...');
    
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse);
      return true; // Keep message channel open for async responses
    });
  },
  
  /**
   * Handle incoming messages
   */
  async handleMessage(message, sender, sendResponse) {
    try {
      switch (message.type) {
        
        case 'apply-theme':
          await this.handleApplyTheme(message, sendResponse);
          break;
          
        case 'schedule-theme':
          await this.handleScheduleTheme(message, sendResponse);
          break;
          
        case 'get-current-theme':
          await this.handleGetCurrentTheme(message, sendResponse);
          break;
          
        case 'toggle-theme':
          await this.handleToggleTheme(message, sendResponse);
          break;
          
        case 'system-theme-change':
          await this.handleSystemThemeChange(message, sendResponse);
          break;
          
        case 'get-performance':
          await this.handleGetPerformance(message, sendResponse);
          break;
          
        case 'privacy-mode':
          await this.handlePrivacyMode(message, sendResponse);
          break;
          
        default:
          console.warn('Unknown message type:', message.type);
          sendResponse({ error: 'Unknown message type' });
      }
    } catch (error) {
      console.error('Error handling message:', error);
      sendResponse({ error: error.message });
    }
  },
  
  /**
   * Handle theme application
   */
  async handleApplyTheme(message, sendResponse) {
    console.log('🎨 Applying theme for Orion:', message.theme?.name);
    
    try {
      // Apply theme using Orion theme manager
      const result = await orionThemeManager.applyTheme(message.theme);
      
      // Store current theme privately
      await this.storeCurrentThemePrivately(message.theme);
      
      // Notify all tabs about theme change
      await this.notifyTabsThemeChange(message.theme);
      
      sendResponse({
        success: true,
        theme: message.theme.name,
        browser: 'orion',
        privacy: 'protected'
      });
      
    } catch (error) {
      console.error('Error applying theme:', error);
      sendResponse({ success: false, error: error.message });
    }
  },
  
  /**
   * Handle theme scheduling
   */
  async handleScheduleTheme(message, sendResponse) {
    console.log('📅 Scheduling theme for Orion:', message.schedule);
    
    try {
      // Add schedule to theme scheduler
      const scheduleId = await themeScheduler.addSchedule(message.schedule);
      
      // Store schedules privately
      await this.storeSchedulesPrivately();
      
      // Setup alarm for next scheduled theme
      await this.setupNextThemeAlarm();
      
      sendResponse({
        success: true,
        scheduleId,
        privacy: 'protected'
      });
      
    } catch (error) {
      console.error('Error scheduling theme:', error);
      sendResponse({ success: false, error: error.message });
    }
  },
  
  /**
   * Handle get current theme
   */
  async handleGetCurrentTheme(message, sendResponse) {
    try {
      const currentTheme = await this.getCurrentThemePrivately();
      sendResponse({
        success: true,
        theme: currentTheme,
        browser: 'orion'
      });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  },
  
  /**
   * Handle theme toggle
   */
  async handleToggleTheme(message, sendResponse) {
    console.log('🔄 Toggling theme for Orion');
    
    try {
      const currentTheme = await this.getCurrentThemePrivately();
      const newTheme = currentTheme?.isDark ? 'light' : 'dark';
      
      // Apply opposite theme
      const themeData = await this.getThemeData(newTheme);
      await this.handleApplyTheme({ theme: themeData }, sendResponse);
      
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  },
  
  /**
   * Handle system theme change
   */
  async handleSystemThemeChange(message, sendResponse) {
    console.log('🌓 System theme change detected:', message.theme);
    
    try {
      // Check if auto-theme is enabled
      const autoTheme = await this.getAutoThemeSetting();
      if (autoTheme) {
        const themeData = await this.getThemeData(message.theme);
        await this.handleApplyTheme({ theme: themeData }, sendResponse);
      } else {
        sendResponse({ success: true, autoTheme: false });
      }
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  },
  
  /**
   * Handle performance metrics request
   */
  async handleGetPerformance(message, sendResponse) {
    try {
      const metrics = await orionThemeManager.getPerformanceMetrics();
      sendResponse({
        success: true,
        metrics,
        browser: 'orion',
        engine: 'webkit'
      });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  },
  
  /**
   * Handle privacy mode toggle
   */
  async handlePrivacyMode(message, sendResponse) {
    console.log('🔒 Privacy mode request:', message.enabled);
    
    try {
      await chrome.storage.local.set({
        'hazeover-privacy-mode': message.enabled,
        'hazeover-telemetry': !message.enabled,
        'hazeover-analytics': !message.enabled
      });
      
      this.privacyMode = message.enabled;
      
      sendResponse({
        success: true,
        privacyMode: message.enabled,
        browser: 'orion'
      });
      
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  },
  
  /**
   * Setup Orion-specific handlers
   */
  setupOrionHandlers() {
    console.log('🎯 Setting up Orion-specific handlers...');
    
    // Handle browser theme changes (if supported)
    if (chrome.theme && chrome.theme.onUpdated) {
      chrome.theme.onUpdated.addListener((updateInfo) => {
        this.handleBrowserThemeUpdate(updateInfo);
      });
    }
    
    // Handle extension startup
    chrome.runtime.onStartup.addListener(() => {
      this.handleExtensionStartup();
    });
    
    // Handle extension installation
    chrome.runtime.onInstalled.addListener((details) => {
      this.handleExtensionInstalled(details);
    });
  },
  
  /**
   * Handle browser theme updates
   */
  async handleBrowserThemeUpdate(updateInfo) {
    console.log('🎨 Browser theme updated:', updateInfo);
    
    // Sync with our theme if auto-sync is enabled
    const autoSync = await this.getAutoSyncSetting();
    if (autoSync && updateInfo.theme) {
      // Convert browser theme to our format and apply
      const convertedTheme = this.convertBrowserTheme(updateInfo.theme);
      await orionThemeManager.applyTheme(convertedTheme);
    }
  },
  
  /**
   * Handle extension startup
   */
  async handleExtensionStartup() {
    console.log('🚀 HazeOver Orion extension starting up...');
    
    // Re-initialize if needed
    if (!this.isInitialized) {
      await this.init();
    }
    
    // Apply last theme
    await this.applyLastTheme();
    
    // Resume scheduled themes
    await this.resumeThemeScheduling();
  },
  
  /**
   * Handle extension installation
   */
  async handleExtensionInstalled(details) {
    console.log('📦 HazeOver Orion extension installed:', details.reason);
    
    if (details.reason === 'install') {
      // First time installation
      await this.handleFirstInstall();
    } else if (details.reason === 'update') {
      // Extension update
      await this.handleExtensionUpdate(details);
    }
  },
  
  /**
   * Handle first installation
   */
  async handleFirstInstall() {
    console.log('🎉 Welcome to HazeOver for Orion!');
    
    // Set default preferences
    await chrome.storage.local.set({
      'hazeover-orion-first-install': true,
      'hazeover-privacy-mode': true,
      'hazeover-auto-theme': false,
      'hazeover-hardware-acceleration': true,
      'hazeover-webkit-optimized': true
    });
    
    // Apply default theme
    const defaultTheme = await this.getDefaultTheme();
    await orionThemeManager.applyTheme(defaultTheme);
  },
  
  /**
   * Setup privacy-safe alarms
   */
  setupPrivacyAlarms() {
    console.log('⏰ Setting up privacy-safe alarms...');
    
    // Listen for alarm events
    chrome.alarms.onAlarm.addListener((alarm) => {
      this.handleAlarm(alarm);
    });
    
    // Create cleanup alarm (privacy maintenance)
    chrome.alarms.create('privacy-cleanup', {
      delayInMinutes: 60, // Every hour
      periodInMinutes: 60
    });
  },
  
  /**
   * Handle alarm events
   */
  async handleAlarm(alarm) {
    console.log('⏰ Alarm triggered:', alarm.name);
    
    try {
      switch (alarm.name) {
        case 'theme-schedule':
          await this.handleScheduledTheme();
          break;
          
        case 'privacy-cleanup':
          await this.handlePrivacyCleanup();
          break;
          
        default:
          if (alarm.name.startsWith('theme-')) {
            await this.handleNamedThemeAlarm(alarm);
          }
      }
    } catch (error) {
      console.error('Error handling alarm:', error);
    }
  },
  
  /**
   * Handle scheduled theme application
   */
  async handleScheduledTheme() {
    console.log('📅 Applying scheduled theme...');
    
    const nextTheme = await themeScheduler.getNextTheme();
    if (nextTheme) {
      await orionThemeManager.applyTheme(nextTheme);
      await this.setupNextThemeAlarm();
    }
  },
  
  /**
   * Handle privacy cleanup
   */
  async handlePrivacyCleanup() {
    console.log('🧹 Performing privacy cleanup...');
    
    // Remove any temporary data
    const keysToRemove = [];
    const allData = await chrome.storage.local.get();
    
    for (const [key, value] of Object.entries(allData)) {
      // Remove old temporary data
      if (key.includes('temp-') || key.includes('cache-')) {
        keysToRemove.push(key);
      }
      
      // Remove data older than 30 days
      if (value.timestamp && Date.now() - value.timestamp > 30 * 24 * 60 * 60 * 1000) {
        keysToRemove.push(key);
      }
    }
    
    if (keysToRemove.length > 0) {
      await chrome.storage.local.remove(keysToRemove);
      console.log(`🗑️ Cleaned up ${keysToRemove.length} old data items`);
    }
  },
  
  /**
   * Notify all tabs about theme change
   */
  async notifyTabsThemeChange(theme) {
    try {
      const tabs = await chrome.tabs.query({});
      const promises = tabs.map(tab => 
        chrome.tabs.sendMessage(tab.id, {
          type: 'apply-theme',
          theme: theme,
          browser: 'orion'
        }).catch(() => {}) // Ignore errors for tabs that can't receive messages
      );
      
      await Promise.all(promises);
      console.log('📡 Notified all tabs about theme change');
    } catch (error) {
      console.warn('Could not notify all tabs:', error);
    }
  },
  
  /**
   * Store current theme privately
   */
  async storeCurrentThemePrivately(theme) {
    const themeData = {
      name: theme.name,
      isDark: theme.isDark,
      appliedAt: Date.now(),
      browser: 'orion',
      engine: 'webkit'
      // No personal data or tracking information
    };
    
    await chrome.storage.local.set({
      'hazeover-orion-current': themeData
    });
  },
  
  /**
   * Get current theme privately
   */
  async getCurrentThemePrivately() {
    const result = await chrome.storage.local.get('hazeover-orion-current');
    return result['hazeover-orion-current'];
  },
  
  /**
   * Store schedules privately
   */
  async storeSchedulesPrivately() {
    const schedules = themeScheduler.getAllSchedules();
    await chrome.storage.local.set({
      'hazeover-orion-schedules': schedules
    });
  },
  
  /**
   * Get stored schedules
   */
  async getStoredSchedules() {
    const result = await chrome.storage.local.get('hazeover-orion-schedules');
    return result['hazeover-orion-schedules'] || [];
  },
  
  /**
   * Setup next theme alarm
   */
  async setupNextThemeAlarm() {
    const nextSchedule = await themeScheduler.getNextSchedule();
    if (nextSchedule) {
      const delayInMinutes = Math.max(1, Math.ceil((nextSchedule.time - Date.now()) / 60000));
      
      await chrome.alarms.create('theme-schedule', {
        delayInMinutes: delayInMinutes
      });
      
      console.log(`⏰ Next theme scheduled in ${delayInMinutes} minutes`);
    }
  },
  
  /**
   * Load theme preferences
   */
  async loadThemePreferences() {
    const preferences = await chrome.storage.local.get([
      'hazeover-auto-theme',
      'hazeover-privacy-mode',
      'hazeover-hardware-acceleration'
    ]);
    
    console.log('⚙️ Loaded theme preferences:', preferences);
    return preferences;
  },
  
  /**
   * Get theme data
   */
  async getThemeData(themeName) {
    // This would typically load from a themes configuration
    // For now, return a basic theme structure
    return {
      name: themeName,
      isDark: themeName === 'dark',
      styles: {
        backgroundColor: themeName === 'dark' ? '#1a1a1a' : '#ffffff',
        color: themeName === 'dark' ? '#ffffff' : '#1a1a1a'
      }
    };
  },
  
  /**
   * Get auto theme setting
   */
  async getAutoThemeSetting() {
    const result = await chrome.storage.local.get('hazeover-auto-theme');
    return result['hazeover-auto-theme'] || false;
  },
  
  /**
   * Get default theme
   */
  async getDefaultTheme() {
    return {
      name: 'orion-default',
      isDark: false,
      styles: {
        backgroundColor: '#ffffff',
        color: '#1a1a1a'
      }
    };
  }
};

// Initialize the service when the script loads
OrionBackgroundService.init();

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OrionBackgroundService;
}
