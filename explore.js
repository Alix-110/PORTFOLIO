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

// Section data with your specific information
const sectionData = {
    'academics': {
        title: 'Academics',
        description: 'Matriculation from St. Mary\'s Academy with 1068/1100 (3.88 GPA) and FSC from PS Fort Road College with 855/1100 (3.11 GPA). My academic journey reflects dedication to learning and excellence.',
        stats: [
            { value: '3.88', label: 'Matric GPA' },
            { value: '3.11', label: 'FSC GPA' }
        ],
        pageUrl: 'academics/academics.html', // FIXED PATH
        thumbnails: [
            { title: 'Matriculation', icon: 'fa-school', page: 'academics/matric.html' },
            { title: 'FSC Results', icon: 'fa-university', page: 'academics/fsc.html' },
            { title: 'Transcript', icon: 'fa-file-alt', page: 'academics/academics.html#transcript' }
        ]
    },
    'extracurriculars': {
        title: 'Extracurriculars',
        description: 'Basketball player and cooking enthusiast. These activities help me develop teamwork, discipline, and creativity beyond academic pursuits.',
        stats: [
            { value: '15+', label: 'Years Playing' },
            { value: '2', label: 'Main Activities' }
        ],
        pageUrl: 'extracurriculars/index.html',
        thumbnails: [
            { title: 'Basketball', icon: 'fa-basketball-ball', page: 'extracurriculars/basketball/basketball.html' },
            { title: 'Cooking', icon: 'fa-utensils', page: 'extracurriculars/cooking/cooking.html' }
        ]
    },
    'certificates': {
        title: 'Skills',
        description: 'Skills gained through self learning and study throgh online resources..',
        stats: [
            { value: '', label: '' },
            { value: '', label: '' }
        ],
        pageUrl: 'Skills/skills.html',
        thumbnails: [
            { title: 'Certificate 1', icon: 'fa-award', page: 'certificates/C.html#cert1' },
            { title: 'Certificate 2', icon: 'fa-certificate', page: 'certificates/C.html#cert2' },
            { title: 'Certificate 3', icon: 'fa-trophy', page: 'certificates/C.html#cert3' },
            { title: 'Certificate 4', icon: 'fa-medal', page: 'certificates/C.html#cert4' }
        ]
    },
    'cosmic-curiosities': {
        title: 'Cosmic Curiosities',
        description: '8 projects exploring astronomy, cosmic phenomena, and space research. Each project represents a unique investigation into the mysteries of the universe.',
        stats: [
            { value: '8', label: 'Projects' },
            
        ],
        pageUrl: 'Cosmic_Curiosities/Cosmic.html',
        thumbnails: [
            { title: 'Project 1', icon: 'fa-star', page: 'cosmic-curiosities/project1/index.html' },
            { title: 'Project 2', icon: 'fa-moon', page: 'cosmic-curiosities/project2/index.html' },
            { title: 'Project 3', icon: 'fa-sun', page: 'cosmic-curiosities/project3/index.html' },
            { title: 'Project 4', icon: 'fa-satellite', page: 'cosmic-curiosities/project4/index.html' }
        ]
    },
    'web-projects': {
        title: 'Web Projects',
        description: '25 web development projects including applications, tools, and interactive websites. Each project showcases different technologies and problem-solving approaches.',
        stats: [
            { value: '25', label: 'Projects' },
            { value: '5+', label: 'Technologies' }
        ],
        pageUrl: 'Web Projects/web.html',
        thumbnails: [
            { title: 'Project 1', icon: 'fa-laptop-code', page: 'web-projects/project1/index.html' },
            { title: 'Project 2', icon: 'fa-globe', page: 'web-projects/project2/index.html' },
            { title: 'Project 3', icon: 'fa-mobile-alt', page: 'web-projects/project3/index.html' },
            { title: 'Project 4', icon: 'fa-database', page: 'web-projects/project4/index.html' }
        ]
    },
    'astrophysics-simulations': {
        title: 'Astrophysics Simulations',
        description: '21 simulations modeling cosmic phenomena, gravitational interactions, and astrophysical processes. Visualizing complex physics through interactive simulations.',
        stats: [
            { value: '21', label: 'Simulations' },
            { value: '3D', label: 'Visualizations' }
        ],
        pageUrl: 'Astrophysics_Simulations/astro.html',
        thumbnails: [
            { title: 'Black Hole', icon: 'fa-meteor', page: 'astrophysics-simulations/sim1/index.html' },
            { title: 'Solar System', icon: 'fa-planet-ringed', page: 'astrophysics-simulations/sim2/index.html' },
            { title: 'Galaxy', icon: 'fa-galaxy', page: 'astrophysics-simulations/sim3/index.html' },
            { title: 'Nebula', icon: 'fa-cloud', page: 'astrophysics-simulations/sim4/index.html' }
        ]
    }
};

// Typing animation for tagline
class TypeWriter {
    constructor(element, texts, speed = 60, delay = 0) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.delay = delay;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isWaiting = false;
        this.waitTime = 2000;
        
