# Google Authentication Setup Guide - Production Ready

## Overview
This guide will help you set up Google OAuth 2.0 authentication for PersonalityPro in a production-ready manner.

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "PersonalityPro" (or your preferred name)
4. Click "Create"

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" (for public users)
3. Click "Create"

### Fill in the required information:

**App Information:**
- App name: `PersonalityPro`
- User support email: `your-email@example.com`
- App logo: Upload your logo (optional but recommended)

**App Domain:**
- Application home page: `https://yourdomain.com`
- Application privacy policy link: `https://yourdomain.com/privacy`
- Application terms of service link: `https://yourdomain.com/terms`

**Authorized domains:**
- Add your production domain: `yourdomain.com`
- For development: `localhost` (will be added in credentials)

**Developer contact information:**
- Email addresses: `your-email@example.com`

4. Click "Save and Continue"

### Scopes:
1. Click "Add or Remove Scopes"
2. Select these scopes:
   - `userinfo.email`
   - `userinfo.profile`
   - `openid`
3. Click "Update" → "Save and Continue"

### Test Users (for development):
1. Add test user emails (your email and team members)
2. Click "Save and Continue"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Select "Web application"

**Configure:**
- Name: `PersonalityPro Web Client`

**Authorized JavaScript origins:**
- Development: `http://localhost:8000`
- Development: `http://127.0.0.1:8000`
- Production: `https://yourdomain.com`

**Authorized redirect URIs:**
- Development: `http://localhost:8000/login/`
- Development: `http://127.0.0.1:8000/login/`
- Development: `http://localhost:8000/`
- Development: `http://127.0.0.1:8000/`
- Production: `https://yourdomain.com/login/`
- Production: `https://yourdomain.com/`

4. Click "Create"
5. **IMPORTANT:** Copy your Client ID and Client Secret

### Current Development Configuration:
- **Client ID**: `YOUR_GOOGLE_CLIENT_ID_HERE`
- **Client Secret**: `YOUR_GOOGLE_CLIENT_SECRET_HERE`
- **Authorized Origins**: `http://127.0.0.1:8000`, `http://localhost:8000`
- **Redirect URIs**: `http://127.0.0.1:8000/login/`, `http://localhost:8000/login/`, etc.

## Step 5: Environment Variables Setup

Create a `.env` file in your project root:

```env
# Django Settings
SECRET_KEY=your-django-secret-key-here
DEBUG=True

# Google OAuth Settings (Current Development Configuration)
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE

# Production Settings (set DEBUG=False in production)
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com
CORS_ALLOWED_ORIGINS=http://localhost:8000,http://127.0.0.1:8000,https://yourdomain.com

# Database (for production)
DATABASE_URL=postgresql://user:password@localhost/dbname
```

**SECURITY NOTES:**
- Never commit `.env` file to Git
- Add `.env` to your `.gitignore`
- Use different credentials for development and production
- Rotate secrets regularly

## Step 6: Install Required Packages

```bash
pip install python-decouple google-auth google-auth-oauthlib google-auth-httplib2
pip freeze > requirements.txt
```

## Step 7: Update Django Settings

The settings will be updated in `personalitypro/settings.py` to use environment variables.

## Step 8: Frontend Integration

The login page will use the Google Sign-In JavaScript library with proper error handling and security.

## Step 9: Testing

### Development Testing:
1. Start Django server: `python manage.py runserver`
2. Go to `http://127.0.0.1:8000/login/`
3. Click "Continue with Google"
4. Test with your test user account (must be added in Google Cloud Console)
5. Should redirect to assessment page after successful login

### Production Testing:
1. Deploy to your production server
2. Update OAuth credentials with production URLs
3. Test with real users
4. Monitor for errors

## Step 10: Production Deployment Checklist

- [ ] Set `DEBUG=False` in production
- [ ] Use HTTPS (SSL certificate)
- [ ] Update `ALLOWED_HOSTS` with your domain
- [ ] Update `CORS_ALLOWED_ORIGINS` with your domain
- [ ] Use production database (PostgreSQL recommended)
- [ ] Set up proper logging
- [ ] Enable CSRF protection
- [ ] Set secure cookie settings
- [ ] Implement rate limiting
- [ ] Set up monitoring and alerts
- [ ] Backup database regularly
- [ ] Document API endpoints

## Security Best Practices

1. **Use HTTPS in Production** - Always use SSL/TLS
2. **Validate Tokens** - Always verify Google tokens on the backend
3. **Secure Sessions** - Use secure, httpOnly cookies
4. **Rate Limiting** - Implement rate limiting on auth endpoints
5. **CSRF Protection** - Enable Django CSRF protection
6. **Input Validation** - Validate all user inputs
7. **Error Handling** - Don't expose sensitive info in errors
8. **Logging** - Log authentication attempts and failures
9. **Token Expiry** - Implement proper token expiration
10. **Regular Updates** - Keep dependencies updated

## Troubleshooting

### Common Issues:

**"redirect_uri_mismatch" error:**
- Check that redirect URI in code matches Google Console exactly
- Include protocol (http/https)
- No trailing slashes

**"Access blocked" error:**
- Add user to test users in OAuth consent screen
- Or publish your app (requires verification for production)

**CORS errors:**
- Check `CORS_ALLOWED_ORIGINS` in settings
- Verify domain is added to Google Console

**Token validation fails:**
- Check Client ID matches
- Verify token hasn't expired
- Check server time is synchronized

## Support

For issues:
1. Check Django logs: `python manage.py runserver` output
2. Check browser console for JavaScript errors
3. Review Google Cloud Console logs
4. Check Django error logs in production

## Next Steps

After setup:
1. Test thoroughly in development
2. Set up staging environment
3. Deploy to production
4. Monitor authentication metrics
5. Implement additional security measures
6. Set up user analytics
