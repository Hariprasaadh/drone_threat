import os
from django.conf import settings

def pre_processed_path(output_filename):
    output_path = os.path.join(f"{settings.MEDIA_ROOT}/pre_processed", output_filename+".mp4")
    return output_path

def post_processed_path(output_filename=None):
    if output_filename is None:
        return f"{settings.MEDIA_ROOT}/post_processed"
    
    output_path = os.path.join(f"{settings.MEDIA_ROOT}/post_processed", output_filename+".mp4")
    
    return output_path
