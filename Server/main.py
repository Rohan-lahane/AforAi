import requests
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
import boto3
import base64
# from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.cors import CORSMiddleware

from vitgpt import vitgpt
from yolo import yolo

import io
from PIL import Image, ImageCms

import cv2
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # Add the client's origin URL
    allow_origins=["http://localhost:3000", "http://localhost:3000/dashboard"],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


@app.get("/")
def get_root():
    return {"message": "hello worldd!"}


@app.post("/labelimage")
async def get_image_labels(imageUrl: bytes = File(...), language: str = Form(...)):
    try:

        # print("hi backend 0 ", language)
        image_array = np.asarray(bytearray(imageUrl), dtype=np.uint8)
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)  # Read the image using OpenCV
        print("hi backend")
        captions = vitgpt(image, language)

        yolo_output = yolo(image, language)
        
        return {
                # "image": imageUrl,
                "image" : yolo_output,
                # "image": image,
                "message": "captions"
            }
        

    except Exception as e:
        print(str(e))
        return {"error in main": str(e)}