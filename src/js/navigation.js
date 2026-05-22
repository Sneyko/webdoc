/* Navigation and Animation Controller */

import { gsap } from 'gsap';
import { 
    getStaticAnimId, 
    getZapAnimId, 
    setZapAnimId, 
    drawStatic,
    setupNoiseCanvas
} from './canvas.js';

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

let currentChannel = 1;
let isZapping = false;
const totalChannels = 5;

const hasGsap = () => !prefersReducedMotion.matches;

export function getChannel() {
    return currentChannel;
}

export function buildIntroTitle() {
    const titleEl = $("#introTitle");
    if (!titleEl) return [];
    titleEl.innerHTML = "";
    "SIGNAL PERDU".split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        titleEl.appendChild(span);
    });
    return titleEl.querySelectorAll("span");
}

export function playIntroSequence() {
    const titleEl = $("#introTitle");
    const subtitle = $("#introSubtitle");
    const introButtons = $$(".intro-btn");
    if (!titleEl || !subtitle) return;
    
    const letters = buildIntroTitle();
    let introRevealed = false;
    
    const revealIntroContent = () => {
        if (introRevealed) return;
        introRevealed = true;
        titleEl.style.opacity = "1";
        letters.forEach((letter) => { letter.style.opacity = "1"; });
        subtitle.style.opacity = "1";
        introButtons.forEach((button) => {
            button.style.opacity = "1";
        });
        const introBtn = $("#introBtn");
        if (introBtn) introBtn.classList.add("blink");
    };

    const safetyIntroTimer = window.setTimeout(revealIntroContent, 2200);

    if (!hasGsap()) {
        window.clearTimeout(safetyIntroTimer);
        revealIntroContent();
        return;
    }

    const timeline = gsap.timeline();
    timeline.to("#crtMask", { 
        duration: 1.1, 
        background: "radial-gradient(ellipse at center, transparent 100%, #000 100%)", 
        ease: "power2.inOut" 
    }, "+=0.5");
    timeline.set(titleEl, { opacity: 1 });
    timeline.to(letters, { opacity: 1, duration: 0.05, stagger: 0.07, ease: "none" }, "+=0.2");
    timeline.to(subtitle, { opacity: 1, duration: 0.6, ease: "power2.out" }, "+=0.2");
    timeline.to(introButtons, {
        opacity: 1,
        duration: 0.25,
        stagger: 0.08,
        onComplete: () => {
            window.clearTimeout(safetyIntroTimer);
            revealIntroContent();
        }
    }, "+=0.15");
}

export function enterSite() {
    const intro = $("#intro");
    if (!intro || intro.hidden) return;
    cancelAnimationFrame(getStaticAnimId());
    
    const finish = () => {
        intro.hidden = true;
        intro.style.display = "none";
        document.body.classList.add("site-entered");
        showChannel(1, false);
        const remoteFirst = $("#remoteNav button[data-channel='1']");
        if (remoteFirst) remoteFirst.focus({ preventScroll: true });
    };

    if (hasGsap()) {
        gsap.to(intro, { opacity: 0, duration: 0.45, ease: "power2.in", onComplete: finish });
    } else {
        intro.style.opacity = "0";
        window.setTimeout(finish, 180);
    }
}

export function showChannel(num, animate = true) {
    currentChannel = num;
    const channelLabel = $("#channelLabel");
    if (channelLabel) {
        channelLabel.textContent = `CH ${String(num).padStart(2, "0")}`;
    }

    if (num !== 3) {
        $$("#ch03 .stat-card").forEach((card) => card.classList.remove("revealed"));
        $$("#ch03 .chart-container-horizontal").forEach((chart) => chart.classList.remove("revealed"));
    }

    if (num !== 5) {
        const video = $("#fieldVideo");
        if (video && !video.paused) {
            video.pause();
        }
    }

    $$(".remote-nav button[data-channel]").forEach((button) => {
        const active = Number(button.dataset.channel) === num;
        button.classList.toggle("active", active);
        if (active) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
    });

    $$(".channel").forEach((channel) => {
        channel.classList.remove("active");
        channel.setAttribute("aria-hidden", "true");
        channel.style.opacity = "0";
    });

    const target = $(`#ch0${num}`);
    if (!target) return;

    target.classList.add("active");
    target.setAttribute("aria-hidden", "false");
    
    if (animate) {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
    } else {
        window.scrollTo(0, 0);
    }

    const reveal = () => {
        target.style.opacity = "1";
        triggerRevealAnimations(target);
    };

    if (animate && hasGsap()) {
        gsap.fromTo(target, { opacity: 0 }, { opacity: 1, duration: 0.32, ease: "power2.out", onComplete: reveal });
    } else {
        reveal();
    }
    updateProgressBar();
}

export function switchChannel(num) {
    if (isZapping || num === currentChannel || num < 1 || num > totalChannels) return;
    if (prefersReducedMotion.matches) {
        showChannel(num, false);
        return;
    }

    isZapping = true;
    const flash = $("#zapFlash");
    const zapCanvas = $("#zap-canvas");
    if (!flash || !zapCanvas) {
        showChannel(num, false);
        isZapping = false;
        return;
    }

    if (window.startZapStatic) {
        window.startZapStatic();
    }

    // Phase 1: White flash (CRT beam deflection starts)
    flash.style.opacity = "0.85";
    window.setTimeout(() => {
        // Phase 2: Static noise covers the screen
        flash.style.opacity = "0";
        zapCanvas.style.opacity = "1";
        
        // Swap channels instantly underneath the static cover.
        // Disable page wrapper fade animation (animate=false) to avoid intermediate black frames.
        showChannel(num, false);
        
        window.setTimeout(() => {
            // Phase 3: Remove static noise once content is loaded and animating
            zapCanvas.style.opacity = "0";
            cancelAnimationFrame(getZapAnimId());
            isZapping = false;
        }, 150); // 150ms static screen duration
    }, 70);
}

