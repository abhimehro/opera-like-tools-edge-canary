/**
 * Orion RC Browser Configuration
 * WebKit-based browser with WebExtensions API support
 * Privacy-first, zero-telemetry architecture
 */

export const OrionConfig = {
  name: 'Orion RC Browser',
  id: 'orion',
  engine: 'webkit',
  
  // Manifest configuration
  manifest: {
    version: 3, // Orion supports both v2 and v3
    permissions: [
      'storage',
      'tabs',
      'activeTab',
      'alarms',
      'theme', // Native theme API support
      'scripting'
    ],
    
    // Orion-specific optimizations
    webkit_optimizations: true,
    privacy_mode: true
  },
  
  // API compatibility (based on 70% WebExtensions support)
  api: {
    storage: {
      local: true,
      sync: true,
      session: true,
      managed: true // Enterprise support
    },
    
    runtime: {
      messaging: true,
      manifest: true,
      browserInfo: true,
      platformInfo: true
    },
    
    tabs: {
      query: true,
      update: true,
      events: true,
      scripting: true
    },
    
    alarms: {
      create: true,
      clear: true,
      events: true
    },
    
    theme: {
      update: true,
      getCurrent: true,
      reset: true,
      events: true
    },
    
    scripting: {
      executeScript: true,
      insertCSS: true,
      removeCSS: true
    }
  },
  
  // Orion-specific features
  features: {
    // Privacy and security
    zeroTelemetry: true,
    builtInAdBlocker: true,
    trackingProtection: true,
    fingerPrintResistance: true,
    
    // Performance optimizations
    webkitEngine: true,
    hardwareAcceleration: true,
    memoryOptimized: true,
    nativeIntegration: true,
    
    // Extension capabilities
    dualStoreSupport: true, // Chrome + Firefox stores
    manifestFlexibility: true,
    safariCompatibility: true,
    mobileSupport: true // iOS/iPadOS
  },
  
  // Platform support
  platforms: {
    desktop: {
      macOS: {
        supported: true,
        minVersion: '10.14',
        features: ['native_ui', 'keychain_integration', 'system_themes']
      }
    },
    
    mobile: {
      iOS: {
        supported: true,
        minVersion: '14.0',
        features: ['extension_support', 'theme_sync', 'background_refresh']
      },
      iPadOS: {
        supported: true,
        minVersion: '14.0',
        features: ['extension_support', 'theme_sync', 'split_view']
      }
    }
  },
  
  // Theme-specific configuration
  theming: {
    // CSS injection strategy
    injection: {
      method: 'content_script',
      webkitOptimized: true,
      adBlockerCompatible: true
    },
    
    // Performance optimizations
    performance: {
      useHardwareAcceleration: true,
      enableWillChange: true,
      useTransform3d: true,
      optimizeForWebKit: true
    },
    
    // Privacy considerations
    privacy: {
      noTelemetry: true,
      localStorageOnly: true,
      noExternalRequests: true
    }
  },
  
  // WebKit-specific CSS optimizations
  webkitOptimizations: {
    // Hardware acceleration
    transform3d: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    perspective: '1000px',
    
    // Smooth animations
    willChange: 'transform, opacity',
    transformStyle: 'preserve-3d',
    
    // Memory optimization
    contentVisibility: 'auto',
    containIntrinsicSize: 'auto',
    
    // WebKit-specific properties
    webkitFontSmoothing: 'antialiased',
    webkitBackfaceVisibility: 'hidden',
    webkitTransformStyle: 'preserve-3d'
  },
  
  // Development configuration
  development: {
    // Local testing
    localTesting: {
      command: 'web-ext run --target=firefox-desktop',
      note: 'Orion uses Firefox WebExtensions API'
    },
    
    // Debug settings
    debug: {
      enableConsole: true,
      verboseLogging: false, // Respect privacy
      performanceMetrics: true
    },
    
    // Hot reload (if supported)
    hotReload: {
      supported: false,
      fallback: 'manual_reload'
    }
  },
  
  // Installation methods
  installation: {
    chromeWebStore: {
      supported: true,
      directInstall: true,
      url: 'https://chrome.google.com/webstore'
    },
    
    firefoxAddons: {
      supported: true,
      directInstall: true,
      url: 'https://addons.mozilla.org'
    },
    
    localDevelopment: {
      supported: true,
      method: 'load_unpacked',
      debugMode: true
    }
  },
  
  // Known limitations and workarounds
  limitations: {
    // Built-in ad blocker may interfere with CSS injection
    adBlockerInterference: {
      issue: 'Built-in content blocker may block CSS injections',
      workaround: 'Use compatibility mode detection',
      severity: 'medium'
    },
    
    // Limited API support (70%)
    apiLimitations: {
      issue: '30% of WebExtensions APIs not yet supported',
      impact: 'Minimal for our use case',
      severity: 'low'
    },
    
    // Beta software
    betaStatus: {
      issue: 'Orion is still in public beta',
      impact: 'Potential instability, smaller user base',
      severity: 'low'
    }
  },
  
  // Performance expectations
  performance: {
    // Memory usage (compared to Chrome)
    memoryUsage: '2-3x less than mainstream browsers',
    
    // Rendering performance
    rendering: 'WebKit-native speed',
    
    // Extension overhead
    extensionOverhead: 'Minimal due to WebKit optimizations',
    
    // Theme switching speed
    themeSwitching: 'Hardware-accelerated transitions'
  },
  
  // Marketing positioning
  marketing: {
    taglines: [
      'Privacy-First Theme Switching',
      'WebKit-Optimized Theming',
      'Zero-Telemetry Theme Sync',
      'Native macOS Performance'
    ],
    
    uniqueSellingPoints: [
      'Only browser with dual Chrome/Firefox extension support',
      'Zero telemetry respects user privacy',
      'WebKit engine provides native macOS performance',
      'Built-in ad blocking for cleaner experience',
      'Mobile extension support (rare feature)'
    ],
    
    targetAudience: [
      'Privacy-conscious users',
      'macOS/iOS power users',
      'Developers using WebKit',
      'Early adopters of new browsers'
    ]
  }
};

// Orion-specific utility functions
export const OrionUtils = {
  
  /**
   * Detect if running in Orion browser
   */
  async isOrionBrowser() {
    try {
      const info = await browser.runtime.getBrowserInfo?.();
      return info?.name?.toLowerCase().includes('orion') || 
             navigator.userAgent.includes('Orion');
    } catch {
      return navigator.userAgent.includes('Orion');
    }
  },
  
  /**
   * Check if built-in ad blocker is active
   */
  async hasBuiltInAdBlocker() {
    const isOrion = await this.isOrionBrowser();
    return isOrion; // Orion always has built-in blocking
  },
  
  /**
   * Optimize CSS for WebKit
   */
  optimizeForWebKit(styles) {
    return {
      ...styles,
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      willChange: 'transform, opacity',
      webkitFontSmoothing: 'antialiased'
    };
  },
  
  /**
   * Apply privacy-safe configurations
   */
  getPrivacyConfig() {
    return {
      telemetry: false,
      analytics: false,
      externalRequests: false,
      localStorageOnly: true
    };
  }
};

export default OrionConfig;
