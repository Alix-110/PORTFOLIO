import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

plt.style.use("dark_background")


nx, ny = 100, 100
x = np.linspace(-1, 1, nx)
y = np.linspace(-1, 1, ny)
X, Y = np.meshgrid(x, y)
R = np.sqrt(X**2 + Y**2)


times = np.linspace(0.01, 2.0, 100)
E = 1.0    # explosion energy (arbitrary)
rho0 = 1.0 # ambient density

shock_radii = (E * times**2 / rho0)**0.2


def density_field(R, R_shock):
    """
    Simple approximation: inside shock radius -> higher density
    outside -> ambient density
    """
    rho = np.ones_like(R)
    rho[R <= R_shock] = 5.0  # shocked region density factor
    return rho

fig, ax = plt.subplots(figsize=(6,6))
im = ax.imshow(density_field(R, shock_radii[0]), extent=(-1,1,-1,1),
               origin='lower', cmap='plasma', vmin=1, vmax=5)
ax.set_title("Sedov–Taylor Blast Wave")
ax.set_xlabel("X")
ax.set_ylabel("Y")
plt.colorbar(im, ax=ax, label="Density")


def animate(i):
    rho = density_field(R, shock_radii[i])
    im.set_array(rho)
    return [im]

ani = FuncAnimation(fig, animate, frames=len(times), interval=50, blit=True)
plt.show()
