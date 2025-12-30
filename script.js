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