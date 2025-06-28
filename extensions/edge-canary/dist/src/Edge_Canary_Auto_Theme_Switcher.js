/**
 * MICROSOFT EDGE CANARY AUTO THEME SWITCHER
 * Automatically switches Edge Canary themes based on time to sync with HazeOver
 * Optimized for Microsoft Edge Canary with Chromium features
 */

// Time-based theme configuration matching your HazeOver schedule
const THEME_SCHEDULE = {
  day: { start: 7, end: 17.5 },      // 07:00 - 17:30
  evening: { start: 17.5, end: 19 }, // 17:30 - 19:00  
  night: { start: 19, end: 7 }       // 19:00 - 07:00 (next day)
};

// Complete CSS themes embedded for each mode (Edge Canary optimized)
const THEMES = {
  day: {
    colors: {
      bg: '#F8F9FA',
      border: '#E9ECEF',
      accent: '#0078d4',
      text: '#2C3E50',
      sidebar: 'rgba(248, 249, 250, 0.95)'
    },
    css: `
      /* Day Mode Theme - Edge Canary Optimized */
      :root {
        --hazeover-bg: #F8F9FA !important;
        --hazeover-border: #E9ECEF !important;
        --hazeover-accent: #0078d4 !important;
        --hazeover-text: #2C3E50 !important;
        --hazeover-sidebar: rgba(248, 249, 250, 0.95) !important;
      }
      
      /* Edge Canary UI Elements */
      .tab-strip, .tab-bar, [class*="tab-strip"], [class*="tab-bar"],
      .toolbar, .navigation-bar, .address-bar-container,
      div[class*="TabStrip"], div[class*="Toolbar"] {
        background: var(--hazeover-bg) !important;
        border-bottom: 2px solid var(--hazeover-border) !important;
        backdrop-filter: blur(10px);
      }
      
      .tab, .tab-content, [class*="tab"]:not([class*="tab-strip"]):not([class*="tab-bar"]),
      div[class*="Tab"]:not(div[class*="TabStrip"]) {
        background: var(--hazeover-bg) !important;
        border: 1px solid var(--hazeover-border) !important;
        color: var(--hazeover-text) !important;
        border-radius: 8px 8px 0 0;
        margin-right: 2px;
        transition: all 0.3s ease;
      }
      
      .tab.active, .tab:hover, [class*="tab"].active, [class*="tab"]:hover,
      div[class*="Tab"].active, div[class*="Tab"]:hover {
        background: var(--hazeover-accent) !important;
        color: white !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
      
      .address-bar:focus, .url-bar:focus, input[type="url"]:focus,
      .search-field:focus, .omnibox:focus, input[class*="omnibox"]:focus {
        border-color: var(--hazeover-accent) !important;
        box-shadow: 0 0 15px rgba(0, 120, 212, 0.3);
        outline: none;
      }
      
      /* Edge Canary specific selectors */
      #browser, .browser-window, .window-content, .main-content,
      div[data-testid*="browser"], div[class*="BrowserWindow"] {
        background: var(--hazeover-bg) !important;
      }
      
      /* Sidebar and panels */
      .sidebar, .panel, [class*="sidebar"], [class*="panel"],
      div[class*="Sidebar"], div[class*="Panel"] {
        background: var(--hazeover-sidebar) !important;
        border-right: 1px solid var(--hazeover-border) !important;
      }
      
      /* Edge Collections and Favorites */
      div[class*="Collection"], div[class*="Favorite"],
      .collections-container, .favorites-container {
        background: var(--hazeover-bg) !important;
        color: var(--hazeover-text) !important;
      }
    `
  },
  
  evening: {
    colors: {
      bg: '#FFF8F0',
      border: '#FF8C42',
      accent: '#E67E22',
      text: '#8B4513',
      sidebar: 'rgba(255, 140, 66, 0.15)'
    },
    css: `
      /* Evening Work Theme - Edge Canary Optimized */
      :root {
        --hazeover-bg: #FFF8F0 !important;
        --hazeover-border: #FF8C42 !important;
        --hazeover-accent: #E67E22 !important;
        --hazeover-text: #8B4513 !important;
        --hazeover-sidebar: rgba(255, 140, 66, 0.15) !important;
      }
      
      /* Edge Canary UI Elements */
      .tab-strip, .tab-bar, [class*="tab-strip"], [class*="tab-bar"],
      .toolbar, .navigation-bar, .address-bar-container,
      div[class*="TabStrip"], div[class*="Toolbar"] {
        background: var(--hazeover-bg) !important;
        border-bottom: 2px solid var(--hazeover-border) !important;
        backdrop-filter: blur(10px);
      }
      
      .tab, .tab-content, [class*="tab"]:not([class*="tab-strip"]):not([class*="tab-bar"]),
      div[class*="Tab"]:not(div[class*="TabStrip"]) {
        background: var(--hazeover-bg) !important;
        border: 1px solid var(--hazeover-border) !important;
        color: var(--hazeover-text) !important;
        border-radius: 8px 8px 0 0;
        margin-right: 2px;
        transition: all 0.3s ease;
      }
      
      .tab.active, .tab:hover, [class*="tab"].active, [class*="tab"]:hover,
      div[class*="Tab"].active, div[class*="Tab"]:hover {
        background: var(--hazeover-accent) !important;
        color: white !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
      
      .address-bar:focus, .url-bar:focus, input[type="url"]:focus,
      .search-field:focus, .omnibox:focus, input[class*="omnibox"]:focus {
        border-color: var(--hazeover-accent) !important;
        box-shadow: 0 0 20px rgba(255, 140, 66, 0.4);
        outline: none;
      }
      
      /* Edge Canary specific selectors */
      #browser, .browser-window, .window-content, .main-content,
      div[data-testid*="browser"], div[class*="BrowserWindow"] {
        background: var(--hazeover-bg) !important;
      }
      
      /* Sidebar and panels */
      .sidebar, .panel, [class*="sidebar"], [class*="panel"],
      div[class*="Sidebar"], div[class*="Panel"] {
        background: var(--hazeover-sidebar) !important;
        border-right: 1px solid var(--hazeover-border) !important;
      }
      
      /* Edge Collections and Favorites */
      div[class*="Collection"], div[class*="Favorite"],
      .collections-container, .favorites-container {
        background: var(--hazeover-bg) !important;
        color: var(--hazeover-text) !important;
      }
    `
  },
  
  night: {
    colors: {
      bg: '#1A1A2E',
      border: '#722F37',
      accent: '#9B59B6',
      text: '#ECF0F1',
      sidebar: 'rgba(45, 27, 105, 0.9)'
    },
    css: `
      /* Night Mode Theme - Edge Canary Optimized */
      :root {
        --hazeover-bg: #1A1A2E !important;
        --hazeover-border: #722F37 !important;
        --hazeover-accent: #9B59B6 !important;
        --hazeover-text: #ECF0F1 !important;
        --hazeover-sidebar: rgba(45, 27, 105, 0.9) !important;
      }
      
      /* Edge Canary UI Elements */
      .tab-strip, .tab-bar, [class*="tab-strip"], [class*="tab-bar"],
      .toolbar, .navigation-bar, .address-bar-container,
      div[class*="TabStrip"], div[class*="Toolbar"] {
        background: var(--hazeover-bg) !important;
        border-bottom: 2px solid var(--hazeover-border) !important;
        backdrop-filter: blur(10px);
      }
      
      .tab, .tab-content, [class*="tab"]:not([class*="tab-strip"]):not([class*="tab-bar"]),
      div[class*="Tab"]:not(div[class*="TabStrip"]) {
        background: var(--hazeover-bg) !important;
        border: 1px solid var(--hazeover-border) !important;
        color: var(--hazeover-text) !important;
        border-radius: 8px 8px 0 0;
        margin-right: 2px;
        transition: all 0.3s ease;
      }
      
      .tab.active, .tab:hover, [class*="tab"].active, [class*="tab"]:hover,
      div[class*="Tab"].active, div[class*="Tab"]:hover {
        background: var(--hazeover-accent) !important;
        color: white !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
      
      .address-bar:focus, .url-bar:focus, input[type="url"]:focus,
      .search-field:focus, .omnibox:focus, input[class*="omnibox"]:focus {
        border-color: var(--hazeover-accent) !important;
        box-shadow: 0 0 16px rgba(155, 89, 182, 0.2);
        outline: none;
      }
      
      /* Edge Canary specific selectors */
      #browser, .browser-window, .window-content, .main-content,
      div[data-testid*="browser"], div[class*="BrowserWindow"] {
        background: var(--hazeover-bg) !important;
      }
      
      /* Sidebar and panels */
      .sidebar, .panel, [class*="sidebar"], [class*="panel"],
      div[class*="Sidebar"], div[class*="Panel"] {
        background: var(--hazeover-sidebar) !important;
        border-right: 1px solid var(--hazeover-border) !important;
      }
      
      /* Edge Collections and Favorites */
      div[class*="Collection"], div[class*="Favorite"],
      .collections-container, .favorites-container {
        background: var(--hazeover-bg) !important;
        color: var(--hazeover-text) !important;
      }
    `
  }
};

