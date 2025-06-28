/**
 * BACKGROUND SERVICE WORKER - MICROSOFT EDGE CANARY COMPATIBLE
 * Handles theme switching logic for Microsoft Edge Canary
 */

// Check if we're in Microsoft Edge and adjust API usage accordingly
const isEdge = navigator.userAgent.includes('Edg') || navigator.userAgent.includes('Edge');

/**
 * Initialize extension
 */
self.addEventListener('install', () => {
  console.log('🎨 Microsoft Edge Canary HazeOver Theme Sync extension installed');
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('🎨 Microsoft Edge Canary HazeOver Theme Sync extension activated');
  
  // Start theme checking interval
  startThemeChecking();
});

/**
 * Start periodic theme checking using setTimeout instead of alarms
 */
function startThemeChecking() {
  // Check immediately
  checkAndUpdateTheme();
  
  // Set up periodic checking every minute
  setInterval(checkAndUpdateTheme, 60000);
}

/**
 * Check current time and update theme if needed
 */
async function checkAndUpdateTheme() {
  try {
    const currentMode = getCurrentTimeMode();
    const storedMode = await getStoredMode();
    
    if (currentMode !== storedMode) {
      await setStoredMode(currentMode);
      
      // Inject theme update into all tabs
      if (chrome.tabs && chrome.tabs.query) {
        const tabs = await chrome.tabs.query({});
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, {
            action: 'updateTheme',
            mode: currentMode
          }).catch(() => {
            // Ignore errors for tabs that can't receive messages
          });
        });
      }
      
      console.log(`🔄 Edge Canary theme switched to: ${currentMode}`);
    }
  } catch (error) {
    console.log('Edge Canary theme check error:', error);
  }
}

/**
 * Get current time mode based on schedule
 */
function getCurrentTimeMode() {
  const now = new Date();
  const currentHour = now.getHours() + (now.getMinutes() / 60);
  
  if (currentHour >= 7 && currentHour < 17.5) {
    return 'day';
  } else if (currentHour >= 17.5 && currentHour < 19) {
    return 'evening';
  } else {
    return 'night';
  }
}

/**
 * Storage helpers with error handling for Edge Canary
 */
async function getStoredMode() {
  try {
    if (chrome.storage && chrome.storage.local) {
      const result = await chrome.storage.local.get(['edgeCanaryThemeMode']);
      return result.edgeCanaryThemeMode || 'day';
    }
  } catch (error) {
    console.log('Edge Canary storage read error:', error);
  }
  return 'day';
}

async function setStoredMode(mode) {
  try {
    if (chrome.storage && chrome.storage.local) {
      await chrome.storage.local.set({ edgeCanaryThemeMode: mode });
    }
  } catch (error) {
    console.log('Edge Canary storage write error:', error);
  }
}

/**
 * Handle messages from popup
 */
if (chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getCurrentMode') {
      sendResponse({ mode: getCurrentTimeMode() });
    } else if (message.action === 'setMode') {
      setStoredMode(message.mode);
      checkAndUpdateTheme();
      sendResponse({ success: true });
    }
  });
}
