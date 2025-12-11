// Main JavaScript for Cosmic Sonification Educational Website

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const waveCanvas = document.getElementById('waveCanvas');
const audioVisualizer = document.getElementById('audioVisualizer');
const dataVizCanvas = document.getElementById('dataVizCanvas');
const sonificationCanvas = document.getElementById('sonificationCanvas');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const volumeSlider = document.getElementById('volumeSlider');
const dataParam = document.getElementById('dataParam');
const soundParam = document.getElementById('soundParam');
const mappingType = document.getElementById('mappingType');
const timeScale = document.getElementById('timeScale');
const timeScaleValue = document.getElementById('timeScaleValue');
const previewBtn = document.getElementById('previewBtn');
const resetBtn = document.getElementById('resetBtn');
const dataPoints = document.getElementById('dataPoints');
const duration = document.getElementById('duration');
const freqRange = document.getElementById('freqRange');

// Canvas Contexts
let waveCtx, audioVizCtx, dataVizCtx, sonificationCtx;

// Audio Context for Web Audio API
let audioContext;
let oscillator;
let isPlaying = false;
let audioStartTime = 0;

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }
    });
});

// Initialize Canvas Contexts
function initCanvas() {
    if (waveCanvas) {
        waveCanvas.width = waveCanvas.offsetWidth;
        waveCanvas.height = waveCanvas.offsetHeight;
        waveCtx = waveCanvas.getContext('2d');
        drawDataWave();
    }
    
    if (audioVisualizer) {
        audioVisualizer.width = audioVisualizer.offsetWidth;
        audioVisualizer.height = audioVisualizer.offsetHeight;
        audioVizCtx = audioVisualizer.getContext('2d');
        drawAudioVisualizer();
    }
    
    if (dataVizCanvas) {
        dataVizCanvas.width = dataVizCanvas.offsetWidth;
        dataVizCanvas.height = dataVizCanvas.offsetHeight;
        dataVizCtx = dataVizCanvas.getContext('2d');
        drawDataVisualization();
    }
    
    if (sonificationCanvas) {
        sonificationCanvas.width = sonificationCanvas.offsetWidth;
        sonificationCanvas.height = sonificationCanvas.offsetHeight;
        sonificationCtx = sonificationCanvas.getContext('2d');
        drawSonificationVisualizer();
    }
}

// Draw animated data wave in hero section
function drawDataWave() {
    if (!waveCtx) return;
    
    const width = waveCanvas.width;
    const height = waveCanvas.height;
    
    // Clear canvas
    waveCtx.fillStyle = 'rgba(16, 30, 66, 0.5)';
    waveCtx.fillRect(0, 0, width, height);
    
    // Draw grid
    waveCtx.strokeStyle = 'rgba(26, 143, 227, 0.1)';
    waveCtx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x < width; x += 50) {
        waveCtx.beginPath();
        waveCtx.moveTo(x, 0);
        waveCtx.lineTo(x, height);
        waveCtx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < height; y += 25) {
        waveCtx.beginPath();
        waveCtx.moveTo(0, y);
        waveCtx.lineTo(width, y);
        waveCtx.stroke();
    }
    
    // Draw animated data wave
    const time = Date.now() * 0.001;
    const points = [];
    
    for (let x = 0; x < width; x += 2) {
        // Complex wave with multiple frequencies
        const y1 = Math.sin(x * 0.05 + time) * 20;
        const y2 = Math.sin(x * 0.03 + time * 1.3) * 15;
        const y3 = Math.sin(x * 0.01 + time * 0.7) * 10;
        const noise = (Math.random() - 0.5) * 5;
        const y = height / 2 + y1 + y2 + y3 + noise;
        points.push({x, y});
    }
    
    // Draw the wave
    waveCtx.strokeStyle = '#1a8fe3';
    waveCtx.lineWidth = 3;
    waveCtx.beginPath();
    
    for (let i = 0; i < points.length; i++) {
        if (i === 0) {
            waveCtx.moveTo(points[i].x, points[i].y);
        } else {
            waveCtx.lineTo(points[i].x, points[i].y);
        }
    }
    waveCtx.stroke();
    
    // Draw data points
    waveCtx.fillStyle = '#fc3d21';
    for (let i = 0; i < points.length; i += 15) {
        waveCtx.beginPath();
        waveCtx.arc(points[i].x, points[i].y, 4, 0, Math.PI * 2);
        waveCtx.fill();
    }
    
    // Continue animation
    requestAnimationFrame(drawDataWave);
}

