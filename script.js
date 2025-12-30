// List of items to fall
const particles = ['💎', '🌸', '✨', '🌹', 'Happy New Year', '🌻', '💍', '2026'];

function createRainParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Pick a random symbol from our list
    const randomSymbol = particles[Math.floor(Math.random() * particles.length)];
    particle.innerText = randomSymbol;

    // Randomize the starting horizontal position (0 to 100% of screen width)
    particle.style.left = Math.random() * 100 + "vw";

    // Randomize the fall duration (between 3 and 7 seconds)
    const duration = Math.random() * 4 + 3;
    particle.style.animationDuration = duration + "s";

    // Randomize the font size slightly
    particle.style.fontSize = Math.random() * 20 + 15 + "px";

    document.body.appendChild(particle);

    // Remove the particle from the DOM after it finishes falling to save memory
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// Create a new particle every 200 milliseconds
setInterval(createRainParticle, 200);