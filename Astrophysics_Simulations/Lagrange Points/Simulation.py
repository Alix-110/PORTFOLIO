import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# ------------------------
# Constants (normalized units)
# ------------------------
G = 1.0
M_sun = 1.0
M_earth = 3e-6
d = 1.0  # Sun-Earth distance
dt = 0.002
num_steps = 2000

# ------------------------
# Positions of Sun and Earth
# ------------------------
r_sun = np.array([0.0, 0.0])
r_earth = np.array([d, 0.0])

# ------------------------
# Approximate Lagrange points
# ------------------------
x4, y4 = 0.5*d, np.sqrt(3)/2*d  # L4
x5, y5 = 0.5*d, -np.sqrt(3)/2*d  # L5

# ------------------------
# Pre-marked orbit around L4 (circular for illustration)
# ------------------------
orbit_radius = 0.05  # small orbit around L4
theta = np.linspace(0, 2*np.pi, 300)
orbit_x = x4 + orbit_radius * np.cos(theta)
orbit_y = y4 + orbit_radius * np.sin(theta)

# ------------------------
# Initialize test particle on orbit
# ------------------------
particle_pos = np.array([orbit_x[0], orbit_y[0]])
particle_index = 0  # index along orbit
trail = [particle_pos.copy()]

# ------------------------
# Prepare plot
# ------------------------
fig, ax = plt.subplots(figsize=(8,8))
ax.set_facecolor('black')  # dark space background
ax.set_xlim(-0.2, 1.2)
ax.set_ylim(-0.2, 1.2)
ax.set_aspect('equal')
ax.set_title("Sun-Earth L4 Lagrange Orbit Simulation", color='white')

# Sun and Earth
sun_dot, = ax.plot(r_sun[0], r_sun[1], 'yo', markersize=12, label='Sun')
earth_dot, = ax.plot(r_earth[0], r_earth[1], 'bo', markersize=8, label='Earth')

# Lagrange points
l4_dot, = ax.plot(x4, y4, 'r*', markersize=10, label='L4 Point')
l5_dot, = ax.plot(x5, y5, 'r*', markersize=10, label='L5 Point')

# Orbit path (pre-marked)
orbit_line, = ax.plot(orbit_x, orbit_y, 'w--', lw=1, alpha=0.5, label='Planned Orbit')

# Particle and trail
particle_dot, = ax.plot([], [], 'co', markersize=6, label='Telescope/Probe')
trail_line, = ax.plot([], [], 'c-', lw=1)

ax.legend(facecolor='black', framealpha=0.7, edgecolor='white', labelcolor='white')

# ------------------------
# Animation function
# ------------------------
def animate(i):
    global particle_index, particle_pos, trail
    particle_index = (particle_index + 1) % len(orbit_x)
    particle_pos = np.array([orbit_x[particle_index], orbit_y[particle_index]])
    trail.append(particle_pos.copy())
    trail_arr = np.array(trail)

    particle_dot.set_data([particle_pos[0]], [particle_pos[1]])
    trail_line.set_data(trail_arr[:,0], trail_arr[:,1])
    return particle_dot, trail_line

# ------------------------
# Run animation
# ------------------------
ani = FuncAnimation(fig, animate, frames=num_steps, interval=20, blit=True)
plt.show()
