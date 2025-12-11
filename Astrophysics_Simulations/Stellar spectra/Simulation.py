import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from scipy.signal import fftconvolve

# ------------------------
# Physical / simulation params
# ------------------------
c_kms = 299792.458           # speed of light in km/s

# Wavelength range (nm)
lam_min = 500.0
lam_max = 600.0
n_wave = 3000
wave = np.linspace(lam_min, lam_max, n_wave)

# Intrinsic stellar absorption lines (center in nm, depth (0..1), intrinsic FWHM in km/s)
line_centers = np.array([517.0, 532.5, 545.0, 580.0])   # example lines
line_depths  = np.array([0.25, 0.18, 0.22, 0.28])
line_fwhm_kms = np.array([8.0, 6.0, 7.0, 9.0])         # intrinsic thermal/instrument widths

# Rotation & Doppler parameters
v_rot_kms = 40.0         # equatorial rotation velocity producing line broadening (km/s)
v_rad_amp = 30.0         # radial velocity semi-amplitude (km/s)
period = 10.0            # arbitrary time units for one full RV cycle
inclination_deg = 60.0   # inclination of the rotation axis (affects projected v_rot if desired)

# Animation time
frames = 600
t = np.linspace(0, period, frames)

# Radial velocity curve (simple sinusoidal)
omega = 2 * np.pi / period
v_rad = v_rad_amp * np.sin(omega * t)  # km/s

# ------------------------
# Utility: create normalized continuum with absorption lines
# ------------------------
def gaussian(x, mu, sigma):
    return np.exp(-0.5 * ((x - mu) / sigma)**2)

def fwhm_kms_to_sigma_nm(fwhm_kms, lam0_nm):
    # Convert FWHM in km/s to Gaussian sigma in nm
    # FWHM (nm) = lam0 * (FWHM_kms / c_kms)
    fwhm_nm = lam0_nm * (fwhm_kms / c_kms)
    sigma_nm = fwhm_nm / (2.0 * np.sqrt(2.0 * np.log(2.0)))
    return sigma_nm

