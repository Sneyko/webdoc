/* Custom CRT Cursor Controller */

const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

export function initCursor() {
    const cursor = document.querySelector("#cursor");
    if (!cursor || !canHover.matches) return;

    document.body.classList.add("has-custom-cursor");

    document.addEventListener("mousemove", (event) => {
        cursor.style.left = `${event.clientX - 6}px`;
        cursor.style.top = `${event.clientY - 6}px`;
    });

    document.addEventListener("mouseover", (event) => {
        if (event.target.closest("button, a, .timeline-card, .platform-card, .ch01-card")) {
            cursor.classList.add("hover");
        }
    });

    document.addEventListener("mouseout", (event) => {
        if (event.target.closest("button, a, .timeline-card, .platform-card, .ch01-card")) {
            cursor.classList.remove("hover");
        }
    });
}
