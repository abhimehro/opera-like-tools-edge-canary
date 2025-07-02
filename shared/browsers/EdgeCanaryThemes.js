/**
 * MICROSOFT EDGE CANARY - Browser-Specific Themes
 * Edge Canary-specific CSS selectors and customizations
 * Extends shared base themes with Edge-specific targeting
 */

// Edge Canary-specific CSS selectors
export const EDGE_CANARY_SELECTORS = {
  // Tab system
  tabStrip: [
    '.tab-strip',
    '.tab-bar', 
    '[class*="tab-strip"]',
    '[class*="tab-bar"]',
    'div[class*="TabStrip"]'
  ],
  
  tabs: [
    '.tab',
    '.tab-content',
    '[class*="tab"]:not([class*="tab-strip"]):not([class*="tab-bar"])',
    'div[class*="Tab"]:not(div[class*="TabStrip"])'
  ],
  
  // Navigation and toolbar
  toolbar: [
    '.toolbar',
    '.navigation-bar',
    '.address-bar-container',
    'div[class*="Toolbar"]'
  ],
  
  // Address/URL bar
  addressBar: [
    '.address-bar',
    '.url-bar',
    'input[type="url"]',
    '[class*="address"]',
    '[class*="url"]',
    '.search-field',
    '.omnibox',
    'div[class*="OmniboxResultsContainer"]',
    'input[class*="omnibox"]',
    'input[aria-label*="address"]'
  ],
  
  // Edge-specific elements
  browser: [
    '#browser',
    '.browser-window',
    '.window-content',
    '.main-content',
    'div[data-testid*="browser"]',
    'div[class*="BrowserWindow"]'
  ],
  
  // Sidebar and panels
  sidebar: [
    '.sidebar',
    '.panel',
    '[class*="sidebar"]',
    '[class*="panel"]',
    'div[class*="Sidebar"]',
    'div[class*="Panel"]'
  ],
  
  // Edge Collections and Favorites
  collections: [
    'div[class*="Collection"]',
    'div[class*="Favorite"]',
    '.collections-container',
    '.favorites-container'
  ]
};

// Edge Canary-specific CSS customizations
export const EDGE_CANARY_CUSTOM_CSS = `
  /* Microsoft Edge Canary Specific Enhancements */
  
  /* Tab Strip Styling */
  .tab-strip, .tab-bar, [class*="tab-strip"], [class*="tab-bar"],
  .toolbar, .navigation-bar, .address-bar-container,
  div[class*="TabStrip"], div[class*="Toolbar"] {
    background: var(--hazeover-bg) !important;
    border-bottom: 2px solid var(--hazeover-border) !important;
    backdrop-filter: blur(10px);
  }
  
  /* Individual Tab Styling */
  .tab, .tab-content, [class*="tab"]:not([class*="tab-strip"]):not([class*="tab-bar"]),
  div[class*="Tab"]:not(div[class*="TabStrip"]) {
    background: var(--hazeover-bg) !important;
    border: 1px solid var(--hazeover-border) !important;
    color: var(--hazeover-text) !important;
    border-radius: 8px 8px 0 0;
    margin-right: 2px;
    transition: all 0.3s ease;
  }
  
  /* Active and Hover Tab States */
  .tab.active, .tab:hover, [class*="tab"].active, [class*="tab"]:hover,
  div[class*="Tab"].active, div[class*="Tab"]:hover {
    background: var(--hazeover-accent) !important;
    color: white !important;
    box-shadow: 0 2px 8px var(--hazeover-shadow);
    transform: translateY(-1px);
  }
  
  /* Address Bar Styling */
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
  
  /* Address Bar Focus State */
  .address-bar:focus, .url-bar:focus, input[type="url"]:focus,
  .search-field:focus, .omnibox:focus, input[class*="omnibox"]:focus {
    border-color: var(--hazeover-accent) !important;
    box-shadow: 0 0 15px var(--hazeover-focus);
    outline: none;
  }
  
  /* Edge Canary Browser Window */
  #browser, .browser-window, .window-content, .main-content,
  div[data-testid*="browser"], div[class*="BrowserWindow"] {
    background: var(--hazeover-bg) !important;
  }
  
  /* Sidebar and Panel Styling */
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
  
  /* Edge Canary DevTools Integration */
  .devtools-container, [class*="devtools"] {
    background: var(--hazeover-bg) !important;
    color: var(--hazeover-text) !important;
    border-top: 1px solid var(--hazeover-border) !important;
  }
  
  /* Edge Extension Popup Styling */
  .extension-popup, [class*="extension-popup"] {
    background: var(--hazeover-bg) !important;
    color: var(--hazeover-text) !important;
    border: 1px solid var(--hazeover-border) !important;
    border-radius: 8px;
  }
  
  /* Edge Canary Menu and Context Menu */
  .context-menu, .dropdown-menu, [class*="menu"] {
    background: var(--hazeover-bg) !important;
    color: var(--hazeover-text) !important;
    border: 1px solid var(--hazeover-border) !important;
    border-radius: 6px;
    box-shadow: 0 4px 12px var(--hazeover-shadow);
  }
  
  .context-menu-item:hover, .dropdown-menu-item:hover {
    background: var(--hazeover-accent) !important;
    color: white !important;
  }
  
  /* Edge Canary Downloads Bar */
  .downloads-bar, [class*="downloads"] {
    background: var(--hazeover-bg) !important;
    border-top: 1px solid var(--hazeover-border) !important;
  }
  
  /* Edge Canary Status Bar */
  .status-bar, [class*="status"] {
    background: var(--hazeover-bg) !important;
    color: var(--hazeover-text) !important;
    border-top: 1px solid var(--hazeover-border) !important;
  }
`;

// Export complete Edge Canary theme configuration
export const EDGE_CANARY_THEME_CONFIG = {
  browserName: 'edge-canary',
  selectors: EDGE_CANARY_SELECTORS,
  customCSS: EDGE_CANARY_CUSTOM_CSS,
  features: [
    'collections-support',
    'devtools-integration', 
    'extension-popup-theming',
    'downloads-bar-theming',
    'context-menu-theming'
  ]
};

console.log('🟢 Microsoft Edge Canary themes loaded');
