// Step elements
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

// Inputs & buttons
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const otpInput = document.getElementById("otpInput");

const nextBtn = document.getElementById("nextBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const saveBtn = document.getElementById("saveBtn");
const guestBtn = document.getElementById("guestBtn");

const step1Error = document.getElementById("step1Error");
const step2Error = document.getElementById("step2Error");

let generatedOtp = null; // For OTP simulation

// Check if user already exists on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedUser = JSON.parse(localStorage.getItem("studysyncUser"));
  if (savedUser) {
    document.getElementById("authModal").style.display = "none";
    console.log(`Welcome back ${savedUser.name}!`);
  } else {
    document.getElementById("authModal").style.display = "flex";
  }
});

// Step 1: Validate Name & Email
nextBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  step1Error.textContent = "";

  if (!name || !email) {
    step1Error.textContent = "Please fill in all fields.";
    return;
  }
  if (!emailRegex.test(email)) {
    step1Error.textContent = "Please enter a valid email.";
    return;
  }

  // Generate OTP (simulate for MVP)
  generatedOtp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
  console.log("Your OTP (MVP):", generatedOtp);

  // Move to Step 2
  step1.classList.add("hidden");
  step2.classList.remove("hidden");
});

// Step 2: Verify OTP
verifyOtpBtn.addEventListener("click", () => {
  const enteredOtp = otpInput.value.trim();
  step2Error.textContent = "";

  if (enteredOtp !== generatedOtp.toString()) {
    step2Error.textContent = "Incorrect OTP. Try again.";
    return;
  }

  // OTP correct → move to Step 3
  step2.classList.add("hidden");
  step3.classList.remove("hidden");
});

// Step 3: Save progress or continue as guest
saveBtn.addEventListener("click", () => {
  const user = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim()
  };
  localStorage.setItem("studysyncUser", JSON.stringify(user));
  alert(`Welcome ${user.name}! Progress saved.`);
  document.getElementById("authModal").style.display = "none";
});

guestBtn.addEventListener("click", () => {
  alert("Continuing as guest...");
  document.getElementById("authModal").style.display = "none";
});