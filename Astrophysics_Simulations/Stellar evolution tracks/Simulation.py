import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation


plt.style.use("dark_background")


temps = np.concatenate([
    np.linspace(10000, 5800, 50),  # main sequence cooling
    np.linspace(5800, 4000, 50),   # subgiant
    np.linspace(4000, 3500, 50)    # red giant
])

luminosities = np.concatenate([
    np.linspace(1, 1, 50),         # main sequence (constant)
    np.linspace(1, 100, 50),       # subgiant (rising)
    np.linspace(100, 1000, 50)     # red giant (very bright)
])


fig, ax = plt.subplots(figsize=(10, 7))
ax.set_yscale('log')
ax.set_xscale('log')
ax.set_xlim(max(temps), min(temps))  # invert x-axis
ax.set_ylim(min(luminosities)*0.8, max(luminosities)*1.2)
ax.set_xlabel("Temperature (K)")
ax.set_ylabel("Luminosity (L/L_sun)")
ax.set_title("Stellar Evolution Track Animation")

# Plot static track (light gray)
ax.plot(temps, luminosities, color='gray', linestyle='--', alpha=0.5)


# Animated star marker
star_marker, = ax.plot([], [], 'o', color='yellow', markersize=12)

# Trail for star
trail, = ax.plot([], [], color='yellow', alpha=0.5)

# Animation function
def animate(i):
    star_marker.set_data([temps[i]], [luminosities[i]])  # <-- wrap in list
    trail.set_data(temps[:i+1], luminosities[:i+1])
    return star_marker, trail

ani = FuncAnimation(fig, animate, frames=len(temps), interval=100, blit=True)
plt.show()
