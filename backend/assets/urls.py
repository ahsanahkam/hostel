from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'assets', views.AssetViewSet, basename='asset')
router.register(r'damage-reports', views.DamageReportViewSet, basename='damage-report')

urlpatterns = [
    path('', include(router.urls)),
]
