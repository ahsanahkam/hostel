# Hostel Inventory and Asset Management System

## 📋 Project Overview

A simple and beginner-friendly **Hostel Inventory and Asset Management System** built for university group projects. This system helps manage hostel assets (beds, tables, cupboards, etc.), rooms, and track asset conditions.

## 🏗️ Architecture

This project follows **MVC (Model-View-Controller)** architecture:

### MVC Explained Simply:
- **Model (M)** → Django ORM Models → Database Tables
  - Represents data structure (User, Asset, Room)
  - Django automatically converts Python classes to MySQL tables
  
- **View (V)** → React Pages → User Interface
  - What users see and interact with
  - Forms, tables, buttons
  
- **Controller (C)** → Django REST APIs → Business Logic
  - Processes requests from frontend
  - Handles data validation and operations
  - Returns JSON responses

### ORM (Object Relational Mapping) Explained:
- **ORM** lets you work with databases using Python objects instead of SQL
- Example:
  ```python
  # Python Code (ORM)
  asset = Asset.objects.create(name="Bed 101", asset_type="Bed")
  
  # Behind the scenes, Django runs this SQL:
  INSERT INTO assets_asset (name, asset_type) VALUES ('Bed 101', 'Bed')
  ```

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Backend Framework | Django 4.2 + Django REST Framework |
| Database | MySQL |
| Frontend Framework | React 18 (Functional Components) |
| HTTP Client | Axios |
| Authentication | Django Session Auth |
| Routing | React Router v6 |

## 👥 User Roles

1. **Warden** (First User)
   - Auto-assigned to the first person who registers
   - Can create Sub-Wardens and Inventory Staff
   - Full system access

2. **Sub-Warden**
   - Created by Warden
   - Can manage assets and rooms

3. **Inventory Staff**
   - Default role for new users
   - Can manage assets and rooms

## ✨ Features

### 1. User Authentication
- **What it does:** Register and login users
- **Model Used:** User (Django built-in) + UserProfile
- **API Endpoints:**
  - `POST /api/users/register/` - Register new user
  - `POST /api/users/login/` - Login user
  - `POST /api/users/logout/` - Logout user
- **React Page:** [SignIn.js](frontend/src/pages/SignIn.js), [SignUp.js](frontend/src/pages/SignUp.js)

### 2. Asset Management
- **What it does:** Add, view, edit, and delete assets (beds, tables, cupboards)
- **Model Used:** Asset
- **API Endpoints:**
  - `GET /api/assets/` - List all assets
  - `POST /api/assets/` - Create new asset
  - `PUT /api/assets/{id}/` - Update asset
  - `DELETE /api/assets/{id}/` - Delete asset
- **React Page:** [Assets.js](frontend/src/pages/Assets.js)

### 3. Asset Inventory Count
- **What it does:** Track total quantity and damaged quantity of assets
- **Model Used:** Asset (fields: total_quantity, damaged_quantity)
- **API Endpoints:**
  - Part of asset endpoints above
- **React Page:** [Assets.js](frontend/src/pages/Assets.js)

### 4. Asset Condition Tracking
- **What it does:** Mark assets as Good or Damaged
- **Model Used:** Asset (field: condition)
- **API Endpoints:**
  - `POST /api/assets/{id}/mark_damaged/` - Mark asset as damaged
- **React Page:** [Assets.js](frontend/src/pages/Assets.js)

### 5. Room Management
- **What it does:** Add, view, edit rooms with room number and hostel name
- **Model Used:** Room
- **API Endpoints:**
  - `GET /api/rooms/` - List all rooms
  - `POST /api/rooms/` - Create new room
  - `PUT /api/rooms/{id}/` - Update room
  - `DELETE /api/rooms/{id}/` - Delete room
- **React Page:** [Rooms.js](frontend/src/pages/Rooms.js)

### 6. Summary Dashboard
- **What it does:** Show total assets, damaged assets, total rooms
- **Models Used:** Asset, Room, User
- **API Endpoints:**
  - `GET /api/dashboard/summary/` - Get system statistics
- **React Page:** [Dashboard.js](frontend/src/pages/Dashboard.js)

### 7. User Profile Management
- **What it does:** View user info, update phone number, Warden creates users
- **Model Used:** User + UserProfile
- **API Endpoints:**
  - `GET /api/users/me/` - Get current user
  - `PUT /api/users/profile/update/` - Update profile
  - `POST /api/users/create-user/` - Warden creates user
  - `GET /api/users/list/` - List all users (Warden only)
