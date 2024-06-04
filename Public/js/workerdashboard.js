document.addEventListener("DOMContentLoaded", function () {
  const editProfileImgButton = document.querySelector("#changeprofileimg");
  const editProfileInfoButton = document.querySelector("#changeprofileinfo");
  const saveImageButton = document.querySelector(".save-image-button");
  const saveInfoButton = document.querySelector(".save-info-button");
  const cancelImageButton = document.querySelector(".cancel-image-button");
  const cancelInfoButton = document.querySelector(".cancel-info-button");
  const uploadProfileImgInput = document.getElementById("upload-profile-img");

  const professionSelect = document.getElementById("profession");
  const taxiDriverFields = document.querySelectorAll(".taxi-driver-field");

  function toggleTaxiDriverFields() {
    if (professionSelect.value === "taxi driver") {
      taxiDriverFields.forEach((field) => (field.style.display = "block"));
    } else {
      taxiDriverFields.forEach((field) => (field.style.display = "none"));
    }
  }

  // Initialize taxi driver fields visibility
  toggleTaxiDriverFields();

  // Profession change event
  professionSelect.addEventListener("change", toggleTaxiDriverFields);

  // Fetch and populate states
  fetch("/states")
    .then((response) => response.json())
    .then((data) => {
      const stateSelect = document.getElementById("state");
      data.forEach((state) => {
        const option = document.createElement("option");
        option.value = state.id;
        option.textContent = state.name;
        stateSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching states:", error));

  // State change event to fetch districts
  document.getElementById("state").addEventListener("change", function () {
    const stateId = this.value;
    const districtSelect = document.getElementById("district");
    const citySelect = document.getElementById("city");
    const pincodeInput = document.getElementById("pin_code");

    districtSelect.disabled = false;
    citySelect.disabled = true;
    citySelect.innerHTML = '<option value="">Select a city</option>';
    pincodeInput.value = "";

    fetch(`/districts/${stateId}`)
      .then((response) => response.json())
      .then((data) => {
        districtSelect.innerHTML =
          '<option value="">Select a district</option>';
        data.forEach((district) => {
          const option = document.createElement("option");
          option.value = district.id;
          option.textContent = district.name;
          districtSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching districts:", error));
  });

  // District change event to fetch cities
  document.getElementById("district").addEventListener("change", function () {
    const districtId = this.value;
    const citySelect = document.getElementById("city");
    const pincodeInput = document.getElementById("pin_code");

    citySelect.disabled = false;
    pincodeInput.value = "";

    fetch(`/cities/${districtId}`)
      .then((response) => response.json())
      .then((data) => {
        citySelect.innerHTML = '<option value="">Select a city</option>';
        data.forEach((city) => {
          const option = document.createElement("option");
          option.value = city.id;
          option.textContent = city.name;
          option.dataset.pincode = city.pin;
          citySelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching cities:", error));
  });

  // City change event to update pin code
  document.getElementById("city").addEventListener("change", function () {
    const selectedOption = this.selectedOptions[0];
    const pincodeInput = document.getElementById("pin_code");
    pincodeInput.value = selectedOption.dataset.pincode || "";
  });

  // Change profile image event
  editProfileImgButton.addEventListener("click", function () {
    showImageActionButtons();
    hideEditProfileInfoButton();
    uploadProfileImgInput.click();
  });

  // Upload profile image input change event
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

  // Save profile image event
  saveImageButton.addEventListener("click", function (event) {
    const formData = new FormData();
    const file = uploadProfileImgInput.files[0];
    formData.append("profileImage", file);

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

    event.preventDefault();
  });

  // Edit profile info event
  editProfileInfoButton.addEventListener("click", function () {
    const inputs = document.querySelectorAll(".worker-info input:not(#proimg)");
    inputs.forEach((input) => {
      if (input.id !== "email") {
        input.removeAttribute("readonly");
      }
    });
    const stateSelect = document.getElementById("state");
    const districtSelect = document.getElementById("district");
    const citySelect = document.getElementById("city");
    stateSelect.disabled = false;
    districtSelect.disabled = false;
    citySelect.disabled = false;

    showInfoActionButtons();
    hideEditProfileImgButton();
  });

  saveInfoButton.addEventListener("click", function (event) {
    const stateSelect = document.getElementById("state");
    const districtSelect = document.getElementById("district");
    const citySelect = document.getElementById("city");

    const updatedUserInfo = {
      name: document.getElementById("name").value,
      mobile: document.getElementById("mobile").value,
      profession: document.getElementById("profession").value,
      experience: document.getElementById("experience").value,
      state: stateSelect.options[stateSelect.selectedIndex].text,
      district: districtSelect.options[districtSelect.selectedIndex].text,
      city: citySelect.options[citySelect.selectedIndex].text,
      address: document.getElementById("address").value,
      pin_code: document.getElementById("pin_code").value,
      aadhar_number: document.getElementById("aadhar_number").value,
      pancard_number: document.getElementById("pancard_number").value,
    };

    if (professionSelect.value === "taxi driver") {
      Object.assign(updatedUserInfo, {
        licence_number: document.getElementById("licence_number").value,
        vehicle_type: document.getElementById("vehicle_type").value,
        rc: document.getElementById("rc").value,
        vehicle_number: document.getElementById("vehicle_number").value,
      });
    }

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

  // Cancel image change event
  cancelImageButton.addEventListener("click", function () {
    showEditProfileImgButton();
    hideActionButtons();
    showEditProfileInfoButton();
  });

  // Cancel info change event
  cancelInfoButton.addEventListener("click", function () {
    const inputs = document.querySelectorAll(".worker-info input");
    inputs.forEach((input) => {
      input.setAttribute("readonly", true);
    });
    const stateSelect = document.getElementById("state");
    const districtSelect = document.getElementById("district");
    const citySelect = document.getElementById("city");
    stateSelect.disabled = true;
    districtSelect.disabled = true;
    citySelect.disabled = true;

    showEditProfileInfoButton();
    hideActionButtons();
    showEditProfileImgButton();
  });

  // Helper functions to show/hide buttons
  function showImageActionButtons() {
    saveImageButton.style.display = "inline-block";
    cancelImageButton.style.display = "inline-block";
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
    editProfileImgButton.style.display = "none";
  }

  function hideEditProfileInfoButton() {
    editProfileInfoButton.style.display = "none";
  }

  function showEditProfileImgButton() {
    editProfileImgButton.style.display = "inline-block";
  }

  function showEditProfileInfoButton() {
    editProfileInfoButton.style.display = "inline-block";
  }
});
