# 📁 PROJECT FILE LISTING
## Complete list of all files in the project

---

## 📦 Root Directory Files

```
c:\laragon\www\Hostel Inventory\
├── README.md                    # Main project documentation
├── QUICK_START.md              # 5-minute setup guide
├── PROJECT_SUMMARY.md          # Detailed learning guide & concepts
├── VIDEO_SCRIPT.md             # Script for demo/presentation
├── API_TESTING.md              # How to test backend APIs
├── TROUBLESHOOTING.md          # Common errors and solutions
└── .gitignore                  # Git ignore file
```

---

## 🔧 Backend Files (Django)

### Main Project Folder
```
backend/hostel_inventory/
├── __init__.py                 # Package marker
├── settings.py                 # Django configuration (DATABASE, CORS, APPS)
├── urls.py                     # Main URL router
├── wsgi.py                     # WSGI config for deployment
└── asgi.py                     # ASGI config for async
```

**Key Settings in settings.py:**
- Database: MySQL configuration
- Installed Apps: Django apps and DRF
- CORS: Frontend-backend communication
- REST Framework: Authentication settings

---

### Users App (Authentication & Profiles)
```
backend/users/
├── __init__.py
├── apps.py                     # App configuration
├── models.py                   # UserProfile model (role, phone_number)
├── signals.py                  # Auto-assign Warden to first user
├── serializers.py              # User, UserProfile, Register serializers
├── views.py                    # Auth APIs (login, register, logout)
├── urls.py                     # User-related URL routes
└── admin.py                    # Django admin configuration
```

**Models:**
- `UserProfile` - Extends Django User with role field

**APIs:**
- POST /api/users/register/ - Register new user
- POST /api/users/login/ - Login
- POST /api/users/logout/ - Logout
- GET /api/users/me/ - Current user info
- PUT /api/users/profile/update/ - Update profile
- POST /api/users/create-user/ - Warden creates users
- GET /api/users/list/ - List all users (Warden only)

---

### Assets App (Asset Management)
```
backend/assets/
├── __init__.py
├── apps.py
├── models.py                   # Asset model (name, type, quantity, condition)
├── serializers.py              # AssetSerializer with validation
├── views.py                    # Asset CRUD APIs + mark_damaged
├── urls.py                     # Asset URL routes
└── admin.py                    # Asset admin interface
```

**Models:**
- `Asset` - Represents physical assets (beds, tables, etc.)

**APIs:**
- GET /api/assets/ - List all assets
- POST /api/assets/ - Create asset
- GET /api/assets/{id}/ - Get single asset
- PUT /api/assets/{id}/ - Update asset
- DELETE /api/assets/{id}/ - Delete asset
- POST /api/assets/{id}/mark_damaged/ - Increase damaged count
- GET /api/assets/by_condition/ - Filter by condition
- GET /api/assets/summary/ - Asset statistics

---

### Rooms App (Room Management)
```
backend/rooms/
├── __init__.py
├── apps.py
├── models.py                   # Room model (room_number, hostel_name)
├── serializers.py              # RoomSerializer with asset_count
├── views.py                    # Room CRUD APIs
├── urls.py                     # Room URL routes
└── admin.py                    # Room admin interface
```

**Models:**
- `Room` - Represents hostel rooms

**APIs:**
- GET /api/rooms/ - List all rooms
- POST /api/rooms/ - Create room
- GET /api/rooms/{id}/ - Get single room
- PUT /api/rooms/{id}/ - Update room
- DELETE /api/rooms/{id}/ - Delete room
- GET /api/rooms/by_hostel/ - Filter by hostel
- GET /api/rooms/{id}/assets/ - Get assets in room

---

### Dashboard App (Summary Statistics)
```
backend/dashboard/
├── __init__.py
├── apps.py
├── views.py                    # Summary statistics API
├── urls.py                     # Dashboard URL routes
└── admin.py                    # Admin stub
```

**APIs:**
- GET /api/dashboard/summary/ - System statistics

---

### Other Backend Files
```
backend/
├── manage.py                   # Django management script
└── requirements.txt            # Python dependencies
```

**Requirements.txt includes:**
- Django 4.2.7
- djangorestframework 3.14.0
- mysqlclient 2.2.0
- django-cors-headers 4.3.0
- djangorestframework-simplejwt 5.3.0

---

## ⚛️ Frontend Files (React)

### Public Files
```
frontend/public/
└── index.html                  # HTML template
```

---

### Source Files
```
frontend/src/
├── index.js                    # React entry point
├── index.css                   # Global styles
├── App.js                      # Main component with routing
└── services/
    └── api.js                  # All backend API calls
```

**api.js Functions:**
- Authentication: register, login, logout, getCurrentUser
- User Management: updateProfile, createUser, listUsers
- Assets: getAssets, createAsset, updateAsset, deleteAsset, markAssetDamaged
- Rooms: getRooms, createRoom, updateRoom, deleteRoom
- Dashboard: getDashboardSummary

---

### React Pages
```
frontend/src/pages/
├── SignIn.js                   # Login page
├── SignUp.js                   # Registration page
├── Dashboard.js                # Summary statistics page
├── Assets.js                   # Asset management (CRUD + mark damaged)
├── Rooms.js                    # Room management (CRUD)
└── Profile.js                  # User profile + create users (Warden)
```

