"""
Users App Models

ORM (Object Relational Mapping):
- ORM lets you interact with databases using Python objects
- Django automatically converts Python classes to database tables
- Each Model = One Database Table
- Each Model Field = One Database Column
"""

from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone
from datetime import timedelta
import random
import string

class UserProfile(models.Model):
    """User Model with username, password, email, and role"""
    
    ROLE_CHOICES = [
        ('Pending', 'Pending'),
        ('Warden', 'Warden'),
        ('Sub-Warden', 'Sub-Warden'),
        ('Inventory Staff', 'Inventory Staff'),
    ]
    
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    email = models.EmailField()
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='Pending')
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    reset_code = models.CharField(max_length=6, blank=True, null=True)
    reset_code_expires = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def set_password(self, raw_password):
        """Encrypt and save password"""
        self.password = make_password(raw_password)
    
    def check_password(self, raw_password):
        """Check if password is correct"""
        return check_password(raw_password, self.password)
    
    def generate_reset_code(self):
        """Generate 6-digit reset code"""
        self.reset_code = ''.join(random.choices(string.digits, k=6))
        self.reset_code_expires = timezone.now() + timedelta(minutes=15)
        self.save()
        return self.reset_code
    
    def verify_reset_code(self, code):
        """Check if reset code is valid and not expired"""
        if not self.reset_code or not self.reset_code_expires:
            return False
        if self.reset_code != code:
            return False
        if timezone.now() > self.reset_code_expires:
            return False
        return True
    
    def clear_reset_code(self):
        """Clear reset code after use"""
        self.reset_code = None
        self.reset_code_expires = None
        self.save()
    
    def __str__(self):
        return f"{self.username} ({self.role})"
    
    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"
