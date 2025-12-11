import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

# =================================================
# 1. Constants and Parameters (SI units)
# =================================================
G = 6.67430e-11            # gravitational constant, m^3 kg^-1 s^-2
M_sun = 1.989e30           # mass of the Sun, kg

# Time settings
dt = 6 * 3600              # time-step: 6 hours in seconds
total_time = 365.25 * 24 * 3600  # one Julian year (approx) in seconds
steps = int(total_time / dt)

# Animation settings
anim_interval_ms = 20      # time between frames in milliseconds (for animation playback)
trail_length = None        # how many past positions to draw for each planet (None = full trail)

# =================================================
# 2. Planet initial data
# =================================================
# We store each planet's state as a dictionary. Variables:
#  r0 : initial orbital radius (m), approximate semi-major axis for near-circular orbits
#  v0 : initial tangential speed (m/s), near circular orbital speed approximation
#  x, y, vx, vy : dynamic state variables (m, m/s)
#  xs, ys : arrays storing trajectory for plotting
planets = {
    "Earth": {
        "r0": 1.496e11,    # semi-major axis ~ 1 AU in meters
        "v0": 29.78e3,     # average orbital speed m/s
        "color": "cyan"
    },
    "Mars": {
        "r0": 2.279e11,    # semi-major axis for Mars
        "v0": 24.077e3,    # approximate orbital speed for Mars
        "color": "orange"
    }
}

# Initialize position and velocity for each planet.
# We place planets on +x axis at t=0, with velocity in +y (counter-clockwise orbit).
for p in planets.values():
    p["x"] = p["r0"]
    p["y"] = 0.0
    p["vx"] = 0.0
    p["vy"] = p["v0"]

    p["xs"] = []   # list to collect x positions over time
    p["ys"] = []   # list to collect y positions over time

# =================================================
# 3. Helper: compute acceleration from Sun at position (x, y)
# =================================================
def acceleration_from_sun(x, y, G=G, M=M_sun):
    """
    Compute gravitational acceleration vector (ax, ay) from the Sun located at origin.
    Uses Newton's law of universal gravitation:
        a = - G * M / r^3 * r_vector
    where r_vector = (x, y) and r = sqrt(x^2 + y^2).

    Returns:
        ax, ay in m/s^2
    """
    r2 = x * x + y * y
    r = np.sqrt(r2)
    # Avoid division by zero in case a planet reaches r ~ 0 (physically impossible here)
    if r == 0:
        return 0.0, 0.0
    factor = -G * M / (r2 * r)  # equals -G*M / r^3
    ax = factor * x
    ay = factor * y
    return ax, ay

# =================================================
# 4. Integrator: Velocity-Verlet
# =================================================
# Velocity-Verlet is a symplectic integrator that conserves energy better than plain Euler,
# and is a good choice for long-term orbital simulations.
#
# Algorithm (single step, dt):
#   a_n = a(x_n)
#   x_{n+1} = x_n + v_n * dt + 0.5 * a_n * dt^2
#   a_{n+1} = a(x_{n+1})
#   v_{n+1} = v_n + 0.5 * (a_n + a_{n+1}) * dt
#
# We'll run the integrator for the specified number of steps and store positions.

for step in range(steps):
    # For each planet, compute one velocity-verlet step
    for p in planets.values():
        # current acceleration based on current position
        ax, ay = acceleration_from_sun(p["x"], p["y"])

        # update positions (x_{n+1})
        x_new = p["x"] + p["vx"] * dt + 0.5 * ax * dt * dt
        y_new = p["y"] + p["vy"] * dt + 0.5 * ay * dt * dt

        # compute new acceleration a(x_{n+1})
        ax_new, ay_new = acceleration_from_sun(x_new, y_new)

        # update velocities (v_{n+1})
        vx_new = p["vx"] + 0.5 * (ax + ax_new) * dt
        vy_new = p["vy"] + 0.5 * (ay + ay_new) * dt

        # commit new state
        p["x"], p["y"], p["vx"], p["vy"] = x_new, y_new, vx_new, vy_new

        # store for plotting
        p["xs"].append(p["x"])
        p["ys"].append(p["y"])

# =================================================
# 5. Static checks (optional): print final orbital radii and approximate periods
# =================================================
def radial_distance_history(p):
    arr = np.sqrt(np.array(p["xs"])**2 + np.array(p["ys"])**2)
    return arr

print("Simulation complete. Summary (final values):")
for name, p in planets.items():
    r_final = np.sqrt(p["x"]**2 + p["y"]**2)
    print(f" - {name}: final r = {r_final:.3e} m, steps simulated = {len(p['xs'])}")

# =================================================
# 6. Animation (matplotlib)
# =================================================
# Create a dark-themed plot and animate planet positions and their trails.

fig, ax = plt.subplots(figsize=(7,7))
ax.set_facecolor("black")
ax.set_aspect("equal", adjustable="box")

# set axis limits to comfortably show Mars orbit (and some margin)
orbit_limit = 2.5e11
ax.set_xlim(-orbit_limit, orbit_limit)
ax.set_ylim(-orbit_limit, orbit_limit)

# Title and labels with white color for dark background
ax.set_title("Sun — Earth — Mars Orbits (Velocity-Verlet)", color="white", fontsize=14, pad=12)
ax.tick_params(colors="white")
for spine in ax.spines.values():
    spine.set_color("white")

# Draw Sun
sun_dot = ax.scatter(0, 0, color="yellow", s=300, zorder=3, label="Sun")

# Create plot objects for planets
planet_dots = {}
planet_paths = {}
for name, p in planets.items():
    dot, = ax.plot([], [], "o", color=p["color"], ms=7, label=name, zorder=4)
    path, = ax.plot([], [], "-", color=p["color"], lw=1, alpha=0.8)
    planet_dots[name] = dot
    planet_paths[name] = path

# Legend - style for dark theme
leg = ax.legend(facecolor="#222222", edgecolor="white", labelcolor="white")
for text in leg.get_texts():
    text.set_color("white")

# Initialization function for animation
def init():
    for name in planets:
        planet_dots[name].set_data([], [])
        planet_paths[name].set_data([], [])
    return list(planet_dots.values()) + list(planet_paths.values())

# Update function: for frame i, draw planet positions at step i
def update(frame):
    for name, p in planets.items():
        xs = p["xs"]
        ys = p["ys"]
        N = len(xs)
        if frame >= N:
            idx = N - 1
        else:
            idx = frame

        # If trail_length is set, show only the last N_trail positions
        if trail_length is None:
            trail_xs = xs[:idx+1]
            trail_ys = ys[:idx+1]
        else:
            trail_xs = xs[max(0, idx-trail_length+1):idx+1]
            trail_ys = ys[max(0, idx-trail_length+1):idx+1]

        planet_dots[name].set_data([xs[idx]], [ys[idx]])
        planet_paths[name].set_data(trail_xs, trail_ys)

    return list(planet_dots.values()) + list(planet_paths.values())

# Create the animation object
ani = animation.FuncAnimation(fig, update, frames=steps, init_func=init,
                              blit=True, interval=anim_interval_ms)

# Optional: To save the animation to a file uncomment one of the following lines.
# Saving requires ffmpeg (for mp4) or pillow (for gif). Uncomment only if ffmpeg/pillow is set up.
# ani.save("earth_mars_orbits.mp4", writer="ffmpeg", fps=30, dpi=200)
# ani.save("earth_mars_orbits.gif", writer="pillow", fps=30)

plt.show()