        // Start after delay
        setTimeout(() => {
            this.type();
        }, this.delay);
    }
    
    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        // Calculate text to display
        let displayText;
        if (this.isDeleting) {
            displayText = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            displayText = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }
        
        this.element.textContent = displayText;
        
        // Determine typing speed
        let typeSpeed = this.speed;
        if (this.isDeleting) {
            typeSpeed = this.speed / 1.5;
        }
        
        // Check if at the end of a text
        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            // Pause at the end
            typeSpeed = this.waitTime;
            this.isWaiting = true;
            
            setTimeout(() => {
                this.isWaiting = false;
                this.isDeleting = true;
                this.type();
            }, typeSpeed);
            
            return;
        }
        
        // Check if at the beginning after deleting
        if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            
            // Pause before starting next text
            setTimeout(() => {
                this.type();
            }, 800);
            
            return;
        }
        
        // Continue typing/deleting
        setTimeout(() => {
            this.type();
        }, typeSpeed);
    }
}

// Function to create project thumbnails
function createThumbnails(container, thumbnails) {
    container.innerHTML = '';
    
    thumbnails.forEach((thumb, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'project-thumbnail';
        thumbnail.title = thumb.title;
        
        // If image path exists, use it; otherwise use icon
        if (thumb.image) {
            thumbnail.innerHTML = `
                <img src="${thumb.image}" alt="${thumb.title}" onerror="this.onerror=null; this.parentElement.className='project-thumbnail empty'; this.parentElement.innerHTML='<i class=\"fas fa-image\"></i>';">
                <div class="thumbnail-overlay">${thumb.title}</div>
            `;
        } else {
            thumbnail.className = 'project-thumbnail empty';
            thumbnail.innerHTML = `<i class="fas ${thumb.icon}"></i>`;
            thumbnail.title = thumb.title;
        }
        
        // Add click event to navigate to project page
        thumbnail.addEventListener('click', function(e) {
            e.stopPropagation();
            if (thumb.page) {
                window.open(thumb.page, '_blank');
            }
        });
        
        container.appendChild(thumbnail);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Create star background
    createStars();
    
    // Start tagline typing animation
    const taglineElement = document.querySelector('.typed-text');
    const taglineTexts = [
        "Navigate My Universe",
        "Explore My Dimensions",
        "Discover My Cosmos"
    ];
    
    setTimeout(() => {
        new TypeWriter(taglineElement, taglineTexts, 70, 0);
    }, 1000);
    
    // Navigation card interactions
    const navCards = document.querySelectorAll('.nav-card');
    const navigationModal = document.getElementById('navigationModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalStat1 = document.getElementById('modalStat1');
    const modalStat1Label = document.getElementById('modalStat1Label');
    const modalStat2 = document.getElementById('modalStat2');
    const modalStat2Label = document.getElementById('modalStat2Label');
    const exploreModalButton = document.getElementById('exploreModalButton');
    const closeModal = document.querySelector('.close-modal');
    const projectsContainer = document.getElementById('projectsContainer');
    
    let currentSection = '';
    
    // Add click events to navigation cards
    navCards.forEach(card => {
        card.addEventListener('click', function() {
            const section = this.dataset.section;
            currentSection = section;
            
            if (sectionData[section]) {
                const data = sectionData[section];
                
                // Update modal content
                modalTitle.textContent = data.title;
                modalDescription.textContent = data.description;
                modalStat1.textContent = data.stats[0].value;
                modalStat1Label.textContent = data.stats[0].label;
                modalStat2.textContent = data.stats[1].value;
                modalStat2Label.textContent = data.stats[1].label;
                
                // Create thumbnails
                createThumbnails(projectsContainer, data.thumbnails);
                
                // Update modal button to go to the section page
                exploreModalButton.innerHTML = `<span>View All ${data.title}</span> <i class="fas fa-rocket"></i>`;
                
                // Show modal with animation
                navigationModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!navigationModal.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        navigationModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset card positions
        navCards.forEach(card => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Close modal when clicking outside
    navigationModal.addEventListener('click', function(e) {
        if (e.target === navigationModal) {
            navigationModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset card positions
            navCards.forEach(card => {
                card.style.transform = 'translateY(0)';
            });
        }
    });
    
    // Explore button in modal - goes to the section's main page
    exploreModalButton.addEventListener('click', function() {
        if (sectionData[currentSection] && sectionData[currentSection].pageUrl) {
            // Navigate to the section's main page
            window.location.href = sectionData[currentSection].pageUrl;
        }
    });
    
    // Add keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navigationModal.classList.contains('active')) {
            navigationModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Add animated entrance for cards
    setTimeout(() => {
        navCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.style.animation = 'fadeInUp 0.6s ease-out forwards';
        });
    }, 500);
    
    // Direct card click navigation (bypass modal if you want)
    const directNavCards = document.querySelectorAll('.nav-card[data-section]');
    directNavCards.forEach(card => {
        card.addEventListener('dblclick', function() {
            const section = this.dataset.section;
            if (sectionData[section] && sectionData[section].pageUrl) {
                window.location.href = sectionData[section].pageUrl;
            }
        });
    });
});