document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const timerElement = document.getElementById('timer');
    let timeLeft = 10;
    
    // Update timer every second
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
    
    // Hide loader after 10 seconds
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // Reset body overflow after loader disappears
        document.body.style.overflow = 'auto';
        
        // Start observing sections for scroll animations
        observeSections();
    }, 10000);
    
    // Prevent scrolling while loader is visible
    document.body.style.overflow = 'hidden';
    
    // Scroll animation function with reset capability
    function observeSections() {
        // Get all section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        
        // Track which sections have been animated
        let animatedSections = new Set();
        
        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const section = entry.target;
                
                // When section comes INTO view
                if (entry.isIntersecting) {
                    // Add visible class to trigger animation
                    section.classList.add('visible');
                    animatedSections.add(section);
                } 
                // When section goes OUT OF view (scrolling up)
                else {
                    // Remove visible class to reset animation
                    section.classList.remove('visible');
                    animatedSections.delete(section);
                }
            });
        }, {
            threshold: 0.3, // Trigger when 30% of element is visible
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Start observing each section title
        sectionTitles.forEach(title => {
            observer.observe(title);
        });
    }
});