/**
 * Space Data Sonification - Interactive JavaScript
 * Enhances the educational experience with interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const audioPlayer = document.getElementById('spaceAudio');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const replayBtn = document.getElementById('replayBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    const dataValueSlider = document.getElementById('dataValueSlider');
    const dataValueDisplay = document.getElementById('dataValueDisplay');
    const playToneBtn = document.getElementById('playToneBtn');
    const toggleButtons = document.querySelectorAll('.toggle-code');
    const stepElements = document.querySelectorAll('.step');
    
    // Audio Context for interactive tone generation
    let audioContext;
    let oscillator;
    let gainNode;
    let pannerNode;
    
    // Initialize the application
    init();
    
    function init() {
        // Set up audio player controls
        setupAudioControls();
        
        // Set up interactive mapping visualization
        setupMappingVisualization();
        
        // Set up code section toggles
        setupCodeToggles();
        
        // Set up step highlighting
        setupStepHighlighting();
        
        // Set up script download link
        setupDownloadLink();
    }
    
    function setupAudioControls() {
        // Play button
        playBtn.addEventListener('click', function() {
            audioPlayer.play();
            highlightActiveStep(3); // Highlight "Map to Sound Parameters" step
        });
        
        // Pause button
        pauseBtn.addEventListener('click', function() {
            audioPlayer.pause();
        });
        
        // Stop button
        stopBtn.addEventListener('click', function() {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
        });
        
        // Replay button
        replayBtn.addEventListener('click', function() {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
            highlightActiveStep(3); // Highlight "Map to Sound Parameters" step
        });
        
        // Volume control
        volumeSlider.addEventListener('input', function() {
            const volume = this.value / 100;
            audioPlayer.volume = volume;
            volumeValue.textContent = `${this.value}%`;
        });
        
        // When audio is playing, highlight the "Generate Audio Waveform" step
        audioPlayer.addEventListener('play', function() {
            highlightActiveStep(4);
        });
        
        // When audio ends, reset highlighting
        audioPlayer.addEventListener('ended', function() {
            resetStepHighlighting();
        });
    }
    
    function setupMappingVisualization() {
        // Update mapping display when slider changes
        dataValueSlider.addEventListener('input', function() {
            updateMappingDisplay(this.value / 100);
        });
        
        // Play tone button
        playToneBtn.addEventListener('click', function() {
            const dataValue = dataValueSlider.value / 100;
            playMappedTone(dataValue);
            highlightActiveStep(3); // Highlight "Map to Sound Parameters" step
        });
        
        // Initialize the display with default value
        updateMappingDisplay(0.5);
    }
    
    function updateMappingDisplay(dataValue) {
        // Update data value display
        dataValueDisplay.textContent = dataValue.toFixed(2);
        
        // Calculate mapped parameters (matching Python logic)
        const pitchScale = [0, 2, 4, 7, 9]; // Pentatonic scale intervals
        const pitchIndex = Math.floor(dataValue * (pitchScale.length - 1));
        const pitchSemitones = pitchScale[pitchIndex];
        const pitch = 261.63 * Math.pow(2, pitchSemitones / 12);
        
        const duration = 0.1 + (dataValue * 0.3);
        const volume = 0.3 + (dataValue * 0.7);
        
        // For demonstration, alternate panning based on data value
        const panPosition = dataValue < 0.5 ? -0.5 : 0.5;
        
        // Update pitch display
        const pitchBar = document.getElementById('pitchBar');
        const pitchText = document.getElementById('pitchText');
        const pitchPercentage = dataValue * 100;
        pitchBar.style.width = `${pitchPercentage}%`;
        
        // Convert frequency to musical note (simplified)
        const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const noteIndex = (Math.round(pitchSemitones) + 60) % 12; // C4 is 60 in MIDI
        const noteName = noteNames[noteIndex];
        const octave = 4 + Math.floor((Math.round(pitchSemitones) + 60) / 12);
        
        pitchText.textContent = `${pitch.toFixed(2)} Hz (${noteName}${octave})`;
        
        // Update duration display
        const durationBar = document.getElementById('durationBar');
        const durationText = document.getElementById('durationText');
        const durationPercentage = (dataValue * 100);
        durationBar.style.width = `${durationPercentage}%`;
        durationText.textContent = `${duration.toFixed(2)} seconds`;
        
        // Update volume display
        const volumeBar = document.getElementById('volumeBar');
        const volumeText = document.getElementById('volumeText');
        const volumePercentage = volume * 100;
        volumeBar.style.width = `${volumePercentage}%`;
        volumeText.textContent = `${volume.toFixed(2)} (${Math.round(volumePercentage)}%)`;
        
        // Update pan display
        const panBar = document.getElementById('panBar');
        const panText = document.getElementById('panText');
        
        // Convert pan position (-1 to 1) to percentage (0% to 100%)
        const panPercentage = (panPosition + 1) * 50;
        panBar.style.width = `${panPercentage}%`;
        
        // Determine pan direction text
        let panDirection;
        if (panPosition < -0.3) panDirection = "Left";
        else if (panPosition > 0.3) panDirection = "Right";
        else panDirection = "Center";
        
        panText.textContent = `${panDirection} (${panPosition.toFixed(1)})`;
    }
    
    function playMappedTone(dataValue) {
        // Stop any currently playing tone
        stopTone();
        
        // Create audio context if it doesn't exist
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        // Calculate parameters (matching Python logic)
        const pitchScale = [0, 2, 4, 7, 9];
        const pitchIndex = Math.floor(dataValue * (pitchScale.length - 1));
        const pitchSemitones = pitchScale[pitchIndex];
        const pitch = 261.63 * Math.pow(2, pitchSemitones / 12);
        
        const duration = 0.1 + (dataValue * 0.3);
        const volume = 0.3 + (dataValue * 0.7);
        
        // For demonstration, alternate panning based on data value
        const panPosition = dataValue < 0.5 ? -0.5 : 0.5;
        
        // Create audio nodes
        oscillator = audioContext.createOscillator();
        gainNode = audioContext.createGain();
        pannerNode = audioContext.createStereoPanner();
        
        // Configure oscillator
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(pitch, audioContext.currentTime);
        
        // Configure gain (volume) with fade in/out
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.05);
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime + duration - 0.05);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
        
        // Configure panner
        pannerNode.pan.setValueAtTime(panPosition, audioContext.currentTime);
        
        // Connect nodes: oscillator -> gain -> panner -> destination
        oscillator.connect(gainNode);
        gainNode.connect(pannerNode);
        pannerNode.connect(audioContext.destination);
        
        // Start and stop the oscillator
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
        
        // Automatically clean up after the tone finishes
        setTimeout(() => {
            if (oscillator) {
                oscillator.disconnect();
                oscillator = null;
            }
        }, duration * 1000 + 100);
    }
    
    function stopTone() {
        if (oscillator) {
            oscillator.stop();
            oscillator.disconnect();
            oscillator = null;
        }
    }
    
    function setupCodeToggles() {
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const step = this.closest('.step');
                const codeContainer = step.querySelector('.code-container');
                const icon = this.querySelector('i');
                
                // Toggle code visibility
                codeContainer.classList.toggle('show');
                
                // Update icon
                if (codeContainer.classList.contains('show')) {
                    icon.className = 'fas fa-chevron-up';
                } else {
                    icon.className = 'fas fa-chevron-down';
                }
                
                // Highlight this step
                resetStepHighlighting();
                step.style.backgroundColor = 'rgba(93, 63, 211, 0.15)';
                step.style.borderLeft = '5px solid var(--star-yellow)';
            });
        });
    }
    
    function setupStepHighlighting() {
        // Highlight steps when they come into view
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const step = entry.target;
                    step.style.backgroundColor = 'rgba(93, 63, 211, 0.1)';
                    step.style.transition = 'background-color 0.5s ease';
                    
                    // Reset after 3 seconds
                    setTimeout(() => {
                        if (document.contains(step)) {
                            step.style.backgroundColor = '';
                        }
                    }, 3000);
                }
            });
        }, observerOptions);
        
        // Observe each step
        stepElements.forEach(step => {
            observer.observe(step);
        });
    }
    
    function highlightActiveStep(stepNumber) {
        resetStepHighlighting();
        
        const step = document.getElementById(`step${stepNumber}`);
        if (step) {
            step.style.backgroundColor = 'rgba(32, 178, 170, 0.15)';
            step.style.borderLeft = '5px solid var(--planet-teal)';
            
            // Ensure the code is visible for this step
            const codeContainer = step.querySelector('.code-container');
            const toggleIcon = step.querySelector('.toggle-code i');
            
            if (codeContainer && !codeContainer.classList.contains('show')) {
                codeContainer.classList.add('show');
                if (toggleIcon) {
                    toggleIcon.className = 'fas fa-chevron-up';
                }
            }
            
            // Scroll to the step
            step.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    function resetStepHighlighting() {
        stepElements.forEach(step => {
            step.style.backgroundColor = '';
            step.style.borderLeft = '5px solid var(--nebula-purple)';
        });
    }
    
    function setupDownloadLink() {
        const downloadLink = document.getElementById('downloadScript');
        downloadLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a blob with the Python script content
            const pythonScriptContent = `# Space Data Sonification Script - Downloaded from Web Interface
# Save this file as sonification.py and run: python sonification.py

# (The full script would be included here in a real implementation)
print("Space Data Sonification Script")
print("Download complete! Save this as 'sonification.py'")
print("Place a CSV file named 'space_data.csv' in the same directory")
print("Run: python sonification.py")`;
            
            const blob = new Blob([pythonScriptContent], { type: 'text/x-python' });
            const url = URL.createObjectURL(blob);
            
            // Create a temporary link to trigger download
            const a = document.createElement('a');
            a.href = url;
            a.download = 'sonification.py';
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
            
            // Show download confirmation
            alert('Python script download started. Save it as "sonification.py" and run it with your CSV data.');
        });
    }
    
    // Add visual feedback for interactive elements
    document.querySelectorAll('button, .application, .step-header').forEach(element => {
        element.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Initialize all code containers as hidden
    document.querySelectorAll('.code-container').forEach(container => {
        container.style.maxHeight = '0';
    });
});