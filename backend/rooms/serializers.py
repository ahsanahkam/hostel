"""
Rooms App Serializers

Converts Room model to/from JSON
"""

from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    """Serializes Room data to JSON with asset count"""
    
    asset_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Room
        fields = [
            'id', 'room_number', 'hostel_name', 'floor', 
            'capacity', 'asset_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def get_asset_count(self, obj):
        """Count assets in this room"""
        return obj.assets.count()
