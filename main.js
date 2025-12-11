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

// Sequential Typing Animation (No Backspace)
class SequentialTypeWriter {
    constructor(texts) {
        this.texts = texts;
        this.currentIndex = 0;
        this.isComplete = false;
        this.typeWriters = [];
    }
    
    start() {
        if (this.currentIndex < this.texts.length) {
            const currentText = this.texts[this.currentIndex];
            
            // Show visual feedback for current typing section
            this.highlightCurrentSection(currentText.element);
            
            // Create and start typewriter for current text
            const typeWriter = new TypeWriterNoBackspace(
                currentText.element,
                currentText.text,
                currentText.speed,
                0, // No delay between sequential texts
                this // Pass reference to manager
            );
            
            this.typeWriters.push(typeWriter);
        }
    }
    
    highlightCurrentSection(element) {
        // Remove highlight from all
        document.querySelectorAll('.typing-highlight').forEach(el => {
            el.classList.remove('typing-highlight');
        });
        
        // Add highlight to current section
        const parentSection = element.closest('.intro-section, .description-section');
        if (parentSection) {
            parentSection.classList.add('typing-highlight');
        }
    }
    
    // Called when a typewriter completes
    onTypeComplete() {
        // Remove highlight from completed section
        const currentText = this.texts[this.currentIndex];
        const parentSection = currentText.element.closest('.intro-section, .description-section');
        if (parentSection) {
            parentSection.classList.remove('typing-highlight');
        }
        
        // Hide cursor of completed section
        const cursor = currentText.element.nextElementSibling;
        if (cursor && cursor.classList.contains('cursor')) {
            cursor.style.opacity = '0';
        }
        
        this.currentIndex++;
        
        // Start next animation if available
        if (this.currentIndex < this.texts.length) {
            // Delay before starting next section
            setTimeout(() => {
                this.start();
            }, 500);
        } else {
            // All animations complete
            this.isComplete = true;
            console.log("All typing animations complete!");
            
            // Make CTA button more prominent
            const ctaButton = document.getElementById('explore-button');
            ctaButton.style.animation = 'gentlePulse 2s infinite';
            
            // Add the pulse animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes gentlePulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 5px 25px rgba(255, 106, 0, 0.4); }
                    50% { transform: scale(1.02); box-shadow: 0 8px 30px rgba(255, 106, 0, 0.6); }
                }
            `;
            document.head.appendChild(style);
            
            // Start tagline animation
            startTaglineAnimation();
            
            // Hide progress indicator
            const progressContainer = document.querySelector('.typing-progress');
            if (progressContainer) {
                progressContainer.classList.remove('show');
                setTimeout(() => {
                    progressContainer.remove();
                }, 500);
            }
        }
    }
}

// Typewriter that types without backspacing
class TypeWriterNoBackspace {
    constructor(element, text, speed = 60, delay = 0, manager = null) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.delay = delay;
        this.currentIndex = 0;
        this.manager = manager;
        this.isComplete = false;
        
        // Start after delay
        setTimeout(() => {
            this.type();
        }, this.delay);
    }
    
    type() {
        // Get current text to display
        const currentText = this.text.substring(0, this.currentIndex);
        this.element.textContent = currentText;
        
        // Continue typing if not at end
        if (this.currentIndex < this.text.length) {
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        } else {
            // Typing complete
            this.isComplete = true;
            
            // Notify manager if available
            if (this.manager) {
                this.manager.onTypeComplete();
            }
        }
    }
}

// Tagline typing animation (continuous with backspacing)
function startTaglineAnimation() {
    const taglineElement = document.querySelector('.typed-text');
    const taglineTexts = [
        "Exploring the Universe of Possibilities",
        "Bridging Astrophysics and AI",
        "Creating Tomorrow's Innovations Today"
    ];
    
    let taglineIndex = 0;
    let isDeleting = false;
    let charIndex = 0;
    let isWaiting = false;
    
    function typeTagline() {
        const currentText = taglineTexts[taglineIndex];
        
        // Calculate text to display
        let displayText;
        if (isDeleting) {
            displayText = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        taglineElement.textContent = displayText;
        
        // Determine typing speed
        let typeSpeed = 70; // Slower than before
        if (isDeleting) {
            typeSpeed = 40; // Faster backspacing
        }
        
        // Check if at the end of a text
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at the end
            typeSpeed = 2000; // Longer pause
            isWaiting = true;
            
            setTimeout(() => {
                isWaiting = false;
                isDeleting = true;
                typeTagline();
            }, typeSpeed);
            
            return;
        }
        
        // Check if at the beginning after deleting
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            taglineIndex = (taglineIndex + 1) % taglineTexts.length;
            
            // Pause before starting next text
            setTimeout(() => {
                typeTagline();
            }, 800);
            
            return;
        }
        
        // Continue typing/deleting
        setTimeout(() => {
            typeTagline();
        }, typeSpeed);
    }
    
    // Start the tagline animation
    typeTagline();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Create star background
    createStars();
    
    // Text to display with sequential typing animation
    // SLOWER speeds for better readability
    const sequentialTexts = [
        {
            element: document.getElementById('name-text'),
            text: "Muhammad Ali Imran",
            speed: 120, // Slower than before
            delay: 1000
        },
        {
            element: document.getElementById('description-text-1'),
            text: "A passionate student and aspiring researcher with a love for astrophysics, artificial intelligence.",
            speed: 70, // Slower than before
            delay: 0
        },
        {
            element: document.getElementById('description-text-2'),
            text: "I thrive at the intersection of science and technology, building interactive simulations, coding web applications and exploring the mysteries of the cosmos.",
            speed: 60, // Slower than before
            delay: 0
        },
        {
            element: document.getElementById('description-text-3'),
            text: "Beyond academics, I am an avid basketball player, a budding chef, and a lifelong learner who believes in experimenting, creating, and pushing boundaries.",
            speed: 65, // Slower than before
            delay: 0
        },
        {
            element: document.getElementById('description-text-4'),
            text: "This portfolio is a window into my world — showcasing my projects, hobbies, and curiosities that define who I am and what I aspire to achieve.",
            speed: 70, // Slower than before
            delay: 0
        }
    ];
    
    // Start sequential typing animation
    const sequentialTypeWriter = new SequentialTypeWriter(sequentialTexts);
    
    // Start typing after a short initial delay
    setTimeout(() => {
        sequentialTypeWriter.start();
    }, 800);
    
    // Create progress indicator
    createProgressIndicator(sequentialTypeWriter, sequentialTexts);
    
    // Explore button functionality
    const exploreButton = document.getElementById('explore-button');
    

    
    // Allow pressing Enter to trigger explore button
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            if (sequentialTypeWriter.isComplete) {
                exploreButton.click();
            }
        }
    });
});

// Create progress indicator
function createProgressIndicator(sequentialTypeWriter, sequentialTexts) {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'typing-progress';
    progressContainer.innerHTML = `
        <div class="progress-text">Starting introduction...</div>
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <div class="section-info">
            <span class="current-section">Loading...</span>
            <span class="section-counter">0/${sequentialTexts.length}</span>
        </div>
    `;
    
    // Add progress styles
    const progressStyle = document.createElement('style');
    progressStyle.textContent = `
        .typing-progress {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(10, 14, 23, 0.9);
            border: 1px solid rgba(255, 106, 0, 0.4);
            border-radius: 10px;
            padding: 15px;
            width: 260px;
            z-index: 100;
            backdrop-filter: blur(8px);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.4s ease;
        }
        
        .typing-progress.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .progress-text {
            color: #ffaa00;
            font-size: 0.9rem;
            margin-bottom: 10px;
            font-weight: 500;
            min-height: 20px;
        }
        
        .progress-bar {
            height: 6px;
            background: rgba(255, 106, 0, 0.15);
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #ff6a00, #ffaa00);
            width: 0%;
            border-radius: 3px;
            transition: width 0.5s ease;
        }
        
        .section-info {
            display: flex;
            justify-content: space-between;
            color: #aaa;
            font-size: 0.85rem;
        }
        
        .current-section {
            color: #ffcc00;
            font-weight: 500;
        }
        
        .section-counter {
            background: rgba(255, 106, 0, 0.2);
            padding: 2px 8px;
            border-radius: 10px;
        }
        
        /* Highlight for currently typing section */
        .typing-highlight {
            position: relative;
        }
        
        .typing-highlight::before {
            content: '';
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            background: rgba(255, 106, 0, 0.05);
            border-radius: 8px;
            z-index: -1;
        }
    `;
    document.head.appendChild(progressStyle);
    document.body.appendChild(progressContainer);
    
    // Section names for display
    const sectionNames = [
        "Name",
        "Passion & Purpose",
        "Interests & Activities", 
        "Philosophy",
        "Portfolio"
    ];
    
    // Show progress bar after delay
    setTimeout(() => {
        progressContainer.classList.add('show');
        
        // Update progress function
        const updateProgress = () => {
            const progress = (sequentialTypeWriter.currentIndex / sequentialTexts.length) * 100;
            const progressFill = progressContainer.querySelector('.progress-fill');
            const progressText = progressContainer.querySelector('.progress-text');
            const currentSection = progressContainer.querySelector('.current-section');
            const sectionCounter = progressContainer.querySelector('.section-counter');
            
            progressFill.style.width = `${progress}%`;
            sectionCounter.textContent = `${sequentialTypeWriter.currentIndex}/${sequentialTexts.length}`;
            
            if (sequentialTypeWriter.currentIndex < sequentialTexts.length) {
                currentSection.textContent = sectionNames[sequentialTypeWriter.currentIndex];
                
                // Update progress text
                switch(sequentialTypeWriter.currentIndex) {
                    case 0:
                        progressText.textContent = 'Typing name introduction...';
                        break;
                    case 1:
                        progressText.textContent = 'Typing passion & purpose...';
                        break;
                    case 2:
                        progressText.textContent = 'Typing interests & activities...';
                        break;
                    case 3:
                        progressText.textContent = 'Typing personal philosophy...';
                        break;
                    case 4:
                        progressText.textContent = 'Typing portfolio description...';
                        break;
                }
            } else {
                progressText.textContent = 'Introduction complete!';
                currentSection.textContent = 'Complete';
            }
        };
        
        // Update progress periodically
        const progressInterval = setInterval(() => {
            updateProgress();
            
            if (sequentialTypeWriter.isComplete) {
                clearInterval(progressInterval);
                updateProgress();
            }
        }, 300);
    }, 500);
}