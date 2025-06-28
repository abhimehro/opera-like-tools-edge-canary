/**
 * POPUP INTERFACE CONTROLLER - EDGE CANARY VERSION
 * Manages the extension popup interface for Microsoft Edge Canary
 */

// Mode configurations
const MODES = {
  day: {
    icon: '🌅',
    name: 'Day Mode',
    time: '07:00 - 17:30',
    description: 'Bright & productive'
  },
  evening: {
    icon: '🌆', 
    name: 'Evening Work',
    time: '17:30 - 19:00',
    description: 'Warm & focused'
  },
  night: {
    icon: '🌙',
    name: 'Night Mode', 
    time: '19:00 - 07:00',
    description: 'Dark & comfortable'
  }
};

/**
 * Initialize popup interface
 */
document.addEventListener('DOMContentLoaded', async () => {
  await updateCurrentMode();
  setupEventListeners();
});

/**
 * Update current mode display
 */
async function updateCurrentMode() {
  const currentMode = getCurrentTimeMode();
  const mode = MODES[currentMode];
  
  document.getElementById('modeIcon').textContent = mode.icon;
  document.getElementById('modeName').textContent = mode.name;
  document.getElementById('modeTime').textContent = mode.time;
  
  // Highlight active button
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`${currentMode}Btn`).classList.add('active');
}

/**
 * Setup event listeners for manual controls
 */
function setupEventListeners() {
  document.getElementById('dayBtn').addEventListener('click', () => {
    setThemeManually('day');
  });
  
  document.getElementById('eveningBtn').addEventListener('click', () => {
    setThemeManually('evening');
  });
  
  document.getElementById('nightBtn').addEventListener('click', () => {
    setThemeManually('night');
  });
  
  document.getElementById('testBtn').addEventListener('click', () => {
    testCurrentTheme();
  });
  
  document.getElementById('clearBtn').addEventListener('click', () => {
    clearManualOverride();
  });
}

/**
 * Manually set theme mode
 */
async function setThemeManually(mode) {
  const statusText = document.getElementById('statusText');
  
  try {
    // Get all tabs
    const tabs = await chrome.tabs.query({});
    let successCount = 0;
    
    // Send message to all tabs
    for (const tab of tabs) {
      try {
        await chrome.tabs.sendMessage(tab.id, {
          action: 'updateTheme',
          mode: mode
        });
        successCount++;
      } catch (e) {
        // Ignore tabs that can't receive messages (e.g., internal pages)
        console.log(`Could not send message to tab ${tab.id}: ${e.message}`);
      }
    }
    
    if (successCount > 0) {
      statusText.textContent = `✅ Applied to ${successCount} tab(s)`;
      console.log(`🎨 Theme ${mode} applied to ${successCount} tabs`);
    } else {
      // Fallback: show console instructions
      statusText.innerHTML = `
        <div style="font-size: 10px; line-height: 1.3;">
          Console method: Press F12, then run:<br>
          <code style="background: rgba(255,255,255,0.2); padding: 2px 4px; border-radius: 3px;">
            edgeCanaryThemeControls.set${mode.charAt(0).toUpperCase() + mode.slice(1)}()
          </code>
        </div>
      `;
    }
    
  } catch (e) {
    console.error('Extension API error:', e);
    // Show console fallback
    statusText.innerHTML = `
      <div style="font-size: 10px; line-height: 1.3;">
        Manual mode: Press F12, then run:<br>
        <code style="background: rgba(255,255,255,0.2); padding: 2px 4px; border-radius: 3px;">
          edgeCanaryThemeControls.set${mode.charAt(0).toUpperCase() + mode.slice(1)}()
        </code>
      </div>
    `;
  }
  
  // Update popup display
  await updateCurrentMode();
  
  // Reset status text after delay
  setTimeout(() => {
    statusText.textContent = 'Synced with HazeOver';
  }, 3000);
}

/**
 * Test current theme by applying it
 */
function testCurrentTheme() {
  const currentMode = getCurrentTimeMode();
  setThemeManually(currentMode);
}

/**
 * Clear manual override
 */
async function clearManualOverride() {
  const statusText = document.getElementById('statusText');
  
  try {
    const tabs = await chrome.tabs.query({});
    let successCount = 0;
    
    for (const tab of tabs) {
      try {
        await chrome.tabs.sendMessage(tab.id, {
          action: 'clearOverride'
        });
        successCount++;
      } catch (e) {
        // Ignore errors
      }
    }
    
    if (successCount > 0) {
      statusText.textContent = `🔄 Override cleared on ${successCount} tab(s)`;
    } else {
      statusText.innerHTML = `
        <div style="font-size: 10px; line-height: 1.3;">
          Console: Press F12, then run:<br>
          <code style="background: rgba(255,255,255,0.2); padding: 2px 4px; border-radius: 3px;">
            edgeCanaryThemeControls.clearOverride()
          </code>
        </div>
      `;
    }
    
  } catch (e) {
    statusText.innerHTML = `
      <div style="font-size: 10px; line-height: 1.3;">
        Console: Press F12, then run:<br>
        <code style="background: rgba(255,255,255,0.2); padding: 2px 4px; border-radius: 3px;">
          edgeCanaryThemeControls.clearOverride()
        </code>
      </div>
    `;
  }
  
  setTimeout(() => {
    statusText.textContent = 'Synced with HazeOver';
  }, 3000);
}

/**
 * Get current time mode
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

