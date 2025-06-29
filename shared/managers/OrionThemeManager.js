/**
 * OrionThemeManager - WebKit-optimized theme management for Orion RC Browser
 * Privacy-first, performance-focused implementation
 */

import { ThemeManager } from './ThemeManager.js';
import { OrionConfig, OrionUtils } from '../configs/orion-config.js';

export class OrionThemeManager extends ThemeManager {
  
  constructor() {
    super();
    this.browser = 'orion';
    this.engine = 'webkit';
    this.privacyMode = true;
    this.webkitOptimized = true;
    
    // Orion-specific features
    this.features = {
      hardwareAcceleration: true,
      builtInAdBlocker: true,
      zeroTelemetry: true,
      mobileSupport: true
    };
    
    console.log('🌟 Orion Theme Manager initialized - Privacy-first, WebKit-optimized');
  }
  
  /**
   * Apply theme with Orion-specific optimizations
   */
  async applyTheme(theme) {
    try {
      console.log(`🎨 Applying Orion theme: ${theme.name}`);
      
      // 1. Detect Orion browser and ad blocker
      const isOrion = await this.detectOrionBrowser();
      const hasAdBlocker = await this.detectBuiltInAdBlocker();
      
      if (!isOrion) {
        console.warn('⚠️ Not running in Orion browser - using standard theme application');
        return super.applyTheme(theme);
      }
      
      // 2. Optimize theme for WebKit
      const optimizedTheme = this.optimizeThemeForWebKit(theme);
      
      // 3. Handle ad blocker compatibility
      if (hasAdBlocker) {
        optimizedTheme.styles = await this.makeAdBlockerCompatible(optimizedTheme.styles);
      }
      
      // 4. Apply privacy-safe theme
      const result = await this.applyPrivacySafeTheme(optimizedTheme);
      
      // 5. Store theme with privacy considerations
      await this.storeThemePrivately(theme);
      
      console.log('✅ Orion theme applied successfully with WebKit optimizations');
      return result;
      
    } catch (error) {
      console.error('❌ Error applying Orion theme:', error);
      // Fallback to standard theme application
      return super.applyTheme(theme);
    }
  }
  
  /**
   * Optimize theme CSS for WebKit engine
   */
  optimizeThemeForWebKit(theme) {
    console.log('⚡ Optimizing theme for WebKit...');
    
    const optimizedStyles = {
      ...theme.styles,
      
      // Hardware acceleration
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      perspective: '1000px',
      
      // Smooth animations
      willChange: 'transform, opacity',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      
      // WebKit-specific optimizations
      webkitFontSmoothing: 'antialiased',
      webkitBackfaceVisibility: 'hidden',
      webkitTransformStyle: 'preserve-3d',
      
      // Memory optimization
      contentVisibility: 'auto',
      containIntrinsicSize: 'auto',
      
      // Performance hints
      contain: 'layout style paint',
      isolation: 'isolate'
    };
    
    // Apply theme-specific WebKit optimizations
    if (theme.isDark) {
      optimizedStyles.colorScheme = 'dark';
      optimizedStyles.webkitColorScheme = 'dark';
    } else {
      optimizedStyles.colorScheme = 'light';
      optimizedStyles.webkitColorScheme = 'light';
    }
    
    return {
      ...theme,
      styles: optimizedStyles,
      webkitOptimized: true,
      engine: 'webkit'
    };
  }
  
  /**
   * Make CSS compatible with Orion's built-in ad blocker
   */
  async makeAdBlockerCompatible(styles) {
    console.log('🛡️ Making styles compatible with built-in ad blocker...');
    
    // Ensure our CSS won't be blocked by content filtering
    const compatibleStyles = {
      ...styles,
      
      // Use semantic class names (less likely to be blocked)
      className: 'hazeover-theme-orion',
      
      // Avoid ad-blocker trigger patterns
      position: styles.position === 'fixed' ? 'fixed' : styles.position,
      zIndex: Math.min(styles.zIndex || 9999, 999999), // Reasonable z-index
      
      // Use CSS custom properties for dynamic values
      '--hazeover-bg': styles.backgroundColor || styles.background,
      '--hazeover-text': styles.color,
      '--hazeover-accent': styles.accentColor || styles.borderColor,
      
      // Ensure compatibility mode detection
      'data-orion-compatible': 'true',
      'data-hazeover-theme': 'true'
    };
    
    return compatibleStyles;
  }
  
  /**
   * Apply theme with privacy-first approach
   */
  async applyPrivacySafeTheme(theme) {
    console.log('🔒 Applying theme with privacy protections...');
    
    // Create privacy-safe CSS injection
    const cssContent = this.generatePrivacySafeCSS(theme);
    
    // Inject CSS using content scripts (privacy-safe method)
    await this.injectCSSSafely(cssContent);
    
    // Update theme state locally (no external requests)
    await this.updateThemeStateLocally(theme);
    
    return {
      success: true,
      theme: theme.name,
      browser: 'orion',
      privacy: 'protected',
      performance: 'optimized'
    };
  }
  