- **React Page:** [Profile.js](frontend/src/pages/Profile.js)

## 📁 Project Structure

```
hostel-inventory-system/
├── backend/
│   ├── manage.py                      # Django management script
│   ├── requirements.txt               # Python dependencies
│   ├── hostel_inventory/
│   │   ├── __init__.py
│   │   ├── settings.py               # Django configuration
│   │   ├── urls.py                   # Main URL router
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── users/                        # User management app
│   │   ├── models.py                 # UserProfile model
│   │   ├── serializers.py            # User serializers
│   │   ├── views.py                  # Auth APIs
│   │   ├── urls.py
│   │   ├── signals.py                # Auto-assign Warden role
│   │   └── admin.py
│   ├── assets/                       # Asset management app
│   │   ├── models.py                 # Asset model
│   │   ├── serializers.py            # Asset serializers
│   │   ├── views.py                  # Asset APIs
│   │   ├── urls.py
│   │   └── admin.py
│   ├── rooms/                        # Room management app
│   │   ├── models.py                 # Room model
│   │   ├── serializers.py            # Room serializers
│   │   ├── views.py                  # Room APIs
│   │   ├── urls.py
│   │   └── admin.py
│   └── dashboard/                    # Dashboard app
│       ├── views.py                  # Summary API
│       └── urls.py
├── frontend/
│   ├── package.json                  # Node.js dependencies
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js                  # React entry point
│       ├── App.js                    # Main React component
│       ├── index.css                 # Basic styles
│       ├── services/
│       │   └── api.js                # Backend API calls
│       └── pages/
│           ├── SignIn.js             # Login page
│           ├── SignUp.js             # Registration page
│           ├── Dashboard.js          # Summary dashboard
│           ├── Assets.js             # Asset management
│           ├── Rooms.js              # Room management
│           └── Profile.js            # User profile
└── README.md                         # This file
```

## 🚀 Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL 5.7+
- Laragon (or XAMPP) for MySQL

### Backend Setup

1. **Navigate to backend folder:**
   ```powershell
   cd "c:\laragon\www\Hostel Inventory\backend"
   ```

2. **Create virtual environment:**
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```

4. **Create MySQL database:**
   ```sql
   -- Open MySQL in Laragon
   CREATE DATABASE hostel_inventory_db;
   ```

5. **Update database settings:**
   - Open `hostel_inventory/settings.py`
   - Update MySQL password if needed (default is empty for Laragon)

6. **Run migrations (create database tables):**
   ```powershell
   python manage.py makemigrations
   python manage.py migrate
   ```

7. **Create admin user (optional):**
   ```powershell
   python manage.py createsuperuser
   ```

8. **Run development server:**
   ```powershell
   python manage.py runserver
   ```
   Backend will run at: `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend folder (NEW TERMINAL):**
   ```powershell
   cd "c:\laragon\www\Hostel Inventory\frontend"
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Start development server:**
   ```powershell
   npm start
   ```
   Frontend will open at: `http://localhost:3000`

## 📝 How to Use

### First Time Setup

1. **Start Backend:** `python manage.py runserver` (in backend folder)
2. **Start Frontend:** `npm start` (in frontend folder)
3. **Open Browser:** Go to `http://localhost:3000`

### User Registration

1. Click "Sign Up"
2. Fill in details (username, email, password)
3. **First user becomes Warden automatically**
4. Other users get "Inventory Staff" role by default

### Login

1. Click "Sign In"
2. Enter username and password
3. You'll be redirected to Dashboard

### Managing Assets

1. Go to Dashboard → Click "Manage Assets"
2. Click "Add New Asset"
3. Fill in: Name, Type, Quantity, Condition, Room
4. Click "Create Asset"
5. To mark damaged: Click "Mark Damaged" button
6. To edit: Click "Edit" button
7. To delete: Click "Delete" button

### Managing Rooms

1. Go to Dashboard → Click "Manage Rooms"
2. Click "Add New Room"
3. Fill in: Room Number, Hostel Name, Floor, Capacity
4. Click "Create Room"

### Warden Creates Users

1. Login as Warden
2. Go to "My Profile"
3. Click "Create New User"
4. Fill in details and select role (Sub-Warden or Inventory Staff)
5. Click "Create User"

