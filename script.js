/* =========================================================================
   3D CAROUSEL LOGIC
   ========================================================================= */

const carousel = document.getElementById("project-carousel");
const items = document.querySelectorAll(".carousel-item");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currDeg = 0;
// Calculate the angle between each item based on total items
const theta = 360 / items.length;
// Calculate radius to push items outwards forming a circle
// Using math: radius = (width / 2) / tan(PI / numberOfItems)
// Item width is 250px from our CSS
const radius = Math.round((250 / 2) / Math.tan(Math.PI / items.length));

function initCarousel() {
    items.forEach((item, index) => {
        const itemAngle = theta * index;
        // Apply 3D rotation and translation to form the circle
        item.style.transform = `rotateY(${itemAngle}deg) translateZ(${radius}px)`;
    });
}

function rotateCarousel() {
    // Rotate the entire container to switch active items
    carousel.style.transform = `translate(-50%, -50%) rotateY(${currDeg}deg)`;
}

if (carousel) {
    initCarousel();

    nextBtn.addEventListener("click", () => {
        currDeg -= theta; // Rotate Left
        rotateCarousel();
    });

    prevBtn.addEventListener("click", () => {
        currDeg += theta; // Rotate Right
        rotateCarousel();
    });

    // Optional Auto-play mechanism
    let autoplay = setInterval(() => {
        currDeg -= theta;
        rotateCarousel();
    }, 4000);

    // Pause on hover
    document.querySelector('.hero-3d-visual').addEventListener('mouseenter', () => {
        clearInterval(autoplay);
    });
    document.querySelector('.hero-3d-visual').addEventListener('mouseleave', () => {
        autoplay = setInterval(() => {
            currDeg -= theta;
            rotateCarousel();
        }, 4000);
    });
}

/* =========================================================================
   ANIMATED METRICS COUNTERS
   ========================================================================= */

const statNumbers = document.querySelectorAll('.stat-number');
let hasCounted = false;

// Function to animate numbers
const animateNumbers = () => {
    statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const increment = target / 100; // Define speed/steps

        // Counter function
        const updateCount = () => {
            const current = +stat.innerText;
            if (current < target) {
                stat.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 20);
            } else {
                stat.innerText = target;
                if (target === 6) stat.innerText = target + "+"; // Adding plus to projects
            }
        };
        updateCount();
    });
};

/* =========================================================================
   INTERSECTION OBSERVERS (Scroll Reveal & Counters)
   ========================================================================= */

const revealElements = document.querySelectorAll(".reveal");
const metricsSectionElement = document.querySelector('.metrics');

const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const scrollObserver = new IntersectionObserver(function (entries, scrollObserver) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add("active");

            // Check if it's the metrics section to start counter
            if (entry.target.classList.contains('metrics') && !hasCounted) {
                animateNumbers();
                hasCounted = true;
            }
            // Optional: unobserve if you only want it to animate once
            // scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(el => {
    scrollObserver.observe(el);
});

// Also observe metrics section explicitly if it lacks reveal class
if (metricsSectionElement) {
    scrollObserver.observe(metricsSectionElement);
}

/* =========================================================================
   MOBILE NAVIGATION
   ========================================================================= */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-link");
const navbar = document.getElementById("navbar");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "auto";
    });
}

navLinks.forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "auto";
}));

/* Shrink navbar on scroll */
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.padding = "10px 0";
        navbar.style.background = "rgba(13, 17, 35, 0.85)";
    } else {
        navbar.style.padding = "20px 0";
        navbar.style.background = "rgba(13, 17, 35, 0.4)";
    }
});
