import cloudinary
import cloudinary.api

# Configure Cloudinary
cloudinary.config(
    cloud_name="dobfrs8nb",
    api_key="496493297956177",
    api_secret="PPP3s3yeSvcgrJNK1vC7ndwvqUQ",
    secure=True
)

def get_video_by_public_id(public_id):
    try:
        # Get the resource directly using the full Public ID
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

