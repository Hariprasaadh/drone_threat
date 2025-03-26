from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

# Utils import
from .utils.cloudinary_util import get_video_by_public_id, upload_video
from .utils.models_util import detect_objects
# Views

class VideoStream(APIView):
    def get(self,request,video_id:str):
        video_url = get_video_by_public_id(video_id)
        if video_url:
            output_url = detect_objects(video_url)['output_url']
            uploaded = upload_video(output_url)
            return Response(uploaded)
            # return Response({
            #     'success': uploaded['success'],
            #     'url': uploaded['url'],
            #     'public_id': uploaded['public_id'],
            #     'error': uploaded['error']
            #     }
            # )
            # if uploaded['success']:
            #     return Response({"processed_video_url" : uploaded['url']},status=status.HTTP_200_OK)
            # else:
            #     return Response({"Error" : "Can't upload the video"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"video_url":None},status=status.HTTP_204_NO_CONTENT)