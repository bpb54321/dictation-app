let play_timer;
let pause_timer;
let start_time = 24;
let play_duration = 10000;
let pause_duration = 10000;


var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: '0jNH1387RnY',
    events: {
      'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    }
  });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  playThenPause();
}

function playThenPause() {
  player.seekTo(start_time, true);
  player.playVideo();
  play_timer = setTimeout(pauseThenPlay, play_duration);
}

function pauseThenPlay() {
  player.pauseVideo();
  pause_timer = setTimeout(playThenPause, pause_duration);
}
