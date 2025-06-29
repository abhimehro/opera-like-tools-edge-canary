/**
 * HAZEOVER BASE THEMES - Shared Theme Definitions
 * Base color schemes and theme structure for all browsers
 * Browser-specific implementations extend these base themes
 */

/**
 * Universal color schemes matching HazeOver modes
 */
export const BASE_COLOR_SCHEMES = {
  day: {
    bg: '#F8F9FA',
    border: '#E9ECEF', 
    accent: '#0078d4',
    text: '#2C3E50',
    sidebar: 'rgba(248, 249, 250, 0.95)',
    shadow: 'rgba(0,0,0,0.1)',
    focus: 'rgba(0, 120, 212, 0.3)',
    name: 'Day Mode',
    description: 'Clean and bright for daytime productivity'
  },
  
  evening: {
    bg: '#FFF8F0',
    border: '#FF8C42',
    accent: '#E67E22', 
    text: '#8B4513',
    sidebar: 'rgba(255, 140, 66, 0.15)',
    shadow: 'rgba(0,0,0,0.1)',
    focus: 'rgba(255, 140, 66, 0.4)',
    name: 'Evening Mode',
    description: 'Warm focus mode for evening work sessions'
  },
  
  night: {
    bg: '#1A1A2E',
    border: '#722F37',
    accent: '#9B59B6',
    text: '#ECF0F1', 
    sidebar: 'rgba(45, 27, 105, 0.9)',
    shadow: 'rgba(0,0,0,0.3)',
    focus: 'rgba(155, 89, 182, 0.2)',
    name: 'Night Mode',
    description: 'Dark theme for late-night sessions'
  }
};

/**
 * Base CSS template that browsers can customize
 * Uses CSS custom properties for easy theming
 */
export const BASE_CSS_TEMPLATE = {
  root: `
    :root {
      --hazeover-bg: {{bg}} !important;
      --hazeover-border: {{border}} !important;
      --hazeover-accent: {{accent}} !important;
      --hazeover-text: {{text}} !important;
      --hazeover-sidebar: {{sidebar}} !important;
      --hazeover-shadow: {{shadow}} !important;
      --hazeover-focus: {{focus}} !important;
    }
  `,
  
  base: `
    /* HazeOver Base Styles - Universal */
    * {
      transition: all 0.3s ease;
    }
    
    body {
      background: var(--hazeover-bg) !important;
      color: var(--hazeover-text) !important;
    }
  `,
  
  focus: `
    /* Focus and interaction styles */
    :focus {
      outline: 2px solid var(--hazeover-accent) !important;
      outline-offset: 2px;
      box-shadow: 0 0 15px var(--hazeover-focus);
    }
    
    :hover {
      box-shadow: 0 2px 8px var(--hazeover-shadow);
      transform: translateY(-1px);
    }
  `
};

/**
 * Common CSS selectors that most browsers share
 */
export const COMMON_SELECTORS = {
  // Navigation and toolbar elements
  navigation: [
    '.toolbar',
    '.navigation-bar', 
    '.nav-bar',
    '[class*="toolbar"]',
    '[class*="navigation"]'
  ],
  
  // Tab elements  
  tabs: [
    '.tab',
    '.tab-content',
    '[class*="tab"]:not([class*="tab-strip"]):not([class*="tab-bar"])'
  ],
  
  // Address/URL bar
  addressBar: [
    '.address-bar',
    '.url-bar', 
    'input[type="url"]',
    '[class*="address"]',
    '[class*="url"]',
    '.search-field',
    '.omnibox'
  ],
  
  // Sidebar and panels
  sidebar: [
    '.sidebar',
    '.panel', 
    '[class*="sidebar"]',
    '[class*="panel"]'
  ],
  
  // Main content areas
  content: [
    '.main-content',
    '.content',
    '.window-content',
    '[class*="content"]'
  ]
};

/**
 * Generate CSS for a specific theme mode
 * @param {string} mode - Theme mode ('day', 'evening', 'night')
 * @param {object} customSelectors - Browser-specific selectors
 * @param {object} customProperties - Additional CSS properties
 * @returns {string} Complete CSS for the theme
 */
export function generateThemeCSS(mode, customSelectors = {}, customProperties = {}) {
  const colors = BASE_COLOR_SCHEMES[mode];
  if (!colors) {
    throw new Error(`Invalid theme mode: ${mode}`);
  }
  
  // Replace template variables
  let css = BASE_CSS_TEMPLATE.root
    .replace(/\{\{bg\}\}/g, colors.bg)
    .replace(/\{\{border\}\}/g, colors.border)
    .replace(/\{\{accent\}\}/g, colors.accent)
    .replace(/\{\{text\}\}/g, colors.text)
    .replace(/\{\{sidebar\}\}/g, colors.sidebar)
    .replace(/\{\{shadow\}\}/g, colors.shadow)
    .replace(/\{\{focus\}\}/g, colors.focus);
  
  // Add base styles
  css += BASE_CSS_TEMPLATE.base;
  css += BASE_CSS_TEMPLATE.focus;
  
  // Add custom properties if provided
  if (customProperties.css) {
    css += customProperties.css;
  }
  
  return css;
}

/**
 * Get theme colors for a specific mode
 * @param {string} mode - Theme mode
 * @returns {object} Color scheme object
 */
export function getThemeColors(mode) {
  return BASE_COLOR_SCHEMES[mode] || null;
}

/**
 * Get all available theme modes
 * @returns {string[]} Array of mode names
 */
export function getAvailableModes() {
  return Object.keys(BASE_COLOR_SCHEMES);
}

/**
 * Validate theme mode
 * @param {string} mode - Mode to validate
 * @returns {boolean} True if valid
 */
export function isValidMode(mode) {
  return Object.hasOwnProperty.call(BASE_COLOR_SCHEMES, mode);
}

/**
 * Create browser-specific theme object
 * @param {string} mode - Theme mode
 * @param {string} browserName - Browser identifier
 * @param {object} browserSelectors - Browser-specific CSS selectors
 * @param {object} customCSS - Additional CSS rules
 * @returns {object} Complete theme object
 */
export function createBrowserTheme(mode, browserName, browserSelectors = {}, customCSS = '') {
  const colors = getThemeColors(mode);
  if (!colors) {
    throw new Error(`Invalid theme mode: ${mode}`);
  }
  
  const baseCSS = generateThemeCSS(mode, browserSelectors, { css: customCSS });
  
  return {
    mode,
    browser: browserName,
    colors,
    css: baseCSS,
    selectors: { ...COMMON_SELECTORS, ...browserSelectors },
    timestamp: Date.now()
  };
}

console.log('🎨 HazeOver Base Themes (Shared) loaded');
