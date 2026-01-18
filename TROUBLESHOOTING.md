# 🔧 TROUBLESHOOTING GUIDE
## Common Errors and How to Fix Them

---

## 🔴 Backend (Django) Errors

### Error 1: "No module named 'django'"

**What it means:** Django is not installed or virtual environment not activated.

**Solution:**
```powershell
# Make sure you're in backend folder
cd "c:\laragon\www\Hostel Inventory\backend"

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install requirements
pip install -r requirements.txt
```

**How to verify:**
```powershell
# Should show (venv) at the start of your prompt
(venv) PS C:\laragon\www\Hostel Inventory\backend>

# Test Django installation
python -c "import django; print(django.get_version())"
# Should print: 4.2.7
```

---

### Error 2: "django.db.utils.OperationalError: (2003, "Can't connect to MySQL server")"

**What it means:** MySQL is not running or connection settings are wrong.

**Solution:**

**Step 1:** Check if MySQL is running
```powershell
# Open Laragon
# Make sure "MySQL" status is green
# If not, click "Start All"
```

**Step 2:** Verify database exists
```sql
-- In Laragon, click "Database" button
-- Run:
SHOW DATABASES;

-- If hostel_inventory_db doesn't exist:
CREATE DATABASE hostel_inventory_db;
```

**Step 3:** Check settings.py
```python
# File: backend/hostel_inventory/settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'hostel_inventory_db',
        'USER': 'root',
        'PASSWORD': '',  # Change if you set a password
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

---

### Error 3: "django.db.utils.OperationalError: no such table: assets_asset"

**What it means:** Database tables haven't been created.

**Solution:**
```powershell
# In backend folder with venv activated
python manage.py makemigrations
python manage.py migrate
```

**If that doesn't work:**
```powershell
# Delete all migration files (except __init__.py)
# In each app folder (users, assets, rooms), delete files in migrations/ folder
# Keep __init__.py

# Then run:
python manage.py makemigrations users
python manage.py makemigrations assets
python manage.py makemigrations rooms
python manage.py migrate
```

---

### Error 4: "ModuleNotFoundError: No module named 'mysqlclient'"

**What it means:** MySQL Python driver not installed.

**Solution:**

**Option 1: Install mysqlclient** (Recommended)
```powershell
pip install mysqlclient
```

**If that fails (Windows issue):**

**Option 2: Use pymysql instead**
```powershell
pip install pymysql

# Then add to backend/hostel_inventory/__init__.py:
import pymysql
pymysql.install_as_MySQLdb()
```

---

### Error 5: "django.core.exceptions.ImproperlyConfigured: CSRF verification failed"

**What it means:** CSRF token missing in request.

**Solution:**

**For API testing:** Make sure you're logged in and using cookies.

**For React frontend:** Check api.js has:
```javascript
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');
```

---

### Error 6: "ImportError: cannot import name 'Asset' from 'assets.models'"

**What it means:** Circular import or model not defined.

**Solution:**

Check [assets/models.py](backend/assets/models.py) has:
```python
class Asset(models.Model):
    # ... fields ...
```

If importing in another file:
```python
# Correct
from assets.models import Asset

# Wrong - don't do this
from assets import Asset
```

---

### Error 7: "django.db.utils.IntegrityError: FOREIGN KEY constraint failed"

**What it means:** Trying to assign an asset to a room that doesn't exist.

**Solution:**

Either:
- Create the room first, then assign asset
- Make room field optional: `room = models.ForeignKey(..., null=True, blank=True)`

---

## 🔵 Frontend (React) Errors

### Error 8: "npm: command not found"

**What it means:** Node.js is not installed.

**Solution:**
1. Download Node.js from https://nodejs.org/
2. Install it (LTS version)
3. Restart PowerShell
4. Test: `node --version` should show version number

---

### Error 9: "Module not found: Can't resolve 'axios'"

**What it means:** npm packages not installed.

**Solution:**
```powershell
# In frontend folder
cd "c:\laragon\www\Hostel Inventory\frontend"

npm install
```

---

### Error 10: "Error: [eslint] Failed to load plugin 'react'"

**What it means:** React Scripts not properly installed.

**Solution:**
```powershell
# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install
```

---

### Error 11: "CORS error: No 'Access-Control-Allow-Origin' header"

**What it means:** Backend not allowing frontend to access APIs.

**Solution:**

**Check backend settings.py:**
```python
INSTALLED_APPS = [
    # ...
    'corsheaders',  # Must be in list
]

