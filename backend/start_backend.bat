@echo off
:start
cls
echo ========================================
echo  Django Backend Server - Auto Restart
echo ========================================
echo  Starting server at http://localhost:8000
echo  Press CTRL+C twice to stop permanently
echo ========================================
echo.

cd /d "%~dp0"
venv\Scripts\python.exe manage.py runserver

echo.
echo ========================================
echo  Server stopped! Restarting in 3 seconds...
echo ========================================
timeout /t 3 /nobreak >nul
goto start
