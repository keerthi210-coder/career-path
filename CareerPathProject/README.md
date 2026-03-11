# PersonalityPro - Career Assessment Platform

A Django-based personality assessment platform that helps users discover their MBTI personality type and get personalized career recommendations.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables
Create a `.env` file in the project root (CareerPath directory):
```env
SECRET_KEY=^azpy5bhih$__fcrk2097^5_e89y=fxlt3uwv-8alx)!zgkrh9
DEBUG=True
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:8000,http://127.0.0.1:8000
```

**Note**: The `.env` file is already configured with development credentials.

### 3. Run Migrations
```bash
python manage.py migrate
```

### 4. Load Questions
```bash
python manage.py load_questions
```

### 5. Start Server
```bash
python manage.py runserver
```

### 6. Access Application
Open: http://127.0.0.1:8000/

---

## 📋 Features

- ✅ Google OAuth Authentication
- ✅ 25-question MBTI personality assessment
- ✅ 16 personality type profiles
- ✅ Personalized career recommendations
- ✅ Beautiful animated UI
- ✅ PDF report generation
- ✅ Premium membership system
- ✅ Responsive design

---

## 🔐 Google OAuth Setup

### 1. Create OAuth Client
1. Go to: https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client ID
3. Application type: Web application

### 2. Configure Origins
**Authorized JavaScript origins:**
```
http://localhost:8000
http://127.0.0.1:8000
```

**Authorized redirect URIs:**
```
http://localhost:8000/login/
http://127.0.0.1:8000/login/
http://localhost:8000/
http://127.0.0.1:8000/
```

### 3. Add Test Users
- Go to OAuth consent screen
- Add your Gmail to test users

### 4. Update Configuration
- Copy Client ID and Secret to `.env` file
- Update `GOOGLE_CLIENT_ID` in `assessment/templates/assessment/login.html` (line 89)
- Restart Django server

### Current Development Configuration:
- **Client ID**: `YOUR_GOOGLE_CLIENT_ID_HERE`
- **Client Secret**: `YOUR_GOOGLE_CLIENT_SECRET_HERE`
- **Status**: Configured for development (localhost and 127.0.0.1)

---

## 📁 Project Structure

```
CareerPathProject/
├── CareerPathProject/          # Django settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── assessment/                 # Main app
│   ├── static/assessment/     # CSS, JS, images
│   ├── templates/assessment/  # HTML templates
│   ├── models.py              # Database models
│   ├── views.py               # View functions
│   ├── urls.py                # URL routing
│   └── auth_views.py          # Authentication
├── manage.py
├── db.sqlite3
└── requirements.txt
```

---

## 🎨 Pages

1. **Homepage** (`/`) - Landing page with features
2. **Login** (`/login/`) - Google OAuth authentication
3. **Assessment** (`/assessment/`) - Assessment hub
4. **Questions** (`/questions/`) - 25 MBTI questions
5. **Loading** (`/loading/`) - Animated results processing
6. **Profile** (`/profile/`) - Personality type profile
7. **Report** (`/report/`) - Detailed assessment report
8. **Personalities** (`/personalities/`) - All 16 types
9. **Premium** (`/premium/`) - Premium features
10. **Resources** (`/resources/`) - Educational content

---

## 🔧 API Endpoints

### Assessment
- `GET /api/questions/` - Get all questions
- `POST /api/submit-assessment/` - Submit answers
- `GET /api/result/<session_id>/` - Get results

### Authentication
- `POST /api/auth/google/` - Google OAuth
- `POST /api/auth/register/` - Register user
- `POST /api/auth/login/` - Login
- `POST /api/auth/logout/` - Logout
- `GET /api/auth/profile/` - Get profile

### Payment
- `POST /api/payment/create-intent/` - Create payment
- `POST /api/payment/confirm/` - Confirm payment
- `GET /api/payment/history/` - Payment history

---

## 🎯 User Flow

1. User visits homepage
2. Clicks "Take Test" → Redirects to login
3. Authenticates with Google
4. Redirects to assessment hub
5. Starts assessment → 25 questions
6. Submits answers
7. Loading animation with progress
8. Views personality profile
9. Downloads detailed report

---

## 🛠️ Development

### Create Superuser
```bash
python manage.py createsuperuser
```

### Access Admin Panel
http://127.0.0.1:8000/admin/

### Run Tests
```bash
python manage.py test
```

### Collect Static Files (Production)
```bash
python manage.py collectstatic
```

---

## 📦 Dependencies

- Django 4.2.7
- djangorestframework
- django-cors-headers
- python-decouple
- google-auth
- stripe (for payments)

---

## 🚀 Production Deployment

### 1. Update Settings
```env
DEBUG=False
ALLOWED_HOSTS=yourdomain.com
SECRET_KEY=generate-new-secure-key
```

### 2. Use PostgreSQL
Update `DATABASES` in settings.py

### 3. Configure HTTPS
- Set up SSL certificate
- Update Google OAuth redirect URIs to HTTPS

### 4. Collect Static Files
```bash
python manage.py collectstatic
```

### 5. Use Production Server
- Gunicorn
- Nginx
- Supervisor

---

## 📝 License

All rights reserved © 2026 PersonalityPro

---

## 🤝 Support

For issues or questions, contact: support@personalitypro.com

---

**Last Updated**: March 5, 2026
**Version**: 1.0.0
**Status**: Production Ready
