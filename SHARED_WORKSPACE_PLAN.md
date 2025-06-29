# 🏗️ Shared Workspace Strategy: Opera + Edge HazeOver Extensions

## **📋 Overview**
Create a unified monorepo structure that shares common code while maintaining browser-specific customizations for Opera and Microsoft Edge Canary extensions.

## **🎯 Architecture Goals**
- ✅ **DRY Principle**: Single source of truth for shared logic
- ✅ **Browser Specificity**: Easy customization per browser
- ✅ **Maintainability**: Centralized updates propagate everywhere
- ✅ **Scalability**: Easy to add Chrome, Firefox, Safari support
- ✅ **Modern Tooling**: TypeScript, build automation, testing

---

## **📁 Recommended Directory Structure**

```
HazeOver-Browser-Extensions/
├── 📦 packages/
│   ├── 🔧 shared/                     # Shared utilities & core logic
│   │   ├── src/
│   │   │   ├── core/
│   │   │   │   ├── ThemeManager.ts     # Core theme switching logic
│   │   │   │   ├── TimeScheduler.ts    # Time-based scheduling
│   │   │   │   └── HazeOverSync.ts     # HazeOver integration
│   │   │   ├── utils/
│   │   │   │   ├── BrowserAPI.ts       # Browser API abstractions
│   │   │   │   ├── Storage.ts          # Storage utilities
│   │   │   │   └── Logger.ts           # Logging utilities
│   │   │   ├── themes/
│   │   │   │   ├── BaseTheme.ts        # Base theme interface
│   │   │   │   ├── DayTheme.ts         # Day mode theme
│   │   │   │   ├── EveningTheme.ts     # Evening mode theme
│   │   │   │   └── NightTheme.ts       # Night mode theme
│   │   │   └── types/
│   │   │       ├── Theme.types.ts      # TypeScript definitions
│   │   │       └── Browser.types.ts    # Browser-specific types
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── 🎭 opera/                       # Opera-specific implementation
│   │   ├── src/
│   │   │   ├── background.ts           # Opera background script
│   │   │   ├── content.ts              # Opera content script
│   │   │   ├── popup/
│   │   │   │   ├── popup.html
│   │   │   │   ├── popup.ts
│   │   │   │   └── popup.css
│   │   │   └── themes/
│   │   │       └── OperaThemes.ts      # Opera-specific selectors
│   │   ├── manifest.json               # Opera manifest
│   │   ├── package.json
│   │   └── webpack.config.js
│   │
│   └── 🟢 edge-canary/                 # Edge Canary implementation
│       ├── src/
│       │   ├── background.ts           # Edge background script
│       │   ├── content.ts              # Edge content script
│       │   ├── popup/
│       │   │   ├── popup.html
│       │   │   ├── popup.ts
│       │   │   └── popup.css
│       │   └── themes/
│       │       └── EdgeThemes.ts       # Edge-specific selectors
│       ├── manifest.json               # Edge manifest
│       ├── package.json
│       └── webpack.config.js
│
├── 🔧 tools/                          # Build & development tools
│   ├── build/
│   │   ├── webpack.base.js             # Shared webpack config
│   │   ├── build-all.js                # Build all extensions
│   │   └── package-extensions.js       # Package for stores
│   ├── scripts/
│   │   ├── test-all.js                 # Run all tests
│   │   ├── lint-all.js                 # Lint all packages
│   │   └── generate-icons.js           # Icon generation
│   └── templates/
│       ├── manifest.template.json      # Manifest template
│       └── popup.template.html         # Popup template
│
├── 📚 docs/                           # Documentation
│   ├── DEVELOPMENT.md                 # Development guide
│   ├── BROWSER_SUPPORT.md             # Browser compatibility
│   ├── API_REFERENCE.md               # Shared API docs
│   └── DEPLOYMENT.md                  # Deployment guide
│
├── 🧪 tests/                          # Shared tests
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── package.json                       # Root package.json (workspace)
├── tsconfig.json                      # Root TypeScript config
├── lerna.json                         # Lerna configuration
├── .eslintrc.js                       # ESLint configuration
└── README.md                          # Main documentation
```

---

## **🔧 Technology Stack**

### **Package Management**
- **Lerna** or **Nx**: Monorepo management
- **npm workspaces**: Dependency management
- **TypeScript**: Type safety across all packages

### **Build System**
- **Webpack**: Module bundling with shared configs
- **Rollup**: Alternative for library builds
- **esbuild**: Fast development builds

### **Testing**
- **Jest**: Unit and integration testing
- **Puppeteer**: E2E browser testing
- **web-ext**: Extension validation

### **Code Quality**
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality gates

---

