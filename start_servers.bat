@echo off
title Hostel Inventory - Servers

echo ========================================
echo  Starting Hostel Inventory Servers
echo ========================================
echo.

REM Start Django backend in new window
start "Django Backend" cmd /k "cd /d "%~dp0backend" && venv\Scripts\python.exe manage.py runserver"

REM Wait 3 seconds for backend to start
timeout /t 3 /nobreak >nul

REM Start React frontend in new window
start "React Frontend" cmd /k "cd /d "%~dp0frontend" && npm start"

echo.
echo ========================================
echo  Servers Started!
echo ========================================
echo  Backend: http://localhost:8000
echo  Frontend: http://localhost:3000
echo ========================================
echo.
echo Press any key to close this window...
pause >nul
