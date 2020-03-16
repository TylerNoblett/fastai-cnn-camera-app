var constraints = { video: { facingMode: "environment" }, audio: false };
const cameraView = document.querySelector("#camera--view"),
      cameraOutput = document.querySelector("#camera--output"),
      cameraSensor = document.querySelector("#camera--sensor"),
      cameraTrigger = document.querySelector("#camera--trigger")

function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

function isLoading(flag){
    const loadingText = 'Loading'
    document.getElementById("location").innerHTML = loadingText; 

    while(!flag){
        setTimeout(function(){ 
            if (loadingText !== 'Loading...') {
                loadingText = loadingText + '.'
            } else {
                loadingText = 'Loading'
            }
            document.getElementById("location").innerHTML = loadingText; 
        }, 1000);
    }
}

cameraTrigger.onclick = function() {
    let flag = false;
    document.getElementById("content").innerHTML =
    '';
    // document.getElementById("location").innerHTML =
    // 'Loading';
    isLoading(flag)

    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);

    data = cameraSensor.toDataURL('image/jpeg', 0.5);
    var blob = dataURItoBlob(data);
    var fd = new FormData(document.forms[0]);
    fd.append("file", blob);

    const requestOptions = {
        method: 'POST',
        body: fd
    };
    fetch("https://dc2.onrender.com/analyze",requestOptions)
    //fetch("http://0.0.0.0:5000", requestOptions)
    .then(function(response){ 
        jsonResponse = response.json()
        return jsonResponse; 
    })
    .then(function(data){ 
        console.log(data)
        flag = true
        document.getElementById("content").innerHTML =
        data.details;
        document.getElementById("location").innerHTML =
        data.object;
    });
    cameraOutput.classList.add("taken");
};

window.addEventListener("load", cameraStart, false);
