document.getElementById('submitButton').addEventListener('click', async function() {
    var searchQuery = document.getElementById('searchQuery').value;
    if (searchQuery) {
        callYourAPI(searchQuery).then(response => {
            console.log('API Response:', response);
            checkAndLoadFiles(); // Simulated file checking
        }).catch(error => {
            console.error('API call failed:', error);
        });
    } else {
        alert('Please enter a search query.');
    }
});

// Get all panel buttons
const panelButtons = document.querySelectorAll('.panel-button');

// Add click event listener to each button
panelButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Reset the icon color of all buttons to white
    panelButtons.forEach(btn => btn.querySelector('i').style.color = '#92929D'); // Default icon color
    
    // Set the icon color of the clicked button to #2EC5B6
    this.querySelector('i').style.color = '#2EC5B6';
  });
});

async function callYourAPI(query) {
    return fetch('http://localhost:5000/search', {
        method: 'POST', // Assuming POST, adjust if necessary
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: query })
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
}

async function checkAndLoadFiles() {
    // Simulated delay to wait for file creation
    setTimeout(() => {
        console.log('Assuming files are now ready');
        loadVideo();
    }, 20);
}

document.getElementById('panel-button1').addEventListener('click', function() {
    displayFileContent('topic.txt', 'text');
});

document.getElementById('panel-button2').addEventListener('click', function() {
    displayFileContent('summary.txt', 'text');
});

document.getElementById('panel-button3').addEventListener('click', function() {
    displayFileContent('keywords.json', 'json');
});

function displayFileContent(fileName, fileType) {
    const filePath = `http://localhost:5000/file/${fileName}`;  // Fetch from Flask API

    fetch(filePath)
        .then(response => {
            if (response.ok) {
                if (fileName.endsWith('.json')) {
                    return response.json();  // Parse JSON response for JSON files
                } else {
                    return response.text();  // Parse text response for other file types
                }
            } else {
                throw new Error('File not found');
            }
        })
        .then(data => {
            const cardContainer = document.getElementById('card-container');
            cardContainer.innerHTML = '';  // Clear the container

            if (fileType === 'json' && typeof data === 'object' && data.keywords) {
                // Handle JSON content with specific formatting for "keywords"
                let htmlContent = `<h3>Keywords</h3><ul>`;
                data.keywords.forEach(keyword => {
                    htmlContent += `<li>${keyword}</li>`;
                });
                htmlContent += `</ul>`;

                cardContainer.innerHTML = `<div class='card visible'>${htmlContent}</div>`;
            } else {
                // Handle other content as plain text
                cardContainer.innerHTML = `<div class='card visible'>${data}</div>`;
            }
        })
        .catch(error => {
            console.error('Failed to load file:', error);
            alert('Failed to load file from server.');
        });
}

function loadVideo() {
    console.log("loadVideo function called");
    var videoPlayer = document.getElementById('videoPlayer');
    var videoSource = document.getElementById('videoSource');
    var subtitleTrack = document.getElementById('subtitleTrack');

    // Set the video file URL (adjust to your local setup if necessary)
    videoSource.src = 'output/video.mp4';  // Assuming video.mp4 is hosted
    videoPlayer.load();  // Reload the video with the new source

    // Fetch the VTT file from the API
    fetch('http://localhost:5000/subtitles')  // Fetch the subtitle file from your API
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load subtitles');
            }
            return response.blob(); // Get the VTT file as a Blob
        })
        .then(vttBlob => {
            // Create a URL for the VTT file and set it in the track element
            const vttUrl = URL.createObjectURL(vttBlob);
            subtitleTrack.src = vttUrl;
            videoPlayer.load(); // Reload the video with the new subtitle track
            videoPlayer.play(); // Automatically play the video
            console.log("Subtitle track set to: " + subtitleTrack.src);
        })
        .catch(error => {
            console.error('Error fetching subtitles:', error);
        });
    

}
