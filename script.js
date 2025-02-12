// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.main-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = window.pageYOffset / windowHeight;
    scrollProgress.style.transform = `scaleX(${progress})`;
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.fade-up');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Testimonials Carousel
class TestimonialsCarousel {
    constructor() {
        this.slider = document.querySelector('.testimonials-slider');
        this.slides = document.querySelectorAll('.testimonial-card');
        this.dotsContainer = document.querySelector('.slider-dots');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Create dots
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        
        this.dots = this.dotsContainer.querySelectorAll('.slider-dot');
        this.showSlide(0);
        this.startAutoPlay();
        
        // Pause autoplay on hover
        this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        this.currentSlide = index;
    }
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// Initialize Testimonials Carousel
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsCarousel();
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Form Validation and Animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const formData = new FormData(contactForm);
        let isValid = true;
        
        formData.forEach((value, key) => {
            if (!value) {
                isValid = false;
                const input = contactForm.querySelector(`[name="${key}"]`);
                input.classList.add('error');
            }
        });
        
        if (isValid) {
            // Add success animation
            contactForm.classList.add('success');
            setTimeout(() => {
                contactForm.classList.remove('success');
                contactForm.reset();
            }, 3000);
        }
    });
}

// Parallax Effect
const parallaxElements = document.querySelectorAll('.parallax');

window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        element.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');
const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            stat.textContent = Math.floor(current);
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            }
        }, 30);
    });
};

// Initialize stats animation when in viewport
const observeStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observeStats.unobserve(entry.target);
        }
    });
});

stats.forEach(stat => observeStats.observe(stat));

// Create scattered Tamil letters
function createScatteredLetters() {
    const tamilLetters = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ', 
                         'க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 
                         'ல', 'வ', 'ழ', 'ள', 'ற', 'ன'];
    
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        // Create 15 scattered letters per section
        for (let i = 0; i < 15; i++) {
            const letter = document.createElement('span');
            letter.className = 'scattered-letter';
            letter.textContent = tamilLetters[Math.floor(Math.random() * tamilLetters.length)];
            
            // Random positioning
            letter.style.left = Math.random() * 100 + '%';
            letter.style.top = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * (4 - 1) + 1;
            letter.style.fontSize = size + 'rem';
            
            // Random rotation
            const rotation = Math.random() * 360;
            letter.style.transform = `rotate(${rotation}deg)`;
            
            // Random animation delay
            letter.style.animationDelay = Math.random() * 5 + 's';
            
            section.appendChild(letter);
        }
    });
}

// Add floating animation
const floatKeyframes = `
@keyframes float {
    0% {
        transform: translate(0, 0) rotate(0deg);
    }
    33% {
        transform: translate(10px, -10px) rotate(10deg);
    }
    66% {
        transform: translate(-10px, 10px) rotate(-10deg);
    }
    100% {
        transform: translate(0, 0) rotate(0deg);
    }
}`;

// Add keyframes to document
const styleSheet = document.createElement('style');
styleSheet.textContent = floatKeyframes;
document.head.appendChild(styleSheet);

// Initialize scattered letters on page load
document.addEventListener('DOMContentLoaded', createScatteredLetters); 