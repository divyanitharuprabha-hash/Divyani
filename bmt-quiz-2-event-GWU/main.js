// ====== Event Data ======
const events = [
  {
    title: "Opening Keynote: The Future of AI",
    type: "Keynote",
    date: "2025-11-20T09:00:00",
    description: "Join industry visionary Dr. Evelyn Reed as she unveils the next decade of AI innovation.",
    image: "images/keynote.jpg"
  },
  {
    title: "Advanced JavaScript Workshop",
    type: "Workshop",
    date: "2025-11-20T10:30:00",
    description: "A 3-hour, hands-on deep-dive into asynchronous JavaScript, Promises, and modern ES6+ features.",
    image: "images/workshop-js.jpg"
  },
  {
    title: "Cybersecurity in the Cloud Era",
    type: "Talk",
    date: "2025-11-20T11:00:00",
    description: "Explore the evolving landscape of cloud security threats and proactive defense strategies.",
    image: "images/cybersecurity.jpg"
  }
  // ...you can add all other events here (same format)
];

// ====== Generate Event Cards ======
function loadEvents() {
  const container = document.getElementById('event-container');
  container.innerHTML = ''; // clear previous content

  events.forEach(event => {
    const card = document.createElement('div');
    card.classList.add('event-card');

    const img = document.createElement('img');
    img.src = event.image;
    img.alt = event.title;

    const info = document.createElement('div');
    info.classList.add('event-info');

    const type = document.createElement('span');
    type.classList.add('event-type');
    type.textContent = event.type;

    const title = document.createElement('h2');
    title.textContent = event.title;

    const date = document.createElement('p');
    const eventDate = new Date(event.date);
    date.textContent = `📅 ${eventDate.toDateString()} | 🕒 ${eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

    const desc = document.createElement('p');
    desc.textContent = event.description;

    info.appendChild(type);
    info.appendChild(title);
    info.appendChild(date);
    info.appendChild(desc);

    card.appendChild(img);
    card.appendChild(info);

    container.appendChild(card);
  });
}

// ====== Initialize ======
document.addEventListener('DOMContentLoaded', loadEvents);
