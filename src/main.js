/* MAIN ENTRY POINT */

import './styles/main.css';

import { renderAll } from './js/renderer.js';
import { initCursor } from './js/cursor.js';
import { initCanvases } from './js/canvas.js';
import { initVideoFallback } from './js/video.js';
import { 
    initSourcesDialog, 
    bindEvents, 
    updateProgressBar, 
    playIntroSequence,
    initThemeToggle
} from './js/navigation.js';

function init() {
    // 1. Render all dynamic DOM elements
    renderAll();

    // 2. Initialize custom CRT cursor
    initCursor();

    // 3. Initialize background static noise canvases
    initCanvases();

    // 4. Initialize sources dialog listeners
    initSourcesDialog();

    // 4b. Initialize theme toggle listener
    initThemeToggle();

    // 5. Initialize video fallback events
    initVideoFallback();

    // 6. Bind channel navigation events (clicks, keypresses)
    bindEvents();

    // 7. Initialize navigation status indicators
    updateProgressBar();

    // 8. Start intro screen title GSAP timeline animations
    window.setTimeout(playIntroSequence, 250);
}

// Start application when DOM is fully ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