def rotational_broadening_kernel(lam_array, vrot_kms, lam0_ref=550.0):
    # Approximate rotation broadening by a Gaussian kernel whose sigma scales with vrot.
    # This is an approximation (true rotation kernel is not Gaussian); good enough visually.
    # sigma_rot (nm) ≈ lam0 * (vrot / c) / 2.355
    sigma_nm = lam0_ref * (vrot_kms / c_kms) / 2.355
    # kernel over same wavelength grid
    dx = lam_array[1] - lam_array[0]
    half_width = int(min(len(lam_array)//2, max(5, int(6 * sigma_nm / dx))))
    kx = np.linspace(-half_width*dx, half_width*dx, 2*half_width+1)
    kernel = np.exp(-0.5 * (kx / sigma_nm)**2)
    kernel /= kernel.sum()
    return kernel

# precompute intrinsic spectrum (continuum = 1.0)
def intrinsic_spectrum(wave_array):
    spec = np.ones_like(wave_array)
    for center, depth, fwhm in zip(line_centers, line_depths, line_fwhm_kms):
        sigma = fwhm_kms_to_sigma_nm(fwhm, center)
        spec -= depth * gaussian(wave_array, center, sigma)
    return spec

spec0 = intrinsic_spectrum(wave)

# precompute rotation kernel (approx)
rot_kernel = rotational_broadening_kernel(wave, v_rot_kms, lam0_ref=np.mean(line_centers))

# convolution helper using FFT convolution for speed & nicer edges
def convolve_spec(spec, kernel):
    # pad to reduce edge effects, then convolve, then trim
    pad = len(kernel)
    spec_p = np.pad(spec, pad, mode='edge')
    conv = fftconvolve(spec_p, kernel, mode='same')
    # trim padding
    conv_trim = conv[pad:pad+len(spec)]
    return conv_trim

# ------------------------
# Prepare figure: top = spectrum, bottom = RV curve
# ------------------------
plt.style.use('dark_background')
fig, (ax_spec, ax_rv) = plt.subplots(2, 1, figsize=(10, 7), gridspec_kw={'height_ratios':[3,1]})
fig.suptitle("Stellar Spectrum — Doppler Shift & Rotational Broadening\n(Top: Spectrum | Bottom: Radial Velocity)", color='#9be3ff', fontsize=14)

# Spectrum axes
ax_spec.set_xlim(lam_min, lam_max)
ax_spec.set_ylim(0.4, 1.05)
ax_spec.set_ylabel("Normalized Flux")
ax_spec.set_xlabel("Wavelength (nm)")
ax_spec.grid(alpha=0.12, color='white')

# plot rest markers for reference
for lc in line_centers:
    ax_spec.axvline(lc, color='#ffffff22', linestyle='--', linewidth=0.8)

# initial plotted lines
spec_line, = ax_spec.plot([], [], color='#76ffea', lw=1.8)
spec_fill = ax_spec.fill_between(wave, np.ones_like(wave), np.ones_like(wave), color='#005f67', alpha=0.15)

# RV axes
ax_rv.set_xlim(t[0], t[-1])
ax_rv.set_ylim(-1.2*v_rad_amp, 1.2*v_rad_amp)
ax_rv.set_xlabel("Time (arb. units)")
ax_rv.set_ylabel("Radial Velocity (km/s)")
ax_rv.grid(alpha=0.15)
rv_line, = ax_rv.plot([], [], color='#ffd86b', lw=2)
rv_dot,  = ax_rv.plot([], [], 'o', color='#ff8c42')

# small annotation for current v_rad
ann = ax_spec.text(0.02, 0.93, '', transform=ax_spec.transAxes, color='white', fontsize=10,
                   bbox=dict(facecolor='#00000066', edgecolor='#ffffff22'))

# ------------------------
# Animation init and update
# ------------------------
def init():
    spec_line.set_data([], [])
    rv_line.set_data([], [])
    rv_dot.set_data([], [])
    ann.set_text('')
    return spec_line, rv_line, rv_dot, ann

def spectrum_with_shift(vrad_kms, vrot_kms):
    """
    Apply Doppler shift (non-relativistic for small v/c) and rotational broadening.
    Shift wavelengths by factor (1 + v/c). Equivalent effect can be obtained by shifting spectrum.
    """
    # Doppler factor (relativistic small correction could be used; we use non-relativistic approx)
    doppler_factor = 1.0 + (vrad_kms / c_kms)
    # shift wavelength grid to source rest frame: lambda_rest = lambda_obs / (1+v/c)
    wave_rest = wave / doppler_factor
    # interpolate intrinsic spectrum to shifted grid
    spec_shifted = np.interp(wave_rest, wave, spec0, left=1.0, right=1.0)
    # apply rotational broadening as convolution
    # if desired, scale kernel sigma with vrot (we use precomputed kernel scaled linearly)
    # create a kernel scaled for this vrot
    # here rot_kernel precomputed at v_rot_kms reference; scale kernel width proportional to vrot_kms / v_rot_kms
    if vrot_kms > 0:
        # approximate scaling by re-creating kernel with scaled sigma via lam0_ref
        kernel = rotational_broadening_kernel(wave, vrot_kms, lam0_ref=np.mean(line_centers))
        spec_broadened = convolve_spec(spec_shifted, kernel)
    else:
        spec_broadened = spec_shifted
    # ensure non-negative, clip
    spec_broadened = np.clip(spec_broadened, 0.0, 2.0)
    return spec_broadened

# Animation update
def animate(i):
    vr = v_rad[i]
    # get spectrum shifted & broadened
    spec_i = spectrum_with_shift(vr, v_rot_kms)

    # update spectrum line
    spec_line.set_data(wave, spec_i)
    # update filled area by clearing and re-adding: easiest is to set y data of poly - but Matplotlib fill_between returns PolyCollection.
    # To keep it simple, remove previous fills and create a new one.
    global spec_fill
    try:
        spec_fill.remove()
    except Exception:
        pass
    spec_fill = ax_spec.fill_between(wave, spec_i, 1.02, color='#003f45', alpha=0.25)

    # update RV plot
    rv_line.set_data(t[:i+1], v_rad[:i+1])
    rv_dot.set_data([t[i]], [v_rad[i]])

    # annotation
    ann.set_text(f"v_rad = {vr:.2f} km/s\nv_rot = {v_rot_kms:.1f} km/s")

    return spec_line, spec_fill, rv_line, rv_dot, ann

# run animation
ani = FuncAnimation(fig, animate, frames=frames, init_func=init, interval=30, blit=False)
plt.tight_layout()
plt.show()
