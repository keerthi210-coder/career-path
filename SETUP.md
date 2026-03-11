# Setup Commands

## First Time Setup

```bash
cd CareerPathProject
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py load_questions
python manage.py runserver
```

Open: http://127.0.0.1:8000/

## Daily Use

```bash
cd CareerPathProject
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

## Create Admin (Optional)

```bash
python manage.py createsuperuser
```

Admin: http://127.0.0.1:8000/admin/
