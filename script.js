const videos = [
    { url: "https://www.youtube.com/embed/sSeviT0uwLE", title: "Chopin Rondo Op.1" },
    { url: "https://www.youtube.com/embed/Gj-xTzKYq8g", title: "Arthur Rubinstein - Chopin Mazurka, Op. 33 No. 4" },
    { url: "https://www.youtube.com/embed/baZGdj0xLYg", title: "Arthur Rubinstein - Chopin Impromptu No. 1 in A flat, Op. 29" },
    { url: "https://www.youtube.com/embed/3G4NKzmfC-Q", title: "Smetana ~ Moldau" },
    { url: "https://www.youtube.com/embed/IC2cnGd5Sy8", title: "En Avril À Paris, Marc-André Hamelin" },
    { url: "https://www.youtube.com/embed/yQw3DvqEbxI", title: "Sergei Rachmaninov - Moment Musicaux Op. 16 No. 4" },
    { url: "https://www.youtube.com/embed/wkci_fyEot8", title: "Rachmaninoff: Piano Concerto No.3, Movement III, Finale, Alla Breve" }
];

function playRandomVideo() {
    const randomIndex = Math.floor(Math.random() * videos.length);
    const video = videos[randomIndex];
    const iframe = document.getElementById("video");
    iframe.src = video.url;
    updateMusicSelector(video.url);
}

function playSelectedVideo() {
    const selectedValue = document.getElementById("music-selector").value;
    const video = videos.find(v => v.url === selectedValue);
    const iframe = document.getElementById("video");
    iframe.src = selectedValue;
    updateMusicSelector(selectedValue);
}

function updateMusicSelector(videoUrl) {
    const selectElement = document.getElementById("music-selector");
    selectElement.value = videoUrl;
}

playRandomVideo();

const iframe = document.getElementById("video");

iframe.onload = function() {
    iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
};

function onVideoEnd() {
    playRandomVideo();
}

window.onYouTubeIframeAPIReady = function() {
    var player = new YT.Player('video', {
        events: {
            'onStateChange': function(event) {
                if (event.data === YT.PlayerState.ENDED) {
                    onVideoEnd();
                }
            }
        }
    });
};
