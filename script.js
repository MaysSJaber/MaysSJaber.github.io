// Initial loader gives the page a polished entrance without delaying interaction.
const loader = document.querySelector(".loader");
window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 550);
});

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");
const backToTop = document.querySelector(".back-to-top");

navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        document.body.classList.remove("menu-open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

const typingText = document.querySelector("#typing-text");
const phrases = [
    "Back-End Development Enthusiast",
    "C++ and Java Learner",
    "Problem Solver in Progress"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typePhrase() {
    const phrase = phrases[phraseIndex];
    typingText.textContent = phrase.slice(0, charIndex);

    if (!isDeleting && charIndex < phrase.length) {
        charIndex += 1;
        setTimeout(typePhrase, 75);
        return;
    }

    if (!isDeleting && charIndex === phrase.length) {
        isDeleting = true;
        setTimeout(typePhrase, 1200);
        return;
    }

    if (isDeleting && charIndex > 0) {
        charIndex -= 1;
        setTimeout(typePhrase, 38);
        return;
    }

    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typePhrase, 300);
}

typePhrase();

// Reveal elements when they enter the viewport.
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Active section highlighting for smoother navigation feedback.
const sections = document.querySelectorAll("section[id]");
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navItems.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
    });
}, {
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0
});

sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("scroll", () => {
    const scrolled = window.scrollY > 70;
    header.classList.toggle("scrolled", scrolled);
    backToTop.classList.toggle("visible", window.scrollY > 450);
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Lightweight animated particle background using olive-toned dots.
const canvas = document.querySelector("#particle-canvas");
const context = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
}

function createParticles() {
    const total = Math.min(72, Math.floor((window.innerWidth * window.innerHeight) / 18000));
    particles = Array.from({ length: total }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.7,
        speedX: (Math.random() - 0.5) * 0.28,
        speedY: (Math.random() - 0.5) * 0.28,
        alpha: Math.random() * 0.42 + 0.16
    }));
}

function drawParticles() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(174, 195, 176, ${particle.alpha})`;
        context.fill();
    });

    requestAnimationFrame(drawParticles);
}

resizeCanvas();
drawParticles();
window.addEventListener("resize", resizeCanvas);
