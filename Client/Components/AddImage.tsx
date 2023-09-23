"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Webcam, { WebcamProps } from "react-webcam";
import axios from "axios";

const AddImage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [returnedImage, setReturnedImage] = useState<string | undefined>("");
  const webcamRef = useRef<Webcam | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [url, setUrl] = useState<string | null>(null);
  const [openCam, setOpenCam] = useState<boolean>(false);
  const [img, setImg] = useState<boolean>(false);
  const [caption, setCaption] = useState<string | null>("");

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();

    console.log("say cheese ", imageSrc);
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  const handleImageUpload = async (language: string, selectedImage: File) => {
    if (!selectedImage) {
      return;
    }

    console.log("selected image: ", selectedImage);

    try {
      const formData = new FormData();
      formData.append("imageUrl", selectedImage);
      formData.append("language", language);

      const response = await axios.post(
        "http://localhost:8000/labelimage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // const { responseImage, responseString } = response.data;
      const responseImage = `data:image/jpeg;base64,${response.data.image}`;
      const responseString = response.data.message;
      console.log("response data: ", responseImage);
      if (responseImage) {
        setReturnedImage(responseImage);
      }
      console.log("Response string:", response.data);
      setCaption(response.data.message);
      console.log(returnedImage);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleget = async () => {
    try {
      const response = await axios.get("http://localhost:8000/");
      console.log("get response", response?.data);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedImage(file);
    }
  };

  async function downloadImageFromUrl(
    url: string,
    fileName: string
  ): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName);
  }

  const saveCamImg = (url: string | null) => {
    if (url) {
      downloadImageFromUrl(url, "screenshot.jpg").then((file) => {
        setSelectedImage(file);
      });
    }
    setOpenCam(false);
  };

  const handleDevices = useCallback((mediaDevices: MediaDeviceInfo[]) => {
    setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"));
  }, []);

  const onUserMedia = (e: MediaStream) => {
    console.log("media stream: ", e);
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <div>
      AddImage
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected Image"
            style={{ width: "10%", height: "auto" }}
          />
          <button onClick={() => handleImageUpload("en", selectedImage)}>
            Learn !
          </button>
        </div>
      )}
      <button onClick={() => setOpenCam(!openCam)}>
        {openCam ? "close" : "open cam"}
      </button>
      <button onClick={handleget}>gett</button>
      {openCam &&
        devices.map((device, key) => (
          <div key={key}>
            <Webcam
              width={"30%"}
              audio={false}
              videoConstraints={{ deviceId: device.deviceId }}
              screenshotFormat="image/jpeg"
              onUserMedia={onUserMedia}
              ref={webcamRef}
              mirrored={true}
            />
            {device.label || `device${key}`}

            <button onClick={capturePhoto}>Click! </button>

            <button onClick={() => saveCamImg(url)}>save</button>

            {url && <img src={url} alt="image screenshot" />}
          </div>
        ))}
      {img && (
        <div>
          <img src={returnedImage} alt="image screenshot" />
          {caption}
        </div>
      )}
      <button onClick={() => setImg(!img)}>show</button>
    </div>
  );
};

export default AddImage;
