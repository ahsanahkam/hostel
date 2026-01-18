# 🎓 QUICK START GUIDE - For Beginners

## ⚡ 5-Minute Setup

### Step 1: Start MySQL (Laragon)
1. Open Laragon
2. Click "Start All"
3. MySQL should be running

### Step 2: Create Database
1. In Laragon, click "Database" button
2. Run this command:
   ```sql
   CREATE DATABASE hostel_inventory_db;
   ```

### Step 3: Setup Backend
```powershell
# Open PowerShell in backend folder
cd "c:\laragon\www\Hostel Inventory\backend"

# Create virtual environment (FIRST TIME ONLY)
python -m venv venv

# Activate virtual environment (DO THIS EVERY TIME)
.\venv\Scripts\Activate.ps1

# Install packages (FIRST TIME ONLY)
pip install -r requirements.txt

# Create database tables (FIRST TIME ONLY)
python manage.py makemigrations
python manage.py migrate

# Run server (DO THIS EVERY TIME)
python manage.py runserver
```

### Step 4: Setup Frontend (NEW TERMINAL)
```powershell
# Open NEW PowerShell in frontend folder
cd "c:\laragon\www\Hostel Inventory\frontend"

# Install packages (FIRST TIME ONLY)
npm install

# Run frontend (DO THIS EVERY TIME)
npm start
```

### Step 5: Test the System
1. Browser opens automatically at `http://localhost:3000`
2. Click "Sign Up" → Create first user (becomes Warden)
3. Login and explore!

---

## 🎯 Feature Summary (For Demo/Presentation)

### 1. Authentication System
- **Sign Up:** First user = Warden, others = Staff
- **Sign In:** Username + Password login
- **Model:** User (built-in) + UserProfile (custom)
- **API:** `/api/users/register/`, `/api/users/login/`

### 2. Asset Management
- **Add Asset:** Name, Type (Bed/Table/etc), Quantity, Condition
- **Edit Asset:** Update any field
- **Mark Damaged:** Increase damaged count
- **Model:** Asset (name, asset_type, total_quantity, damaged_quantity, condition, room)
- **API:** `/api/assets/` (GET=list, POST=create, PUT=update, DELETE=delete)

### 3. Room Management
- **Add Room:** Room number, Hostel name, Floor, Capacity
- **View Assets:** See which assets are in each room
- **Model:** Room (room_number, hostel_name, floor, capacity)
- **API:** `/api/rooms/`

### 4. Dashboard (Summary)
- Shows: Total Assets, Damaged Assets, Good Assets, Total Rooms, Total Users
- **API:** `/api/dashboard/summary/`

### 5. Profile Management
- View your info (username, email, role, phone)
- Update phone number
- **Warden Only:** Create Sub-Wardens and Staff users

---

## 🧠 Key Concepts to Explain

### MVC Architecture
```
Model (Database)         Controller (Django APIs)      View (React Pages)
     ↓                           ↓                            ↓
User, Asset, Room  →   Serializers + Views    →    SignIn.js, Assets.js
    (models.py)           (views.py, urls.py)          (frontend/pages)
```

### ORM Example
```python
# Python Code (ORM)
Asset.objects.create(name="Bed 101", asset_type="Bed", total_quantity=5)

# What Django does automatically (SQL)
INSERT INTO assets_asset (name, asset_type, total_quantity) 
VALUES ('Bed 101', 'Bed', 5);
```

### REST API Flow
```
React Page (Frontend)
    ↓
    Makes HTTP Request (GET/POST/PUT/DELETE)
    ↓
Django API (Backend)
    ↓
    Processes Request (Serializer validates data)
    ↓
Django Model (ORM)
    ↓
    Saves/Reads from MySQL Database
    ↓
    Returns JSON Response
    ↓
React Page updates display
```

### Role System
```
User Signs Up
    ↓
Django Signal Checks: Is this the first user?
    ↓
    YES → Role = "Warden" (automatically)
    NO  → Role = "Inventory Staff" (default)
    ↓
Warden can create more users with specific roles
```

---

## 📝 Testing Checklist (For Demo)

