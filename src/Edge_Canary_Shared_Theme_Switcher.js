/**
 * MICROSOFT EDGE CANARY - SHARED THEME SWITCHER
 * New implementation using shared HazeOver utilities
 * Clean, modular, and easily maintainable
 * Browser-compatible version without ES6 imports
 */

// Global theme manager instance
let themeManager = null;

// Load shared utilities dynamically
let HazeOverShared = null;
let EdgeCanaryConfig = null;

// Initialize shared utilities
async function loadSharedUtilities() {
  // For now, we'll create a simplified inline version that works immediately
  // This can be replaced with dynamic imports when browser support is ready
  
  // Simple theme scheduler
  const THEME_SCHEDULE = {
    day: { start: 7, end: 17.5 },      
    evening: { start: 17.5, end: 19 }, 
    night: { start: 19, end: 7 }       
  };
  
  function getCurrentTimeMode() {
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
  
  // Simplified storage manager
  const storage = {
    async get(key, defaultValue = null) {
      try {
        const value = localStorage.getItem('hazeover-theme-' + key);
        return value !== null ? JSON.parse(value) : defaultValue;
      } catch (e) {
        return defaultValue;
      }
    },
    
    async set(key, value) {
      try {
        localStorage.setItem('hazeover-theme-' + key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    },
    
    async remove(key) {
      try {
        localStorage.removeItem('hazeover-theme-' + key);
        return true;
      } catch (e) {
        return false;
      }
    }
  };
  
  HazeOverShared = {
    getCurrentTimeMode,
    storage,
    THEME_SCHEDULE
  };
  
  EdgeCanaryConfig = {
    browserName: 'edge-canary',
    customCSS: `
      /* Microsoft Edge Canary Shared Theme CSS */
      :root {
        --hazeover-bg: var(--theme-bg) !important;
        --hazeover-border: var(--theme-border) !important;
        --hazeover-accent: var(--theme-accent) !important;
        --hazeover-text: var(--theme-text) !important;
        --hazeover-sidebar: var(--theme-sidebar) !important;
      }
      
      .tab-strip, .tab-bar, [class*="tab-strip"], [class*="tab-bar"],
      .toolbar, .navigation-bar, .address-bar-container,
      div[class*="TabStrip"], div[class*="Toolbar"] {
        background: var(--hazeover-bg) !important;
        border-bottom: 2px solid var(--hazeover-border) !important;
      }
      
      .tab, .tab-content, [class*="tab"]:not([class*="tab-strip"]):not([class*="tab-bar"]),
      div[class*="Tab"]:not(div[class*="TabStrip"]) {
        background: var(--hazeover-bg) !important;
        border: 1px solid var(--hazeover-border) !important;
        color: var(--hazeover-text) !important;
        border-radius: 8px 8px 0 0;
        transition: all 0.3s ease;
      }
      
      .tab.active, .tab:hover, [class*="tab"].active, [class*="tab"]:hover,
      div[class*="Tab"].active, div[class*="Tab"]:hover {
        background: var(--hazeover-accent) !important;
        color: white !important;
        transform: translateY(-1px);
      }
      
      .address-bar, .url-bar, input[type="url"], [class*="address"], [class*="url"],
      .search-field, .omnibox, div[class*="OmniboxResultsContainer"],
      input[class*="omnibox"], input[aria-label*="address"] {
        background: var(--hazeover-bg) !important;
        border: 2px solid var(--hazeover-border) !important;
        color: var(--hazeover-text) !important;
        border-radius: 12px;
        padding: 8px 16px;
        transition: all 0.3s ease;
      }
      
      #browser, .browser-window, .window-content, .main-content,
      div[data-testid*="browser"], div[class*="BrowserWindow"] {
        background: var(--hazeover-bg) !important;
      }
      
      .sidebar, .panel, [class*="sidebar"], [class*="panel"],
      div[class*="Sidebar"], div[class*="Panel"] {
        background: var(--hazeover-sidebar) !important;
        border-right: 1px solid var(--hazeover-border) !important;
      }
    `
  };
}

// Theme color schemes
const THEME_COLORS = {
  day: {
    bg: '#F8F9FA',
    border: '#E9ECEF',
    accent: '#0078d4',
    text: '#2C3E50',
    sidebar: 'rgba(248, 249, 250, 0.95)'
  },
  evening: {
    bg: '#FFF8F0',
    border: '#FF8C42',
    accent: '#E67E22',
    text: '#8B4513',
    sidebar: 'rgba(255, 140, 66, 0.15)'
  },
  night: {
    bg: '#1A1A2E',
    border: '#722F37',
    accent: '#9B59B6',
    text: '#ECF0F1',
    sidebar: 'rgba(45, 27, 105, 0.9)'
  }
};

// Simplified Theme Manager
class SimpleThemeManager {
  constructor() {
    this.currentMode = null;
    this.intervalId = null;
    this.isManualOverride = false;
    this.overrideUntil = null;
  }
  
  async initialize() {
    await loadSharedUtilities();
    const currentMode = HazeOverShared.getCurrentTimeMode();
    await this.applyTheme(currentMode);
    this.startAutoMode();
    console.log(`🚀 Shared theme manager initialized: ${currentMode} mode`);
    return currentMode;
  }
  
  async applyTheme(mode) {
    const colors = THEME_COLORS[mode];
    if (!colors) return false;
    
    // Remove existing styles
    const existing = document.getElementById('hazeover-shared-theme-style');
    if (existing) existing.remove();
    
    // Create CSS with theme colors
    const css = `
      :root {
        --theme-bg: ${colors.bg} !important;
        --theme-border: ${colors.border} !important;
        --theme-accent: ${colors.accent} !important;
        --theme-text: ${colors.text} !important;
        --theme-sidebar: ${colors.sidebar} !important;
      }
      
      ${EdgeCanaryConfig.customCSS}
      
      /* Additional Edge Canary styling */
      body {
        background: ${colors.bg} !important;
        color: ${colors.text} !important;
      }
      
      .address-bar:focus, .url-bar:focus, input[type="url"]:focus,
      .search-field:focus, .omnibox:focus, input[class*="omnibox"]:focus {
        border-color: ${colors.accent} !important;
        box-shadow: 0 0 15px ${colors.accent}33;
        outline: none;
      }
    `;
    
    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.id = 'hazeover-shared-theme-style';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
    
    // Set document attributes
    document.body.setAttribute('data-time-mode', mode);
    document.documentElement.setAttribute('data-hazeover-theme', mode);
    document.documentElement.setAttribute('data-browser', 'edge-canary-shared');
    
    // Store current mode
    this.currentMode = mode;
    await HazeOverShared.storage.set('mode', mode);
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('hazeOverThemeChanged', {
      detail: { mode, colors, browser: 'edge-canary-shared', timestamp: Date.now() }
    }));
    
    console.log(`🎨 Shared theme applied: ${mode.toUpperCase()} mode`);
    return true;
  }
  
  startAutoMode() {
    if (this.intervalId) clearInterval(this.intervalId);
    
    this.intervalId = setInterval(async () => {
      // Skip if manual override active
      if (this.isManualOverride && Date.now() < this.overrideUntil) {
        return;
      }
      
      // Clear expired override
      if (this.isManualOverride && Date.now() >= this.overrideUntil) {
        this.isManualOverride = false;
        this.overrideUntil = null;
        console.log('🔄 Manual override expired');
      }
      
      const newMode = HazeOverShared.getCurrentTimeMode();
      if (newMode !== this.currentMode) {
        await this.applyTheme(newMode);
        console.log(`🔄 Auto-switched to ${newMode} mode`);
      }
    }, 60000); // Check every minute
    
    console.log('⏰ Auto theme switching started');
  }
  
  async setThemeManually(mode, durationMs = 3600000) {
    await this.applyTheme(mode);
    this.isManualOverride = true;
    this.overrideUntil = Date.now() + durationMs;
    console.log(`🎯 Manual override: ${mode} mode (${durationMs/60000} minutes)`);
    return true;
  }
  
  async clearManualOverride() {
    this.isManualOverride = false;
    this.overrideUntil = null;
    const currentMode = HazeOverShared.getCurrentTimeMode();
    await this.applyTheme(currentMode);
    console.log('🔄 Manual override cleared');
    return true;
  }
  
  async getStatus() {
    const currentMode = HazeOverShared.getCurrentTimeMode();
    return {
      currentMode,
      storedMode: this.currentMode,
      isOverrideActive: this.isManualOverride && Date.now() < this.overrideUntil,
      isAutoModeActive: this.intervalId !== null,
      browserName: 'edge-canary-shared'
    };
  }
  
  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    const existing = document.getElementById('hazeover-shared-theme-style');
    if (existing) existing.remove();
    
    console.log('🗑️ Shared theme manager destroyed');
  }
}

/**
 * Initialize the Edge Canary theme system
 */
async function initializeEdgeCanaryThemes() {
  try {
    console.log('🚀 Initializing Edge Canary HazeOver Theme Sync (Shared)...');
    
    // Create and initialize theme manager
    themeManager = new SimpleThemeManager();
    await themeManager.initialize();
    
    console.log('✅ Edge Canary HazeOver Theme Sync (Shared) initialized successfully');
    
    // Log current status
    const status = await themeManager.getStatus();
    console.log('📊 Current status:', status);
    
  } catch (error) {
    console.error('❌ Failed to initialize Edge Canary shared themes:', error);
  }
}

/**
 * Manual theme control functions
 */
const themeControls = {
  /**
   * Set day theme manually
   */
  async setDay() {
    if (themeManager) {
      await themeManager.setThemeManually('day');
      console.log('🌅 Day theme applied manually');
    }
  },
  
  /**
   * Set evening theme manually
   */
  async setEvening() {
    if (themeManager) {
      await themeManager.setThemeManually('evening');
      console.log('🌇 Evening theme applied manually');
    }
  },
  
  /**
   * Set night theme manually
   */
  async setNight() {
    if (themeManager) {
      await themeManager.setThemeManually('night');
      console.log('🌙 Night theme applied manually');
    }
  },
  
  /**
   * Clear manual override and resume automatic switching
   */
  async clearOverride() {
    if (themeManager) {
      await themeManager.clearManualOverride();
      console.log('🔄 Manual override cleared');
    }
  },
  
  /**
   * Get current theme mode
   */
  getCurrentMode() {
    return HazeOverShared ? HazeOverShared.getCurrentTimeMode() : 'unknown';
  },
  
  /**
   * Get theme manager status
   */
  async getStatus() {
    if (themeManager) {
      return await themeManager.getStatus();
    }
    return null;
  },
  
  /**
   * Reinitialize the theme system
   */
  async reinitialize() {
    if (themeManager) {
      themeManager.destroy();
    }
    await initializeEdgeCanaryThemes();
    console.log('🔄 Theme system reinitialized');
  },
  
  /**
   * Test a specific theme
   */
  async testTheme(mode) {
    console.log(`🧪 Testing Edge Canary ${mode} theme...`);
    if (themeManager) {
      await themeManager.setThemeManually(mode, 300000); // 5 minutes for testing
    }
  }
};

/**
 * Listen for messages from extension popup or background script
 */
if (typeof chrome !== 'undefined' && chrome.runtime) {
  try {
    chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
      console.log('🔔 Edge Canary received message:', message);
      
      try {
        switch (message.action) {
          case 'updateTheme':
            await themeControls.testTheme(message.mode);
            sendResponse({ success: true, mode: message.mode });
            break;
            
          case 'getCurrentMode':
            const mode = themeControls.getCurrentMode();
            sendResponse({ mode: mode });
            break;
            
          case 'clearOverride':
            await themeControls.clearOverride();
            sendResponse({ success: true });
            break;
            
          case 'getStatus':
            const status = await themeControls.getStatus();
            sendResponse({ status });
            break;
            
          default:
            sendResponse({ error: 'Unknown action' });
        }
      } catch (error) {
        console.error('❌ Message handler error:', error);
        sendResponse({ error: error.message });
      }
      
      return true; // Keep message channel open for async response
    });
  } catch (e) {
    console.log('🔒 Chrome runtime not available, using Edge Canary standalone mode');
  }
}