MIDDLEWARE = [
    # ...
    'corsheaders.middleware.CorsMiddleware',  # Must be near top
    # ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

CORS_ALLOW_CREDENTIALS = True
```

**Make sure backend is running on port 8000:**
```powershell
python manage.py runserver  # Should say port 8000
```

---

### Error 12: "Error: Invalid host header"

**What it means:** React dev server security check.

**Solution:**

Create [.env](frontend/.env) file in frontend folder:
```
DANGEROUSLY_DISABLE_HOST_CHECK=true
```

Or use:
```powershell
npm start -- --host 0.0.0.0
```

---

### Error 13: "TypeError: Cannot read properties of undefined (reading 'map')"

**What it means:** Trying to map over undefined/null data.

**Solution:**

Check data is loaded before mapping:
```javascript
// Wrong
{assets.map(asset => ...)}

// Correct
{assets && assets.map(asset => ...)}

// Or
{assets?.map(asset => ...)}  // Optional chaining

// Or initialize state properly
const [assets, setAssets] = useState([]);  // Empty array, not undefined
```

---

### Error 14: "net::ERR_CONNECTION_REFUSED"

**What it means:** Backend server is not running.

**Solution:**
```powershell
# In backend folder
python manage.py runserver
```

Check browser is trying to connect to `http://localhost:8000`

---

## ⚙️ General Issues

### Issue 1: Port Already in Use

**Backend (Port 8000):**
```powershell
# Find process using port 8000
netstat -ano | findstr :8000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Or use different port
python manage.py runserver 8001
```

**Frontend (Port 3000):**
```powershell
# Kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or React will ask if you want to use different port
```

---

### Issue 2: Changes Not Reflecting

**Backend:**
- Make sure you saved the file
- Restart server (Ctrl+C, then `python manage.py runserver`)
- If model changed, run migrations: `python manage.py makemigrations && python manage.py migrate`

**Frontend:**
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for errors (F12)
- Restart React server (Ctrl+C, then `npm start`)

---

### Issue 3: Can't Login / "Invalid credentials"

**Possible causes:**

1. **User doesn't exist**
   ```powershell
   python manage.py shell
   ```
   ```python
   from django.contrib.auth.models import User
   User.objects.all()  # Check if user exists
   ```

2. **Wrong password**
   - Passwords are hashed, can't see plain text
   - Create new user or reset password:
   ```python
   user = User.objects.get(username='admin')
   user.set_password('newpassword')
   user.save()
   ```

3. **Session expired**
   - Register new user
   - Clear cookies and try again

---

### Issue 4: Migration Conflicts

**Error:** "Conflicting migrations detected"

**Solution:**
```powershell
# Option 1: Fake migrations (if database already correct)
python manage.py migrate --fake

# Option 2: Reset migrations (WARNING: loses data)
# 1. Delete all migration files except __init__.py
# 2. Drop and recreate database
DROP DATABASE hostel_inventory_db;
CREATE DATABASE hostel_inventory_db;

# 3. Recreate migrations
python manage.py makemigrations
python manage.py migrate
```

---

### Issue 5: Permission Denied Errors

**On Windows:**
- Run PowerShell as Administrator
- Or change folder permissions

**File access:**
```powershell
# If can't write to file
icacls "c:\laragon\www\Hostel Inventory" /grant Users:F /T
```

---

## 🔍 Debugging Tips

### Backend Debugging

**1. Check if server is running:**
```powershell
# Should see "Starting development server at http://127.0.0.1:8000/"
python manage.py runserver
```

**2. Check for syntax errors:**
```powershell
python manage.py check
```

**3. Test models in shell:**
```powershell
python manage.py shell
```
```python
from assets.models import Asset
Asset.objects.all()  # Should return queryset
```

**4. Check logs:**
- Look at terminal where server is running
- Errors appear in red

**5. Use print statements:**
```python
def my_view(request):
    print("Request data:", request.data)  # Appears in terminal
    # ... rest of code
```

---

### Frontend Debugging

**1. Browser Console (F12):**
- Shows JavaScript errors
- Shows network requests
- Can test code: `console.log()`

**2. Network Tab (F12 → Network):**
- See all API requests
- Check if requests are being sent
- Check response status codes

**3. React DevTools:**
- Install React Developer Tools extension
- Inspect component state and props

**4. Check API responses:**
```javascript
const fetchAssets = async () => {
    try {
        const response = await getAssets();
        console.log("Assets:", response.data);  // Check data
        setAssets(response.data);
    } catch (error) {
        console.error("Error:", error.response);  // Check error
    }
};
```

---

## 📋 Verification Checklist

Use this before asking for help:

**Backend:**
- [ ] Virtual environment activated (`(venv)` in prompt)
- [ ] All packages installed (`pip install -r requirements.txt`)
- [ ] MySQL running (check Laragon)
- [ ] Database exists (`SHOW DATABASES;`)
- [ ] Migrations applied (`python manage.py migrate`)
- [ ] Server running on port 8000
- [ ] No errors in terminal

**Frontend:**
- [ ] Node.js installed (`node --version`)
- [ ] Packages installed (`npm install`)
- [ ] No errors during `npm start`
- [ ] Server running on port 3000
- [ ] Browser console clear (F12)
- [ ] Can access http://localhost:3000

**Connection:**
- [ ] Backend accessible: http://localhost:8000/admin
- [ ] CORS settings correct in settings.py
- [ ] api.js has correct BASE_URL
- [ ] Cookies enabled in browser

---

## 🆘 Still Stuck?

**1. Read the error message carefully**
   - Error messages usually tell you what's wrong
   - Google the exact error message

**2. Check file paths**
   - Are you in the right folder?
   - Are file names spelled correctly?

**3. Check syntax**
   - Missing comma, bracket, quote?
   - Indentation correct? (Python is strict)

**4. Restart everything**
   - Sometimes it just works after restart
   - Stop both servers
   - Close terminals
   - Start fresh

**5. Check this guide again**
   - Read README.md
   - Read QUICK_START.md
   - Follow setup steps exactly

---

## 💡 Pro Tips

1. **Always activate venv before working on backend**
2. **Keep two terminals open** - one for backend, one for frontend
3. **Save files before testing** - VS Code doesn't auto-save by default
4. **Check terminal for errors** - most issues show error messages
5. **Use browser DevTools** - F12 is your friend
6. **Test backend APIs first** - before connecting frontend
7. **One change at a time** - easier to find what broke
8. **Git commit often** - so you can revert if needed

---

**Good Luck! 🍀**

If you've tried everything and still stuck, double-check:
- Are you using Python 3.8+?
- Are you using Node.js 16+?
- Did you create the database?
- Did you run migrations?
- Are both servers running?
