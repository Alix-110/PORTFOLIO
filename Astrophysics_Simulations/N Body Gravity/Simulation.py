import numpy as np
from vpython import sphere, vector, rate, color

G = 1.0  # Gravitational constant
dt = 0.01  # time step
num_steps = 5000

# Initialize masses (arbitrary units)
masses = np.array([1.0, 1.0, 1.0])

# Initial positions (x, y, z)
positions = np.array([
    [ -1.0, 0.0, 0.0],
    [  1.0, 0.0, 0.0],
    [  0.0, 1.0, 0.0]
], dtype=float)

# Initial velocities
velocities = np.array([
    [0.0, 0.3, 0.0],
    [0.0, -0.3, 0.0],
    [-0.3, 0.0, 0.0]
], dtype=float)

# VPython spheres for visualization
colors_list = [color.red, color.green, color.blue]
bodies = [sphere(pos=vector(*positions[i]), radius=0.1, color=colors_list[i], make_trail=True) for i in range(3)]

def compute_accelerations(pos, masses):
    n = len(pos)
    acc = np.zeros_like(pos)
    for i in range(n):
        for j in range(n):
            if i != j:
                r_vec = pos[j] - pos[i]
                r_mag = np.linalg.norm(r_vec)
                acc[i] += G * masses[j] * r_vec / r_mag**3
    return acc

for step in range(num_steps):
    rate(100)
    a = compute_accelerations(positions, masses)
    velocities += a * dt
    positions += velocities * dt
    for i in range(3):
        bodies[i].pos = vector(*positions[i])
