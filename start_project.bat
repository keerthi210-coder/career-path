@echo off
echo ========================================
echo PersonalityPro Django Setup
echo ========================================
echo.

echo Step 1: Installing dependencies...
pip install -r requirements.txt
echo.

echo Step 2: Running migrations...
python manage.py makemigrations
python manage.py migrate
echo.

echo Step 3: Loading MBTI questions...
python manage.py load_questions
echo.

echo Step 4: Testing setup...
python test_setup.py
echo.

echo Step 5: Creating superuser (optional)...
echo You can skip this by pressing Ctrl+C
python manage.py createsuperuser
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Starting Django development server...
echo Access your app at: http://localhost:8000/index.html
echo Admin panel at: http://localhost:8000/admin
echo.
python manage.py runserver 8000
