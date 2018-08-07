let play_timer;
let pause_timer;
let start_time = 34;
let play_duration = 10000;
let pause_duration = 10000;

let $loop_button = $('#loop-button');
let app_is_looping = false;

let $start_time_input = $('#start-time');
let $end_time_input = $('#end-time');
let $pause_time_input = $('#pause-time');
let $shift_next_frame_button = $('#shift-next-frame-button');


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
      // 'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    }
  });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  playThenPause();
}

$loop_button.on('click', function() {
  start_time = parseInt($start_time_input.val());
  end_time = parseInt($end_time_input.val());
  play_duration = (end_time - start_time) * 1000;
  pause_duration = parseInt($pause_time_input.val()) * 1000;

  if (app_is_looping) {
    player.pauseVideo();
    clearTimeout(play_timer);
    clearTimeout(pause_timer);
    app_is_looping = false;
  } else {
    playThenPause();
    app_is_looping = true;
  }
});

$shift_next_frame_button.on('click', function() {
  let old_start_time = parseInt($start_time_input.val());
  let old_end_time = parseInt($end_time_input.val());
  let play_duration = old_end_time - old_start_time;
  $start_time_input.val(old_end_time);
  $end_time_input.val(old_end_time + play_duration);

});

function playThenPause() {
  player.seekTo(start_time, true);
  player.playVideo();
  play_timer = setTimeout(pauseThenPlay, play_duration);
}

function pauseThenPlay() {
  player.pauseVideo();
  pause_timer = setTimeout(playThenPause, pause_duration);
}
