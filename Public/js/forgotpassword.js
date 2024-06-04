document.addEventListener("DOMContentLoaded", function () {
  const forgotOtpForm = document.getElementById("forgot-otp-form");
  const verifyOtpForm = document.getElementById("verify-otp-form");
  const setPasswordForm = document.getElementById("set-password-form");
  const closeButtons = document.querySelectorAll(".close-btn");
  const resendButton = document.getElementById("resend-otp-btn");
  const timerDisplay = document.getElementById("timer-display");

  let countdown; // Variable to hold the countdown timer

  // Function to start the countdown timer
  function startTimer(duration, display) {
    let timer = duration,
      minutes,
      seconds;
    countdown = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(countdown);
        display.textContent = "00:00";
        resendButton.style.display = "inline-block";
        // Hide the timer display when countdown is over
        timerDisplay.style.display = "none";
      }
    }, 1000);
  }

  // Event listener for the "Send OTP" form submission
  forgotOtpForm.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Extract email and yourRole from the form
    const emailInput = document.querySelector(
      '#forgot-otp-form input[name="email"]'
    );
    const email = emailInput.value.trim();
    const yourRoleSelect = document.querySelector(
      '#forgot-otp-form select[name="yourRole"]'
    );
    const yourRole = yourRoleSelect.value;
    // console.log(selectedRole);

    // Make a POST request to send OTP
    fetch("/forgot-password/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ yourRole, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Start the countdown timer for showing the resend button after 30 seconds
          startTimer(60, timerDisplay);

          // Proceed to the next card if email is not empty
          const forgotOtpCard = document.getElementById("forgot-otp");
          const verifyOtpCard = document.getElementById("verify-otp");
          forgotOtpCard.classList.remove("active");
          verifyOtpCard.classList.add("active");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        alert("Failed to send OTP. Please try again.");
      });
  });

  // Event listener for the "Verify OTP" form submission
  verifyOtpForm.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Extract OTP from the form
    const otpInput = document.querySelector(
      '#verify-otp-form input[name="otp"]'
    );
    const otp = otpInput.value.trim();

    // Make a POST request to verify OTP
    fetch("/forgot-password/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Proceed to the next card if OTP is verified
          const verifyOtpCard = document.getElementById("verify-otp");
          const setNewPasswordCard =
            document.getElementById("set-new-password");
          verifyOtpCard.classList.remove("active");
          setNewPasswordCard.classList.add("active");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        alert("Failed to verify OTP. Please try again.");
      });
  });

  // Event listener for the "Resend OTP" button
  resendButton.addEventListener("click", function (event) {
    // Prevent the default button behavior
    event.preventDefault();

    // Make a POST request to resend OTP
    fetch("/forgot-password/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        yourRole: "user",
        email: document
          .querySelector('#forgot-otp-form input[name="email"]')
          .value.trim(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Start the countdown timer again for showing the resend button after 30 seconds
          startTimer(60, timerDisplay);

          // Hide the resend button
          resendButton.style.display = "none";

          // Show the timer display
          timerDisplay.style.display = "inline-block";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error resending OTP:", error);
        alert("Failed to resend OTP. Please try again.");
      });
  });

  // Event listener for the "Set Password" form submission
  setPasswordForm.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Extract password from the form
    const passwordInput = document.querySelector(
      '#set-password-form input[name="password"]'
    );
    const confirmPasswordInput = document.querySelector(
      '#set-password-form input[name="confirm_password"]'
    );
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    const email = document
      .querySelector('#forgot-otp-form input[name="email"]')
      .value.trim();
    const yourRole = document.querySelector(
      '#forgot-otp-form select[name="yourRole"]'
    );

    if (password === "" || confirmPassword === "") {
      alert("Please enter both the new password and confirm password.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      setPasswordForm.reset();
      return;
    }

    // Make a POST request to set password
    fetch("/forgot-password/set-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, yourRole }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          // Reset the form
          setPasswordForm.reset();

          // Delete cookies
          document.cookie =
            "cookie_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          // Reload the page to reset the forgot password process
          window.location.href = "/index";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error setting password:", error);
        alert("Failed to set new password. Please try again.");
      });
  });

  // Event listener for close buttons
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Reload the page when the close button is clicked
      location.reload();
    });
  });
});
