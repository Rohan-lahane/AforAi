import requests
from dotenv import load_dotenv
import os

load_dotenv()

def translateapi(sentence='', language='ar'):
    url = "https://google-translate105.p.rapidapi.com/v1/rapid/translate"
    # print("\n api key is :: ", os.getenv("XRAPIDAPIKEY"), "\n")
    payload = {
        "text": sentence,  # Use the provided sentence parameter instead of a hardcoded value
        "to_lang": language,  # Use the provided language parameter instead of a hardcoded value
        "from_lang": "en"
    }
    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": os.getenv("XRAPIDAPIKEY"),
        "X-RapidAPI-Host": "google-translate105.p.rapidapi.com"
    }

    response = requests.post(url, data=payload, headers=headers)
    response_data = response.json()

    # Check if the response was successful
    if response.status_code == 200 and "translated_text" in response_data:
        translated_text = response_data["translated_text"]
        print("Translated Text:", translated_text)
        
    else:
        print("Translation failed. Response:", response_data)

    return response_data["translated_text"]

# Test the function
translateapi("hello", "ar")
