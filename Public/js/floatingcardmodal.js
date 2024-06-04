document.addEventListener("DOMContentLoaded", function () {
  setupModal();
  setupTaskForm();
  populateTimeSlots();
  setBookingDateLimits();

  function setupModal() {
    const floatingModal = document.getElementById("floatingCardModal");
    const floatingCardWrapper = document.getElementById(
      "floating-card-wrapper"
    );
    const floatingSpan = document.getElementsByClassName(
      "floating-card-close"
    )[0];

    function closeModal() {
      floatingModal.style.display = "none";
      floatingCardWrapper.classList.remove("active");
      document.body.classList.remove("modal-open");
      resetForm();
      document.getElementById("search-button").focus();
    }

    floatingSpan.onclick = closeModal;

    window.onclick = function (event) {
      if (event.target === floatingCardWrapper) {
        closeModal();
      }
    };

    document.addEventListener("showFloatingModal", function (event) {
      const workerId = event.detail;
      document.getElementById("workerId").value = workerId;
      floatingModal.style.display = "block";
      floatingCardWrapper.classList.add("active");
      document.body.classList.add("modal-open");
    });
  }

  function setupTaskForm() {
    const taskForm = document.getElementById("taskForm");
    taskForm.addEventListener("submit", function (event) {
      event.preventDefault();
      document.getElementById("step1").style.display = "none";
      document.getElementById("step2").style.display = "block";
    });

    document
      .getElementById("bookService")
      .addEventListener("click", function () {
        if (validateTerms()) {
          submitTaskForm();
        } else {
          alert("Please accept all terms before booking.");
        }
      });

    // Prevent default action for checkboxes
    const termsCheckboxes = document.querySelectorAll(
      '#step2 input[type="checkbox"]'
    );
    termsCheckboxes.forEach(function (checkbox) {
      checkbox.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    });

    const termsDiv = document.querySelector(".terms");
    termsDiv.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent event propagation for the entire div
    });

    const labels = document.querySelectorAll("#step2 label");
    labels.forEach(function (label) {
      label.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    });

    const lis = document.querySelectorAll("#step2 li");
    lis.forEach(function (li) {
      li.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
      });
    });

    const uls = document.querySelectorAll("#step2 ul");
    uls.forEach(function (ul) {
      ul.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
      });
    });
  }

  function validateTerms() {
    const termsCheckboxes = document.querySelectorAll(
      '#step2 input[name="terms"]'
    );
    for (let checkbox of termsCheckboxes) {
      if (!checkbox.checked) {
        return false;
      }
    }
    return true;
  }

  function submitTaskForm() {
    const formData = new FormData(document.getElementById("taskForm"));
    const data = Object.fromEntries(formData.entries());
    const professionElement = document.querySelector(
      ".worker-card .profession"
    );
    const workertype = professionElement.textContent.trim();
    fetch("/api/book-appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workerId: data.workerId,
        workerType: workertype,
        taskDetails: data.taskDetails,
        taskDate: data.taskDate,
        taskTime: data.taskTime,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to book appointment");
        }
        return response.json();
      })
      .then((data) => {
        alert("Appointment booked successfully!");
        closeModal();
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
        alert("Failed to book appointment. Please try again.");
      });
  }

  function resetForm() {
    document.getElementById("taskForm").reset();
    document.getElementById("workerId").value = "";
    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
  }

  function populateTimeSlots() {
    const taskDate = document.getElementById("taskDate");
    const timeSelect = document.getElementById("taskTime");

    taskDate.addEventListener("change", updateAvailableTimeSlots);

    updateAvailableTimeSlots(); // Initial call to set default time slots

    function updateAvailableTimeSlots() {
      const selectedDate = new Date(taskDate.value);
      const currentTime = new Date();
      let timeSlotsAvailable = false;

      // Clear previous options
      timeSelect.innerHTML = "";

      if (selectedDate.toDateString() === currentTime.toDateString()) {
        // If the selected date is today, limit the time slots based on the current time
        for (let i = 8; i < 20; i += 2) {
          if (i > currentTime.getHours()) {
            const option = document.createElement("option");
            const time = `${i}:00 - ${i + 2}:00`;
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
            timeSlotsAvailable = true;
          }
        }
      } else {
        // Populate with all available time slots for future dates
        for (let i = 8; i < 20; i += 2) {
          const option = document.createElement("option");
          const time = `${i}:00 - ${i + 2}:00`;
          option.value = time;
          option.textContent = time;
          timeSelect.appendChild(option);
          timeSlotsAvailable = true;
        }
      }

      if (!timeSlotsAvailable) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "No time slots available";
        timeSelect.appendChild(option);
        timeSelect.disabled = true;
      } else {
        timeSelect.disabled = false;
      }
    }
  }

  function setBookingDateLimits() {
    const taskDate = document.getElementById("taskDate");
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 7);

    taskDate.min = today.toISOString().split("T")[0];
    taskDate.max = maxDate.toISOString().split("T")[0];
  }

  // Ensuring closeModal is accessible to both submitTaskForm and setupModal
  function closeModal() {
    const floatingModal = document.getElementById("floatingCardModal");
    const floatingCardWrapper = document.getElementById(
      "floating-card-wrapper"
    );
    floatingModal.style.display = "none";
    floatingCardWrapper.classList.remove("active");
    document.body.classList.remove("modal-open");
    resetForm();
    document.getElementById("search-button").focus();
  }
});
