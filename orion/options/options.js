// HazeOver Orion RC Browser Options Controller
// Privacy-first settings management

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌟 HazeOver Orion Options Initialized');
    
    // Initialize settings
    await loadSettings();
    attachEventListeners();
});

// Settings configuration
const defaultSettings = {
    autoTheme: true,
    hardwareAccel: true,
    zeroTelemetry: true,
    localOnly: true,
    adBlockerCompat: true,
    mobileOptim: true
};

// Load current settings
async function loadSettings() {
    try {
        const result = await chrome.storage.local.get(Object.keys(defaultSettings));
        
        Object.keys(defaultSettings).forEach(key => {
            const toggle = document.getElementById(key);
            const value = result[key] !== undefined ? result[key] : defaultSettings[key];
            
            if (toggle) {
                toggle.classList.toggle('active', value);
            }
        });
        
        console.log('✅ Settings loaded successfully');
        
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Attach event listeners
function attachEventListeners() {
    // Toggle event listeners
    Object.keys(defaultSettings).forEach(key => {
        const toggle = document.getElementById(key);
        if (toggle) {
            toggle.addEventListener('click', () => toggleSetting(key));
        }
    });
    
    // Save button
    const saveButton = document.getElementById('saveSettings');
    if (saveButton) {
        saveButton.addEventListener('click', saveSettings);
    }
}

// Toggle individual setting
function toggleSetting(settingKey) {
    const toggle = document.getElementById(settingKey);
    if (!toggle) return;
    
    const isActive = toggle.classList.contains('active');
    toggle.classList.toggle('active', !isActive);
    
    // Add visual feedback
    toggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
        toggle.style.transform = 'scale(1)';
    }, 100);
    
    console.log(`🔧 Setting ${settingKey}: ${!isActive}`);
}

// Save all settings
async function saveSettings() {
    try {
        const settings = {};
        
        Object.keys(defaultSettings).forEach(key => {
            const toggle = document.getElementById(key);
            if (toggle) {
                settings[key] = toggle.classList.contains('active');
            }
        });
        
        // Store settings
        await chrome.storage.local.set(settings);
        
        // Notify background script
        chrome.runtime.sendMessage({
            action: 'settingsUpdated',
            settings: settings,
            timestamp: Date.now()
        });
        
        // Visual feedback
        showSaveSuccess();
        
        console.log('💾 Settings saved:', settings);
        
    } catch (error) {
        console.error('Error saving settings:', error);
        showSaveError();
    }
}

// Show save success feedback
function showSaveSuccess() {
    const button = document.getElementById('saveSettings');
    const originalText = button.textContent;
    
    button.textContent = '✅ Saved!';
    button.style.background = 'rgba(76, 175, 80, 1)';
    button.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'rgba(76, 175, 80, 0.8)';
        button.style.transform = 'scale(1)';
    }, 2000);
}

// Show save error feedback
function showSaveError() {
    const button = document.getElementById('saveSettings');
    const originalText = button.textContent;
    
    button.textContent = '❌ Error!';
    button.style.background = 'rgba(244, 67, 54, 0.8)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'rgba(76, 175, 80, 0.8)';
    }, 2000);
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadSettings,
        saveSettings,
        toggleSetting,
        defaultSettings
    };
}
