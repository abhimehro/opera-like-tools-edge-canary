/**
 * OPERA BROWSER - SHARED THEME SWITCHER
 * Opera implementation using shared HazeOver utilities
 * Demonstrates how easy it is to add new browser support
 */

// Global theme manager instance
let themeManager = null;

// Load shared utilities and Opera config
let HazeOverShared = null;
let OperaConfig = null;

// Initialize shared utilities for Opera
async function loadSharedUtilities() {
  // Simple theme scheduler (shared logic)
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
    }
  };
  
  HazeOverShared = {
    getCurrentTimeMode,
    storage,
    THEME_SCHEDULE
  };
  
  // Opera-specific configuration
  OperaConfig = {
    browserName: 'opera',
    customCSS: `
      /* Opera-Specific Shared Theme CSS */
      :root {
        --hazeover-bg: var(--theme-bg) !important;
        --hazeover-border: var(--theme-border) !important;
        --hazeover-accent: var(--theme-accent) !important;
        --hazeover-text: var(--theme-text) !important;
        --hazeover-sidebar: var(--theme-sidebar) !important;
      }
      
      /* Opera Tab Bar */
      .opera-tabbar, .tab-bar-opera, [class*="opera-tab-bar"], .speed-dial-tabs {
        background: var(--hazeover-bg) !important;
        border-bottom: 2px solid var(--hazeover-border) !important;
        backdrop-filter: blur(10px);
      }
      
      /* Opera Tabs */
      .opera-tab, .tab-opera, [class*="opera-tab"]:not([class*="tab-bar"]),
      .speed-dial-tab, .workspace-tab {
        background: var(--hazeover-bg) !important;
        border: 1px solid var(--hazeover-border) !important;
        color: var(--hazeover-text) !important;
        border-radius: 12px 12px 0 0;
        transition: all 0.3s ease;
      }
      
      /* Opera Active Tabs */
      .opera-tab.active, .opera-tab:hover, .speed-dial-tab.active, .speed-dial-tab:hover,
      .workspace-tab.active, .workspace-tab:hover {
        background: var(--hazeover-accent) !important;
        color: white !important;
        transform: translateY(-2px);
      }
      
      /* Opera Sidebar */
      .opera-sidebar, .speed-dial-sidebar, .workspace-sidebar,
      [class*="opera-sidebar"], .sidebar-opera {
        background: var(--hazeover-sidebar) !important;
        border-right: 2px solid var(--hazeover-border) !important;
        backdrop-filter: blur(15px);
      }
      
      /* Opera Address Bar */
      .opera-address-bar, .address-field-opera, .url-field-opera,
      .search-opera, [class*="opera-address"], [class*="opera-url"] {
        background: var(--hazeover-bg) !important;
        border: 2px solid var(--hazeover-border) !important;
        color: var(--hazeover-text) !important;
        border-radius: 20px;
        padding: 10px 20px;
        transition: all 0.3s ease;
      }
      
      /* Opera Speed Dial */
      .speed-dial-item {
        background: var(--hazeover-sidebar) !important;
        border: 1px solid var(--hazeover-border) !important;
        color: var(--hazeover-text) !important;
        border-radius: 12px;
        transition: all 0.3s ease;
      }
      
      .speed-dial-item:hover {
        background: var(--hazeover-accent) !important;
        color: white !important;
        transform: scale(1.05);
      }
      
      /* Opera Workspaces */
      .workspace-switcher, .workspace-container {
        background: var(--hazeover-bg) !important;
        border: 1px solid var(--hazeover-border) !important;
        border-radius: 8px;
      }
      
      /* Opera Unique Features */
      .opera-player, .opera-crypto, .opera-messenger, .opera-news {
        background: var(--hazeover-bg) !important;
        color: var(--hazeover-text) !important;
      }
    `
  };
}

// Theme color schemes (shared with Edge)
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

