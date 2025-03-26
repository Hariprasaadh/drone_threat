from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os

from .utils.uploads import pre_processed_path,post_processed_path
from .utils.models_util import detect_objects

@api_view(['GET'])
def process_video(request,file_name:str):
    file_path = pre_processed_path(file_name)
    res = detect_objects(file_path, post_processed_path(),file_name)
    return Response(res)
