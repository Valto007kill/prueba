
let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioUrl;
let audioElement = document.getElementById("audioPlayback");

document.getElementById("record").onclick = function () {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            
            document.getElementById("record").disabled = true;
            document.getElementById("pause").disabled = false;
            document.getElementById("stop").disabled = false;

            mediaRecorder.ondataavailable = function (e) {
                audioChunks.push(e.data);
            };
            
            mediaRecorder.onstop = function () {
                audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                audioUrl = URL.createObjectURL(audioBlob);
                audioElement.src = audioUrl;
                audioChunks = [];
            };
        });
};

document.getElementById("pause").onclick = function () {
    if (mediaRecorder.state === "recording") {
        mediaRecorder.pause();
        document.getElementById("pause").textContent = "Reanudar";
    } else if (mediaRecorder.state === "paused") {
        mediaRecorder.resume();
        document.getElementById("pause").textContent = "Pausar";
    }
};

document.getElementById("stop").onclick = function () {
    mediaRecorder.stop();
    document.getElementById("record").disabled = false;
    document.getElementById("pause").disabled = true;
    document.getElementById("stop").disabled = true;
    document.getElementById("discard").disabled = false;
};

document.getElementById("discard").onclick = function () {
    audioElement.src = "";
    document.getElementById("discard").disabled = true;
};
