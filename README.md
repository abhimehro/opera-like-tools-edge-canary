# Microsoft Edge Canary HazeOver Theme Sync

> Automatically sync Microsoft Edge Canary's appearance with your HazeOver focus modes throughout the day

## 🎨 What This Extension Does

This extension automatically adapts Microsoft Edge Canary's visual theme to match your HazeOver focus schedule:

- **Day Mode** (7:00 AM - 5:30 PM): Bright, productive interface
- **Evening Work** (5:30 PM - 7:00 PM): Warm, focused orange tones  
- **Night Mode** (7:00 PM - 7:00 AM): Dark, comfortable purple theme

## Opera Support

To build and package the Opera version of the extension, follow these steps:

1. **Build the Opera extension:**
   ```bash
   npm run build:opera
   ```
   
2. **Package the Opera extension:**
   ```bash
   npm run package:opera
   ```
   
This will generate a `.zip` file ready to be installed on Opera.

## 📦 Installation Guide

### Method 1: Load as Unpacked Extension (Recommended)

1. **Open Microsoft Edge Canary**
2. **Navigate to Extensions**: 
   - Type `edge://extensions/` in the address bar, or
   - Go to `Settings` > `Extensions`
3. **Enable Developer Mode**: Toggle the switch in the bottom-left
4. **Load Extension**:
   - Click "Load unpacked"
   - Select this entire folder: `Microsoft_Edge_Canary_HazeOver_Extension`
5. **Verify Installation**: Look for the extension icon in your toolbar

### Method 2: Create Simple Icons (Optional)

If you want custom icons, create these files in the `icons/` folder:
- `icon-16.png` (16x16px)
- `icon-32.png` (32x32px) 
- `icon-48.png` (48x48px)
- `icon-128.png` (128x128px)

## 🚀 How to Use

### Automatic Operation
- The extension works automatically once installed
- Themes switch based on time of day
- No manual intervention required

### Manual Controls
1. **Click the extension icon** in your toolbar
2. **Override themes manually**:
   - 🌅 Day Mode
   - 🌆 Evening Mode  
   - 🌙 Night Mode
3. **Test current theme** with the test button
4. **Clear overrides** to resume automatic switching

### Console Commands (Advanced)
Press `F12` and use these commands in the console:

```javascript
// Manual theme switching
edgeCanaryThemeControls.setDay()
edgeCanaryThemeControls.setEvening()
edgeCanaryThemeControls.setNight()

// Clear manual override
edgeCanaryThemeControls.clearOverride()

// Get current mode
edgeCanaryThemeControls.getCurrentMode()
```

## 🎯 Features

### Core Functionality
- ✅ **Automatic time-based switching**
- ✅ **Manual override system** (1-hour duration)
- ✅ **Real-time theme application**
- ✅ **Persistent settings** across browser sessions
- ✅ **Console fallback** for troubleshooting

### Edge Canary Optimizations
- ✅ **Tab Strip** theming
- ✅ **Address Bar** focus effects
- ✅ **Sidebar** integration
- ✅ **Collections & Favorites** styling
- ✅ **Vertical Tabs** support
- ✅ **Workspaces** compatibility
- ✅ **Copilot Integration** theming

### Visual Enhancements
- ✅ **Smooth transitions** between themes
- ✅ **Focus indicators** with glowing effects
- ✅ **Accessibility support** (reduced motion, high contrast)
- ✅ **Responsive design** for different window sizes

## 🛠 Technical Details

### File Structure
```
Microsoft_Edge_Canary_HazeOver_Extension/
├── manifest.json                           # Extension configuration
├── src/
│   ├── background.js                       # Service worker
│   ├── popup.html                          # Extension popup UI
│   ├── popup.js                           # Popup functionality
│   └── Edge_Canary_Auto_Theme_Switcher.js # Content script
├── icons/                                  # Extension icons
├── Edge_Canary_HazeOver_Enhanced.css      # Standalone CSS
└── README.md                              # This file
```

### Theme Schedule
| Time Range | Mode | Colors |
|------------|------|--------|
| 07:00 - 17:30 | Day | Light blues, high contrast |
| 17:30 - 19:00 | Evening | Warm oranges, focused |
| 19:00 - 07:00 | Night | Dark purples, comfortable |

### Browser Support
- ✅ **Microsoft Edge Canary** (Primary)
- ✅ **Microsoft Edge Dev** (Compatible)
- ⚠️ **Microsoft Edge Stable** (Limited support)

## 🔧 Customization

### Modify Theme Colors
Edit the CSS variables in `Edge_Canary_Auto_Theme_Switcher.js`:

```javascript
const THEMES = {
  day: {
    colors: {
      bg: '#F8F9FA',      // Background
      accent: '#0078d4',   // Edge blue accent
      text: '#2C3E50'      // Text color
    }
  }
  // ... other themes
}
```

### Adjust Time Schedule
Update the schedule in the same file:

```javascript
const THEME_SCHEDULE = {
  day: { start: 7, end: 17.5 },      // 7:00 AM - 5:30 PM
  evening: { start: 17.5, end: 19 }, // 5:30 PM - 7:00 PM  
  night: { start: 19, end: 7 }       // 7:00 PM - 7:00 AM
};
```

## 🐛 Troubleshooting

### Extension Not Working?
1. **Check if enabled**: Go to `edge://extensions/`
2. **Reload extension**: Toggle off/on or click reload
3. **Check console**: Press F12 and look for error messages
4. **Try manual mode**: Use the popup controls

### Themes Not Applying?
1. **Refresh affected tabs**
2. **Use console commands**: `edgeCanaryThemeControls.testTheme('day')`
3. **Check browser permissions**: Extension needs tab access
4. **Clear overrides**: Use the "Clear Override" button

### Performance Issues?
- The extension checks time every minute
- Themes apply only when needed (no constant polling)
- Disable if you experience any slowdown

## 🔄 Comparison with Opera Extension

This Edge Canary extension is functionally equivalent to the Opera version with these improvements:

### Similarities
- ✅ Same time-based switching logic
- ✅ Same color schemes and theme concepts  
- ✅ Manual override system
- ✅ Console command interface

### Edge Canary Enhancements
- 🆕 **Microsoft Edge specific** UI selectors
- 🆕 **Collections & Favorites** theming
- 🆕 **Vertical Tabs** support
- 🆕 **Workspaces** integration
- 🆕 **Copilot** interface styling
- 🆕 **Edge blue** accent colors for day mode

## 📝 Changelog

### Version 1.0.0
- ✅ Initial release
- ✅ Port from Opera extension
- ✅ Edge Canary optimizations
- ✅ Enhanced popup interface
- ✅ Comprehensive CSS theming

## 🤝 Contributing

Feel free to customize this extension for your specific needs:

1. **Fork** the extension folder
2. **Modify** themes and schedules
3. **Test** thoroughly in Edge Canary
4. **Share** your improvements

## 📄 License

MIT License - Feel free to modify and distribute

---

**🎨 Enjoy your automatically themed Microsoft Edge Canary experience!**

*This extension pairs perfectly with HazeOver to create a seamless, time-aware working environment.*
