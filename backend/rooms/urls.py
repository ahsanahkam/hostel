"""
Rooms App URLs
=============

Maps room URLs to views
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.RoomViewSet, basename='room')

urlpatterns = [
    path('', include(router.urls)),
]
