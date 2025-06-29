#!/bin/bash

# Simulating: ray test --target=edge-canary
echo "🧪 Simulating: ray test --target=edge-canary"
echo "=================================================="

# Test 1: Extension structure validation
echo ""
echo "📁 TEST 1: Extension Structure Validation"
echo "--------------------------------------------"

DIST_PATH="extensions/edge-canary/dist"
REQUIRED_FILES=(
    "manifest.json"
    "src/background.js"
    "src/popup.html"
    "src/popup.js"
    "src/Edge_Canary_Auto_Theme_Switcher.js"
)

STRUCTURE_PASS=true
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$DIST_PATH/$file" ]; then
        echo "✅ $file - Found"
    else
        echo "❌ $file - Missing"
        STRUCTURE_PASS=false
    fi
done

# Test 2: Manifest validation
echo ""
echo "📋 TEST 2: Manifest Validation"
echo "--------------------------------"

MANIFEST_PATH="$DIST_PATH/manifest.json"
MANIFEST_PASS=true

if [ -f "$MANIFEST_PATH" ]; then
    # Check manifest version
    if grep -q '"manifest_version": 3' "$MANIFEST_PATH"; then
        echo "✅ Manifest Version 3 - Valid"
    else
        echo "❌ Manifest Version 3 - Invalid"
        MANIFEST_PASS=false
    fi
    
    # Check required permissions
    if grep -q '"storage"' "$MANIFEST_PATH"; then
        echo "✅ Storage Permission - Present"
    else
        echo "❌ Storage Permission - Missing"
        MANIFEST_PASS=false
    fi
    
    if grep -q '"activeTab"' "$MANIFEST_PATH"; then
        echo "✅ ActiveTab Permission - Present"
    else
        echo "❌ ActiveTab Permission - Missing"
        MANIFEST_PASS=false
    fi
    
    # Check service worker
    if grep -q '"service_worker"' "$MANIFEST_PATH"; then
        echo "✅ Service Worker - Configured"
    else
        echo "❌ Service Worker - Missing"
        MANIFEST_PASS=false
    fi
    
    # Check content scripts
    if grep -q '"content_scripts"' "$MANIFEST_PATH"; then
        echo "✅ Content Scripts - Configured"
    else
        echo "❌ Content Scripts - Missing"
        MANIFEST_PASS=false
    fi
    
else
    echo "❌ Manifest file not found"
    MANIFEST_PASS=false
fi

# Test 3: Edge Canary compatibility
echo ""
echo "🌐 TEST 3: Edge Canary Compatibility"
echo "--------------------------------------"

COMPAT_PASS=true

# Check if Edge Canary is installed
if [ -d "/Applications/Microsoft Edge Canary.app" ]; then
    echo "✅ Microsoft Edge Canary - Installed"
else
    echo "❌ Microsoft Edge Canary - Not Found"
    COMPAT_PASS=false
fi

# Check for Edge-specific code in background script
if grep -q "Edge" "$DIST_PATH/src/background.js"; then
    echo "✅ Edge Detection Logic - Present"
else
    echo "❌ Edge Detection Logic - Missing"
    COMPAT_PASS=false
fi

# Check for HazeOver sync functionality
if grep -q -i "hazeover" "$DIST_PATH/src/Edge_Canary_Auto_Theme_Switcher.js"; then
    echo "✅ HazeOver Sync - Configured"
else
    echo "❌ HazeOver Sync - Missing"
    COMPAT_PASS=false
fi

# Test 4: Theme configuration validation
echo ""
echo "🎨 TEST 4: Theme Configuration"
echo "--------------------------------"

THEME_PASS=true
THEME_SCRIPT="$DIST_PATH/src/Edge_Canary_Auto_Theme_Switcher.js"

if [ -f "$THEME_SCRIPT" ]; then
    # Check for required theme modes
    for mode in "day" "evening" "night"; do
        if grep -q "$mode:" "$THEME_SCRIPT"; then
            echo "✅ $mode theme - Configured"
        else
            echo "❌ $mode theme - Missing"
            THEME_PASS=false
        fi
    done
    
    # Check for time-based switching
    if grep -q "THEME_SCHEDULE" "$THEME_SCRIPT"; then
        echo "✅ Time-based Switching - Configured"
    else
        echo "❌ Time-based Switching - Missing"
        THEME_PASS=false
    fi
else
    echo "❌ Theme script not found"
    THEME_PASS=false
fi

# Test 5: Opera compatibility features
echo ""
echo "🎭 TEST 5: Opera Compatibility Features"
echo "----------------------------------------"

OPERA_PASS=true

# Check for collections support
if grep -q -i "collection" "$THEME_SCRIPT"; then
    echo "✅ Collections Support - Present"
else
    echo "❌ Collections Support - Missing"
    OPERA_PASS=false
fi

# Check for bookmark styling
if grep -q -i "bookmark" "$THEME_SCRIPT"; then
    echo "✅ Bookmark Styling - Present"
else
    echo "⚠️  Bookmark Styling - Limited"
fi

# Check for sidebar theming
if grep -q -i "sidebar" "$THEME_SCRIPT"; then
    echo "✅ Sidebar Theming - Present"
else
    echo "❌ Sidebar Theming - Missing"
    OPERA_PASS=false
fi

# Final Results
echo ""
echo "📊 TEST RESULTS SUMMARY"
echo "========================="

OVERALL_PASS=true

if [ "$STRUCTURE_PASS" = true ]; then
    echo "✅ Extension Structure: PASS"
else
    echo "❌ Extension Structure: FAIL"
    OVERALL_PASS=false
fi

if [ "$MANIFEST_PASS" = true ]; then
    echo "✅ Manifest Validation: PASS"
else
    echo "❌ Manifest Validation: FAIL"
    OVERALL_PASS=false
fi

if [ "$COMPAT_PASS" = true ]; then
    echo "✅ Edge Canary Compatibility: PASS"
else
    echo "❌ Edge Canary Compatibility: FAIL"
    OVERALL_PASS=false
fi

if [ "$THEME_PASS" = true ]; then
    echo "✅ Theme Configuration: PASS"
else
    echo "❌ Theme Configuration: FAIL"
    OVERALL_PASS=false
fi

if [ "$OPERA_PASS" = true ]; then
    echo "✅ Opera Compatibility: PASS"
else
    echo "❌ Opera Compatibility: FAIL"
    OVERALL_PASS=false
fi

echo ""
echo "=================================================="
if [ "$OVERALL_PASS" = true ]; then
    echo "🎉 OVERALL RESULT: ALL TESTS PASSED"
    echo "Extension is ready for manual testing in Edge Canary"
    echo ""
    echo "Next Steps:"
    echo "1. Open Edge Canary → edge://extensions"
    echo "2. Enable Developer mode"
    echo "3. Load unpacked → select extensions/edge-canary/dist"
    echo "4. Test bookmarks, history, collections functionality"
    echo "5. Verify theme switching matches HazeOver schedule"
    exit 0
else
    echo "⚠️  OVERALL RESULT: SOME TESTS FAILED"
    echo "Please review failed tests before manual testing"
    exit 1
fi