// Draw audio visualizer
function drawAudioVisualizer() {
    if (!audioVizCtx) return;
    
    const width = audioVisualizer.width;
    const height = audioVisualizer.height;
    
    // Clear canvas
    audioVizCtx.fillStyle = 'rgba(5, 10, 26, 0.5)';
    audioVizCtx.fillRect(0, 0, width, height);
    
    // Draw frequency bars (simulated)
    const barCount = 64;
    const barWidth = width / barCount;
    const time = Date.now() * 0.005;
    
    for (let i = 0; i < barCount; i++) {
        // Create interesting frequency pattern
        const amplitude = Math.sin(i * 0.3 + time) * 0.5 + 0.5;
        const barHeight = amplitude * height * 0.7;
        const x = i * barWidth;
        const y = height - barHeight;
        
        // Create gradient
        const gradient = audioVizCtx.createLinearGradient(0, y, 0, height);
        gradient.addColorStop(0, '#1a8fe3');
        gradient.addColorStop(1, '#0b3d91');
        
        audioVizCtx.fillStyle = gradient;
        audioVizCtx.fillRect(x + 1, y, barWidth - 2, barHeight);
    }
    
    // Continue animation
    requestAnimationFrame(drawAudioVisualizer);
}

// Draw data visualization
function drawDataVisualization() {
    if (!dataVizCtx) return;
    
    const width = dataVizCanvas.width;
    const height = dataVizCanvas.height;
    
    // Clear canvas
    dataVizCtx.fillStyle = 'rgba(5, 10, 26, 0.7)';
    dataVizCtx.fillRect(0, 0, width, height);
    
    // Draw axes
    dataVizCtx.strokeStyle = 'rgba(26, 143, 227, 0.5)';
    dataVizCtx.lineWidth = 2;
    
    // Y axis
    dataVizCtx.beginPath();
    dataVizCtx.moveTo(50, 20);
    dataVizCtx.lineTo(50, height - 30);
    dataVizCtx.stroke();
    
    // X axis
    dataVizCtx.beginPath();
    dataVizCtx.moveTo(50, height - 30);
    dataVizCtx.lineTo(width - 20, height - 30);
    dataVizCtx.stroke();
    
    // Axis labels
    dataVizCtx.fillStyle = '#a0c8ff';
    dataVizCtx.font = '14px "Exo 2"';
    dataVizCtx.fillText('Brightness', 10, height / 2);
    dataVizCtx.fillText('Time', width / 2, height - 5);
    
    // Generate simulated exoplanet transit data
    const dataPoints = [];
    const pointCount = 200;
    
    for (let i = 0; i < pointCount; i++) {
        // Base signal with some noise
        let y = 0.7 + Math.random() * 0.05;
        
        // Add transit dips
        if (i > 60 && i < 90) {
            // First transit
            const transitPos = (i - 60) / 30;
            y = 0.7 - 0.15 * (1 - Math.pow(2 * transitPos - 1, 2));
        } else if (i > 140 && i < 170) {
            // Second transit
            const transitPos = (i - 140) / 30;
            y = 0.7 - 0.15 * (1 - Math.pow(2 * transitPos - 1, 2));
        }
        
        // Add some random noise
        y += (Math.random() - 0.5) * 0.02;
        
        dataPoints.push({
            x: 50 + (i / pointCount) * (width - 70),
            y: 20 + y * (height - 50)
        });
    }
    
    // Draw data line
    dataVizCtx.strokeStyle = '#1a8fe3';
    dataVizCtx.lineWidth = 3;
    dataVizCtx.beginPath();
    
    for (let i = 0; i < dataPoints.length; i++) {
        if (i === 0) {
            dataVizCtx.moveTo(dataPoints[i].x, dataPoints[i].y);
        } else {
            dataVizCtx.lineTo(dataPoints[i].x, dataPoints[i].y);
        }
    }
    dataVizCtx.stroke();
    
    // Highlight transit regions
    dataVizCtx.fillStyle = 'rgba(252, 61, 33, 0.2)';
    dataVizCtx.fillRect(
        50 + (60 / pointCount) * (width - 70),
        20,
        (30 / pointCount) * (width - 70),
        height - 50
    );
    
    dataVizCtx.fillRect(
        50 + (140 / pointCount) * (width - 70),
        20,
        (30 / pointCount) * (width - 70),
        height - 50
    );
    
    // Add annotation for transits
    dataVizCtx.fillStyle = '#fc3d21';
    dataVizCtx.font = 'bold 16px "Exo 2"';
    dataVizCtx.fillText('Exoplanet Transit', 50 + (75 / pointCount) * (width - 70), 40);
    dataVizCtx.fillText('Exoplanet Transit', 50 + (155 / pointCount) * (width - 70), 40);
}