/**
 * Get current time mode based on schedule
 */
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

/**
 * Apply theme to Edge Canary interface
 */
function applyTheme(mode) {
  // Remove existing theme styles
  const existingStyle = document.getElementById('hazeover-edge-canary-theme-style');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // Create new style element
  const styleElement = document.createElement('style');
  styleElement.id = 'hazeover-edge-canary-theme-style';
  styleElement.textContent = THEMES[mode].css;
  
  // Add to document head
  document.head.appendChild(styleElement);
  
  // Set data attribute for CSS targeting
  document.body.setAttribute('data-time-mode', mode);
  document.documentElement.setAttribute('data-hazeover-theme', mode);
  document.documentElement.setAttribute('data-edge-canary-theme', mode);
  
  // Apply inline styles as backup for critical elements
  const theme = THEMES[mode];
  const inlineOverride = `
    /* HazeOver Inline Override for Edge Canary ${mode} mode */
    body { 
      background: ${theme.colors.bg} !important; 
      color: ${theme.colors.text} !important; 
    }
  `;
  
  // Add inline override style
  const inlineStyle = document.createElement('style');
  inlineStyle.id = 'hazeover-edge-canary-inline-override';
  inlineStyle.textContent = inlineOverride;
  document.head.appendChild(inlineStyle);
  
  // Store current mode for persistence
  try {
    localStorage.setItem('edge-canary-theme-mode', mode);
    localStorage.setItem('edge-canary-theme-last-update', Date.now().toString());
  } catch (e) {
    console.log('🔒 LocalStorage not available, theme will reset on page reload');
  }
  
  console.log(`🎨 Edge Canary theme switched to: ${mode.toUpperCase()}`);
  console.log(`[HazeOver Sync] Edge Canary inline override applied`, {
    bg: theme.colors.bg,
    fg: theme.colors.text
  });
  
  // Dispatch custom event for other scripts
  window.dispatchEvent(new CustomEvent('edgeCanaryThemeChanged', { 
    detail: { mode, timestamp: Date.now(), colors: theme.colors } 
  }));
}

