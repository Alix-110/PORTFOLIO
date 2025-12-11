import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# ------------------------
# Constants (normalized units)
# ------------------------
G = 1.0
M_sun = 1.0
dt = 0.001
num_steps = 6000

# Semi-major axis and eccentricity of Mercury-like orbit
a = 0.39  # AU
e = 0.205
rel_corr = 1e-5  # small relativistic correction

# Initial position at perihelion
r = np.array([a*(1 - e), 0.0])
# Initial velocity perpendicular to r for ellipse
v = np.array([0.0, np.sqrt(G*M_sun*(1+e)/(a*(1-e)))])

# Store orbit positions
positions = [r.copy()]

# ------------------------
# Acceleration function (Newtonian + small relativistic correction)
# ------------------------
def acceleration(pos):
    r_vec = pos
    r_mag = np.linalg.norm(r_vec)
    # Relativistic correction term (simplified)
    correction = 1 + rel_corr / r_mag**2
    a_vec = -G*M_sun * r_vec / r_mag**3 * correction
    return a_vec

# ------------------------
# Prepare plot
# ------------------------
fig, ax = plt.subplots(figsize=(8,8))
ax.set_facecolor('black')
ax.set_xlim(-0.5, 0.5)
ax.set_ylim(-0.5, 0.5)
ax.set_aspect('equal')
ax.set_title("Precession of Mercury's Perihelion", color='white')

# Sun
sun_dot, = ax.plot(0, 0, 'yo', markersize=12, label='Sun')

# Orbit line
orbit_line, = ax.plot([], [], 'c-', lw=1.5, label='Orbit')

# ------------------------
# Animation function
# ------------------------
def animate(i):
    global r, v, positions
    a_vec = acceleration(r)
    v += a_vec * dt
    r += v * dt
    positions.append(r.copy())

    pos_arr = np.array(positions)
    orbit_line.set_data(pos_arr[:,0], pos_arr[:,1])
    return orbit_line,

ani = FuncAnimation(fig, animate, frames=num_steps, interval=20, blit=True)
ax.legend(facecolor='black', framealpha=0.5, edgecolor='white', labelcolor='white')
plt.show()
