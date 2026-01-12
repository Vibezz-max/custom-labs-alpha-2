// script.js
document.addEventListener('DOMContentLoaded', function() {
    const morphHeader = document.getElementById('morphHeader');
    const heroContainer = document.getElementById('heroContainer');
    const scrollIndicator = document.getElementById('scrollIndicator');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const customizeBtn = document.getElementById('customizeBtn');
    const contactForm = document.getElementById('contactForm');
    const sections = document.querySelectorAll('.section');
    const navLinkElements = document.querySelectorAll('.nav-link');
    
    // Morph Header on Scroll
    function handleScroll() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollPercentage = Math.min(scrollPosition / windowHeight, 1);
        
        // Morph effect when scrolled past 50px
        if (scrollPosition > 50) {
            morphHeader.classList.add('morphed');
            
            // Smooth fade out of hero content
            heroContainer.style.opacity = 1 - (scrollPercentage * 2);
            scrollIndicator.style.opacity = 1 - (scrollPercentage * 3);
        } else {
            morphHeader.classList.remove('morphed');
            heroContainer.style.opacity = 1;
            scrollIndicator.style.opacity = 1;
        }
        
        // Update active nav link
        updateActiveNavLink();
        
        // Trigger section animations
        triggerSectionAnimations();
    }
    
    // Update active navigation link
    function updateActiveNavLink() {
        let current = '';
        const headerHeight = morphHeader.classList.contains('morphed') ? 80 : 0;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkElements.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Trigger section animations when in view
    function triggerSectionAnimations() {
        const triggerBottom = window.innerHeight * 0.8;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            }
        });
    }
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    navLinkElements.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Auto-scroll to products section
    customizeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const productsSection = document.getElementById('products');
        const headerHeight = morphHeader.classList.contains('morphed') ? 80 : 0;
        
        window.scrollTo({
            top: productsSection.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // In a real app, you would send this data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you! Your message has been sent. We\'ll get back to you soon!');
            
            // Reset form
            this.reset();
        });
    }
    
    // Smooth scroll for nav links
    navLinkElements.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = morphHeader.classList.contains('morphed') ? 80 : 0;
                
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize
    window.addEventListener('scroll', handleScroll);
    triggerSectionAnimations(); // Check on load
    
    // Trigger initial animations for sections in view
    setTimeout(() => {
        triggerSectionAnimations();
    }, 100);
});