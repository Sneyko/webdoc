/* Video Fallback Handler */

export function initVideoFallback() {
    const video = document.querySelector("#fieldVideo");
    const fallback = document.querySelector("#videoFallback");
    if (!video || !fallback) return;

    const hideFallback = () => { 
        fallback.hidden = true; 
        fallback.style.display = "none";
    };
    
    const showFallback = () => { 
        fallback.hidden = false; 
        fallback.style.display = "grid";
    };

    // Initialize as hidden
    hideFallback();

    video.addEventListener("loadeddata", hideFallback);
    video.addEventListener("canplay", hideFallback);
    video.addEventListener("play", hideFallback);
    video.addEventListener("playing", hideFallback);
    video.addEventListener("error", showFallback);

    const sources = video.querySelectorAll("source");
    sources.forEach((source) => {
        source.addEventListener("error", showFallback);
    });
}
