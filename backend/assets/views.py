"""
Assets App Views (API Controllers)
==================================

Handles all asset-related and damage report API requests
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Asset, DamageReport
from .serializers import AssetSerializer, DamageReportSerializer


class AssetViewSet(viewsets.ModelViewSet):
    """Asset CRUD operations"""
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [AllowAny]
    
    @action(detail=True, methods=['post'])
    def mark_damaged(self, request, pk=None):
        """Mark an asset as damaged"""
        asset = self.get_object()
        
        if asset.damaged_quantity < asset.total_quantity:
            asset.damaged_quantity += 1
            if asset.damaged_quantity == asset.total_quantity:
                asset.condition = 'Damaged'
            asset.save()
            
            return Response({
                'asset': self.get_serializer(asset).data,
                'message': 'Asset marked as damaged'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'All items are already damaged'
            }, status=status.HTTP_400_BAD_REQUEST)


class DamageReportViewSet(viewsets.ModelViewSet):
    """
    Damage Report CRUD operations
    
    Endpoints:
    - GET /api/assets/damage-reports/ - List all damage reports
    - POST /api/assets/damage-reports/ - Create new damage report
    - PUT /api/assets/damage-reports/{id}/ - Update damage report status
    - DELETE /api/assets/damage-reports/{id}/ - Delete damage report
    """
    queryset = DamageReport.objects.all()
    serializer_class = DamageReportSerializer
    permission_classes = [AllowAny]
