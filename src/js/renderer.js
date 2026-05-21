/* DOM Rendering Module */

import {
    timelineData,
    statsData,
    surveyData,
    surveyQuotesData,
    sourcesData,
    testimonialsData,
    platformsData,
    creditsData,
    reportageData,
    homeChannels
} from '../data/index.js';

const $ = (selector) => document.querySelector(selector);

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function sourceChips(ids = []) {
    return ids.map((id) => {
        const source = sourcesData.find((s) => s.id === id);
        if (!source) return "";
        return `<button class="source-chip" type="button" data-open-sources-id="${escapeHtml(id)}">Source : ${escapeHtml(source.name)}</button>`;
    }).filter(Boolean).join("");
}

export function renderHomeCards() {
    const el = $("#homeCards");
    if (!el) return;
    el.innerHTML = homeChannels.map((item) => `
        <button class="ch01-card reveal" type="button" data-channel="${item.channel}" aria-label="Ouvrir le canal ${String(item.channel).padStart(2, "0")}">
            <div class="ch01-card-num">${String(item.channel).padStart(2, "0")}</div>
            <div class="ch01-card-title">${escapeHtml(item.title)}</div>
            <div class="ch01-card-desc">${escapeHtml(item.description)}</div>
        </button>
    `).join("");
}

export function renderTimeline() {
    const el = $("#timelineTrack");
    if (!el) return;
    el.innerHTML = timelineData.map((item) => `
        <article class="timeline-card">
            <div class="timeline-img">
                <img src="assets/canal02/${item.image}" alt="${escapeHtml(item.title)}" loading="lazy">
            </div>
            <div class="timeline-year">${escapeHtml(item.year)}</div>
            <h3 class="timeline-event">${escapeHtml(item.title)}</h3>
            <p class="timeline-desc">${escapeHtml(item.description)}</p>
            <div>${sourceChips(item.sourceIds)}</div>
        </article>
    `).join("");
}

export function renderStats() {
    const elCards = $("#statsCards");
    if (elCards) {
        elCards.innerHTML = statsData.cards.map((item) => `
            <article class="stat-card reveal">
                <div class="stat-number">${escapeHtml(item.value)}</div>
                <p class="stat-label" style="font-weight:600; text-transform:uppercase; letter-spacing:1px; margin-top:14px; font-size:0.92rem; color:#BDBDBD;">${escapeHtml(item.label)}</p>
                ${item.detail ? `<p class="stat-detail" style="color:var(--muted); font-size:0.8rem; line-height:1.55; margin-top:12px;">${escapeHtml(item.detail)}</p>` : ""}
            </article>
        `).join("");
    }

    const elNationalCards = $("#nationalStatsCards");
    if (elNationalCards) {
        elNationalCards.innerHTML = statsData.nationalCards.map((item) => `
            <article class="stat-card reveal">
                <div class="stat-number">${escapeHtml(item.value)}</div>
                <p class="stat-label" style="font-weight:600; text-transform:uppercase; letter-spacing:1px; margin-top:14px; font-size:0.92rem; color:#BDBDBD;">${escapeHtml(item.label)}</p>
                <p class="stat-detail" style="color:var(--muted); font-size:0.8rem; line-height:1.55; margin-top:12px;">${escapeHtml(item.detail)}</p>
                <p class="source-note" style="margin-top: 12px; font-size: 0.72rem; color: var(--red);">
                    Source : <button type="button" class="source-link-btn" data-open-sources-id="${escapeHtml(item.sourceId)}" style="background: none; border: none; padding: 0; color: var(--red); text-decoration: underline; cursor: pointer; font-size: inherit; font-family: inherit; font-weight: inherit; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--red)'">${escapeHtml(item.source)}</button>
                </p>
            </article>
        `).join("");
    }
}

