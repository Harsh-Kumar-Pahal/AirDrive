var img = document.querySelector('.image');
var fileText = document.querySelector(".fileText"); 


var fileItem;
var fileName;
function getFile(e){
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileText.innerHTML = fileName;
}

function UplodeFile() {

    var fileType = getFileExtension(fileName);


    if(fileType == "png" || fileType == "jpg" || fileType == "jpeg" || fileType == "gif" || fileType == "bmp" || fileType == "tiff" || fileType == "tif" || fileType == "webp" || fileType == "svg" || fileType == "heic"){
        ImagesUploading();
        succesFile();
    }

    else if(fileType == "pdf" || fileType == "doc" || fileType == "docx" || fileType == "xls" || fileType == "xlsx" || fileType == "ppt" || fileType == "pptx" || fileType == "txt" || fileType == "csv"  || fileType == "cpp" || fileType == "java" || fileType == "go" || fileType == "html" || fileType == "js" || fileType == "c"){
        DocsUploading();
        succesFile();
    }

    else if(fileType == "mov" || fileType == "mp4" || fileType == "mkv" || fileType == "webm"){
        VideosUploading();
        succesFile();
    }

    else if(fileType == "mp3" || fileType == "wav"){
        AudioUploading();
        succesFile();
    }

    else{
        DocsUploading();
    }

}



// JavaScript code

// Function to display the alert-like message with a timeout
function succesFile() {
    var alertDiv = document.createElement('div');
    alertDiv.textContent = 'Your file is going to cloud ✅';
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '50%';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translate(-50%, -50%)';
    alertDiv.style.padding = '20px';
    alertDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    alertDiv.style.color = '#fff';
    alertDiv.style.borderRadius = '5px';
    document.body.appendChild(alertDiv);
  
    // Automatically remove the alert-like message after 2 seconds (2000 milliseconds)
    setTimeout(function() {
      alertDiv.parentNode.removeChild(alertDiv);
    }, 20000); // Change 2000 to the desired timeout in milliseconds (e.g., 3000 for 3 seconds)
  }
 
  
  

function ImagesUploading(){
    const fireImages = {
        apiKey: "AIzaSyCicMEb-Q3dHxmjX319nWEqjwCzjg--ZrE",
        authDomain: "airstore-c4fce.firebaseapp.com",
        projectId: "airstore-c4fce",
        storageBucket: "airstore-c4fce.appspot.com",
        messagingSenderId: "733213242091",
        appId: "1:733213242091:web:9116b295e1776d3d8204ae",
        measurementId: "G-BR4NXGHMP9"
      };

      firebase.initializeApp(fireImages);

      let storageRef = firebase.storage().ref("images/" + fileName);
    let uploadTask = storageRef.put(fileItem);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            console.log(snapshot);
        },
        (error) => {
            console.log("Error = " + error);
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                console.log("URL = ", url);

                if (url !== "") {
                    // Get the stored URLs from localStorage or initialize an empty array
                    let storedUrls = JSON.parse(localStorage.getItem("imageUrls")) || [];

                    // Add the new URL to the array
                    storedUrls.push(url);

                    // Store the updated array in localStorage
                    localStorage.setItem("imageUrls", JSON.stringify(storedUrls));

                    // Display all images
                    displayImages(storedUrls);
                    window.location.reload();
                    // localStorage.clear();
                }
            });
        }
    );
}

function DocsUploading(){
    const fireDocs = {
        apiKey: "AIzaSyA8hSMoS0eJwV95-150YLYa7-BiEBzQRE0",
        authDomain: "airx-9a82d.firebaseapp.com",
        projectId: "airx-9a82d",
        storageBucket: "airx-9a82d.appspot.com",
        messagingSenderId: "375800409271",
        appId: "1:375800409271:web:2ab2fd39a257874eb87132",
        measurementId: "G-0S0Z53KH4E"
      };

      firebase.initializeApp(fireDocs);

      let storageRef = firebase.storage().ref("Documents/"+ fileName);
      let uploadTask = storageRef.put(fileItem);
  
      uploadTask.on(
          "state_changed",
          (snapshot) => {
              console.log(snapshot);
          },
          (error) => {
              console.log("Error = " + error);
          },
          () => {
              uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                  console.log("URL = ", url);
  
                  if (url !== "") {
                      // Get the stored URLs from localStorage or initialize an empty array
                      let storedUrls = JSON.parse(localStorage.getItem("imageUrls")) || [];
  
                      // Add the new URL to the array
                      storedUrls.push(url);
  
                      // Store the updated array in localStorage
                      localStorage.setItem("imageUrls", JSON.stringify(storedUrls));
  
                      // Display all images
                      displayImages(storedUrls);
                      window.location.reload();
                      // localStorage.clear();
                  }
              });
          }
      );
}


