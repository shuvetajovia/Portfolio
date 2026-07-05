@echo off
title Local Portfolio Preview
echo ============================================================
echo      Starting Local Server for Shuveta Jovi Portfolio
echo ============================================================
echo.

:: Try starting Python server
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Python detected. Starting Python HTTP server on port 8000...
    echo.
    echo Opening browser to http://localhost:8000...
    echo Press Ctrl+C in this window to stop the server.
    echo.
    start http://localhost:8000
    python -m http.server 8000
    exit /b
)

:: Try starting Node.js server
where npx >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Node.js (npx) detected. Starting http-server on port 8000...
    echo.
    echo Opening browser to http://localhost:8000...
    echo Press Ctrl+C in this window to stop the server.
    echo.
    start http://localhost:8000
    npx http-server -p 8000
    exit /b
)

:: Fallback: Open index.html directly
echo [WARNING] Neither Python nor Node.js (npx) was found in your PATH.
echo Opening index.html directly in your default browser...
echo.
start index.html
pause
