// Project data - links to your astrophysics simulation folders
const projectData = {
    1: {
        title: "Blackbody Curves",
        folder: "Blackbody curves",
        path: "Blackbody curves/index.html",
        description: "Simulation of blackbody radiation curves for different temperatures, showing Wien's Law and Planck's Law.",
        technologies: ["Thermodynamics", "Radiation", "Quantum Physics"],
        color: "#ff6a00",
        category: "radiation"
    },
    2: {
        title: "Galaxy Rotation Curves",
        folder: "Galaxy rotation curves",
        path: "Galaxy rotation curves/index.html",
        description: "Visualization of galaxy rotation curves showing dark matter effects and orbital velocities.",
        technologies: ["Dark Matter", "Orbital Dynamics", "Galactic Physics"],
        color: "#ffaa00",
        category: "galactic"
    },
    3: {
        title: "Kepler's Law",
        folder: "Kepler's Law",
        path: "Kepler's Law/index.html",
        description: "Interactive simulation demonstrating Kepler's three laws of planetary motion.",
        technologies: ["Orbital Mechanics", "Celestial Dynamics", "Mathematics"],
        color: "#ff8800",
        category: "orbital"
    },
    4: {
        title: "N Body Gravity",
        folder: "N Body Gravity",
        path: "N Body Gravity/index.html",
        description: "N-body gravitational simulation of multiple celestial bodies interacting through gravity.",
        technologies: ["Gravitational Physics", "Numerical Simulation", "Chaos Theory"],
        color: "#ff5500",
        category: "dynamics"
    },
    5: {
        title: "Radial Velocity Curve",
        folder: "Radial Velocity Curve",
        path: "Radial Velocity Curve/index.html",
        description: "Simulation of radial velocity curves for detecting exoplanets via Doppler spectroscopy.",
        technologies: ["Exoplanets", "Doppler Effect", "Spectroscopy"],
        color: "#ff9900",
        category: "exoplanets"
    },
    6: {
        title: "Stellar Evolution Tracks",
        folder: "Stellar evolution tracks",
        path: "Stellar evolution tracks/index.html",
        description: "Evolutionary tracks of stars on the HR diagram from protostar to stellar remnant.",
        technologies: ["Stellar Physics", "Nuclear Fusion", "HR Diagram"],
        color: "#ff7700",
        category: "stellar"
    },
    7: {
        title: "Supernova Light Curves",
        folder: "Supernova light curves",
        path: "Supernova light curves/index.html",
        description: "Light curves of different supernova types showing luminosity evolution over time.",
        technologies: ["Supernovae", "Explosive Astrophysics", "Transient Events"],
        color: "#ff4400",
        category: "transient"
    },
    8: {
        title: "Black Hole Sonification",
        folder: "Bick Hole Sonification",
        path: "Blck Hole Sonification/index.html",
        description: "Sonification of black hole mergers and gravitational wave data from LIGO.",
        technologies: ["Gravitational Waves", "Sonification", "Black Holes"],
        color: "#ffcc00",
        category: "sonification"
    },
    9: {
        title: "Gravitational Lensing",
        folder: "Gravitational Lensing",
        path: "Gravitational Lensing/index.html",
        description: "Simulation of gravitational lensing effects around massive objects like black holes and galaxies.",
        technologies: ["General Relativity", "Optics", "Cosmology"],
        color: "#ff6600",
        category: "relativity"
    },
    10: {
        title: "Lagrange Points",
        folder: "Lagrange Points",
        path: "Lagrange Points/index.html",
        description: "Visualization of the five Lagrange points in a two-body gravitational system.",
        technologies: ["Orbital Mechanics", "Three-Body Problem", "Space Missions"],
        color: "#ff3300",
        category: "orbital"
    },
    11: {
        title: "Planetary Simulation Earth and Mars",
        folder: "Planetary Simulation Earth and Mars",
        path: "Planetery Simulation Earth and Mars/index.html",
        description: "Comparative planetary simulation showing orbital dynamics of Earth and Mars.",
        technologies: ["Planetary Science", "Orbital Dynamics", "Solar System"],
        color: "#ffaa33",
        category: "planetary"
    },
    12: {
        title: "Shock Fronts",
        folder: "Shock fronts",
        path: "Shock fronts/index.html",
        description: "Simulation of astrophysical shock fronts in supernova remnants and interstellar medium.",
        technologies: ["Fluid Dynamics", "Plasma Physics", "Interstellar Medium"],
        color: "#ff8833",
        category: "fluid"
    },
    13: {
        title: "Stellar Isochrones",
        folder: "Stellar isochrones",
        path: "Stellar isochrones/index.html",
        description: "Isochrones showing stellar populations of different ages on the HR diagram.",
        technologies: ["Stellar Populations", "Galactic Evolution", "Age Dating"],
        color: "#ff5533",
        category: "stellar"
    },
    14: {
        title: "Tidal Forces",
        folder: "Tidal Forces",
        path: "Tidal Forces/index.html",
        description: "Visualization of tidal forces between celestial bodies and their effects.",
        technologies: ["Tidal Physics", "Roche Limit", "Gravitational Stress"],
        color: "#ff2233",
        category: "dynamics"
    },
    15: {
        title: "Eclipsing Binary Light Curves",
        folder: "Eclipsing binary light curves",
        path: "Eclipsing binary light curves/index.html",
        description: "Light curves of eclipsing binary star systems showing periodic dimming.",
        technologies: ["Binary Stars", "Light Curves", "Stellar Parameters"],
        color: "#ff0099",
        category: "binary"
    },
    16: {
        title: "Hertzsprung-Russell Diagram",
        folder: "Hertzsprung-Russell",
        path: "Hertzsprung–Russell/index.html",
        description: "Interactive HR diagram showing relationship between stellar luminosity and temperature.",
        technologies: ["Stellar Classification", "HR Diagram", "Stellar Evolution"],
        color: "#ff66aa",
        category: "stellar"
    },
    17: {
        title: "Moon Phase Simulation",
        folder: "MoonPhase",
        path: "MoonPhase/index.html",
        description: "Simulation of lunar phases and orbital mechanics from Earth's perspective.",
        technologies: ["Lunar Cycles", "Orbital Mechanics", "Celestial Geometry"],
        color: "#ff33cc",
        category: "lunar"
    },
    18: {
        title: "Precession",
        folder: "Precession",
        path: "Precession/index.html",
        description: "Simulation of astronomical precession including Earth's axial precession.",
        technologies: ["Rotational Dynamics", "Axial Tilt", "Milankovitch Cycles"],
        color: "#ff00ff",
        category: "rotational"
    },
    19: {
        title: "Sonification",
        folder: "Sonification",
        path: "Sonification/index.html",
        description: "General sonification of various astrophysical phenomena and datasets.",
        technologies: ["Data Sonification", "Auditory Display", "Science Communication"],
        color: "#cc00ff",
        category: "sonification"
    },
    20: {
        title: "Stellar Spectra",
        folder: "Stellar spectra",
        path: "Stellar spectra/index.html",
        description: "Simulation and analysis of stellar spectra showing absorption and emission lines.",
        technologies: ["Spectroscopy", "Atomic Physics", "Stellar Composition"],
        color: "#aa00ff",
        category: "spectroscopy"
    },
    21: {
        title: "Transit Light Curve",
        folder: "Transit Light Curve",
        path: "Transit Light Curve/index.html",
        description: "Light curves of exoplanet transits showing periodic dimming of host stars.",
        technologies: ["Exoplanets", "Transit Method", "Photometry"],
        color: "#8800ff",
        category: "exoplanets"
    }
};

