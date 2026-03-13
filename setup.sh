#!/bin/bash

# AI Energy Forecast Platform - Quick Setup Script for macOS/Linux

echo ""
echo "========================================"
echo "AI Energy Forecast Platform"
echo "Quick Setup Script"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.8+ from https://www.python.org"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "Python version:"
python3 --version
echo "Node.js version:"
node --version
echo "npm version:"
npm --version
echo ""

# Backend Setup
echo "========================================"
echo "Setting up Backend..."
echo "========================================"
cd backend

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt -q

# Train model
echo "Training ML model..."
python3 ai_model/train_model.py

echo ""
echo "Backend setup complete!"
echo ""

# Frontend Setup
echo "========================================"
echo "Setting up Frontend..."
echo "========================================"
cd ../frontend

# Install dependencies
echo "Installing Node dependencies..."
npm install --silent

echo ""
echo "Frontend setup complete!"
echo ""

# Instructions
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "To run the application:"
echo ""
echo "1. Backend (in one terminal):"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   uvicorn main:app --reload --port 8000"
echo ""
echo "2. Frontend (in another terminal):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "Then open: http://localhost:5173"
echo ""
echo "API will be available at: http://127.0.0.1:8000"
echo ""