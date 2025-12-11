// Project data - links to your existing project folders
const projectData = {
    1: {
        title: "Algorithm Visualizer",
        folder: "Algorithm Visualizer",
        path: "Algorithm Visulizer/index.html",
        description: "Interactive tool to visualize how algorithms work step by step.",
        technologies: ["JavaScript", "Visualization"],
        color: "#ff6a00"
    },
    2: {
        title: "QR Code Generator",
        folder: "QR Code Generator",
        path: "QR Code Generator/index.html",
        description: "Create custom QR codes for websites, contacts, and more.",
        technologies: ["JavaScript", "Utility"],
        color: "#ffaa00"
    },
    3: {
        title: "Basketball Scoreboard",
        folder: "Basketball Scoreboard",
        path: "Basketball Scoreboard/index.html",
        description: "Live basketball score tracking with game statistics.",
        technologies: ["JavaScript", "Sports"],
        color: "#ff8800"
    },
    4: {
        title: "Quiz App",
        folder: "Quiz App",
        path: "Quiz App/index.html",
        description: "Interactive quiz application with multiple categories and scoring.",
        technologies: ["JavaScript", "Education"],
        color: "#ff5500"
    },
    5: {
        title: "Calculator",
        folder: "Calculator",
        path: "Calculator/index.html",
        description: "Advanced calculator with scientific functions and history.",
        technologies: ["JavaScript", "Tools"],
        color: "#ff9900"
    },
    6: {
        title: "Recipe Diary",
        folder: "Redpe Diary",
        path: "Recipe Diary/index.html",
        description: "Personal digital diary with encryption and search features.",
        technologies: ["JavaScript", "Productivity"],
        color: "#ff7700"
    },
    7: {
        title: "Data Visualizer",
        folder: "Data Visualizer",
        path: "Data Visulizer/index.html",
        description: "Transform data into interactive charts and graphs.",
        technologies: ["JavaScript", "Data"],
        color: "#ff4400"
    },
    8: {
        title: "Solar System",
        folder: "Solar System",
        path: "Solar System/index.html",
        description: "3D model of our solar system with planetary information.",
        technologies: ["JavaScript", "Science"],
        color: "#ffcc00"
    },
    9: {
        title: "Earthquake and Volcano",
        folder: "Earthquake and Volcano",
        path: "Earthquake and Volcano/index.html",
        description: "Real-time seismic activity and volcano monitoring.",
        technologies: ["JavaScript", "Science"],
        color: "#ff6600"
    },
    10: {
        title: "Text Encrypter",
        folder: "Text Encrypter",
        path: "Text Encrypter/index.html",
        description: "Encrypt and decrypt text messages with various algorithms.",
        technologies: ["JavaScript", "Security"],
        color: "#ff3300"
    },
    11: {
        title: "Finance Dashboard",
        folder: "Finance Dashboard",
        path: "Finance Dashboard/index.html",
        description: "Personal finance tracking and visualization tool.",
        technologies: ["JavaScript", "Finance"],
        color: "#ffaa33"
    },
    12: {
        title: "To-Do App",
        folder: "To-Do App",
        path: "To-Do App/index.html",
        description: "Task management with reminders and priority levels.",
        technologies: ["JavaScript", "Productivity"],
        color: "#ff8833"
    },
    13: {
        title: "Graph Generator",
        folder: "Graph Generator",
        path: "Graph Generator/index.html",
        description: "Create and customize mathematical graphs and plots.",
        technologies: ["JavaScript", "Mathematics"],
        color: "#ff5533"
    },
    14: {
        title: "Typing Speed Test",
        folder: "Typing Speed Test",
        path: "Typing Speed Test/index.html",
        description: "Test and improve your typing speed and accuracy.",
        technologies: ["JavaScript", "Education"],
        color: "#ff2233"
    },
    15: {
        title: "Music Reactor",
        folder: "Music Reactor",
        path: "Music Reactor/index.html",
        description: "Visual music player with reactive animations.",
        technologies: ["JavaScript", "Entertainment"],
        color: "#ff0099"
    },
    16: {
        title: "Unit Converter",
        folder: "Unit Converter",
        path: "Unit Converter/index.html",
        description: "Convert between different units of measurement.",
        technologies: ["JavaScript", "Tools"],
        color: "#ff66aa"
    },
    17: {
        title: "Neural Network Visualizer",
        folder: "Neural Network Visualizer",
        path: "Neural Network Visualizer/index.html",
        description: "Interactive visualization of neural network architectures.",
        technologies: ["JavaScript", "AI"],
        color: "#ff33cc"
    },
    18: {
        title: "Video Journal",
        folder: "Video Journal",
        path: "Video Journal/index.html",
        description: "Record and organize video diary entries.",
        technologies: ["JavaScript", "Productivity"],
        color: "#ff00ff"
    },
    19: {
        title: "Passport Photo Maker",
        folder: "Passport Photo Maker",
        path: "Passport Photo Maker/index.html",
        description: "Create properly sized passport photos from any image.",
        technologies: ["JavaScript", "Tools"],
        color: "#cc00ff"
    },
    20: {
        title: "Password Strength",
        folder: "Password Strength",
        path: "Password Strength/index.html",
        description: "Analyze and generate secure passwords.",
        technologies: ["JavaScript", "Security"],
        color: "#aa00ff"
    },
    21: {
        title: "PDF Viewer App",
        folder: "PDF Viewer App",
        path: "PDF Viewer App/index.html",
        description: "View, annotate and manage PDF documents. Username:Muhammad Ali Imran | Password:*245006",
        technologies: ["JavaScript", "Tools"],
        color: "#8800ff"
    },
    22: {
        title: "Perodic Table",
        folder: "Perodic Table",
        path: "Perodic Table/index.html",
        description: "Interactive periodic table with element details.",
        technologies: ["JavaScript", "Science"],
        color: "#6600ff"
    },
    23: {
        title: "Pomodoro",
        folder: "Pomodor",
        path: "Pomodoro/index.html",
        description: "Productivity timer using the Pomodoro technique.",
        technologies: ["JavaScript", "Productivity"],
        color: "#4400ff"
    },
    24: {
        title: "Portfolio Generator",
        folder: "Portfolio Generator",
        path: "Portfolio Genertor/index.html",
        description: "Automatically generate professional portfolio websites.",
        technologies: ["JavaScript", "Web"],
        color: "#2200ff"
    },
    25: {
        title: "Projectile",
        folder: "Projectile",
        path: "Projectile/index.html",
        description: "Physics simulation of projectile motion with parameters.",
        technologies: ["JavaScript", "Physics"],
        color: "#0000ff"
    }
};

