import os
from ultralytics import YOLO
from filterpy.kalman import KalmanFilter
from ultralytics import YOLO
import cv2
import numpy as np
from collections import defaultdict, deque
import json
import time

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

class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NumpyEncoder, self).default(obj)

def initialize_kalman():
    kf = KalmanFilter(dim_x=4, dim_z=2)
    kf.F = np.array([[1, 0, 1, 0],
                     [0, 1, 0, 1],
                     [0, 0, 1, 0],
                     [0, 0, 0, 1]])
    kf.H = np.array([[1, 0, 0, 0],
                     [0, 1, 0, 0]])
    kf.P *= 1000.
    kf.R = np.eye(2) * 5
    kf.Q = np.eye(4) * 0.1
    return kf

from filterpy.kalman import KalmanFilter
from ultralytics import YOLO
import cv2
import numpy as np
from collections import defaultdict, deque
import json
import time

def initialize_kalman():
    kf = KalmanFilter(dim_x=4, dim_z=2)
    kf.F = np.array([[1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0], [0, 0, 0, 1]])
    kf.H = np.array([[1, 0, 0, 0], [0, 1, 0, 0]])
    kf.P *= 1000
    kf.R *= 5
    kf.Q *= 0.01
    kf.x = np.zeros((4, 1))
    return kf

def detect_objects(video_url, output_dir, output_filename):

    model = YOLO("yolov8n.pt")
    cap = cv2.VideoCapture(video_url)

    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_time = 1 / fps
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    output_path = f"{output_dir}/{output_filename}.mp4"
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (frame_width, frame_height))

    trajectories = defaultdict(list)
    kalman_filters = defaultdict(initialize_kalman)
    previous_velocities = defaultdict(lambda: (0, 0))
    speed_records = defaultdict(lambda: deque(maxlen=5))
    trajectory_json_array = []
    last_json_time = 0
    JSON_INTERVAL = 0.5

    DRONE_CLASS_ID = 4
    NO_FLY_ZONES = [(200, 150, 400, 350)]
    PIXEL_TO_METER = 0.02

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        current_time = cap.get(cv2.CAP_PROP_POS_MSEC) / 1000.0
        results = model.track(frame, persist=True, verbose=False)
        annotated_frame = frame.copy()

        if results[0].boxes.id is not None:
            boxes = results[0].boxes.xyxy.cpu().numpy()
            track_ids = results[0].boxes.id.cpu().numpy()
            classes = results[0].boxes.cls.cpu().numpy()
            confidences = results[0].boxes.conf.cpu().numpy()

            current_trajectories = {}

            for box, track_id, cls, conf in zip(boxes, track_ids, classes, confidences):
                if cls == DRONE_CLASS_ID:
                    x1, y1, x2, y2 = map(int, box)
                    centroid = np.array([[(x1 + x2) / 2], [(y1 + y2) / 2]], dtype=np.float32)

                    kf = kalman_filters[track_id]
                    kf.update(centroid)
                    kf.predict()
                    predicted_pos = (int(kf.x[0].item()), int(kf.x[1].item()))
                    trajectories[track_id].append(predicted_pos)

                    velocity_x, velocity_y = kf.x[2].item(), kf.x[3].item()
                    prev_vx, prev_vy = previous_velocities[track_id]
                    velocity_magnitude = np.sqrt(velocity_x ** 2 + velocity_y ** 2)
                    velocity_magnitude = max(velocity_magnitude, 1e-5)
                    
                    speed_mps = velocity_magnitude * PIXEL_TO_METER / frame_time
                    speed_kmph = speed_mps * 3.6
                    
                    speed_records[track_id].append(float(speed_kmph))
                    avg_speed = float(np.mean(speed_records[track_id]))
                    previous_velocities[track_id] = (velocity_x, velocity_y)

                    is_malicious = False
                    if avg_speed > 50:
                        is_malicious = True

                    for zone in NO_FLY_ZONES:
                        x_min, y_min, x_max, y_max = zone
                        if x_min <= predicted_pos[0] <= x_max and y_min <= predicted_pos[1] <= y_max:
                            is_malicious = True
                            break

                    acceleration = np.sqrt((velocity_x - prev_vx) ** 2 + (velocity_y - prev_vy) ** 2)
                    if acceleration > 20:
                        is_malicious = True

                    if len(trajectories[track_id]) > 5:
                        x_vals = [p[0] for p in trajectories[track_id][-5:]]
                        y_vals = [p[1] for p in trajectories[track_id][-5:]]
                        if np.std(x_vals) > 30 or np.std(y_vals) > 30:
                            is_malicious = True

                    if len(trajectories[track_id]) > 10:
                        x_vals = [p[0] for p in trajectories[track_id][-10:]]
                        y_vals = [p[1] for p in trajectories[track_id][-10:]]
                        if max(x_vals) - min(x_vals) < 10 and max(y_vals) - min(y_vals) < 10:
                            is_malicious = True

                    current_trajectories[track_id] = {
                        "position": predicted_pos,
                        "speed_kmph": float(avg_speed),
                        "is_malicious": is_malicious,
                        "confidence": float(conf),
                        "timestamp": float(current_time)
                    }

                    box_color = (0, 0, 255) if is_malicious else (0, 100, 0)
                    threat_text = "*MALICIOUS DRONE - ALERT*" if is_malicious else "Safe Drone"

                    cv2.rectangle(annotated_frame, (x1, y1), (x2, y2), box_color, 2)
                    text = f"ID: {track_id} | Speed: {avg_speed:.1f} km/h | Conf: {conf:.2f}"
                    cv2.putText(annotated_frame, text, (x1, y1 - 20),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, box_color, 2)
                    cv2.putText(annotated_frame, threat_text, (x1, y1 - 40),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, box_color, 2)

            if current_time - last_json_time >= JSON_INTERVAL and current_trajectories:
                trajectory_snapshot = {
    "timestamp": float(current_time),
    "drones": [
        {
            "track_id": int(track_id),
            "x": int(data["position"][0]),  # Ensure int
            "y": int(data["position"][1]),  # Ensure int
            "speed_kmph": float(data["speed_kmph"]),  # Ensure float
            "is_malicious": bool(data["is_malicious"]),  # Ensure boolean
            "confidence": float(data["confidence"])  # Ensure float
        }
        for track_id, data in current_trajectories.items()
    ]
}

                trajectory_json_array.append(trajectory_snapshot)
                last_json_time = current_time
                print(json.dumps(trajectory_snapshot, indent=2))

        for track_id, points in trajectories.items():
            if len(points) > 1:
                for i in range(1, len(points)):
                    cv2.line(annotated_frame, points[i-1], points[i], (0, 255, 255), 2)
                cv2.circle(annotated_frame, points[-1], 5, (255, 0, 0), -1)

        out.write(annotated_frame)

    cap.release()
    out.release()

    with open("trajectory_data.json", "w") as f:
        json.dump(trajectory_json_array, f, indent=2)

    return {
        "video_path": output_path,
        "json_data": trajectory_json_array
    }
