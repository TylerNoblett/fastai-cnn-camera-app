const url = "https://dc2.onrender.com/analyze"

const constraints = {
    video: {
        facingMode: "environment"
    },
    audio: false
};
const cameraView = document.querySelector("#camera--view")
const cameraOutput = document.querySelector("#camera--output")
const cameraSensor = document.querySelector("#camera--sensor")
const cameraTrigger = document.querySelector("#camera--trigger")

const cameraStart = () => {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

const dataURItoBlob = (dataURI) => {
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

    return new Blob([ia], {
        type: mimeString
    });
}

setType = (obj) => {
    document.getElementById("content").innerHTML = obj.content;
    document.getElementById("type").innerHTML = obj.type;
}

cameraTrigger.onclick = async () => {
    let loadingText = 'Loading';
    setType({ content: '', type: loadingText })

    const loading = setInterval(() => {
        if (loadingText !== 'Loading...') {
            loadingText = loadingText + '.'
            document.getElementById("type").innerHTML = loadingText;
        } else {
            loadingText = 'Loading'
            document.getElementById("type").innerHTML = loadingText;
        }
    }, 350);

    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);

    const data = cameraSensor.toDataURL('image/jpeg', 0.5);
    const formData = new FormData(document.forms[0]);
    formData.append("file", dataURItoBlob(data));

    let response = await fetch(url, { method: 'POST', body: formData });
    response = await response.json();
    clearInterval(loading);
    setType(response)
};

window.addEventListener("load", cameraStart, false);