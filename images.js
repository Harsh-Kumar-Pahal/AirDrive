// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDP98xM0H4cw38hJMy8S8jlfh4fDHRKuiE",
    authDomain: "airdrive-x.firebaseapp.com",
    projectId: "airdrive-x",
    storageBucket: "airdrive-x.appspot.com",
    messagingSenderId: "461429067685",
    appId: "1:461429067685:web:85825b87e420d0dee9e24c",
    measurementId: "G-SV9X7DLYQW"
  };

firebase.initializeApp(firebaseConfig);

var img = document.querySelector('.image');
var fileText = document.querySelector(".fileText"); 

var fileItem;
var fileName;

const storage = firebase.storage();
const storageRef = storage.ref();

function getFile(e){
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileText.innerHTML = fileName;
}

function getFileExtension(filename) {
    const index = filename.indexOf("?");
    const actualFileName = index !== -1 ? filename.substring(0, index) : filename;
    return actualFileName.split(".").pop().toLowerCase();
}


function displayImages(urls) {
    // Clear the current images
    img.innerHTML = "";

    // Filter URLs based on the conditions (png or jpg)
    const filteredUrls = urls.filter(url => url.toLowerCase().includes('png') || url.toLowerCase().includes('jpg') || url.toLowerCase().includes('jpeg') || url.toLowerCase().includes('gif')  || url.toLowerCase().includes('bmp') || url.toLowerCase().includes('tiff') || url.toLowerCase().includes('tif') || url.toLowerCase().includes('webp') || url.toLowerCase().includes('svg'));

    // Display filtered images
    filteredUrls.forEach((url) => {
        let imageElement = document.createElement("img");
        imageElement.setAttribute("src", url);
        img.appendChild(imageElement);

        // Extract the file name from the URL
        let decodedUrl = decodeURIComponent(url);
        let fileName = decodedUrl.split("/").pop().split("?")[0]; // Extracts "mohit.png" from the URL

        // Create a div for displaying file name
        let fileNameDiv = document.createElement("div");
        fileNameDiv.style.transform = "translate(150px, 40px)";
        // fileNameDiv.style.transform = "translateY(70px)";
        fileNameDiv.style.backgroundColor = "white";
        fileNameDiv.style.borderRadius = "4px"
        fileNameDiv.style.width = "50%"
        fileNameDiv.style.padding = "1%"
        fileNameDiv.style.textAlign = "left";
        fileNameDiv.style.boxShadow = "1px 1px 5px black inset"
        // fileNameDiv.style.transform = "translateY(70px)";
        fileNameDiv.style.fontSize = "75%"
        fileNameDiv.textContent = `${fileName}`;

        // Create a div for displaying file size
        let fileSizeDiv = document.createElement("div");
        getFileSize(urls, fileSizeDiv);

        img.appendChild(fileNameDiv);
        img.appendChild(imageElement);

        // Create and append delete button for each image
        let deleteButton = createDeleteButton(url);
        img.appendChild(deleteButton);
    });
}


function createDeleteButton(url) {
    let buttonContainer = document.createElement("div");

    // Create download button
    let downloadButton = document.createElement("button");
    downloadButton.textContent = "Download";
    downloadButton.style.background = "linear-gradient(0deg, rgb(9, 87, 150), rgb(0, 204, 255))";
    downloadButton.style.borderColor = "cyan"
    downloadButton.style.borderRadius = "6px"
    downloadButton.style.padding = "3px 6px";
    downloadButton.style.color = "white";
    downloadButton.style.marginRight = "10px"; // Add margin between buttons
    downloadButton.addEventListener("click", function () {
        // Handle download functionality
        downloadFile(url);
    });

    // Create delete button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.background= "linear-gradient(0deg, rgb(108, 10, 18), rgb(255, 16, 28))";
    deleteButton.style.color = "#ffffff"; // White text color
    deleteButton.style.borderRadius = "6px";
    deleteButton.style.borderColor = "red";
    // deleteButton.style.borderColor = "white"; // No border
    deleteButton.style.padding = "4px 10px"; // Padding
    deleteButton.style.cursor = "pointer"; // Cursor style

    // Add event listener for delete functionality
    deleteButton.addEventListener("click", function () {
        // Extract the filename from the URL
        let filename = url
        // Get the storage reference
        let storageRef = firebase.storage().refFromURL(url);
        // Delete the file from Firebase Storage
        storageRef.delete().then(function () {
            console.log("File deleted successfully!");
            // Remove the URL from local storage
            let storedUrls = JSON.parse(localStorage.getItem("imageUrls")) || [];
            storedUrls = storedUrls.filter(item => item !== url);
            localStorage.setItem("imageUrls", JSON.stringify(storedUrls));
            // Redisplay the images
            displayImages(storedUrls);
            // Update file counts
            let fileCounts = countFilesByType(storedUrls);
            displayFileCounts(fileCounts);
        }).catch(function (error) {
            console.error("Error deleting file: ", error);
        });
    });

    buttonContainer.appendChild(downloadButton);
    buttonContainer.appendChild(deleteButton);

    return buttonContainer;
}

function downloadFile(url) {
    var a = document.createElement('a');
    a.href = url;
    let decodedUrl = decodeURIComponent(url);
    let fileName = decodedUrl.split("/").pop().split("?")[0];
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}







function countFilesByType(storedUrls) {
    let fileCounts = {};

    storedUrls.forEach(url => {
        let fileType = getFileExtension(url);
        if (fileCounts[fileType]) {
            fileCounts[fileType]++;
        } else {
            fileCounts[fileType] = 1;
        }
    });

    return fileCounts;
}

function displayFileCounts(fileCounts) {
    // Assuming you have a div element with id "file-counts" to display counts
    let fileCountsDiv = document.getElementById('file-counts');
    fileCountsDiv.innerHTML = '';

    Object.keys(fileCounts).forEach(fileType => {
        let countDiv = document.createElement('div');
        countDiv.textContent = `${fileType}: ${fileCounts[fileType]}`;
        fileCountsDiv.appendChild(countDiv);
    });
}

window.onload = function () {
    // Get stored image URLs from localStorage
    const storedUrls = JSON.parse(localStorage.getItem("imageUrls")) || [];

    // Count files by type
    const fileCounts = countFilesByType(storedUrls);

    // Display file counts
    displayFileCounts(fileCounts);

    // Display all images
    displayImages(storedUrls);
};

function getFileSize(url, sizeDiv) {
    let xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let size = xhr.getResponseHeader("Content-Length");
                sizeDiv.textContent = `File Size: ${formatBytes(size)}`;
            } else {
                sizeDiv.textContent = "File Size: N/A";
            }
        }
    };
    xhr.send(null);
}

// Function to format bytes into a human-readable format
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
      'download':down,
      'Home': goHome,
      'show me my Documents': showDoc,
      'show me my Videos': showVideo,
      'show me my Audio files': showAudio,
    };

    function down(url){
        downloadFile(url);
    }

    function goHome(){

        window.location.href = "home.html";
    }

    function showDoc(){

        window.location.href = "docs.html";
    }

    function showVideo(){

        window.location.href = "video.html";
    }

    function showAudio(){

        window.location.href = "audio.html";
    }
  
    // Add our commands to annyang
    annyang.addCommands(commands);
  
    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  }