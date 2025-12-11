import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Circle
from matplotlib.animation import FuncAnimation

# ================================
# PARAMETERS (change these)
# ================================
R1 = 0.18          # radius of star 1 (normalized units)
R2 = 0.12          # radius of star 2
a = 0.7            # orbital semi-major axis (center-to-center max proj distance when face-on)
period = 1.0       # orbital period (arbitrary units)
incl_deg = 85.0    # inclination in degrees (90 = edge-on -> strongest eclipses)
num_frames = 800
fps_interval = 20  # ms per frame

# ================================
# Derived quantities
# ================================
incl = np.deg2rad(incl_deg)
omega = 2 * np.pi / period
t = np.linspace(0, period, num_frames)

# For circular binaries, the two stars orbit their barycenter.
# Choose mass ratio so semi-major axes sum to a (approx); for simplicity use equal masses:
m1 = 1.0
m2 = 1.0
a1 = a * (m2 / (m1 + m2))  # star1 orbit radius around barycenter
a2 = a * (m1 / (m1 + m2))  # star2

# ================================
# Geometry / projection
# ================================
def positions_at_time(theta):
    # positions in orbital plane (x_orbit, y_orbit)
    x1 =  a1 * np.cos(theta)
    y1 =  a1 * np.sin(theta)
    x2 = -a2 * np.cos(theta)
    y2 = -a2 * np.sin(theta)
    # rotate by inclination about x-axis to get projected sky-plane coordinates:
    # observer along +z, so sky-plane coords are (x, y_proj = y * cos(i))
    y1p = y1 * np.cos(incl)
    y2p = y2 * np.cos(incl)
    return np.array([x1, y1p]), np.array([x2, y2p])

# ================================
# Circle overlap area (two disks) - uniform brightness disks
# ================================
def circle_overlap_area(r1, r2, d):
    # returns overlap area between two circles of radii r1, r2 separated by distance d
    if d >= r1 + r2:
        return 0.0
    if d <= abs(r1 - r2):
        # one circle fully inside the other
        return np.pi * min(r1, r2)**2
    # general case
    r1sq = r1**2
    r2sq = r2**2
    alpha = np.arccos( (d**2 + r1sq - r2sq) / (2 * d * r1) )
    beta  = np.arccos( (d**2 + r2sq - r1sq) / (2 * d * r2) )
    area = r1sq * alpha + r2sq * beta - 0.5 * np.sqrt( max(0.0, (-d + r1 + r2)*(d + r1 - r2)*(d - r1 + r2)*(d + r1 + r2)) )
    return area

# ================================
# Compute light curve (normalized)
# ================================
total_surface = np.pi * R1**2 + np.pi * R2**2
flux = np.zeros_like(t)
pos1s = []
pos2s = []

for idx, tt in enumerate(t):
    theta = omega * tt
    p1, p2 = positions_at_time(theta)
    pos1s.append(p1)
    pos2s.append(p2)
    d = np.linalg.norm(p1 - p2)  # projected center separation in sky plane
    overlap = circle_overlap_area(R1, R2, d)
    visible = total_surface - overlap  # area visible to observer (blocked part subtracted)
    flux[idx] = visible / total_surface

# ================================
# Set up Matplotlib figure (dark NASA-style)
# ================================
plt.style.use('dark_background')
fig, (ax_left, ax_right) = plt.subplots(1, 2, figsize=(12, 6), gridspec_kw={'width_ratios':[1,1]})
fig.suptitle("Eclipsing Binary Light Curve — Projected View & Observed Flux", color='#ffd86b', fontsize=16)

# left: projected sky view
ax_left.set_title("Projected Sky View (observer at +z)", color='white')
ax_left.set_aspect('equal')
margin = 1.2 * (a + max(R1, R2))
ax_left.set_xlim(-margin, margin)
ax_left.set_ylim(-margin, margin)
ax_left.grid(False)
ax_left.tick_params(colors='gray')
ax_left.set_facecolor('#05060a')

# create circles (patches)
star1_patch = Circle((0,0), R1, color='#ffcc66', ec='#ffd86b', zorder=3, alpha=1.0)
star2_patch = Circle((0,0), R2, color='#88c2ff', ec='#9fd0ff', zorder=2, alpha=0.95)
ax_left.add_patch(star1_patch)
ax_left.add_patch(star2_patch)

# mark centers
c1, = ax_left.plot([], [], marker='o', color='#ffd86b', markersize=4)
c2, = ax_left.plot([], [], marker='o', color='#9fd0ff', markersize=4)

# right: light curve
ax_right.set_title("Normalized Flux (observed)", color='white')
ax_right.set_xlim(t[0], t[-1])
ax_right.set_ylim(np.min(flux)*0.98, 1.01)
ax_right.set_xlabel("Time (orbital units)")
ax_right.set_ylabel("Normalized Flux")
ax_right.grid(alpha=0.2)
ax_right.set_facecolor('#02030a')

flux_line, = ax_right.plot([], [], color='#76ff7a', lw=2)
time_marker, = ax_right.plot([], [], marker='o', color='#ffd86b')

# optional text info
info_text = ax_left.text(0.02, 0.95, '', transform=ax_left.transAxes, color='white', fontsize=10,
                         bbox=dict(facecolor='#00000040', edgecolor='#ffffff22'))

# ================================
# Animation
# ================================
pos1s = np.array(pos1s)
pos2s = np.array(pos2s)

def init():
    flux_line.set_data([], [])
    time_marker.set_data([], [])
    star1_patch.set_center((pos1s[0,0], pos1s[0,1]))
    star2_patch.set_center((pos2s[0,0], pos2s[0,1]))
    c1.set_data([pos1s[0,0]], [pos1s[0,1]])
    c2.set_data([pos2s[0,0]], [pos2s[0,1]])
    info_text.set_text(f"R1={R1:.2f}, R2={R2:.2f}\nincl={incl_deg:.1f}°")
    return star1_patch, star2_patch, c1, c2, flux_line, time_marker, info_text

def animate(i):
    # update patches centers
    x1, y1 = pos1s[i]
    x2, y2 = pos2s[i]
    star1_patch.set_center((x1, y1))
    star2_patch.set_center((x2, y2))
    c1.set_data([x1], [y1])
    c2.set_data([x2], [y2])

    # update flux plot
    flux_line.set_data(t[:i+1], flux[:i+1])
    time_marker.set_data([t[i]], [flux[i]])

    # update info
    info_text.set_text(f"R1={R1:.2f}, R2={R2:.2f}\nincl={incl_deg:.1f}°\nflux={flux[i]:.4f}")

    return star1_patch, star2_patch, c1, c2, flux_line, time_marker, info_text

ani = FuncAnimation(fig, animate, frames=len(t), init_func=init, interval=fps_interval, blit=True)
plt.tight_layout()
plt.show()
