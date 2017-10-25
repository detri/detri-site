AudioContext = window.webkitAudioContext || window.AudioContext;
const context = new AudioContext();

let player      = document.querySelector(".player");
let playbutton  = document.getElementById("playbutton");
let playerAudio = document.querySelector("audio");
let seekbar     = document.querySelector("#seekbar");
let timekeeper  = document.querySelector(".timekeeper");
let songName    = document.querySelector(".song-name");
let songArtist  = document.querySelector(".song-artist");
let songRelease = document.querySelector(".song-release-date");
let buttons     = document.querySelectorAll(".button");

// Hook the player if there are
// already buttons on the page.

if (buttons) buttons.forEach(e => {
  if (e.onclick) e.onlick = null;
  e.onclick = buttonClicked(event);
});


// Connect the player audio element to the browser's AudioContext.
// TODO: Use the gain node to make a volume control.

let source = context.createMediaElementSource(playerAudio);
if (!context.createGain) context.createGain = context.createGainNode();
let gainNode = context.createGain();
if (!context.createAnalyser) context.createAnalyser = context.createAnalyserNode();
let analyzer = context.createAnalyser();
source.connect(gainNode);
source.connect(analyzer);
gainNode.connect(context.destination);

// Initialize misc variables.

// Anime imeline used for the player fade in animation.
let footerAnim = anime.timeline();
// The UUID of the current song. (Null when the page first loads)
let curSongId = null;
// Permanently debounce the player animation.
let firstTime = true;

// Icon object, to make using icons much easier.
const icons = {
  playCircleFilled: "&#xE038;",
  playCircleOutline: "&#xE039;",
  pauseCircleFilled: "&#xE035;",
  pauseCircleOutline: "&#xE036;"
};

// Add the click event to the player's play/pause button.
// Toggles playback and swaps icon.
playbutton.addEventListener("click", (event) => {
  if (playerAudio.paused) {
    console.log("[Playing] Big button pressed");
    event.target.closest("i").innerHTML = icons.pauseCircleOutline;
    playerAudio.play();
  } else {
    console.log("[Pausing] Big button pressed");
    event.target.closest("i").innerHTML = icons.playCircleOutline;
    playerAudio.pause();
  }
});

// Seekbar events. Sets the current time of the song.
seekbar.addEventListener("input", (event) => {
  if (!playerAudio.pause) playerAudio.pause();
  if (playerAudio.duration) playerAudio.currentTime = playerAudio.duration * event.target.value;
});

seekbar.addEventListener("dragend", (event) => {
  if (playerAudio.paused) playerAudio.play();
});

// Update the time display and seekbar value
setInterval(() => {
  if (playerAudio && playerAudio.currentTime && playerAudio.duration && !playerAudio.paused) {
    seekbar.value = playerAudio.currentTime / playerAudio.duration;
    timekeeper.firstChild.innerHTML = formatMinuteSecond(playerAudio.currentTime);
    timekeeper.lastChild.innerHTML = formatMinuteSecond(playerAudio.duration);
  }
}, 16 + (2 / 3)); // 60 fps boiz!!!!!!!!!!!!

// Fetch song buttons when the select button is inputted.
// The selection input is a list of users, so (parent directory)/api/music/ + user
// is the server's API route being accessed for whichever user is selected.
// Hooks the player after buttons are loaded.
function loadSongButtons(urlParam) {
  fetch("../api/music/" + urlParam)
    .then(res => {
      res.text().then(text => {
        let songs = JSON.parse(text);
        let htmlString = "";
        for (let song of songs) {
          htmlString += `<div class="button" id="${song.id}" data-url="${"/music/" + song.filename.split('.')[0]}" data-title="${song.song_name}" data-artist-name="${song.author}" data-release-date="${new Date(song.release_date).toLocaleDateString()}">
          <i class="material-icons">&#xE038;</i>
          <span class="songtext"> &nbsp; ${song.song_name}</span></div>`;
        }
        document.querySelector(".results").innerHTML = htmlString;
        buttons = document.querySelectorAll(".button");
        buttons.forEach(e => {
          if (e.onlick) e.onclick = null;
          e.onclick = buttonClicked(event);
        });
      });
    }).catch(err => err ? console.log(err) : console.log("wut"));
}

// Load the first user's songs when the page loads.
loadSongButtons(document.querySelector("select").value);

// This function does all the dirty work with hooking.
// Well, that came out wrong. You get the idea.
function buttonClicked(event) {
  console.log("Hooked");
  return function (event) {
    let el = event.target.closest("div");
    let btn = el.querySelector("i");

    toggle();

    if (curSongId != el.id && playerAudio.paused) {
      console.log("[Starting] Song ID did not match.");
      if (firstTime === true) {
        firstTime = false;
        footerAnim
          .add({
            targets: "#footercontainer",
            easing: "easeOutQuint",
            opacity: 0,
            duration: 800
          })
          .add({
            targets: ".player",
            opacity: 1,
            easing: "easeOutQuint",
            duration: 800,
            offset: "-=400"
          });
      }
      curSongId = el.id;
      playerAudio.src = el.dataset.url;
      playerAudio.onloadeddata = function () {
        playerAudio.play();
        setSongInfo(el);
        console.log(analyzer.frequencyBinCount);
      };
      playerAudio.load();
      btn.innerHTML = icons.pauseCircleFilled;
    } else if (curSongId == el.id && !playerAudio.paused) {
      console.log("[Pausing] Song ID matched.");
      playerAudio.pause();
      btn.innerHTML = icons.playCircleFilled;
    } else if (curSongId == el.id && playerAudio.paused) {
      console.log("[Resuming] Song ID matched.");
      playerAudio.play();
      btn.innerHTML = icons.pauseCircleFilled;
    } else {
      console.log("[Switching] Song ID did not match.");
      playerAudio.pause();
      playerAudio.src = el.dataset.url;
      playerAudio.onloadeddata = function () {
        playerAudio.play();
        if (document.getElementById(curSongId))
          document.getElementById(curSongId).querySelector("i").innerHTML = icons.playCircleFilled;
        curSongId = el.id;
        btn.innerHTML = icons.pauseCircleFilled;
        setSongInfo(el);
        console.log(analyzer.frequencyBinCount);
      };
      playerAudio.load();
      toggle();
    }
  }
}

function toggle() {
  playbutton.innerHTML = playerAudio.paused ? icons.pauseCircleOutline : icons.playCircleOutline;
}

function setSongInfo(element) {
  songArtist.innerHTML = element.dataset.artistName;
  songName.innerHTML = element.dataset.title;
  songRelease.innerHTML = element.dataset.releaseDate;
}

function toMinFromSec(value) {
  return Math.floor(value / 60);
}

function getRemainingSec(value) {
  return Math.floor(value % 60);
}

function formatSeconds(value) {
  if (value > 9) {
    return value;
  } else {
    return "0" + value.toString();
  }
}

function formatMinuteSecond(value) {
  return (
    formatSeconds(toMinFromSec(value)) +
    ":" +
    formatSeconds(getRemainingSec(value))
  );
}