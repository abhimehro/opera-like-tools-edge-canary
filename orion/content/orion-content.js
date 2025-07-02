/**
 * HazeOver Orion Content Script
 * WebKit-optimized theme injection with privacy-first approach
 * Designed specifically for Orion RC Browser
 */

(function() {
  'use strict';
  
  // Orion-specific optimizations
  const OrionThemeInjector = {
    
    // Configuration
    config: {
      browser: 'orion',
      engine: 'webkit',
      privacyMode: true,
      hardwareAccelerated: true,
      adBlockerCompatible: true
    },
    
    // Theme state
    currentTheme: null,
    isInitialized: false,
    performanceObserver: null,
    
    /**
     * Initialize the Orion theme injector
     */
    async init() {
      if (this.isInitialized) return;
      
      console.log('🌟 Initializing HazeOver for Orion RC Browser');
      
      try {
        // 1. Detect Orion browser
        const isOrion = await this.detectOrionBrowser();
        if (!isOrion) {
          console.warn('⚠️ Not running in Orion browser');
          return;
        }
        
        // 2. Setup WebKit optimizations
        this.setupWebKitOptimizations();
        
        // 3. Initialize privacy-safe storage
        await this.initializePrivacyStorage();
        
        // 4. Setup theme change listeners
        this.setupThemeListeners();
        
        // 5. Setup performance monitoring
        this.setupPerformanceMonitoring();
        
        // 6. Apply any existing theme
        await this.applyStoredTheme();
        
        this.isInitialized = true;
        console.log('✅ HazeOver initialized for Orion with WebKit optimizations');
        
      } catch (error) {
        console.error('❌ Error initializing HazeOver for Orion:', error);
      }
    },
    
    /**
     * Detect if we're running in Orion browser
     */
    async detectOrionBrowser() {
      // Check user agent
      const userAgent = navigator.userAgent;
      if (userAgent.includes('Orion')) {
        return true;
      }
      
      // Check for WebKit + macOS (common Orion pattern)
      const isWebKit = userAgent.includes('WebKit');
      const isMac = userAgent.includes('Macintosh');
      
      // Additional Orion-specific feature detection
      const hasOrionFeatures = this.detectOrionFeatures();
      
      return isWebKit && isMac && hasOrionFeatures;
    },
    
    /**
     * Detect Orion-specific features
     */
    detectOrionFeatures() {
      // Check for features unique to Orion
      return (
        // Orion has built-in content blocking
        typeof window.safari === 'undefined' && // Not Safari
        'chrome' in window && // Has Chrome APIs
        navigator.userAgent.includes('WebKit') // WebKit engine
      );
    },
    
    /**
     * Setup WebKit-specific optimizations
     */
    setupWebKitOptimizations() {
      console.log('⚡ Setting up WebKit optimizations...');
      
      // Create optimized style element
      this.createOptimizedStyleElement();
      
      // Setup hardware acceleration
      this.enableHardwareAcceleration();
      
      // Optimize for WebKit rendering
      this.optimizeWebKitRendering();
      
      // Setup memory optimization
      this.setupMemoryOptimization();
    },
    
    /**
     * Create optimized style element for WebKit
     */
    createOptimizedStyleElement() {
      // Remove any existing style element
      const existingStyle = document.getElementById('hazeover-orion-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // Create new optimized style element
      const styleElement = document.createElement('style');
      styleElement.id = 'hazeover-orion-styles';
      styleElement.setAttribute('data-orion-optimized', 'true');
      
      // Add WebKit-specific optimizations
      styleElement.textContent = `
        /* HazeOver Orion WebKit Optimizations */
        .hazeover-orion-theme {
          /* Hardware acceleration */
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          
          /* Smooth rendering */
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          
          /* Performance hints */
          will-change: transform, opacity;
          contain: layout style paint;
          
          /* Memory optimization */
          content-visibility: auto;
          contain-intrinsic-size: auto;
          
          /* Smooth transitions */
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Orion-specific theme animations */
        @keyframes orionFadeIn {
          from { 
            opacity: 0; 
            transform: translateZ(0) scale(0.98);
          }
          to { 
            opacity: 1; 
            transform: translateZ(0) scale(1);
          }
        }
        
        .hazeover-orion-animate {
          animation: orionFadeIn 0.3s ease-out;
        }
        
        /* Ad-blocker compatible styles */
        .hazeover-theme-content[data-orion-compatible="true"] {
          /* Ensure compatibility with Orion's content blocking */
          position: relative !important;
          z-index: 9999 !important;
          pointer-events: auto !important;
        }
      `;
      
      // Insert at the beginning of head for high priority
      const head = document.head || document.documentElement;
      head.insertBefore(styleElement, head.firstChild);
      
      console.log('✅ WebKit-optimized styles injected');
    },
    
    /**
     * Enable hardware acceleration for better performance
     */
    enableHardwareAcceleration() {
      // Apply hardware acceleration to document root
      const documentElement = document.documentElement;
      if (documentElement) {
        documentElement.style.transform = 'translateZ(0)';
        documentElement.style.backfaceVisibility = 'hidden';
        documentElement.style.webkitBackfaceVisibility = 'hidden';
      }
    },
    
    /**
     * Optimize for WebKit rendering engine
     */
    optimizeWebKitRendering() {
      // Enable smooth scrolling
      document.documentElement.style.webkitOverflowScrolling = 'touch';
      
      // Optimize font rendering
      document.body.style.webkitFontSmoothing = 'antialiased';
      document.body.style.mozOsxFontSmoothing = 'grayscale';
      
      // Enable 3D transforms for better performance
      document.body.style.transformStyle = 'preserve-3d';
    },
    
    /**
     * Setup memory optimization for better performance
     */
    setupMemoryOptimization() {
      // Use Intersection Observer for efficient visibility detection
      if ('IntersectionObserver' in window) {
        this.setupIntersectionObserver();
      }
      
      // Setup viewport optimization
      this.optimizeViewport();
    },
    
    /**
     * Setup intersection observer for performance
     */
    setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const element = entry.target;
          if (entry.isIntersecting) {
            element.style.contentVisibility = 'visible';
          } else {
            element.style.contentVisibility = 'auto';
          }
        });
      }, {
        rootMargin: '50px'
      });
      
      // Observe theme-related elements
      document.querySelectorAll('.hazeover-theme-content').forEach(el => {
        observer.observe(el);
      });
    },
    
    /**
     * Optimize viewport for better performance
     */
    optimizeViewport() {
      // Add viewport meta tag if it doesn't exist
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
        document.head.appendChild(viewport);
      }
    },
    
    /**
     * Initialize privacy-safe storage
     */
    async initializePrivacyStorage() {
      console.log('🔒 Initializing privacy-safe storage...');
      
      // Use only local storage (no sync, no external requests)
      this.storage = {
        async get(key) {
          return new Promise((resolve) => {
            chrome.storage.local.get(key, (result) => {
              resolve(result[key]);
            });
          });
        },
        
        async set(key, value) {
          return new Promise((resolve) => {
            chrome.storage.local.set({ [key]: value }, resolve);
          });
        },
        
        async remove(key) {
          return new Promise((resolve) => {
            chrome.storage.local.remove(key, resolve);
          });
        }
      };
      
      // Set privacy mode flag
      await this.storage.set('hazeover-orion-privacy', true);
    },
    
    /**
     * Setup theme change listeners
     */
    setupThemeListeners() {
      console.log('👂 Setting up theme listeners...');
      
      // Listen for theme changes from background script
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'apply-theme' && message.browser === 'orion') {
          this.applyTheme(message.theme);
          sendResponse({ success: true, browser: 'orion' });
        }
        
        if (message.type === 'get-performance') {
          sendResponse(this.getPerformanceMetrics());
        }
        
        return true; // Keep message channel open
      });
      
      // Listen for system theme changes
      if (window.matchMedia) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addListener((e) => {
          this.handleSystemThemeChange(e.matches);
        });
      }
    },
    
    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
      if ('PerformanceObserver' in window) {
        this.performanceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'paint') {
              console.log(`🎨 Orion Paint Performance: ${entry.name} - ${entry.startTime}ms`);
            }
          }
        });
        
        this.performanceObserver.observe({ entryTypes: ['paint', 'measure'] });
      }
    },
    
    /**
     * Apply stored theme on initialization
     */
    async applyStoredTheme() {
      try {
        const storedTheme = await this.storage.get('hazeover-orion-current-theme');
        if (storedTheme) {
          console.log('🎨 Applying stored Orion theme:', storedTheme.name);
          await this.applyTheme(storedTheme);
        }
      } catch (error) {
        console.warn('Could not load stored theme:', error);
      }
    },
    
    /**
     * Apply theme with Orion optimizations
     */
    async applyTheme(theme) {
      console.log(`🎨 Applying Orion theme: ${theme.name}`);
      
      try {
        // Start performance measurement
        performance.mark('orion-theme-start');
        
        // 1. Prepare WebKit-optimized theme
        const optimizedTheme = this.optimizeThemeForWebKit(theme);
        
        // 2. Apply theme with ad-blocker compatibility
        await this.applyThemeCompatibly(optimizedTheme);
        
        // 3. Store theme privately
        await this.storeThemePrivately(theme);
        
        // 4. Trigger smooth animation
        this.animateThemeTransition();
        
        // End performance measurement
        performance.mark('orion-theme-end');
        performance.measure('orion-theme-application', 'orion-theme-start', 'orion-theme-end');
        
        this.currentTheme = theme;
        console.log('✅ Orion theme applied successfully');
        
      } catch (error) {
        console.error('❌ Error applying Orion theme:', error);
      }
    },
    
    /**
     * Optimize theme for WebKit
     */
    optimizeThemeForWebKit(theme) {
      return {
        ...theme,
        styles: {
          ...theme.styles,
          // WebKit-specific optimizations
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          webkitFontSmoothing: 'antialiased',
          willChange: 'transform, opacity',
          // Color scheme support
          colorScheme: theme.isDark ? 'dark' : 'light',
          webkitColorScheme: theme.isDark ? 'dark' : 'light'
        }
      };
    },
    
    /**
     * Apply theme with ad-blocker compatibility
     */
    async applyThemeCompatibly(theme) {
      // Create ad-blocker safe CSS class
      const themeClass = 'hazeover-orion-theme';
      
      // Remove previous theme
      document.body.classList.remove(themeClass);
      
      // Apply theme styles to body
      const body = document.body;
      Object.assign(body.style, theme.styles);
      
      // Add theme class
      body.classList.add(themeClass);
      body.setAttribute('data-orion-compatible', 'true');
      body.setAttribute('data-hazeover-theme', theme.name);
      
      // Update document color scheme
      document.documentElement.setAttribute('data-theme', theme.isDark ? 'dark' : 'light');
    },
    
    /**
     * Store theme privately (local only)
     */
    async storeThemePrivately(theme) {
      const privacyData = {
        name: theme.name,
        isDark: theme.isDark,
        appliedAt: Date.now(),
        browser: 'orion',
        engine: 'webkit'
        // No personal data, tracking, or external requests
      };
      
      await this.storage.set('hazeover-orion-current-theme', privacyData);
    },
    
    /**
     * Animate theme transition
     */
    animateThemeTransition() {
      document.body.classList.add('hazeover-orion-animate');
      
      // Remove animation class after completion
      setTimeout(() => {
        document.body.classList.remove('hazeover-orion-animate');
      }, 300);
    },
    
    /**
     * Handle system theme changes
     */
    async handleSystemThemeChange(isDark) {
      console.log('🌓 System theme changed:', isDark ? 'dark' : 'light');
      
      // Auto-apply theme based on system preference if enabled
      const autoTheme = await this.storage.get('hazeover-auto-theme');
      if (autoTheme) {
        const themeToApply = isDark ? 'dark' : 'light';
        // Request theme change from background script
        chrome.runtime.sendMessage({
          type: 'system-theme-change',
          theme: themeToApply,
          browser: 'orion'
        });
      }
    },
    
    /**
     * Get performance metrics
     */
    getPerformanceMetrics() {
      const metrics = {
        browser: 'orion',
        engine: 'webkit',
        hardwareAccelerated: true,
        privacyProtected: true,
        adBlockerCompatible: true
      };
      
      // Add performance timing if available
      if (performance.getEntriesByType) {
        const paintEntries = performance.getEntriesByType('paint');
        if (paintEntries.length > 0) {
          metrics.paintPerformance = paintEntries.map(entry => ({
            name: entry.name,
            duration: entry.startTime
          }));
        }
      }
      
      return metrics;
    },
    
    /**
     * Cleanup when page unloads
     */
    cleanup() {
      console.log('🧹 Cleaning up Orion theme injector...');
      
      if (this.performanceObserver) {
        this.performanceObserver.disconnect();
      }
      
      // Remove theme classes
      document.body.classList.remove('hazeover-orion-theme', 'hazeover-orion-animate');
      
      console.log('✅ Orion cleanup complete');
    }
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => OrionThemeInjector.init());
  } else {
    OrionThemeInjector.init();
  }
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => OrionThemeInjector.cleanup());
  
  // Export for global access
  window.HazeOverOrion = OrionThemeInjector;
  
})();
