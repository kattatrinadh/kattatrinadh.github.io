// JavaScript Document

/*
TemplateMo 600 Prism Flux
https://templatemo.com/tm-600-prism-flux
*/

// Portfolio data for carousel
const portfolioData = [
    {
        id: 1,
        title: 'AES Security System',
        description: 'Implemented Advanced Encryption Standard (AES) algorithm to secure data transmission and storage.',
        image: '', // Placeholder for image
        tech: ['Python', 'Cryptography']
    },
    {
        id: 2,
        title: 'IoT Smart LED',
        description: 'Developed an intelligent lighting system controlled via MQTT for smart home integration.',
        image: '',
        tech: ['C', 'ESP32', 'MQTT']
    },
    {
        id: 3,
        title: 'QR Code Scanner',
        description: 'Built a real-time QR code scanning application for rapid data extraction and processing.',
        image: '',
        tech: ['Python', 'OpenCV']
    },
    {
        id: 4,
        title: 'Train Reservation System',
        description: 'Created an automated booking and management system for railway ticketing.',
        image: '',
        tech: ['C', 'OOP']
    },
    {
        id: 5,
        title: 'Battery Management System',
        description: 'Designed a BMS emphasizing real-time monitoring and safety for EV battery packs.',
        image: '',
        tech: ['Embedded C', 'FreeRTOS']
    }
];

// Skills data
const skillsData = [
    { name: 'AWS', icon: '☁️', level: 90, category: 'cloud' },
    { name: 'Azure', icon: '☁️', level: 85, category: 'cloud' },
    { name: 'Kubernetes', icon: '☸️', level: 80, category: 'cloud' },
    { name: 'Docker', icon: '🐳', level: 85, category: 'cloud' },
    { name: 'Terraform', icon: '🏗️', level: 80, category: 'cloud' },
    { name: 'Ansible', icon: '⚙️', level: 75, category: 'cloud' },
    { name: 'Jenkins', icon: '🚀', level: 85, category: 'cloud' },
    { name: 'Linux', icon: '🐧', level: 90, category: 'cloud' },
    { name: 'Bash', icon: '💻', level: 85, category: 'backend' },
    { name: 'Python', icon: '🐍', level: 90, category: 'backend' },
    { name: 'C', icon: '⚙️', level: 85, category: 'backend' },
    { name: 'Embedded C', icon: '🔌', level: 85, category: 'hardware' },
    { name: 'FreeRTOS', icon: '⏱️', level: 80, category: 'hardware' },
    { name: 'Microcontrollers', icon: '🎛️', level: 85, category: 'hardware' },
    { name: 'IoT/MQTT', icon: '📡', level: 80, category: 'hardware' }
];

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = document.getElementById('header');
    if (section) {
        const headerHeight = header.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize particles for philosophy section
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';

        // Start particles at random vertical positions throughout the section
        particle.style.top = Math.random() * 100 + '%';

        // Random animation delay for natural movement
        particle.style.animationDelay = Math.random() * 20 + 's';

        // Random animation duration for variety
        particle.style.animationDuration = (18 + Math.random() * 8) + 's';

        particlesContainer.appendChild(particle);
    }
}

// Initialize carousel
let currentIndex = 0;
const carousel = document.getElementById('carousel');
const indicatorsContainer = document.getElementById('indicators');

function createCarouselItem(data, index) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.dataset.index = index;

    const techBadges = data.tech.map(tech =>
        `<span class="tech-badge">${tech}</span>`
    ).join('');

    // Removed project images as requested
    item.innerHTML = `
        <div class="card">
            <div class="card-number">0${data.id}</div>
            <h3 class="card-title" style="margin-top: 20px;">${data.title}</h3>
            <p class="card-description">${data.description}</p>
            <div class="card-tech">${techBadges}</div>
            <button class="card-cta" onclick="window.open('https://github.com/Mrkatta', '_blank')">Explore</button>
        </div>
    `;

    return item;
}

