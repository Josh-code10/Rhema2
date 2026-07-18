// Rhema - Voice Scripture Finder Engine

// Phonetic corrections mapping for misheard Bible book names
const MISHEARD_BOOKS_MAP = {
    "efficents": "ephesians",
    "efficient": "ephesians",
    "effusions": "ephesians",
    "effervescent": "ephesians",
    "effacing": "ephesians",
    "officer": "ephesians",
    
    "philippines": "philippians",
    "philipians": "philippians",
    
    "cushions": "colossians",
    "collations": "colossians",
    "coalition": "colossians",
    
    "gollations": "galatians",
    "glaciers": "galatians",
    
    "ecclesiastical": "ecclesiastes",
    
    "havacuc": "habakkuk",
    "stephanie": "zephaniah",
    
    "her guy": "haggai",
    "haggy": "haggai",
    
    "filimon": "philemon",
    "revelations": "revelation",
    "axe": "acts",
    "ax": "acts"
};

const PATTERN_CORRECTIONS = [
    { regex: /\barms\s+(\d+)\b/gi, replacement: "psalms $1" },
    { regex: /\bsams\s+(\d+)\b/gi, replacement: "psalms $1" },
    { regex: /\bsongs\s+(\d+)\b/gi, replacement: "psalms $1" },
    { regex: /\bjenny's\s+is\b/gi, replacement: "genesis" },
    { regex: /\bdo\s+the\s+run\s+on\s+me\b/gi, replacement: "deuteronomy" },
    { regex: /\bdo\s+you\s+run\s+on\s+me\b/gi, replacement: "deuteronomy" },
    { regex: /\bphilip\s+mon\b/gi, replacement: "philemon" },
    { regex: /\bhave\s+a\s+cook\b/gi, replacement: "habakkuk" },
    { regex: /\bhover\s+cook\b/gi, replacement: "habakkuk" },
    { regex: /\blove\s+it\s+because\b/gi, replacement: "leviticus" },
    { regex: /\bhe\s+brews\b/gi, replacement: "hebrews" }
];

// Curated Bible Story & Concept Index (Semantic matching for narratives/events)
const BIBLE_CONCEPT_INDEX = [
    {
        keywords: ["gideon", "300 men", "three hundred men", "story of gideon", "300 soldiers"],
        ref: "Judges 7:1",
        description: "Gideon defeats the Midianites with 300 men."
    },
    {
        keywords: ["redeemer lives", "redeemer liveth", "my redeemer lives", "job redeemer"],
        ref: "Job 19:25",
        description: "Job declares his faith in a living Redeemer."
    },
    {
        keywords: ["gideon's fleece", "fleece of wool"],
        ref: "Judges 6:36-40",
        description: "Gideon tests God with a wet and dry fleece."
    },
    {
        keywords: ["sampson and delilah", "samson and delilah", "samson's hair", "samson"],
        ref: "Judges 16:4-21",
        description: "Delilah cuts Samson's hair, betraying him."
    },
    {
        keywords: ["david and goliath", "goliath", "david kills goliath", "stone and sling"],
        ref: "1 Samuel 17:40-51",
        description: "David defeats the giant Goliath."
    },
    {
        keywords: ["noah's ark", "noah and the ark", "the flood", "great flood", "noah ark"],
        ref: "Genesis 6:13-22",
        description: "God instructs Noah to build the ark."
    },
    {
        keywords: ["moses splits the red sea", "parting of the red sea", "crossing the red sea", "red sea"],
        ref: "Exodus 14:21-22",
        description: "Moses parts the waters of the Red Sea."
    },
    {
        keywords: ["ten commandments", "commandments on stone", "mount sinai", "the law"],
        ref: "Exodus 20:1-17",
        description: "God delivers the Ten Commandments."
    },
    {
        keywords: ["walls of jericho", "jericho falls", "jericho"],
        ref: "Joshua 6:15-20",
        description: "Jericho's walls collapse after marching."
    },
    {
        keywords: ["daniel in the lions' den", "lions den", "daniel lions den", "lions' den"],
        ref: "Daniel 6:16-23",
        description: "Daniel is saved in the lions' den."
    },
    {
        keywords: ["fiery furnace", "shadrach meshach abednego", "four men in the fire"],
        ref: "Daniel 3:19-25",
        description: "Shadrach, Meshach, and Abednego survive the furnace."
    },
    {
        keywords: ["birth of jesus", "baby jesus", "manger", "virgin birth", "nativity"],
        ref: "Luke 2:1-14",
        description: "Jesus Christ is born in Bethlehem."
    },
    {
        keywords: ["sermon on the mount", "beatitudes"],
        ref: "Matthew 5:1-12",
        description: "Jesus teaches the Beatitudes."
    },
    {
        keywords: ["jesus walks on water", "walks on water"],
        ref: "Matthew 14:22-33",
        description: "Jesus walks on water to the disciples."
    },
    {
        keywords: ["crucifixion of jesus", "crucifixion", "jesus died on the cross", "calvary"],
        ref: "Luke 23:33-46",
        description: "Jesus is crucified at Calvary."
    },
    {
        keywords: ["resurrection of jesus", "jesus rose again", "empty tomb", "he is risen"],
        ref: "Matthew 28:1-10",
        description: "Jesus rises from the grave."
    },
    {
        keywords: ["prodigal son", "story of the prodigal son", "lost son"],
        ref: "Luke 15:11-32",
        description: "Parable of the Prodigal Son."
    },
    {
        keywords: ["good samaritan", "story of the good samaritan"],
        ref: "Luke 10:25-37",
        description: "Parable of the Good Samaritan."
    },
    {
        keywords: ["angel touched john", "angel touching john", "john the revelator", "john the evangelist"],
        ref: "Revelation 1:1-3",
        description: "Revelation given to John on Patmos."
    },
    {
        keywords: ["john baptizes jesus", "baptism of jesus", "spirit descended like a dove"],
        ref: "Matthew 3:13-17",
        description: "John baptizes Jesus in the Jordan River."
    },
    {
        keywords: ["creation", "in the beginning", "god created the heavens"],
        ref: "Genesis 1:1-5",
        description: "God creates the heavens and the earth."
    },
    {
        keywords: ["tower of babel", "confused the languages"],
        ref: "Genesis 11:1-9",
        description: "God scatters humanity at Babel."
    },
    {
        keywords: ["abraham offering isaac", "sacrifice of isaac", "mount moriah"],
        ref: "Genesis 22:1-14",
        description: "Abraham tests his obedience with Isaac."
    },
    {
        keywords: ["burning bush", "moses burning bush", "i am that i am"],
        ref: "Exodus 3:1-14",
        description: "God speaks to Moses from a burning bush."
    },
    {
        keywords: ["water from the rock", "moses strikes the rock"],
        ref: "Exodus 17:1-7",
        description: "Moses strikes the rock at Horeb."
    },
    {
        keywords: ["solomon's wisdom", "wise judgment of solomon", "two mothers"],
        ref: "1 Kings 3:16-28",
        description: "Solomon settles the baby dispute."
    },
    {
        keywords: ["elijah and prophets of baal", "fire from heaven", "mount carmel"],
        ref: "1 Kings 18:20-40",
        description: "Elijah challenges Baal's prophets on Mount Carmel."
    },
    {
        keywords: ["valley of dry bones", "dry bones live"],
        ref: "Ezekiel 37:1-10",
        description: "Ezekiel prophesies to dry bones."
    },
    {
        keywords: ["jonah and the whale", "jonah swallowed by a fish", "nineveh"],
        ref: "Jonah 1:17-2:10",
        description: "Jonah is swallowed by a fish."
    },
    {
        keywords: ["water into wine", "wedding at cana", "first miracle of jesus"],
        ref: "John 2:1-11",
        description: "Jesus turns water into wine at Cana."
    },
    {
        keywords: ["feeding of the five thousand", "loaves and fishes"],
        ref: "Matthew 14:13-21",
        description: "Jesus feeds 5,000 with loaves and fishes."
    },
    {
        keywords: ["lazarus raised", "lazarus come forth"],
        ref: "John 11:38-44",
        description: "Jesus raises Lazarus from the dead."
    },
    {
        keywords: ["conversion of saul", "road to damascus", "saul saul why persecutest thou me"],
        ref: "Acts 9:1-19",
        description: "Saul is converted on the road to Damascus."
    },
    {
        keywords: ["pentecost", "day of pentecost", "tongues of fire"],
        ref: "Acts 2:1-4",
        description: "The Holy Spirit descends at Pentecost."
    }
];

// Helper: Phonetic term corrector
function correctMisheardText(text) {
    if (!text) return "";
    let cleaned = text.toLowerCase();
    
    // 1. Run pattern-based regex corrections
    PATTERN_CORRECTIONS.forEach(rule => {
        cleaned = cleaned.replace(rule.regex, rule.replacement);
    });
    
    // 2. Run simple word replacements
    for (const [misheard, corrected] of Object.entries(MISHEARD_BOOKS_MAP)) {
        const regex = new RegExp(`\\b${misheard}\\b`, 'gi');
        cleaned = cleaned.replace(regex, corrected);
    }
    
    // Capitalize sentence-start letter
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

// Helper: Calculate search match relevance scores (Prioritizes exact phrase matches)
function calculateRelevanceScore(verseText, queryText) {
    if (!verseText || !queryText) return 0;
    
    const cleanVerse = verseText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    const cleanQuery = queryText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    
    // A. Direct exact phrase match gets a large priority boost
    if (cleanVerse.includes(cleanQuery)) {
        return 1000;
    }
    
    // B. Keyword overlap counts
    const queryWords = cleanQuery.split(/\s+/).filter(w => w.length > 1);
    let matchCount = 0;
    queryWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = cleanVerse.match(regex);
        if (matches) {
            matchCount += matches.length;
        }
    });
    
    return matchCount * 10;
}