/**
 * Initialize theme system
 */
function initializeThemeSystem() {
  // Apply initial theme
  const currentMode = getCurrentTimeMode();
  applyTheme(currentMode);
  
  // Set up automatic checking every minute
  const themeCheckInterval = setInterval(() => {
    // Check if manual override is active
    if (isManualOverrideActive()) {
      return; // Skip automatic switching during manual override
    }
    
    const newMode = getCurrentTimeMode();
    let storedMode;
    
    try {
      storedMode = localStorage.getItem('edge-canary-theme-mode');
    } catch (e) {
      storedMode = null;
    }
    
    if (newMode !== storedMode) {
      applyTheme(newMode);
      console.log(`🔄 Edge Canary auto-switched to ${newMode} mode`);
    }
  }, 60000); // Check every minute
  
  // Store interval ID for cleanup
  window.edgeCanaryThemeInterval = themeCheckInterval;
  
  console.log('🚀 Edge Canary HazeOver Theme Sync initialized');
}

/**
 * Manual theme override (for testing or preference)
 */
function setThemeManually(mode) {
  if (THEMES[mode]) {
    applyTheme(mode);
    
    // Set manual override flag
    try {
      localStorage.setItem('edge-canary-theme-manual-override', 'true');
      localStorage.setItem('edge-canary-theme-manual-until', (Date.now() + 3600000).toString()); // 1 hour
    } catch (e) {
      console.log('🔒 Cannot set manual override flag');
    }
    
    console.log(`🎯 Edge Canary manual override: ${mode} mode (1 hour)`);
    
    // Clear override after 1 hour
    setTimeout(() => {
      try {
        localStorage.removeItem('edge-canary-theme-manual-override');
        localStorage.removeItem('edge-canary-theme-manual-until');
      } catch (e) {
        // Ignore
      }
      console.log('🔄 Edge Canary manual override expired, resuming automatic switching');
      initializeThemeSystem();
    }, 3600000);
  }
}

