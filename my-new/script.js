function showDetail(type) {
    const box = document.getElementById('detail-box');
    const title = document.getElementById('detail-title');
    const description = document.getElementById('detail-description');

    // Show the hidden detail box
    box.classList.remove('hidden');

    // Update text based on the card clicked
    if (type === 'undergrad') {
        title.innerHTML = "🎓 Undergraduate Student";
        description.innerHTML = "I am currently pursuing my degree (Biomedical technology), focusing on developing my technical and analytical skills. I am a dedicated student aiming for excellence in my academic journey.Bridging the gap between technology and medicine. I study how to design, build, and optimize the advanced medical devices that power modern healthcare and save lives.";
    
} 
    else if (type === 'banking') {
        title.innerHTML = "🏦 Banking Internship";
        description.innerHTML = "Completed a professional internship in the banking sector. I learned about financial operations, professionalism, and how to work effectively in a corporate environment.";
    } 
    else if (type === 'ui-design') {
        title.innerHTML = "🎨 UI Design Beginner";
        description.innerHTML = "I was a partner in a winning group project for a UI Design competition! Although I am a beginner, I love creating colorful layouts and collaborating with creative teams.";
    }

    // Smoothly scroll down to the details
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}