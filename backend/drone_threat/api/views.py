from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

# Utils import
from .utils.cloudinary_util import get_video_by_public_id;

# Views

class VideoStream(APIView):
    def get(self,request,video_id:str):
        video_url = get_video_by_public_id(video_id)
        if video_url:
            return Response({"video_url":video_url},status=status.HTTP_200_OK)
        else:
            return Response({"video_url":None},status=status.HTTP_204_NO_CONTENT)