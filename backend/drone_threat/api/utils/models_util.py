import cv2
import os
from django.conf import settings
from ultralytics import YOLO

def detect_objects(video_url):
    # Load YOLO model
    model = YOLO("yolov8n.pt")  # Replace with your model path
    
    # Open the input video
    cap = cv2.VideoCapture(video_url)
    if not cap.isOpened():
        raise ValueError("Could not open video file.")

    # Prepare output video path in Django's media folder
    output_filename = "processed_" + os.path.basename(video_url)
    output_path = os.path.join(settings.MEDIA_ROOT, output_filename)

    # Get video properties (for VideoWriter)
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))

    # Initialize VideoWriter (H.264 codec)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # or 'avc1' for H.264
    out = cv2.VideoWriter(output_path, fourcc, fps, (frame_width, frame_height))

    # Process each frame
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Run YOLO detection
        results = model(frame)
        rendered_frame = results[0].plot()  # Get frame with bounding boxes

        # Write the processed frame to output video
        out.write(rendered_frame)

    # Release resources
    cap.release()
    out.release()

    # Return the URL for the processed video
    media_url = os.path.join(settings.MEDIA_ROOT, output_filename)
    return {"status": "success", "output_url": media_url}