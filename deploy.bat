@echo off
echo [1/3] Building the project...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Build failed. Deployment cancelled.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/3] Deploying to Netlify (Prod)...
echo Note: Netlify only uploads changed files to save traffic.
call npx netlify deploy --prod --dir=dist

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Deployment failed.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [3/3] Done! Your site is live.
echo.
pause
