# === PRE-COMMIT VALIDATION SCRIPT ===
# Simpan sebagai .git/hooks/pre-commit dan chmod +x

#!/bin/bash

echo "🔍 Running pre-commit checks..."

# 1. Check for large files
echo "📏 Checking for large files..."
large_files=$(find . -name "*.js" -o -name "*.ts" -o -name "*.json" | xargs ls -la | awk '$5 > 1000000')
if [ ! -z "$large_files" ]; then
    echo "❌ Large files detected:"
    echo "$large_files"
    echo "Please check if these files should be committed."
    exit 1
fi

# 2. Check for node_modules
echo "📦 Checking for node_modules..."
if git diff --cached --name-only | grep -q "node_modules"; then
    echo "❌ node_modules detected in commit!"
    echo "Run: git reset HEAD node_modules/"
    exit 1
fi

# 3. Check for build files
echo "🏗️ Checking for build files..."
if git diff --cached --name-only | grep -E "\.(next|dist|build)/"; then
    echo "❌ Build files detected in commit!"
    echo "These should be in .gitignore"
    exit 1
fi

# 4. Check for secrets
echo "🔐 Checking for potential secrets..."
if git diff --cached | grep -E "(password|secret|key|token)" | grep -v "#"; then
    echo "⚠️ Potential secrets detected!"
    echo "Please review your changes."
fi

# 5. Run linting (if available)
if [ -f "package.json" ] && npm list eslint &>/dev/null; then
    echo "🧹 Running ESLint..."
    npm run lint:check || {
        echo "❌ Linting failed!"
        exit 1
    }
fi

echo "✅ All pre-commit checks passed!"
exit 0
