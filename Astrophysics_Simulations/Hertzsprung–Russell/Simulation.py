import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# ----------------------------
# DARK SPACE STYLE
# ----------------------------
plt.style.use("dark_background")

# ----------------------------
# SYNTHETIC STAR CLUSTER
# ----------------------------
np.random.seed(42)  # reproducibility
n_stars = 200

# Surface temperatures (K) — 2500K to 40000K
temperatures = np.random.uniform(2500, 40000, n_stars)

# Luminosity (L/L_sun) using a simple power law L ~ T^4 for main sequence
luminosities = (temperatures / 5778) ** 4 * np.random.uniform(0.5, 1.5, n_stars)

# Assign spectral color approximations based on temperature
def temp_to_rgb(T):
    if T < 3500: return "#ff5b3a"  # red
    if T < 5000: return "#ffb25b"  # orange
    if T < 6500: return "#fff4d6"  # yellow-white
    if T < 9000: return "#cce0ff"  # white-blue
    return "#9bb7ff"               # deep blue

colors = [temp_to_rgb(T) for T in temperatures]

# Assign marker sizes proportional to luminosity
sizes = np.clip(luminosities / np.max(luminosities) * 200, 5, 200)

# ----------------------------
# CREATE PANDAS DATAFRAME
# ----------------------------
df = pd.DataFrame({
    'Temperature (K)': temperatures,
    'Luminosity (L/L_sun)': luminosities,
    'Color': colors,
    'Size': sizes
})

# ----------------------------
# PLOT H-R DIAGRAM
# ----------------------------
fig, ax = plt.subplots(figsize=(10, 7))

scatter = ax.scatter(df['Temperature (K)'], df['Luminosity (L/L_sun)'],
                     c=df['Color'], s=df['Size'], alpha=0.8, edgecolors='w', linewidth=0.3)

ax.set_yscale('log')
ax.set_xscale('log')

ax.set_xlabel("Temperature (K)")
ax.set_ylabel("Luminosity (L/L_sun)")
ax.set_title("Synthetic H-R Diagram — Stellar Cluster")

# Invert x-axis: hot stars on left
ax.set_xlim(ax.get_xlim()[::-1])

plt.tight_layout()
plt.show()
