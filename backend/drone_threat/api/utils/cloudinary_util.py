import cloudinary
import cloudinary.api
import cloudinary.uploader
import subprocess
import os

# Configure Cloudinary
cloudinary.config(
    cloud_name="dobfrs8nb",
    api_key="496493297956177",
    api_secret="PPP3s3yeSvcgrJNK1vC7ndwvqUQ",
    secure=True
)

def get_video_by_public_id(public_id):
    try:
        result = cloudinary.api.resource(
            public_id,
            resource_type="video",
            type="upload"
        )
        return result['secure_url']
        
    except cloudinary.api.NotFound:
        print(f"Video with Public ID '{public_id}' not found")
        return None
    except Exception as e:
        print(f"Error fetching video: {e}")
        return None


def preprocess_video(input_path, output_path):
    try:
        ffmpeg_command = [
            'ffmpeg', 
            '-i', input_path,
            '-c:v', 'libx264',  # H.264 video codec
            '-preset', 'medium', 
            '-crf', '23',  # Balanced quality and file size
            '-c:a', 'aac',  # AAC audio codec
            '-b:a', '128k',  # Audio bitrate
            output_path
        ]
        
        # Run FFmpeg command
        result = subprocess.run(ffmpeg_command, capture_output=True, text=True)
        
        # Check if FFmpeg command was successful
        if result.returncode == 0:
            return True
        else:
            print(f"FFmpeg preprocessing error: {result.stderr}")
            return False
    
    except Exception as e:
        print(f"Preprocessing error: {e}")
        return False

def upload_video(file_path):
    try:
        # Generate a temporary preprocessed file path
        file_name = os.path.basename(file_path)
        preprocessed_path = os.path.join(
            os.path.dirname(file_path), 
            f"preprocessed_{file_name}"
        )
        
        # Preprocess the video
        if not preprocess_video(file_path, preprocessed_path):
            return {
                "success": False,
                "url": "",
                "error": "Video preprocessing failed"
            }
        
        # Upload the preprocessed video
        upload_response = cloudinary.uploader.upload(
            preprocessed_path,
            resource_type="video",
            folder="processed_videos/",
        )
        
        # Clean up the temporary preprocessed file
        os.remove(preprocessed_path)
        
        return {
            "success": True,
            "url": upload_response.get('secure_url', ''),
            "error": ""
        }
    
    except Exception as e:
        return {
            "success": False, 
            "url": "",
            "error": str(e)
        }