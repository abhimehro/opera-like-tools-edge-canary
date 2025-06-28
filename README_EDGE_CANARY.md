# Edge Canary Extension - Build & Deployment Guide

## Overview

This document describes the build and deployment process for the Microsoft Edge Canary HazeOver Theme Sync extension, which is a port of the original Opera extension with Edge-specific optimizations.

## Project Structure

```
Microsoft_Edge_Canary_HazeOver_Extension/
├── README_EDGE_CANARY.md               # This file
├── package.json                        # npm package configuration
├── manifest.json                       # Root manifest (for reference)
├── extensions/
│   └── edge-canary/
│       └── dist/                       # Edge Canary extension source
│           ├── manifest.json           # Edge-specific manifest
│           ├── Edge_Canary_HazeOver_Enhanced.css
│           ├── src/                    # Extension scripts
│           │   ├── background.js
│           │   ├── popup.html
│           │   ├── popup.js
│           │   └── Edge_Canary_Auto_Theme_Switcher.js
│           └── icons/                  # Extension icons
├── dist/                               # Build artifacts
│   ├── edge-canary-hazeover-sync.zip
│   └── edge-canary-hazeover-sync.vsix
└── node_modules/                       # npm dependencies
```

## Prerequisites

### Software Requirements
- **Node.js**: Version 14.0.0 or higher
- **npm**: Comes with Node.js
- **Microsoft Edge Canary**: For testing and deployment

### Dependencies
- **web-ext**: Mozilla's web extension development tool (used for building Edge extensions)

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

This installs:
- `web-ext@^8.8.0` for building and packaging the extension

### 2. Verify Extension Structure
The source files are located in `extensions/edge-canary/dist/`:
- Manifest v3 configuration with Edge-specific settings
- Service worker background script
- Content scripts for theme switching
- Popup UI for manual controls
- CSS styling for Edge Canary interface

## Build Process

### Build Commands

#### Primary Build Command
```bash
npm run build
```
This is an alias for `npm run package:edge`

#### Edge-Specific Packaging
```bash
npm run package:edge
```
Creates a ZIP package from the Edge Canary extension source

#### Direct web-ext Command
```bash
web-ext build --source-dir=extensions/edge-canary/dist --artifacts-dir=dist --filename=edge-canary-hazeover-sync.zip
```

### Build Output
- **Location**: `dist/` directory
- **Filename**: `edge-canary-hazeover-sync.zip`
- **Format**: Standard extension package compatible with Edge

### Linting
```bash
npm run lint
```
Validates the extension using web-ext linting tools

## Development Workflow

### 1. Local Development
For development and testing:
```bash
# Load unpacked extension in Edge Canary
# 1. Go to edge://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select: extensions/edge-canary/dist/
```

### 2. Build for Distribution
```bash
# Create production package
npm run build

# Verify the package
npm run lint
```

### 3. Testing
```bash
# Load the built package in Edge Canary
# Install from dist/edge-canary-hazeover-sync.zip
```

## Deployment Options