export function renderSurvey() {
    const elLink = $("#surveyLink");
    if (elLink) {
        elLink.href = surveyData.formUrl;
    }
    
    const elResults = $("#surveyResults");
    if (!elResults) return;

    // Helper to render horizontal charts
    const renderHorizontalChart = (title, items) => {
        const rows = items.map((item) => {
            const word = item.value === 1 ? "réponse" : "réponses";
            return `
                <div class="chart-row-horizontal">
                    <div class="chart-row-info">
                        <span class="chart-row-label">${escapeHtml(item.label)}</span>
                        <span class="chart-row-value" style="color: var(--red); font-weight: 700;">${item.percent} % <span style="color: var(--muted); font-weight: normal; margin-left: 4px;">(${item.value} ${word})</span></span>
                    </div>
                    <div class="chart-bar-horizontal-bg" aria-hidden="true">
                        <div class="chart-bar-horizontal-fill" style="--width: ${item.percent}%"></div>
                    </div>
                </div>
            `;
        }).join("");
        return `
            <div class="chart-container-horizontal reveal">
                <h4 class="chart-title-horizontal" style="margin: 0 0 14px; color: var(--text); font-family: 'Bebas Neue', Impact, sans-serif; font-size: 1.25rem; letter-spacing: 1.5px;">${escapeHtml(title)}</h4>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${rows}
                </div>
            </div>
        `;
    };

    // Bloc 2: Graphiques en barres horizontales
    const chartsHtml = `
        <div class="charts-grid-horizontal">
            ${renderHorizontalChart("Fréquence de la télévision en direct", surveyData.tvDirect)}
            ${renderHorizontalChart("Usage du streaming / VOD", surveyData.streamingUse)}
            ${renderHorizontalChart("Écran principal utilisé", surveyData.screens)}
            ${renderHorizontalChart("Plateformes les plus utilisées", surveyData.platforms)}
            ${renderHorizontalChart("Préférence de consommation", surveyData.consumptionPreference)}
            ${renderHorizontalChart("Avenir de la télévision", surveyData.future)}
        </div>
    `;

    // Bloc 3: Analyse rédigée
    const analysisHtml = `
        <div class="survey-analysis-box reveal">
            <h4 style="margin: 0 0 14px; color: var(--text); font-family: 'Bebas Neue', Impact, sans-serif; font-size: 1.25rem; letter-spacing: 1.5px;">Ce que montrent les résultats</h4>
            <p>Les résultats du sondage confirment une bascule nette vers les usages à la demande. Le streaming est presque généralisé parmi les répondants : 97,5 % déclarent utiliser des plateformes de vidéo à la demande au moins rarement, et 65 % les utilisent tous les jours. À l’inverse, la télévision en direct reste présente, mais de manière plus fragile : 46,2 % des répondants déclarent ne jamais la regarder, et 37,5 % seulement rarement.</p>
            <p>Le choix de l’écran montre aussi une rupture avec le modèle traditionnel. L’ordinateur arrive en tête avec 48,8 % des réponses, devant le smartphone avec 31,2 %, tandis que le téléviseur ne représente que 17,5 % des usages principaux. Chez ce public majoritairement jeune et étudiant, la vidéo n’est donc plus forcément associée au poste de télévision.</p>
            <p>La télévision conserve cependant certains rôles spécifiques : événements en direct, sport, émissions de divertissement, journal télévisé ou simple présence dans le foyer. Elle ne disparaît pas totalement, mais elle perd son statut de réflexe quotidien. Le signal n’est donc pas coupé : il circule sur d’autres supports et selon d’autres habitudes.</p>
        </div>
    `;

    // Étape 6: Note méthodologique
    const methodologyHtml = `
        <div class="survey-methodology-note reveal">
            <p style="margin:0;"><strong>Note méthodologique :</strong> ce sondage a été réalisé dans le cadre d’un projet étudiant auprès de 80 répondants. L’échantillon est majoritairement composé de jeunes adultes et d’étudiants : 93,8 % ont entre 19 et 25 ans et 78,8 % sont étudiants. Les résultats doivent donc être lus comme des tendances exploratoires, et non comme une mesure représentative de l’ensemble de la population française.</p>
        </div>
    `;

    // Assemble everything
    elResults.innerHTML = `
        ${chartsHtml}
        ${analysisHtml}
        ${methodologyHtml}
    `;
}

