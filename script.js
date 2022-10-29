const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const time = document.querySelector(".time");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// Song titles
const songs = ["GUC-Alabo", "GUC-I-Believe", "GUC-In-This-Place"];
const songsImages = ["hey", "summer", "ukulele"];

// Keep track of songs
let songIndex = 2;

// Initial load song info Dom
loadSong(songsImages[songIndex], songs[songIndex]);

// Update song details
function loadSong(songImage, song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${songImage}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songsImages[songIndex], songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songsImages[songIndex], songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);

  const currentTimeMins = Math.floor(currentTime / 60);
  const currentTimeSecs = Math.floor(currentTime - currentTimeMins * 60);

  const newCurrentTimeSecs =
    currentTimeSecs <= 9 ? `0${currentTimeSecs}` : currentTimeSecs;

  if (minutes && seconds) {
    time.innerText = `${currentTimeMins} : ${newCurrentTimeSecs}  /${minutes} : ${seconds}`;
  }

  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth; //show you the entire length
  const clickX = e.offsetX; // shows you exactly where you ar clicking on the X axix
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
  musicContainer.classList.add("playing");
});

// Change song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);