// Project icons mapping for HTML generation
const projectIcons = {
    1: "fas fa-thermometer-full",
    2: "fas fa-galaxy",
    3: "fas fa-satellite",
    4: "fas fa-globe-americas",
    5: "fas fa-wave-square",
    6: "fas fa-star",
    7: "fas fa-fire",
    8: "fas fa-black-hole",
    9: "fas fa-eye",
    10: "fas fa-bullseye",
    11: "fas fa-globe",
    12: "fas fa-explosion",
    13: "fas fa-chart-line",
    14: "fas fa-water",
    15: "fas fa-sun",
    16: "fas fa-chart-scatter",
    17: "fas fa-moon",
    18: "fas fa-sync-alt",
    19: "fas fa-music",
    20: "fas fa-chart-bar",
    21: "fas fa-satellite-dish"
};

// Specific tags for each project
const projectTags = {
    1: ["Radiation", "Quantum"],
    2: ["Dark Matter", "Rotation"],
    3: ["Orbital Mechanics"],
    4: ["N-body", "Chaotic"],
    5: ["Exoplanets", "Doppler"],
    6: ["HR Diagram"],
    7: ["Light Curve"],
    8: ["Gravitational Waves", "Audio"],
    9: ["General Relativity"],
    10: ["Three-Body","Lagrangian"],
    11: ["Solar System", "Orbits"],
    12: ["Fluid Dynamics"],
    13: ["Stellar Populations"],
    14: ["Tidal Forces", "Roche Limit"],
    15: ["Eclipses", "Photometry"],
    16: ["HR Diagram"],
    17: ["Lunar", "Phases", "Cycles"],
    18: ["Precession","Milankovitch"],
    19: ["Sonification"],
    20: ["Spectroscopy"],
    21: ["Exoplanets", "Transits"]
};

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

