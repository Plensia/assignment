document.addEventListener('DOMContentLoaded', function() {
    // Requirement: Use DOM manipulation to show/hide project details
    const toggleButtons = document.querySelectorAll('.toggle-details');
    
    toggleButtons.forEach(button => {
        const projectId = button.getAttribute('data-project');
        const projectCard = button.closest('.project-card');
        const projectDetails = projectCard.querySelector('.project-details');
        
        // Ensure button is keyboard accessible
        button.setAttribute('tabindex', '0');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', `project-details-${projectId}`);
        
        if (projectDetails) {
            projectDetails.id = `project-details-${projectId}`;
            projectDetails.setAttribute('aria-hidden', 'true');
        }
        
        // Requirement: Add event listener for button clicks
        button.addEventListener('click', function() {
            // Toggle details visibility
            const isVisible = projectDetails.style.display === 'block';
            
            // Close all other project details
            document.querySelectorAll('.project-details').forEach(details => {
                details.style.display = 'none';
                details.setAttribute('aria-hidden', 'true');
                
                // Find the corresponding button and update its text and aria attributes
                const btn = document.querySelector(`[aria-controls="${details.id}"]`);
                if (btn) {
                    btn.textContent = 'Show Details';
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
            
            if (!isVisible) {
                // Show this project's details
                projectDetails.style.display = 'block';
                projectDetails.setAttribute('aria-hidden', 'false');
                button.textContent = 'Hide Details';
                button.setAttribute('aria-expanded', 'true');
                
                // Smooth scroll to the project if not in view
                const cardRect = projectCard.getBoundingClientRect();
                if (cardRect.bottom > window.innerHeight || cardRect.top < 0) {
                    projectCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                // Add animation
                projectDetails.classList.add('animate-fadeIn');
            }
        });
        
        // Make button keyboard accessible
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Image hover effect
    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add project cards animation on scroll
    const projectCards = document.querySelectorAll('.project-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slideUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        observer.observe(card);
    });
});