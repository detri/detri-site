let WeakAudio = require("./weakaudio.js");

let context = new (window.webkitAudioContext || window.AudioContext)();
// browser compatibility
if (!context.createGain) context.createGain = context.createGainNode;

let curSong = {};
curSong.id = null;

let thisId = null;
let playing = false;
let source = null;
let gainNode = context.createGain();

// handle individual buttons
$(".button").click(function() {
  if (gainNode.numberOfOutputs > 0) gainNode.disconnect();
  thisId = $(this).attr("id");
  thisUrl = $(this).attr("data-url");
  // initial click
  if (!curSong.id) {
    //TODO: Animate the player in
    $("#footer .text-muted").animate({
      "line-height": "100px",
      "font-size": "10px",
      "height": "10px",
      "background": "transparent"
    }, function () {
      $(".player").fadeIn();
    });

    // fetch the song
    loadSong(thisUrl);
  } else if (thisId == curSong.id) {
    if (playing) {
      context.suspend();
      playing = false;
      $(this)
        .children("i")
        .html("&#xE038;");
      $("#playbutton").html("&#xE039");
    } else {
      context.resume();
      playing = true;
      $(this)
        .children("i")
        .html("&#xE035;");
      $("#playbutton").html("&#xE036");
    }
  } else {
    loadSong(thisUrl);
  }
  gainNode.connect(context.destination);
});

$("#playbutton").click(function () {
  if (playing) {
    context.suspend();
    playing = false;
    $(".button #" + curSong.id).children("i").html("&#xE038;");
    $("#playbutton").html("&#xE039");
  } else {
    context.resume();
    playing = true;
    $(".button #" + curSong.id).children("i").html("&#xE035;");
    $("#playbutton").html("&#xE036");
  }
});

function loadSong(url) {
  if (source) {
    source.stop(0);
    source.disconnect();
  }

  if (playing) playing = false;
  curSong.id = thisId;

  source = context.createBufferSource();
  //browser compatibility
  if (!source.start) {
    source.start = source.noteOn;
    source.stop = source.noteOff;
  }

  let request = new XMLHttpRequest();
  request.open("GET", "/music/" + url);
  request.responseType = "arraybuffer";
  request.onload = function() {
    context.decodeAudioData(request.response, buffer => {
      source.buffer = buffer;
      source.loop = false;
      source.connect(gainNode);
      source.start(0);
      $(".button")
        .children("i")
        .html("&#xE035;");
      $("#playbutton").html("&#xE036");
      $(".button")
        .not("#" + thisId)
        .children("i")
        .html("&#xE038;");
      if (context.state == "suspended") context.resume();
      playing = true;
    });
  };
  request.send();
}

setInterval(function() {
  if (source && source.buffer != null) {
    console.log(context.getOutputTimestamp().contextTime / source.buffer.duration);
    $("#seekbar").val(
      context.getOutputTimestamp().contextTime / source.buffer.duration
    );
  } else {
    $("#seekbar").val(0);
  }
}, 100);
