# 🚀 PersonalityPro - Quick Start Guide

## 3 Commands to Get Started

```bash
cd "CareerPath (2)/CareerPath/CareerPathProject"
pip install -r requirements.txt
python manage.py migrate && python manage.py load_questions
python manage.py runserver
```

Then open: **http://127.0.0.1:8000/**

---

## What You Get

✅ Google OAuth 2.0 authentication  
✅ 25 MBTI personality questions  
✅ Dynamic personality calculation  
✅ All 16 personality types with detailed profiles  
✅ Beautiful animated UI with particles  
✅ Detailed PDF reports  
✅ Premium membership system  
✅ Admin panel  
✅ RESTful API  

---

## Project Structure

```
CareerPath/
├── CareerPathProject/          # Main Django project
│   ├── CareerPathProject/      # Django settings
│   ├── assessment/             # Main app (models, views, API)
│   ├── manage.py               # Django CLI
│   └── requirements.txt        # Dependencies
├── .env                        # Environment variables
└── README.md                   # Documentation
```

---

## Key URLs

- **Homepage**: http://127.0.0.1:8000/
- **Login**: http://127.0.0.1:8000/login/
- **Assessment**: http://127.0.0.1:8000/assessment/
- **Admin Panel**: http://127.0.0.1:8000/admin/
- **API Questions**: http://127.0.0.1:8000/api/questions/

---

## API Endpoints

```
GET  /api/questions/              # Get all 25 questions
POST /api/submit-assessment/      # Submit answers
GET  /api/result/<session_id>/    # Get result
GET  /api/personality/<type>/     # Get personality description

POST /api/auth/google/            # Google OAuth login
GET  /api/auth/profile/           # Get user profile
POST /api/payment/create-intent/  # Create payment
```

---

## User Flow

1. **Homepage** → Click "Take Test"
2. **Login Page** → Authenticate with Google
3. **Assessment Hub** → View 25 questions overview
4. **Questions Page** → Answer all 25 questions
5. **Loading Page** → Animated particles and progress
6. **Profile Page** → Personality type reveal
7. **Report Page** → Detailed insights and recommendations

---

## Create Admin User

```bash
cd CareerPathProject
python manage.py createsuperuser
```

Then access admin at: http://127.0.0.1:8000/admin/

---

## Google OAuth Setup

### Current Configuration:
- **Client ID**: `YOUR_GOOGLE_CLIENT_ID_HERE`
- **Origins**: `http://127.0.0.1:8000`, `http://localhost:8000`

### Quick Setup:
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Add your email as test user in OAuth consent screen
3. Verify authorized origins match your local server
4. Try login at http://127.0.0.1:8000/login/

See `GOOGLE_AUTH_SETUP.md` for detailed instructions.

---

## Troubleshooting

**Port busy?**
```bash
python manage.py runserver 8080
```

**Reset database?**
```bash
del db.sqlite3
python manage.py migrate
python manage.py load_questions
```

**Questions not loading?**
- Check Django server is running
- Check browser console for errors
- Verify: http://127.0.0.1:8000/api/questions/

**Google OAuth not working?**
- Add your email as test user in Google Cloud Console
- Wait 5-10 minutes after updating Google settings
- Try in incognito mode
- Check browser console for errors

**Login page shows before assessment?**
- This is intentional - authentication required before assessment

---

## Environment Variables

Create `.env` file in `CareerPath` directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:8000,http://127.0.0.1:8000
```

---

## Tech Stack

- **Backend**: Django 4.2.7
- **API**: Django REST Framework 3.14.0
- **Auth**: Google OAuth 2.0
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Payment**: Stripe (for premium features)

---

## Complete Documentation

- **README.md** - Complete project overview
- **QUICK_START.md** - This file
- **GOOGLE_AUTH_SETUP.md** - OAuth configuration guide
- **PRODUCTION_DEPLOYMENT.md** - Deployment instructions
- **CareerPathProject/README.md** - Detailed documentation

---

## Test the Application

### 1. Test API:
```bash
curl http://127.0.0.1:8000/api/questions/
```

### 2. Test Google Login:
- Open http://127.0.0.1:8000/login/
- Click "Continue with Google"
- Select your Google account

### 3. Take Assessment:
- Complete all 25 questions
- View your personality type
- Download detailed report

---

## Deployment

Ready for deployment to:
- Heroku (easiest)
- AWS Elastic Beanstalk
- Google Cloud Platform
- DigitalOcean
- PythonAnywhere

See `PRODUCTION_DEPLOYMENT.md` for instructions.

---

## Current Status

✅ Server running at http://127.0.0.1:8000/  
✅ Database with 25 questions loaded  
✅ Google OAuth configured (development)  
✅ All pages functional  
✅ API endpoints working  

---

**Need more help?** Read README.md or GOOGLE_AUTH_SETUP.md

**Ready to launch?** 🎉

---

**Last Updated**: March 8, 2026  
**Version**: 1.0.0
