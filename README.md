# IPTV Video Player Application

A sleek and modern video player web application designed for ease of use and flexibility.

## Overview

PTV Video Player Application allows users to search for courses or videos, play videos with subtitle support, and view additional content such as topics, summaries, and keywords related to the video. Built using a combination of HTML, CSS, JavaScript, and Python, this application offers a clean and responsive UI.

## Features

- **Video Player with Subtitles**: Supports MP4 videos with the ability to load and display subtitles (VTT format).
- **Interactive Sidebar**: Icons for functionalities like viewing topics, summaries, and keywords.
- **Search Functionality**: Allows users to search for courses or videos via an API call.
- **Dynamic Content Loading**: Loads and displays video-related content (topics, summaries, keywords) dynamically through JSON and text files fetched from a server.
- **Responsive Design**: Optimized for various screen sizes with a modern dark-themed interface.
- **Figma**: Used for designing the mobile application UI.
-  ![image](https://github.com/user-attachments/assets/6ae932bd-31b2-4fed-8f74-65947df3c4f0)


## Files

1. **HTML File (home.html)**
   - Contains the main structure of the application.
   - Includes the sidebar for navigation, search bar, and the video player.
   - Links to CSS for styling and JavaScript for functionality.
   
2. **CSS File (styles.css)**
   - Defines the dark theme styling for the application.
   - Customizes the sidebar, search bar, video player, and content cards.
   - Utilizes flexbox for a responsive layout.

3. **JavaScript File (script.js)**
   - Handles user interactions, such as clicking buttons and submitting search queries.
   - Fetches data from an API and dynamically updates the UI.
   - Loads video and subtitles and allows interaction with topics, summaries, and keywords.

4. **Python Script (vttConvertal.py)**
   - Provides server-side functionalities such as handling video and subtitle file requests.
   - Generates and serves VTT files for video subtitles.

## How to Run the Project

### Prerequisites

- A web browser (Chrome, Firefox, etc.).
- A local server or setup that supports Python Flask to handle API requests.
- Ensure all necessary files (video, subtitle, JSON) are correctly placed in the expected directories.

### Steps

1. Clone or download the project files.
2. Start a Python Flask server to serve video and subtitle files.
3. Run the `vttConvertal.py` Python script (or configure a Flask server) to handle API endpoints for fetching videos and subtitles.
4. Open `home.html` in your browser.
5. Use the search bar to search for courses or videos (triggers API requests).
6. Click on sidebar buttons to view topics, summaries, or keywords related to the selected video.

## API Endpoints (Expected)

- `/search`: Handles search queries.
- `/file/{fileName}`: Fetches text, JSON, or video files from the server.
- `/subtitles`: Fetches subtitle files for the video.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript.
- **Backend**: Python (Flask for handling API requests and serving files).
- **Other**: FontAwesome for icons, VTT for subtitle tracks.

## Future Enhancements

- Add support for more video formats.
- Implement real-time video streaming.
- Extend search functionality with more advanced filtering and sorting.
- Improve error handling for better user experience during API calls.

## License

This project is open-source and available for modification.
