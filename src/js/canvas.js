/* Noise Canvas Controller */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let staticAnimId = null;
let zapAnimId = null;

export function getStaticAnimId() {
    return staticAnimId;
}

export function setStaticAnimId(id) {
    staticAnimId = id;
}

export function getZapAnimId() {
    return zapAnimId;
}

export function setZapAnimId(id) {
    zapAnimId = id;
}

export function setupNoiseCanvas(canvas, divider = 6) {
    canvas.width = Math.max(180, Math.floor(window.innerWidth / divider));
    canvas.height = Math.max(120, Math.floor(window.innerHeight / divider));
}

export function drawStatic(ctx, canvas, intensity = 0.7) {
    if (!ctx) return;
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const value = Math.floor(Math.random() * 255 * intensity);
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = Math.floor(255 * intensity);
    }
    ctx.putImageData(imageData, 0, 0);
}

export function startStatic(canvas, ctx, intensity, assignId) {
    let lastFrame = 0;
    const loop = (time) => {
        if (time - lastFrame > 140) {
            drawStatic(ctx, canvas, intensity);
            lastFrame = time;
        }
        assignId(requestAnimationFrame(loop));
    };
    if (prefersReducedMotion.matches) {
        drawStatic(ctx, canvas, 0.25);
        return;
    }
    assignId(requestAnimationFrame(loop));
}

export function initCanvases() {
    const staticCanvas = document.querySelector("#staticCanvas");
    const zapCanvas = document.querySelector("#zap-canvas");
    if (!staticCanvas || !zapCanvas) return;

    const staticCtx = staticCanvas.getContext("2d", { alpha: true });
    const zapCtx = zapCanvas.getContext("2d", { alpha: true });
    
    const resize = () => {
        setupNoiseCanvas(staticCanvas, 6);
        setupNoiseCanvas(zapCanvas, 6);
        drawStatic(staticCtx, staticCanvas, 0.45);
    };
    
    resize();
    window.addEventListener("resize", resize, { passive: true });
    
    startStatic(staticCanvas, staticCtx, 0.55, (id) => { staticAnimId = id; });
    
    window.startZapStatic = () => {
        setupNoiseCanvas(zapCanvas, 6);
        drawStatic(zapCtx, zapCanvas, 0.8);
        startStatic(zapCanvas, zapCtx, 0.8, (id) => { zapAnimId = id; });
    };
}
