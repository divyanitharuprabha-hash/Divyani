
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        nav.style.background = '#0b1120';
        nav.style.padding = '0.8rem 2rem';
    } else {
        nav.style.background = 'rgba(11, 17, 32, 0.9)';
        nav.style.padding = '1.2rem 2rem';
    }
});


const skills = document.querySelectorAll('.skill-box img');
skills.forEach((img, index) => {
    img.style.animationDelay = `${index * 0.5}s`;
});