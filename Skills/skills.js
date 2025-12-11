// Create stars for background - EXACT SAME AS ACADEMICS
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size (1-3px)
        const size = Math.random() * 2 + 1;
        
        // Random twinkle delay
        const delay = Math.random() * 3;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Create star background
    createStars();
    
    // Animate skill level bars on scroll - SIMILAR TO ACADEMICS OBSERVER
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate level bars
                const levelFills = entry.target.querySelectorAll('.level-fill');
                levelFills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    
                    setTimeout(() => {
                        fill.style.transition = 'width 1.5s ease-out';
                        fill.style.width = width;
                    }, 200);
                });
                
                // Add animation class to timeline items
                if (entry.target.classList.contains('timeline-content')) {
                    entry.target.classList.add('animated');
                }
                
                // Add animation class to skill cards
                if (entry.target.classList.contains('skill-card')) {
                    entry.target.classList.add('animated');
                }
            }
        });
    }, observerOptions);
    
    // Observe all skill cards and timeline items
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => observer.observe(card));
    
    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach(item => observer.observe(item));
    
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => observer.observe(card));
    
    const admissionPoints = document.querySelectorAll('.admission-point');
    admissionPoints.forEach(point => observer.observe(point));
    
    // Add hover effects to all interactive elements - SIMILAR TO ACADEMICS
    const interactiveElements = document.querySelectorAll('.skill-card, .resource-card, .admission-point, .stat');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 30px rgba(255, 106, 0, 0.15)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(255, 106, 0, 0.1)';
        });
    });
    
    // Add tooltips for skill tags - SIMILAR TO PDF TOOLTIPS IN ACADEMICS
    const skillTags = document.querySelectorAll('.skill-tag, .project-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.textContent = this.textContent.replace(this.querySelector('i').textContent, '').trim();
            tooltip.style.position = 'absolute';
            tooltip.style.bottom = '100%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.background = 'rgba(255, 106, 0, 0.9)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '8px 12px';
            tooltip.style.borderRadius = '5px';
            tooltip.style.fontSize = '0.9rem';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.zIndex = '100';
            tooltip.style.marginBottom = '10px';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.fontWeight = '500';
            
            this.appendChild(tooltip);
            
            // Remove tooltip after delay
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 2000);
        });
    });
    
    // Add click effects to navigation links - SIMILAR TO ACADEMICS
    const navLinks = document.querySelectorAll('.nav-link, .back-button');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // If it's an external link, add loading animation
            if (this.getAttribute('href').includes('.html')) {
                e.preventDefault();
                
                // Add loading animation
                this.style.pointerEvents = 'none';
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                // Navigate after delay
                setTimeout(() => {
                    window.location.href = this.getAttribute('href');
                }, 800);
            }
        });
    });
    
    // Animate timeline items sequentially - NEW BUT MATCHING STYLE
    setTimeout(() => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }, 500);
    
    // Add year counter animation - SIMILAR TO CHART ANIMATIONS IN ACADEMICS
    const yearStats = document.querySelectorAll('.stat-value');
    yearStats.forEach(stat => {
        if (stat.textContent.includes('+')) {
            const targetValue = parseInt(stat.textContent);
            let currentValue = 0;
            const increment = targetValue / 30;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(currentValue) + '+';
            }, 50);
        }
    });
    
    // Add a scroll-to-top button - SIMILAR TO ACADEMICS INTERACTIVITY
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: rgba(255, 106, 0, 0.2);
        border: 1px solid rgba(255, 106, 0, 0.3);
        color: #ffaa00;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 100;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll-to-top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(20px)';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect to scroll-to-top button - MATCHING COLOR SCHEME
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.background = 'rgba(255, 106, 0, 0.3)';
        scrollToTopBtn.style.transform = 'translateY(-5px)';
        scrollToTopBtn.style.boxShadow = '0 5px 15px rgba(255, 106, 0, 0.2)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.background = 'rgba(255, 106, 0, 0.2)';
        scrollToTopBtn.style.transform = 'translateY(0)';
        scrollToTopBtn.style.boxShadow = 'none';
    });
    
    // Add CSS for tooltips - MATCHING ACADEMICS STYLE
    const tooltipStyle = document.createElement('style');
    tooltipStyle.textContent = `
        .skill-tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 5px;
            border-style: solid;
            border-color: rgba(255, 106, 0, 0.9) transparent transparent transparent;
        }
    `;
    document.head.appendChild(tooltipStyle);
    
    console.log('Skills page loaded successfully. Following exact academics page style.');
});