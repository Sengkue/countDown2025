const canvas = document.getElementById('missionCanvas');
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

// --- 1. THE STARS (GALAXY) ---
const stars = [];
for(let i=0; i<300; i++) {
    stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5,
        alpha: Math.random()
    });
}

// --- 2. THE 3D EARTH (DOT SPHERE) ---
const GLOBE_RADIUS = 180;
const DOT_COUNT = 400;
const globeDots = [];

// Generate points on a sphere surface
for(let i=0; i<DOT_COUNT; i++) {
    const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
    const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;
    
    globeDots.push({
        x: GLOBE_RADIUS * Math.cos(theta) * Math.sin(phi),
        y: GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi),
        z: GLOBE_RADIUS * Math.cos(phi)
    });
}

let rotationAngle = 0;

// --- 3. THE ROCKET ---
let rocketAngle = 0;

function draw() {
    // Clear screen with trailing effect for motion
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, width, height);

    // A. Draw Stars
    ctx.fillStyle = "white";
    stars.forEach(star => {
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI*2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Center of screen
    const cx = width / 2;
    const cy = height / 2;

    // B. Draw 3D Earth
    rotationAngle += 0.005; // Earth spin speed

    globeDots.forEach(dot => {
        // Rotate Sphere Logic (Y-axis rotation)
        let x = dot.x * Math.cos(rotationAngle) - dot.z * Math.sin(rotationAngle);
        let z = dot.z * Math.cos(rotationAngle) + dot.x * Math.sin(rotationAngle);
        let y = dot.y;

        // Projection (3D to 2D)
        // Only draw dots on the "front" side (z > 0)
        let scale = 300 / (300 + z); // Perspective scale
        let alpha = (z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS); // Fade back dots

        if (z > -50) { // Visibility check
            let px = cx + x;
            let py = cy + y;
            
            ctx.fillStyle = `rgba(0, 210, 255, ${alpha})`; // Hologram Blue
            ctx.beginPath();
            ctx.arc(px, py, 2 * scale, 0, Math.PI*2);
            ctx.fill();
        }
    });

    // C. Draw Rocket (Orbiting)
    rocketAngle += 0.02; // Rocket speed
    const orbitRadius = GLOBE_RADIUS + 60;
    
    // Calculate Rocket 3D position (Orbit inclined)
    let rx = Math.cos(rocketAngle) * orbitRadius;
    let rz = Math.sin(rocketAngle) * orbitRadius;
    let ry = Math.sin(rocketAngle * 2) * 40; // Wave motion in Y

    // Rocket Perspective
    let rScale = 300 / (300 + rz);
    let rPx = cx + rx;
    let rPy = cy + ry;

    // Draw Rocket only if in front (or draw slightly dimmer if behind)
    let rocketAlpha = rz > 0 ? 1 : 0.3;
    
    // Engine Flame
    ctx.fillStyle = `rgba(255, 100, 50, ${rocketAlpha})`;
    ctx.beginPath();
    ctx.arc(rPx - 10, rPy, 5 * rScale, 0, Math.PI*2);
    ctx.fill();

    // Rocket Body
    ctx.fillStyle = `rgba(255, 255, 255, ${rocketAlpha})`;
    ctx.beginPath();
    // Simple Triangle shape
    ctx.moveTo(rPx + 10 * rScale, rPy);
    ctx.lineTo(rPx - 10 * rScale, rPy - 5 * rScale);
    ctx.lineTo(rPx - 10 * rScale, rPy + 5 * rScale);
    ctx.fill();

    // D. Update Fake Data in HUD
    // Creates random flickering numbers for realism
    if(Math.random() > 0.9) {
        document.getElementById('alt').innerText = (400 + Math.random() * 5).toFixed(1);
    }
    
    requestAnimationFrame(draw);
}
draw();

// --- COUNTDOWN LOGIC ---
const targetDate = new Date("January 1, 2026 00:00:00").getTime();

function updateTime() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.querySelector(".t-minus-title").innerText = "LIFTOFF CONFIRMED";
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