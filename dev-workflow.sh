#!/bin/bash

# === SAFE GIT WORKFLOW SCRIPT ===
# Usage: ./dev-workflow.sh <action> [branch-name]

action=$1
branch_name=$2

case $action in
    "start")
        echo "🚀 Starting new feature development..."
        if [ -z "$branch_name" ]; then
            echo "❌ Please provide branch name: ./dev-workflow.sh start feature/my-feature"
            exit 1
        fi
        git pull origin main
        git checkout -b "$branch_name"
        echo "✅ Created and switched to branch: $branch_name"
        ;;
        
    "check")
        echo "🔍 Checking current status..."
        echo "Current branch: $(git branch --show-current)"
        echo "Status:"
        git status --porcelain
        echo "Files to be committed:"
        git diff --cached --name-only
        ;;
        
    "safe-add")
        echo "📁 Safe add mode - select files manually"
        echo "Changed files:"
        git status --porcelain | grep "^ M\|^??" | awk '{print $2}'
        echo "Add files one by one using: git add <filename>"
        ;;
        
    "review")
        echo "👀 Reviewing changes before commit..."
        echo "Files staged for commit:"
        git diff --cached --name-only
        echo "Detailed changes:"
        git diff --cached
        ;;
        
    "safe-commit")
        echo "💾 Safe commit mode..."
        if [ -z "$2" ]; then
            echo "❌ Please provide commit message: ./dev-workflow.sh safe-commit 'feat: add new feature'"
            exit 1
        fi
        
        # Pre-commit checks
        if git diff --cached --name-only | grep -q "node_modules\|\.next\|build\|dist"; then
            echo "❌ Build files or node_modules detected!"
            echo "Staged files:"
            git diff --cached --name-only | grep "node_modules\|\.next\|build\|dist"
            echo "Run: git reset HEAD to unstage all"
            exit 1
        fi
        
        git commit -m "$2"
        echo "✅ Commit successful!"
        ;;
        
    "push")
        current_branch=$(git branch --show-current)
        echo "📤 Pushing branch: $current_branch"
        git push origin "$current_branch"
        echo "✅ Push successful!"
        ;;
        
    "clean")
        echo "🧹 Cleaning staging area..."
        git reset HEAD
        echo "✅ All files unstaged"
        ;;
        
    *)
        echo "🔧 Git Development Workflow Helper"
        echo "Usage:"
        echo "  ./dev-workflow.sh start feature/my-feature  - Start new feature"
        echo "  ./dev-workflow.sh check                     - Check current status"
        echo "  ./dev-workflow.sh safe-add                  - Show files to add manually"
        echo "  ./dev-workflow.sh review                    - Review staged changes"
        echo "  ./dev-workflow.sh safe-commit 'message'     - Commit with validation"
        echo "  ./dev-workflow.sh push                      - Push current branch"
        echo "  ./dev-workflow.sh clean                     - Unstage all files"
        ;;
esac
