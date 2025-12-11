const piDigits = `3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128`;

document.getElementById("check-btn").addEventListener("click", () => {
  const input = document.getElementById("digit-input").value.trim();
  const resultEl = document.getElementById("result");
  if (!input) { resultEl.textContent = "Please enter digits!"; return; }
  const piClean = piDigits.replace(/\D/g, "");
  const search = input.replace(/\D/g, "");
  if (piClean.includes(search)) {
    resultEl.textContent = `✅ "${search}" is in the first 200 digits of π!`;
  } else {
    resultEl.textContent = `❌ "${search}" not found in first 200 digits.`;
  }
});