## 🎥 Video Explanation - Feature Walkthrough

### Feature 1: User Authentication (Login & Register)
**What it does:** Allows users to create accounts and login  
**Model:** User (Django built-in) + UserProfile  
**API:** POST /api/users/register/, POST /api/users/login/  
**Page:** SignIn.js, SignUp.js

### Feature 2: Asset Management
**What it does:** Add, view, edit, delete assets like beds, tables, cupboards  
**Model:** Asset (fields: name, asset_type, total_quantity, damaged_quantity, condition, room)  
**API:** GET /api/assets/ (list), POST /api/assets/ (create), PUT /api/assets/{id}/ (update)  
**Page:** Assets.js

### Feature 3: Asset Inventory Count
**What it does:** Track how many assets exist and how many are damaged  
**Model:** Asset (total_quantity and damaged_quantity fields)  
**API:** Same as Asset Management  
**Page:** Assets.js (shows both quantities in table)

### Feature 4: Asset Condition Tracking
**What it does:** Mark assets as Good or Damaged  
**Model:** Asset (condition field with choices: Good/Damaged)  
**API:** POST /api/assets/{id}/mark_damaged/  
**Page:** Assets.js (Mark Damaged button)

### Feature 5: Room Management
**What it does:** Add and manage hostel rooms  
**Model:** Room (fields: room_number, hostel_name, floor, capacity)  
**API:** GET /api/rooms/ (list), POST /api/rooms/ (create), PUT /api/rooms/{id}/ (update)  
**Page:** Rooms.js

### Feature 6: Summary Dashboard
**What it does:** Shows system statistics (total assets, damaged, rooms, users)  
**Model:** Uses all models (Asset, Room, User)  
**API:** GET /api/dashboard/summary/  
**Page:** Dashboard.js (shows colored cards with numbers)

### Feature 7: User Profile Management
**What it does:** View user info, update phone, Warden creates other users  
**Model:** User + UserProfile  
**API:** GET /api/users/me/, PUT /api/users/profile/update/, POST /api/users/create-user/  
**Page:** Profile.js

## 🔍 Key Concepts for Presentation

### 1. MVC Architecture
- **Model:** Django models (User, Asset, Room) → Database tables
- **View:** React pages → What users see
- **Controller:** Django REST APIs → Handles requests and logic

### 2. ORM (Object Relational Mapping)
- Converts Python code to SQL automatically
- Example: `Asset.objects.create(name="Bed")` → `INSERT INTO assets...`

### 3. REST API
- Uses HTTP methods: GET (read), POST (create), PUT (update), DELETE (delete)
- Frontend and backend communicate via JSON

### 4. React Functional Components
- Modern React approach using hooks (useState, useEffect)
- Simpler than class components

### 5. Role-Based Access
- First user = Warden (automatic)
- Warden can create other users
- Simple role checking in backend

## 🐛 Common Issues & Solutions

### Issue 1: "Module not found" in Django
**Solution:** Activate virtual environment first
```powershell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Issue 2: MySQL connection error
**Solution:** 
- Make sure MySQL is running in Laragon
- Check database name in settings.py
- Verify MySQL password

### Issue 3: CORS error in frontend
**Solution:** 
- Backend must be running on port 8000
- Check CORS settings in settings.py

### Issue 4: "Invalid credentials" on login
**Solution:** 
- Make sure you registered first
- Check username and password are correct

## 📚 Learning Resources

- Django Documentation: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- React Documentation: https://react.dev/
- MySQL Tutorial: https://www.mysqltutorial.org/

## 👨‍💻 Development Tips

1. **Always activate virtual environment before working on backend**
2. **Keep backend and frontend running in separate terminals**
3. **Check browser console (F12) for frontend errors**
4. **Check terminal for backend errors**
5. **Use Django Admin** (`http://localhost:8000/admin`) to view database directly

## 🎯 Project Goals Achieved

✅ MVC Architecture  
✅ ORM Usage with clear explanations  
✅ 6 Main functionalities + Login/Register  
✅ Simple, beginner-friendly code  
✅ Easy to explain and demo  
✅ Role-based access (Warden, Sub-Warden, Staff)  
✅ Monorepo structure  
✅ REST API communication  

## 📞 Support

For questions or issues, refer to:
1. Code comments in each file
2. This README
3. Django/React documentation

---

**Built with ❤️ for university students learning web development**
