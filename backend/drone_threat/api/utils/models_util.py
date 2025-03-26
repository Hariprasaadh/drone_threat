import cv2
import os
from ultralytics import YOLO

def detect_objects(video_url, output_dir, output_filename):
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Prepare full output path
    full_output_path = os.path.join(output_dir, output_filename+".mp4")
    
    try:
        # Load YOLO model
        model = YOLO("yolov8n.pt")
        
        # Open input video
        cap = cv2.VideoCapture(video_url)
        if not cap.isOpened():
            return {
                'success': False,
                'output_path': None,
                'error': f"Could not open video file: {video_url}"
            }

        # Get video properties
        frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = int(cap.get(cv2.CAP_PROP_FPS))

        # Initialize VideoWriter (MP4 format)
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(full_output_path, fourcc, fps, (frame_width, frame_height))

        # Process frames
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
                
            results = model(frame)
            rendered_frame = results[0].plot()
            out.write(rendered_frame)

        # Release resources
        cap.release()
        out.release()
        
        # Verify output was created
        if not os.path.exists(full_output_path):
            return {
                'success': False,
                'output_path': None,
                'error': "Output file was not created"
            }

        return {
            'success': True,
            'output_path': full_output_path,
            'error': None
        }

    except Exception as e:
        return {
            'success': False,
            'output_path': None,
            'error': str(e)
        }