import numpy as np
import matplotlib.pyplot as plt

G = 1.0
M1 = 1.0  # Mass of star 1
M2 = 0.5  # Mass of star 2
d = 2.0   # Separation distance
omega = np.sqrt(G * (M1 + M2) / d**3)  # Angular velocity of binary

# Grid for x, y
x = np.linspace(-2.5, 2.5, 400)
y = np.linspace(-2.5, 2.5, 400)
X, Y = np.meshgrid(x, y)

# Positions of stars
x1, y1 = -M2 * d / (M1 + M2), 0
x2, y2 = M1 * d / (M1 + M2), 0

# Gravitational potential + centrifugal term
def potential(X, Y):
    r1 = np.sqrt((X - x1)**2 + (Y - y1)**2)
    r2 = np.sqrt((X - x2)**2 + (Y - y2)**2)
    Phi = -G*M1/r1 - G*M2/r2 - 0.5*omega**2*((X)**2 + (Y)**2)
    return Phi

Phi = potential(X, Y)

# Plot contour map
plt.figure(figsize=(8,6))
contours = plt.contour(X, Y, Phi, levels=50, cmap='plasma')
plt.clabel(contours, inline=True, fontsize=8)
plt.plot(x1, y1, 'yo', label='Star 1')
plt.plot(x2, y2, 'ro', label='Star 2')
plt.title("Roche Lobes / Gravitational Potential Contour")
plt.xlabel("X")
plt.ylabel("Y")
plt.legend()
plt.gca().set_aspect('equal')
plt.show()
