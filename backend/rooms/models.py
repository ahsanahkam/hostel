from django.db import models


class Room(models.Model):
    room_number = models.CharField(max_length=20, unique=True)
    hostel_name = models.CharField(max_length=100)
    floor = models.IntegerField(null=True, blank=True)
    capacity = models.IntegerField(default=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Room {self.room_number} - {self.hostel_name}"
    
    class Meta:
        verbose_name = "Room"
        verbose_name_plural = "Rooms"
        ordering = ['hostel_name', 'room_number']
