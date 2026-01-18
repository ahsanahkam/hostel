# 🔧 API TESTING GUIDE
## How to Test Backend APIs Without Frontend

Sometimes you want to test if your backend APIs work before connecting the frontend. Here's how:

---

## Method 1: Using PowerShell (curl)

### Test 1: Register User
```powershell
curl -X POST http://localhost:8000/api/users/register/ `
  -H "Content-Type: application/json" `
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

**Expected Response:**
```json
{
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "profile": {
      "role": "Warden"
    }
  },
  "message": "User registered successfully"
}
```

---

### Test 2: Login User
```powershell
curl -X POST http://localhost:8000/api/users/login/ `
  -H "Content-Type: application/json" `
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }' `
  -c cookies.txt
```

**Note:** `-c cookies.txt` saves the session cookie for later requests.

**Expected Response:**
```json
{
  "user": { ... },
  "message": "Login successful"
}
```

---

### Test 3: Get Current User
```powershell
curl http://localhost:8000/api/users/me/ -b cookies.txt
```

**Note:** `-b cookies.txt` sends the session cookie.

---

### Test 4: Create Asset
```powershell
curl -X POST http://localhost:8000/api/assets/ `
  -H "Content-Type: application/json" `
  -b cookies.txt `
  -d '{
    "name": "Bed 101",
    "asset_type": "Bed",
    "total_quantity": 5,
    "damaged_quantity": 0,
    "condition": "Good"
  }'
```

---

### Test 5: Get All Assets
```powershell
curl http://localhost:8000/api/assets/ -b cookies.txt
```

---

### Test 6: Create Room
```powershell
curl -X POST http://localhost:8000/api/rooms/ `
  -H "Content-Type: application/json" `
  -b cookies.txt `
  -d '{
    "room_number": "101",
    "hostel_name": "Block A",
    "floor": 1,
    "capacity": 2
  }'
```

---

### Test 7: Get Dashboard Summary
```powershell
curl http://localhost:8000/api/dashboard/summary/ -b cookies.txt
```

---

## Method 2: Using Python Script

Create a file `test_api.py` in backend folder:

```python
import requests

# Base URL
BASE_URL = 'http://localhost:8000/api'

# Start a session (for cookies)
session = requests.Session()

# Test 1: Register
print("1. Testing Registration...")
response = session.post(f'{BASE_URL}/users/register/', json={
    'username': 'testuser2',
    'email': 'test2@example.com',
    'password': 'testpass123',
    'first_name': 'Test',
    'last_name': 'User2'
})
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}\n")

# Test 2: Login
print("2. Testing Login...")
response = session.post(f'{BASE_URL}/users/login/', json={
    'username': 'testuser2',
    'password': 'testpass123'
})
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}\n")

# Test 3: Get Current User
print("3. Testing Get Current User...")
response = session.get(f'{BASE_URL}/users/me/')
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}\n")

# Test 4: Create Asset
print("4. Testing Create Asset...")
response = session.post(f'{BASE_URL}/assets/', json={
    'name': 'Table 101',
    'asset_type': 'Table',
    'total_quantity': 10,
    'damaged_quantity': 2,
    'condition': 'Good'
})
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}\n")

# Test 5: Get All Assets
print("5. Testing Get All Assets...")
response = session.get(f'{BASE_URL}/assets/')
print(f"Status: {response.status_code}")
print(f"Number of assets: {len(response.json())}\n")

# Test 6: Create Room
print("6. Testing Create Room...")
response = session.post(f'{BASE_URL}/rooms/', json={
    'room_number': '102',
    'hostel_name': 'Block B',
    'floor': 2,
    'capacity': 3
})
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}\n")

# Test 7: Get Dashboard Summary
print("7. Testing Dashboard Summary...")
response = session.get(f'{BASE_URL}/dashboard/summary/')
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}\n")

# Test 8: Mark Asset Damaged
print("8. Testing Mark Asset Damaged...")
response = session.post(f'{BASE_URL}/assets/1/mark_damaged/')
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}\n")

print("All tests completed!")
```

**Run it:**
```powershell
cd backend
python test_api.py
```

---

## Method 3: Using Django Shell

This tests models directly (not APIs):

```powershell
# In backend folder
python manage.py shell
```

```python
# Import models
from django.contrib.auth.models import User
from users.models import UserProfile
from assets.models import Asset
from rooms.models import Room

