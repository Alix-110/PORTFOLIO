// Create stars for background
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 200;
    
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

// Project data - links to your existing project folders
const projectData = {
    1: {
        title: "Black Holes",
        folder: "Black Holes",
        path: "Black Holes/index.html",
        description: "",
        technologies: ["JavaScript"],
        color: "#ff6a00"
    },
    2: {
        title: "Dark Matter",
        folder: "Dark Matter", 
        path: "Dark Matter/index.html",
        description: "",
        technologies: ["Javascript", "Simulation", "NASA"],
        color: "#ffaa00"
    },
    3: {
        title: "Fibonacci in Nature & the Golden Ratio",
        folder: "Fibonacci in Nature & the Golden Ratio",
        path: "Fibonacci in Nature & the Golden Ratio/index.html",
        description: "Exploration",
        technologies: ["JavaScript"],
        color: "#ff8800"
    },
    4: {
        title: "Pi-Everywhere",
        folder: "Pi-Everywhere",
        path: "Pi-Everywhere/index.html",
        description: "Discover why π appears everywhere—from circles to galaxies",
        technologies: [ "Physics", "Simulation" , "Mathmetics"],
        color: "#ff5500"
    },
    5: {
        title: "Sonification",
        folder: "Sonification",
        path: "Sonification/index.html",
        description: "Transform astronomical data into meaningful sound.",
        technologies: ["JavaScript", "Real-time Data", "NASA"],
        color: "#ff9900"
    },
    6: {
        title: "The Golden Ratio & Universe Architecture  ",
        folder: "The Golden Ratio & Universe Architecture",
        path: "The Golden Ratio & Universe Architecture/index.html",
        description: "The Architecture of the Universe",
        technologies: ["Mathmetical Principles"],
        color: "#ff7700"
    },
    7: {
        title: "Time Dialation",
        folder: "Time Dialation",
        path: "Time Dialation/index.html",
        description: "How Speed and Gravity Affect Time",
        technologies: ["Mysterious Physics"],
        color: "#ff4400"
    },
    8: {
        title: "Worm Holes",
        folder: "Worm Holes",
        path: "Worm Holes/index.html",
        description: "Bridging the Distant Corners of the Universe",
        technologies: ["Space-Time Fabric", "Physics", "COSMIC Mystery"],
        color: "#ffcc00"
    }
};

// Create loading overlay
function createLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-content">
            <i class="fas fa-rocket loading-icon"></i>
            <h2>Launching Project...</h2>
            <p>Preparing cosmic experience</p>
        </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
}

