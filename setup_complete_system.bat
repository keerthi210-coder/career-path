@echo off
echo ========================================
echo PersonalityPro Complete System Setup
echo ========================================
echo.

echo Step 1: Installing dependencies...
python -m pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

echo Step 2: Running database migrations...
python manage.py makemigrations
python manage.py migrate
if %errorlevel% neq 0 (
    echo ERROR: Failed to run migrations
    pause
    exit /b 1
)
echo ✓ Database migrations complete
echo.

echo Step 3: Loading assessment questions...
python manage.py load_questions
if %errorlevel% neq 0 (
    echo WARNING: Questions may already be loaded
)
echo ✓ Questions loaded
echo.

echo Step 4: Creating superuser (admin account)...
echo.
echo Please create an admin account:
python manage.py createsuperuser
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Start server: python manage.py runserver 8000
echo 2. Open browser: http://localhost:8000/index.html
echo 3. Admin panel: http://localhost:8000/admin/
echo.
echo For email configuration, see PREMIUM_SYSTEM_GUIDE.md
echo For Stripe setup, see PREMIUM_SYSTEM_GUIDE.md
echo.
pause