// Draw sonification visualizer
function drawSonificationVisualizer() {
    if (!sonificationCtx) return;
    
    const width = sonificationCanvas.width;
    const height = sonificationCanvas.height;
    
    // Clear canvas
    sonificationCtx.fillStyle = 'rgba(16, 30, 66, 0.7)';
    sonificationCtx.fillRect(0, 0, width, height);
    
    // Draw waveform based on current parameters
    const time = Date.now() * 0.001;
    const freq = getFrequencyFromParams();
    const amplitude = 0.7;
    
    sonificationCtx.strokeStyle = '#fc3d21';
    sonificationCtx.lineWidth = 2;
    sonificationCtx.beginPath();
    
    for (let x = 0; x < width; x++) {
        // Calculate y based on selected parameters
        let y;
        
        if (soundParam.value === 'pitch') {
            // Frequency modulation based on data
            const modFreq = freq * (0.8 + 0.4 * Math.sin(x * 0.02 + time));
            y = height/2 + amplitude * (height/2) * Math.sin(x * 0.05 * modFreq/200 + time);
        } else if (soundParam.value === 'volume') {
            // Amplitude modulation
            const modAmp = amplitude * (0.5 + 0.5 * Math.sin(x * 0.03 + time));
            y = height/2 + modAmp * (height/2) * Math.sin(x * 0.05 + time);
        } else if (soundParam.value === 'timbre') {
            // Complex waveform for timbre changes
            y = height/2 + amplitude * (height/2) * (
                0.7 * Math.sin(x * 0.05 + time) +
                0.3 * Math.sin(x * 0.1 + time * 1.3) +
                0.1 * Math.sin(x * 0.02 + time * 0.7)
            );
        } else {
            // Stereo effect - two waveforms
            const pan = Math.sin(x * 0.01 + time);
            y = height/2 + amplitude * (height/2) * Math.sin(x * 0.05 + time) * (0.5 + 0.5 * pan);
        }
        
        if (x === 0) {
            sonificationCtx.moveTo(x, y);
        } else {
            sonificationCtx.lineTo(x, y);
        }
    }
    
    sonificationCtx.stroke();
    
    // Continue animation
    requestAnimationFrame(drawSonificationVisualizer);
}

// Calculate frequency based on selected parameters
function getFrequencyFromParams() {
    const baseFreq = 440; // A4 note
    
    if (dataParam.value === 'brightness') {
        return baseFreq * 0.8;
    } else if (dataParam.value === 'temperature') {
        return baseFreq * 1.2;
    } else if (dataParam.value === 'density') {
        return baseFreq * 1.5;
    } else {
        return baseFreq * 2.0;
    }
}

// Audio playback simulation
playBtn.addEventListener('click', () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (!isPlaying) {
        // Create oscillator
        oscillator = audioContext.createOscillator();
        
        // Set type based on selected parameters
        if (soundParam.value === 'timbre') {
            oscillator.type = 'sawtooth';
        } else {
            oscillator.type = 'sine';
        }
        
        // Set frequency based on data parameter
        oscillator.frequency.value = getFrequencyFromParams();
        
        // Create gain node for volume control
        const gainNode = audioContext.createGain();
        gainNode.gain.value = volumeSlider.value / 100;
        
        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Start playback
        oscillator.start();
        isPlaying = true;
        audioStartTime = audioContext.currentTime;
        
        // Update button states
        playBtn.disabled = true;
        pauseBtn.disabled = false;
        
        // Update time display
        updateAudioTime();
    }
});

