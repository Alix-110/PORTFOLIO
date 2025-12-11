import numpy as np
import matplotlib.pyplot as plt


plt.style.use("dark_background")


t = np.linspace(0, 100, 500)  # days

rise_ia = 20  # days to peak
decay_ia = 30  # decay timescale

lum_ia = np.piecewise(t, [t < rise_ia, t >= rise_ia],
                      [lambda t: t / rise_ia, 
                       lambda t: np.exp(-(t-rise_ia)/decay_ia)])


rise_ii = 30  # days to peak
decay_ii = 50  # decay timescale

# Type II has a plateau phase after peak
lum_ii = np.piecewise(t, [t < rise_ii, (t >= rise_ii) & (t <= rise_ii + 20), t > rise_ii + 20],
                      [lambda t: t / rise_ii,
                       1.0, 
                       lambda t: np.exp(-(t-(rise_ii+20))/decay_ii)])


fig, ax = plt.subplots(figsize=(10,6))
ax.plot(t, lum_ia, label='Type Ia', color='#00ffff', linewidth=2)
ax.plot(t, lum_ii, label='Type II', color='#ff7f50', linewidth=2)

ax.set_xlabel("Time (days)")
ax.set_ylabel("Normalized Luminosity")
ax.set_title("Supernova Light Curves: Type Ia vs Type II")
ax.legend()
ax.grid(alpha=0.3)

plt.show()