// Helper: Scan query for story/conceptual matches
function findConceptMatch(query) {
    if (!query) return null;
    const cleanQuery = query.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    for (const concept of BIBLE_CONCEPT_INDEX) {
        for (const kw of concept.keywords) {
            if (cleanQuery.includes(kw)) {
                return concept;
            }
        }
    }
    return null;
}

// Offline KJV Local Database Lookup Helpers
function getLocalKJVChapter(bookName, chapterNum) {
    if (typeof OFFLINE_BIBLE_KJV === "undefined") {
        console.warn("OFFLINE_BIBLE_KJV is not loaded. Offline lookup unavailable.");
        return null;
    }
    const book = OFFLINE_BIBLE_KJV.find(b => b.name.toLowerCase() === bookName.toLowerCase());
    if (!book) return null;
    const chapIdx = parseInt(chapterNum) - 1;
    if (chapIdx < 0 || chapIdx >= book.chapters.length) return null;
    
    return book.chapters[chapIdx].map((text, idx) => ({
        verse: idx + 1,
        text: text
    }));
}

function getLocalKJVVerse(bookName, chapterNum, verseNum, verseEndNum) {
    const verses = getLocalKJVChapter(bookName, chapterNum);
    if (!verses) return null;
    
    const startV = parseInt(verseNum) || 1;
    const endV = parseInt(verseEndNum) || startV;
    
    const matching = verses.filter(v => v.verse >= startV && v.verse <= endV);
    if (matching.length === 0) return null;
    
    const text = matching.map(v => v.text).join(" ").trim();
    return {
        reference: `${bookName} ${chapterNum}:${startV}` + (endV > startV ? `-${endV}` : ""),
        text: text
    };
}

function searchLocalKJVByPhrase(phrase) {
    if (typeof OFFLINE_BIBLE_KJV === "undefined") return [];
    
    const cleanQuery = phrase.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    if (!cleanQuery) return [];
    
    const results = [];
    
    for (const book of OFFLINE_BIBLE_KJV) {
        book.chapters.forEach((chapterVerses, chapIdx) => {
            chapterVerses.forEach((verseText, verseIdx) => {
                const cleanVerse = verseText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                
                if (cleanVerse.includes(cleanQuery)) {
                    results.push({
                        id: Date.now() + Math.random(),
                        reference: `${book.name} ${chapIdx + 1}:${verseIdx + 1}`,
                        text: verseText,
                        translation: "KJV (Local)",
                        isApiFetched: true,
                        relevanceScore: 1000
                    });
                }
            });
        });
    }
    
    return results.slice(0, 10);
}


// Bible Books & Aliases Map (Covers 66 books, abbreviations, and common verbal naming)
const BIBLE_BOOKS = [
    { name: "Genesis", aliases: ["genesis", "gen", "ge"] },
    { name: "Exodus", aliases: ["exodus", "ex", "exo"] },
    { name: "Leviticus", aliases: ["leviticus", "lev", "le"] },
    { name: "Numbers", aliases: ["numbers", "num", "nu"] },
    { name: "Deuteronomy", aliases: ["deuteronomy", "deut", "deu"] },
    { name: "Joshua", aliases: ["joshua", "josh", "jos"] },
    { name: "Judges", aliases: ["judges", "judg", "jud", "jd"] },
    { name: "Ruth", aliases: ["ruth", "rut", "ru"] },
    { name: "1 Samuel", aliases: ["1 samuel", "first samuel", "1 sam", "1sa", "i samuel", "samuel"] },
    { name: "2 Samuel", aliases: ["2 samuel", "second samuel", "2 sam", "2sa", "ii samuel"] },
    { name: "1 Kings", aliases: ["1 kings", "first kings", "1ki", "i kings", "kings"] },
    { name: "2 Kings", aliases: ["2 kings", "second kings", "2ki", "ii kings"] },
    { name: "1 Chronicles", aliases: ["1 chronicles", "first chronicles", "1 chron", "1ch", "i chronicles", "chronicles"] },
    { name: "2 Chronicles", aliases: ["2 chronicles", "second chronicles", "2 chron", "2ch", "ii chronicles"] },
    { name: "Ezra", aliases: ["ezra", "ezr"] },
    { name: "Nehemiah", aliases: ["nehemiah", "neh", "ne"] },
    { name: "Esther", aliases: ["esther", "esth", "est"] },
    { name: "Job", aliases: ["job", "jb"] },
    { name: "Psalms", aliases: ["psalms", "psalm", "psa", "pss"] },
    { name: "Proverbs", aliases: ["proverbs", "prov", "pr"] },
    { name: "Ecclesiastes", aliases: ["ecclesiastes", "eccl", "ecc"] },
    { name: "Song of Solomon", aliases: ["song of solomon", "song of songs", "canticles", "song"] },
    { name: "Isaiah", aliases: ["isaiah", "isa", "is"] },
    { name: "Jeremiah", aliases: ["jeremiah", "jer", "je"] },
    { name: "Lamentations", aliases: ["lamentations", "lam", "la"] },
    { name: "Ezekiel", aliases: ["ezekiel", "ezek", "eze"] },
    { name: "Daniel", aliases: ["daniel", "dan", "da"] },
    { name: "Hosea", aliases: ["hosea", "hos", "ho"] },
    { name: "Joel", aliases: ["joel", "joe", "jl"] },
    { name: "Amos", aliases: ["amos", "amo", "am"] },
    { name: "Obadiah", aliases: ["obadiah", "obad", "ob"] },
    { name: "Jonah", aliases: ["jonah", "jon", "jnh"] },
    { name: "Micah", aliases: ["micah", "mic", "mi"] },
    { name: "Nahum", aliases: ["nahum", "nah", "na"] },
    { name: "Habakkuk", aliases: ["habakkuk", "hab", "hk"] },
    { name: "Zephaniah", aliases: ["zephaniah", "zeph", "zp"] },
    { name: "Haggai", aliases: ["haggai", "hag", "hg"] },
    { name: "Zechariah", aliases: ["zechariah", "zech", "zec"] },
    { name: "Malachi", aliases: ["malachi", "mal", "ml"] },
    { name: "Matthew", aliases: ["matthew", "matt", "mat", "mt"] },
    { name: "Mark", aliases: ["mark", "mrk", "mar", "mk"] },
    { name: "Luke", aliases: ["luke", "luk", "lk"] },
    { name: "John", aliases: ["john", "joh", "jn"] },
    { name: "Acts", aliases: ["acts", "act", "ac"] },
    { name: "Romans", aliases: ["romans", "rom", "ro"] },
    { name: "1 Corinthians", aliases: ["1 corinthians", "first corinthians", "1 cor", "1co", "i corinthians", "corinthians"] },
    { name: "2 Corinthians", aliases: ["2 corinthians", "second corinthians", "2 cor", "2co", "ii corinthians"] },
    { name: "Galatians", aliases: ["galatians", "gal", "ga"] },
    { name: "Ephesians", aliases: ["ephesians", "eph", "ep"] },
    { name: "Philippians", aliases: ["philippians", "phil", "php"] },
    { name: "Colossians", aliases: ["colossians", "col", "cl"] },
    { name: "1 Thessalonians", aliases: ["1 thessalonians", "first thessalonians", "1 thess", "1th", "i thessalonians", "thessalonians"] },
    { name: "2 Thessalonians", aliases: ["2 thessalonians", "second thessalonians", "2 thess", "2th", "ii thessalonians"] },
    { name: "1 Timothy", aliases: ["1 timothy", "first timothy", "1 tim", "1ti", "i timothy", "timothy"] },
    { name: "2 Timothy", aliases: ["2 timothy", "second timothy", "2 tim", "2ti", "ii timothy"] },
    { name: "Titus", aliases: ["titus", "tit", "ti"] },
    { name: "Philemon", aliases: ["philemon", "philem", "phm"] },
    { name: "Hebrews", aliases: ["hebrews", "heb", "he"] },
    { name: "James", aliases: ["james", "jas", "jam", "jm"] },
    { name: "1 Peter", aliases: ["1 peter", "first peter", "1 pet", "1pe", "i peter", "peter"] },
    { name: "2 Peter", aliases: ["2 peter", "second peter", "2 pet", "2pe", "ii peter"] },
    { name: "1 John", aliases: ["1 john", "first john", "1 jn", "1jo", "i john"] },
    { name: "2 John", aliases: ["2 john", "second john", "2 jn", "2jo", "ii john"] },
    { name: "3 John", aliases: ["3 john", "third john", "3 jn", "3jo", "iii john"] },
    { name: "Jude", aliases: ["jude", "jud", "jd"] },
    { name: "Revelation", aliases: ["revelation", "rev", "re", "apocalypse"] }
];

