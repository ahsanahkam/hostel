"""
Assets App URLs
===============

Maps asset and damage report URLs to views
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Router automatically generates URLs for ViewSet
router = DefaultRouter()
router.register(r'assets', views.AssetViewSet, basename='asset')
router.register(r'damage-reports', views.DamageReportViewSet, basename='damage-report')

urlpatterns = [
    path('', include(router.urls)),
]
