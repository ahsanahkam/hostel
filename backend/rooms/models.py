"""
Rooms App Models

Room Model = Database table storing hostel rooms
"""

from django.db import models

class Room(models.Model):
    """Room Model - Represents hostel rooms"""
    
    # Room number - e.g., "101", "A-205"
    room_number = models.CharField(
        max_length=20, 
        unique=True
    )
    
    # Hostel name - e.g., "Block A", "Boys Hostel 1"
    hostel_name = models.CharField(max_length=100)
    
    # Floor number (optional)
    floor = models.IntegerField(
        null=True, 
        blank=True
    )
    
    # Room capacity - how many people can stay
    capacity = models.IntegerField(default=2)
    
    # Auto-timestamp fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Room {self.room_number} - {self.hostel_name}"
    
    class Meta:
        verbose_name = "Room"
        verbose_name_plural = "Rooms"
        ordering = ['hostel_name', 'room_number']  # Sort by hostel then room number
