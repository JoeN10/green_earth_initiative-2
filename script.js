// script.js - Enhanced functionality for Green Earth Initiative

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Accordion Functionality
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            //  active class on button
            this.classList.toggle('active');
            
            // active class on content
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.classList.remove('active');
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add('active');
            }
            
            // Close other accordion items
            accordionButtons.forEach(otherButton => {
                if (otherButton !== this) {
                    otherButton.classList.remove('active');
                    const otherContent = otherButton.nextElementSibling;
                    otherContent.style.maxHeight = null;
                    otherContent.classList.remove('active');
                }
            });
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Image lazy loading enhancement
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add some animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.activity-card, .mission, .vision');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initial check and add scroll event listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

// Form Validation Functions (for contact and enquiry forms)
function validateForm(form) {
    let isValid = true;
    const errors = [];
    
    // Name validation
    const name = form.querySelector('input[name="name"]');
    if (name && !name.value.trim()) {
        isValid = false;
        showError(name, 'Please enter your name');
        errors.push('Name is required');
    } else if (name) {
        clearError(name);
    }
    
    // Email validation
    const email = form.querySelector('input[name="email"]');
    if (email && !email.value.trim()) {
        isValid = false;
        showError(email, 'Please enter your email address');
        errors.push('Email is required');
    } else if (email && !isValidEmail(email.value)) {
        isValid = false;
        showError(email, 'Please enter a valid email address');
        errors.push('Valid email is required');
    } else if (email) {
        clearError(email);
    }
    
    // Message validation
    const message = form.querySelector('textarea[name="message"]');
    if (message && !message.value.trim()) {
        isValid = false;
        showError(message, 'Please enter your message');
        errors.push('Message is required');
    } else if (message) {
        clearError(message);
    }
    
    return { isValid, errors };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(field, message) {
    clearError(field);
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

function clearError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}