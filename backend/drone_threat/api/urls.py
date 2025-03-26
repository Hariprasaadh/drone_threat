from django.urls import path
from .views import (process_video)

urlpatterns = [
    path('process_video/<str:file_name>', process_video),
]
