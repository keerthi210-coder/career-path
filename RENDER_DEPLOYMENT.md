# Render Deployment Guide

## Quick Setup

### Start Command for Render
```bash
gunicorn CareerPathProject.wsgi:application --bind 0.0.0.0:$PORT
```

### Build Command for Render
```bash
pip install -r requirements.txt && python CareerPathProject/manage.py collectstatic --noinput && python CareerPathProject/manage.py migrate
```

---

## Step-by-Step Deployment

### 1. Connect GitHub Repository
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Select "Build and deploy from a Git repository"
4. Connect your GitHub account
5. Select `keerthi210-coder/career-path` repository
6. Click "Connect"

### 2. Configure Web Service

**Basic Settings:**
- **Name**: `career-path` (or your preferred name)
- **Environment**: `Python 3`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Build Command**: 
  ```bash
  pip install -r requirements.txt && python CareerPathProject/manage.py collectstatic --noinput && python CareerPathProject/manage.py migrate
  ```
- **Start Command**: 
  ```bash
  gunicorn CareerPathProject.wsgi:application --bind 0.0.0.0:$PORT
  ```

### 3. Set Environment Variables

Click "Advanced" and add these environment variables:

| Key | Value | Notes |
|-----|-------|-------|
| `DEBUG` | `False` | Always False in production |
| `SECRET_KEY` | Generate new | Use a strong random key |
| `ALLOWED_HOSTS` | `your-app.onrender.com` | Replace with your Render URL |
| `GOOGLE_CLIENT_ID` | Your Client ID | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Your Secret | From Google Cloud Console |
| `CORS_ALLOWED_ORIGINS` | `https://your-app.onrender.com` | Your production URL |
| `DATABASE_URL` | PostgreSQL URL | If using PostgreSQL (optional) |

### 4. Database Setup

**Option A: SQLite (Simple, Free)**
- Works out of the box
- Limited to single instance
- Good for testing

**Option B: PostgreSQL (Recommended)**
1. Create PostgreSQL database on Render
2. Copy connection string
3. Add as `DATABASE_URL` environment variable
4. Update `settings.py` to use PostgreSQL

### 5. Deploy

1. Click "Create Web Service"
2. Render will automatically deploy
3. Monitor logs in the dashboard
4. Once deployed, you'll get a URL like: `https://career-path.onrender.com`

---

## Environment Variables Setup

### Required Variables

```env
DEBUG=False
SECRET_KEY=your-very-secure-random-key-here
ALLOWED_HOSTS=career-path.onrender.com
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
CORS_ALLOWED_ORIGINS=https://career-path.onrender.com
```

### Generate Secure SECRET_KEY

```python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

Or use Python:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

## Update Google OAuth for Production

### 1. Update Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Edit your OAuth 2.0 Client ID
3. Add authorized origins:
   - `https://career-path.onrender.com` (replace with your URL)
4. Add authorized redirect URIs:
   - `https://career-path.onrender.com/login/`
   - `https://career-path.onrender.com/`

### 2. Update Frontend

Update `GOOGLE_CLIENT_ID` in:
- `CareerPathProject/assessment/templates/assessment/login.html` (line 89)

Replace with your production Client ID.

---

## Database Configuration

### Using PostgreSQL (Recommended)

1. Create PostgreSQL database on Render
2. Copy the connection string
3. Add to environment variables as `DATABASE_URL`
4. Update `settings.py`:

```python
import dj_database_url

if not DEBUG:
    DATABASES = {
        'default': dj_database_url.config(
            default='sqlite:///db.sqlite3',
            conn_max_age=600
        )
    }
```

5. Add `dj-database-url` to requirements.txt

---

## Static Files Configuration

Whitenoise is already configured to serve static files. Make sure:

1. `STATIC_ROOT = BASE_DIR / 'staticfiles'` in settings.py ✓
2. `whitenoise.middleware.WhiteNoiseMiddleware` in MIDDLEWARE ✓
3. Build command includes `collectstatic` ✓

---

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify all dependencies in `requirements.txt`
- Ensure `manage.py` path is correct

### Application Won't Start
- Check start command syntax
- Verify environment variables are set
- Check application logs

### Static Files Not Loading
- Run `python manage.py collectstatic` locally
- Verify `STATIC_ROOT` path
- Check Whitenoise middleware is installed

### Database Errors
- Verify `DATABASE_URL` is correct
- Run migrations: included in build command
- Check database credentials

### Google OAuth Not Working
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Check authorized origins in Google Cloud Console
- Verify redirect URIs match exactly
- Check CORS settings

---

## Monitoring & Logs

1. Go to Render Dashboard
2. Select your service
3. Click "Logs" tab
4. View real-time logs
5. Check for errors and warnings

---

## Scaling & Performance

### Free Tier Limitations
- Spins down after 15 minutes of inactivity
- Limited resources
- Good for development/testing

### Paid Tier Benefits
- Always running
- More resources
- Better performance
- Custom domains

---

## Custom Domain

1. Go to service settings
2. Click "Custom Domain"
3. Add your domain
4. Update DNS records as instructed
5. Update Google OAuth settings with new domain

---

## Backup & Recovery

### Database Backup
- PostgreSQL: Use Render's backup feature
- SQLite: Download from Render file system

### Code Backup
- GitHub repository is your backup
- All code is version controlled

---

## Security Checklist

- [ ] `DEBUG=False` in production
- [ ] Strong `SECRET_KEY` generated
- [ ] HTTPS enabled (automatic on Render)
- [ ] Google OAuth credentials updated
- [ ] ALLOWED_HOSTS configured
- [ ] CORS_ALLOWED_ORIGINS set correctly
- [ ] Database credentials secure
- [ ] Environment variables not in code
- [ ] `.env` file in `.gitignore`

---

## Deployment Commands Reference

**Build Command:**
```bash
pip install -r requirements.txt && python CareerPathProject/manage.py collectstatic --noinput && python CareerPathProject/manage.py migrate
```

**Start Command:**
```bash
gunicorn CareerPathProject.wsgi:application --bind 0.0.0.0:$PORT
```

---

## Next Steps

1. Deploy to Render
2. Test all features
3. Monitor logs
4. Set up custom domain
5. Configure backups
6. Monitor performance

---

## Support

For issues:
- Check Render documentation: https://render.com/docs
- Review Django deployment guide: https://docs.djangoproject.com/en/4.2/howto/deployment/
- Check application logs in Render dashboard

---

**Last Updated**: March 11, 2026
**Version**: 1.0.0