# Test 1: Create User
user = User.objects.create_user(
    username='shelluser',
    email='shell@example.com',
    password='testpass123'
)
print(f"Created user: {user.username}, Role: {user.profile.role}")

# Test 2: Create Asset
asset = Asset.objects.create(
    name='Chair 101',
    asset_type='Chair',
    total_quantity=20,
    damaged_quantity=3,
    condition='Good'
)
print(f"Created asset: {asset.name}")

# Test 3: Create Room
room = Room.objects.create(
    room_number='201',
    hostel_name='Block C',
    floor=2,
    capacity=4
)
print(f"Created room: {room.room_number}")

# Test 4: Assign Asset to Room
asset.room = room
asset.save()
print(f"Assigned asset to room")

# Test 5: Query Assets
damaged_assets = Asset.objects.filter(condition='Damaged')
print(f"Damaged assets: {damaged_assets.count()}")

# Test 6: Count Statistics
total_assets = Asset.objects.count()
total_rooms = Room.objects.count()
total_users = User.objects.count()
print(f"Stats - Assets: {total_assets}, Rooms: {total_rooms}, Users: {total_users}")
```

---

## Expected Status Codes

| Code | Meaning | When You See It |
|------|---------|----------------|
| 200 | OK | Successful GET, PUT request |
| 201 | Created | Successful POST (created new record) |
| 400 | Bad Request | Invalid data sent |
| 401 | Unauthorized | Not logged in |
| 403 | Forbidden | Logged in but don't have permission |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Bug in backend code |

---

## Common Issues & Solutions

### Issue 1: "CSRF token missing"
**Solution:** Use `-H "X-CSRFToken: ..."` or use session (as shown above)

### Issue 2: "Unauthorized"
**Solution:** Login first and use cookies (`-b cookies.txt`)

### Issue 3: "Invalid data"
**Solution:** Check your JSON format, ensure all required fields are included

### Issue 4: Can't create asset - unique constraint
**Solution:** Asset with that name might already exist, use a different name

---

## Quick Test Sequence

Do this to test everything quickly:

```powershell
# 1. Make sure backend is running
python manage.py runserver

# 2. Open NEW PowerShell window

# 3. Register (first user = Warden)
curl -X POST http://localhost:8000/api/users/register/ -H "Content-Type: application/json" -d '{\"username\":\"admin\",\"password\":\"admin123\",\"email\":\"admin@test.com\"}' -c cookies.txt

# 4. Login
curl -X POST http://localhost:8000/api/users/login/ -H "Content-Type: application/json" -d '{\"username\":\"admin\",\"password\":\"admin123\"}' -b cookies.txt -c cookies.txt

# 5. Create asset
curl -X POST http://localhost:8000/api/assets/ -H "Content-Type: application/json" -d '{\"name\":\"Test Bed\",\"asset_type\":\"Bed\",\"total_quantity\":5,\"damaged_quantity\":0,\"condition\":\"Good\"}' -b cookies.txt

# 6. Get all assets
curl http://localhost:8000/api/assets/ -b cookies.txt

# 7. Get dashboard
curl http://localhost:8000/api/dashboard/summary/ -b cookies.txt
```

---

## Testing Checklist

Before saying "backend is ready":

- [ ] Registration creates user
- [ ] First user gets Warden role
- [ ] Second user gets Inventory Staff role
- [ ] Login returns user with profile
- [ ] Can create assets
- [ ] Can list all assets
- [ ] Can update asset
- [ ] Can mark asset damaged
- [ ] Can delete asset
- [ ] Can create rooms
- [ ] Can list all rooms
- [ ] Dashboard returns correct counts
- [ ] Only Warden can create users
- [ ] Can update profile phone number

---

## Using Postman (Optional)

If you have Postman installed:

1. Create new request
2. Set method: POST
3. URL: `http://localhost:8000/api/users/register/`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):
   ```json
   {
     "username": "testuser",
     "email": "test@example.com",
     "password": "testpass123"
   }
   ```
6. Click Send

Postman automatically handles cookies for you.

---

**Happy Testing! 🧪**
