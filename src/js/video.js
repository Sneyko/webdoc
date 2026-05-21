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

    video.addEventListener("loadeddata", hideFallback);
    video.addEventListener("canplay", hideFallback);
    video.addEventListener("error", showFallback);

    const sources = video.querySelectorAll("source");
    sources.forEach((source) => {
        source.addEventListener("error", showFallback);
    });

    // Security check: if not loaded in 700ms, show placeholder
    window.setTimeout(() => { 
        if (video.readyState < 2) {
            showFallback();
        } 
    }, 700);
}