// Protestant canonical order mapping (for parsing bolls.life book indices)
const BOLLS_BOOKS = [
    "", "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", 
    "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", 
    "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", 
    "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", 
    "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", 
    "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", 
    "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", 
    "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];

// Translation mappings between standard and bolls.life
const BOLLS_TRANSLATION_MAP = {
    "kjv": "KJV",
    "web": "WEB",
    "bbe": "BBE",
    "oeb-cw": "OEB",
    "oeb-us": "OEB",
    "almeida": "PORAR",
    "cherokee": "CHER",
    "nkjv": "NKJV",
    "niv": "NIV",
    "nlt": "NLT",
    "amp": "AMP",
    "gnt": "GNT"
};

// Local fallback database of popular topics
const LOCAL_FALLBACK_DB = [
    { id: 101, ref: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.", themes: ["anxiety", "peace"], keywords: ["anxious", "anxiety", "worry", "worried", "stressed", "stress", "overwhelmed"] },
    { id: 102, ref: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.", themes: ["fear", "strength"], keywords: ["fear", "afraid", "scared", "dismayed", "strengthen", "strength"] },
    { id: 103, ref: "Joshua 1:9", text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", themes: ["strength", "fear"], keywords: ["strong", "courageous", "courage", "afraid", "discouraged"] },
    { id: 104, ref: "Psalm 23:4", text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.", themes: ["grief", "fear", "peace"], keywords: ["darkest", "valley", "darkness", "fear", "comfort", "grief", "sad"] },
    { id: 105, ref: "Romans 15:13", text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.", themes: ["hope", "joy", "peace"], keywords: ["hope", "joy", "peace", "trust", "overflow"] },
    { id: 106, ref: "Hebrews 11:1", text: "Now faith is confidence in what we hope for and assurance about what we do not see.", themes: ["faith"], keywords: ["faith", "confidence", "assurance", "believe", "trust"] },
    { id: 107, ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", themes: ["faith", "wisdom"], keywords: ["trust", "heart", "understanding", "guide", "path"] },
    { id: 108, ref: "Psalm 46:1", text: "God is our refuge and strength, an ever-present help in trouble.", themes: ["strength", "peace"], keywords: ["refuge", "strength", "strong", "help", "trouble"] },
    { id: 109, ref: "John 14:27", text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.", themes: ["peace", "anxiety"], keywords: ["peace", "troubled", "afraid", "fear"] },
    { id: 110, ref: "1 Peter 5:7", text: "Cast all your anxiety on him because he cares for you.", themes: ["anxiety", "faith"], keywords: ["cast", "anxiety", "worry", "cares", "care"] },
    { id: 111, ref: "Psalm 34:18", text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.", themes: ["grief", "peace"], keywords: ["close", "brokenhearted", "saves", "crushed", "spirit", "pain", "sadness"] },
    { id: 112, ref: "Matthew 11:28-30", text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.", themes: ["peace", "anxiety", "strength"], keywords: ["weary", "burdened", "rest", "heart", "tired", "sleep"] },
    { id: 113, ref: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", themes: ["strength", "hope"], keywords: ["hope", "renew", "strength", "strong", "weary", "faint"] },
    { id: 114, ref: "2 Timothy 1:7", text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", themes: ["fear", "strength", "love"], keywords: ["timid", "fear", "power", "love", "discipline", "courage"] },
    { id: 115, ref: "1 Corinthians 13:4-7", text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud... Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.", themes: ["love", "patience"], keywords: ["love", "patient", "patience", "kind", "trusts", "hopes"] }
];

// State Variables
let recognition = null;
let isListening = false;
let isRecognitionActive = false; // keeps track of Web Speech Engine activity state
let currentTranslation = "kjv";
let transcriptHistory = [];
let voiceRestartTimer = null;
let lastMatchedReference = "";

// Workspace State
let previewSlide = null;
let liveSlide = null;
let queue = [];
let currentTheme = "deep-space";
let projectorWindow = null;
let activeTab = "scripture";
let selectedSongId = null;

// Abort Controllers & Cache (to prevent clogging during rapid searches)
let activeSearchController = null;
const searchCache = {};

// Throttle/Queue state for automatic phrase searches (max once every 6 seconds)
let searchThrottleTimer = null;
let pendingSearchText = null;
let lastSearchTime = 0;
const AUTO_SEARCH_THROTTLE_MS = 6000;
let watchdogInterval = null;

// Simulated Visualizer state
let animationFrameId = null;

// DOM Elements
const micBtn = document.getElementById("mic-btn");
const micContainer = micBtn.parentElement;
const micStatusText = document.getElementById("mic-status-text");
const listeningBadge = document.getElementById("listening-badge");
const speechSupportedBadge = document.getElementById("speech-supported-badge");
const transcriptBox = document.getElementById("transcript-box");
const clearTranscriptBtn = document.getElementById("clear-transcript-btn");
const autoQueueToggle = document.getElementById("auto-queue-toggle");
const detectionsList = document.getElementById("detections-list");

const previewSlideTitle = document.getElementById("preview-slide-title");
const previewContentBox = document.getElementById("preview-content-box");
const btnProjectLive = document.getElementById("btn-project-live");

const liveSlideTitle = document.getElementById("live-slide-title");
const liveContentBox = document.getElementById("live-content-box");
const liveScreenBg = document.getElementById("live-screen-bg");
const btnClearProjection = document.getElementById("btn-clear-projection");

const btnLaunchProjector = document.getElementById("btn-launch-projector");
const queueList = document.getElementById("queue-list");
const clearQueueBtn = document.getElementById("clear-queue-btn");

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

const bookSelect = document.getElementById("book-select");
const chapterSelect = document.getElementById("chapter-select");
const versionPills = document.getElementById("version-pills");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const bibleReaderFeed = document.getElementById("bible-reader-feed");

const songsList = document.getElementById("songs-list");
const songWorkspace = document.getElementById("song-workspace");
const themeCards = document.querySelectorAll(".theme-card");

// Initialize BroadcastChannel
const bcastChannel = new BroadcastChannel('kairos-projection');

// Worship Song Database
const WORSHIP_SONGS = [
    {
        id: 1,
        title: "Amazing Grace",
        artist: "John Newton",
        lyrics: [
            { label: "Verse 1", text: "Amazing grace! How sweet the sound\nThat saved a wretch like me!\nI once was lost, but now am found;\nWas blind, but now I see." },
            { label: "Chorus", text: "My chains are gone, I've been set free\nMy Savior, Ransom has ransomed me\nAnd like a flood His mercy reigns\nUnending love, amazing grace" },
            { label: "Verse 2", text: "Twas grace that taught my heart to fear,\nAnd grace my fears relieved;\nHow precious did that grace appear\nThe hour I first believed." },
            { label: "Verse 3", text: "Through many dangers, toils and snares,\nI have already come;\nTis grace hath brought me safe thus far,\nAnd grace will lead me home." },
            { label: "Verse 4", text: "When we've been there ten thousand years,\nBright shining as the sun,\nWe've no less days to sing God's praise\nThan when we'd first begun." }
        ]
    },
    {
        id: 2,
        title: "How Great Is Our God",
        artist: "Chris Tomlin",
        lyrics: [
            { label: "Verse 1", text: "The splendor of a King, clothed in majesty\nLet all the earth rejoice, all the earth rejoice\nHe wraps Himself in light, and darkness tries to hide\nAnd trembles at His voice, trembles at His voice" },
            { label: "Chorus", text: "How great is our God, sing with me\nHow great is our God, and all will see\nHow great, how great is our God" },
            { label: "Verse 2", text: "Age to age He stands, and time is in His hands\nBeginning and the end, beginning and the end\nThe Godhead Three in One: Father, Spirit, Son\nThe Lion and the Lamb, the Lion and the Lamb" },
            { label: "Bridge", text: "Name above all names, Worthy of all praise\nMy heart will sing: How great is our God" }
        ]
    },
    {
        id: 3,
        title: "10,000 Reasons",
        artist: "Matt Redman",
        lyrics: [
            { label: "Chorus", text: "Bless the Lord, O my soul, O my soul\nWorship His holy name\nSing like never before, O my soul\nI'll worship Your holy name" },
            { label: "Verse 1", text: "The sun comes up, it's a new day dawning\nIt's time to sing Your song again\nWhatever may pass, and whatever lies before me\nLet me be singing when the evening comes" },
            { label: "Verse 2", text: "You're rich in love, and You're slow to anger\nYour name is great, and Your heart is kind\nFor all Your goodness, I will keep on singing\nTen thousand reasons for my heart to find" },
            { label: "Verse 3", text: "And on that day when my strength is failing\nThe end draws near, and my time has come\nStill my soul will sing Your praise unending\nTen thousand years and then forevermore" }
        ]
    },
    {
        id: 4,
        title: "Cornerstone",
        artist: "Hillsong Worship",
        lyrics: [
            { label: "Verse 1", text: "My hope is built on nothing less\nThan Jesus' blood and righteousness\nI dare not trust the sweetest frame\nBut wholly trust in Jesus' name" },
            { label: "Chorus", text: "Christ alone, Cornerstone\nWeak made strong in the Savior's love\nThrough the storm, He is Lord\nLord of all" },
            { label: "Verse 2", text: "When darkness seems to hide His face\nI rest on His unchanging grace\nIn every high and stormy gale\nMy anchor holds within the veil" },
            { label: "Verse 3", text: "When He shall come with trumpet sound\nOh may I then in Him be found\nDressed in His righteousness alone\nFaultless to stand before the throne" }
        ]
    }
];

// Bible Books & Chapter Count Mapping
const BOOK_CHAPTERS = {
    "Genesis": 50, "Exodus": 40, "Leviticus": 27, "Numbers": 36, "Deuteronomy": 34, "Joshua": 24, "Judges": 21, "Ruth": 4, 
    "1 Samuel": 31, "2 Samuel": 24, "1 Kings": 22, "2 Kings": 25, "1 Chronicles": 29, "2 Chronicles": 36, "Ezra": 10, "Nehemiah": 13, "Esther": 10, 
    "Job": 42, "Psalms": 150, "Proverbs": 31, "Ecclesiastes": 12, "Song of Solomon": 8, "Isaiah": 66, "Jeremiah": 52, "Lamentations": 5, "Ezekiel": 48, 
    "Daniel": 12, "Hosea": 14, "Joel": 3, "Amos": 9, "Obadiah": 1, "Jonah": 4, "Micah": 7, "Nahum": 3, "Habakkuk": 3, 
    "Zephaniah": 3, "Haggai": 2, "Zechariah": 14, "Malachi": 4, "Matthew": 28, "Mark": 16, "Luke": 24, "John": 21, "Acts": 28, 
    "Romans": 16, "1 Corinthians": 16, "2 Corinthians": 13, "Galatians": 6, "Ephesians": 6, "Philippians": 4, "Colossians": 4, 
    "1 Thessalonians": 5, "2 Thessalonians": 3, "1 Timothy": 6, "2 Timothy": 4, "Titus": 3, "Philemon": 1, "Hebrews": 13, 
    "James": 5, "1 Peter": 5, "2 Peter": 3, "1 John": 5, "2 John": 1, "3 John": 1, "Jude": 1, "Revelation": 22
};

// Secure Context Protocol Check
function checkSecureContext() {
    if (window.location.protocol === 'file:') {
        const warning = document.createElement("div");
        warning.className = "secure-context-warning";
        warning.innerHTML = `
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span><strong>Microphone Warning:</strong> Browser security blocks microphone access when opening files directly (<code>file://</code>). Please test using the local server at <a href="http://localhost:8000" target="_blank">http://localhost:8000</a>.</span>
        `;
        document.body.insertBefore(warning, document.body.firstChild);
    }
}

// 2. Initialize Web Speech API
function initSpeechRecognition() {
    if (window.electronAPI) {
        speechSupportedBadge.className = "badge badge-success";
        speechSupportedBadge.innerHTML = "<span class='dot'></span> Vosk Offline STT";
        micStatusText.textContent = "Click the button to start listening (Offline STT)";
        
        // Listen for speech results from Electron main process
        window.electronAPI.onSpeechText((data) => {
            processTranscriptText(data.text, data.isFinal);
        });

        // Listen for speech initialization errors
        window.electronAPI.onSpeechError((errorMsg) => {
            stopListening(true);
            micStatusText.style.color = "#ef4444";
            micStatusText.textContent = `STT Error: ${errorMsg}`;
        });
        return true;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        speechSupportedBadge.className = "badge badge-inactive";
        speechSupportedBadge.innerHTML = "<span class='dot'></span> Speech API Unsupported";
        micStatusText.textContent = "Voice input is not supported in this browser. Try Chrome.";
        micBtn.disabled = true;
        micBtn.style.opacity = "0.5";
        return false;
    }
    
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
        isListening = true;
        isRecognitionActive = true;
        updateUIState(true);
        playChime(440, 0.1);
    };
    
    recognition.onend = () => {
        isRecognitionActive = false;
        if (isListening) {
            clearTimeout(voiceRestartTimer);
            voiceRestartTimer = setTimeout(() => {
                if (isListening) {
                    try {
                        recognition.start();
                    } catch (e) {
                        console.log("Speech restart ignored:", e);
                    }
                }
            }, 300);
        } else {
            updateUIState(false);
            playChime(330, 0.15);
        }
    };
    
    recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        if (event.error === 'not-allowed') {
            stopListening(true);
            micStatusText.style.color = "#ef4444";
            micStatusText.textContent = "Permission denied. Allow mic access in browser settings.";
        } else if (event.error === 'no-speech') {
            // Silence ignored
        } else {
            stopListening(true);
            micStatusText.style.color = "#ef4444";
            micStatusText.textContent = `Speech error: ${event.error}`;
        }
    };
    
    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        
        if (finalTranscript) {
            processTranscriptText(finalTranscript, true);
        }
        if (interimTranscript) {
            processTranscriptText(interimTranscript, false);
        }
    };
    
    return true;
}

// 3. Keep-Alive Watchdog
function startWatchdog() {
    stopWatchdog();
    watchdogInterval = setInterval(() => {
        if (isListening && !isRecognitionActive) {
            console.log("Watchdog: Speech recognition was inactive, restarting engine...");
            try {
                recognition.start();
            } catch (e) {}
        }
    }, 4000);
}

// Stop Watchdog
function stopWatchdog() {
    if (watchdogInterval) {
        clearInterval(watchdogInterval);
        watchdogInterval = null;
    }
}

// 4. Spoken Words/Verbal Numbers-to-Digits Parser
function convertWordsToNumbers(text) {
    if (!text) return "";
    
    let words = text.toLowerCase().split(/\s+/);
    let result = [];
    
    const numberMap = {
        "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9,
        "ten": 10, "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14, "fifteen": 15, "sixteen": 16,
        "seventeen": 17, "eighteen": 18, "nineteen": 19, "twenty": 20, "thirty": 30, "forty": 40, "fifty": 50,
        "sixty": 60, "seventy": 70, "eighty": 80, "ninety": 90, "hundred": 100
    };
    
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        
        if (numberMap[word] !== undefined) {
            let num = numberMap[word];
            if (word === "hundred" && result.length > 0 && typeof result[result.length - 1] === "number") {
                result[result.length - 1] = result[result.length - 1] * 100;
            } else if (i + 1 < words.length && numberMap[words[i + 1]] !== undefined && numberMap[words[i + 1]] < 10 && num > 10 && num < 100) {
                // handles "twenty five" -> 25
                result.push(num + numberMap[words[i + 1]]);
                i++; // skip next
            } else {
                result.push(num);
            }
        } else {
            result.push(word);
        }
    }
    return result.join(" ");
}

// Spoken Scripture Reference Parser (Regex NLP)
function parseScriptureReference(rawText) {
    if (!rawText) return null;
    
    let text = correctMisheardText(rawText);
    text = convertWordsToNumbers(text);
    
    // Normalise spoken numbered books (e.g. "first John" -> "1 John")
    text = text.replace(/\b(first|second|third|1st|2nd|3rd)\s+(john|samuel|kings|chronicles|corinthians|thessalonians|timothy|peter)\b/gi, (match, num, book) => {
        const lowerNum = num.toLowerCase();
        const numVal = lowerNum.startsWith("fir") ? "1" : (lowerNum.startsWith("sec") ? "2" : "3");
        return `${numVal} ${book}`;
    });
    
    // Remove verbal filler words and normalize punctuation
    text = text.replace(/\bchapter\b/gi, " ");
    text = text.replace(/\bverses\b/gi, ":");
    text = text.replace(/\bverse\b/gi, ":");
    text = text.replace(/\bto\s+(\d+)\b/gi, "-$1");
    text = text.replace(/\bthrough\s+(\d+)\b/gi, "-$1");
    text = text.replace(/\s+/g, " "); // consolidate spaces
    
    const allAliases = [];
    BIBLE_BOOKS.forEach(book => {
        book.aliases.forEach(alias => {
            allAliases.push({ alias: alias, bookName: book.name });
        });
    });
    allAliases.sort((a, b) => b.alias.length - a.alias.length);
    
    for (const item of allAliases) {
        const regex = new RegExp(`\\b${item.alias}\\b\\s*(\\d+)(?:\\s*[:.\\s]\\s*(\\d+))?(?:\\s*-\\s*(\\d+))?`, 'i');
        const match = text.match(regex);
        
        if (match) {
            const bookName = item.bookName;
            const chapter = match[1];
            const startVerse = match[2];
            const endVerse = match[3];
            
            let reference = `${bookName} ${chapter}`;
            if (startVerse) {
                reference += `:${startVerse}`;
                if (endVerse) {
                    reference += `-${endVerse}`;
                }
            }
            return {
                reference: reference,
                book: bookName,
                chapter: chapter,
                verse: startVerse || null,
                verseEnd: endVerse || null
            };
        }
    }
    return null;
}

// Dispatcher: Check if text is a structured Reference or a search Phrase
function isScriptureReference(query) {
    if (!query) return false;
    const parsed = parseScriptureReference(query);
    return parsed !== null;
}

// stop words filter setup
const GENERIC_STOP_WORDS = new Set([
    "the", "a", "an", "and", "but", "or", "on", "in", "with", "by", "for", "at", "about", "to", "from", "of", 
    "it", "its", "he", "she", "they", "we", "i", "you", "me", "him", "her", "us", "them", "my", "your", "his", 
    "their", "our", "this", "that", "these", "those", "is", "am", "are", "was", "were", "be", "been", "being", 
    "have", "has", "had", "do", "does", "did", "can", "could", "will", "would", "shall", "should", "may", "might", 
    "must", "go", "went", "come", "came", "say", "said", "tell", "told", "ask", "asked", "know", "knew", "think", 
    "thought", "see", "saw", "look", "looked", "want", "wanted", "give", "gave", "take", "took", "make", "made", 
    "get", "got", "use", "used", "find", "found", "here", "there", "when", "where", "why", "how", "all", "any", 
    "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", 
    "so", "than", "too", "very", "what", "which", "who", "whom", "having", "doing", "if", "because", "as", 
    "until", "while", "against", "between", "into", "through", "during", "before", "after", "above", "below", 
    "up", "down", "out", "off", "over", "under", "again", "further", "then", "once", "just", "now", "church", 
    "pastor", "today", "morning", "evening", "brother", "sister", "welcome", "service", "hello", "good",
    "amen", "hallelujah", "praise the lord", "thank you jesus", "yes lord", "let us pray", "close your eyes", 
    "bow your heads", "glory to god", "praise god", "in jesus name", "in the name of jesus", "thank you",
    "god bless you", "welcome to church", "turn with me", "look at your neighbor", "glorious god", "thank you lord", 
    "praise jesus", "jesus is lord"
]);

// Eligibility filter for automatic phrase searches
function shouldAutoSearch(phrase) {
    if (!phrase) return false;
    const clean = phrase.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    const words = clean.split(/\s+/).filter(w => w.length > 0);
    
    if (words.length <= 2) return false;
    
    // Check if the phrase only contains stop words or is a common filler
    const hasMeaningfulWord = words.some(word => !GENERIC_STOP_WORDS.has(word));
    if (!hasMeaningfulWord) return false;
    
    return true;
}

// Throttler: Restricts automatic searches to at most once every 6 seconds to avoid clogging APIs
function throttleAutoSearch(text) {
    pendingSearchText = text;
    const now = Date.now();
    const timeSinceLastSearch = now - lastSearchTime;
    
    if (timeSinceLastSearch >= AUTO_SEARCH_THROTTLE_MS) {
        executeThrottledSearch();
    } else {
        if (searchThrottleTimer) clearTimeout(searchThrottleTimer);
        const delay = AUTO_SEARCH_THROTTLE_MS - timeSinceLastSearch;
        searchThrottleTimer = setTimeout(executeThrottledSearch, delay);
    }
}

function executeThrottledSearch() {
    if (!pendingSearchText) return;
    const queryToSearch = pendingSearchText;
    pendingSearchText = null;
    lastSearchTime = Date.now();
    
    // Dispatch query searches (Checks Concept index first, then runs Bolls query)
    const concept = findConceptMatch(queryToSearch);
    if (concept) {
        fetchScripture(concept.ref, true, `Story: ${concept.description.split('.')[0]}`);
    }
    searchScriptureByPhrase(queryToSearch);
}

// 5. Process Speech Text & Keyword Matching
function processTranscriptText(text, isFinal) {
    if (!text.trim()) return;
    
    const correctedText = correctMisheardText(text);
    renderTranscriptItem(correctedText, isFinal);
    
    // A. Scripture Reference Parser (runs on both interim and final speech)
    const detected = parseScriptureReference(correctedText);
    if (detected && detected.reference !== lastMatchedReference) {
        lastMatchedReference = detected.reference;
        addScriptureDetection(detected.reference);
        return; // matched a direct reference, block phrase search
    }
    
    // B. Throttled Automatic Corpus Search (runs only on finalized sentences)
    if (isFinal && !detected) {
        if (shouldAutoSearch(correctedText)) {
            throttleAutoSearch(correctedText);
        }
    }
}

// Render speech transcript segment on UI
function renderTranscriptItem(text, isFinal) {
    const placeholder = document.getElementById("transcript-placeholder");
    if (placeholder) placeholder.remove();
    
    let activeItem = document.getElementById("transcript-interim-item");
    if (!activeItem) {
        activeItem = document.createElement("div");
        activeItem.id = "transcript-interim-item";
        transcriptBox.appendChild(activeItem);
    }
    
    let styledText = text;
    
    if (isFinal) {
        activeItem.removeAttribute("id");
        activeItem.className = "transcript-final-wrapper";
        activeItem.innerHTML = `
            <span class="transcript-text-content">${styledText}</span>
            <button class="transcript-search-btn" title="Search Bible for this phrase" aria-label="Search Bible">
                <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </button>
        `;
        transcriptHistory.push(text);
        
        // Keep DOM clean by pruning old transcripts during long-running sessions (max 25)
        const finalItems = transcriptBox.querySelectorAll(".transcript-final-wrapper");
        if (finalItems.length > 25) {
            for (let i = 0; i < finalItems.length - 25; i++) {
                finalItems[i].remove();
            }
        }
        
        transcriptBox.scrollTop = transcriptBox.scrollHeight;
    } else {
        activeItem.className = "transcript-interim";
        activeItem.innerHTML = styledText + "...";
        transcriptBox.scrollTop = transcriptBox.scrollHeight;
    }
}

// Add Scripture Detection to Left Column List
function addScriptureDetection(reference) {
    const emptyState = detectionsList.querySelector(".detection-empty-state");
    if (emptyState) emptyState.remove();
    
    // Avoid duplicate detections on the list
    const existing = Array.from(detectionsList.querySelectorAll(".detection-ref")).find(el => el.textContent.toLowerCase() === reference.toLowerCase());
    if (existing) return;
    
    const item = document.createElement("div");
    item.className = "detection-item";
    item.innerHTML = `
        <span class="detection-ref">${reference}</span>
        <div class="detection-actions">
            <button class="text-btn project-detection-btn">Project</button>
        </div>
    `;
    
    // Click to Preview
    item.addEventListener("click", () => {
        fetchScripture(reference, true);
    });
    
    // Project live click handler
    item.querySelector(".project-detection-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        fetchScripture(reference, true).then(() => {
            if (previewSlide) {
                projectLive(previewSlide);
            }
        });
    });
    
    detectionsList.insertBefore(item, detectionsList.firstChild);
    
    // Auto-Queue & Auto-Preview logic
    if (autoQueueToggle.checked) {
        fetchScripture(reference, true);
    }
}

// 7. Scripture Retrieval Engine (Reference Lookup & Phrase Search)
async function fetchScripture(reference, highlightFlash = true, labelOverride = "") {
    if (!reference) return;
    
    if (!isListening) {
        micStatusText.style.color = "#38bdf8";
        micStatusText.textContent = `Fetching reference: "${reference}"...`;
    }
    
    try {
        let normalizedRef = reference;
        let text = "";
        
        const bollsTranslations = ["nkjv", "niv", "nlt", "amp", "gnt"];
        if (bollsTranslations.includes(currentTranslation)) {
            const parsed = parseScriptureReference(reference);
            if (!parsed) {
                throw new Error("Could not parse reference format");
            }
            
            const bookId = BOLLS_BOOKS.indexOf(parsed.book);
            if (bookId === -1) {
                throw new Error(`Book "${parsed.book}" not found in list`);
            }
            
            const translationSlug = BOLLS_TRANSLATION_MAP[currentTranslation] || "NKJV";
            const url = `https://bolls.life/get-text/${translationSlug}/${bookId}/${parsed.chapter}/`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Scripture not found on Bolls");
            }
            
            const data = await response.json();
            
            // Filter by start and end verses
            const startV = parseInt(parsed.verse) || 1;
            const endV = parseInt(parsed.verseEnd) || startV;
            
            let matchingVerses = data;
            if (parsed.verse) {
                matchingVerses = data.filter(v => v.verse >= startV && v.verse <= endV);
            }
            
            if (matchingVerses.length === 0) {
                throw new Error("Verses not found in this chapter");
            }
            
            text = matchingVerses.map(v => {
                let clean = v.text;
                clean = clean.replace(/<S>[^<]*<\/S>/gi, ""); 
                clean = clean.replace(/<sup>[^<]*<\/sup>/gi, ""); 
                clean = clean.replace(/<\/?[^>]+(>|$)/g, ""); 
                return clean.trim();
            }).join(" ").trim().replace(/\s+/g, ' ');
            
            normalizedRef = `${parsed.book} ${parsed.chapter}:${startV}`;
            if (endV > startV) {
                normalizedRef += `-${endV}`;
            }
        } else {
            // Use bible-api.com
            const apiRef = encodeURIComponent(reference.trim());
            const url = `https://bible-api.com/${apiRef}?translation=${currentTranslation}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Scripture not found");
            }
            
            const data = await response.json();
            text = data.text.trim().replace(/\s+/g, ' ');
            normalizedRef = data.reference;
        }
        
        const slide = {
            type: 'scripture',
            title: normalizedRef,
            text: text
        };
        
        updatePreviewSlide(slide);
        addToQueue(slide);
        
        if (!isListening) {
            micStatusText.style.color = "";
            micStatusText.textContent = `Fetched: "${normalizedRef}" successfully!`;
            setTimeout(() => {
                if (!isListening && micStatusText.textContent.startsWith("Fetched:")) {
                    micStatusText.textContent = "Click the button to start listening";
                }
            }, 3000);
        }
        
    } catch (err) {
        console.error("Bible API fetch failed:", err);
        if (!isListening) {
            micStatusText.style.color = "#ef4444";
            micStatusText.textContent = `Error: Could not retrieve "${reference}"`;
            setTimeout(() => {
                if (!isListening) {
                    micStatusText.style.color = "";
                    micStatusText.textContent = "Click the button to start listening";
                }
            }, 4000);
        }
    }
}

// Search Scriptures by keyword/phrase via Bolls.life API
async function searchScriptureByPhrase(phrase, useFallback = true) {
    if (!phrase) return;
    
    const correctedPhrase = correctMisheardText(phrase);
    const cacheKey = `${currentTranslation}:${correctedPhrase.toLowerCase()}`;
    if (searchCache[cacheKey]) {
        handleSearchResults(searchCache[cacheKey], correctedPhrase);
        return;
    }
    
    // If currentTranslation is KJV or browser is offline, run local search instantly
    if (currentTranslation === "kjv" || !navigator.onLine) {
        const localMatches = searchLocalKJVByPhrase(correctedPhrase);
        if (localMatches.length > 0) {
            searchCache[cacheKey] = localMatches;
            handleSearchResults(localMatches, correctedPhrase);
            return;
        }
    }
    
    if (activeSearchController) {
        activeSearchController.abort();
    }
    activeSearchController = new AbortController();
    const signal = activeSearchController.signal;
    
    let translationSlug = BOLLS_TRANSLATION_MAP[currentTranslation] || "KJV";
    const url = `https://bolls.life/v2/find/${translationSlug}?search=${encodeURIComponent(correctedPhrase)}&match_case=false&match_whole=false&limit=10`;
    
    if (!isListening) {
        micStatusText.style.color = "#38bdf8";
        micStatusText.textContent = `Searching phrase: "${correctedPhrase}"...`;
    }
    
    const timeoutId = setTimeout(() => {
        if (activeSearchController) {
            activeSearchController.abort();
        }
    }, 6000);
    
    try {
        const response = await fetch(url, { signal });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            if (response.status === 429) {
                throw new Error("Rate limited (429) by search server");
            }
            throw new Error(`Search failed (${response.status})`);
        }
        
        const data = await response.json();
        
        if (!data.results || data.results.length === 0) {
            if (useFallback && translationSlug !== "KJV") {
                searchScriptureByPhrase(correctedPhrase, false);
                return;
            }
            throw new Error("No matching scriptures found.");
        }
        
        const searchItems = data.results.map(item => {
            const bookName = BOLLS_BOOKS[item.book] || "Unknown Book";
            const ref = `${bookName} ${item.chapter}:${item.verse}`;
            
            let cleanText = item.text;
            cleanText = cleanText.replace(/<S>[^<]*<\/S>/gi, ""); 
            cleanText = cleanText.replace(/<sup>[^<]*<\/sup>/gi, ""); 
            cleanText = cleanText.replace(/<\/?[^>]+(>|$)/g, ""); 
            cleanText = cleanText.trim().replace(/\s+/g, ' '); 
            
            const relevanceScore = calculateRelevanceScore(cleanText, correctedPhrase);
            
            return {
                id: item.pk || Date.now() + Math.random(),
                reference: ref,
                text: cleanText,
                translation: translationSlug,
                isApiFetched: true,
                relevanceScore: relevanceScore
            };
        });
        
        searchItems.sort((a, b) => b.relevanceScore - a.relevanceScore);
        searchCache[cacheKey] = searchItems;
        handleSearchResults(searchItems, correctedPhrase);
        
    } catch (err) {
        if (err.name === 'AbortError') {
            console.log("Search fetch aborted (stale query or request timeout).");
            return;
        }
        
        console.error("Bible phrase search failed:", err);
        
        // Attempt local search fallback if network search fails
        const localMatches = searchLocalKJVByPhrase(correctedPhrase);
        if (localMatches.length > 0) {
            searchCache[cacheKey] = localMatches;
            handleSearchResults(localMatches, correctedPhrase);
            return;
        }
        
        const isRateLimited = err.message.includes("429") || err.message.includes("Rate limited");
        if (useFallback && translationSlug !== "KJV" && !isRateLimited) {
            searchScriptureByPhrase(correctedPhrase, false);
            return;
        }
        
        if (!isListening) {
            micStatusText.style.color = "#ef4444";
            if (isRateLimited) {
                micStatusText.textContent = "Search limit reached. Using offline mode.";
            } else {
                micStatusText.textContent = `No matches found for "${correctedPhrase}"`;
            }
            setTimeout(() => {
                if (!isListening) {
                    micStatusText.style.color = "";
                    micStatusText.textContent = "Click the button to start listening";
                }
            }, 4000);
        }
    }
}

// Output Search results directly into Bible Reader Feed
function handleSearchResults(searchItems, queryText) {
    bibleReaderFeed.innerHTML = "";
    
    if (searchItems.length === 0) {
        bibleReaderFeed.innerHTML = `<div class="reader-empty-state">No scriptures matching "${queryText}" found.</div>`;
        return;
    }
    
    searchItems.forEach(item => {
        const row = document.createElement("div");
        row.className = "verse-row";
        row.setAttribute("data-ref", item.reference);
        row.setAttribute("data-text", item.text);
        
        row.innerHTML = `
            <span class="verse-num">${item.reference}</span>
            <span class="verse-text">${item.text}</span>
        `;
        
        row.addEventListener("click", () => {
            const activeRows = bibleReaderFeed.querySelectorAll(".verse-row");
            activeRows.forEach(r => r.classList.remove("previewing"));
            row.classList.add("previewing");
            
            updatePreviewSlide({
                type: 'scripture',
                title: item.reference,
                text: item.text
            });
        });
        
        row.addEventListener("dblclick", () => {
            const activeRows = bibleReaderFeed.querySelectorAll(".verse-row");
            activeRows.forEach(r => r.classList.remove("projecting"));
            row.classList.add("projecting");
            
            projectLive({
                type: 'scripture',
                title: item.reference,
                text: item.text
            });
        });
        
        bibleReaderFeed.appendChild(row);
    });
    
    if (!isListening) {
        micStatusText.style.color = "";
        micStatusText.textContent = `Found ${searchItems.length} matching scriptures!`;
        setTimeout(() => {
            if (!isListening && micStatusText.textContent.startsWith("Found")) {
                micStatusText.textContent = "Click the button to start listening";
            }
        }, 3000);
    }
}

// 8. Projection & Screens Management Logic
function updatePreviewSlide(slide) {
    previewSlide = slide;
    previewSlideTitle.textContent = slide.title;
    previewContentBox.innerHTML = `<p class="monitor-text">“${slide.text.replace(/\n/g, '<br>')}”</p>`;
    btnProjectLive.disabled = false;
}

function projectLive(slide) {
    liveSlide = slide;
    liveSlideTitle.textContent = slide.title;
    liveContentBox.innerHTML = `<p class="monitor-text">“${slide.text.replace(/\n/g, '<br>')}”</p>`;
    
    // Update live monitor styles to match preview
    const activeVerseRows = bibleReaderFeed.querySelectorAll(".verse-row");
    activeVerseRows.forEach(row => {
        if (row.getAttribute("data-ref") === slide.title) {
            row.classList.add("projecting");
        } else {
            row.classList.remove("projecting");
        }
    });
    
    const activeLyricCards = songWorkspace.querySelectorAll(".lyric-segment-card");
    activeLyricCards.forEach(card => {
        if (card.querySelector(".segment-lyrics").textContent.trim() === slide.text.trim()) {
            card.classList.add("projecting");
        } else {
            card.classList.remove("projecting");
        }
    });

    // Auto-Add to Playlist queue
    addToQueue(slide);

    // Broadcast to Projector window
    bcastChannel.postMessage({
        text: slide.text,
        subtitle: slide.title,
        theme: currentTheme
    });
}

function clearLive() {
    liveSlide = null;
    liveSlideTitle.textContent = "Black Screen";
    liveContentBox.innerHTML = `<p class="monitor-text" style="color: var(--text-muted)">Projector Output is Blank</p>`;
    
    const projectingElements = document.querySelectorAll(".projecting");
    projectingElements.forEach(el => el.classList.remove("projecting"));
    
    // Broadcast clean signal
    bcastChannel.postMessage({
        text: "",
        subtitle: "",
        theme: currentTheme
    });
}

// 9. Queue & Playlist Pipeline
function addToQueue(slide) {
    // Avoid double addition
    const exists = queue.some(item => item.title.toLowerCase() === slide.title.toLowerCase() && item.text.trim() === slide.text.trim());
    if (exists) return;
    
    queue.push(slide);
    renderQueue();
}

function removeFromQueue(idx) {
    queue.splice(idx, 1);
    renderQueue();
}

function renderQueue() {
    queueList.innerHTML = "";
    
    if (queue.length === 0) {
        queueList.innerHTML = `<div class="queue-empty-state">Queue is empty. Select a verse or lyric block to load it here.</div>`;
        return;
    }
    
    queue.forEach((slide, idx) => {
        const item = document.createElement("div");
        item.className = "queue-item";
        if (liveSlide && liveSlide.title === slide.title && liveSlide.text.trim() === slide.text.trim()) {
            item.classList.add("active");
        }
        
        item.innerHTML = `
            <div class="queue-item-details">
                <div class="queue-ref">${slide.title} <span class="queue-type-badge badge-${slide.type}">${slide.type}</span></div>
                <div class="queue-item-desc">${slide.text.replace(/\n/g, ' ')}</div>
            </div>
            <div class="queue-actions">
                <button class="text-btn delete-queue-btn">&times;</button>
            </div>
        `;
        
        // Single-click to Preview
        item.addEventListener("click", () => {
            updatePreviewSlide(slide);
        });
        
        // Double-click to Project Live
        item.addEventListener("dblclick", () => {
            projectLive(slide);
            renderQueue();
        });
        
        // Delete action button
        item.querySelector(".delete-queue-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            removeFromQueue(idx);
        });
        
        queueList.appendChild(item);
    });
}

// 10. Bible Chapter Reader Loader
function loadBibleChapter(book, chapter) {
    bibleReaderFeed.innerHTML = `<div class="reader-empty-state">Loading chapter ${chapter} of ${book}...</div>`;
    
    const bollsTranslations = ["nkjv", "niv", "nlt", "amp", "gnt"];
    if (bollsTranslations.includes(currentTranslation)) {
        const bookId = BOLLS_BOOKS.indexOf(book);
        const translationSlug = BOLLS_TRANSLATION_MAP[currentTranslation] || "NKJV";
        const url = `https://bolls.life/get-text/${translationSlug}/${bookId}/${chapter}/`;
        
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Could not load chapter from Bolls");
                return res.json();
            })
            .then(data => {
                const mappedVerses = data.map(v => {
                    let clean = v.text;
                    clean = clean.replace(/<S>[^<]*<\/S>/gi, ""); 
                    clean = clean.replace(/<sup>[^<]*<\/sup>/gi, ""); 
                    clean = clean.replace(/<\/?[^>]+(>|$)/g, ""); 
                    return {
                        verse: v.verse,
                        text: clean.trim()
                    };
                });
                renderBibleReader(mappedVerses, book, chapter);
            })
            .catch(err => {
                console.error("Bolls reader fetch failed:", err);
                bibleReaderFeed.innerHTML = `<div class="reader-empty-state" style="color: var(--accent-danger)">Error loading scripture: chapter not found.</div>`;
            });
    } else {
        const apiRef = encodeURIComponent(`${book} ${chapter}`);
        const url = `https://bible-api.com/${apiRef}?translation=${currentTranslation}`;
        
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Could not load chapter");
                return res.json();
            })
            .then(data => {
                renderBibleReader(data.verses, book, chapter);
            })
            .catch(err => {
                console.error("Bible reader fetch failed:", err);
                bibleReaderFeed.innerHTML = `<div class="reader-empty-state" style="color: var(--accent-danger)">Error loading scripture: chapter not found.</div>`;
            });
    }
}

function renderBibleReader(verses, book, chapter) {
    bibleReaderFeed.innerHTML = "";
    
    if (!verses || verses.length === 0) {
        bibleReaderFeed.innerHTML = `<div class="reader-empty-state">No verses found.</div>`;
        return;
    }
    
    verses.forEach(v => {
        const row = document.createElement("div");
        row.className = "verse-row";
        const verseRef = `${book} ${chapter}:${v.verse}`;
        row.setAttribute("data-ref", verseRef);
        row.setAttribute("data-text", v.text);
        
        if (previewSlide && previewSlide.title === verseRef) row.classList.add("previewing");
        if (liveSlide && liveSlide.title === verseRef) row.classList.add("projecting");
        
        row.innerHTML = `
            <span class="verse-num">${v.verse}</span>
            <span class="verse-text">${v.text}</span>
        `;
        
        // Click to Preview
        row.addEventListener("click", () => {
            const activeRows = bibleReaderFeed.querySelectorAll(".verse-row");
            activeRows.forEach(r => r.classList.remove("previewing"));
            row.classList.add("previewing");
            
            updatePreviewSlide({
                type: 'scripture',
                title: verseRef,
                text: v.text
            });
        });
        
        // Double-click to Project
        row.addEventListener("dblclick", () => {
            const activeRows = bibleReaderFeed.querySelectorAll(".verse-row");
            activeRows.forEach(r => r.classList.remove("projecting"));
            row.classList.add("projecting");
            
            projectLive({
                type: 'scripture',
                title: verseRef,
                text: v.text
            });
        });
        
        bibleReaderFeed.appendChild(row);
    });
}

// 11. Worship Songs sidebar populator
function initSongsLibrary() {
    songsList.innerHTML = "";
    WORSHIP_SONGS.forEach(song => {
        const item = document.createElement("div");
        item.className = "song-item";
        if (selectedSongId === song.id) item.classList.add("active");
        item.textContent = song.title;
        
        item.addEventListener("click", () => {
            const items = songsList.querySelectorAll(".song-item");
            items.forEach(el => el.classList.remove("active"));
            item.classList.add("active");
            
            loadSongWorkspace(song.id);
        });
        
        songsList.appendChild(item);
    });
}

function loadSongWorkspace(songId) {
    selectedSongId = songId;
    const song = WORSHIP_SONGS.find(s => s.id === songId);
    
    if (!song) {
        songWorkspace.innerHTML = `<div class="song-workspace-empty">Select a song from the sidebar.</div>`;
        return;
    }
    
    songWorkspace.innerHTML = `
        <div class="song-header-row">
            <div>
                <h2 class="song-title-display">${song.title}</h2>
                <span class="song-artist-display">by ${song.artist}</span>
            </div>
        </div>
        <div class="lyric-segments-grid">
            <!-- Segments filled below -->
        </div>
    `;
    
    const grid = songWorkspace.querySelector(".lyric-segments-grid");
    
    song.lyrics.forEach(lyric => {
        const card = document.createElement("div");
        card.className = "lyric-segment-card";
        
        const isChorus = lyric.label.toLowerCase().includes("chorus");
        const isBridge = lyric.label.toLowerCase().includes("bridge");
        const badgeClass = isChorus ? "badge-chorus" : (isBridge ? "badge-bridge" : "badge-verse");
        
        if (previewSlide && previewSlide.title.startsWith(song.title) && previewSlide.text.trim() === lyric.text.trim()) {
            card.classList.add("previewing");
        }
        if (liveSlide && liveSlide.title.startsWith(song.title) && liveSlide.text.trim() === lyric.text.trim()) {
            card.classList.add("projecting");
        }
        
        card.innerHTML = `
            <div class="segment-header-row">
                <span class="segment-badge ${badgeClass}">${lyric.label}</span>
            </div>
            <p class="segment-lyrics">${lyric.text}</p>
        `;
        
        const slideTitle = `${song.title} - ${lyric.label}`;
        
        // Click to Preview
        card.addEventListener("click", () => {
            const activeCards = songWorkspace.querySelectorAll(".lyric-segment-card");
            activeCards.forEach(c => c.classList.remove("previewing"));
            card.classList.add("previewing");
            
            updatePreviewSlide({
                type: 'song',
                title: slideTitle,
                text: lyric.text
            });
        });
        
        // Double-click to Project Live
        card.addEventListener("dblclick", () => {
            const activeCards = songWorkspace.querySelectorAll(".lyric-segment-card");
            activeCards.forEach(c => c.classList.remove("projecting"));
            card.classList.add("projecting");
            
            projectLive({
                type: 'song',
                title: slideTitle,
                text: lyric.text
            });
        });
        
        grid.appendChild(card);
    });
}

// 12. Simulated Microphone Visualizer to prevent hardware/permission conflicts with SpeechRecognition
async function startAudioVisualization() {
    try {
        const audioWave = document.getElementById("audio-wave");
        if (audioWave) audioWave.classList.remove("hidden");
        
        micStatusText.style.color = "#38bdf8"; 
        micStatusText.textContent = "Listening... Speak a scripture or theme";
        
        const bars = document.querySelectorAll(".audio-wave .bar");
        
        function draw() {
            if (!isListening) return;
            animationFrameId = requestAnimationFrame(draw);
            
            let totalVolume = 0;
            bars.forEach((bar, i) => {
                // Simulate volume fluctuation with dynamic sine waves + random noise
                const value = Math.random() * 110 + Math.sin(Date.now() / 120 + i) * 35 + 60;
                const height = 6 + (Math.max(0, Math.min(255, value)) / 255) * 26;
                bar.style.height = `${height}px`;
                totalVolume += value;
            });
            
            const avgVolume = totalVolume / bars.length;
            const scale = 1 + (avgVolume / 255) * 0.08;
            micBtn.style.transform = `scale(${scale})`;
        }
        
        draw();
    } catch (err) {
        console.error("Audio visualizer simulation failed:", err);
    }
}

function stopAudioVisualization() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    
    const audioWave = document.getElementById("audio-wave");
    if (audioWave) audioWave.classList.add("hidden");
    
    micBtn.style.transform = '';
}