### ✅ Test 1: Registration & Login
- [ ] Sign up as first user → Should become Warden
- [ ] Login with credentials → Redirects to Dashboard
- [ ] Check profile → Role should show "Warden"

### ✅ Test 2: Add Assets
- [ ] Go to Assets page
- [ ] Click "Add New Asset"
- [ ] Fill form: Name="Bed 101", Type="Bed", Quantity=5
- [ ] Submit → Should appear in table

### ✅ Test 3: Mark Asset Damaged
- [ ] Click "Mark Damaged" on an asset
- [ ] Damaged quantity should increase
- [ ] If all items damaged, condition changes to "Damaged"

### ✅ Test 4: Add Rooms
- [ ] Go to Rooms page
- [ ] Add room: Number="101", Hostel="Block A", Floor=1, Capacity=2
- [ ] Should appear in rooms list

### ✅ Test 5: Dashboard Statistics
- [ ] Go to Dashboard
- [ ] Should show: Total Assets, Damaged Assets, Total Rooms
- [ ] Numbers should match what you added

### ✅ Test 6: Warden Creates User
- [ ] As Warden, go to Profile
- [ ] Click "Create New User"
- [ ] Add user with role "Sub-Warden"
- [ ] Should appear in users list

---

## 🔧 Common Commands Reference

### Backend Commands
```powershell
# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Run server
python manage.py runserver

# Create migrations (after model changes)
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Open Python shell (test ORM)
python manage.py shell
```

### Frontend Commands
```powershell
# Install packages
npm install

# Run development server
npm start

# Build for production
npm run build
```

### Testing ORM in Django Shell
```python
# Open shell: python manage.py shell

# Import models
from users.models import UserProfile
from assets.models import Asset
from rooms.models import Room
from django.contrib.auth.models import User

# Get all assets
Asset.objects.all()

# Get damaged assets only
Asset.objects.filter(condition='Damaged')

# Count total assets
Asset.objects.count()

# Get first user
User.objects.first()

# Check user's role
user = User.objects.first()
user.profile.role
```

---

## 🎬 Presentation Flow

### 1. Introduction (2 min)
- System name: Hostel Inventory Management
- Purpose: Track hostel assets (beds, tables, etc.)
- Tech: Django + React + MySQL

### 2. Architecture Explanation (3 min)
- Show MVC diagram
- Explain ORM with example
- Show how frontend talks to backend (REST API)

### 3. Live Demo (5 min)
1. Register first user (becomes Warden)
2. Add 2-3 assets
3. Mark one as damaged
4. Add a room
5. Show dashboard with statistics
6. Create a new user as Warden

### 4. Code Walkthrough (5 min)
- Show Asset model (models.py)
- Show Asset API (views.py)
- Show Assets page (Assets.js)
- Explain the flow: React → API → Model → Database

### 5. Q&A

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Module not found" error | Activate virtual environment: `.\venv\Scripts\Activate.ps1` |
| Can't connect to MySQL | Start Laragon, check MySQL is running |
| Port 8000 already in use | Kill process or use different port: `python manage.py runserver 8001` |
| CORS error in browser | Make sure backend is running on port 8000 |
| "Unauthorized" error | Login first, session might have expired |
| Can't install mysqlclient | Install Visual C++ Build Tools |

---

## 📊 Database Schema (Simple View)

### users_userprofile Table
| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key |
| user_id | INT | Foreign key to User |
| role | VARCHAR | Warden/Sub-Warden/Staff |
| phone_number | VARCHAR | Phone number |

### assets_asset Table
| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key |
| name | VARCHAR | Asset name |
| asset_type | VARCHAR | Bed/Table/Chair/etc |
| total_quantity | INT | Total count |
| damaged_quantity | INT | Damaged count |
| condition | VARCHAR | Good/Damaged |
| room_id | INT | Foreign key to Room |

### rooms_room Table
| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key |
| room_number | VARCHAR | Room number |
| hostel_name | VARCHAR | Hostel name |
| floor | INT | Floor number |
| capacity | INT | Max occupancy |

---

**Good luck with your project! 🎉**
