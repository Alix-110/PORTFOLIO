import numpy as np
import matplotlib.pyplot as plt

# -----------------------
# CONSTANTS
# -----------------------
h = 6.626e-34      # Planck constant (J*s)
c = 3e8            # Speed of light (m/s)
k = 1.381e-23      # Boltzmann constant (J/K)

# -----------------------
# WAVELENGTH RANGE (1 nm → 3000 nm)
# -----------------------
lam = np.linspace(1e-9, 3e-6, 1000)

# -----------------------
# TEMPERATURES TO PLOT
# -----------------------
temperatures = [3000, 4500, 5800, 10000]

# -----------------------
# BLACKBODY FUNCTION
# -----------------------
def planck(lam, T):
    return (2*h*c**2) / (lam**5 * (np.exp((h*c)/(lam*k*T)) - 1))

# -----------------------
# WIEN PEAK
# -----------------------
def wien_peak(T):
    b = 2.897e-3  # Wien constant
    return b / T

# -----------------------
# SIMPLE STAR COLOR APPROX
# -----------------------
def temp_to_rgb(T):
    if T < 3500: return "#ff5b3a"   # red
    if T < 5000: return "#ffb25b"   # orange
    if T < 6500: return "#fff4d6"   # warm white
    if T < 9000: return "#cce0ff"   # white-blue
    return "#9bb7ff"                # deep blue

# -----------------------
# MATPLOTLIB STYLE (SAFE)
# -----------------------
plt.style.use("ggplot")

# -----------------------
# FIGURE LAYOUT
# -----------------------
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

# -----------------------
# BLACKBODY CURVES PANEL
# -----------------------
for T in temperatures:
    B = planck(lam, T)
    rgb = temp_to_rgb(T)

    ax1.plot(lam * 1e9, B, color=rgb, label=f"{T} K")

    peak = wien_peak(T)
    ax1.axvline(peak * 1e9, color=rgb, linestyle="--", alpha=0.6)

ax1.set_title("Blackbody Radiation Curves")
ax1.set_xlabel("Wavelength (nm)")
ax1.set_ylabel("Intensity")
ax1.set_xlim(0, 3000)
ax1.legend()

# -----------------------
# COLOR PANEL
# -----------------------
ax2.set_title("Star Colors by Temperature")

for i, T in enumerate(temperatures):
    rgb = temp_to_rgb(T)
    ax2.barh(i, 1, color=rgb)
    ax2.text(0.5, i, f"{T} K", ha="center", va="center", fontsize=12)

ax2.set_xlim(0, 1)
ax2.set_xticks([])
ax2.set_yticks([])

plt.tight_layout()
plt.show()