export function renderQuoteCards() {
    const el = $("#quoteCards");
    if (!el) return;
    el.innerHTML = surveyQuotesData.map((item) => `
        <article class="quote-card reveal">
            <p class="quote-text">« ${escapeHtml(item.quote)} »</p>
            <div class="quote-meta" style="margin-top: 14px; color: var(--red); font-size: 0.8rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">${escapeHtml(item.context)}</div>
        </article>
    `).join("");
}

export function renderPlatforms() {
    const el = $("#platformCards");
    if (!el) return;
    el.innerHTML = platformsData.map((item) => `
        <article class="platform-card">
            <div class="platform-logo" aria-hidden="true">${escapeHtml(item.name)}</div>
            <h3 class="platform-name">${escapeHtml(item.name)}</h3>
            <p class="platform-strategy">${escapeHtml(item.strategy)}</p>
            <ul class="platform-points">${item.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
            <div>${sourceChips(item.sourceIds)}</div>
        </article>
    `).join("");
}

export function renderReportage() {
    const el = $("#reportageCards");
    if (!el) return;
    el.innerHTML = reportageData.map((item) => {
        const badgeHtml = item.badge ? `<span class="card-badge">${escapeHtml(item.badge)}</span>` : "";
        if (item.checklist) {
            return `
                <article class="report-card">
                    ${badgeHtml}
                    <h3>${escapeHtml(item.title)}</h3>
                    <ul class="checklist">
                        ${item.checklist.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}
                    </ul>
                </article>
            `;
        }
        return `
            <article class="report-card">
                ${badgeHtml}
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.text)}</p>
            </article>
        `;
    }).join("");
}

export function renderTestimonials() {
    const el = $("#testimonialCards");
    if (!el) return;
    el.innerHTML = testimonialsData.map((item) => `
        <article class="testimonial-item">
            <h3>${escapeHtml(item.title)}</h3>
            <p class="testimonial-text">${escapeHtml(item.text)}</p>
        </article>
    `).join("");
}

export function renderCredits() {
    const el = $("#creditsCards");
    if (!el) return;
    el.innerHTML = creditsData.map((item) => `<article class="credit-card"><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.role)}</p></article>`).join("");
}

export function renderSources() {
    const el = $("#sourcesGrid");
    if (!el) return;
    el.innerHTML = sourcesData.map((source) => `
        <article class="source-card" id="src-${escapeHtml(source.id)}" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div class="source-name" style="font-size: 0.85rem; text-transform: uppercase; color: var(--red); letter-spacing: 1px; margin-bottom: 4px;">${escapeHtml(source.name)}</div>
                <h3 class="source-title-text" style="margin: 0 0 10px; color: var(--text); font-size: 1.1rem; line-height: 1.3; font-family: 'Bebas Neue', Impact, sans-serif; letter-spacing: 1px;">${escapeHtml(source.title)}</h3>
                <p class="source-used-for" style="margin: 8px 0; color: var(--muted); font-size: 0.85rem; line-height: 1.5;"><strong>Utilisé pour :</strong> ${escapeHtml(source.usedFor)}</p>
                <p class="source-reliability" style="margin: 4px 0; color: #888; font-size: 0.78rem;"><strong>Fiabilité :</strong> ${escapeHtml(source.reliability)}</p>
            </div>
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--line); display: flex; flex-direction: column; gap: 4px; font-size: 0.76rem; color: #666;">
                <span><strong>Date de publication :</strong> ${escapeHtml(source.publicationDate)}</span>
                <span><strong>Date de consultation :</strong> ${escapeHtml(source.consultationDate)}</span>
                <div style="margin-top: 10px;">
                    <a class="text-link" href="${escapeHtml(source.url)}" target="_blank" rel="noopener" style="font-size: 0.8rem; padding: 6px 12px; min-height: 30px; display: inline-flex; width: auto; margin-top: 0;">Consulter la source</a>
                </div>
            </div>
        </article>
    `).join("");
}

export function renderAll() {
    renderHomeCards();
    renderTimeline();
    renderStats();
    renderSurvey();
    renderQuoteCards();
    renderPlatforms();
    renderReportage();
    renderTestimonials();
    renderCredits();
    renderSources();
}
