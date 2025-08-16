const songs = [
  { title: "2 Duni 4", artist: "R nait", src: "songs/2duni4.mp3", cover: "covers/2duni4.jpg"  },
  { title: "Aj ki Rat", artist: "Neha Kakar", src: "songs/Aj ki Rat.mp3", cover: "covers/Aj ki rat.jpg" },
  { title: "Gabhru", artist: "Karan Aujla", src: "songs/Gabhru.mp3", cover: "covers/MFgabhru.jpg"  }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const coverImg = document.getElementById("cover"); // new
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const playlist = document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

// Load Song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  coverImg.src = song.cover;
}
// Play
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.innerHTML = "⏸";
}

// Pause
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.innerHTML = "▶️";
}

// Play/Pause toggle
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Next Song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
  updatePlaylist();
}

// Prev Song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
  updatePlaylist();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // update time
  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  let durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);

  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? "0" + currentSeconds : currentSeconds}`;
  if (duration) {
    durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? "0" + durationSeconds : durationSeconds}`;
  }
});

// Set progress bar on click
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Volume Control
volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

// Playlist
function renderPlaylist() {
  playlist.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
      updatePlaylist();
    });
    playlist.appendChild(li);
  });
  updatePlaylist();
}

function updatePlaylist() {
  [...playlist.children].forEach((li, index) => {
    li.classList.toggle("active", index === songIndex);
  });
}

// Autoplay Next Song
audio.addEventListener("ended", nextSong);

renderPlaylist()