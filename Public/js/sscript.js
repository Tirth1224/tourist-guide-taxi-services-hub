const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.add("active");
});
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const errorMessage = urlParams.get("error");

  if (errorMessage) {
    alert(errorMessage);
    // Redirect to the login or signup page after dismissing the alert
    const currentPage = window.location.pathname;
    if (currentPage.includes("signin")) {
      window.location.href = "/signin";
    } else if (currentPage.includes("signup")) {
      window.location.href = "/signup";
    }
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Activate forgot password overlay
  const forgotPasswordLink = document.getElementById("forgot");
  const forgotPasswordOverlay = document.getElementById(
    "forgot-password-overlay"
  );

  // Event listener for the forgot password link
  forgotPasswordLink.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior

    // Show the forgot password overlay
    forgotPasswordOverlay.classList.add("active");
  });

  // Event listener for the close button in the forgot password overlay
  const closeButton = document.querySelector(".close-btn");
  closeButton.addEventListener("click", function () {
    // Hide the forgot password overlay
    forgotPasswordOverlay.classList.remove("active");
  });
});

async function apiCall(endPoint, method, body) {
  const res = await fetch(endPoint, {
    method,
    body,
    headers: {
      "content-type": "application/json",
    },
  });

  if (res.status !== 200) {
    const msg = await res.json();
    throw new Error(msg.message);
  }

  return res.json();
}

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
function toggleProfessionDropdown() {
  const roleDropdown = document.getElementById("role");
  const professionGroup = document.getElementById("profession-group");

  if (roleDropdown.value === "worker") {
    professionGroup.style.display = "block";
  } else {
    professionGroup.style.display = "none";
  }
}
