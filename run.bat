@echo off
echo [1/2] Building project...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed! Stopping.
    pause
    exit /b %errorlevel%
)
echo ✅ Build successful!
echo.
echo [2/2] Starting dev server...
call npm run dev