**Each Page Features:**
- **SignIn.js:** Login form, calls login API, redirects to dashboard
- **SignUp.js:** Registration form, first user becomes Warden
- **Dashboard.js:** Shows statistics cards, navigation buttons
- **Assets.js:** Asset table, add/edit/delete forms, mark damaged button
- **Rooms.js:** Room table, add/edit/delete forms
- **Profile.js:** User info display, phone update, Warden creates users

---

### Other Frontend Files
```
frontend/
└── package.json                # Node.js dependencies and scripts
```

**Package.json includes:**
- react ^18.2.0
- react-dom ^18.2.0
- react-router-dom ^6.20.0
- axios ^1.6.2
- react-scripts 5.0.1

---

## 📊 File Statistics

### Total Files Created: **39 files**

**Backend:** 26 files
- Python files: 22
- Config files: 4

**Frontend:** 13 files
- JavaScript files: 8
- Config files: 2
- HTML/CSS: 2
- Documentation: 1

**Documentation:** 7 files
- README.md
- QUICK_START.md
- PROJECT_SUMMARY.md
- VIDEO_SCRIPT.md
- API_TESTING.md
- TROUBLESHOOTING.md
- FILE_LISTING.md (this file)

---

## 🎯 Key Files to Understand

If you're new to the project, start with these files:

### For Understanding Backend:
1. **backend/hostel_inventory/settings.py** - Configuration
2. **backend/users/models.py** - User model with ORM explanation
3. **backend/assets/models.py** - Asset model example
4. **backend/assets/views.py** - API view example
5. **backend/assets/serializers.py** - Serializer example

### For Understanding Frontend:
1. **frontend/src/App.js** - Main app structure
2. **frontend/src/services/api.js** - API communication
3. **frontend/src/pages/Dashboard.js** - Simple page example
4. **frontend/src/pages/Assets.js** - Complex CRUD example

### For Setup:
1. **README.md** - Main documentation
2. **QUICK_START.md** - Setup steps
3. **requirements.txt** - Python packages
4. **package.json** - Node packages

---

## 🔍 File Dependencies

### Backend Dependencies
```
manage.py
    ↓
hostel_inventory/settings.py (loads all apps)
    ↓
users/, assets/, rooms/, dashboard/ (apps)
    ↓
models.py → serializers.py → views.py → urls.py
```

### Frontend Dependencies
```
index.js
    ↓
App.js (routing)
    ↓
pages/*.js (individual pages)
    ↓
services/api.js (API calls)
```

---

## 📝 Files That Reference Each Other

### Backend Cross-References:
- **hostel_inventory/urls.py** → includes all app urls.py
- **hostel_inventory/settings.py** → lists all apps in INSTALLED_APPS
- **assets/models.py** → references rooms.Room (ForeignKey)
- **users/apps.py** → imports users.signals

### Frontend Cross-References:
- **App.js** → imports all pages from pages/
- **All pages** → import api functions from services/api.js
- **All pages** → use react-router-dom for navigation

---

## 🎨 Code Style Consistency

### Backend (Python):
- **Classes:** PascalCase (`UserProfile`, `AssetSerializer`)
- **Functions:** snake_case (`create_user_view`, `get_assets`)
- **Files:** snake_case (`models.py`, `serializers.py`)
- **Docstrings:** Triple quotes with clear explanations

### Frontend (JavaScript):
- **Components:** PascalCase (`SignIn`, `Dashboard`)
- **Functions:** camelCase (`fetchAssets`, `handleSubmit`)
- **Files:** PascalCase for components (`SignIn.js`)
- **Comments:** // Single line, /* */ Multi-line

---

## 🔐 Security Considerations

### Files with Sensitive Data:
- **settings.py:** SECRET_KEY, DATABASE password
  - ⚠️ Change before deployment
  - Don't commit to public Git

### Files Excluded from Git (.gitignore):
- `__pycache__/` - Python cache
- `*.pyc` - Compiled Python
- `venv/` - Virtual environment
- `node_modules/` - Node packages
- `.env` - Environment variables
- `db.sqlite3` - SQLite database
- `*.log` - Log files

---

## 📦 Deployment Files (Not Created Yet)

For production deployment, you'll need:
- `Procfile` - For Heroku
- `runtime.txt` - Python version
- `Dockerfile` - For Docker
- `.env` - Environment variables
- `nginx.conf` - For Nginx
- `gunicorn.conf.py` - WSGI server config

---

## 🎓 Learning Path Through Files

**Beginner Path:**
1. Read README.md
2. Follow QUICK_START.md
3. Look at models.py files (understand data structure)
4. Look at views.py files (understand APIs)
5. Look at React pages (understand UI)

**Intermediate Path:**
1. Read PROJECT_SUMMARY.md
2. Study serializers.py (data validation)
3. Study api.js (HTTP communication)
4. Experiment with API_TESTING.md
5. Customize features

**Advanced Path:**
1. Study signals.py (event handling)
2. Add new models and relationships
3. Create custom API endpoints
4. Add complex React features
5. Deploy to production

---

## ✅ File Checklist

Before submitting project:
- [ ] All Python files have docstrings
- [ ] All JavaScript files have comments
- [ ] README.md is complete
- [ ] requirements.txt is accurate
- [ ] package.json is accurate
- [ ] .gitignore includes sensitive files
- [ ] No hardcoded passwords
- [ ] All APIs tested
- [ ] All pages work
- [ ] Documentation is clear

---

**File listing complete! 📁✅**