function VideosUploading(){
    const fireVideo = {
        apiKey: "AIzaSyDP98xM0H4cw38hJMy8S8jlfh4fDHRKuiE",
        authDomain: "airdrive-x.firebaseapp.com",
        projectId: "airdrive-x",
        storageBucket: "airdrive-x.appspot.com",
        messagingSenderId: "461429067685",
        appId: "1:461429067685:web:85825b87e420d0dee9e24c",
        measurementId: "G-SV9X7DLYQW"
      };
    
    firebase.initializeApp(fireVideo);

    let storageRef = firebase.storage().ref("Videos/"+ fileName);
    let uploadTask = storageRef.put(fileItem);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            console.log(snapshot);
        },
        (error) => {
            console.log("Error = " + error);
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                console.log("URL = ", url);

                if (url !== "") {
                    // Get the stored URLs from localStorage or initialize an empty array
                    let storedUrls = JSON.parse(localStorage.getItem("imageUrls")) || [];

                    // Add the new URL to the array
                    storedUrls.push(url);

                    // Store the updated array in localStorage
                    localStorage.setItem("imageUrls", JSON.stringify(storedUrls));

                    // Display all images
                    displayImages(storedUrls);
                    window.location.reload();
                    // localStorage.clear();
                }
            });
        }
    );
}


function AudioUploading(){
    const fireAudio = {
        apiKey: "AIzaSyBMiMbb1Kf0VWF5QtRlqw9ZwUcIT3sTG88",
        authDomain: "drive-eb504.firebaseapp.com",
        projectId: "drive-eb504",
        storageBucket: "drive-eb504.appspot.com",
        messagingSenderId: "889360710958",
        appId: "1:889360710958:web:9ef33bb7c361e3829e8ebf",
        measurementId: "G-PQB335JW6L"
      };

      firebase.initializeApp(fireAudio);


      let storageRef = firebase.storage().ref("Audio/"+ fileName);
      let uploadTask = storageRef.put(fileItem);
  
      uploadTask.on(
          "state_changed",
          (snapshot) => {
              console.log(snapshot);
          },
          (error) => {
              console.log("Error = " + error);
          },
          () => {
              uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                  console.log("URL = ", url);
  
                  if (url !== "") {
                      // Get the stored URLs from localStorage or initialize an empty array
                      let storedUrls = JSON.parse(localStorage.getItem("imageUrls")) || [];
  
                      // Add the new URL to the array
                      storedUrls.push(url);
  
                      // Store the updated array in localStorage
                      localStorage.setItem("imageUrls", JSON.stringify(storedUrls));
  
                      // Display all images
                      displayImages(storedUrls);
                      window.location.reload();
                      // localStorage.clear();
                  }
              });
          }
      );
}


function getFileExtension(filename) {
    const index = filename.indexOf("?");
    const actualFileName = index !== -1 ? filename.substring(0, index) : filename;
    return actualFileName.split(".").pop().toLowerCase();
}


function displayImages(urls) {
    // var fileType = getFileExtension(fileName);
    img.innerHTML = "";
    let startIndex = Math.max(urls.length - 4, 0);

    for (let i = urls.length - 1; i >= startIndex; i--) {
        let imageElement = document.createElement("img");
        imageElement.setAttribute("src", urls[i]);

        


        // Extract the file name from the URL
        let decodedUrl = decodeURIComponent(urls[i]);
        let fileName = decodedUrl.split("/").pop().split("?")[0]; // Extracts "mohit.png" from the URL

        // Create a div for displaying file name
        let fileNameDiv = document.createElement("div");

        fileNameDiv.style.transform = "translate(80px, 15px)";
        fileNameDiv.style.backgroundColor = "white";
        fileNameDiv.style.borderRadius = "4px"
        fileNameDiv.style.width = "50%"
        fileNameDiv.style.padding = "1%"
        fileNameDiv.style.textAlign = "left";
        fileNameDiv.style.boxShadow = "1px 1px 5px black inset"
        // fileNameDiv.style.transform = "translateY(70px)";
        fileNameDiv.style.fontSize = "70%"
        fileNameDiv.textContent = `${fileName}`;

        // Create a div for displaying file size
        let fileSizeDiv = document.createElement("div");
        getFileSize(urls[i], fileSizeDiv);

        img.appendChild(fileNameDiv);
        img.appendChild(imageElement);

        // // Create and append delete button for each image
        // let deleteButton = createDeleteButton(urls[i]);
        // img.appendChild(deleteButton);
    }
}