// Opera Theme Manager (similar to Edge but with Opera-specific features)
class OperaThemeManager {
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
    console.log(`🎭 Opera theme manager initialized: ${currentMode} mode`);
    return currentMode;
  }
  
  async applyTheme(mode) {
    const colors = THEME_COLORS[mode];
    if (!colors) return false;
    
    // Remove existing styles
    const existing = document.getElementById('hazeover-opera-theme-style');
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
      
      ${OperaConfig.customCSS}
      
      /* Additional Opera-specific styling */
      body {
        background: ${colors.bg} !important;
        color: ${colors.text} !important;
      }
      
      /* Opera Focus States */
      .opera-address-bar:focus, .address-field-opera:focus, .url-field-opera:focus,
      .search-opera:focus {
        border-color: ${colors.accent} !important;
        box-shadow: 0 0 20px ${colors.accent}33;
        outline: none;
      }
    `;
    
    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.id = 'hazeover-opera-theme-style';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
    
    // Set document attributes
    document.body.setAttribute('data-time-mode', mode);
    document.documentElement.setAttribute('data-hazeover-theme', mode);
    document.documentElement.setAttribute('data-browser', 'opera-shared');
    
    // Store current mode
    this.currentMode = mode;
    await HazeOverShared.storage.set('mode', mode);
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('hazeOverThemeChanged', {
      detail: { mode, colors, browser: 'opera-shared', timestamp: Date.now() }
    }));
    
    console.log(`🎨 Opera theme applied: ${mode.toUpperCase()} mode`);
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
        console.log('🔄 Opera manual override expired');
      }
      
      const newMode = HazeOverShared.getCurrentTimeMode();
      if (newMode !== this.currentMode) {
        await this.applyTheme(newMode);
        console.log(`🔄 Opera auto-switched to ${newMode} mode`);
      }
    }, 60000); // Check every minute
    
    console.log('⏰ Opera auto theme switching started');
  }
  
  async setThemeManually(mode, durationMs = 3600000) {
    await this.applyTheme(mode);
    this.isManualOverride = true;
    this.overrideUntil = Date.now() + durationMs;
    console.log(`🎯 Opera manual override: ${mode} mode (${durationMs/60000} minutes)`);
    return true;
  }
  
  async clearManualOverride() {
    this.isManualOverride = false;
    this.overrideUntil = null;
    const currentMode = HazeOverShared.getCurrentTimeMode();
    await this.applyTheme(currentMode);
    console.log('🔄 Opera manual override cleared');
    return true;
  }
  
  async getStatus() {
    const currentMode = HazeOverShared.getCurrentTimeMode();
    return {
      currentMode,
      storedMode: this.currentMode,
      isOverrideActive: this.isManualOverride && Date.now() < this.overrideUntil,
      isAutoModeActive: this.intervalId !== null,
      browserName: 'opera-shared'
    };
  }
  
  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    const existing = document.getElementById('hazeover-opera-theme-style');
    if (existing) existing.remove();
    
    console.log('🗑️ Opera theme manager destroyed');
  }
}

/**
 * Initialize the Opera theme system
 */
async function initializeOperaThemes() {
  try {
    console.log('🚀 Initializing Opera HazeOver Theme Sync (Shared)...');
    
    // Create and initialize theme manager
    themeManager = new OperaThemeManager();
    await themeManager.initialize();
    
    console.log('✅ Opera HazeOver Theme Sync (Shared) initialized successfully');
    
    // Log current status
    const status = await themeManager.getStatus();
    console.log('📊 Opera current status:', status);
    
  } catch (error) {
    console.error('❌ Failed to initialize Opera shared themes:', error);
  }
}

/**
 * Opera theme control functions
 */
const operaThemeControls = {
  async setDay() {
    if (themeManager) {
      await themeManager.setThemeManually('day');
      console.log('🌅 Opera day theme applied manually');
    }
  },
  
  async setEvening() {
    if (themeManager) {
      await themeManager.setThemeManually('evening');
      console.log('🌇 Opera evening theme applied manually');
    }
  },
  
  async setNight() {
    if (themeManager) {
      await themeManager.setThemeManually('night');
      console.log('🌙 Opera night theme applied manually');
    }
  },
  
  async clearOverride() {
    if (themeManager) {
      await themeManager.clearManualOverride();
      console.log('🔄 Opera manual override cleared');
    }
  },
  
  getCurrentMode() {
    return HazeOverShared ? HazeOverShared.getCurrentTimeMode() : 'unknown';
  },
  
  async getStatus() {
    if (themeManager) {
      return await themeManager.getStatus();
    }
    return null;
  },
  
  async reinitialize() {
    if (themeManager) {
      themeManager.destroy();
    }
    await initializeOperaThemes();
    console.log('🔄 Opera theme system reinitialized');
  },
  
  async testTheme(mode) {
    console.log(`🧪 Testing Opera ${mode} theme...`);
    if (themeManager) {
      await themeManager.setThemeManually(mode, 300000); // 5 minutes for testing
    }
  }
};

/**
 * Opera-specific message handling
 */
if (typeof browser !== 'undefined' && browser.runtime) {
  // Opera uses WebExtensions API
  try {
    browser.runtime.onMessage.addListener(async (message, sender) => {
      console.log('🔔 Opera received message:', message);
      
      try {
        switch (message.action) {
          case 'updateTheme':
            await operaThemeControls.testTheme(message.mode);
            return { success: true, mode: message.mode };
            
          case 'getCurrentMode':
            const mode = operaThemeControls.getCurrentMode();
            return { mode: mode };
            
          case 'clearOverride':
            await operaThemeControls.clearOverride();
            return { success: true };
            
          case 'getStatus':
            const status = await operaThemeControls.getStatus();
            return { status };
            
          default:
            return { error: 'Unknown action' };
        }
      } catch (error) {
        console.error('❌ Opera message handler error:', error);
        return { error: error.message };
      }
    });
  } catch (e) {
    console.log('🔒 Opera WebExtensions API not available, using standalone mode');
  }
}

/**
 * Global theme event listener
 */
window.addEventListener('hazeOverThemeChanged', (event) => {
  console.log('🎨 Opera theme change event:', event.detail);
  
  // Opera-specific features can react to theme changes here
  // For example: update workspaces, speed dial, crypto wallet UI, etc.
});

/**
 * Cleanup on page unload
 */
window.addEventListener('beforeunload', () => {
  if (themeManager) {
    themeManager.destroy();
    console.log('🗑️ Opera theme manager cleaned up');
  }
});

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeOperaThemes);
} else {
  initializeOperaThemes();
}

/**
 * Expose controls globally for testing and manual use
 */
window.operaThemeControls = operaThemeControls;

// Legacy compatibility
window.setOperaTheme = operaThemeControls.testTheme;
window.getOperaMode = operaThemeControls.getCurrentMode;

/**
 * Debug helper
 */
console.log('🎭 Opera HazeOver Theme Sync (Shared) loaded. Available commands:');
console.log('operaThemeControls.setDay() - Apply day theme');
console.log('operaThemeControls.setEvening() - Apply evening theme');
console.log('operaThemeControls.setNight() - Apply night theme');
console.log('operaThemeControls.clearOverride() - Clear manual override');
console.log('operaThemeControls.getStatus() - Get current status');
console.log('operaThemeControls.reinitialize() - Restart theme system');
