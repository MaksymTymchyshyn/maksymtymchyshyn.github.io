// Theme Switcher
const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme');

// Set theme on load
if (currentTheme) {
    document.body.classList.add(currentTheme);
    if (currentTheme === 'light-theme') {
        toggleSwitch.checked = true;
        const uconnLogo = document.querySelector('.education-logo');
        if (uconnLogo) {
            uconnLogo.src = 'assets/uconn_logo_lightMode.png';
        }
    }
}

// Theme switch event
toggleSwitch.addEventListener('change', function() {
    const uconnLogo = document.querySelector('.education-logo');
    if (this.checked) {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
        if (uconnLogo) {
            uconnLogo.src = 'assets/uconn_logo_lightMode.png';
        }
    } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark-theme');
        if (uconnLogo) {
            uconnLogo.src = 'assets/uconn_logo.png';
        }
    }
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#contact') {
                const offset = 10;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset + offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animations
const animateOnScroll = document.querySelectorAll('.skill-card, .project-card, .contact-card, .about-content, .education-card, .experience-item');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Active navigation link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Create falling stars with static starfield
const createStars = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    
    // Create 20 falling stars
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        starsContainer.appendChild(star);
    }
    
    // Create 20 static stars that stay at the top
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star static';
        starsContainer.appendChild(star);
    }
    
    hero.insertBefore(starsContainer, hero.firstChild);
};

// Initialize stars
createStars();

// Add hover effects to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Skill cards interaction
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth reveal for section headers
const sectionHeaders = document.querySelectorAll('.section-header');
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    header.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    headerObserver.observe(header);
});

// Add click ripple effect
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Copy email functionality
function copyEmail(event) {
    event.stopPropagation();
    const email = 'timchishinmaksim@gmail.com';
    const copyMessage = document.getElementById('copy-message');
    
    navigator.clipboard.writeText(email).then(() => {
        // Show the copied message
        copyMessage.classList.add('show');
        
        // Hide after 2 seconds
        setTimeout(() => {
            copyMessage.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email:', err);
    });
}

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_2hik881';
const EMAILJS_TEMPLATE_ID = 'template_1jngt5g';
const EMAILJS_PUBLIC_KEY = '8drX6gA4zf3LYDg5V';

emailjs.init(EMAILJS_PUBLIC_KEY);

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
            .then(function() {
                formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            }, function() {
                formStatus.textContent = 'Failed to send message. Please try again or email me directly.';
                formStatus.className = 'form-status error';
            })
            .finally(function() {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                setTimeout(() => formStatus.style.display = 'none', 5000);
            });
    });
}
