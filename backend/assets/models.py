"""
Assets App Models

ORM:
- Asset Model = Database table storing hostel assets (beds, tables, etc.)
- DamageReport Model = Database table tracking damage incidents and repairs
"""

from django.db import models

class Asset(models.Model):
    """Asset Model - Represents physical items in the hostel"""
    
    # Asset type choices
    ASSET_TYPE_CHOICES = [
        ('Bed', 'Bed'),
        ('Table', 'Table'),
        ('Chair', 'Chair'),
        ('Cupboard', 'Cupboard'),
        ('Fan', 'Fan'),
        ('Light', 'Light'),
        ('Other', 'Other'),
    ]
    
    # Condition choices
    CONDITION_CHOICES = [
        ('Good', 'Good'),
        ('Damaged', 'Damaged'),
    ]
    
    # Asset name - e.g., "Bed 101", "Study Table"
    name = models.CharField(max_length=200)
    
    # Type of asset - Bed, Table, etc.
    asset_type = models.CharField(
        max_length=50, 
        choices=ASSET_TYPE_CHOICES
    )
    
    # Total quantity of this asset
    total_quantity = models.IntegerField(default=1)
    
    # Number of damaged items
    damaged_quantity = models.IntegerField(default=0)
    
    # Current condition of the asset
    condition = models.CharField(
        max_length=20, 
        choices=CONDITION_CHOICES, 
        default='Good'
    )
    
    # Foreign Key to Room
    room = models.ForeignKey(
        'rooms.Room',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assets'
    )
    
    # Auto-timestamp fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} ({self.asset_type}) - {self.condition}"
    
    class Meta:
        verbose_name = "Asset"
        verbose_name_plural = "Assets"
        ordering = ['-created_at']  # Newest first


class DamageReport(models.Model):
    """Damage Report Model - Tracks damage incidents and repair status"""
    
    # Asset type choices (same as Asset model)
    ASSET_TYPE_CHOICES = [
        ('Bed', 'Bed'),
        ('Table', 'Table'),
        ('Chair', 'Chair'),
        ('Cupboard', 'Cupboard'),
        ('Fan', 'Fan'),
        ('Light', 'Light'),
        ('Other', 'Other'),
    ]
    
    # Repair status choices
    STATUS_CHOICES = [
        ('Not Fixed', 'Not Fixed'),
        ('Fixed', 'Fixed'),
        ('Replaced', 'Replaced'),
    ]
    
    room = models.ForeignKey(
        'rooms.Room',
        on_delete=models.CASCADE,
        related_name='damage_reports'
    )
    
    # Type of damaged asset
    asset_type = models.CharField(max_length=50, choices=ASSET_TYPE_CHOICES)
    
    # Description of the damage
    description = models.TextField()
    
    # Current repair status
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Not Fixed'
    )
    
    # Timestamps
    reported_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.asset_type} damage in Room {self.room.room_number} - {self.status}"
    
    class Meta:
        verbose_name = "Damage Report"
        verbose_name_plural = "Damage Reports"
        ordering = ['-reported_at']  # Newest first
