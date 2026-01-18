"""
Django Settings for Hostel Inventory Project
============================================

This file contains all configuration for the Django backend:
- Database settings (MySQL)
- Installed apps and middleware
- CORS and CSRF settings for React frontend
- Session authentication configuration
- Email settings for password reset
"""

from pathlib import Path

# =============================================================================
# Core Settings
# =============================================================================

# BASE_DIR points to the backend folder
BASE_DIR = Path(__file__).resolve().parent.parent

# SECRET_KEY - Keep this secret in production!
SECRET_KEY = 'django-insecure-your-secret-key-change-this-in-production'

# DEBUG - Set to False in production
DEBUG = True

# ALLOWED_HOSTS - Add your domain/IP here in production
ALLOWED_HOSTS = ['*']


# =============================================================================
# Application Definition
# =============================================================================

INSTALLED_APPS = [
    'django.contrib.contenttypes',   # Content type system (required)
    'django.contrib.sessions',       # Session system
    'django.contrib.staticfiles',    # Static files
    
    # Third-party apps
    'rest_framework',                # REST API framework
    'corsheaders',                   # CORS headers
    
    # Our custom apps
    'users',                         # User management
    'assets',                        # Asset management
    'rooms',                         # Room management
    'dashboard',                     # Dashboard
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',  # Manages user sessions
    'corsheaders.middleware.CorsMiddleware',  # Allows frontend to call backend
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',  # Security: protects against CSRF attacks
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'hostel_inventory.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
            ],
        },
    },
]

WSGI_APPLICATION = 'hostel_inventory.wsgi.application'


# =============================================================================
# Database Configuration (MySQL via Laragon)
# =============================================================================

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'hostel_inventory_db',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}


# =============================================================================
# Password Validation
# =============================================================================

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# =============================================================================
# Internationalization
# =============================================================================

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# =============================================================================
# Static Files
# =============================================================================

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# =============================================================================
# REST Framework Configuration
# =============================================================================

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [],
    'UNAUTHENTICATED_USER': None,
}


# =============================================================================
# CORS Configuration (Cross-Origin Resource Sharing)
# Allows React frontend (port 3000) to communicate with Django backend
# =============================================================================

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
]

CORS_ALLOW_CREDENTIALS = True


# =============================================================================
# CSRF Configuration (Cross-Site Request Forgery Protection)
# =============================================================================

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
]

CSRF_COOKIE_HTTPONLY = False


# =============================================================================
# Session Configuration (User Authentication)
# =============================================================================

SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_COOKIE_AGE = 86400  # 24 hours
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
SESSION_SAVE_EVERY_REQUEST = True


# =============================================================================
# Email Configuration (Gmail SMTP for Password Reset)
# =============================================================================

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'preciousprotector000@gmail.com'
EMAIL_HOST_PASSWORD = 'mjmohswkpcjticva'
DEFAULT_FROM_EMAIL = 'Hostel Inventory <preciousprotector000@gmail.com>'
