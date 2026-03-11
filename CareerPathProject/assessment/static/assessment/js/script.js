// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate elements on scroll
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

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .personality-card, .testimonial-card, .step, .pricing-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Filter functionality for resources page
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Add filter logic here based on your needs
        console.log('Filter:', button.textContent);
    });
});

// Mobile menu toggle (if needed)
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-links');
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '☰';
    menuBtn.style.display = 'none';
    
    if (window.innerWidth <= 768) {
        menuBtn.style.display = 'block';
        document.querySelector('.nav-container').insertBefore(
            menuBtn, 
            document.querySelector('.btn-primary')
        );
    }
    
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('mobile-active');
    });
};

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with ${email}!`);
        newsletterForm.reset();
    });
}

// Search functionality
const searchBar = document.querySelector('.search-bar');
if (searchBar) {
    const searchBtn = searchBar.querySelector('.search-btn');
    const searchInput = searchBar.querySelector('input');
    
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value;
        if (query) {
            console.log('Searching for:', query);
            // Add search logic here
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// Trait bar animations on profile page
const animateTraitBars = () => {
    const traitBars = document.querySelectorAll('.bar-fill');
    traitBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

if (document.querySelector('.traits-breakdown')) {
    window.addEventListener('load', animateTraitBars);
}

// Progress bar animations
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

if (document.querySelector('.growth-goals')) {
    window.addEventListener('load', animateProgressBars);
}

// Chart bar animations
const animateChartBars = () => {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        const height = bar.style.height;
        bar.style.height = '0';
        setTimeout(() => {
            bar.style.height = height;
        }, 100 * index);
    });
};

if (document.querySelector('.chart-bars')) {
    window.addEventListener('load', animateChartBars);
}

// Floating cards animation enhancement
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 1.5}s`;
});

// Add hover effect to personality cards
document.querySelectorAll('.personality-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Pricing card selection
document.querySelectorAll('.pricing-card button').forEach(button => {
    button.addEventListener('click', function() {
        const planName = this.closest('.pricing-card').querySelector('h3').textContent;
        console.log('Selected plan:', planName);
        // Add plan selection logic here
    });
});

// Video card play button
document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', function() {
        const videoTitle = this.querySelector('h4').textContent;
        console.log('Playing video:', videoTitle);
        // Add video play logic here
    });
});

// Tool card interactions
document.querySelectorAll('.tool-card button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const toolName = this.closest('.tool-card').querySelector('h3').textContent;
        console.log('Opening tool:', toolName);
        // Add tool opening logic here
    });
});

// Initialize on page load
window.addEventListener('load', () => {
    console.log('PersonalityPro app loaded successfully!');
});
