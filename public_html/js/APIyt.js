var tag = document.createElement('script');

var idvideo;

function ponerIdvideo(id){
    idvideo = id;
}

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

//var otro;
function loadVideo() {
    console.info(`loadVideo called`);
  
    (function loadYoutubeIFrameApiScript() {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
  
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
      tag.onload = setupPlayer;
    })();
  
    let player = null;
  
    function setupPlayer() {
      window.YT.ready(function() {
        player = new window.YT.Player("videoplato", {
          height: "390",
          width: "95%",
          videoId: idvideo,
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
          }
        });
      });
    }
  
     function onPlayerReady(event) {
     //   event.target.playVideo();
     }
  
  }
  
  if (document.readyState !== "loading") {
    console.info(`document.readyState ==>`, document.readyState);
    loadVideo();
  } else {
    document.addEventListener("DOMContentLoaded", function() {
      console.info(`DOMContentLoaded ==>`, document.readyState);
      loadVideo();
    });
  } 

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}