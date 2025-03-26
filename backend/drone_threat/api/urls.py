from django.urls import path
from .views import (VideoStream)

urlpatterns = [
    path('getVideoStream/<str:video_id>', VideoStream.as_view(), name="getVideoStream"),
]
