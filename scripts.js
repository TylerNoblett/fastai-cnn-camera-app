const url = "https://camera-app-backend-demo.onrender.com/analyze"

const constraints = {
    video: {
        facingMode: "environment"
    },
    audio: false
};
const cameraView = document.querySelector("#camera--view")
const cameraSensor = document.querySelector("#camera--sensor")
const cameraTrigger = document.querySelector("#camera--trigger")

const cameraStart = async () => {
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

const URIToBlob = (dataURL) => {
    const mimeType = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const binary = atob(dataURL.split(',')[1]);
    const arrOfBytes = [];
    for (var i = 0; i < binary.length; i++) arrOfBytes.push(binary.charCodeAt(i));
    return new Blob([new Uint8Array(arrOfBytes)], {
        type: mimeType
    });
}

const setResult = (obj) => {
    document.getElementById("content").innerHTML = obj.content;
    document.getElementById("result").innerHTML = obj.result;
}

const setSensors = () => {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
}

const createFormData = () => {
    const data = cameraSensor.toDataURL('image/jpeg', 0.5);
    const formData = new FormData(document.forms[0]);
    formData.append("file", URIToBlob(data));
    return formData;
}

const fetchResponse = async (formData) => {
    let response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    response = await response.json();
    return response;
}

cameraTrigger.onclick = async () => {
    let loadingText = 'Loading';
    setResult({
        content: '',
        result: loadingText
    });

    const loading = setInterval(() => {
        if (loadingText !== 'Loading...') {
            loadingText = loadingText + '.';
            document.getElementById("result").innerHTML = loadingText;
        } else {
            loadingText = 'Loading';
            document.getElementById("result").innerHTML = loadingText;
        }
    }, 350);

    setSensors();
    const formData = createFormData();
    const response = await fetchResponse(formData);
    clearInterval(loading);
    setResult(response);
};

window.addEventListener("load", cameraStart, false);
