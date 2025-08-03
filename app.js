//this is the working of the app
// song are in song.js file
// app.js
// IMPORT SONGS
import  {songs} from "./song.js";
//CLEARING CONSOLE
// window.addEventListener("message", (event) => {
//   if (
//     event.data &&
//     event.data.source === "console-api" &&
//     event.data.level === "warning"
//   ) {
//     console.clear();
//   }
// });
//about banner
let aboutBanner = document.querySelector(".about_box");
let aboutButton = document.getElementById("about");
let aboutBanner_close_btn=document.querySelector(".close");

// function to activate the about banner 
aboutButton.addEventListener("click", function() {
    aboutBanner.classList.toggle("active");
  });
  // functon to close the about banner when the X is clicked
  aboutBanner_close_btn.addEventListener("click",()=> {
    aboutBanner.classList.remove("active");
});

//LOADING SCREEN
window.onload = function () {
  let controls = (document.querySelector(".controls").style.display = "none");
  controls = document.querySelector(".controls").style.visibility = "hidden";
  setTimeout(() => {
    document.querySelector(".load").style.display = "none";
    document.getElementById("loadImg").style.display = "none";
    controls = document.querySelector(".controls").style.display = "flex";
    controls = document.querySelector(".controls").style.visibility = "visible";
  });
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("WELCOME TO SPOTIFY");

  //DECALRING VARIABLE
  let songIndex = 0;
  let audioelem = new Audio(`song/${songIndex + 1}.mp3`);
  let masterPlay = document.getElementById("masterPlay");
  let prebtn = document.getElementById("prebtn");
  let nextbtn = document.getElementById("nextbtn");
  let progressBar = document.getElementById("seekbar");
  let masterSongName = document.getElementById("masterSongName");
  let masterSongImg = document.getElementById("masterSongImg");
  let timer = document.getElementById("timer");
  let fullTimer = document.getElementById("full-timer");

  //ASSINGNIG DEFAULT
  masterSongName.innerHTML = songs[0].songName;
  masterSongImg.src = songs[0].coverPath;
  let songList = document.querySelector(".song-list");
  //CEATING SONGS ITEM AS PER THE SONG LIST
  songs.forEach((item, index) => {
    let songItem = `
    <div class="song-item">
    <div class="song">
    <img src="${item.coverPath}" alt="${item.songName}" />
    <div class="song-info">
    <h3 class="songName">${item.songName}</h3>
    <p class="artist">${item.artist}</p>
    </div>
    <div class="song-controls">
    <img
    id="${index}"
    src="./svg/circle-play-regular.svg"
    class="btn song-play"
    />
    </div>
    </div>
    </div>`;
    songList.insertAdjacentHTML("beforeend", songItem); //ADING TO HTML
  });
  //no use for this thing 
  let listBtn = document.querySelector(".song-item ");
  listBtn.addEventListener("click", () => {
    console.log("cliked");
  });

  //DEFAULT
  let songitems = Array.from(document.getElementsByClassName("song"));
  songitems.forEach((e, i) => {
    e.getElementsByTagName("img")[0].src = songs[i].coverPath;
    e.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
    e.getElementsByClassName("artist")[0].innerHTML = songs[i].artist;
  });
  //MASTER PLAY IN THE FOOTER
  masterPlay.addEventListener("click", () => {
    if (audioelem.paused || audioelem.currentTime <= 0) {
      //CHEKKIGN AUDIO is playing
      audioelem.play();
      masterPlay.src = "./svg/circle-pause-regular.svg";
      masterSongName.innerHTML = songs[songIndex].songName;
      masterSongImg.src = songs[songIndex].coverPath;
      // progressBar.value =0;
    } else {
      audioelem.pause();
      masterPlay.src = "./svg/circle-play-regular.svg";
      masterSongImg.src = songs[songIndex].coverPath;
      masterSongName.innerHTML = songs[songIndex].songName;
    }
    // console.clear();
  });
  //procesing of full timing of the song
  const fulltime = () => {
    let totalDurationInSeconds = audioelem.duration;
    if (!isNaN(totalDurationInSeconds) && isFinite(totalDurationInSeconds)) {
      let totalMinutes = Math.floor(totalDurationInSeconds / 60);
      let totalSeconds = Math.floor(totalDurationInSeconds % 60);
      let totalDurationFormatted = `${totalMinutes}:${
        totalSeconds < 10 ? "0" : ""
      }${totalSeconds}`;
      fullTimer.innerHTML = totalDurationFormatted;
    } else {
      fullTimer.innerHTML = "00:00";
    }
    // console.clear();
  };

  let progress = 0; // Define progress variable
  //progress bar
  audioelem.addEventListener("timeupdate", () => {
    fulltime();
    progress = parseInt((audioelem.currentTime / audioelem.duration) * 100);
    progressBar.value = progress;
    function updateSongTimer() {
      setInterval(() => {
        let currentTime = audioelem.currentTime;
        let minutes = Math.floor(currentTime / 60);
        let seconds = Math.floor(currentTime % 60);
        let formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        timer.innerHTML = formattedTime;
      }, 1000);
    }
    updateSongTimer();
  });

  progressBar.addEventListener("input", () => {
    audioelem.currentTime = (progressBar.value * audioelem.duration) / 100;
  });
  //privious btn
  prebtn.addEventListener("click", () => {
    if (songIndex > 0) {
      songIndex--;
    } else if (songIndex === 0) {
      songIndex = songs.length - 1;
    }
    audioelem.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    masterSongImg.src = songs[songIndex].coverPath;
    audioelem.currentTime = 0;
    audioelem.play();
    masterPlay.src = "./svg/circle-pause-regular.svg";
  });
  //next btn
  nextbtn.addEventListener("click", () => {
    if (songIndex < songs.length - 1) {
      songIndex++;
    } else {
      songIndex = 0;
    }
    audioelem.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    masterSongImg.src = songs[songIndex].coverPath;
    audioelem.currentTime = 0;
    audioelem.play();
    masterPlay.src = "./svg/circle-pause-regular.svg";
  });
  //if song ended play next
  audioelem.addEventListener("ended", () => {
    nextSong();
  });
  //for play the song in the list
  const makeAllPlay = () => {
    const songplay = Array.from(document.getElementsByClassName("song-play"));
    songplay.forEach((element) => {
      element.src = "./svg/circle-play-regular.svg";
    });
  };
  //proccessing of the list song
  const songplay = Array.from(document.getElementsByClassName("song-play"));
  songplay.forEach((element) => {
    element.addEventListener("click", (event) => {
      makeAllPlay();
      if (audioelem.paused) {
        songIndex = parseInt(event.target.id);
        event.target.src = "./svg/circle-pause-regular.svg";
        masterPlay.src = "./svg/circle-pause-regular.svg";
        audioelem.src = `song/${songIndex + 1}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songName;
        masterSongImg.src = songs[songIndex].coverPath;
        audioelem.currentTime = 0;
        audioelem.play();
      } else {
        songIndex = parseInt(event.target.id);
        audioelem.src = `song/${songIndex + 1}.mp3`;
        event.target.src = "./svg/circle-play-regular.svg";
        masterPlay.src = "./svg/circle-play-regular.svg";
        masterSongName.innerHTML = songs[songIndex].songName;
        masterSongImg.src = songs[songIndex].coverPath;
        audioelem.pause();
        progressBar.value = progress;
      }
    });
  });
  // for key events
  let key = " ";
  document.addEventListener("keyup", (event) => {
    if (event.key === key) {
      if (audioelem.paused || audioelem.currentTime <= 0) {
        audioelem.play();
        masterSongName.innerHTML = songs[songIndex].songName;
        masterPlay.src = "./svg/circle-pause-regular.svg";
      } else {
        audioelem.pause();
        masterSongName.innerHTML = songs;
        audioelem.pause();
        masterSongName.innerHTML = songs[songIndex].songName;
        masterPlay.src = "./svg/circle-play-regular.svg";
      }
    } else if (event.key === "ArrowRight") {
      fastForward();
    } else if (event.key === "ArrowLeft") {
      rewind();
    } else if (event.key.toLowerCase() === "m") {
      nextSong();
    } else if (event.key.toLowerCase() === "n") {
      prevSong();
    } else if (event.key === "ArrowUp") {
      volumeUp();
    } else if (event.key === "ArrowDown") {
      volumeDown();
    }
  });
  //volume controle
  const volumeEvent = () => {
    let soundImg = document.getElementById("soundimg");
    if (soundBar.value > 0) {
      soundImg.src = "./svg/volume-high-solid.svg";
    } else {
      soundImg.src = "./svg/volume-xmark-solid.svg";
    }
  };
  //voolume up forward backward next prevous functions
  function volumeUp() {
    audioelem.volume += 0.1;
    soundBar.value = audioelem.volume;
    volumeEvent();
    console.clear();
  }
  function volumeDown() {
    audioelem.volume -= 0.1;
    soundBar.value = audioelem.volume;
    volumeEvent();
    console.clear();
  }

  function fastForward() {
    audioelem.currentTime += 5;
  }

  function rewind() {
    audioelem.currentTime -= 5;
  }
  function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    playCurrentSong();
  }

  function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playCurrentSong();
  }
  function playCurrentSong() {
    audioelem.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    masterSongImg.src = songs[songIndex].coverPath;
    audioelem.currentTime = 0;
    audioelem.play();
    masterPlay.src = "./svg/circle-pause-regular.svg";
  }

  let soundBar = document.getElementById("soundbar");
  audioelem.volume = soundBar.value;
  soundBar.addEventListener("input", () => {
    audioelem.volume = soundBar.value;
    console.clear();
  });
});