// Check if project folder exists
async function checkProjectExists(projectPath) {
    try {
        const response = await fetch(projectPath, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Show project preview modal
function showProjectPreview(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${project.title}</h3>
                <button class="close-modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="project-preview">
                    <div class="preview-icon" style="color: ${project.color}">
                        <i class="fas fa-${getProjectIcon(projectId)}"></i>
                    </div>
                    <p class="preview-description">${project.description}</p>
                    <div class="preview-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="preview-path">
                        <i class="fas fa-folder"></i>
                        <span>Path: ${project.folder}/</span>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary close-preview">
                        <i class="fas fa-times"></i>
                        Cancel
                    </button>
                    <button class="btn-primary launch-project" data-project="${projectId}">
                        <i class="fas fa-rocket"></i>
                        Launch Project
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .project-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 14, 23, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            backdrop-filter: blur(10px);
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .modal-content {
            background: rgba(20, 25, 40, 0.95);
            border-radius: 20px;
            width: 90%;
            max-width: 500px;
            border: 2px solid rgba(255, 106, 0, 0.3);
            box-shadow: 0 25px 50px rgba(255, 106, 0, 0.2);
            overflow: hidden;
            animation: slideUp 0.4s ease;
        }
        
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 2rem;
            background: rgba(255, 106, 0, 0.1);
            border-bottom: 1px solid rgba(255, 106, 0, 0.2);
        }
        
        .modal-header h3 {
            font-size: 1.5rem;
            color: #ffaa00;
            font-family: 'Orbitron', sans-serif;
            margin: 0;
        }
        
        .close-modal {
            background: none;
            border: none;
            color: #ffaa00;
            font-size: 1.2rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .close-modal:hover {
            background: rgba(255, 106, 0, 0.2);
            transform: rotate(90deg);
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .project-preview {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .preview-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
            filter: drop-shadow(0 0 15px ${project.color}80);
        }
        
        .preview-description {
            color: #ccc;
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        
        .preview-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
            margin-bottom: 1.5rem;
        }
        
        .tech-tag {
            background: rgba(255, 106, 0, 0.1);
            color: #ffaa00;
            padding: 0.4rem 0.8rem;
            border-radius: 15px;
            font-size: 0.9rem;
            font-family: 'Orbitron', sans-serif;
            border: 1px solid rgba(255, 106, 0, 0.3);
        }
        
        .preview-path {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            color: #aaa;
            font-size: 0.9rem;
            background: rgba(255, 106, 0, 0.05);
            padding: 0.8rem;
            border-radius: 10px;
            border: 1px dashed rgba(255, 106, 0, 0.2);
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        
        .btn-primary, .btn-secondary {
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            font-family: 'Orbitron', sans-serif;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            border: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: linear-gradient(90deg, #ff6a00, #ff4400);
            color: white;
            box-shadow: 0 5px 15px rgba(255, 106, 0, 0.3);
        }
        
        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(255, 106, 0, 0.4);
        }
        
        .btn-secondary {
            background: rgba(255, 106, 0, 0.1);
            color: #ffaa00;
            border: 1px solid rgba(255, 106, 0, 0.3);
        }
        
        .btn-secondary:hover {
            background: rgba(255, 106, 0, 0.2);
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Close modal handlers
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    };
    
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.querySelector('.close-preview').addEventListener('click', closeModal);
    
    // Launch project handler
    modal.querySelector('.launch-project').addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        launchProject(projectId);
        closeModal();
    });
    
    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close with Escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Get project icon based on project ID
function getProjectIcon(projectId) {
    const icons = {
        1: 'sun',
        2: 'moon',
        3: 'star',
        4: 'satellite',
        5: 'meteor',
        6: 'galaxy',
        7: 'black-hole',
        8: 'cloud'
    };
    return icons[projectId] || 'rocket';
}

// Launch project
async function launchProject(projectId) {
    const project = projectData[projectId];
    if (!project) {
        alert('Project not found!');
        return;
    }
    
    const loadingOverlay = createLoadingOverlay();
    loadingOverlay.classList.add('active');
    
    // Check if project exists
    const projectExists = await checkProjectExists(project.path);
    
    // Simulate loading time
    setTimeout(async () => {
        if (projectExists) {
            // Navigate to project
            window.location.href = project.path;
        } else {
            // Show error
            loadingOverlay.innerHTML = `
                <div class="loading-content">
                    <i class="fas fa-exclamation-triangle" style="color: #ff4444"></i>
                    <h2>Project Not Found</h2>
                    <p>The project folder "${project.folder}" doesn't exist or is empty.</p>
                    <p style="font-size: 0.9rem; color: #aaa; margin-top: 1rem;">
                        Expected path: <code>${project.path}</code>
                    </p>
                    <button class="btn-secondary" style="margin-top: 2rem;">
                        <i class="fas fa-arrow-left"></i>
                        Go Back
                    </button>
                </div>
            `;
            
            // Add error button handler
            loadingOverlay.querySelector('.btn-secondary').addEventListener('click', function() {
                loadingOverlay.classList.remove('active');
                setTimeout(() => {
                    if (loadingOverlay.parentNode) {
                        loadingOverlay.parentNode.removeChild(loadingOverlay);
                    }
                }, 300);
            });
        }
    }, 1500);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Create star background
    createStars();
    
    // Create loading overlay
    const loadingOverlay = createLoadingOverlay();
    
    // Add click handlers to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            showProjectPreview(projectId);
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const projectId = this.getAttribute('data-project');
                showProjectPreview(projectId);
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });
    
    // Add animation to stats on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add special animation for stats
                if (entry.target.classList.contains('stat')) {
                    entry.target.style.animationDelay = Math.random() * 0.5 + 's';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const stats = document.querySelectorAll('.stat, .tech-card, .research-stat');
    stats.forEach(stat => observer.observe(stat));
    
    // Add hover sound effect (optional)
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 106, 0, 0.1)';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.transition = 'width 0.6s, height 0.6s, opacity 0.6s';
            
            this.appendChild(ripple);
            
            // Animate ripple
            setTimeout(() => {
                ripple.style.width = '200px';
                ripple.style.height = '200px';
                ripple.style.opacity = '0';
            }, 10);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Add typing effect to subtitle
    const subtitle = document.querySelector('.subtitle span');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let charIndex = 0;
        function typeText() {
            if (charIndex < text.length) {
                subtitle.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 50);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeText, 1000);
    }
    
    // Add constellation effect to project cards
    projectCards.forEach((card, index) => {
        // Add delay for staggered animation
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // Animate in
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
    
    // Add background music toggle (optional)
    const musicToggle = document.createElement('button');
    musicToggle.className = 'music-toggle';
    musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    musicToggle.style.position = 'fixed';
    musicToggle.style.bottom = '20px';
    musicToggle.style.right = '20px';
    musicToggle.style.width = '50px';
    musicToggle.style.height = '50px';
    musicToggle.style.borderRadius = '50%';
    musicToggle.style.background = 'rgba(255, 106, 0, 0.2)';
    musicToggle.style.border = '1px solid rgba(255, 106, 0, 0.3)';
    musicToggle.style.color = '#ffaa00';
    musicToggle.style.cursor = 'pointer';
    musicToggle.style.zIndex = '100';
    musicToggle.style.display = 'flex';
    musicToggle.style.alignItems = 'center';
    musicToggle.style.justifyContent = 'center';
    musicToggle.style.fontSize = '1.2rem';
    musicToggle.style.transition = 'all 0.3s ease';
    
    musicToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 0 20px rgba(255, 106, 0, 0.3)';
    });
    
    musicToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
    
    // Uncomment to add music toggle
    // document.body.appendChild(musicToggle);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Number keys 1-8 to launch projects
        if (e.key >= '1' && e.key <= '8') {
            const projectId = parseInt(e.key);
            if (projectData[projectId]) {
                showProjectPreview(projectId);
            }
        }
        
        // Escape to close any open modals
        if (e.key === 'Escape') {
            const modal = document.querySelector('.project-modal');
            if (modal) {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.parentNode.removeChild(modal);
                    }
                }, 300);
            }
            
            // Also close loading overlay
            if (loadingOverlay.classList.contains('active')) {
                loadingOverlay.classList.remove('active');
            }
        }
    });
    
    // Add project counter animation
    const projectCount = document.querySelector('.stat-value:first-child');
    if (projectCount && projectCount.textContent === '8') {
        let count = 0;
        const interval = setInterval(() => {
            count++;
            projectCount.textContent = count;
            if (count >= 8) {
                clearInterval(interval);
            }
        }, 100);
    }
});