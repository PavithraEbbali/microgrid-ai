@echo off
REM AI Energy Forecast Platform - Quick Setup Script for Windows

echo.
echo ========================================
echo AI Energy Forecast Platform
echo Quick Setup Script
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo Python version:
python --version
echo Node.js version:
node --version
echo npm version:
npm --version
echo.

REM Backend Setup
echo ========================================
echo Setting up Backend...
echo ========================================
cd backend

REM Create virtual environment
echo Creating virtual environment...
python -m venv venv

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing Python dependencies...
pip install -r requirements.txt --quiet

REM Train model
echo Training ML model...
python ai_model\train_model.py

echo.
echo Backend setup complete!
echo.

REM Frontend Setup
echo ========================================
echo Setting up Frontend...
echo ========================================
cd ..\frontend

REM Install dependencies
echo Installing Node dependencies...
call npm install --silent

echo.
echo Frontend setup complete!
echo.

REM Instructions
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To run the application:
echo.
echo 1. Backend (in one terminal):
echo    cd backend
echo    venv\Scripts\activate
echo    uvicorn main:app --reload --port 8000
echo.
echo 2. Frontend (in another terminal):
echo    cd frontend
echo    npm run dev
echo.
echo Then open: http://localhost:5173
echo.
echo API will be available at: http://127.0.0.1:8000
echo.
pause