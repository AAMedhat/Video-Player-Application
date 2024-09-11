from flask import Flask, jsonify, send_file, abort
import os
import time
import threading
from flask_cors import CORS
import json  # Added json import to correctly load JSON files

app = Flask(__name__)
CORS(app)

# Path to your output folder where files are stored
OUTPUT_FOLDER = r'C:\Users\medhat6969\OneDrive\Desktop\tubeGUI\output'
VTT_FILE_NAME = 'subtitles.vtt'  # The name of the VTT file to be served

# Function to convert SRT to VTT
def srt_to_vtt(srt_file_path, vtt_file_path):
    try:
        with open(srt_file_path, 'r', encoding='utf-8') as srt_file:
            lines = srt_file.readlines()

        with open(vtt_file_path, 'w', encoding='utf-8') as vtt_file:
            vtt_file.write("WEBVTT\n\n")
            for line in lines:
                if '-->' in line:
                    line = line.replace(',', '.')
                vtt_file.write(line)

        print(f"Conversion successful. VTT file saved as: {vtt_file_path}")
        os.remove(srt_file_path)
        print(f"Deleted original SRT file: {srt_file_path}")
        return True
    except Exception as e:
        print(f"An error occurred while converting {srt_file_path}: {e}")
        return False

# Function to monitor the folder for new SRT files
def monitor_folder(directory):
    print(f"Monitoring {directory} for SRT files...")
    while True:
        try:
            for filename in os.listdir(directory):
                if filename.endswith('.srt'):
                    srt_file_path = os.path.join(directory, filename)
                    vtt_file_path = os.path.join(directory, VTT_FILE_NAME)  # Always save as subtitles.vtt
                    if srt_to_vtt(srt_file_path, vtt_file_path):
                        print(f"Processed: {filename}")
                    else:
                        print(f"Failed to process: {filename}")
        except Exception as e:
            print(f"Error during folder monitoring: {e}")

        time.sleep(10)

# Start the folder monitoring in a separate thread
def start_folder_monitoring():
    directory = OUTPUT_FOLDER  # The directory to monitor for SRT files
    monitor_thread = threading.Thread(target=monitor_folder, args=(directory,))
    monitor_thread.daemon = True  # Ensures the thread will exit when the main program exits
    monitor_thread.start()

# Flask route to serve the fixed subtitles.vtt file
@app.route('/subtitles', methods=['GET'])
def get_subtitles():
    # Always serve the same subtitles.vtt file
    file_path =  os.path.join(OUTPUT_FOLDER, 'subtitles.vtt')

    # Check if the file exists
    if not os.path.exists(file_path):
        abort(404, description=f"File {VTT_FILE_NAME} not found")

    return send_file(file_path, mimetype='text/vtt')

# Flask route to serve other files
@app.route('/file/<filename>', methods=['GET'])
def get_file(filename):
    # Construct the full path to the file
    file_path = os.path.join(OUTPUT_FOLDER, filename)

    # Check if the file exists
    if not os.path.exists(file_path):
        abort(404, description=f"File {filename} not found")

    # Serve the file content based on its type
    if filename.endswith('.json'):
        try:
            with open(file_path, 'r') as json_file:
                content = json.load(json_file)  # Properly load the JSON file
                return jsonify(content)  # Return JSON response as an object
        except Exception as e:
            abort(500, description=f"Error loading JSON file: {str(e)}")
    elif filename.endswith('.txt'):
        # Serve .txt files as plain text
        return send_file(file_path, mimetype='text/plain')

if __name__ == '__main__':
    # Start the folder monitoring thread before starting Flask
    start_folder_monitoring()

    # Start the Flask app
    app.run(debug=True)
