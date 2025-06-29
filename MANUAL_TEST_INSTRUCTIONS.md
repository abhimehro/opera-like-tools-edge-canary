# Microsoft Edge Canary Manual Testing Instructions

## ✅ Automated Validation Complete

The extension has been successfully prepared and validated:

- ✅ Extension directory created: `extensions/edge-canary/dist/`
- ✅ All required files present (manifest.json, background.js, popup.html, etc.)
- ✅ Manifest v3 properly configured
- ✅ Edge Canary specific naming and compatibility
- ✅ Microsoft Edge Canary detected and ready

## 📋 Manual Testing Steps

### Step 1: Launch Edge Canary and Enable Developer Mode
1. Open Microsoft Edge Canary (already launched)
2. Navigate to: `edge://extensions`
3. Toggle "Developer mode" to **ON** (top-right corner)

### Step 2: Load the Extension
1. Click "Load unpacked" button
2. Navigate to and select: 
   ```
   /Users/abhimehrotra/Desktop/Microsoft_Edge_Canary_HazeOver_Extension/extensions/edge-canary/dist
   ```
3. The extension should load successfully

### Step 3: Verify Extension Installation
- ✅ Extension appears in extensions list
- ✅ Extension name: "Microsoft Edge Canary HazeOver Theme Sync"
- ✅ Extension is enabled
- ✅ No error messages

### Step 4: Test Opera-like Features
Open a new tab and verify the following features populate exactly as in Opera:

#### Bookmarks Verification:
- [ ] Bookmarks bar displays properly
- [ ] Bookmark folders accessible
- [ ] Bookmark sync working (if applicable)

#### History Verification:
- [ ] Recent history accessible via Ctrl+H
- [ ] History search functionality
- [ ] History timeline display

#### Collections Verification (Edge equivalent to Opera Workspaces):
- [ ] Collections panel accessible
- [ ] Create new collection functionality
- [ ] Add pages to collections
- [ ] Collections sync and organization

### Step 5: Theme Switching Test
1. Check current theme matches time of day:
   - **Day mode** (7:00-17:30): Light theme with blue accents
   - **Evening mode** (17:30-19:00): Warm orange theme
   - **Night mode** (19:00-7:00): Dark purple theme

2. Click extension icon to manually test theme switching
3. Verify smooth theme transitions

### Step 6: Opera Compatibility Check
Compare the following with your Opera browser:
- [ ] Navigation feels similar
- [ ] Bookmark organization matches
- [ ] History access patterns identical
- [ ] Collections/Workspaces functionality equivalent
- [ ] Overall user experience consistency

## 🔧 Troubleshooting

### If Extension Doesn't Load:
1. Check file permissions: `chmod -R 755 extensions/`
2. Verify manifest.json syntax
3. Check developer console for errors

### If Themes Don't Apply:
1. Refresh the current tab
2. Check browser console (F12) for JavaScript errors
3. Try manually switching themes via extension popup

### If Features Missing:
1. Ensure Edge Canary is up to date
2. Check extension permissions
3. Verify content script injection

## ✅ Expected Results

After successful installation and testing:
- Extension loads without errors
- Themes switch automatically based on time
- Manual theme switching works via popup
- Browser UI follows HazeOver schedule
- Opera-like functionality preserved
- Collections/bookmarks/history work identically to Opera

## 📊 Test Status

- [x] Automated setup complete
- [ ] Developer mode enabled
- [ ] Extension loaded
- [ ] Bookmarks verified
- [ ] History verified
- [ ] Collections verified
- [ ] Theme switching tested
- [ ] Opera compatibility confirmed

---

**Note**: This extension is specifically optimized for Microsoft Edge Canary and includes Opera-like functionality to ensure a seamless transition experience.
