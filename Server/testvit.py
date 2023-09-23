from PIL import Image
from vitgpt import vitgpt
image = Image.open("test.jpg")
captions = vitgpt(image,'ar')
print(captions)