/**
 * Check if manual override is active
 */
function isManualOverrideActive() {
  try {
    const override = localStorage.getItem('edge-canary-theme-manual-override');
    const until = localStorage.getItem('edge-canary-theme-manual-until');
    
    if (override === 'true' && until) {
      return Date.now() < parseInt(until);
    }
  } catch (e) {
    // Ignore
  }
  return false;
}

/**
 * Clear manual override
 */
function clearManualOverride() {
  try {
    localStorage.removeItem('edge-canary-theme-manual-override');
    localStorage.removeItem('edge-canary-theme-manual-until');
  } catch (e) {
    // Ignore
  }
  console.log('🔄 Edge Canary manual override cleared');
  initializeThemeSystem();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeThemeSystem);
} else {
  initializeThemeSystem();
}

// Listen for messages from extension popup
if (typeof chrome !== 'undefined' && chrome.runtime) {
  try {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log('🔔 Edge Canary received message:', message);
      
      if (message.action === 'updateTheme') {
        setThemeManually(message.mode);
        sendResponse({ success: true, mode: message.mode });
      } else if (message.action === 'getCurrentMode') {
        const mode = getCurrentTimeMode();
        sendResponse({ mode: mode });
      } else if (message.action === 'clearOverride') {
        clearManualOverride();
        sendResponse({ success: true });
      }
      
      return true; // Keep message channel open for async response
    });
  } catch (e) {
    console.log('🔒 Chrome runtime not available, using Edge Canary standalone mode');
  }
}

// Expose manual controls for testing
window.edgeCanaryThemeControls = {
  setDay: () => setThemeManually('day'),
  setEvening: () => setThemeManually('evening'), 
  setNight: () => setThemeManually('night'),
  getCurrentMode: getCurrentTimeMode,
  reinitialize: initializeThemeSystem,
  isOverrideActive: isManualOverrideActive,
  clearOverride: clearManualOverride,
  getThemeColors: (mode) => THEMES[mode]?.colors,
  testTheme: (mode) => {
    console.log(`🧪 Testing Edge Canary ${mode} theme...`);
    setThemeManually(mode);
  }
};

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.edgeCanaryThemeInterval) {
    clearInterval(window.edgeCanaryThemeInterval);
  }
});

// Debug helper
console.log('🎨 Edge Canary HazeOver Theme Sync loaded. Available commands:');
console.log('edgeCanaryThemeControls.setDay() - Apply day theme');
console.log('edgeCanaryThemeControls.setEvening() - Apply evening theme');
console.log('edgeCanaryThemeControls.setNight() - Apply night theme');
console.log('edgeCanaryThemeControls.clearOverride() - Clear manual override');
