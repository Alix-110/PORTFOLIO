// Create stars for background - EXACT SAME
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

// Expand/Collapse Functions
function expandSection(sectionType) {
    const briefSection = document.getElementById(`${sectionType}-brief`);
    const expandedSection = document.getElementById(`${sectionType}-expanded`);
    
    // Hide brief section
    briefSection.style.display = 'none';
    
    // Show expanded section with animation
    expandedSection.style.display = 'block';
    
    // Scroll to expanded section
    setTimeout(() => {
        expandedSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100);
}

function collapseSection(sectionType) {
    const briefSection = document.getElementById(`${sectionType}-brief`);
    const expandedSection = document.getElementById(`${sectionType}-expanded`);
    
    // Hide expanded section
    expandedSection.style.display = 'none';
    
    // Show brief section
    briefSection.style.display = 'block';
    
    // Scroll to brief section
    setTimeout(() => {
        briefSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100);
}

// Video Control Functions
function toggleVideoPlay() {
    const video = document.getElementById('basketballVideo');
    const overlay = document.querySelector('.video-overlay');
    const playIcon = document.getElementById('playIcon');
    
    if (video.paused) {
        video.play();
        playIcon.className = 'fas fa-pause';
        overlay.classList.add('hidden');
    } else {
        video.pause();
        playIcon.className = 'fas fa-play';
        overlay.classList.remove('hidden');
    }
}

function setupVideoControls() {
    const video = document.getElementById('basketballVideo');
    const overlay = document.querySelector('.video-overlay');
    const playIcon = document.getElementById('playIcon');
    
    if (!video) return;
    
    // When video ends, show overlay again
    video.addEventListener('ended', function() {
        overlay.classList.remove('hidden');
        playIcon.className = 'fas fa-play';
    });
    
    // When video is playing, hide overlay
    video.addEventListener('play', function() {
        overlay.classList.add('hidden');
        playIcon.className = 'fas fa-pause';
    });
    
    // When video is paused, show overlay
    video.addEventListener('pause', function() {
        overlay.classList.remove('hidden');
        playIcon.className = 'fas fa-play';
    });
    
    // Toggle play/pause when clicking on video (not overlay)
    video.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering overlay click
        toggleVideoPlay();
    });
    
    // Space bar to play/pause
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && document.querySelector('.video-player-wrapper:hover')) {
            e.preventDefault();
            toggleVideoPlay();
        }
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Create star background
    createStars();
    
    // Setup video controls
    setupVideoControls();
    
    // Add click handlers to brief sections
    const briefSections = document.querySelectorAll('.activity-section.brief');
    briefSections.forEach(section => {
        section.addEventListener('click', function(e) {
            // Only expand if not clicking on expand button
            if (!e.target.closest('.expand-button')) {
                const sectionType = this.id.replace('-brief', '');
                expandSection(sectionType);
            }
        });
    });
    
    // Add observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Special animations for different elements
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 200);
                }
                
                if (entry.target.classList.contains('skill-item') || 
                    entry.target.classList.contains('philosophy-card')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.9)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 200);
                }
                
                if (entry.target.classList.contains('journey-step')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 200);
                }
                
                if (entry.target.classList.contains('comparison-item')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(15px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .skill-item, .philosophy-card, .journey-step, .comparison-item, .detail-item'
    );
    animatedElements.forEach(element => observer.observe(element));
    
    // Add hover effects
    const interactiveCards = document.querySelectorAll(
        '.activity-section.brief, .skill-item, .philosophy-card, .comparison-item'
    );
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('activity-section')) {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 15px 30px rgba(255, 106, 0, 0.15)';
            } else {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(255, 106, 0, 0.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('activity-section')) {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 10px 25px rgba(255, 106, 0, 0.1)';
            } else {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            }
        });
    });
    
    // Add skill tag hover effects
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.textContent = this.textContent;
            tooltip.style.position = 'absolute';
            tooltip.style.bottom = '100%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.background = 'rgba(255, 106, 0, 0.9)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '6px 10px';
            tooltip.style.borderRadius = '5px';
            tooltip.style.fontSize = '0.8rem';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.zIndex = '100';
            tooltip.style.marginBottom = '8px';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.fontWeight = '500';
            
            this.appendChild(tooltip);
            
            // Remove tooltip after delay
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 1500);
        });
    });
    
    // Add loading animation to navigation links
    const navLinks = document.querySelectorAll('.nav-link, .back-button');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // Add statistics counter animation
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
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
    
    // Add scroll-to-top button
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
    
    // Add hover effect to scroll-to-top button
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.background = 'rgba(255, 106, 0, 0.3)';
        scrollToTopBtn.style.transform = 'translateY(-5px)';
        scrollToTopBtn.style.boxShadow = '0 5px 15px rgba(255, 106, 0, 0.2)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.background = 'rgba(255, 106, 0, 0.2)';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.background = 'rgba(255, 106, 0, 0.2)';
            scrollToTopBtn.style.transform = 'translateY(20px)';
        }
        scrollToTopBtn.style.boxShadow = 'none';
    });
    
    // Add CSS for tooltips
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
    
    console.log('Extracurricular page loaded successfully with single video.');
});