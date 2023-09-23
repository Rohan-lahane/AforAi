from typing import Any
from PIL import Image
import torch
import cv2
import numpy as np
import base64

# from translate import translateapi

model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
def yolo(image: Any, language: str) -> Any:
    print("Hi YOLO")
    # image = image.convert("RGB") 
    # image = np.array(image)
    
    # Perform object detection
    try:
      results = model(image)
    except Exception as e:
        return {"error in yolo model": str(e)}
    # Obtain bounding box coordinates, labels, and confidence scores
    boxes = results.xyxy[0].numpy()
    boxes_copy = boxes[:4].copy()
    labels = results.pandas().xyxy[0]['name'].tolist()
    labels_copy = labels[:4].copy()
    confidences = boxes[:, 4]
    # Draw bounding boxes and labels on the image
    for box, label, confidence in zip(boxes_copy, labels_copy, confidences):
      x1, y1, x2, y2 = box[:4]  # Extract the first four values
      # cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
      # cv2.putText(image, f"{label}: {confidence:.2f}", (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
      # Get text size and adjust the box dimensions accordingly
      text = f"{label}"
      text_size, _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 0.8, 2)
      box_width = text_size[0] + 10
      box_height = text_size[1] + 10
      overlay = image.copy()
      overlay1 = image.copy()
      opacity = 0.4  # Adjust the opacity value as needed (0.0 to 1.0)
      opacity1 = 0.6
      cv2.rectangle(overlay, (int(x1), int(y1)), (int(x2), int(y2)), (255, 255, 255, 128), -1)  # Transparent white box
      cv2.rectangle(overlay, (int(x1), int(y1)), (int(x2), int(y2)), (0, 0, 0), 4)
      cv2.rectangle(overlay1, (int(x1), int(y1)), (int(x1) + box_width, int(y1) - box_height), (255, 255, 255, 128), -1)
      cv2.rectangle(overlay1, (int(x1), int(y1)), (int(x1) + box_width, int(y1) - box_height), (0, 0, 0), 2)
      image = cv2.addWeighted(overlay, opacity, image, 1 - opacity, 0)  # Combine overlay with original image
      image = cv2.addWeighted(overlay1, opacity1, image, 1-opacity1, 0)
      cv2.putText(image, f"{label}", (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 0), 2)  # Thicker black text
    
   
      image = np.array(image)
      # image = base64.b64encode(image).decode('utf-8')
      image = base64.b64encode(cv2.imencode('.jpg', image)[1]).decode()
    return image