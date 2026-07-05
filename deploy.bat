@echo off
title Portfolio Deployer
echo ============================================================
echo      Deploying Shuveta Jovi Portfolio to GitHub
echo ============================================================
echo.

:: Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in your PATH.
    echo Please install Git from https://git-scm.com and try again.
    echo.
    pause
    exit /b
)

:: Init repo
echo [1/4] Initialising local Git repository...
if not exist .git (
    git init
) else (
    echo Git repository already initialised.
)
echo.

:: Add files
echo [2/4] Staging files...
git add .
echo.

:: Commit
echo [3/4] Creating initial commit...
git commit -m "feat: initial commit of premium portfolio"
git branch -M main
echo.

:: Add remote and push
echo [4/4] Linking remote repository and pushing...
:: Remove origin if it exists already
git remote remove origin >nul 2>nul
git remote add origin https://github.com/shuvetajovia/Portfolio.git
git push -u origin main

echo.
echo ============================================================
echo SUCCESS: Code has been pushed to GitHub!
echo.
echo NEXT STEP:
echo 1. Open your browser to https://github.com/shuvetajovia/Portfolio/settings/pages
echo 2. Set 'Source' to 'Deploy from a branch'
echo 3. Set 'Branch' to 'main' and folder to '/ (root)'
echo 4. Click 'Save'
echo.
echo Your portfolio will be live at: https://shuvetajovia.github.io/Portfolio/
echo ============================================================
echo.
pause
