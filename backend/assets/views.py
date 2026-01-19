from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Asset, DamageReport
from .serializers import AssetSerializer, DamageReportSerializer


class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [AllowAny]


class DamageReportViewSet(viewsets.ModelViewSet):
    queryset = DamageReport.objects.all()
    serializer_class = DamageReportSerializer
    permission_classes = [AllowAny]