export function updateProgressBar() {
    const bar = $("#progressBar");
    if (bar) {
        bar.style.width = `${((currentChannel - 1) / (totalChannels - 1)) * 100}%`;
    }
}

export function triggerRevealAnimations(container) {
    const reveals = $$(".reveal", container);
    reveals.forEach((element) => {
        if (hasGsap()) {
            gsap.killTweensOf(element);
        }
        element.classList.remove("revealed");
        element.style.opacity = "";
        element.style.transform = "";
        element.style.transitionDelay = "";
    });

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            reveals.forEach((element, index) => {
                const delay = Math.min(index * 0.02, 0.25);
                element.style.transitionDelay = `${delay}s`;
                element.classList.add("revealed");
            });
        });
    });
}

export function initStatsAnimations() {
    // Deprecated: handled by triggerRevealAnimations natively
}

function setCustomCursorActive(active) {
    const cursor = $("#cursor");
    if (active) {
        document.body.classList.add("has-custom-cursor");
        if (cursor) cursor.style.display = "block";
    } else {
        document.body.classList.remove("has-custom-cursor");
        if (cursor) cursor.style.display = "none";
    }
}

export function openSourcesWithHighlight(sourceId) {
    const dialog = $("#sourcesDialog");
    if (!dialog) return;

    setCustomCursorActive(false);

    if (typeof dialog.showModal === "function") {
        if (!dialog.open) dialog.showModal();
    } else {
        dialog.setAttribute("open", "");
    }

    // Clear previous highlights
    $$(".source-card.highlighted").forEach((card) => {
        card.classList.remove("highlighted");
    });

    const card = $(`#src-${sourceId}`);
    if (card) {
        setTimeout(() => {
            card.scrollIntoView({ behavior: "smooth", block: "center" });
            card.classList.add("highlighted");
            
            // Remove highlight after a few seconds
            setTimeout(() => {
                card.classList.remove("highlighted");
            }, 3000);
        }, 150);
    }
}

export function initSourcesDialog() {
    const dialog = $("#sourcesDialog");
    const closeButton = $("#closeSources");
    if (!dialog || !closeButton) return;

    const open = () => {
        setCustomCursorActive(false);
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
        closeButton.focus();
    };

    const close = () => {
        setCustomCursorActive(true);
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
    };

    // Close event is native and fires when Escape is pressed or .close() is called
    dialog.addEventListener("close", () => {
        setCustomCursorActive(true);
    });

    $$("[data-open-sources]").forEach((button) => button.addEventListener("click", open));
    closeButton.addEventListener("click", close);

    dialog.addEventListener("click", (event) => {
        const rect = dialog.getBoundingClientRect();
        const clickedBackdrop = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
        if (clickedBackdrop) close();
    });

    document.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-open-sources-id]");
        if (trigger) {
            event.preventDefault();
            const sourceId = trigger.getAttribute("data-open-sources-id");
            openSourcesWithHighlight(sourceId);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && dialog.open) close();
    });
}

export function bindEvents() {
    const introBtn = $("#introBtn");
    const chPlus = $("#chPlus");
    const chMinus = $("#chMinus");

    if (introBtn) introBtn.addEventListener("click", enterSite);
    if (chPlus) chPlus.addEventListener("click", () => switchChannel(currentChannel < totalChannels ? currentChannel + 1 : 1));
    if (chMinus) chMinus.addEventListener("click", () => switchChannel(currentChannel > 1 ? currentChannel - 1 : totalChannels));

    document.addEventListener("click", (event) => {
        const channelButton = event.target.closest("[data-channel]");
        if (channelButton) switchChannel(Number(channelButton.dataset.channel));
    });

    document.addEventListener("keydown", (event) => {
        const intro = $("#intro");
        const introVisible = intro && !intro.hidden && intro.style.display !== "none";
        const dialog = $("#sourcesDialog");
        const dialogOpen = dialog && dialog.open;

        if (introVisible && event.key === "Enter") {
            event.preventDefault();
            enterSite();
            return;
        }

        if (introVisible || dialogOpen) return;

        if (event.key === "ArrowRight" || event.key === "+") {
            switchChannel(currentChannel < totalChannels ? currentChannel + 1 : 1);
        } else if (event.key === "ArrowLeft" || event.key === "-") {
            switchChannel(currentChannel > 1 ? currentChannel - 1 : totalChannels);
        } else if (/^[1-5]$/.test(event.key)) {
            switchChannel(Number(event.key));
        }
    });
}

export function initThemeToggle() {
    const btn = $("#themeToggleBtn");
    if (!btn) return;

    // Check saved preference (default is light)
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.remove("light-theme");
        btn.textContent = "MODE CLAIR";
    } else {
        document.body.classList.add("light-theme");
        btn.textContent = "MODE SOMBRE";
    }

    btn.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light-theme");
        if (isLight) {
            localStorage.setItem("theme", "light");
            btn.textContent = "MODE SOMBRE";
        } else {
            localStorage.setItem("theme", "dark");
            btn.textContent = "MODE CLAIR";
        }
    });
}