  /**
   * Generate privacy-safe CSS content
   */
  generatePrivacySafeCSS(theme) {
    const { styles } = theme;
    
    return `
      /* HazeOver Orion Theme - Privacy-First, WebKit-Optimized */
      .hazeover-theme-orion {
        /* Core theme styles */
        background-color: ${styles.backgroundColor || styles['--hazeover-bg']} !important;
        color: ${styles.color || styles['--hazeover-text']} !important;
        
        /* WebKit optimizations */
        transform: translateZ(0);
        backface-visibility: hidden;
        -webkit-font-smoothing: antialiased;
        -webkit-backface-visibility: hidden;
        will-change: transform, opacity;
        
        /* Smooth transitions */
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        
        /* Performance hints */
        contain: layout style paint;
        content-visibility: auto;
        
        /* Theme-specific properties */
        ${theme.isDark ? 'color-scheme: dark;' : 'color-scheme: light;'}
        ${theme.isDark ? '-webkit-color-scheme: dark;' : '-webkit-color-scheme: light;'}
      }
      
      /* Privacy-safe animations */
      @keyframes hazeoverFadeIn {
        from { opacity: 0; transform: translateZ(0) scale(0.95); }
        to { opacity: 1; transform: translateZ(0) scale(1); }
      }
      
      /* Ensure compatibility with Orion's built-in features */
      .hazeover-theme-orion[data-orion-compatible="true"] {
        animation: hazeoverFadeIn 0.3s ease-out;
      }
    `;
  }
  
  /**
   * Inject CSS safely using Orion-compatible method
   */
  async injectCSSSafely(cssContent) {
    try {
      // Use scripting API for Manifest v3 compatibility
      if (chrome.scripting) {
        await chrome.scripting.insertCSS({
          target: { allFrames: true },
          css: cssContent
        });
      } else {
        // Fallback for older API
        await chrome.tabs.insertCSS({
          allFrames: true,
          code: cssContent
        });
      }
      
      console.log('✅ CSS injected safely for Orion');
    } catch (error) {
      console.error('❌ Error injecting CSS in Orion:', error);
      throw error;
    }
  }
  
  /**
   * Update theme state locally (no external requests)
   */
  async updateThemeStateLocally(theme) {
    const themeState = {
      name: theme.name,
      appliedAt: Date.now(),
      browser: 'orion',
      engine: 'webkit',
      privacy: 'protected',
      // No user identification or tracking data
    };
    
    await chrome.storage.local.set({
      'hazeover-orion-theme': themeState,
      'hazeover-privacy-mode': true
    });
  }
  
  /**
   * Store theme data with privacy considerations
   */
  async storeThemePrivately(theme) {
    console.log('💾 Storing theme data privately...');
    
    // Create privacy-safe theme data (no personal info)
    const privacyData = {
      themeName: theme.name,
      isDark: theme.isDark,
      timestamp: Date.now(),
      browser: 'orion',
      // No user tracking, IP addresses, or personal identifiers
    };
    
    // Store only in local storage (never sync or external)
    await chrome.storage.local.set({
      'hazeover-orion-current': privacyData
    });
  }
  
  /**
   * Detect if running in Orion browser
   */
  async detectOrionBrowser() {
    try {
      // Method 1: Browser info API
      if (chrome.runtime.getBrowserInfo) {
        const info = await chrome.runtime.getBrowserInfo();
        if (info?.name?.toLowerCase().includes('orion')) {
          return true;
        }
      }
      
      // Method 2: User agent detection
      const userAgent = navigator.userAgent;
      if (userAgent.includes('Orion')) {
        return true;
      }
      
      // Method 3: Platform detection (Orion-specific features)
      const platform = await chrome.runtime.getPlatformInfo();
      if (platform?.os === 'mac' && userAgent.includes('WebKit')) {
        // Additional Orion-specific checks could go here
        return userAgent.includes('Orion');
      }
      
      return false;
    } catch (error) {
      console.warn('Could not detect Orion browser:', error);
      return false;
    }
  }
  
  /**
   * Detect built-in ad blocker
   */
  async detectBuiltInAdBlocker() {
    const isOrion = await this.detectOrionBrowser();
    // Orion always has built-in content blocking
    return isOrion;
  }
  
  /**
   * Get Orion-specific performance metrics
   */
  async getPerformanceMetrics() {
    return {
      browser: 'orion',
      engine: 'webkit',
      memoryOptimized: true,
      hardwareAccelerated: true,
      privacyProtected: true,
      adBlockerCompatible: true
    };
  }
  
  /**
   * Cleanup with privacy considerations
   */
  async cleanup() {
    console.log('🧹 Cleaning up Orion theme manager...');
    
    // Remove injected CSS
    try {
      if (chrome.scripting) {
        await chrome.scripting.removeCSS({
          target: { allFrames: true },
          css: '.hazeover-theme-orion { display: none; }'
        });
      }
    } catch (error) {
      console.warn('Could not remove CSS:', error);
    }
    
    // Clear local theme data (respect privacy)
    await chrome.storage.local.remove([
      'hazeover-orion-theme',
      'hazeover-orion-current'
    ]);
    
    console.log('✅ Orion theme manager cleaned up');
  }
}

export default OrionThemeManager;
