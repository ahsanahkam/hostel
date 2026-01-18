"""
Assets App Serializers

Converts Asset and DamageReport models to/from JSON
"""

from rest_framework import serializers
from .models import Asset, DamageReport


class AssetSerializer(serializers.ModelSerializer):
    """Serializes Asset data to JSON"""
    
    room_display = serializers.CharField(source='room.room_number', read_only=True)
    
    class Meta:
        model = Asset
        fields = [
            'id', 'name', 'asset_type', 'total_quantity', 
            'damaged_quantity', 'condition', 'room', 'room_display',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def validate(self, data):
        """Validation: damaged_quantity cannot be more than total_quantity"""
        damaged = data.get('damaged_quantity', 0)
        total = data.get('total_quantity', 0)
        
        if damaged > total:
            raise serializers.ValidationError(
                "Damaged quantity cannot exceed total quantity"
            )
        
        return data


class DamageReportSerializer(serializers.ModelSerializer):
    """Serializes DamageReport data to JSON"""
    
    room_number = serializers.CharField(source='room.room_number', read_only=True)
    
    class Meta:
        model = DamageReport
        fields = [
            'id', 'room', 'room_number', 'asset_type', 
            'description', 'status', 'reported_at', 'updated_at'
        ]
        read_only_fields = ['reported_at', 'updated_at']
