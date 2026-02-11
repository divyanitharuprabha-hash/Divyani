const destinations = [
    { name: "Kyoto, Japan", continent: "Asia", image: "1.jpg.jpeg", description: "Ancient temples and serene gardens." },
    { name: "Rome, Italy", continent: "Europe", image: "2.jpg.jpeg", description: "A city of ancient history and vibrant culture." },
    { name: "Ha Long Bay, Vietnam", continent: "Asia", image: "3.jpg.jpeg", description: "Thousands of limestone islands in emerald waters." },
    { name: "Paris, France", continent: "Europe", image: "4.jpg.jpeg", description: "The iconic city of lights, art, and romance." },
    { name: "Bali, Indonesia", continent: "Asia", image: "5.jpg.jpeg", description: "Lush rice paddies and volcanic mountains." },
    { name: "Prague, Czech Republic", continent: "Europe", image: "6.jpg.jpeg", description: "A fairytale city with a rich medieval core." }
];

document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.querySelector('#destinations-grid');
    const filterAllBtn = document.querySelector('#filter-all');
    const filterAsiaBtn = document.querySelector('#filter-asia');
    const filterEuropeBtn = document.querySelector('#filter-europe');
    const allFilterBtns = [filterAllBtn, filterAsiaBtn, filterEuropeBtn];

    // Function to render destinations
    function renderDestinations(list) {
        gridContainer.innerHTML = ''; // Clear the grid first
        list.forEach(dest => {
            const card = document.createElement('article');
            card.classList.add('destination-card');
            card.innerHTML = `
                <img src="${dest.image}" alt="Image of ${dest.name}">
                <div class="card-content">
                    <h3>${dest.name}</h3>
                    <p class="continent-tag">${dest.continent}</p>
                    <p>${dest.description}</p>
                </div>`;
            gridContainer.appendChild(card);
        });
    }

    // Function to handle active button state
    function setActiveButton(activeBtn) {
        allFilterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    // Event Listeners
    filterAllBtn.addEventListener('click', () => {
        renderDestinations(destinations);
        setActiveButton(filterAllBtn);
    });

    filterAsiaBtn.addEventListener('click', () => {
        const asiaDestinations = destinations.filter(dest => dest.continent === 'Asia');
        renderDestinations(asiaDestinations);
        setActiveButton(filterAsiaBtn);
    });

    filterEuropeBtn.addEventListener('click', () => {
        const europeDestinations = destinations.filter(dest => dest.continent === 'Europe');
        renderDestinations(europeDestinations);
        setActiveButton(filterEuropeBtn);
    });

    // Initial render on page load
    renderDestinations(destinations);
});