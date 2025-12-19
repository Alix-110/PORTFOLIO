
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

// Research paper data with PDF paths
const paperData = {
    1: {
        title: "How Gravitational Lensing Helps Astronomers Detect Dark Matter",
        pdf: "How Gravitational Lensing Helps Astronomers Detect Dark Matter.pdf", // Change this to your PDF path
        year: "2024",
        tags: ["Astrophysics", "Cosmology", "Thermodynamics"],
        pages: "9",
        description: "An investigation into the thermodynamic properties of black holes, focusing on entropy, Hawking radiation, and information paradox."
    },
    2: {
        title: "Quantum Entanglement in Cosmological Context",
        pdf: "QuantumEntanglementCosmology.pdf", // Change this to your PDF path
        year: "2025",
        tags: ["Quantum Physics", "Entanglement", "Cosmology"],
        pages: "14",
        description: "Exploring quantum entanglement phenomena in the early universe and its implications for cosmic inflation and structure formation."
    },
    3: {
        title: "Machine Learning in Astronomical Data Analysis",
        pdf: "MLAstronomy.pdf", // Change this to your PDF path
        year: "2025",
        tags: ["Computer Science", "AI", "Data Analysis"],
        pages: "12",
        description: "Application of deep learning algorithms for classification and analysis of astronomical datasets from NASA telescopes."
    },
    4: {
        title: "Dark Matter Distribution in Spiral Galaxies",
        pdf: "DarkMatterDistribution.pdf", // Change this to your PDF path
        year: "2023",
        tags: ["Cosmology", "Dark Matter", "Galaxies"],
        pages: "11",
        description: "Analysis of rotation curves and dark matter halo profiles in nearby spiral galaxies using observational data."
    },
    5: {
        title: "Statistical Analysis of Exoplanet Discovery Data",
        pdf: "ExoplanetStatistics.pdf", // Change this to your PDF path
        year: "October 2025",
        tags: ["Data Science", "Statistics", "Exoplanets"],
        pages: "14",
        description: "Comprehensive statistical analysis of Kepler and TESS exoplanet data to identify patterns and habitable zone probabilities."
    },
    6: {
        title: "Fractal Geometry in Cosmic Structure Formation",
        pdf: "FractalCosmology.pdf", // Change this to your PDF path
        year: "2024",
        tags: ["Mathematics", "Geometry", "Cosmology"],
        pages: "15",
        description: "Investigating fractal patterns in galaxy distribution and cosmic web formation using mathematical modeling."
    },
   
};

// Create loading overlay
function createLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-content">
            <i class="fas fa-microscope loading-icon"></i>
            <h2>Loading Research Paper...</h2>
            <p>Preparing scientific document</p>
        </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
}

// Open PDF in modal
function openPDF(paperId) {
    const paper = paperData[paperId];
    if (!paper) {
        alert('Research paper not found!');
        return;
    }
    
    // Get modal elements
    const modal = document.getElementById('pdfModal');
    const pdfTitle = document.getElementById('pdfTitle');
    const pdfViewer = document.getElementById('pdfViewer');
    const pageCount = document.getElementById('pageCount');
    const paperYear = document.getElementById('paperYear');
    const paperTags = document.getElementById('paperTags');
    
    // Update modal content
    pdfTitle.textContent = paper.title;
    pdfViewer.src = paper.pdf;
    pageCount.textContent = `${paper.pages} pages`;
    paperYear.textContent = paper.year;
    paperTags.textContent = paper.tags.join(', ');
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset zoom
    currentZoom = 100;
    updateZoom();
}

// Zoom functionality
let currentZoom = 100;

function updateZoom() {
    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.style.transform = `scale(${currentZoom / 100})`;
    pdfViewer.style.transformOrigin = 'center top';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Create star background
    createStars();
    
    // Get elements
    const pdfModal = document.getElementById('pdfModal');
    const closePDF = document.querySelector('.close-pdf');
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const downloadBtn = document.getElementById('downloadBtn');
    const paperCards = document.querySelectorAll('.paper-card');
    const loadingOverlay = createLoadingOverlay();
    
    // Add click handlers to paper cards
    paperCards.forEach(card => {
        card.addEventListener('click', function() {
            const paperId = this.getAttribute('data-paper');
            
            // Show loading overlay
            loadingOverlay.classList.add('active');
            
            // Simulate loading time
            setTimeout(() => {
                loadingOverlay.classList.remove('active');
                openPDF(paperId);
            }, 1000);
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const paperId = this.getAttribute('data-paper');
                loadingOverlay.classList.add('active');
                setTimeout(() => {
                    loadingOverlay.classList.remove('active');
                    openPDF(paperId);
                }, 1000);
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });
    
    // Close PDF modal
    closePDF.addEventListener('click', function() {
        pdfModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset PDF viewer
        const pdfViewer = document.getElementById('pdfViewer');
        pdfViewer.src = '';
    });
    
    // Close modal when clicking outside
    pdfModal.addEventListener('click', function(e) {
        if (e.target === pdfModal) {
            pdfModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            const pdfViewer = document.getElementById('pdfViewer');
            pdfViewer.src = '';
        }
    });
    
    // Zoom controls
    zoomIn.addEventListener('click', function() {
        if (currentZoom < 200) {
            currentZoom += 10;
            updateZoom();
        }
    });
    
    zoomOut.addEventListener('click', function() {
        if (currentZoom > 50) {
            currentZoom -= 10;
            updateZoom();
        }
    });
    
    // Download button
    downloadBtn.addEventListener('click', function() {
        const pdfViewer = document.getElementById('pdfViewer');
        const pdfSrc = pdfViewer.src;
        
        if (pdfSrc) {
            const link = document.createElement('a');
            link.href = pdfSrc;
            link.download = pdfSrc.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
    
    // Add keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
            pdfModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            const pdfViewer = document.getElementById('pdfViewer');
            pdfViewer.src = '';
        }
        
        // Number keys 1-8 to open papers
        if (e.key >= '1' && e.key <= '8') {
            const paperId = parseInt(e.key);
            if (paperData[paperId]) {
                loadingOverlay.classList.add('active');
                setTimeout(() => {
                    loadingOverlay.classList.remove('active');
                    openPDF(paperId);
                }, 1000);
            }
        }
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
    const stats = document.querySelectorAll('.stat, .area-card, .research-stat');
    stats.forEach(stat => observer.observe(stat));
    
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
    
    // Add staggered animation to paper cards
    paperCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
    
    // Add hover effects to paper cards
    paperCards.forEach(card => {
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
            
            setTimeout(() => {
                ripple.style.width = '200px';
                ripple.style.height = '200px';
                ripple.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Add paper counter animation
    const paperCount = document.querySelector('.stat-value:first-child');
    if (paperCount && paperCount.textContent === '12+') {
        paperCount.textContent = '0';
        let count = 0;
        const interval = setInterval(() => {
            count++;
            paperCount.textContent = count + '+';
            if (count >= 12) {
                clearInterval(interval);
            }
        }, 80);
    }
    
    // Add PDF viewer load event
    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.addEventListener('load', function() {
        // PDF loaded successfully
        console.log('PDF loaded successfully');
    });
    
    pdfViewer.addEventListener('error', function() {
        // PDF failed to load
        alert('Failed to load PDF. Please check the file path.');
    });
});
