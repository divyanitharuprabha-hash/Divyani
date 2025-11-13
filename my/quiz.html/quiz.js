<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechCon 2025 Event Schedule</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>

    <header class="site-header">
        <div class="container">
            <h1>TechCon 2025 Event Schedule</h1>
            <button id="theme-toggle" aria-label="Toggle dark and light mode">
                ☀️
            </button>
        </div>
    </header>

    <main class="container">
        <section class="event-controls">
            <input type="text" id="event-search" placeholder="Search events by title or description..." aria-label="Search events">
            
            <div id="filter-buttons" aria-label="Filter events by type">
                <button class="filter-btn active" data-filter="all">All Events</button>
                <button class="filter-btn" data-filter="Keynote">Keynotes</button>
                <button class="filter-btn" data-filter="Talk">Talks</button>
                <button class="filter-btn" data-filter="Workshop">Workshops</button>
                <button class="filter-btn" data-filter="Panel">Panels</button>
                <button class="filter-btn" data-filter="Social">Social</button>
            </div>
        </section>

        <section id="event-container" aria-live="polite" aria-atomic="true">
            </section>

        <div id="live-announcer" class="sr-only" aria-live="polite"></div>

    </main>

    <footer>
        <div class="container">
            <p>&copy; 2025 TechCon. All rights reserved. | Built by Freelance Developer</p>
        </div>
    </footer>

    <script src="scripts/main.js"></script>
</body>
</html>