pauseBtn.addEventListener('click', () => {
    if (oscillator && isPlaying) {
        oscillator.stop();
        isPlaying = false;
        
        // Update button states
        playBtn.disabled = false;
        pauseBtn.disabled = true;
    }
});

// Update volume
volumeSlider.addEventListener('input', () => {
    // In a real implementation, this would adjust the gain node
});

// Update audio time display
function updateAudioTime() {
    if (!isPlaying) return;
    
    const currentTime = audioContext.currentTime - audioStartTime;
    const formattedTime = formatTime(currentTime);
    
    document.querySelector('.audio-time').textContent = `${formattedTime} / 0:30`;
    
    if (currentTime < 30) {
        requestAnimationFrame(updateAudioTime);
    } else {
        // Auto-stop after 30 seconds
        if (oscillator) {
            oscillator.stop();
            isPlaying = false;
            playBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    }
}

// Format time as MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Interactive controls
timeScale.addEventListener('input', () => {
    const value = parseInt(timeScale.value);
    let timeCompression;
    
    if (value <= 10) {
        timeCompression = `1:${value} (1 hour = ${60/value} minutes)`;
    } else if (value <= 100) {
        timeCompression = `1:${value} (1 day = ${24/value} hours)`;
    } else {
        timeCompression = `1:${value} (1 year = ${365/value} days)`;
    }
    
    timeScaleValue.textContent = timeCompression;
    
    // Update duration display
    const baseDuration = 12.8;
    const newDuration = baseDuration * (100 / value);
    duration.textContent = `${newDuration.toFixed(1)}s`;
});

previewBtn.addEventListener('click', () => {
    // In a real implementation, this would generate and play a sonification
    // based on the selected parameters
    
    // For this demo, we'll just show a notification
    showNotification('Generating sonification preview... This would create audio based on your selected parameters in a real implementation.', 'info');
    
    // Update frequency range based on selections
    let minFreq, maxFreq;
    
    if (dataParam.value === 'brightness') {
        minFreq = 200;
        maxFreq = 800;
    } else if (dataParam.value === 'temperature') {
        minFreq = 300;
        maxFreq = 1200;
    } else if (dataParam.value === 'density') {
        minFreq = 150;
        maxFreq = 600;
    } else {
        minFreq = 400;
        maxFreq = 1600;
    }
    
    freqRange.textContent = `${minFreq}-${maxFreq} Hz`;
    
    // Update data points based on time scale
    const timeScaleValue = parseInt(timeScale.value);
    const points = Math.floor(1024 * (timeScaleValue / 100));
    dataPoints.textContent = points.toLocaleString();
});

resetBtn.addEventListener('click', () => {
    // Reset all controls to defaults
    dataParam.value = 'brightness';
    soundParam.value = 'pitch';
    mappingType.value = 'linear';
    timeScale.value = 100;
    timeScale.dispatchEvent(new Event('input'));
    
    // Reset displays
    dataPoints.textContent = '1,024';
    duration.textContent = '12.8s';
    freqRange.textContent = '200-1200 Hz';
    
    showNotification('All parameters reset to default values.', 'success');
});

// Show notification
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'warning') icon = 'exclamation-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--card-bg);
        color: var(--text-color);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        border-left: 4px solid var(--accent-color);
        box-shadow: var(--box-shadow);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        max-width: 400px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left-color: var(--success-color);
    }
    
    .notification-warning {
        border-left-color: var(--warning-color);
    }
    
    .notification i {
        font-size: 1.5rem;
    }
    
    .notification-success i {
        color: var(--success-color);
    }
    
    .notification-warning i {
        color: var(--warning-color);
    }
    
    .notification-info i {
        color: var(--accent-color);
    }
`;
document.head.appendChild(style);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('.nav-container').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize on load
window.addEventListener('load', () => {
    initCanvas();
    timeScale.dispatchEvent(new Event('input'));
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav-container');
        if (window.scrollY > 100) {
            nav.style.backgroundColor = 'rgba(10, 17, 40, 0.98)';
            nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.backgroundColor = 'rgba(10, 17, 40, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    initCanvas();
});