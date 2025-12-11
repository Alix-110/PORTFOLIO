import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# ------------------------
# Constants (normalized)
# ------------------------
G = 1.0
M_star = 1.0
planet_mass = 0.002  # Jupiter ~0.001, this bigger for visibility
a = 1.0              # planet orbit radius

# Orbital period from Kepler's 3rd law
period = 2 * np.pi * np.sqrt(a**3 / (G * (M_star + planet_mass)))
omega = 2 * np.pi / period

# Time array
t = np.linspace(0, 2 * period, 600)

# Orbital positions
planet_x = a * np.cos(omega * t)
planet_y = a * np.sin(omega * t)

# Star wobbles opposite direction
star_x = -(planet_mass / M_star) * planet_x
star_y = -(planet_mass / M_star) * planet_y

# Radial velocity (line of sight)
rv = (planet_mass / (M_star + planet_mass)) * a * omega * np.sin(omega * t)

# ------------------------
# Plot setup
# ------------------------
plt.style.use("dark_background")
fig, (ax_orbit, ax_rv) = plt.subplots(1, 2, figsize=(12, 6))

# Orbit plot
ax_orbit.set_title("Star–Planet Orbit (Top View)")
ax_orbit.set_aspect("equal")
ax_orbit.set_xlim(-1.5, 1.5)
ax_orbit.set_ylim(-1.5, 1.5)

planet_dot, = ax_orbit.plot([], [], 'o', color='cyan', markersize=10)
star_dot,   = ax_orbit.plot([], [], 'o', color='yellow', markersize=12)

orbit_trail, = ax_orbit.plot([], [], color='white', linewidth=1, alpha=0.5)

# Radial velocity curve
ax_rv.set_title("Radial Velocity Curve")
ax_rv.set_xlim(t[0], t[-1])
ax_rv.set_ylim(-1.2 * max(rv), 1.2 * max(rv))
ax_rv.set_xlabel("Time")
ax_rv.set_ylabel("Radial Velocity")

rv_line, = ax_rv.plot([], [], color='lime', linewidth=2)

# ------------------------
# Animation function
# ------------------------
def animate(i):
    # Update orbit positions
    planet_dot.set_data([planet_x[i]], [planet_y[i]])
    star_dot.set_data([star_x[i]], [star_y[i]])

    # Trail of planet
    orbit_trail.set_data(planet_x[:i+1], planet_y[:i+1])

    # RV curve
    rv_line.set_data(t[:i+1], rv[:i+1])

    return planet_dot, star_dot, orbit_trail, rv_line

ani = FuncAnimation(fig, animate, frames=len(t), interval=20, blit=True)
plt.tight_layout()
plt.show()
