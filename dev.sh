#!/bin/bash

# === MERAJUT ASA DEVELOPMENT HELPER ===
# Usage: ./dev.sh <command>

case $1 in
    "start"|"dev")
        echo "🚀 Starting development server..."
        npm run dev
        ;;
        
    "web")
        echo "🌐 Starting web app only..."
        turbo run dev --filter=web
        ;;
        
    "build")
        echo "🏗️ Building all apps..."
        npm run build
        ;;
        
    "build:web")
        echo "🏗️ Building web app..."
        turbo run build --filter=web
        ;;
        
    "test")
        echo "🧪 Running tests..."
        npm run test
        ;;
        
    "lint")
        echo "🧹 Checking code quality..."
        npm run lint
        ;;
        
    "fix")
        echo "🔧 Fixing code issues..."
        npm run lint:fix
        npm run format
        ;;
        
    "clean")
        echo "🧽 Cleaning build artifacts..."
        npm run clean
        rm -rf node_modules apps/*/node_modules packages/*/node_modules
        rm -rf apps/*/.next apps/*/dist packages/*/dist
        echo "✅ Clean complete. Run 'npm install' to reinstall dependencies."
        ;;
        
    "setup")
        echo "📦 Setting up development environment..."
        npm install
        npm run build
        echo "✅ Setup complete. Run './dev.sh start' to begin development."
        ;;
        
    "check")
        echo "🔍 Running full project check..."
        echo "1. Type checking..."
        npm run type-check
        echo "2. Linting..."
        npm run lint
        echo "3. Testing..."
        npm run test
        echo "4. Building..."
        npm run build
        echo "✅ All checks passed!"
        ;;
        
    *)
        echo "🛠️ Merajut ASA Development Helper"
        echo ""
        echo "Available commands:"
        echo "  start, dev    - Start development server for all apps"
        echo "  web          - Start web app only"
        echo "  build        - Build all apps"
        echo "  build:web    - Build web app only"
        echo "  test         - Run all tests"
        echo "  lint         - Check code quality"
        echo "  fix          - Fix linting and formatting issues"
        echo "  clean        - Clean all build artifacts and node_modules"
        echo "  setup        - Setup development environment"
        echo "  check        - Run full project validation"
        echo ""
        echo "Examples:"
        echo "  ./dev.sh start    # Start development"
        echo "  ./dev.sh build    # Build for production"
        echo "  ./dev.sh fix      # Fix code issues"
        ;;
esac
