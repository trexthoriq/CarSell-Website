// Show only one form at a time: 'login' or 'signup'
function showForm(type) {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (type === 'login') {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
  } else {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
  }
}

// Validate signup fields before submission
function validateSignup() {
  const email = document.getElementById("signup-email");
  const password = document.getElementById("signup-password");
  const confirm = document.getElementById("signup-confirm");

  let valid = true;

  // Email validation
  if (!email.value.trim()) {
    setError(email, "Must fill in email");
    valid = false;
  } else {
    clearError(email, "Enter your email");
  }

  // Password validation
  if (!password.value.trim()) {
    setError(password, "Must fill in password");
    valid = false;
  } else {
    clearError(password, "Create a password");
  }

  // Confirm password validation
  if (!confirm.value.trim()) {
    setError(confirm, "Must confirm password");
    valid = false;
  } else if (password.value !== confirm.value) {
    setError(confirm, "Passwords do not match");
    valid = false;
  } else {
    clearError(confirm, "Confirm your password");
  }

  return valid;
}

// Add error styling and message to an input
function setError(input, message) {
  input.classList.add("error-border");
  input.value = "";
  input.placeholder = message;
}

// Remove error styling and reset placeholder
function clearError(input, placeholder) {
  input.classList.remove("error-border");
  input.placeholder = placeholder;
}

// Toggle visibility of one or more password fields
function togglePasswords(inputIds, toggleElement) {
  const firstInput = document.getElementById(inputIds[0]);
  const isHidden = firstInput.type === "password";

  inputIds.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.type = isHidden ? "text" : "password";
    }
  });

  toggleElement.textContent = isHidden ? "Hide password" : "Show password";
}

// Handle error and success messages from URL
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const error = params.get("error");
  const success = params.get("success");

  // Login error
  if (error === "invalid") {
    showMessage("login-error", "Invalid email or password.", false);
  }

  // Signup errors
  if (error && error !== "invalid") {
    showForm('signup');
    const errorMessages = {
      empty: "Please fill in all fields.",
      nomatch: "Passwords do not match.",
      exists: "Email is already registered.",
      failed: "Signup failed. Please try again."
    };
    showMessage("signup-error", errorMessages[error] || "Signup error.", false);
  }

  // Signup success
  if (success === "signedup") {
    showForm('login');
    showMessage("login-error", "Signup successful! Please log in.", true);
  }

  // Clean URL
  window.history.replaceState({}, document.title, window.location.pathname);
});

// Display a message in the corresponding error box
function showMessage(id, message, isSuccess = false) {
  const box = document.getElementById(id);
  if (box) {
    box.textContent = message;
    box.className = isSuccess ? "success" : "error show";  // Change class based on type
  }
}