// ... (rest of your code)




// window.onload = function () {
//     // Get stored image URLs from localStorage
//     const storedUrls = JSON.parse(localStorage.getItem("imageUrls")) || [];

//     // Display all images
//     displayImages(storedUrls);
// };


// ... (your existing code)

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
    let fileCountsDiv = document.getElementById('file-counts');
    fileCountsDiv.innerHTML = '';

    // Display counts on a pie chart
    let pieChartCanvas = document.createElement('canvas');
    pieChartCanvas.id = 'file-counts-pie-chart';
    pieChartCanvas.width = 300; // Set canvas width as needed
    pieChartCanvas.height = 300; // Set canvas height as needed

    fileCountsDiv.appendChild(pieChartCanvas);

    let pieChartData = {
        labels: Object.keys(fileCounts),
        datasets: [{
            data: Object.values(fileCounts),
            backgroundColor: [

                "rgb(255, 228, 181)",
                "rgb(255, 215, 0)",
                "rgb(255, 250, 205)",
                "rgb(127, 255, 212)",

                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(25, 60, 186)',

                "rgb(255, 192, 203)",
                "rgb(128, 0, 128)",
                "rgb(0, 128, 128)",
                "rgb(128, 128, 0)",

                "rgb(255, 99, 71)",
                "rgb(255, 69, 0)",
                "rgb(0, 128, 0)",
                "rgb(50, 205, 50)",

                "rgb(0, 255, 127)",
                "rgb(0, 0, 128)",
                "rgb(173, 255, 47)",
                "rgb(255, 222, 173)",

                'rgb(25, 160, 56)',
                'rgb(125, 60, 6)',
                "rgb(255, 0, 0)",
                "rgb(255, 165, 0)",

                "rgb(0, 0, 255)",
                "rgb(70, 130, 180)",
                "rgb(0, 128, 128)",
                "rgb(0, 255, 255)",

                "rgb(152, 251, 152)",
                "rgb(144, 238, 144)",
                "rgb(0, 0, 139)",
                "rgb(0, 0, 205)"
                // Add more colors as needed
            ],
        }],
    };

    let pieChartOptions = {
        responsive: true,
    };

    let pieChart = new Chart(pieChartCanvas, {
        type: 'pie',
        data: pieChartData,
        options: pieChartOptions,
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
    var command = {
      'select a file': selectFile,
      'upload the file': upload,
      'show me my images': showImage,
      'show me my photos': showImage,
      'show me my Documents': showDoc,
      'show me my Videos': showVideo,
      'show me my Audio files': showAudio,
    };

    function selectFile(){
        document.getElementById('fileInp').click();
    }

    function upload(){
        UplodeFile();
    }

    function showImage(){
        wait();
        window.location.href = "images.html";
    }

    function showDoc(){
        wait();
        window.location.href = "docs.html";
    }

    function showVideo(){
        wait();
        window.location.href = "video.html";
    }

    function showAudio(){
        wait();
        window.location.href = "audio.html";
    }
  
    // Add our commands to annyang
    annyang.addCommands(command);
  
    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  }

  function wait() {
    var alertDiv = document.createElement('div');
    alertDiv.textContent = 'please wait a while ✅';
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '50%';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translate(-50%, -50%)';
    alertDiv.style.padding = '20px';
    alertDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    alertDiv.style.color = '#fff';
    alertDiv.style.borderRadius = '5px';
    document.body.appendChild(alertDiv);
  
    // Automatically remove the alert-like message after 2 seconds (2000 milliseconds)
    setTimeout(function() {
      alertDiv.parentNode.removeChild(alertDiv);
    }, 5000); // Change 2000 to the desired timeout in milliseconds (e.g., 3000 for 3 seconds)
  }

