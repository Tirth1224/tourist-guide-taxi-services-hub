document.addEventListener("DOMContentLoaded", function () {
  const changePasswordButton = document.querySelector(
    ".change-password-button"
  );
  const actionButtons = document.getElementById("action-buttons");
  const currentPasswordInput = document.getElementById("current-password");
  const newPasswordInput = document.getElementById("new-password");
  const confirmPasswordInput = document.getElementById("confirm-password");

  // Disable input fields initially
  currentPasswordInput.disabled = true;
  newPasswordInput.disabled = true;
  confirmPasswordInput.disabled = true;

  // Add click event listener to the change password button
  changePasswordButton.addEventListener("click", function () {
    // Show action buttons when the trigger button is clicked
    actionButtons.style.display = "block";
    // Hide the change password button
    changePasswordButton.style.visibility = "hidden";

    // Enable input fields
    currentPasswordInput.disabled = false;
    newPasswordInput.disabled = false;
    confirmPasswordInput.disabled = false;
  });

  const saveButton = document.querySelector(".save-button");
  const cancelButton = document.querySelector(".cancel-button");

  // Add click event listener to the save button
  saveButton.addEventListener("click", function () {
    // Extract password data from the form
    const password = currentPasswordInput.value.trim();
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      location.reload();
    }

    // Make a POST request to update the password
    fetch("/api/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          // Redirect to the login page after successful password update
          window.location.href = "/signin";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        alert("Failed to update password. Please try again.");
      });

    // Hide action buttons after saving
    actionButtons.style.display = "none";
    // Show the change password button again
    changePasswordButton.style.visibility = "visible";
    // Clear input fields
    currentPasswordInput.value = "";
    newPasswordInput.value = "";
    confirmPasswordInput.value = "";
  });

  // Add click event listener to the cancel button
  cancelButton.addEventListener("click", function () {
    // Hide action buttons after canceling
    actionButtons.style.display = "none";
    // Show the change password button again
    changePasswordButton.style.visibility = "visible";
    // Clear input fields
    currentPasswordInput.value = "";
    newPasswordInput.value = "";
    confirmPasswordInput.value = "";

    // Disable input fields again
    currentPasswordInput.disabled = true;
    newPasswordInput.disabled = true;
    confirmPasswordInput.disabled = true;
  });
});