### Option 1: Microsoft Edge Add-ons Store
1. **Build the extension**: `npm run build`
2. **Create Edge Developer Account**: [Microsoft Edge Add-ons Developer](https://developer.microsoft.com/en-us/microsoft-edge/extensions/)
3. **Upload Package**: Submit `dist/edge-canary-hazeover-sync.zip`
4. **Review Process**: Microsoft will review the extension
5. **Publication**: Once approved, available in Edge Add-ons store

### Option 2: Sideloading (Development/Internal Use)
1. **Build the extension**: `npm run build`
2. **Distribute ZIP file**: Share `dist/edge-canary-hazeover-sync.zip`
3. **Installation Instructions**:
   - Enable Developer mode in `edge://extensions/`
   - Drag and drop the ZIP file onto the extensions page
   - Or use "Load unpacked" with the `extensions/edge-canary/dist/` folder

### Option 3: Enterprise Deployment
1. **Build the extension**: `npm run build`
2. **Group Policy**: Configure Edge to allow specific extensions
3. **Deploy via MDM**: Use Microsoft Intune or similar
4. **Registry Installation**: Add extension to allowed list

## Extension Features

### Core Functionality
- **Automatic Theme Switching**: Based on time of day
- **Manual Override**: 1-hour temporary theme changes
- **Edge Canary Optimizations**: Specific UI element targeting
- **Persistent Settings**: Survives browser restarts

### Edge-Specific Features
- **Collections & Favorites**: Custom theming
- **Vertical Tabs**: Support for Edge's vertical tab layout
- **Workspaces**: Integration with Edge workspaces
- **Copilot Interface**: Styling for Edge AI features
- **Edge Blue Accents**: Uses Microsoft's Edge brand colors

### Theme Schedule
| Time Range | Mode | Primary Colors |
|------------|------|----------------|
| 07:00 - 17:30 | Day | Light blues, Edge blue accent |
| 17:30 - 19:00 | Evening | Warm oranges, focused amber |
| 19:00 - 07:00 | Night | Dark purples, comfortable violet |

## Configuration

### Manifest Settings (extensions/edge-canary/dist/manifest.json)
- **Manifest Version**: 3 (latest standard)
- **Minimum Edge Version**: 124.0+
- **Permissions**: storage, activeTab, tabs
- **Content Scripts**: Runs on all URLs for theme application
- **Service Worker**: Background processing for time checks

### Build Configuration (package.json)
- **Source Directory**: `extensions/edge-canary/dist`
- **Output Directory**: `dist`
- **Package Name**: `edge-canary-hazeover-sync.zip`

## Troubleshooting

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check web-ext version
npx web-ext --version

# Verbose build output
npx web-ext build --source-dir=extensions/edge-canary/dist --artifacts-dir=dist --verbose
```

### Extension Issues
```bash
# Test extension validity
npm run lint

# Check manifest syntax
web-ext lint --source-dir=extensions/edge-canary/dist --self-hosted
```

### Runtime Issues
1. **Check Console**: F12 → Console tab for JavaScript errors
2. **Extension Page**: `edge://extensions/` for extension status
3. **Reload Extension**: Use reload button on extension card
4. **Permissions**: Ensure all required permissions are granted

## Version Management

### Updating the Extension
1. **Modify source files** in `extensions/edge-canary/dist/`
2. **Update version** in `extensions/edge-canary/dist/manifest.json`
3. **Update package.json** version if needed
4. **Build**: `npm run build`
5. **Test**: Load new package in Edge Canary
6. **Deploy**: Upload to store or distribute new ZIP

### Release Checklist
- [ ] Source code updated
- [ ] Version number incremented
- [ ] Manifest.json updated
- [ ] Extension tested in Edge Canary
- [ ] Build process completed successfully
- [ ] Linting passes without errors
- [ ] Package created and verified

## Opera Extension Compatibility

This Edge Canary extension is a direct port of the Opera extension with the following changes:

### Similarities
- ✅ Same core theme switching logic
- ✅ Identical color schemes and timing
- ✅ Same manual override system
- ✅ Compatible console commands

### Edge-Specific Adaptations
- 🆕 Manifest v3 format (Opera uses v2)
- 🆕 Service worker instead of background page
- 🆕 Edge-specific CSS selectors
- 🆕 Microsoft Edge branding and colors
- 🆕 Edge Canary feature integration

## Support & Maintenance

### Code Maintenance
- **Source Location**: `extensions/edge-canary/dist/`
- **Key Files**: 
  - `manifest.json` (extension configuration)
  - `src/Edge_Canary_Auto_Theme_Switcher.js` (main logic)
  - `src/background.js` (service worker)
  - `src/popup.js` (UI controls)

### Documentation
- **Main README**: `README.md` (user documentation)
- **This Document**: `README_EDGE_CANARY.md` (technical build guide)
- **Changes Log**: `EDGE_CANARY_CHANGES.md` (porting notes)

---

**📦 Happy Building!** 

This Edge Canary extension provides Opera-like automatic theming functionality specifically optimized for Microsoft Edge Canary users.
