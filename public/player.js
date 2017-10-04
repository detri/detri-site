let buttons = document.querySelectorAll(".button");
let player = document.querySelector(".player");
let playerAudio = document.querySelector("audio");
let seekbar = document.querySelector("#seekbar");
let timekeeper = document.querySelector(".timekeeper");

let curSongId = null;
let playing = false;
let firstTime = true;
const icons = {
  playCircleFilled: "&#xE038;",
  playCircleOutline: "&#xE039;",
  pauseCircleFilled: "&#xE035;",
  pauseCircleOutline: "&#xE036;"
};

buttons.forEach(e => {
  e.addEventListener("click", function(event) {
    let el = event.target.closest("div");
    let lastStopped = null;

    if (curSongId != el.id && playerAudio.paused) {
      console.log("[Starting] Song ID did not match.");
      if (firstTime) {
        firstTime = false;
        anime.timeline()
          .add({
            targets: "#footercontainer",
            opacity: 0
          })
          .add({
            targets: ".player",
            opacity: 1
          });
      }
      curSongId = el.id;
      playerAudio.src = el.attributes["data-url"].value;
      playerAudio.onloadeddata = function() {
        playerAudio.play();
      };
      playerAudio.load();

      el.firstChild.innerHTML = icons.pauseCircleFilled;
    } else if (curSongId == el.id && !playerAudio.paused) {
      console.log("[Pausing] Song ID matched.");
      playerAudio.pause();
      el.firstChild.innerHTML = icons.playCircleFilled;
    } else if (curSongId == el.id && playerAudio.paused) {
      console.log("[Resuming] Song ID matched.");
      playerAudio.play();
      el.firstChild.innerHTML = icons.pauseCircleFilled;
    } else {
      console.log("[Switching] Song ID did not match.");
      playerAudio.pause();
      playerAudio.src = el.attributes["data-url"].value;
      playerAudio.onloadeddata = function() {
        playerAudio.play();
        document.getElementById(curSongId).firstChild.innerHTML =
          icons.playCircleFilled;
        curSongId = el.id;
        el.firstChild.innerHTML = icons.pauseCircleFilled;
      };
      playerAudio.load();
    }
  });
});

setInterval(() => {
  if (playerAudio && playerAudio.currentTime && playerAudio.duration) {
    seekbar.value = playerAudio.currentTime / playerAudio.duration;
    timekeeper.firstChild.innerHTML = formatMinuteSecond(playerAudio.currentTime);
    timekeeper.lastChild.innerHTML = formatMinuteSecond(playerAudio.duration);
  }
}, 60);

function toMinFromSec(value) {
  return Math.floor(value / 60);
}

function getRemainingSec(value) {
  return Math.floor(value % 60);
}

function formatSeconds(value) {
  if (value > 9) {
    return value
  } else {
    return "0" + value.toString();
  }
}

function formatMinuteSecond(value) {
  return formatSeconds(toMinFromSec(value)) + ":" + formatSeconds(getRemainingSec(value));
}