// Project icons mapping for HTML generation
const projectIcons = {
    1: "fas fa-project-diagram",
    2: "fas fa-qrcode",
    3: "fas fa-basketball-ball",
    4: "fas fa-question-circle",
    5: "fas fa-calculator",
    6: "fas fa-book",
    7: "fas fa-chart-bar",
    8: "fas fa-globe-americas",
    9: "fas fa-mountain",
    10: "fas fa-lock",
    11: "fas fa-chart-line",
    12: "fas fa-tasks",
    13: "fas fa-project-diagram",
    14: "fas fa-keyboard",
    15: "fas fa-music",
    16: "fas fa-balance-scale",
    17: "fas fa-brain",
    18: "fas fa-video",
    19: "fas fa-camera",
    20: "fas fa-key",
    21: "fas fa-file-pdf",
    22: "fas fa-flask",
    23: "fas fa-clock",
    24: "fas fa-briefcase",
    25: "fas fa-rocket"
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
        1: 'project-diagram',
        2: 'qrcode',
        3: 'basketball-ball',
        4: 'question-circle',
        5: 'calculator',
        6: 'book',
        7: 'chart-bar',
        8: 'globe-americas',
        9: 'mountain',
        10: 'lock',
        11: 'chart-line',
        12: 'tasks',
        13: 'project-diagram',
        14: 'keyboard',
        15: 'music',
        16: 'balance-scale',
        17: 'brain',
        18: 'video',
        19: 'camera',
        20: 'key',
        21: 'file-pdf',
        22: 'flask',
        23: 'clock',
        24: 'briefcase',
        25: 'rocket'
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
    
    // Generate project cards in HTML
    const projectsGrid = document.getElementById('projectsGrid');
    
    for (let i = 1; i <= 25; i++) {
        const project = projectData[i];
        if (!project) continue;
        
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-project', i);
        
        // Determine tags based on project type
        const tags = [];
        if (project.technologies.includes("JavaScript")) tags.push("JavaScript");
        if (project.technologies.includes("Science") || project.technologies.includes("Physics")) tags.push("Science");
        if (project.technologies.includes("Tools") || project.technologies.includes("Utility")) tags.push("Tools");
        if (project.technologies.includes("Productivity")) tags.push("Productivity");
        
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
                    <i class="fas fa-code"></i>
                    <span>Web App</span>
                </div>
                <div class="project-stat">
                    <i class="fas fa-mouse-pointer"></i>
                    <span>Interactive</span>
                </div>
            </div>
            <div class="project-cta">
                <span>Explore Project</span>
                <i class="fas fa-arrow-right"></i>
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
    if (projectCount && projectCount.textContent === '25') {
        let count = 0;
        const interval = setInterval(() => {
            count++;
            projectCount.textContent = count;
            if (count >= 25) {
                clearInterval(interval);
            }
        }, 50);
    }
});