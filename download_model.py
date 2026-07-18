import urllib.request
import zipfile
import os
import sys

url = "https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip"
zip_path = "model.zip"

print("Downloading Vosk English Model (~40MB)...")
try:
    urllib.request.urlretrieve(url, zip_path)
    print("Download completed successfully!")
except Exception as e:
    print(f"Error downloading model: {e}")
    sys.exit(1)

print("Extracting model...")
try:
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(".")
    print("Extraction completed!")
except Exception as e:
    print(f"Error extracting zip: {e}")
    sys.exit(1)

# Clean up zip
if os.path.exists(zip_path):
    os.remove(zip_path)

# Rename to 'model' for clean loading in Electron main.js
extracted_folder = "vosk-model-small-en-us-0.15"
if os.path.exists(extracted_folder):
    if os.path.exists("model"):
        import shutil
        shutil.rmtree("model")
    os.rename(extracted_folder, "model")
    print("Vosk model is renamed to 'model' and ready!")
else:
    print(f"Warning: Expected extracted folder '{extracted_folder}' not found.")
