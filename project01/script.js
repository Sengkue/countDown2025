// Target date: Midnight, January 1, 2026
const targetDate = new Date("January 1, 2026 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the results in the elements with id="days", "hours", etc.
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    // If the countdown is finished, display a message
    if (distance < 0) {
        clearInterval(timerInterval);
        document.querySelector(".countdown-container").innerHTML = "<h1>Happy New Year 2026!</h1>";
    }
}

// Update the count down every 1 second
const timerInterval = setInterval(updateCountdown, 1000);

// Run immediately so there is no 1-second delay on load
updateCountdown();

// List of items to fall
const particles = ['💎', '🌸', '✨', '🌹', 'Happy New Year', '🌻', '💍', '2026','🎺','😄','🤪'];

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