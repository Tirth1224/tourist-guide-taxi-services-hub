document.addEventListener("DOMContentLoaded", function () {
  const editProfileImgButton = document.querySelector("#changeprofileimg");
  const editProfileInfoButton = document.querySelector("#changeprofileinfo");
  const saveImageButton = document.querySelector(".save-image-button");
  const saveInfoButton = document.querySelector(".save-info-button");
  const cancelImageButton = document.querySelector(".cancel-image-button");
  const cancelInfoButton = document.querySelector(".cancel-info-button");
  let originalEditProfileImgDisplay = null;
  let originalEditProfileInfoDisplay = null;
  const uploadProfileImgInput = document.getElementById("upload-profile-img");

  editProfileImgButton.addEventListener("click", function () {
    showImageActionButtons();
    hideEditProfileInfoButton();
    uploadProfileImgInput.click();
  });

  uploadProfileImgInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    console.log("Selected file:", file);

    const reader = new FileReader();
    reader.onload = function (event) {
      const imgSrc = event.target.result;
      document.getElementById("proimg").src = imgSrc;
    };
    reader.readAsDataURL(file);
  });

  // Event listener for saving image
  saveImageButton.addEventListener("click", function (event) {
    const defaultProfileImageUrl = "your_default_profile_image_url_here";

    const currentProfileImageUrl = document.getElementById("proimg").src;

    if (currentProfileImageUrl !== defaultProfileImageUrl) {
      // If different, proceed with image upload
      const formData = new FormData(profileImageForm);
      fetch("/api/upload-profile-image", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update profile image");
          }
          alert("Profile image updated successfully");
          location.reload();
        })
        .catch((error) => {
          console.error("Error updating profile image:", error);
          alert("Failed to update profile image");
        });
    } else {
      // If the current profile image URL is the same as the default, do nothing
      console.log("Profile image is the default image, no need to upload.");
    }

    event.preventDefault();
  });

  editProfileInfoButton.addEventListener("click", function () {
    const inputs = document.querySelectorAll(".user-info input:not(#proimg)");
    inputs.forEach((input) => {
      if (input.id !== "email") {
        input.removeAttribute("readonly");
      }
    });
    showInfoActionButtons();
    hideEditProfileImgButton(); // Fix: Hide the other edit button
  });

  // Event listener for saving image
  const profileImageForm = document.getElementById("profile-image-form");
  profileImageForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch("/api/update-profile-image", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update profile image");
        }
        alert("Profile image updated successfully");
        location.reload();
      })
      .catch((error) => {
        console.error("Error updating profile image:", error);
        alert("Failed to update profile image");
      });
  });

  // Event listener for saving user information
  saveInfoButton.addEventListener("click", function (event) {
    const updatedUserInfo = {
      name: document.getElementById("name").value,
      mobile: document.getElementById("mobile").value,
      address: document.getElementById("address").value,
      district: document.getElementById("district").value,
      city: document.getElementById("city").value,
      pin_code: document.getElementById("pin_code").value,
    };

    // Send updated user information to the server
    fetch("/api/update-user-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserInfo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user information");
        }
        alert("User information updated successfully");
        location.reload();
      })
      .catch((error) => {
        console.error("Error updating user information:", error);
        alert("Failed to update user information");
      });

    event.preventDefault();
  });

  // Event listener for canceling image editing
  cancelImageButton.addEventListener("click", function () {
    const input = document.querySelector("#proimg");
    input.setAttribute("readonly", true);
    showEditProfileImgButton();
    hideActionButtons();
    showEditProfileInfoButton();
    location.reload(); // Fix: Show the other edit button
  });

  // Event listener for canceling user information editing
  cancelInfoButton.addEventListener("click", function () {
    const inputs = document.querySelectorAll(".user-info input");
    inputs.forEach((input) => {
      input.setAttribute("readonly", true);
    });
    showEditProfileInfoButton();
    hideActionButtons();
    showEditProfileImgButton();
    location.reload(); // Fix: Show the other edit button
  });

  function showImageActionButtons() {
    saveImageButton.style.display = "inline-block";
    cancelImageButton.style.display = "inline-block";
    saveImageButton.classList.add("image-save");
    cancelImageButton.classList.add("image-cancel");
  }

  function showInfoActionButtons() {
    saveInfoButton.style.display = "inline-block";
    cancelInfoButton.style.display = "inline-block";
  }

  function hideActionButtons() {
    saveImageButton.style.display = "none";
    saveInfoButton.style.display = "none";
    cancelImageButton.style.display = "none";
    cancelInfoButton.style.display = "none";
  }

  function hideEditProfileImgButton() {
    originalEditProfileImgDisplay = editProfileImgButton.style.display;
    editProfileImgButton.style.display = "none";
  }

  function hideEditProfileInfoButton() {
    originalEditProfileInfoDisplay = editProfileInfoButton.style.display;
    editProfileInfoButton.style.display = "none";
  }

  function showEditProfileImgButton() {
    if (originalEditProfileImgDisplay !== null) {
      editProfileImgButton.style.display = originalEditProfileImgDisplay;
    } else {
      editProfileImgButton.style.display = "inline-block";
    }
  }

  function showEditProfileInfoButton() {
    if (originalEditProfileInfoDisplay !== null) {
      editProfileInfoButton.style.display = originalEditProfileInfoDisplay;
    } else {
      editProfileInfoButton.style.display = "inline-block";
    }
  }
});
