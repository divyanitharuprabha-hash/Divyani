// The single source of truth for your event data
const events = [
    // --- Day 1: Nov 20, 2025 ---
    {
        title: "Opening Keynote: The Future of AI",
        type: "Keynote",
        date: "2025-11-20T09:00:00",
        description: "Join industry visionary Dr. Evelyn Reed as she unveils the next decade of AI innovation.",
        image: "imagess/1.png"
    },
    {
        title: "Advanced JavaScript Workshop",
        type: "Workshop",
        date: "2025-11-20T10:30:00",
        description: "A 3-hour, hands-on deep-dive into asynchronous JavaScript, Promises, and modern ES6+ features.",
        image: "imagess/2.png"
    },
    {
        title: "Cybersecurity in the Cloud Era",
        type: "Talk",
        date: "2025-11-20T11:00:00",
        description: "Explore the evolving landscape of cloud security threats and proactive defense strategies.",
        image: "imagess/3.png"
    },
    {
        title: "Introduction to Quantum Computing",
        type: "Talk",
        date: "2025-11-20T14:00:00",
        description: "A beginner-friendly overview of quantum mechanics and its potential to revolutionize computing.",
        image: "imagess/4.png"
    },
    {
        title: "Networking Mixer & Welcome Reception",
        type: "Social",
        date: "2025-11-20T17:00:00",
        description: "Connect with fellow attendees, speakers, and sponsors over drinks and appetizers.",
        image: "imagess/5.png"
    },

    // --- Day 2: Nov 21, 2025 ---
    {
        title: "The Ethics of Machine Learning",
        type: "Talk",
        date: "2025-11-21T09:30:00",
        description: "A critical discussion on the societal impact and ethical responsibilities in ML development.",
        image: "imagess/7.png"
    },
    {
        title: "Building Scalable Web Apps with Microservices",
        type: "Talk",
        date: "2025-11-21T10:30:00",
        description: "Learn the principles of microservices from lead engineers at a top tech company.",
        image: "imagess/7.png"
    },
    {
        title: "Mastering React Performance",
        type: "Workshop",
        date: "2025-11-21T13:00:00",
        description: "Optimize your React applications by learning memoization, code splitting, and bundle analysis.",
        image: "imagess/8.png"
    },
    {
        title: "The Psychology of User Experience (UX)",
        type: "Talk",
        date: "2025-11-21T14:00:00",
        description: "Understand the cognitive biases and psychological principles that drive effective UX design.",
        image: "imagess/9.png"
    },
    {
        title: "Panel: The Future of Remote Work in Tech",
        type: "Panel",
        date: "2025-11-21T16:00:00",
        description: "Industry leaders discuss the challenges, tools, and culture of building successful remote-first teams.",
        image: "imagess/10.png"
    },

    // --- Day 3: Nov 22, 2025 ---
    {
        title: "UI/UX Design Fundamentals for Developers",
        type: "Workshop",
        date: "2025-11-22T09:00:00",
        description: "A practical workshop on visual hierarchy, color theory, and typography that every developer should know.",
        image: "imagess/11.png"
    },
    {
        title: "From Monolith to Serverless",
        type: "Talk",
        date: "2025-11-22T10:00:00",
        description: "A case study on migrating a large-scale legacy application to a modern serverless architecture.",
        image: "imagess/12.png"
    },
    {
        title: "State of Web Assembly in 2025",
        type: "Talk",
        date: "2025-11-22T11:30:00",
        description: "Discover how WebAssembly is enabling near-native performance for web applications.",
        image: "imagess/13.png"
    },
    {
        title: "Data Visualization with D3.js",
        type: "Workshop",
        date: "2025-11-22T13:30:00",
        description: "Learn to create stunning, interactive data visualizations for the web from scratch.",
        image: "imagess/14.png"
    },
    {
        title: "Closing Panel: Ask Me Anything with Speakers",
        type: "Panel",
        date: "2025-11-22T16:00:00",
        description: "An open Q&A session with a panel of the conference's top speakers. No topic is off-limits!",
        image: "imagess/15.png"
    },

    // --- Bonus / Past Events for testing ---
    {
        title: "Pre-Conference Hackathon",
        type: "Social",
        date: "2025-11-19T09:00:00",
        description: "A 24-hour coding challenge with prizes for the most innovative projects. Kicks off before the main event.",
        image: "imagess/16.png"
    },
    {
        title: "API Design Best Practices",
        type: "Talk",
        date: "2025-11-21T15:00:00",
        description: "Learn how to design, document, and maintain clean, consistent, and easy-to-use RESTful APIs.",
        image: "imagess/17.png"
    },
    {
        title: "DevOps Culture and Tooling",
        type: "Talk",
        date: "2025-11-20T15:30:00",
        description: "An introduction to the principles of DevOps and the tools that enable continuous integration and deployment.",
        image: "imagess/18.png"
    },
    {
        title: "Mobile-First Design in Practice",
        type: "Workshop",
        date: "2025-11-20T13:00:00",
        description: "A hands-on session focusing on practical techniques for designing and building mobile-first responsive websites.",
        image: "imagess/19.png"
    },
    {
        title: "Closing Ceremony & Awards",
        type: "Social",
        date: "2025-11-22T17:30:00",
        description: "Join us as we celebrate the best of the conference and announce the hackathon winners.",
        image: "imagess/20.png"
    }
];