// Create loading overlay
function createLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-content">
            <i class="fas fa-rocket loading-icon"></i>
            <h2>Launching Simulation...</h2>
            <p>Initializing cosmic parameters</p>
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
                        <i class="${projectIcons[projectId]}"></i>
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
                        Launch Simulation
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

// Launch project
async function launchProject(projectId) {
    const project = projectData[projectId];
    if (!project) {
        alert('Simulation not found!');
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
                    <h2>Simulation Not Found</h2>
                    <p>The simulation folder "${project.folder}" doesn't exist or is empty.</p>
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
    
    // Generate project cards in HTML
    const projectsGrid = document.getElementById('projectsGrid');
    
    for (let i = 1; i <= 21; i++) {
        const project = projectData[i];
        if (!project) continue;
        
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-project', i);
        
        // Get specific tags for this project
        const tags = projectTags[i] || ["Astrophysics", "Simulation"];
        
        // Get specific stats based on project category
        let icon1, label1, icon2, label2;
        
        switch(project.category) {
            case 'radiation':
            case 'spectroscopy':
                icon1 = "fas fa-chart-line";
                label1 = "Data Analysis";
                icon2 = "fas fa-eye";
                label2 = "Observational";
                break;
            case 'dynamics':
            case 'orbital':
                icon1 = "fas fa-project-diagram";
                label1 = "Dynamics";
                icon2 = "fas fa-globe";
                label2 = "Orbital";
                break;
            case 'stellar':
            case 'binary':
                icon1 = "fas fa-star";
                label1 = "Stellar";
                icon2 = "fas fa-fire";
                label2 = "Nuclear";
                break;
            case 'galactic':
                icon1 = "fas fa-galaxy";
                label1 = "Galactic";
                icon2 = "fas fa-chart-scatter";
                label2 = "Large Scale";
                break;
            case 'exoplanets':
                icon1 = "fas fa-search";
                label1 = "Detection";
                icon2 = "fas fa-globe-americas";
                label2 = "Exoplanets";
                break;
            case 'relativity':
                icon1 = "fas fa-atom";
                label1 = "Relativity";
                icon2 = "fas fa-eye";
                label2 = "Gravitational";
                break;
            case 'planetary':
            case 'lunar':
                icon1 = "fas fa-globe";
                label1 = "Planetary";
                icon2 = "fas fa-satellite";
                label2 = "Orbital";
                break;
            case 'fluid':
                icon1 = "fas fa-water";
                label1 = "Fluid";
                icon2 = "fas fa-fire";
                label2 = "Plasma";
                break;
            case 'sonification':
                icon1 = "fas fa-music";
                label1 = "Audio";
                icon2 = "fas fa-waveform";
                label2 = "Data";
                break;
            case 'transient':
                icon1 = "fas fa-bolt";
                label1 = "Transient";
                icon2 = "fas fa-chart-line";
                label2 = "Light Curve";
                break;
            case 'rotational':
                icon1 = "fas fa-sync-alt";
                label1 = "Rotational";
                icon2 = "fas fa-compass";
                label2 = "Dynamics";
                break;
            default:
                icon1 = "fas fa-calculator";
                label1 = "Numerical";
                icon2 = "fas fa-atom";
                label2 = "Physics";
        }
        
        projectCard.innerHTML = `
            <div class="project-header">
                <div class="project-icon">
                    <i class="${projectIcons[i]}"></i>
                </div>
                <div class="project-tags">
                    ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-stats">
                <div class="project-stat">
                    <i class="${icon1}"></i>
                    <span>${label1}</span>
                </div>
                <div class="project-stat">
                    <i class="${icon2}"></i>
                    <span>${label2}</span>
                </div>
            </div>
            <div class="project-cta">
                <span>Launch Simulation</span>
                <i class="fas fa-rocket"></i>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    }
    
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
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Number keys 1-9 to launch projects
        if (e.key >= '1' && e.key <= '9') {
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
    if (projectCount && projectCount.textContent === '21') {
        let count = 0;
        const interval = setInterval(() => {
            count++;
            projectCount.textContent = count;
            if (count >= 21) {
                clearInterval(interval);
            }
        }, 50);
    }
});