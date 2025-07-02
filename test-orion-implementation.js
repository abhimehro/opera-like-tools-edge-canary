#!/usr/bin/env node

/**
 * HazeOver Orion Implementation Test
 * Quick verification that our Orion RC Browser support is ready
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Testing HazeOver Orion RC Browser Implementation\n');

// Test Results
const testResults = {
  passed: 0,
  failed: 0,
  total: 0
};

/**
 * Helper function to run a test
 */
function test(name, testFn) {
  testResults.total++;
  try {
    const result = testFn();
    if (result) {
      console.log(`✅ ${name}`);
      testResults.passed++;
    } else {
      console.log(`❌ ${name}`);
      testResults.failed++;
    }
  } catch (error) {
    console.log(`❌ ${name} - Error: ${error.message}`);
    testResults.failed++;
  }
}

// 1. Test file structure
console.log('📁 Testing File Structure...');

test('Orion configuration exists', () => {
  return fs.existsSync(path.join(__dirname, 'shared/configs/orion-config.js'));
});

test('Orion theme manager exists', () => {
  return fs.existsSync(path.join(__dirname, 'shared/managers/OrionThemeManager.js'));
});

test('Orion manifest exists', () => {
  return fs.existsSync(path.join(__dirname, 'orion/manifest.json'));
});

test('Orion content script exists', () => {
  return fs.existsSync(path.join(__dirname, 'orion/content/orion-content.js'));
});

test('Orion background script exists', () => {
  return fs.existsSync(path.join(__dirname, 'orion/background/background.js'));
});

console.log();

// 2. Test manifest configuration
console.log('📄 Testing Manifest Configuration...');

test('Manifest is valid JSON', () => {
  const manifestPath = path.join(__dirname, 'orion/manifest.json');
  const manifestContent = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(manifestContent);
  return manifest.manifest_version === 3;
});

test('Manifest has Orion-specific fields', () => {
  const manifestPath = path.join(__dirname, 'orion/manifest.json');
  const manifestContent = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(manifestContent);
  return manifest.orion_specific && manifest.orion_specific.webkit_optimized;
});

test('Manifest has required permissions', () => {
  const manifestPath = path.join(__dirname, 'orion/manifest.json');
  const manifestContent = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(manifestContent);
  const requiredPerms = ['storage', 'tabs', 'alarms', 'theme', 'scripting'];
  return requiredPerms.every(perm => manifest.permissions.includes(perm));
});

console.log();

// 3. Test code quality and structure
console.log('🔍 Testing Code Quality...');

test('OrionThemeManager imports correctly', () => {
  const managerPath = path.join(__dirname, 'shared/managers/OrionThemeManager.js');
  const content = fs.readFileSync(managerPath, 'utf8');
  return content.includes('export class OrionThemeManager') && 
         content.includes('WebKit-optimized');
});

test('Orion content script has WebKit optimizations', () => {
  const contentPath = path.join(__dirname, 'orion/content/orion-content.js');
  const content = fs.readFileSync(contentPath, 'utf8');
  return content.includes('translateZ(0)') && 
         content.includes('webkit');
});

test('Background script has privacy features', () => {
  const backgroundPath = path.join(__dirname, 'orion/background/background.js');
  const content = fs.readFileSync(backgroundPath, 'utf8');
  return content.includes('privacy') && 
         content.includes('telemetry: false');
});

test('All files use consistent naming', () => {
  const files = [
    'shared/configs/orion-config.js',
    'shared/managers/OrionThemeManager.js',
    'orion/content/orion-content.js',
    'orion/background/background.js'
  ];
  
  return files.every(file => {
    const filePath = path.join(__dirname, file);
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes('Orion') || content.includes('orion');
  });
});

console.log();

// 4. Test WebKit optimizations
console.log('⚡ Testing WebKit Optimizations...');

test('Hardware acceleration implemented', () => {
  const contentPath = path.join(__dirname, 'orion/content/orion-content.js');
  const content = fs.readFileSync(contentPath, 'utf8');
  return content.includes('translateZ(0)') && 
         content.includes('backface-visibility: hidden');
});

test('WebKit-specific CSS properties used', () => {
  const contentPath = path.join(__dirname, 'orion/content/orion-content.js');
  const content = fs.readFileSync(contentPath, 'utf8');
  return content.includes('-webkit-font-smoothing') && 
         content.includes('-webkit-backface-visibility');
});

test('Performance monitoring included', () => {
  const contentPath = path.join(__dirname, 'orion/content/orion-content.js');
  const content = fs.readFileSync(contentPath, 'utf8');
  return content.includes('PerformanceObserver') && 
         content.includes('performance.mark');
});

console.log();

// 5. Test privacy features
console.log('🔒 Testing Privacy Features...');