## **📦 Shared Package Structure**

### **Core Theme Manager (`packages/shared/src/core/ThemeManager.ts`)**
```typescript
export class ThemeManager {
  constructor(private browserAPI: BrowserAPI) {}
  
  async applyTheme(mode: ThemeMode): Promise<void> {
    const theme = this.getThemeForMode(mode);
    await this.browserAPI.injectCSS(theme.styles);
    await this.storage.set('currentTheme', mode);
  }
  
  // Browser-agnostic theme switching logic
}
```

### **Browser API Abstraction (`packages/shared/src/utils/BrowserAPI.ts`)**
```typescript
export interface BrowserAPI {
  storage: StorageAPI;
  tabs: TabsAPI;
  runtime: RuntimeAPI;
}

export class ChromiumBrowserAPI implements BrowserAPI {
  // Chrome/Edge implementation
}

export class FirefoxBrowserAPI implements BrowserAPI {
  // Firefox implementation (future)
}
```

---

## **🎭 Browser-Specific Implementations**

### **Opera Implementation (`packages/opera/src/background.ts`)**
```typescript
import { ThemeManager, HazeOverSync } from '@hazeover/shared';
import { OperaThemes } from './themes/OperaThemes';

const themeManager = new ThemeManager(
  new ChromiumBrowserAPI(),
  new OperaThemes()
);

// Opera-specific initialization
```

### **Edge Implementation (`packages/edge-canary/src/background.ts`)**
```typescript
import { ThemeManager, HazeOverSync } from '@hazeover/shared';
import { EdgeThemes } from './themes/EdgeThemes';

const themeManager = new ThemeManager(
  new ChromiumBrowserAPI(),
  new EdgeThemes()
);

// Edge-specific initialization
```

---

## **🚀 Build & Development Workflow**

### **Root Package.json Scripts**
```json
{
  "scripts": {
    "dev": "lerna run dev --parallel",
    "build": "lerna run build",
    "test": "lerna run test",
    "lint": "lerna run lint",
    "package:all": "node tools/build/package-extensions.js",
    "publish:opera": "node tools/build/publish-opera.js",
    "publish:edge": "node tools/build/publish-edge.js"
  }
}
```

### **Development Commands**
```bash
# Install all dependencies
npm install

# Start development for all browsers
npm run dev

# Build specific browser
npm run build --scope=@hazeover/opera

# Test everything
npm test

# Package for store submission
npm run package:all
```

---

## **📈 Migration Strategy**

### **Phase 1: Setup Infrastructure** (Week 1)
- ✅ Initialize monorepo with Lerna/Nx
- ✅ Create shared package structure
- ✅ Set up TypeScript configurations
- ✅ Configure build tools and CI/CD

### **Phase 2: Extract Shared Code** (Week 2)
- ✅ Move theme logic to shared package
- ✅ Create browser API abstractions
- ✅ Extract common utilities and types
- ✅ Set up shared testing framework

### **Phase 3: Refactor Implementations** (Week 3)
- ✅ Refactor Opera extension to use shared code
- ✅ Refactor Edge extension to use shared code
- ✅ Update build processes
- ✅ Test cross-browser compatibility

### **Phase 4: Documentation & Optimization** (Week 4)
- ✅ Write comprehensive documentation
- ✅ Optimize build performance
- ✅ Set up automated testing
- ✅ Prepare for additional browser support

---

## **🎯 Benefits of This Approach**

### **For Development**
- 🔄 **Single Update, Multiple Browsers**: Fix a bug once, it's fixed everywhere
- 🧪 **Shared Testing**: Test core logic once, browser-specific only where needed
- 📚 **Unified Documentation**: One set of docs for all implementations
- 🚀 **Faster Feature Development**: New features automatically available across browsers

### **For Maintenance**
- 🔧 **Easier Debugging**: Centralized logging and error handling
- 📊 **Consistent Behavior**: Same logic produces same results across browsers
- 🔄 **Streamlined Updates**: Update shared dependencies once
- 📈 **Better Analytics**: Unified tracking and metrics

### **For Scalability**
- 🌐 **New Browser Support**: Add Chrome, Firefox, Safari easily
- 🎨 **Theme Variations**: Easy to add new themes (Focus, Work, etc.)
- 🔌 **Plugin Architecture**: Extensible for new HazeOver integrations
- 🏢 **Enterprise Features**: Centralized place for advanced features

---

## **🚦 Next Steps**

1. **Create the monorepo structure**
2. **Set up build tools and TypeScript**
3. **Extract common code from current implementations**
4. **Create browser-specific theme files**
5. **Update build scripts and CI/CD**
6. **Document the new development workflow**

Would you like me to start implementing this structure?
