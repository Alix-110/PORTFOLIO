import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation


moon_radius = 0.3
sun_radius = 1.0

# Orbital parameters
orbital_period = 29.53  # days
num_frames = 100        # Number of frames in animation

# Moon positions in orbit (0 to 2*pi radians)
theta = np.linspace(0, 2 * np.pi, num_frames)

# Figure and axis setup
fig, ax = plt.subplots(figsize=(6,6))
ax.set_aspect('equal')
ax.set_xlim(-2, 2)
ax.set_ylim(-2, 2)
ax.set_facecolor("black")
ax.axis('off')

# Plot Earth at origin
earth = plt.Circle((0, 0), 0.5, color='blue', label='Earth')
ax.add_patch(earth)

# Sun light direction (fixed on the right)
sun_x, sun_y = 5, 0
ax.plot(sun_x, sun_y, 'yo', markersize=15, label='Sun')

# Moon initialization
moon = plt.Circle((0,0), moon_radius, color='gray')
ax.add_patch(moon)

def animate(i):
    """
    Update Moon's position and illuminated portion for each frame
    """
    ax.patches[-1].remove()  # Remove previous Moon

    # Moon position along circular orbit around Earth
    x = np.cos(theta[i])
    y = np.sin(theta[i])

    # Phase calculation
    # Dot product between Moon-Sun vector and Moon-Earth vector
    moon_sun_vector = np.array([sun_x - x, sun_y - y])
    moon_earth_vector = np.array([-x, -y])
    phase_angle = np.arccos(
        np.clip(
            np.dot(moon_sun_vector, moon_earth_vector) /
            (np.linalg.norm(moon_sun_vector) * np.linalg.norm(moon_earth_vector)),
            -1, 1
        )
    )

    # Brightness fraction (0 = new moon, 1 = full moon)
    illumination = 0.5 * (1 + np.cos(phase_angle))

    # Draw Moon with illuminated portion
    moon = plt.Circle((x, y), moon_radius, color='gray')
    ax.add_patch(moon)

    # Overlay illuminated fraction
    illum = plt.Circle((x, y), moon_radius, color='white', alpha=illumination)
    ax.add_patch(illum)

    return ax.patches


ani = FuncAnimation(fig, animate, frames=num_frames, interval=100, blit=False)



plt.show()
