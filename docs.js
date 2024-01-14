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


function createDeleteAndDownloadButtons(url) {
    let containerDiv = document.createElement("div");

    // Create delete button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.style.background= "linear-gradient(0deg, rgb(108, 10, 18), rgb(255, 16, 28))";    deleteButton.style.color = "white";
    deleteButton.style.borderRadius = "6px";
    deleteButton.style.borderColor = "red";
    deleteButton.style.marginTop = "1%";
    deleteButton.addEventListener("click", function () {
        // Handle delete functionality
        deleteFile(url);
    });


    containerDiv.appendChild(deleteButton);
    // containerDiv.appendChild(downloadButton);

    return containerDiv;
}

function displayPDFs(urls) {
    // Clear the current content
    img.innerHTML = "";

    // Filter URLs based on the conditions (pdf or .doc)
    const filteredUrls = urls.filter(url => url.toLowerCase().includes('.pdf') || url.toLowerCase().includes('doc') || url.toLowerCase().includes('docx') || url.toLowerCase().includes('xls') || url.toLowerCase().includes('xlsx') || url.toLowerCase().includes('ppt')  || url.toLowerCase().includes('pptx')  || url.toLowerCase().includes('csv')  || url.toLowerCase().includes('txt'));

    // Display filtered PDFs
    filteredUrls.forEach((url) => {
        let iframeElement = document.createElement("iframe");
        iframeElement.setAttribute("src", url);
        iframeElement.style.width = "100%"; // Set width as needed
        iframeElement.style.height = "400px";
        iframeElement.style.borderRadius = "12px" // Set height as needed

        // Extract the file name from the URL
        let decodedUrl = decodeURIComponent(url);
        let fileName = decodedUrl.split("/").pop().split("?")[0]; // Extracts "mohit.pdf" from the URL

        // Create a div for displaying file name
        let fileNameDiv = document.createElement("div");
        fileNameDiv.style.fontSize = "18px";
        fileNameDiv.textContent = `File Name: ${fileName}`;

        // Create container div for delete and download buttons
        let buttonsContainer = createDeleteAndDownloadButtons(url);

        img.appendChild(fileNameDiv);
        img.appendChild(iframeElement);
        img.appendChild(buttonsContainer);
    });
}

function deleteFile(url) {
    // Extract the filename from the URL
    let filename = url;
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
        displayPDFs(storedUrls);
        // Update file counts
        let fileCounts = countFilesByType(storedUrls);
        displayFileCounts(fileCounts);
    }).catch(function (error) {
        console.error("Error deleting file: ", error);
    });
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
    displayPDFs(storedUrls);
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
      'Home': goHome,
      'show me my images': showImages,
      'show me my Videos': showVideos,
      'show me my Audio files': showAudio,
    };

    function goHome(){

        window.location.href = "home.html";
    }

    function showVideos(){

        window.location.href = "videos.html";
    }

    function showImages(){

        window.location.href = "images.html";
    }

    function showAudio(){

        window.location.href = "audio.html";
    }
  
    // Add our commands to annyang
    annyang.addCommands(commands);
  
    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  }