// Local Offline audio capture state for Electron integration
let localAudioCtx = null;
let localAudioSource = null;
let localAudioProcessor = null;
let localAudioStream = null;

// Listening Event Handlers
async function startListening() {
    if (window.electronAPI) {
        try {
            isListening = true;
            
            // Get microphone stream
            localAudioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            // Create audio context downsampled to 16kHz
            localAudioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
            localAudioSource = localAudioCtx.createMediaStreamSource(localAudioStream);
            
            // 4096 buffer size, 1 input channel, 1 output channel
            localAudioProcessor = localAudioCtx.createScriptProcessor(4096, 1, 1);
            
            localAudioProcessor.onaudioprocess = (e) => {
                if (!isListening) return;
                
                const inputData = e.inputBuffer.getChannelData(0); // Float32Array
                const len = inputData.length;
                const pcm16Buffer = new Int16Array(len);
                
                // Convert Float32 to Int16
                for (let i = 0; i < len; i++) {
                    const val = Math.max(-1, Math.min(1, inputData[i]));
                    pcm16Buffer[i] = val < 0 ? val * 0x8000 : val * 0x7FFF;
                }
                
                // Send raw Int16 binary buffer to Node.js main process
                window.electronAPI.sendAudioChunk(pcm16Buffer.buffer);
            };
            
            localAudioSource.connect(localAudioProcessor);
            localAudioProcessor.connect(localAudioCtx.destination);
            
            await startAudioVisualization();
            updateUIState(true);
        } catch (err) {
            console.error("Failed to start local microphone recording:", err);
            stopListening(true);
            micStatusText.style.color = "#ef4444";
            micStatusText.textContent = "Mic Error: Could not access microphone.";
        }
        return;
    }

    if (!recognition) {
        const initOk = initSpeechRecognition();
        if (!initOk) return;
    }
    
    try {
        isListening = true;
        recognition.start();
        await startAudioVisualization();
        startWatchdog(); // Activate watchdog check when starting mic
    } catch (e) {
        console.error("Failed to start speech recognition:", e);
    }
}

