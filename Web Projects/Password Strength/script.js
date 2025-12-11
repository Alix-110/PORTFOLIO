const passwordInput = document.getElementById('password-input');
const strengthFill = document.getElementById('strength-fill');
const strengthText = document.getElementById('strength-text');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    let strength = 0;

    // Check conditions
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[\W]/.test(password)) strength += 1;

    // Update bar width & color
    let width = (strength / 5) * 100;
    strengthFill.style.width = width + '%';

    if (strength <= 2) {
        strengthFill.style.backgroundColor = 'red';
        strengthText.textContent = 'Strength: Weak';
    } else if (strength === 3 || strength === 4) {
        strengthFill.style.backgroundColor = 'orange';
        strengthText.textContent = 'Strength: Medium';
    } else if (strength === 5) {
        strengthFill.style.backgroundColor = 'green';
        strengthText.textContent = 'Strength: Strong';
    }
});