// --- Global DOM Elements ---
const eventContainer = document.getElementById('event-container');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const a11yStatus = document.getElementById('a11y-status');
const noResultsMessage = document.getElementById('no-results');

// --- Global State ---
let currentFilter = 'All';
let currentSearchTerm = '';
let countdownInterval;


// --- Helper Functions ---

/**
 * Formats a raw date string into a user-friendly format (e.g., 'Nov 20, 2025 at 9:00 AM').
 * @param {string} dateString - The ISO date string from the event object.
 * @returns {string} - Formatted date and time.
 */
function formatEventDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

/**
 * Level 6: Calculates the time difference and formats it into a countdown string.
 * @param {string} dateString - The ISO date string.
 * @returns {{status: string, message: string}} - Countdown status and display message.
 */
function getCountdown(dateString) {
    const now = new Date();
    const eventTime = new Date(dateString);
    const diff = eventTime.getTime() - now.getTime();

    if (diff < 0) {
        return { status: 'ended', message: 'Event has ended' };
    }

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return {
        status: 'live',
        message: `${days}d ${hours}h ${minutes}m ${seconds}s`
    };
}


/**
 * Level 7: Highlights a search term within a text string.
 * @param {string} text - The original text.
 * @param {string} term - The search term to highlight.
 * @returns {string} - The text with matching terms wrapped in <mark> tags.
 */
function highlightText(text, term) {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

/**
 * Level 5: Generates a Google Calendar link for an event.
 * @param {object} event - The event object.
 * @returns {string} - The Google Calendar URL.
 */
function generateGoogleCalendarLink(event) {
    // Google Calendar uses a basic format for ISO dates without time zones for simplicity
    const startDate = event.date.replace(/[-:]/g, '').substring(0, 15) + 'Z'; 
    const endDate = new Date(new Date(event.date).getTime() + (60 * 60 * 1000)) // Assume 1-hour duration for simplicity
                      .toISOString().replace(/[-:]/g, '').substring(0, 15) + 'Z';

    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const params = new URLSearchParams({
        text: event.title,
        dates: `${startDate}/${endDate}`,
        details: event.description,
        sf: true, // Use simple form
        output: 'xml' // Output format
    });

    return `${baseUrl}&${params.toString()}`;
}


// --- Main Rendering and Logic ---

/**
 * Creates and returns the HTML element for a single event card.
 * @param {object} event - The event data object.
 * @param {string} searchTerm - The current search term for highlighting.
 * @returns {HTMLElement} - The fully assembled event card div.
 */
function createEventCard(event, searchTerm) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.setAttribute('data-event-id', event.title); // Use title as ID for simplicity
    
    // Highlight title and description
    const highlightedTitle = highlightText(event.title, searchTerm);
    const highlightedDescription = highlightText(event.description, searchTerm);

    const formattedDate = formatEventDate(event.date);
    
    // Level 5 & 6 elements are included here
    card.innerHTML = `
        <img src="${event.image}" alt="Image for ${event.title}">
        <div class="card-content">
            <h2>${highlightedTitle}</h2>
            <p>${highlightedDescription}</p>
            <div class="metadata">
                <div class="meta-item">
                    <span aria-hidden="true">🏷️</span>Type: <span>${event.type}</span>
                </div>
                <div class="meta-item">
                    <span aria-hidden="true">🗓️</span>Date: <span>${formattedDate}</span>
                </div>
                <div class="meta-item countdown-wrapper">
                    <span aria-hidden="true">⏱️</span>Countdown: 
                    <span class="countdown"></span>
                </div>
            </div>
            <a href="${generateGoogleCalendarLink(event)}" target="_blank" class="btn-calendar" aria-label="Add ${event.title} to Google Calendar">Add to Calendar</a>
        </div>
    `;

    return card;
}


/**
 * Core function to filter, render, and update the event grid.
 * This function also manages Level 7 (Search) and Level 8 (Animation).
 * @param {string} filter - The type of event to filter by ('All', 'Talk', 'Workshop', etc.).
 * @param {string} search - The text to search for in title or description.
 */