function stopListening(keepText = false) {
    isListening = false;
    
    if (window.electronAPI) {
        if (localAudioProcessor) {
            localAudioProcessor.disconnect();
            localAudioProcessor = null;
        }
        if (localAudioSource) {
            localAudioSource.disconnect();
            localAudioSource = null;
        }
        if (localAudioCtx) {
            localAudioCtx.close();
            localAudioCtx = null;
        }
        if (localAudioStream) {
            localAudioStream.getTracks().forEach(track => track.stop());
            localAudioStream = null;
        }
        stopAudioVisualization();
        updateUIState(false, keepText);
        return;
    }

    stopWatchdog(); // Deactivate watchdog when turning off mic
    if (recognition) {
        try {
            recognition.stop();
        } catch (e) {
            console.log("Speech stop error or already idle");
        }
    }
    stopAudioVisualization();
    updateUIState(false, keepText);
}

function updateUIState(active, keepText = false) {
    if (active) {
        micContainer.classList.add("listening");
        micBtn.querySelector(".icon-mic").classList.add("hidden");
        micBtn.querySelector(".icon-stop").classList.remove("hidden");
        micStatusText.textContent = "Listening... Speak a scripture or theme word";
        micStatusText.style.color = ""; 
        listeningBadge.className = "badge badge-active";
        listeningBadge.innerHTML = "<span class='dot pulse-dot'></span> Listening Active";
    } else {
        micContainer.classList.remove("listening");
        micBtn.querySelector(".icon-mic").classList.remove("hidden");
        micBtn.querySelector(".icon-stop").classList.add("hidden");
        if (!keepText) {
            micStatusText.textContent = "Click the button to start listening";
            micStatusText.style.color = ""; 
        }
        listeningBadge.className = "badge badge-inactive";
        listeningBadge.innerHTML = "<span class='dot'></span> Offline";
    }
}

