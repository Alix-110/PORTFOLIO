import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from matplotlib.patches import Polygon

G = 1.0
M = 1.0
a = 5.0
b = 3.0
T = 20.0
num_points = 500

t = np.linspace(0, T, num_points)
theta = 2 * np.pi * t / T
x = a * np.cos(theta)
y = b * np.sin(theta)
focus_x = -np.sqrt(a**2 - b**2)
focus_y = 0

fig, ax = plt.subplots(figsize=(8, 6))
ax.set_aspect('equal')
ax.set_xlim(-a*1.5, a*1.5)
ax.set_ylim(-a*1.5, a*1.5)
ax.set_title("Kepler's Second Law: Equal Areas in Equal Times")
orbit_line, = ax.plot(x, y, color='gray', linestyle='--', label='Orbit')
ax.plot(focus_x, focus_y, 'yo', markersize=12, label='Star (Focus)')
planet_marker, = ax.plot([], [], 'bo', markersize=8, label='Planet')
swept_area = Polygon([[focus_x, focus_y], [x[0], y[0]]], closed=True, color='orange', alpha=0.3)
ax.add_patch(swept_area)

def animate(i):
    planet_marker.set_data([x[i]], [y[i]])
    swept_area.set_xy(np.vstack([[focus_x, focus_y], np.column_stack((x[:i+1], y[:i+1]))]))
    return planet_marker, swept_area

ani = FuncAnimation(fig, animate, frames=num_points, interval=40, blit=True)
plt.legend()
plt.show()