/**
 * Global theme event listener
 */
window.addEventListener('hazeOverThemeChanged', (event) => {
  console.log('🎨 Theme change event:', event.detail);
  
  // You can add custom logic here that responds to theme changes
  // For example, notifying other parts of the page, analytics, etc.
});

/**
 * Cleanup on page unload
 */
window.addEventListener('beforeunload', () => {
  if (themeManager) {
    themeManager.destroy();
    console.log('🗑️ Theme manager cleaned up');
  }
});

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEdgeCanaryThemes);
} else {
  initializeEdgeCanaryThemes();
}

/**
 * Expose controls globally for testing and manual use
 */
window.edgeCanaryThemeControls = themeControls;

// Legacy compatibility - expose old interface
window.setThemeManually = themeControls.testTheme;
window.getCurrentTimeMode = themeControls.getCurrentMode;
window.clearManualOverride = themeControls.clearOverride;

/**
 * Debug helper
 */
console.log('🎨 Edge Canary HazeOver Theme Sync (Shared) loaded. Available commands:');
console.log('edgeCanaryThemeControls.setDay() - Apply day theme');
console.log('edgeCanaryThemeControls.setEvening() - Apply evening theme');
console.log('edgeCanaryThemeControls.setNight() - Apply night theme');
console.log('edgeCanaryThemeControls.clearOverride() - Clear manual override');
console.log('edgeCanaryThemeControls.getStatus() - Get current status');
console.log('edgeCanaryThemeControls.reinitialize() - Restart theme system');
