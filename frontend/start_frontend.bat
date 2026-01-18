@echo off
:start
cls
echo ========================================
echo  React Frontend Server - Auto Restart
echo ========================================
echo  Starting server at http://localhost:3000
echo  Press CTRL+C twice to stop permanently
echo ========================================
echo.

cd /d "%~dp0"
npm start

echo.
echo ========================================
echo  Server stopped! Restarting in 3 seconds...
echo ========================================
timeout /t 3 /nobreak >nul
goto start
