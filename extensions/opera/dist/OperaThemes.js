/**
 * OPERA BROWSER - Browser-Specific Themes
 * Opera-specific CSS selectors and customizations
 * Extends shared base themes with Opera-specific targeting
 */

// Opera-specific CSS selectors
export const OPERA_SELECTORS = {
  // Opera's unique tab system
  tabBar: [
    '.opera-tabbar',
    '.tab-bar-opera',
    '[class*="opera-tab-bar"]',
    '.speed-dial-tabs'
  ],
  
  tabs: [
    '.opera-tab',
    '.tab-opera',
    '[class*="opera-tab"]:not([class*="tab-bar"])',
    '.speed-dial-tab',
    '.workspace-tab'
  ],
  
  // Opera's sidebar system
  sidebar: [
    '.opera-sidebar',
    '.speed-dial-sidebar',
    '.workspace-sidebar',
    '[class*="opera-sidebar"]',
    '.sidebar-opera'
  ],
  
  // Opera's address bar
  addressBar: [
    '.opera-address-bar',
    '.address-field-opera',
    '.url-field-opera',
    '.search-opera',
    '[class*="opera-address"]',
    '[class*="opera-url"]'
  ],
  
  // Opera's workspaces
  workspaces: [
    '.workspace-switcher',
    '.workspace-tab',
    '.workspace-container',
    '[class*="workspace"]'
  ],
  
  // Opera's speed dial
  speedDial: [
    '.speed-dial',
    '.speed-dial-container',
    '.speed-dial-item',
    '[class*="speed-dial"]'
  ],
  
  // Opera's unique features
  operaFeatures: [
    '.opera-player',
    '.opera-crypto',
    '.opera-messenger',
    '.opera-news',
    '[class*="opera-player"]',
    '[class*="opera-crypto"]'
  ]
};

// Opera-specific CSS customizations
export const OPERA_CUSTOM_CSS = `
  /* Opera Browser Specific Enhancements */
  
  /* Opera Tab Bar Styling */
  .opera-tabbar, .tab-bar-opera, [class*="opera-tab-bar"], .speed-dial-tabs {
    background: var(--hazeover-bg) !important;
    border-bottom: 2px solid var(--hazeover-border) !important;
    backdrop-filter: blur(10px);
  }
  
  /* Opera Individual Tab Styling */
  .opera-tab, .tab-opera, [class*="opera-tab"]:not([class*="tab-bar"]),
  .speed-dial-tab, .workspace-tab {
    background: var(--hazeover-bg) !important;
    border: 1px solid var(--hazeover-border) !important;
    color: var(--hazeover-text) !important;
    border-radius: 12px 12px 0 0; /* Opera's rounded style */
    margin-right: 4px;
    transition: all 0.3s ease;
  }
  
  /* Active and Hover Tab States */
  .opera-tab.active, .opera-tab:hover, .speed-dial-tab.active, .speed-dial-tab:hover,
  .workspace-tab.active, .workspace-tab:hover {
    background: var(--hazeover-accent) !important;
    color: white !important;
    box-shadow: 0 3px 12px var(--hazeover-shadow);
    transform: translateY(-2px);
  }
  
  /* Opera Sidebar Styling */
  .opera-sidebar, .speed-dial-sidebar, .workspace-sidebar,
  [class*="opera-sidebar"], .sidebar-opera {
    background: var(--hazeover-sidebar) !important;
    border-right: 2px solid var(--hazeover-border) !important;
    backdrop-filter: blur(15px);
  }
  
  /* Opera Address Bar Styling */
  .opera-address-bar, .address-field-opera, .url-field-opera,
  .search-opera, [class*="opera-address"], [class*="opera-url"] {
    background: var(--hazeover-bg) !important;
    border: 2px solid var(--hazeover-border) !important;
    color: var(--hazeover-text) !important;
    border-radius: 20px; /* Opera's signature rounded style */
    padding: 10px 20px;
    transition: all 0.3s ease;
  }
  
  /* Opera Address Bar Focus State */
  .opera-address-bar:focus, .address-field-opera:focus, .url-field-opera:focus,
  .search-opera:focus {
    border-color: var(--hazeover-accent) !important;
    box-shadow: 0 0 20px var(--hazeover-focus);
    outline: none;
  }
  
  /* Opera Workspaces Styling */
  .workspace-switcher, .workspace-container {
    background: var(--hazeover-bg) !important;
    border: 1px solid var(--hazeover-border) !important;
    border-radius: 8px;
  }
  
  .workspace-tab {
    background: var(--hazeover-sidebar) !important;
    color: var(--hazeover-text) !important;
    border-radius: 6px;
    margin: 2px;
  }
  
  .workspace-tab.active {
    background: var(--hazeover-accent) !important;
    color: white !important;
  }
  
  /* Opera Speed Dial Styling */
  .speed-dial, .speed-dial-container {
    background: var(--hazeover-bg) !important;
  }
  
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
    box-shadow: 0 4px 16px var(--hazeover-shadow);
  }
  
  /* Opera Unique Features */
  .opera-player, [class*="opera-player"] {
    background: var(--hazeover-bg) !important;
    border: 1px solid var(--hazeover-border) !important;
    color: var(--hazeover-text) !important;
    border-radius: 8px;
  }
  
  .opera-crypto, [class*="opera-crypto"] {
    background: var(--hazeover-sidebar) !important;
    border: 1px solid var(--hazeover-border) !important;
    color: var(--hazeover-text) !important;
  }
  
  .opera-messenger, .opera-news {
    background: var(--hazeover-bg) !important;
    color: var(--hazeover-text) !important;
  }
  
  /* Opera Context Menu */
  .opera-context-menu, .context-menu-opera {
    background: var(--hazeover-bg) !important;
    color: var(--hazeover-text) !important;
    border: 1px solid var(--hazeover-border) !important;
    border-radius: 8px;
    box-shadow: 0 4px 16px var(--hazeover-shadow);
  }
  
  .opera-context-menu-item:hover {
    background: var(--hazeover-accent) !important;
    color: white !important;
  }
  
  /* Opera Downloads */
  .opera-downloads, [class*="opera-downloads"] {
    background: var(--hazeover-bg) !important;
    border-top: 1px solid var(--hazeover-border) !important;
  }
  
  /* Opera Settings and Preferences */
  .opera-settings, .opera-preferences {
    background: var(--hazeover-bg) !important;
    color: var(--hazeover-text) !important;
  }
`;

// Export complete Opera theme configuration
export const OPERA_THEME_CONFIG = {
  browserName: 'opera',
  selectors: OPERA_SELECTORS,
  customCSS: OPERA_CUSTOM_CSS,
  features: [
    'workspaces-support',
    'speed-dial-theming',
    'sidebar-messaging',
    'crypto-wallet-theming',
    'player-integration',
    'news-feed-theming'
  ]
};

console.log('🎭 Opera browser themes loaded');
