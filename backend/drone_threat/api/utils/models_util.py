from ultralytics import YOLO  
import cv2  

model = YOLO("yolov8n.pt")  

def detect_objects(video_url):  
    cap = cv2.VideoCapture("https://res.cloudinary.com/dobfrs8nb/video/upload/v1742986345/VIDEO-2025-03-26-16-15-56_dntso3.mp4")  

    while cap.isOpened():  
        ret, frame = cap.read()  
        if not ret:
            break  

        results = model(frame)  
        frame = results[0].plot()   

        cv2.imshow("Drone Detection", frame)  
        if cv2.waitKey(1) & 0xFF == ord('q'):  
            break  

    cap.release()  
    cv2.destroyAllWindows()