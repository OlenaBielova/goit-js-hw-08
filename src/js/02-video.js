
import throttle from "lodash.throttle";
import Player from "@vimeo/player";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);


const doTimeUpdate = function (e) {
    // console.log("timeupdate", e);

    const currentTime = JSON.stringify(e);
    
    localStorage.setItem("videoplayer-current-time", currentTime);
    
    // console.log(localStorage);
};

player.on('timeupdate', throttle(doTimeUpdate, 1000));


window.addEventListener('load', onPageReload);

function onPageReload (e) {
    // console.log("page reload");

    const timeFromStorage = localStorage.getItem("videoplayer-current-time");
    console.log(timeFromStorage);

    if (timeFromStorage) {
        const parsedTimeFromStorage = JSON.parse(timeFromStorage).seconds;

        player.setCurrentTime(parsedTimeFromStorage).then(function(seconds) {
    // seconds = the actual time that the player seeked to
        }).catch(function(error) {
        switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;
        default:
            // some other error occurred
            break;
    }
});
};
};




