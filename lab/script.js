// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const current = htmlElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== Typing Animation =====
const texts = [
    'Senior Software Engineer',
    'Backend Specialist',
    'Microservices Architect',
    'Go Developer',
    'System Designer',
    'Tech Lead'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function type() {
    const typingElement = document.querySelector('.typing-text');
    const currentText = texts[textIndex];

    if (!isDeleting && charIndex <= currentText.length) {
        typingElement.textContent = currentText.substring(0, charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex >= 0) {
        typingElement.textContent = currentText.substring(0, charIndex);
        charIndex--;
        setTimeout(type, deletingSpeed);
    } else if (!isDeleting && charIndex === currentText.length + 1) {
        isDeleting = true;
        setTimeout(type, pauseTime);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    }
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Smooth Scroll & Active Nav Link =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

function animateCounters() {
    if (counterAnimated) return;

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCounter();
    });

    counterAnimated = true;
}

// ===== Skill Progress Bars Animation =====
const skillBars = document.querySelectorAll('.progress-bar');
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) return;

    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });

    skillsAnimated = true;
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');

            // Trigger specific animations
            if (entry.target.id === 'about' || entry.target.closest('#about')) {
                animateCounters();
            }

            if (entry.target.id === 'skills' || entry.target.closest('#skills')) {
                animateSkills();
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .stat-card, .project-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// ===== Scroll to Top Button =====
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// ===== Add fade-in animation CSS class dynamically =====
const style = document.createElement('style');
style.textContent = `
    section, .stat-card, .project-card, .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    section.fade-in, .stat-card.fade-in, .project-card.fade-in, .timeline-item.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ===== Parallax Effect on Scroll =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== Copy Email to Clipboard =====
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.getAttribute('href').replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            // Show tooltip or notification
            const originalText = link.textContent;
            link.textContent = 'Email copied!';
            setTimeout(() => {
                link.textContent = originalText;
            }, 2000);
        });
    });
});

// ===== Add easter egg - Konami Code =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ===== Performance Optimization =====
// Lazy load images if any
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Preloader (optional) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== Console Message =====
console.log('%c👋 Hello Developer!', 'color: #2E9EF7; font-size: 24px; font-weight: bold;');
console.log('%cInterested in the code? Check out the repo:', 'color: #4A5568; font-size: 14px;');
console.log('%chttps://github.com/arslan77/arslan77.github.io', 'color: #2E9EF7; font-size: 14px;');
console.log('%c\nBuilt with ❤️ by Arslan Arshad', 'color: #FF6B6B; font-size: 12px;');

// ===== Analytics (placeholder) =====
// Add your analytics code here (Google Analytics, etc.)

// ===== Service Worker Registration (for PWA) =====
if ('serviceWorker' in navigator) {
    // Uncomment when you add a service worker
    // navigator.serviceWorker.register('/sw.js').then(registration => {
    //     console.log('SW registered:', registration);
    // }).catch(error => {
    //     console.log('SW registration failed:', error);
    // });
}

// ===== Export functions for potential use =====
window.portfolioFunctions = {
    scrollToTop,
    updateThemeIcon,
    animateCounters,
    animateSkills
};
