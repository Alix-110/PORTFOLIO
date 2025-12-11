// Create stars for background
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
    
    // Get PDF elements
    const matricPdfPreview = document.getElementById('matricPdfPreview');
    const fscPdfPreview = document.getElementById('fscPdfPreview');
    const matricPdfContainer = document.getElementById('matricPdfContainer');
    const fscPdfContainer = document.getElementById('fscPdfContainer');
    const closeButtons = document.querySelectorAll('.close-pdf');
    
    // Create overlay for PDF modal
    const pdfOverlay = document.createElement('div');
    pdfOverlay.className = 'pdf-overlay';
    document.body.appendChild(pdfOverlay);
    
    // Add styles for overlay
    const overlayStyle = document.createElement('style');
    overlayStyle.textContent = `
        .pdf-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 999;
            backdrop-filter: blur(5px);
        }
        
        .pdf-overlay.active {
            display: block;
        }
        
        .pdf-loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ffaa00;
            font-size: 1.2rem;
            text-align: center;
        }
        
        .pdf-loading i {
            font-size: 2rem;
            margin-bottom: 1rem;
            display: block;
        }
        
        .pdf-error {
            padding: 2rem;
            text-align: center;
            color: #ff6a00;
            background: rgba(255, 106, 0, 0.1);
            border-radius: 10px;
            margin: 1rem;
            border: 1px solid rgba(255, 106, 0, 0.3);
        }
        
        .pdf-error i {
            font-size: 3rem;
            margin-bottom: 1rem;
            display: block;
        }
    `;
    document.head.appendChild(overlayStyle);
    
    // Function to show loading indicator
    function showPdfLoading(container) {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'pdf-loading';
        loadingDiv.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <div>Loading PDF...</div>
        `;
        container.appendChild(loadingDiv);
        return loadingDiv;
    }
    
    // Function to show PDF error
    function showPdfError(container, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'pdf-error';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
            <p><small>Make sure PDF files are in the documents folder</small></p>
        `;
        container.appendChild(errorDiv);
    }
    
    // Matric PDF Preview Click Handler
    matricPdfPreview.addEventListener('click', function() {
        // Show overlay
        pdfOverlay.classList.add('active');
        
        // Show PDF container
        matricPdfContainer.classList.add('active');
        
        // Disable body scroll
        document.body.style.overflow = 'hidden';
        
        // Get the iframe
        const matricIframe = document.getElementById('matricPdfIframe');
        
        // Show loading
        const loading = showPdfLoading(matricPdfContainer);
        
        // Check if PDF exists
        fetch('../documents/matric-transcript.pdf')
            .then(response => {
                if (!response.ok) {
                    throw new Error('PDF not found');
                }
                // Remove loading after a short delay
                setTimeout(() => {
                    if (loading.parentNode) {
                        loading.remove();
                    }
                }, 500);
            })
            .catch(error => {
                console.error('Error loading PDF:', error);
                if (loading.parentNode) {
                    loading.remove();
                }
                showPdfError(matricPdfContainer, 'Matriculation transcript PDF not found.');
                matricIframe.style.display = 'none';
            });
    });
    
    // FSC PDF Preview Click Handler
    fscPdfPreview.addEventListener('click', function() {
        // Show overlay
        pdfOverlay.classList.add('active');
        
        // Show PDF container
        fscPdfContainer.classList.add('active');
        
        // Disable body scroll
        document.body.style.overflow = 'hidden';
        
        // Get the iframe
        const fscIframe = document.getElementById('fscPdfIframe');
        
        // Show loading
        const loading = showPdfLoading(fscPdfContainer);
        
        // Check if PDF exists
        fetch('../documents/fsc-transcript.pdf')
            .then(response => {
                if (!response.ok) {
                    throw new Error('PDF not found');
                }
                // Remove loading after a short delay
                setTimeout(() => {
                    if (loading.parentNode) {
                        loading.remove();
                    }
                }, 500);
            })
            .catch(error => {
                console.error('Error loading PDF:', error);
                if (loading.parentNode) {
                    loading.remove();
                }
                showPdfError(fscPdfContainer, 'FSC transcript PDF not found.');
                fscIframe.style.display = 'none';
            });
    });
    
    // Close PDF Button Handlers
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Hide overlay
            pdfOverlay.classList.remove('active');
            
            // Hide PDF container
            if (target === 'matric') {
                matricPdfContainer.classList.remove('active');
            } else if (target === 'fsc') {
                fscPdfContainer.classList.remove('active');
            }
            
            // Enable body scroll
            document.body.style.overflow = 'auto';
            
            // Clear any error messages
            const errors = document.querySelectorAll('.pdf-error');
            errors.forEach(error => error.remove());
        });
    });
    
    // Close PDF when clicking overlay
    pdfOverlay.addEventListener('click', function() {
        // Hide overlay
        pdfOverlay.classList.remove('active');
        
        // Hide all PDF containers
        matricPdfContainer.classList.remove('active');
        fscPdfContainer.classList.remove('active');
        
        // Enable body scroll
        document.body.style.overflow = 'auto';
        
        // Clear any error messages
        const errors = document.querySelectorAll('.pdf-error');
        errors.forEach(error => error.remove());
    });
    
    // Close PDF with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // Hide overlay
            pdfOverlay.classList.remove('active');
            
            // Hide all PDF containers
            matricPdfContainer.classList.remove('active');
            fscPdfContainer.classList.remove('active');
            
            // Enable body scroll
            document.body.style.overflow = 'auto';
            
            // Clear any error messages
            const errors = document.querySelectorAll('.pdf-error');
            errors.forEach(error => error.remove());
        }
    });
    
    // Add hover effects to detail cards
    const detailCards = document.querySelectorAll('.detail-card');
    detailCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 30px rgba(255, 106, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(255, 106, 0, 0.1)';
        });
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
            }
        });
    }, observerOptions);
    
    // Observe stats and charts
    const stats = document.querySelectorAll('.stat, .comparison-stat');
    stats.forEach(stat => observer.observe(stat));
    
    const chartBars = document.querySelectorAll('.chart-value');
    chartBars.forEach(bar => observer.observe(bar));
    
    // Add tooltips for PDF previews
    const pdfPreviews = document.querySelectorAll('.pdf-preview');
    pdfPreviews.forEach(preview => {
        preview.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'pdf-tooltip';
            tooltip.textContent = 'Click to view transcript';
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
            
            this.appendChild(tooltip);
            
            // Remove tooltip after delay
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 3000);
        });
    });
    
    // Animate progress bars on load
    setTimeout(() => {
        const chartValues = document.querySelectorAll('.chart-value');
        chartValues.forEach((bar, index) => {
            bar.style.animationDelay = `${index * 0.3}s`;
        });
    }, 500);
    
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Add loading animation
            this.style.pointerEvents = 'none';
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Navigate after delay
            setTimeout(() => {
                window.location.href = href;
            }, 800);
        });
    });
    
    // Fix iframe styling issues
    const pdfIframes = document.querySelectorAll('.pdf-iframe');
    pdfIframes.forEach(iframe => {
        // Ensure iframe has proper attributes
        iframe.setAttribute('type', 'application/pdf');
        iframe.setAttribute('aria-label', 'PDF Document');
        
        // Handle iframe load
        iframe.addEventListener('load', function() {
            console.log('PDF iframe loaded successfully');
            // Try to make PDF fill iframe better
            try {
                // This helps some browsers display PDF better
                this.contentWindow.document.body.style.margin = '0';
                this.contentWindow.document.body.style.padding = '0';
            } catch (e) {
                // Cross-origin restrictions may prevent this
                console.log('Cannot modify iframe content due to security restrictions');
            }
        });
        
        iframe.addEventListener('error', function() {
            console.log('Error loading PDF in iframe');
            // This will be caught by our fetch error handling above
        });
    });
    
    // Alternative PDF viewer setup for browsers that don't support iframe PDFs well
    function setupAlternativePdfView() {
        // Check if browser supports PDF in iframe
        const testIframe = document.createElement('iframe');
        testIframe.style.display = 'none';
        document.body.appendChild(testIframe);
        
        // Simple test - if iframe doesn't load properly, we'll use object tag instead
        setTimeout(() => {
            testIframe.remove();
        }, 1000);
    }
    
    // Initialize alternative viewer check
    setupAlternativePdfView();
});