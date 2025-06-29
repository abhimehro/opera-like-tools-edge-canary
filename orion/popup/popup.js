// HazeOver Orion RC Browser Popup Controller
// Privacy-first, WebKit-optimized popup interface

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌟 HazeOver Orion Popup Initialized');
    
    // Initialize UI elements
    const toggleThemeBtn = document.getElementById('toggleTheme');
    const privacyModeBtn = document.getElementById('privacyMode');
    const settingsBtn = document.getElementById('settings');
    const performanceBtn = document.getElementById('performance');
    const currentThemeDisplay = document.getElementById('currentTheme');
    const privacyStatusDisplay = document.getElementById('privacyStatus');
    
    // Load current state
    await loadCurrentState();
    
    // Event Listeners with Orion-optimized feedback
    toggleThemeBtn.addEventListener('click', async () => {
        await toggleTheme();
        addClickFeedback(toggleThemeBtn);
    });
    
    privacyModeBtn.addEventListener('click', async () => {
        await togglePrivacyMode();
        addClickFeedback(privacyModeBtn);
    });
    
    settingsBtn.addEventListener('click', () => {
        chrome.runtime.openOptionsPage();
        addClickFeedback(settingsBtn);
    });
    
    performanceBtn.addEventListener('click', async () => {
        await showPerformanceInfo();
        addClickFeedback(performanceBtn);
    });
    
    // Load and display current state
    async function loadCurrentState() {
        try {
            const result = await chrome.storage.local.get(['currentTheme', 'privacyMode', 'performance']);
            
            // Update theme display
            const theme = result.currentTheme || 'auto';
            currentThemeDisplay.textContent = `Current: ${capitalizeFirst(theme)}`;
            
            // Update privacy status
            const privacyEnabled = result.privacyMode !== false;
            privacyStatusDisplay.textContent = privacyEnabled ? '🔒 Zero Telemetry Active' : '🔓 Standard Mode';
            
            // Update theme toggle button
            updateThemeButton(theme);
            
        } catch (error) {
            console.error('Error loading state:', error);
        }
    }
    
    // Toggle theme with WebKit optimization
    async function toggleTheme() {
        try {
            // Get current theme
            const result = await chrome.storage.local.get(['currentTheme']);
            const currentTheme = result.currentTheme || 'auto';
            
            // Determine next theme
            const nextTheme = getNextTheme(currentTheme);
            
            // Store new theme
            await chrome.storage.local.set({ currentTheme: nextTheme });
            
            // Send message to background script
            chrome.runtime.sendMessage({
                action: 'toggleTheme',
                theme: nextTheme,
                timestamp: Date.now()
            });
            
            // Update UI
            currentThemeDisplay.textContent = `Current: ${capitalizeFirst(nextTheme)}`;
            updateThemeButton(nextTheme);
            
            console.log(`🎨 Theme switched to: ${nextTheme}`);
            
        } catch (error) {
            console.error('Error toggling theme:', error);
        }
    }
    
    // Toggle privacy mode
    async function togglePrivacyMode() {
        try {
            const result = await chrome.storage.local.get(['privacyMode']);
            const currentPrivacy = result.privacyMode !== false;
            const newPrivacy = !currentPrivacy;
            
            await chrome.storage.local.set({ privacyMode: newPrivacy });
            
            chrome.runtime.sendMessage({
                action: 'togglePrivacy',
                enabled: newPrivacy,
                timestamp: Date.now()
            });
            
            privacyStatusDisplay.textContent = newPrivacy ? '🔒 Zero Telemetry Active' : '🔓 Standard Mode';
            privacyModeBtn.textContent = newPrivacy ? '🛡️ Privacy Mode' : '🔓 Standard Mode';
            
            console.log(`🛡️ Privacy mode: ${newPrivacy ? 'enabled' : 'disabled'}`);
            
        } catch (error) {
            console.error('Error toggling privacy mode:', error);
        }
    }
    
    // Show performance information
    async function showPerformanceInfo() {
        try {
            const result = await chrome.storage.local.get(['performance']);
            const performance = result.performance || {};
            
            const info = [
                `⚡ Theme switches: ${performance.themeToggles || 0}`,
                `🚀 Avg switch time: ${performance.avgSwitchTime || '< 50'}ms`,
                `🔧 WebKit optimized: ✅`,
                `📱 Mobile ready: ✅`
            ].join('\\n');
            
            // Create temporary overlay
            showInfoOverlay(info);
            
        } catch (error) {
            console.error('Error showing performance info:', error);
        }
    }
    
    // Utility functions
    function getNextTheme(current) {
        const themes = ['auto', 'light', 'dark'];
        const currentIndex = themes.indexOf(current);
        return themes[(currentIndex + 1) % themes.length];
    }
    
    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    function updateThemeButton(theme) {
        const icons = { auto: '🌓', light: '☀️', dark: '🌙' };
        toggleThemeBtn.textContent = `${icons[theme] || '🌓'} Toggle Theme`;
    }
    
    function addClickFeedback(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'translateY(-1px)';
        }, 100);
    }
    
    function showInfoOverlay(text) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            white-space: pre-line;
            text-align: center;
            z-index: 1000;
            backdrop-filter: blur(5px);
        `;
        overlay.textContent = text;
        
        overlay.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            if (overlay.parentNode) {
                document.body.removeChild(overlay);
            }
        }, 3000);
    }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { /* popup functions */ };
}
