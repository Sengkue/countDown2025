// --- PART 1: COUNTDOWN LOGIC ---
const targetDate = new Date("January 1, 2026 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.querySelector(".countdown-container").innerHTML = "<h1>Happy New Year 2026!</h1>";
        return; // The fireworks will keep going!
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}
setInterval(updateCountdown, 1000);
updateCountdown();


// --- PART 2: FIREWORKS ENGINE ---
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas if window changes
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];

class Particle {
    constructor(x, y, color, velocity) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
        this.friction = 0.96; // Slows down particles (gravity effect)
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += 0.03; // Gravity pulling down
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01; // Fade out
    }
}

function createFirework(x, y) {
    const particleCount = 100;
    const angleIncrement = (Math.PI * 2) / particleCount;
    const power = Math.random() * 5 + 2; // Size of explosion

    // Random bright colors
    const hue = Math.floor(Math.random() * 360); 
    const color = `hsl(${hue}, 100%, 50%)`;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color, {
            x: Math.cos(angleIncrement * i) * Math.random() * power,
            y: Math.sin(angleIncrement * i) * Math.random() * power
        }));
    }
}

function animate() {
    // This creates the "trail" effect by not clearing the screen completely
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        if (particle.alpha > 0) {
            particle.update();
            particle.draw();
        } else {
            particles.splice(index, 1); // Remove invisible particles
        }
    });

    requestAnimationFrame(animate);
}

// Launch random fireworks automatically
setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height / 2); // Explode in top half
    createFirework(x, y);
}, 800); // New firework every 800ms

// Start animation loop
animate();