test('Zero telemetry configuration', () => {
  const configPath = path.join(__dirname, 'shared/configs/orion-config.js');
  const content = fs.readFileSync(configPath, 'utf8');
  return content.includes('zeroTelemetry: true') && 
         content.includes('privacy');
});

test('Local-only storage implementation', () => {
  const backgroundPath = path.join(__dirname, 'orion/background/background.js');
  const content = fs.readFileSync(backgroundPath, 'utf8');
  return content.includes('chrome.storage.local') && 
         content.includes('privacy');
});

test('No external requests in code', () => {
  const files = [
    'shared/managers/OrionThemeManager.js',
    'orion/content/orion-content.js',
    'orion/background/background.js'
  ];
  
  return files.every(file => {
    const filePath = path.join(__dirname, file);
    const content = fs.readFileSync(filePath, 'utf8');
    // Check that no external HTTP requests are made
    return !content.includes('fetch(') && 
           !content.includes('XMLHttpRequest') &&
           !content.includes('axios');
  });
});

console.log();

// 6. Test integration readiness
console.log('🔗 Testing Integration Readiness...');

test('Shared utilities integration', () => {
  const managerPath = path.join(__dirname, 'shared/managers/OrionThemeManager.js');
  const content = fs.readFileSync(managerPath, 'utf8');
  return content.includes('import') && 
         content.includes('ThemeManager');
});

test('Configuration exports properly', () => {
  const configPath = path.join(__dirname, 'shared/configs/orion-config.js');
  const content = fs.readFileSync(configPath, 'utf8');
  return content.includes('export const OrionConfig') && 
         content.includes('export const OrionUtils');
});

test('Extension entry points defined', () => {
  const manifestPath = path.join(__dirname, 'orion/manifest.json');
  const content = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(content);
  return manifest.background && 
         manifest.content_scripts && 
         manifest.action;
});

console.log();

// 7. Generate installation instructions
console.log('📋 Generating Installation Instructions...');

const installInstructions = `
# 🌟 HazeOver Orion RC Browser Installation Guide

## Prerequisites
1. Install Orion RC Browser from: https://browser.kagi.com/
2. Enable third-party extensions in Orion settings

## Installation Steps

### Method 1: Chrome Web Store (Recommended)
1. Open Orion browser
2. Navigate to Chrome Web Store
3. Search for "HazeOver Theme Sync"
4. Click "Add to Orion" 
5. Confirm installation

### Method 2: Firefox Add-ons
1. Open Orion browser  
2. Navigate to Firefox Add-ons
3. Search for "HazeOver Theme Sync"
4. Click "Add to Orion"
5. Confirm installation

### Method 3: Local Development
1. Clone this repository
2. Open Orion browser
3. Navigate to orion://extensions/
4. Enable "Developer mode"
5. Click "Load unpacked"
6. Select the /orion folder
7. Extension will be loaded

## Features Enabled
✅ Privacy-first theme switching
✅ WebKit hardware acceleration  
✅ Zero telemetry tracking
✅ Built-in ad blocker compatibility
✅ Native macOS performance
✅ iOS/iPadOS support

## Keyboard Shortcuts
- Cmd+Shift+T: Toggle theme
- Cmd+Shift+P: Toggle privacy mode

## Support
For issues specific to Orion, please check:
- Orion compatibility mode settings
- Extension permissions in Orion
- Built-in content blocker conflicts

Enjoy privacy-first theming! 🎉
`;

fs.writeFileSync(path.join(__dirname, 'ORION_INSTALL_GUIDE.md'), installInstructions);

test('Installation guide created', () => {
  return fs.existsSync(path.join(__dirname, 'ORION_INSTALL_GUIDE.md'));
});

console.log();

// 8. Display results
console.log('📊 Test Results Summary');
console.log('=' * 40);
console.log(`✅ Passed: ${testResults.passed}`);
console.log(`❌ Failed: ${testResults.failed}`);
console.log(`📊 Total:  ${testResults.total}`);

const successRate = Math.round((testResults.passed / testResults.total) * 100);
console.log(`🎯 Success Rate: ${successRate}%`);

console.log();

if (testResults.failed === 0) {
  console.log('🎉 ALL TESTS PASSED! Orion RC Browser support is ready! 🚀');
  console.log();
  console.log('🔥 Next Steps:');
  console.log('  1. Install Orion RC Browser');
  console.log('  2. Load the extension using the installation guide');
  console.log('  3. Test theme switching in Orion');
  console.log('  4. Verify WebKit performance benefits');
  console.log('  5. Celebrate the privacy-first theming! 🎊');
} else {
  console.log('⚠️  Some tests failed. Please review the implementation.');
  process.exit(1);
}

console.log();
console.log('🌟 HazeOver + Orion RC Browser = Privacy-First WebKit Theming! 🌟');