function initCarousel() {
    if (!carousel || !indicatorsContainer) return;
    portfolioData.forEach((data, index) => {
        const item = createCarouselItem(data, index);
        carousel.appendChild(item);
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    updateCarousel();
}

function updateCarousel() {
    if (!carousel) return;
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const totalItems = items.length;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    items.forEach((item, index) => {
        let offset = index - currentIndex;
        if (offset > Math.floor(totalItems / 2)) offset -= totalItems;
        else if (offset < -Math.floor(totalItems / 2)) offset += totalItems;

        const absOffset = Math.abs(offset);
        const sign = offset < 0 ? -1 : 1;

        item.style.transform = '';
        item.style.opacity = '';
        item.style.zIndex = '';
        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';

        let spacing1 = 400, spacing2 = 600, spacing3 = 750;
        if (isMobile) { spacing1 = 280; spacing2 = 420; spacing3 = 550; }
        else if (isTablet) { spacing1 = 340; spacing2 = 520; spacing3 = 650; }

        if (absOffset === 0) {
            item.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1)';
            item.style.opacity = '1';
            item.style.zIndex = '10';
        } else if (absOffset === 1) {
            const translateX = sign * spacing1;
            const rotation = isMobile ? 25 : 30;
            const scale = isMobile ? 0.88 : 0.85;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-200px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.8';
            item.style.zIndex = '5';
        } else if (absOffset === 2) {
            const translateX = sign * spacing2;
            const rotation = isMobile ? 35 : 40;
            const scale = isMobile ? 0.75 : 0.7;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.5';
            item.style.zIndex = '3';
        } else {
            const translateX = sign * spacing3;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-450px) scale(0.6)`;
            item.style.opacity = '0';
            item.style.zIndex = '1';
        }
    });

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % portfolioData.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Restored Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    initCarousel();
});

// Initialize hexagonal skills grid
function initSkillsGrid() {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid) return;
    const categoryTabs = document.querySelectorAll('.category-tab');

    function displaySkills(category = 'all') {
        skillsGrid.innerHTML = '';

        const filteredSkills = category === 'all'
            ? skillsData
            : skillsData.filter(skill => skill.category === category);

        filteredSkills.forEach((skill, index) => {
            const hexagon = document.createElement('div');
            hexagon.className = 'skill-hexagon';
            hexagon.style.animationDelay = `${index * 0.1}s`;

            hexagon.innerHTML = `
                <div class="hexagon-inner">
                    <div class="hexagon-content">
                        <div class="skill-icon-hex">${skill.icon}</div>
                        <div class="skill-name-hex">${skill.name}</div>
                        <div class="skill-level">
                            <div class="skill-level-fill" style="width: ${skill.level}%"></div>
                        </div>
                        <div class="skill-percentage-hex">${skill.level}%</div>
                    </div>
                </div>
            `;

            skillsGrid.appendChild(hexagon);
        });
    }

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            displaySkills(tab.dataset.category);
        });
    });

    displaySkills();
}

// Event listeners
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Auto-rotate carousel
setInterval(() => {
    if (carousel) nextSlide();
}, 5000);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Update carousel on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateCarousel();
    }, 250);
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initSkillsGrid();
    initParticles();
});


// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Smooth scrolling and active navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection && header) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navMenu && menuToggle) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});

// Update active navigation on scroll
function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href').substring(1);
                if (href === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Animated counter for stats
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for stats animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(number => {
                if (!number.classList.contains('animated')) {
                    number.classList.add('animated');
                    animateCounter(number);
                }
            });
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Show success message
        alert(`Thank you ${data.name}! Your message has been transmitted successfully.`);

        // Reset form
        contactForm.reset();
    });
}

// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1500);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        // Reduced parallax slightly to match spacing
        parallax.style.backgroundPositionY = `${scrolled * 0.3}px`;
    }
});

// Interactive Hero Background (Collision Particles)
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Resize handler
    window.addEventListener('resize', () => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
        initHeroParticles();
    });

    const particles = [];
    const maxParticles = 60;
    const connectionDistance = 100;
    const mouseConnectionDistance = 150;

    // Mouse object to track position
    const mouse = {
        x: undefined,
        y: undefined,
        radius: 120
    };

    // Track mouse movement over the container
    const heroContainer = document.getElementById('heroTextContainer');
    if (heroContainer) {
        // We set pointer-events: auto on the canvas, so it can catch mouse events
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener('mouseleave', () => {
            mouse.x = undefined;
            mouse.y = undefined;
        });
    }

    class HeroParticle {
        constructor(x, y, dx, dy, size) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.size = size;
            this.baseColor = '0, 255, 255'; // Cyan
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgba(${this.baseColor}, 0.8)`;
            ctx.fill();
        }

        update() {
            // Bounce off edges
            if (this.x + this.size > width || this.x - this.size < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.size > height || this.y - this.size < 0) {
                this.dy = -this.dy;
            }

            // Mouse collision / repulsion
            if (mouse.x != undefined && mouse.y != undefined) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    // Calculate repulsion force
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    const maxSpeed = 3;

                    // Apply repulsion
                    this.x -= forceDirectionX * force * maxSpeed;
                    this.y -= forceDirectionY * force * maxSpeed;
                }
            }

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        }
    }

    function initHeroParticles() {
        particles.length = 0;
        for (let i = 0; i < maxParticles; i++) {
            let size = Math.random() * 2 + 1;
            let x = Math.random() * (width - size * 2) + size * 2;
            let y = Math.random() * (height - size * 2) + size * 2;
            let dx = (Math.random() - 0.5) * 1.5;
            let dy = (Math.random() - 0.5) * 1.5;
            particles.push(new HeroParticle(x, y, dx, dy, size));
        }
    }

    function animateHeroParticles() {
        requestAnimationFrame(animateHeroParticles);
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        drawConnections();
    }

    function drawConnections() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                // Connect particles to each other
                if (distance < connectionDistance) {
                    let opacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.4})`; // Cyan lines
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }

            // Connect particles to mouse
            if (mouse.x != undefined && mouse.y != undefined) {
                let dx = particles[a].x - mouse.x;
                let dy = particles[a].y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseConnectionDistance) {
                    let opacity = 1 - (distance / mouseConnectionDistance);
                    ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.8})`; // Purple lines to mouse
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    initHeroParticles();
    animateHeroParticles();
});
