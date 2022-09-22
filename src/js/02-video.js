
import throttle from "lodash.throttle";
import Player from "@vimeo/player";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);


const doTimeUpdate = function (e) {

    const currentTime = e.seconds;
    console.log(currentTime);
    
    localStorage.setItem("videoplayer-current-time", currentTime);
    
};

player.on('timeupdate', throttle(doTimeUpdate, 1000));

window.addEventListener('load', onPageReload);

function onPageReload (e) {

    const currentTime = localStorage.getItem("videoplayer-current-time");
    console.log(currentTime);

    if (currentTime) {
        player.setCurrentTime(currentTime);
    }
};