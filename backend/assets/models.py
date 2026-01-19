from django.db import models


class Asset(models.Model):
    ASSET_TYPE_CHOICES = [
        ('Bed', 'Bed'),
        ('Table', 'Table'),
        ('Chair', 'Chair'),
        ('Cupboard', 'Cupboard'),
        ('Fan', 'Fan'),
        ('Light', 'Light'),
        ('Other', 'Other'),
    ]
    
    CONDITION_CHOICES = [
        ('Good', 'Good'),
        ('Damaged', 'Damaged'),
    ]
    
    name = models.CharField(max_length=200)
    asset_type = models.CharField(max_length=50, choices=ASSET_TYPE_CHOICES)
    total_quantity = models.IntegerField(default=1)
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES, default='Good')
    room = models.ForeignKey(
        'rooms.Room',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assets'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} ({self.asset_type}) - {self.condition}"
    
    class Meta:
        verbose_name = "Asset"
        verbose_name_plural = "Assets"
        ordering = ['-created_at']


class DamageReport(models.Model):
    ASSET_TYPE_CHOICES = [
        ('Bed', 'Bed'),
        ('Table', 'Table'),
        ('Chair', 'Chair'),
        ('Cupboard', 'Cupboard'),
        ('Fan', 'Fan'),
        ('Light', 'Light'),
        ('Other', 'Other'),
    ]
    
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
    asset_type = models.CharField(max_length=50, choices=ASSET_TYPE_CHOICES)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Not Fixed')
    reported_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.asset_type} damage in Room {self.room.room_number} - {self.status}"
    
    class Meta:
        verbose_name = "Damage Report"
        verbose_name_plural = "Damage Reports"
        ordering = ['-reported_at']
