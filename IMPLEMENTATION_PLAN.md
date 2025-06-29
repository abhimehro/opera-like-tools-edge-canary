# 🚀 Implementation Plan: Shared Workspace Setup

## **🎯 Goal**
Transform the current single-browser extension into a modern monorepo supporting multiple browsers with shared code.

## **📋 Phase 1: Quick Setup (30 minutes)**

### **Step 1: Initialize Monorepo Structure**
```bash
# Create new monorepo directory
mkdir ~/Desktop/HazeOver-Browser-Extensions
cd ~/Desktop/HazeOver-Browser-Extensions

# Initialize npm workspace
npm init -y
```

### **Step 2: Set up Package Structure**
```bash
# Create package directories
mkdir -p packages/shared/src/{core,utils,themes,types}
mkdir -p packages/edge-canary/src/{popup,themes}
mkdir -p packages/opera/src/{popup,themes}
mkdir -p tools/{build,scripts,templates}
mkdir -p docs tests/{unit,integration,e2e}
```

### **Step 3: Configure Root Package.json**
```json
{
  "name": "hazeover-browser-extensions",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "dev": "npm run dev --workspaces",
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces",
    "package:edge": "npm run build --workspace=packages/edge-canary",
    "package:opera": "npm run build --workspace=packages/opera"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "web-ext": "^8.8.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

---

## **📦 Phase 2: Extract Shared Code (45 minutes)**

### **Step 1: Create Shared Package**
```bash
cd packages/shared
npm init -y
```

### **Step 2: Shared Package.json**
```json
{
  "name": "@hazeover/shared",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

### **Step 3: Move Core Logic to Shared**
- Extract theme switching logic from current `Edge_Canary_Auto_Theme_Switcher.js`
- Create TypeScript interfaces for themes
- Abstract browser API calls

### **Step 4: Create Browser-Specific Packages**
- `packages/edge-canary/`: Current Edge implementation
- `packages/opera/`: Opera-specific version (future)

---

## **🔧 Phase 3: Migration Execution (1 hour)**

### **Current File Migration Map**
```
Current → New Location
├── src/background.js → packages/edge-canary/src/background.ts
├── src/Edge_Canary_Auto_Theme_Switcher.js → packages/shared/src/core/ThemeManager.ts
├── src/popup.html → packages/edge-canary/src/popup/popup.html
├── src/popup.js → packages/edge-canary/src/popup/popup.ts
├── src/popup.css → packages/edge-canary/src/popup/popup.css
├── manifest.json → packages/edge-canary/manifest.json
└── icons/ → packages/edge-canary/icons/
```

### **Shared Code Extraction**
1. **Theme Logic**: Extract time-based switching, CSS injection
2. **Storage Utils**: Abstract chrome.storage calls
3. **Time Scheduler**: Extract scheduling logic
4. **Types**: Create TypeScript definitions

---

## **⚡ Quick Start Option (15 minutes)**

If you want to see immediate results, we can start with a **simplified approach**:

### **Option A: Simple Shared Utilities**
1. Create a `shared/` folder in current project
2. Extract common functions into separate files
3. Import shared code in both Opera and Edge versions
4. Keep existing build process for now

### **Option B: Full Monorepo Setup**
1. Follow the complete plan above
2. Modern TypeScript + build tools
3. Proper workspace configuration
4. Future-proof architecture

---

## **🎯 Recommended Next Action**

**I recommend starting with Option A (Simple Shared Utilities)** because:
- ✅ **Quick Results**: See benefits immediately
- ✅ **Low Risk**: Current working extension stays intact
- ✅ **Gradual Migration**: Can upgrade to full monorepo later
- ✅ **Learning Curve**: Easier to understand the shared code patterns

## **🚀 Let's Start Implementation**

Would you like me to:

1. **🔥 Start with Quick Setup (Option A)** - 15 minutes to working shared code
2. **🏗️ Full Monorepo Implementation (Option B)** - Complete modern setup
3. **📋 Create detailed migration scripts** - Automated setup process

What sounds most appealing to you?
