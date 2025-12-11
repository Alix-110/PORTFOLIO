import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# ------------------------
# Star and planet parameters
# ------------------------
R_star = 1.0           # normalized radius of star
R_planet = 0.1         # radius of planet (can change)
impact_param = 0.2     # vertical offset of transit (0 = center)

# Time array for transit
t = np.linspace(-1.5, 1.5, 500)  # normalized units

# Star brightness (normalized to 1.0)
brightness = np.ones_like(t)

# Function to compute flux drop
def flux_drop(x):
    # distance from planet center to star center
    d = np.sqrt(x**2 + impact_param**2)
    # simple approximation: total eclipse if planet fully in front
    drop = np.zeros_like(x)
    inside = d < R_star + R_planet
    drop[inside] = (R_planet**2 / R_star**2) * (1 - (d[inside] / (R_star + R_planet)))
    return drop

# Precompute brightness during transit
brightness -= flux_drop(t)

# ------------------------
# Animation
# ------------------------
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(8,8), gridspec_kw={'height_ratios':[1,1]})
fig.suptitle("Planet Transit Light Curve Simulation", fontsize=16, fontweight='bold')

# Star plot (top)
star_circle = plt.Circle((0,0), R_star, color='yellow', ec='orange')
planet_dot, = ax1.plot([], [], 'o', color='blue', markersize=20)
ax1.add_patch(star_circle)
ax1.set_xlim(-1.5, 1.5)
ax1.set_ylim(-1.2, 1.2)
ax1.set_aspect('equal')
ax1.set_title("Star and Planet Transit")
ax1.axis('off')

# Light curve plot (bottom)
ax2.set_xlim(t[0], t[-1])
ax2.set_ylim(0.85, 1.01)
ax2.set_xlabel("Time (normalized)")
ax2.set_ylabel("Normalized Brightness")
ax2.set_title("Observed Stellar Brightness")
line_curve, = ax2.plot([], [], color='red', lw=2)

# Animation function
def animate(i):
    x_pos = t[i]
    planet_dot.set_data([x_pos], [impact_param])  # wrap in lists!
    line_curve.set_data(t[:i+1], brightness[:i+1])
    return planet_dot, line_curve

ani = FuncAnimation(fig, animate, frames=len(t), interval=30, blit=True)
plt.tight_layout()
plt.show()
