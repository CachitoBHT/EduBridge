document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("supportForm");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const nextBtn = document.querySelector(".next-btn");
  const backBtn = document.querySelector(".back-btn");
  const progressBar = document.getElementById("formProgress");
  const stepIndicators = document.querySelectorAll(".step-number");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const strengthBar = document.getElementById("passwordStrength");

  // Age slider badge
  const age = document.getElementById("age");
  const ageValue = document.getElementById("ageValue");
  age.addEventListener("input", () => {
    ageValue.textContent = age.value;
  });

  // Message textarea
  const message = document.getElementById("message");
  const charCount = document.getElementById("charCount");
  const charProgress = document.getElementById("charProgress");
  message.addEventListener("input", () => {
    const len = message.value.length;
    charCount.textContent = `${len}/300`;
    charProgress.style.width = `${(len / 300) * 100}%`;
  });

  // Capitalized name validation
  const nameField = document.getElementById("name");
  nameField.addEventListener("input", (e) => {
    const val = e.target.value;
    if (val && val[0] !== val[0].toUpperCase()) {
      e.target.setCustomValidity("Must start with capital");
    } else {
      e.target.setCustomValidity("");
    }
  });

  // Password Strength Meter
  function getStrength(pwd) {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[!@#$%^&*]/.test(pwd)) strength++;
    return strength;
  }

password.addEventListener("input", () => {
  const strength = getStrength(password.value);
  const percentage = (strength / 5) * 100;
  strengthBar.style.setProperty('--progress', `${percentage}%`);
});

  // NEXT Step
  nextBtn.addEventListener("click", () => {
    form.classList.add("was-validated");
    if (step1.querySelectorAll(":invalid").length === 0) {
      stepIndicators[0].classList.remove("active");
      stepIndicators[1].classList.add("active");

      step1.classList.remove("active");
      setTimeout(() => {
        step1.classList.add("d-none");
        step2.classList.remove("d-none");
        setTimeout(() => step2.classList.add("active"), 10);
        window.scrollTo({ top: form.offsetTop - 40, behavior: "smooth" });
        progressBar.style.width = "100%";
        progressBar.setAttribute("aria-valuenow", "100");
      }, 300);
    }
  });

  // BACK Step
  backBtn.addEventListener("click", () => {
    stepIndicators[1].classList.remove("active");
    stepIndicators[0].classList.add("active");

    step2.classList.remove("active");
    setTimeout(() => {
      step2.classList.add("d-none");
      step1.classList.remove("d-none");
      setTimeout(() => step1.classList.add("active"), 10);
      window.scrollTo({ top: form.offsetTop - 40, behavior: "smooth" });
      progressBar.style.width = "50%";
      progressBar.setAttribute("aria-valuenow", "50");
    }, 300);
  });

  // Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.classList.add("was-validated");
    if (form.checkValidity()) {
      const successModal = new bootstrap.Modal(document.getElementById("successModal"));
      successModal.show();
      form.reset();
      backBtn.click();
      charProgress.style.width = "0%";
      charCount.textContent = "0/300";
      ageValue.textContent = age.value;
      strengthBar.style.width = "0%";
    }
  });
});
