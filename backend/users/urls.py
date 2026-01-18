"""
Users App URLs
==============

Maps URL paths to view functions
When frontend makes a request, Django uses these URLs to find the right view
"""

from django.urls import path
from . import views

urlpatterns = [
    # Authentication endpoints
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    
    # User profile endpoints
    path('me/', views.current_user_view, name='current-user'),
    path('profile/update/', views.update_profile_view, name='update-profile'),
    
    # User management endpoints (for Warden)
    path('create-user/', views.create_user_view, name='create-user'),
    path('list/', views.list_users_view, name='list-users'),
    path('update-user/<int:user_id>/', views.update_user_view, name='update-user'),
    path('delete-user/<int:user_id>/', views.delete_user_view, name='delete-user'),
    path('reset-password/<int:user_id>/', views.reset_user_password_view, name='reset-password'),
    
    # Password reset endpoints (public)
    path('request-reset/', views.request_password_reset_view, name='request-reset'),
    path('verify-code/', views.verify_reset_code_view, name='verify-code'),
    path('reset-password-with-code/', views.reset_password_with_code_view, name='reset-password-with-code'),
]