// Reset Entire Workspace State
function clearTranscript() {
    transcriptHistory = [];
    lastMatchedReference = "";
    
    transcriptBox.innerHTML = `
        <p class="transcript-placeholder" id="transcript-placeholder">
            Spoken words appear here...
        </p>`;
}

// Play UI chimings
function playChime(freq, duration) {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        
        gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    } catch(e) {}
}

// HTML Escaper helper
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// 13. DOM DOMContentLoaded Setup & Interactions
document.addEventListener("DOMContentLoaded", () => {
    checkSecureContext();
    initSpeechRecognition();
    initSongsLibrary();
    
    // 1. Populate Bible Reader Book dropdown
    bookSelect.innerHTML = "";
    const canonicalOrder = BOLLS_BOOKS.filter(b => b !== "");
    canonicalOrder.forEach(book => {
        const opt = document.createElement("option");
        opt.value = book;
        opt.textContent = book;
        bookSelect.appendChild(opt);
    });
    
    // 2. Populate Chapter dropdown helper function
    function populateChapters(book) {
        chapterSelect.innerHTML = "";
        const chaptersCount = BOOK_CHAPTERS[book] || 1;
        for (let i = 1; i <= chaptersCount; i++) {
            const opt = document.createElement("option");
            opt.value = i;
            opt.textContent = i;
            chapterSelect.appendChild(opt);
        }
    }
    
    // Initial populate
    if (bookSelect.value) {
        populateChapters(bookSelect.value);
        loadBibleChapter(bookSelect.value, 1);
    }
    
    // Book select listener
    bookSelect.addEventListener("change", () => {
        populateChapters(bookSelect.value);
        loadBibleChapter(bookSelect.value, 1);
    });
    
    // Chapter select listener
    chapterSelect.addEventListener("change", () => {
        loadBibleChapter(bookSelect.value, chapterSelect.value);
    });

    // 3. Hook up Translation select pills
    versionPills.addEventListener("click", (e) => {
        const pill = e.target.closest(".version-pill");
        if (pill) {
            const pills = versionPills.querySelectorAll(".version-pill");
            pills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            
            currentTranslation = pill.getAttribute("data-version");
            loadBibleChapter(bookSelect.value, chapterSelect.value);
        }
    });

    // 4. Tab workspace switcher
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const targetTab = btn.getAttribute("data-tab");
            tabContents.forEach(content => {
                if (content.id === `tab-content-${targetTab}`) {
                    content.classList.add("active");
                } else {
                    content.classList.remove("active");
                }
            });
        });
    });

    // 5. Visual Theme Selector Card listener
    themeCards.forEach(card => {
        card.addEventListener("click", () => {
            themeCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            
            currentTheme = card.getAttribute("data-theme");
            
            // Immediately update Live screen visual styles
            liveScreenBg.className = "monitor-screen live-screen glass-panel";
            liveScreenBg.classList.add("theme-" + currentTheme);
            
            // Re-broadcast live slide if active to propagate theme
            if (liveSlide) {
                projectLive(liveSlide);
            } else {
                bcastChannel.postMessage({ text: "", subtitle: "", theme: currentTheme });
            }
        });
    });

    // 6. Projector Window launcher
    btnLaunchProjector.addEventListener("click", () => {
        projectorWindow = window.open("projector.html", "KairosProjector", "width=1000,height=620,menubar=no,toolbar=no,location=no,status=no");
    });
    
    // Sync projector window upon initial handshake requests
    bcastChannel.onmessage = (event) => {
        if (event.data && event.data.action === "request-sync") {
            if (liveSlide) {
                bcastChannel.postMessage({
                    text: liveSlide.text,
                    subtitle: liveSlide.title,
                    theme: currentTheme
                });
            } else {
                bcastChannel.postMessage({
                    text: "",
                    subtitle: "",
                    theme: currentTheme
                });
            }
        }
    };

    // 7. Manual Search controllers
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            const concept = findConceptMatch(query);
            if (concept) {
                fetchScripture(concept.ref, true, `Story: ${concept.description.split('.')[0]}`);
            }
            if (isScriptureReference(query)) {
                fetchScripture(query, true);
            } else {
                searchScriptureByPhrase(query);
            }
        }
    });

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const query = searchInput.value.trim();
            if (query) {
                const concept = findConceptMatch(query);
                if (concept) {
                    fetchScripture(concept.ref, true, `Story: ${concept.description.split('.')[0]}`);
                }
                if (isScriptureReference(query)) {
                    fetchScripture(query, true);
                } else {
                    searchScriptureByPhrase(query);
                }
            }
        }
    });

    // 8. Project Preview slide live button
    btnProjectLive.addEventListener("click", () => {
        if (previewSlide) {
            projectLive(previewSlide);
        }
    });

    // Clear live projection output
    btnClearProjection.addEventListener("click", clearLive);

    // Clear entire Queue list
    clearQueueBtn.addEventListener("click", () => {
        queue = [];
        renderQueue();
    });

    // 9. Mic toggler
    micBtn.addEventListener("click", () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    });

    clearTranscriptBtn.addEventListener("click", clearTranscript);

    // 10. Listen for search button triggers inside transcript boxes
    transcriptBox.addEventListener("click", (e) => {
        const trSearchBtn = e.target.closest(".transcript-search-btn");
        if (trSearchBtn) {
            const textNode = trSearchBtn.previousElementSibling;
            if (textNode) {
                const rawText = textNode.textContent || textNode.innerText;
                const concept = findConceptMatch(rawText);
                if (concept) {
                    fetchScripture(concept.ref, true, `Story: ${concept.description.split('.')[0]}`);
                }
                if (isScriptureReference(rawText)) {
                    fetchScripture(rawText, true);
                } else {
                    searchScriptureByPhrase(rawText);
                }
            }
        }
    });

    // Handle transcript simulation try buttons
    document.addEventListener("click", (e) => {
        const tryBtn = e.target.closest(".try-btn");
        if (tryBtn) {
            const phrase = tryBtn.getAttribute("data-phrase");
            processTranscriptText(phrase, true);
        }
    });
});

if (speechSynth && speechSynth.onvoiceschanged !== undefined) {
    speechSynth.onvoiceschanged = () => {};
}
