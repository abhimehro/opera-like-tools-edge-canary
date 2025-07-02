#!/bin/bash

echo "=== Edge Canary Extension Validation ==="
echo ""

# Check if the dist directory exists
if [ ! -d "extensions/edge-canary/dist" ]; then
    echo "❌ Error: extensions/edge-canary/dist directory not found"
    exit 1
fi

echo "✅ extensions/edge-canary/dist directory exists"

# Check for required files
required_files=(
    "extensions/edge-canary/dist/manifest.json"
    "extensions/edge-canary/dist/src/background.js"
    "extensions/edge-canary/dist/src/popup.html"
    "extensions/edge-canary/dist/src/popup.js"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ Missing: $file"
    fi
done

# Check manifest.json structure
echo ""
echo "=== Manifest Validation ==="
if [ -f "extensions/edge-canary/dist/manifest.json" ]; then
    if grep -q "manifest_version.*3" "extensions/edge-canary/dist/manifest.json"; then
        echo "✅ Manifest version 3 detected"
    else
        echo "❌ Manifest version 3 not found"
    fi
    
    if grep -q "Microsoft Edge Canary" "extensions/edge-canary/dist/manifest.json"; then
        echo "✅ Edge Canary specific naming found"
    else
        echo "⚠️  Edge Canary specific naming not found"
    fi
fi

# Check if Edge Canary is installed
echo ""
echo "=== Edge Canary Installation Check ==="
if [ -d "/Applications/Microsoft Edge Canary.app" ]; then
    echo "✅ Microsoft Edge Canary is installed"
    echo "📂 Ready for manual testing:"
    echo "   1. Open Edge Canary"
    echo "   2. Navigate to edge://extensions"
    echo "   3. Enable Developer mode"
    echo "   4. Click 'Load unpacked'"
    echo "   5. Select: $(pwd)/extensions/edge-canary/dist"
else
    echo "❌ Microsoft Edge Canary not found in /Applications/"
fi

echo ""
echo "=== Extension Directory Contents ==="
echo "📁 $(pwd)/extensions/edge-canary/dist/"
ls -la "extensions/edge-canary/dist/"

echo ""
echo "=== Validation Complete ==="
