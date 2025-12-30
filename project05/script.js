// --- SETUP ---
const canvas = document.getElementById('worldCanvas');
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

// --- THE BLESSINGS LIST (Text + Icons) ---
const blessings = [
    // --- Lao Wishes ---
    "ເງິນເຂົ້າບັນຊີ",    // Money enters account
    "ຫາຄົນຮັກໄດ້",      // Find a lover
    "ມີຄວາມສຸກ",        // Be happy
    "ສຸຂະພາບແຂງເເຮງ",  // Strong health
    "ໂຊກດີປີໃໝ່",       // Good luck New Year
    "ລ້ຳລວຍ",          // Wealthy
    "ສົມຫວັງ",          // Wishes come true
    "ການງານກ້າວໜ້າ",    // Career progress
    "ເດີນທາງປອດໄພ",    // Safe travels
    
    // --- Icons & Emojis ---
    "💰", "💸", "💵",  // Money
    "🌸", "🌹", "🌻", "🌺", "🌷", // Flowers
    "💍", "💎",       // Ring / Diamond
    "❤️", "💖",       // Love
    "🎉", "✨",       // Celebration
    "🎁", "🧧",       // Gifts / Red Envelope
    "2026"
];

// --- ANIMATION CLASSES ---

// 1. Falling Blessings (Rain)
class TextRain {
    constructor() {
        this.reset();
        this.y = Math.random() * height; // Start partially down the screen
    }

    reset() {
        this.x = Math.random() * width;
        this.y = -50;
        this.speed = Math.random() * 1.5 + 0.5;
        // Pick a random item from the list
        this.text = blessings[Math.floor(Math.random() * blessings.length)];
        
        // Random size: Emojis look better slightly bigger
        this.fontSize = Math.floor(Math.random() * 12) + 16; 
        this.opacity = Math.random() * 0.6 + 0.3;
    }

    update() {
        this.y += this.speed;
        if (this.y > height + 20) {
            this.reset();
        }
    }

    draw() {
        // We use the Lao font, but emojis will automatically use the system emoji font
        ctx.font = `${this.fontSize}px 'Noto Sans Lao', sans-serif`;
        
        // White-ish color with transparency
        ctx.fillStyle = `rgba(230, 240, 255, ${this.opacity})`;
        
        // Draw the text or emoji
        ctx.fillText(this.text, this.x, this.y);
    }
}

// 2. The Stars
class Star {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * (height * 0.65); // Stars only in top 65%
        this.size = Math.random() * 2;
        this.blinkSpeed = Math.random() * 0.05 + 0.01;
        this.alpha = Math.random();
        this.direction = 1;
    }
    update() {
        this.alpha += this.blinkSpeed * this.direction;
        if (this.alpha >= 1 || this.alpha <= 0.2) this.direction *= -1;
    }
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 3. The Plane
class Plane {
    constructor() {
        this.x = -50;
        this.y = height * 0.15;
        this.speed = 2;
    }
    update() {
        this.x += this.speed;
        if (this.x > width + 100) this.x = -100;
    }
    draw() {
        // White body light
        ctx.fillStyle = "#fff"; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI*2); 
        ctx.fill();

        // Red blinking light
        if (Math.floor(Date.now() / 200) % 2 === 0) {
            ctx.fillStyle = "#ff3333";
            ctx.beginPath();
            ctx.arc(this.x - 10, this.y, 2, 0, Math.PI*2);
            ctx.fill();
        }
    }
}

// 4. The Birds
class Bird {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * (height * 0.4);
        this.speed = Math.random() * 1 + 0.5;
        this.counter = Math.random() * 100;
    }
    update() {
        this.x += this.speed;
        this.counter += 0.1;
        if (this.x > width + 20) this.x = -20;
    }
    draw() {
        ctx.strokeStyle = "rgba(0, 0, 0, 0.4)"; 
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        let yOffset = Math.sin(this.counter) * 5;
        ctx.moveTo(this.x, this.y);
        ctx.quadraticCurveTo(this.x + 5, this.y + yOffset, this.x + 10, this.y);
        ctx.stroke();
    }
}

// --- UTILITIES ---

function drawDeer(x, y) {
    ctx.fillStyle = "#020202"; 
    ctx.beginPath();
    let s = 1.2; 
    ctx.moveTo(x, y);
    ctx.lineTo(x + 10*s, y - 30*s); 
    ctx.lineTo(x + 30*s, y - 30*s); 
    ctx.lineTo(x + 40*s, y - 60*s); 
    ctx.lineTo(x + 35*s, y - 75*s); 
    ctx.moveTo(x + 38*s, y - 75*s); 
    ctx.lineTo(x + 45*s, y - 90*s);
    ctx.moveTo(x + 38*s, y - 75*s);
    ctx.lineTo(x + 30*s, y - 85*s);
    ctx.moveTo(x + 30*s, y - 30*s);
    ctx.lineTo(x + 40*s, y); 
    ctx.lineTo(x + 35*s, y);
    ctx.lineTo(x + 25*s, y - 20*s); 
    ctx.lineTo(x + 5*s, y); 
    ctx.closePath();
    ctx.fill();
}

function drawHills() {
    ctx.fillStyle = "#050505"; // Very dark ground
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let x = 0; x <= width; x++) {
        let y = height - 100 - Math.sin(x * 0.003) * 50 - Math.sin(x * 0.01) * 20;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.fill();

    let dx = width * 0.75;
    let dy = height - 100 - Math.sin(dx * 0.003) * 50 - Math.sin(dx * 0.01) * 20;
    drawDeer(dx, dy);
}

function drawAurora() {
    let time = Date.now() * 0.0005;
    let gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#000000"); 
    gradient.addColorStop(0.5, "#0b1a26"); 
    gradient.addColorStop(1, "#162a26"); 

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = "lighter"; 
    
    for (let i = 1; i <= 3; i++) {
        ctx.fillStyle = `rgba(0, 255, 128, ${0.15 / i})`; 
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        for (let x = 0; x <= width; x+=10) {
            let noise = Math.sin(x * 0.005 + time * i) * 100 + Math.sin(x * 0.01 - time) * 50;
            let y = height * 0.4 + noise; 
            ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over"; 
}

// --- INITIALIZE OBJECTS ---
const stars = Array.from({ length: 80 }, () => new Star());
const birds = Array.from({ length: 10 }, () => new Bird());
// Increase rain amount slightly to show off the emojis
const rainDrops = Array.from({ length: 50 }, () => new TextRain());
const plane = new Plane();

// --- MAIN LOOP ---
function animate() {
    ctx.clearRect(0, 0, width, height);

    drawAurora();

    stars.forEach(star => { star.update(); star.draw(); });
    
    // Draw the mixed text/emoji rain
    rainDrops.forEach(drop => { drop.update(); drop.draw(); });

    birds.forEach(bird => { bird.update(); bird.draw(); });
    
    plane.update();
    plane.draw();

    drawHills();

    requestAnimationFrame(animate);
}
animate();

// --- COUNTDOWN LOGIC ---
const targetDate = new Date("January 1, 2026 00:00:00").getTime();

function updateTime() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.querySelector(".main-title").innerText = "Sabaidee Pi Mai 2026";
        document.querySelector(".timer-box").innerHTML = ""; 
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