function renderEvents(filter, search) {
    // Stop existing countdown and clear interval before re-rendering
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    const lowerSearch = search.toLowerCase();

    // 1. Filter the events based on Type (Level 2) and Search Term (Level 7)
    const filteredEvents = events.filter(event => {
        const matchesFilter = filter === 'All' || event.type === filter;
        const matchesSearch = !search || 
                              event.title.toLowerCase().includes(lowerSearch) || 
                              event.description.toLowerCase().includes(lowerSearch);
        return matchesFilter && matchesSearch;
    });

    // 2. Identify current cards for FLIP animation (Level 8)
    const existingCards = Array.from(eventContainer.children);
    const existingIds = existingCards.map(card => card.getAttribute('data-event-id'));
    const newIds = filteredEvents.map(event => event.title);

    // Cards to remove (old but not in new list)
    existingCards.forEach(card => {
        if (!newIds.includes(card.getAttribute('data-event-id'))) {
            card.classList.add('fade-out'); // Start fade-out animation
            setTimeout(() => card.remove(), 400); // Remove after animation
        }
    });

    // 3. Create and append the new/remaining cards
    const fragment = document.createDocumentFragment();
    let visibleCount = 0;

    filteredEvents.forEach(event => {
        let card = document.querySelector(`.event-card[data-event-id="${event.title}"]`);

        if (card) {
            // Card exists, keep it but ensure it's visible and not fading out
            card.classList.remove('fade-out');
            card.classList.add('fade-in'); 
            // Re-render its content to update countdown/highlighting
            card.replaceWith(createEventCard(event, search));
            visibleCount++;
        } else {
            // New card, create it and append to fragment
            card = createEventCard(event, search);
            card.style.opacity = '0'; // Start invisible for fade-in
            card.style.transform = 'scale(0.9)'; // Start small for fade-in
            fragment.appendChild(card);
            visibleCount++;

            // Trigger the fade-in animation slightly delayed
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 50);
        }
    });

    eventContainer.appendChild(fragment);

    // 4. Update status messages
    if (visibleCount === 0) {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
    }
    
    // Level 9: ARIA Live Region Update
    a11yStatus.textContent = `Now showing ${visibleCount} events.`;

    // 5. Start the live countdown for the visible cards
    startCountdownTimer();
}


/**
 * Level 6: Starts a single interval to update all visible countdown timers.
 */
function startCountdownTimer() {
    // Clear any previous interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    const cards = Array.from(eventContainer.querySelectorAll('.event-card'));
    
    // Get all event data for visible cards
    const visibleEvents = cards.map(card => events.find(e => e.title === card.getAttribute('data-event-id')));

    // Function to update the countdowns
    const updateCountdowns = () => {
        visibleEvents.forEach((event, index) => {
            const card = cards[index];
            const countdownWrapper = card.querySelector('.countdown-wrapper');
            if (!countdownWrapper) return;

            const countdownElement = countdownWrapper.querySelector('.countdown');
            const { status, message } = getCountdown(event.date);

            if (status === 'live') {
                countdownElement.textContent = message;
                countdownElement.classList.remove('past-event');
            } else {
                countdownElement.textContent = message;
                countdownElement.classList.add('past-event');
                // Could remove the interval entirely once all events have ended, 
                // but we keep it simple by just updating the message.
            }
        });
    };

    // Run immediately and then every second (1000ms)
    updateCountdowns();
    countdownInterval = setInterval(updateCountdowns, 1000);
}


// --- Event Listeners and Initialisation ---

/**
 * Level 2 & 9: Handles filter button clicks.
 * @param {Event} e - The click event.
 */
function handleFilterClick(e) {
    const target = e.target.closest('.filter-btn');
    if (!target) return;

    // Update active class state (Level 2)
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    target.classList.add('active');
    target.setAttribute('aria-pressed', 'true');

    // Update state and re-render
    currentFilter = target.getAttribute('data-filter');
    renderEvents(currentFilter, currentSearchTerm);
}

/**
 * Level 7: Handles real-time search input.
 */
function handleSearchInput() {
    currentSearchTerm = searchInput.value.trim();
    renderEvents(currentFilter, currentSearchTerm);
}

/**
 * Level 3 & 4: Theme persistence and setting.
 */
function setupThemeToggle() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');

    // Level 4: Get persistent choice or Level 3: System preference
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme based on persistence > system preference > default 'light'
    let initialTheme = 'light';
    if (storedTheme) {
        initialTheme = storedTheme;
    } else if (systemPrefersDark) {
        initialTheme = 'dark';
    }
    body.setAttribute('data-theme', initialTheme);

    // Add click listener for manual override
    themeToggle.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        // Level 4: Persist the new choice
        localStorage.setItem('theme', newTheme);
    });

    // Optional: Listen for system theme changes and update if no manual choice is stored
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
        }
    });
}


/**
 * Initializes the application: sets up listeners and runs the initial render.
 */
function init() {
    // Setup theme persistence and toggle (Levels 3 & 4)
    setupThemeToggle(); 

    // Add filter click listener (Level 2 & 9)
    document.getElementById('filter-container').addEventListener('click', handleFilterClick);

    // Add search input listener (Level 7)
    searchInput.addEventListener('input', handleSearchInput);

    // Initial render of all events
    renderEvents(currentFilter, currentSearchTerm);
}

// Start the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);