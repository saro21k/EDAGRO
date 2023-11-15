document.addEventListener("DOMContentLoaded", function () {
    const playPauseBtn = document.getElementById("playPauseBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const progressBar = document.querySelector(".progress");
    const currentTime = document.querySelector(".current-time");
    const totalTime = document.querySelector(".total-time");
    const audioInput = document.getElementById("audioInput");
    const imageInput = document.getElementById("imageInput");
    const loadMediaBtn = document.getElementById("loadMediaBtn");
    const albumCover = document.querySelector(".album-cover");
    const audioPlayer = document.getElementById("audioPlayer");
    let isPlaying = false;

    playPauseBtn.addEventListener("click", togglePlayPause);
    prevBtn.addEventListener("click", playPrevious);
    nextBtn.addEventListener("click", playNext);
    loadMediaBtn.addEventListener("click", loadMedia);
    audioPlayer.addEventListener("timeupdate", updateProgress);

    function togglePlayPause() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
        playPauseBtn.textContent = isPlaying ? "Pausar" : "Reproducir";
    }

    function playPrevious() {
        // Lógica para reproducir la canción anterior
    }

    function playNext() {
        // Lógica para reproducir la siguiente canción
    }

    function loadMedia() {
        const audioFile = audioInput.files[0];
        const imageFile = imageInput.files[0];
        const width = parseInt(document.getElementById("widthInput").value) || null;
        const height = parseInt(document.getElementById("heightInput").value) || null;

        if (imageFile) {
            const imageURL = URL.createObjectURL(imageFile);
            resizeAndDisplayImage(imageURL, width, height);
        }

        if (audioFile) {
            const audioURL = URL.createObjectURL(audioFile);
            audioPlayer.src = audioURL;
            audioPlayer.load();
            if (isPlaying) {
                audioPlayer.play();
            }
            updateTotalTime();
        }
    }

    function updateProgress() {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${progress}%`;
        currentTime.textContent = formatTime(audioPlayer.currentTime);
    }

    function updateTotalTime() {
        totalTime.textContent = formatTime(audioPlayer.duration);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function resizeAndDisplayImage(imageURL, width, height) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = width || img.width;
            canvas.height = height || img.height;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const resizedURL = canvas.toDataURL();

            albumCover.style.backgroundImage = `url(${resizedURL})`;
        };

        img.src = imageURL;
    }
});
