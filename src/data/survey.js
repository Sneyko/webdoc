export const surveyData = {
    formUrl: "https://forms.gle/yWokKNiJgzBMK22H6",
    hasResults: true,
    responses: 80,
    profile: {
        age: [
            { label: "19-25 ans", value: 75, percent: 93.8 },
            { label: "26-35 ans", value: 3, percent: 3.8 },
            { label: "Moins de 18 ans", value: 2, percent: 2.5 }
        ],
        situation: [
            { label: "Étudiant", value: 63, percent: 78.8 },
            { label: "Actif", value: 10, percent: 12.5 },
            { label: "Recherche d'emploi", value: 7, percent: 8.8 }
        ]
    },
    metrics: [
        {
            label: "Nombre de réponses",
            type: "number",
            value: 80,
            detail: "Sondage exploratoire diffusé dans un cercle étudiant et personnel."
        },
        {
            label: "Regardent encore la TV en direct",
            type: "percent",
            value: 53.8,
            detail: "Inclut les réponses : rarement, régulièrement ou tous les jours."
        },
        {
            label: "Utilisent le streaming ou la VOD",
            type: "percent",
            value: 97.5,
            detail: "78 répondants sur 80 utilisent des plateformes au moins rarement."
        },
        {
            label: "Préfèrent regarder quand ils veulent",
            type: "percent",
            value: 95,
            detail: "La liberté de choix est le critère dominant face au direct."
        }
    ],
    tvDirect: [
        { label: "Jamais", value: 37, percent: 46.2 },
        { label: "Rarement", value: 30, percent: 37.5 },
        { label: "Régulièrement", value: 12, percent: 15 },
        { label: "Tous les jours", value: 1, percent: 1.2 }
    ],
    streamingUse: [
        { label: "Oui, tous les jours", value: 52, percent: 65 },
        { label: "Oui, plusieurs fois par semaine", value: 21, percent: 26.2 },
        { label: "Oui, rarement", value: 5, percent: 6.2 },
        { label: "Non, jamais", value: 2, percent: 2.5 }
    ],
    screens: [
        { label: "Ordinateur", value: 39, percent: 48.8 },
        { label: "Smartphone", value: 25, percent: 31.2 },
        { label: "Téléviseur", value: 14, percent: 17.5 },
        { label: "Tablette", value: 2, percent: 2.5 }
    ],
    platforms: [
        { label: "Netflix", value: 44, percent: 55 },
        { label: "YouTube", value: 41, percent: 51.2 },
        { label: "Twitch", value: 35, percent: 43.8 },
        { label: "Disney+", value: 29, percent: 36.2 },
        { label: "Prime Video", value: 18, percent: 22.5 },
        { label: "France.tv", value: 11, percent: 13.8 },
        { label: "Crunchyroll", value: 8, percent: 10 },
        { label: "Arte", value: 5, percent: 6.2 }
    ],
    tvSituations: [
        { label: "Je ne regarde jamais la télévision", value: 37, percent: 46.2 },
        { label: "Divertissement / émissions", value: 18, percent: 22.5 },
        { label: "Événements en direct", value: 18, percent: 22.5 },
        { label: "Quand elle est déjà allumée chez moi", value: 17, percent: 21.2 },
        { label: "Sport", value: 16, percent: 20 },
        { label: "Infos / JT", value: 14, percent: 17.5 },
        { label: "Films / séries en soirée", value: 10, percent: 12.5 }
    ],
    future: [
        { label: "Oui, surtout sous forme de plateformes/replay", value: 53, percent: 66.2 },
        { label: "Non, elle aura complètement disparu", value: 11, percent: 13.8 },
        { label: "Oui, presque comme aujourd’hui", value: 9, percent: 11.2 },
        { label: "Je ne sais pas", value: 7, percent: 8.8 }
    ],
    consumptionPreference: [
        { label: "Regarder quand je veux (à la demande)", value: 76, percent: 95 },
        { label: "Regarder à heure fixe (direct / grille horaire)", value: 4, percent: 5 }
    ],
    quotes: [
        "Pouvoir regarder quand on veut et où on veut.",
        "Le choix et l'absence de publicités.",
        "Pas de pub et plus adapté à mon rythme.",
        "Le catalogue de séries et films est plus intéressant.",
        "Flexibilité totale.",
        "Le streaming permet d'éviter les programmes médiocres de la TNT."
    ]
};

export const surveyQuotesData = [
    {
        quote: "Pouvoir regarder quand on veut et où on veut.",
        context: "Réponse au sondage - préférence pour le streaming"
    },
    {
        quote: "Le choix et l'absence de publicités.",
        context: "Réponse au sondage - avantage perçu du streaming"
    },
    {
        quote: "Pas de pub et plus adapté à mon rythme.",
        context: "Réponse au sondage - usage personnalisé"
    },
    {
        quote: "Le catalogue de séries et films est plus intéressant.",
        context: "Réponse au sondage - richesse des plateformes"
    },
    {
        quote: "Flexibilité totale.",
        context: "Réponse au sondage - liberté de consommation"
    },
    {
        quote: "Le streaming permet d'éviter les programmes médiocres de la TNT.",
        context: "Réponse au sondage - rejet de la télévision linéaire"
    }
];
