# Production Deployment Checklist

## Pre-Deployment

### 1. Environment Setup
- [ ] Create `.env` file from `.env.example`
- [ ] Set `DEBUG=False`
- [ ] Generate new `SECRET_KEY` (use `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`)
- [ ] Configure `ALLOWED_HOSTS` with your domain
- [ ] Configure `CORS_ALLOWED_ORIGINS` with your domain
- [ ] Set up Google OAuth credentials (production)
- [ ] Set up database (PostgreSQL recommended)

### 2. Google OAuth Configuration
- [ ] Create production OAuth credentials in Google Cloud Console
- [ ] Add production domain to Authorized JavaScript origins
- [ ] Add production callback URL to Authorized redirect URIs
- [ ] Update `GOOGLE_CLIENT_ID` in `.env`
- [ ] Update `GOOGLE_CLIENT_SECRET` in `.env`
- [ ] Update `GOOGLE_CLIENT_ID` in `login.html` JavaScript

### 3. Database
- [ ] Run migrations: `python manage.py migrate`
- [ ] Create superuser: `python manage.py createsuperuser`
- [ ] Load initial data: `python manage.py load_questions`
- [ ] Set up database backups

### 4. Static Files
- [ ] Run `python manage.py collectstatic`
- [ ] Configure static file serving (Nginx/Apache)
- [ ] Set up CDN for static files (optional)

### 5. Security
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure firewall
- [ ] Set up fail2ban or similar
- [ ] Enable security headers
- [ ] Configure CSRF settings
- [ ] Set secure cookie flags
- [ ] Review CORS settings

## Deployment Steps

### Option 1: Traditional Server (Ubuntu/Debian)

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install dependencies
sudo apt install python3-pip python3-venv nginx postgresql postgresql-contrib -y

# 3. Create project directory
sudo mkdir -p /var/www/personalitypro
sudo chown $USER:$USER /var/www/personalitypro
cd /var/www/personalitypro

# 4. Clone/upload your project
# Upload your files here

# 5. Create virtual environment
python3 -m venv venv
source venv/bin/activate

# 6. Install requirements
pip install -r requirements.txt
pip install gunicorn psycopg2-binary

# 7. Set up PostgreSQL
sudo -u postgres psql
CREATE DATABASE personalitypro;
CREATE USER personalitypro_user WITH PASSWORD 'your_password';
ALTER ROLE personalitypro_user SET client_encoding TO 'utf8';
ALTER ROLE personalitypro_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE personalitypro_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE personalitypro TO personalitypro_user;
\q

# 8. Configure .env file
nano .env
# Add all production settings

# 9. Run migrations
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser

# 10. Test Gunicorn
gunicorn personalitypro.wsgi:application --bind 0.0.0.0:8000

# 11. Create Gunicorn systemd service
sudo nano /etc/systemd/system/gunicorn.service
```

**Gunicorn Service File:**
```ini
[Unit]
Description=gunicorn daemon for PersonalityPro
After=network.target

[Service]
User=your_user
Group=www-data
WorkingDirectory=/var/www/personalitypro
Environment="PATH=/var/www/personalitypro/venv/bin"
ExecStart=/var/www/personalitypro/venv/bin/gunicorn \
          --workers 3 \
          --bind unix:/var/www/personalitypro/gunicorn.sock \
          personalitypro.wsgi:application

[Install]
WantedBy=multi-user.target
```

```bash
# 12. Start Gunicorn
sudo systemctl start gunicorn
sudo systemctl enable gunicorn

# 13. Configure Nginx
sudo nano /etc/nginx/sites-available/personalitypro
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location = /favicon.ico { access_log off; log_not_found off; }
    
    location /static/ {
        alias /var/www/personalitypro/staticfiles/;
    }

    location /media/ {
        alias /var/www/personalitypro/media/;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/var/www/personalitypro/gunicorn.sock;
    }
}
```

```bash
# 14. Enable Nginx site
sudo ln -s /etc/nginx/sites-available/personalitypro /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx

# 15. Set up SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Option 2: Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "personalitypro.wsgi:application", "--bind", "0.0.0.0:8000"]
```

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=personalitypro
      - POSTGRES_USER=personalitypro_user
      - POSTGRES_PASSWORD=your_password
    
  web:
    build: .
    command: gunicorn personalitypro.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - .:/app
      - static_volume:/app/staticfiles
    ports:
      - "8000:8000"
    env_file:
      - .env
    depends_on:
      - db

  nginx:
    image: nginx:latest
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - static_volume:/app/staticfiles
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - web

volumes:
  postgres_data:
  static_volume:
```

### Option 3: Cloud Platforms

#### Heroku
```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create personalitypro

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set SECRET_KEY='your-secret-key'
heroku config:set DEBUG=False
heroku config:set GOOGLE_CLIENT_ID='your-client-id'
heroku config:set GOOGLE_CLIENT_SECRET='your-secret'

# Deploy
git push heroku main

# Run migrations
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```

#### AWS (Elastic Beanstalk)
```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p python-3.11 personalitypro

# Create environment
eb create personalitypro-env

# Deploy
eb deploy

# Set environment variables
eb setenv SECRET_KEY='your-secret-key' DEBUG=False
```

## Post-Deployment

### 1. Testing
- [ ] Test Google OAuth login
- [ ] Test assessment flow
- [ ] Test premium features
- [ ] Test all pages load correctly
- [ ] Test mobile responsiveness
- [ ] Check SSL certificate
- [ ] Test error pages (404, 500)

### 2. Monitoring
- [ ] Set up application monitoring (Sentry, New Relic)
- [ ] Set up server monitoring (Datadog, Prometheus)
- [ ] Configure log aggregation
- [ ] Set up uptime monitoring
- [ ] Configure alerts

### 3. Backups
- [ ] Set up automated database backups
- [ ] Test backup restoration
- [ ] Set up media files backup
- [ ] Document backup procedures

### 4. Performance
- [ ] Enable caching (Redis/Memcached)
- [ ] Configure CDN for static files
- [ ] Optimize database queries
- [ ] Set up database connection pooling
- [ ] Enable gzip compression

### 5. Documentation
- [ ] Document deployment process
- [ ] Document environment variables
- [ ] Create runbook for common issues
- [ ] Document backup/restore procedures

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review logs weekly
- Test backups monthly
- Security audit quarterly
- Performance review quarterly

### Emergency Procedures
1. **Site Down**: Check Gunicorn/Nginx status, review logs
2. **Database Issues**: Check connections, review slow queries
3. **High Traffic**: Scale workers, enable caching
4. **Security Breach**: Rotate secrets, review access logs

## Support Contacts
- Hosting Provider: [contact info]
- Domain Registrar: [contact info]
- SSL Certificate: [contact info]
- Database: [contact info]
