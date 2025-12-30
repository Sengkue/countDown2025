// --- CONFIGURATION ---
const STAR_COUNT = 4000;
const GALAXY_ARMS = 3; // How many spiral arms
const ARM_SPREAD = 0.5; // How loose the spiral is
const ROTATION_SPEED = 0.002;

// --- SETUP ---
const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

// --- STAR CLASS ---
class Star {
    constructor() {
        this.init();
    }

    init() {
        // Distance from center
        this.distance = Math.random() * (Math.min(width, height) / 1.5);
        
        // Logic to create Spiral Arms
        // We base the angle on the distance + random noise
        const spin = this.distance / 200; 
        const armAngle = (Math.floor(Math.random() * GALAXY_ARMS) * 2 * Math.PI) / GALAXY_ARMS;
        const randomOffset = (Math.random() - 0.5) * ARM_SPREAD;
        
        this.angle = spin + armAngle + randomOffset;
        
        this.size = Math.random() * 2;
        this.speed = (1 / this.distance) * 5 + 0.005; // Inner stars move faster
        
        // Colors: Hot center (Yellow/White) -> Cold edge (Purple/Blue)
        if (this.distance < 100) {
            this.color = `rgba(255, 255, 200, ${Math.random()})`; // White/Yellow
        } else if (this.distance < 300) {
            this.color = `rgba(100, 200, 255, ${Math.random()})`; // Cyan
        } else {
            this.color = `rgba(180, 50, 255, ${Math.random()})`; // Purple
        }
    }

    update() {
        // Orbit around center
        this.angle += ROTATION_SPEED;
    }

    draw() {
        // Convert Polar Coordinates (Angle/Distance) to Cartesian (X/Y)
        const x = width / 2 + Math.cos(this.angle) * this.distance;
        const y = height / 2 + Math.sin(this.angle) * this.distance;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Draw star
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// --- INITIALIZE ---
let stars = [];
for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(new Star());
}

// --- ANIMATION LOOP ---
function animate() {
    // Trail Effect: Do not clear completely. Draw semi-transparent black.
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; 
    ctx.fillRect(0, 0, width, height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}
animate();

// --- COUNTDOWN LOGIC ---
const targetDate = new Date("January 1, 2026 00:00:00").getTime();

function updateTime() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.querySelector(".galaxy-title").innerText = "UNIVERSE RESET";
        return; 
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("d").innerText = d < 10 ? "0" + d : d;
    document.getElementById("h").innerText = h < 10 ? "0" + h : h;
    document.getElementById("m").innerText = m < 10 ? "0" + m : m;
    document.getElementById("s").innerText = s < 10 ? "0" + s : s;
}
setInterval(updateTime, 1000);
updateTime();