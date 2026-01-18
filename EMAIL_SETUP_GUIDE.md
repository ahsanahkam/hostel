# Email Setup Guide for Password Reset

## Quick Setup (Gmail)

### Step 1: Get Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** (left sidebar)
3. Enable **2-Step Verification** if not already enabled
4. After enabling 2FA, go back to Security
5. Click on **App passwords** (appears after 2FA is enabled)
6. Select app: **Mail**
7. Select device: **Other (Custom name)** - type "Hostel Inventory"
8. Click **Generate**
9. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

### Step 2: Update Django Settings

Open: `backend/hostel_inventory/settings.py`

Find these lines at the bottom:

```python
EMAIL_HOST_USER = 'your-email@gmail.com'  # Change this
EMAIL_HOST_PASSWORD = 'your-app-password'  # Change this (use App Password for Gmail)
DEFAULT_FROM_EMAIL = 'Hostel Inventory <your-email@gmail.com>'
```

Replace with:

```python
EMAIL_HOST_USER = 'your-actual-email@gmail.com'  # Your Gmail address
EMAIL_HOST_PASSWORD = 'abcd efgh ijkl mnop'  # The 16-char app password (without spaces)
DEFAULT_FROM_EMAIL = 'Hostel Inventory <your-actual-email@gmail.com>'
```

### Step 3: Test It!

1. Restart the backend server (CTRL+C then run again)
2. Go to http://localhost:3000/forgot-password
3. Enter an email that exists in the database
4. Check your email for the 6-digit code
5. Enter the code and reset your password

## Alternative: Console Email (For Testing Only)

If you don't want to configure Gmail yet, you can test with console output:

In `backend/hostel_inventory/settings.py`, change:

```python
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

This will print emails to the terminal instead of sending real emails.

## Troubleshooting

### "Authentication failed" error
- Make sure you're using an **App Password**, not your regular Gmail password
- Remove any spaces from the app password

### "SMTPSenderRefused" error
- Check that EMAIL_HOST_USER matches the email you're sending from
- Verify 2FA is enabled on your Google account

### Email not received
- Check spam/junk folder
- Verify the email address exists in the database
- Check terminal for error messages

## How It Works

1. User enters email → Backend generates 6-digit code
2. Code is saved to database with 15-minute expiration
3. Email is sent with the code
4. User enters code → Backend verifies it's correct and not expired
5. User enters new password → Password is updated and code is cleared

## Security Notes

- Codes expire after 15 minutes
- Each new request generates a new code (old one becomes invalid)
- For production, use environment variables for EMAIL_HOST_USER and EMAIL_HOST_PASSWORD
- Never commit real credentials to git
