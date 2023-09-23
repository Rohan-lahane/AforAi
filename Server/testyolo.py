import cv2
from PIL import Image
from yolo import yolo
image = cv2.imread("./test.jpg")
img = yolo(image, "fr")
cv2.imshow("output",img)
cv2.waitKey(0)
cv2.destroyAllWindows()