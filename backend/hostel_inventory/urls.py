"""
Main URL Configuration

This is the central URL router for the entire backend
It connects all app URLs together

URL Structure:
- /api/users/...      → users app URLs
- /api/assets/...     → assets app URLs
- /api/rooms/...      → rooms app URLs
- /api/dashboard/...  → dashboard app URLs
"""

from django.urls import path, include

urlpatterns = [
    # API endpoints
    path('api/users/', include('users.urls')),
    path('api/assets/', include('assets.urls')),
    path('api/rooms/', include('rooms.urls')),
    path('api/dashboard/', include('dashboard.urls')),
]
