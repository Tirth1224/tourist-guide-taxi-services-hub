// document.addEventListener("DOMContentLoaded", function () {
//   const searchButton = document.getElementById("search-button");
//   // let loggedinUser;
//   console.log(loggedinUser);

//   function fetchStates() {
//     fetch("/states")
//       .then((response) => response.json())
//       .then((data) => populateSelect("state", data))
//       .catch((error) => console.error("Error fetching states:", error));
//   }

//   function setupEventListeners() {
//     document
//       .getElementById("state")
//       .addEventListener("change", handleStateChange);
//     document
//       .getElementById("district")
//       .addEventListener("change", handleDistrictChange);
//     searchButton.addEventListener("click", handleSearch);
//   }

//   fetchStates();
//   setupEventListeners();

//   function handleStateChange() {
//     const stateId = this.value;
//     const districtSelect = document.getElementById("district");
//     const citySelect = document.getElementById("city");

//     districtSelect.disabled = false;
//     citySelect.disabled = true;
//     citySelect.innerHTML = '<option value="">Select a city</option>';

//     fetch(`/districts/${stateId}`)
//       .then((response) => response.json())
//       .then((data) => populateSelect("district", data))
//       .catch((error) => console.error("Error fetching districts:", error));
//   }

//   function handleDistrictChange() {
//     const districtId = this.value;
//     const citySelect = document.getElementById("city");
//     citySelect.disabled = false;

//     fetch(`/cities/${districtId}`)
//       .then((response) => response.json())
//       .then((data) => populateSelect("city", data))
//       .catch((error) => console.error("Error fetching cities:", error));
//   }

//   function handleSearch() {
//     const selectedService = document.getElementById("service-select").value;
//     const state = document.getElementById("state");
//     const district = document.getElementById("district");
//     const city = document.getElementById("city");
//     const noWorkersContainer2 = document.querySelector(
//       ".no-workers-container2"
//     );
//     noWorkersContainer2.style.display = "none";

//     const searchData = {
//       service: selectedService,
//       state: state.options[state.selectedIndex].text,
//       district: district.options[district.selectedIndex].text,
//       city: city.options[city.selectedIndex].text,
//     };

//     fetchWorkerData(searchData);
//   }

//   function fetchWorkerData(data) {
//     fetch("/api/findworkers", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch worker data");
//         }
//         return response.json();
//       })
//       .then((data) => renderWorkerCards(data))
//       .catch((error) => {
//         console.error("Error fetching worker data:", error);
//       });
//   }

//   function generateWorkerCard(worker) {
//     return `
//         <div class="worker-card" data-worker-id="${worker.id}">
//           <img src="${worker.profile_image}" alt="Worker Image">
//           <div class="info">
//             <div class="name">${worker.name} ${worker.name}</div>
//             <div class="profession">${worker.profession}</div>
//             <div class="location">${worker.city}, ${worker.district}, ${worker.state}</div>
//             <div class="rating">Rating: ${worker.rating} <span>&#9733;</span></div>
//             <button class="btn">Select</button>
//           </div>
//         </div>
//       `;
//   }

//   function renderWorkerCards(data) {
//     const workerCardsContainer = document.querySelector(".worker-cards");
//     const noWorkersContainer = document.querySelector(".no-workers-container");

//     workerCardsContainer.innerHTML = "";

//     if (data && data.length > 0) {
//       data.forEach((worker) => {
//         const cardHTML = generateWorkerCard(worker);
//         workerCardsContainer.innerHTML += cardHTML;
//       });
//       noWorkersContainer.style.display = "none";
//       attachSelectButtonListeners();
//     } else {
//       noWorkersContainer.innerHTML = `<img src="img/serviceselection/nodatafound.png" alt="No workers found">`;
//       noWorkersContainer.style.display = "flex";
//     }
//   }

//   function attachSelectButtonListeners() {
//     // Get all the dynamically generated "Select" buttons within worker cards
//     const buttons = document.querySelectorAll(".worker-card .btn");

//     // Loop through each dynamically generated button and add event listener
//     buttons.forEach((button) => {
//       button.addEventListener("click", function (event) {
//         event.preventDefault(); // Prevent the default form submission behavior

//         if (loggedinUser) {
//           const workerCard = event.target.closest(".worker-card");
//           const workerId = workerCard.dataset.workerId;
//           displayFloatingModal(workerId);
//         } else {
//           window.location.href = "/signin"; // Redirect to login page if not logged in
//         }
//       });
//     });
//   }

//   function displayFloatingModal(workerId) {
//     const event = new CustomEvent("showFloatingModal", { detail: workerId });
//     document.dispatchEvent(event);
//   }

//   // Add an event listener for the custom event to show the modal
//   document.addEventListener("showFloatingModal", function (event) {
//     const workerId = event.detail;
//     showFloatingCardModal(workerId);
//   });

//   function showFloatingCardModal(workerId) {
//     const floatingCardWrapper = document.getElementById(
//       "floating-card-wrapper"
//     );
//     // Assuming there is a way to populate modal with worker details
//     // fetchWorkerDetails(workerId).then(worker => populateFloatingCardModal(worker));
//     floatingCardWrapper.classList.add("active"); // Show the overlay and modal
//   }

//   function populateSelect(selectId, data) {
//     const selectElement = document.getElementById(selectId);
//     selectElement.innerHTML = `<option value="">Select ${
//       selectId.charAt(0).toUpperCase() + selectId.slice(1)
//     }</option>`;
//     data.forEach((item) => {
//       const option = document.createElement("option");
//       option.value = item.id;
//       option.textContent = item.name;
//       selectElement.appendChild(option);
//     });
//   }
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const searchButton = document.getElementById("search-button");

//   function fetchStates() {
//     fetch("/states")
//       .then((response) => response.json())
//       .then((data) => populateSelect("state", data))
//       .catch((error) => console.error("Error fetching states:", error));
//   }

//   function setupEventListeners() {
//     document
//       .getElementById("state")
//       .addEventListener("change", handleStateChange);
//     document
//       .getElementById("district")
//       .addEventListener("change", handleDistrictChange);
//     searchButton.addEventListener("click", handleSearch);
//   }

//   fetchStates();
//   setupEventListeners();

//   function handleStateChange() {
//     const stateId = this.value;
//     const districtSelect = document.getElementById("district");
//     const citySelect = document.getElementById("city");

//     districtSelect.disabled = false;
//     citySelect.disabled = true;
//     citySelect.innerHTML = '<option value="">Select a city</option>';

//     fetch(`/districts/${stateId}`)
//       .then((response) => response.json())
//       .then((data) => populateSelect("district", data))
//       .catch((error) => console.error("Error fetching districts:", error));
//   }

//   function handleDistrictChange() {
//     const districtId = this.value;
//     const citySelect = document.getElementById("city");
//     citySelect.disabled = false;

//     fetch(`/cities/${districtId}`)
//       .then((response) => response.json())
//       .then((data) => populateSelect("city", data))
//       .catch((error) => console.error("Error fetching cities:", error));
//   }

//   function handleSearch() {
//     const selectedService = document.getElementById("service-select").value;
//     const state = document.getElementById("state");
//     const district = document.getElementById("district");
//     const city = document.getElementById("city");
//     const noWorkersContainer2 = document.querySelector(
//       ".no-workers-container2"
//     );
//     noWorkersContainer2.style.display = "none";

//     const searchData = {
//       service: selectedService,
//       state: state.options[state.selectedIndex].text,
//       district: district.options[district.selectedIndex].text,
//       city: city.options[city.selectedIndex].text,
//     };

//     fetchWorkerData(searchData);
//   }

//   function fetchWorkerData(data) {
//     fetch("/api/findworkers", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch worker data");
//         }
//         return response.json();
//       })
//       .then((data) => renderWorkerCards(data))
//       .catch((error) => {
//         console.error("Error fetching worker data:", error);
//       });
//   }

//   function generateWorkerCard(worker) {
//     return `
//           <div class="worker-card" data-worker-id="${worker.id}">
//             <img src="${worker.profile_image}" alt="Worker Image">
//             <div class="info">
//               <div class="name">${worker.name}</div>
//               <div class="profession">${worker.profession}</div>
//               <div class="location">${worker.city}, ${worker.district}, ${worker.state}</div>
//               <div class="rating">Rating: ${worker.rating} <span>&#9733;</span></div>
//               <button class="btn">Select</button>
//             </div>
//           </div>
//         `;
//   }

//   function renderWorkerCards(data) {
//     const workerCardsContainer = document.querySelector(".worker-cards");
//     const noWorkersContainer = document.querySelector(".no-workers-container");

//     workerCardsContainer.innerHTML = "";

//     if (data && data.length > 0) {
//       data.forEach((worker) => {
//         const cardHTML = generateWorkerCard(worker);
//         workerCardsContainer.innerHTML += cardHTML;
//       });
//       noWorkersContainer.style.display = "none";
//       attachSelectButtonListeners();
//     } else {
//       noWorkersContainer.innerHTML = `<img src="img/serviceselection/nodatafound.png" alt="No workers found" style="width: 1200px; height:800px; object-fit: contain; margin: 0 auto;">`;
//       noWorkersContainer.style.display = "flex";
//     }
//   }

//   function attachSelectButtonListeners() {
//     const buttons = document.querySelectorAll(".worker-card .btn");

//     buttons.forEach((button) => {
//       button.addEventListener("click", function (event) {
//         event.preventDefault();

//         // Check if the user is logged in
//         if (loggedinUser) {
//           const workerCard = event.target.closest(".worker-card");
//           const workerId = workerCard.dataset.workerId;
//           displayFloatingModal(workerId);
//         } else {
//           window.location.href = "/signin"; // Redirect to login page if not logged in
//         }
//       });
//     });
//   }

//   function displayFloatingModal(workerId) {
//     const event = new CustomEvent("showFloatingModal", { detail: workerId });
//     document.dispatchEvent(event);
//   }

//   document.addEventListener("showFloatingModal", function (event) {
//     const workerId = event.detail;
//     showFloatingCardModal(workerId);
//   });

//   function showFloatingCardModal(workerId) {
//     const floatingCardWrapper = document.getElementById(
//       "floating-card-wrapper"
//     );
//     floatingCardWrapper.classList.add("active"); // Show the overlay and modal
//   }

//   function populateSelect(selectId, data) {
//     const selectElement = document.getElementById(selectId);
//     selectElement.innerHTML = `<option value="">Select ${
//       selectId.charAt(0).toUpperCase() + selectId.slice(1)
//     }</option>`;
//     data.forEach((item) => {
//       const option = document.createElement("option");
//       option.value = item.id;
//       option.textContent = item.name;
//       selectElement.appendChild(option);
//     });
//   }
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const searchButton = document.getElementById("search-button");
//   let loggedinUser = true; // Mock logged-in user for testing purposes

//   function fetchStates() {
//     fetch("/states")
//       .then((response) => response.json())
//       .then((data) => populateSelect("state", data))
//       .catch((error) => console.error("Error fetching states:", error));
//   }

//   function setupEventListeners() {
//     document
//       .getElementById("state")
//       .addEventListener("change", handleStateChange);
//     document
//       .getElementById("district")
//       .addEventListener("change", handleDistrictChange);
//     searchButton.addEventListener("click", handleSearch);
//   }

//   fetchStates();
//   setupEventListeners();

//   function handleStateChange() {
//     const stateId = this.value;
//     const districtSelect = document.getElementById("district");
//     const citySelect = document.getElementById("city");

//     districtSelect.disabled = false;
//     citySelect.disabled = true;
//     citySelect.innerHTML = '<option value="">Select a city</option>';

//     fetch(`/districts/${stateId}`)
//       .then((response) => response.json())
//       .then((data) => populateSelect("district", data))
//       .catch((error) => console.error("Error fetching districts:", error));
//   }

//   function handleDistrictChange() {
//     const districtId = this.value;
//     const citySelect = document.getElementById("city");
//     citySelect.disabled = false;

//     fetch(`/cities/${districtId}`)
//       .then((response) => response.json())
//       .then((data) => populateSelect("city", data))
//       .catch((error) => console.error("Error fetching cities:", error));
//   }

//   function handleSearch() {
//     const selectedService = document.getElementById("service-select").value;
//     const state = document.getElementById("state");
//     const district = document.getElementById("district");
//     const city = document.getElementById("city");
//     const noWorkersContainer2 = document.querySelector(
//       ".no-workers-container2"
//     );
//     noWorkersContainer2.style.display = "none";

//     const searchData = {
//       service: selectedService,
//       state: state.options[state.selectedIndex].text,
//       district: district.options[district.selectedIndex].text,
//       city: city.options[city.selectedIndex].text,
//     };

//     console.log("Search Data:", searchData); // Debugging statement

//     fetchWorkerData(searchData);
//   }

//   function fetchWorkerData(data) {
//     fetch("/api/findworkers", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch worker data");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Worker Data:", data); // Debugging statement
//         renderWorkerCards(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching worker data:", error);
//       });
//   }

//   function generateWorkerCard(worker) {
//     return `
//           <div class="worker-card" data-worker-id="${worker.id}">
//               <img src="${worker.profile_image}" alt="Worker Image">
//               <div class="info">
//                   <div class="name">${worker.name}</div>
//                   <div class="profession">${worker.profession}</div>
//                   <div class="location">${worker.city}, ${worker.district}, ${worker.state}</div>
//                   <div class="rating">Rating: ${worker.rating} <span>&#9733;</span></div>
//                   <button class="btn">Select</button>
//               </div>
//           </div>
//       `;
//   }

//   function renderWorkerCards(data) {
//     const workerCardsContainer = document.querySelector(".worker-cards");
//     const noWorkersContainer = document.querySelector(".no-workers-container");

//     workerCardsContainer.innerHTML = "";

//     if (data && data.length > 0) {
//       data.forEach((worker) => {
//         const cardHTML = generateWorkerCard(worker);
//         workerCardsContainer.innerHTML += cardHTML;
//       });
//       noWorkersContainer.style.display = "none";
//       attachSelectButtonListeners();
//     } else {
//       noWorkersContainer.innerHTML = `<img src="img/serviceselection/nodatafound.png" alt="No workers found" style="width: 1200px; height:800px; object-fit: contain; margin: 0 auto;">`;
//       noWorkersContainer.style.display = "flex";
//     }
//   }

//   function attachSelectButtonListeners() {
//     const buttons = document.querySelectorAll(".worker-card .btn");

//     buttons.forEach((button) => {
//       button.addEventListener("click", function (event) {
//         event.preventDefault();

//         if (loggedinUser) {
//           const workerCard = event.target.closest(".worker-card");
//           const workerId = workerCard.dataset.workerId;
//           displayFloatingModal(workerId);
//         } else {
//           window.location.href = "/signin"; // Redirect to login page if not logged in
//         }
//       });
//     });
//   }

//   function displayFloatingModal(workerId) {
//     const event = new CustomEvent("showFloatingModal", { detail: workerId });
//     document.dispatchEvent(event);
//   }

//   document.addEventListener("showFloatingModal", function (event) {
//     const workerId = event.detail;
//     showFloatingCardModal(workerId);
//   });

//   function showFloatingCardModal(workerId) {
//     const floatingCardWrapper = document.getElementById(
//       "floating-card-wrapper"
//     );
//     floatingCardWrapper.classList.add("active"); // Show the overlay and modal
//   }

//   function populateSelect(selectId, data) {
//     const selectElement = document.getElementById(selectId);
//     selectElement.innerHTML = `<option value="">Select ${
//       selectId.charAt(0).toUpperCase() + selectId.slice(1)
//     }</option>`;
//     data.forEach((item) => {
//       const option = document.createElement("option");
//       option.value = item.id;
//       option.textContent = item.name;
//       selectElement.appendChild(option);
//     });
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-button");

  // Fetch initial states data
  function fetchStates() {
    fetch("/states")
      .then((response) => response.json())
      .then((data) => populateSelect("state", data))
      .catch((error) => console.error("Error fetching states:", error));
  }

  // Set up event listeners for dropdowns and search button
  function setupEventListeners() {
    document
      .getElementById("state")
      .addEventListener("change", handleStateChange);
    document
      .getElementById("district")
      .addEventListener("change", handleDistrictChange);
    searchButton.addEventListener("click", handleSearch);
  }

  fetchStates();
  setupEventListeners();

  // Handle state change event
  function handleStateChange() {
    const stateId = this.value;
    const districtSelect = document.getElementById("district");
    const citySelect = document.getElementById("city");

    districtSelect.disabled = false;
    citySelect.disabled = true;
    citySelect.innerHTML = '<option value="">Select a city</option>';

    fetch(`/districts/${stateId}`)
      .then((response) => response.json())
      .then((data) => populateSelect("district", data))
      .catch((error) => console.error("Error fetching districts:", error));
  }

  // Handle district change event
  function handleDistrictChange() {
    const districtId = this.value;
    const citySelect = document.getElementById("city");
    citySelect.disabled = false;

    fetch(`/cities/${districtId}`)
      .then((response) => response.json())
      .then((data) => populateSelect("city", data))
      .catch((error) => console.error("Error fetching cities:", error));
  }

  // Handle search button click event
  function handleSearch() {
    const selectedService = document.getElementById("service-select").value;
    const state = document.getElementById("state");
    const district = document.getElementById("district");
    const city = document.getElementById("city");
    const noWorkersContainer = document.querySelector(".no-workers-container");
    noWorkersContainer.style.display = "none";

    const searchData = {
      service: selectedService,
      state: state.options[state.selectedIndex].text,
      district: district.options[district.selectedIndex].text,
      city: city.options[city.selectedIndex].text,
    };

    fetchWorkerData(searchData);
  }

  // Fetch worker data based on search criteria
  function fetchWorkerData(data) {
    fetch("/api/findworkers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch worker data");
        }
        return response.json();
      })
      .then((data) => renderWorkerCards(data))
      .catch((error) => {
        console.error("Error fetching worker data:", error);
      });
  }

  // Generate HTML for a worker card
  // function generateWorkerCard(worker) {
  //   return `
  //     <div class="worker-card" data-worker-id="${worker.id}">
  //       <img src="${worker.profile_image}" alt="Worker Image">
  //       <div class="info">
  //         <div class="name">${worker.name}</div>
  //         <div class="profession">${worker.profession}</div>
  //         <div class="location">${worker.city}, ${worker.district}, ${worker.state}</div>
  //         <div class="rating">Rating: ${worker.rating} <span>&#9733;</span></div>
  //         <button class="select-button">Select</button>
  //       </div>
  //     </div>
  //   `;
  // }

  function generateWorkerCard(worker) {
    return `
      <div class="worker-card" data-worker-id="${worker.id}">
        <img src="${worker.profile_image}" alt="Worker Image">
        <div class="info">
          <div class="name">${worker.name}</div>
          <div class="profession">${worker.profession}</div>
          <div class="location">${worker.city}, ${worker.district}, ${worker.state}</div>
          <div class="rating">Rating: ${worker.rating} <span>&#9733;</span></div>
          <button class="select" style="border-radius: 10px;">Select</button>
        </div>
      </div>
    `;
  }

  // Example of how to append the generated cards
  // const workerCardsContainer = document.querySelector(".worker-cards");
  // const workers = [
  //   // Add your worker objects here
  // ];

  // workers.forEach((worker) => {
  //   workerCardsContainer.innerHTML += generateWorkerCard(worker);
  // });
  function renderWorkerCards(data) {
    const workerCardsContainer = document.querySelector(".worker-cards");
    const noWorkersContainer = document.querySelector(".no-workers-container");

    workerCardsContainer.innerHTML = "";

    if (data && data.length > 0) {
      data.forEach((worker) => {
        const cardHTML = generateWorkerCard(worker);
        workerCardsContainer.innerHTML += cardHTML;
      });
      noWorkersContainer.style.display = "none";
      attachSelectButtonListeners();
    } else {
      noWorkersContainer.innerHTML = `<img src="img/serviceselection/nodatafound.png" alt="No workers found" style="width: 1200px; height:800px; object-fit: contain; margin: 0 250px;">`;
      noWorkersContainer.style.display = "flex";
    }
  }

  // function renderWorkerCards(data) {
  //   const workerCardsContainer = document.querySelector(".worker-cards");
  //   const noWorkersContainer = document.querySelector(".no-workers-container");

  //   // Clear previous content
  //   workerCardsContainer.innerHTML = "";

  //   if (data && data.length > 0) {
  //     data.forEach((worker) => {
  //       // Generate the worker card HTML and append it to the container
  //       workerCardsContainer.innerHTML += generateWorkerCard(worker);
  //     });
  //     // Hide the "no workers" message
  //     noWorkersContainer.style.display = "none";
  //     // Attach listeners to the select buttons (if needed)
  //     attachSelectButtonListeners();
  //   } else {
  //     // Show the "no workers" message with the image
  //     noWorkersContainer.innerHTML = `<img src="img/serviceselection/nodatafound.png" alt="No workers found" style="width: 1200px; height:800px; object-fit: contain; margin: 0 250px;">`;
  //     noWorkersContainer.style.display = "flex";
  //   }
  // }

  // Attach event listeners to dynamically generated "Select" buttons
  function attachSelectButtonListeners() {
    const buttons = document.querySelectorAll(".worker-card .select");
    console.log("tirth");
    buttons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("heloo");

        // Check if the user is logged in
        if (loggedinUser) {
          const workerCard = event.target.closest(".worker-card");
          const workerId = workerCard.dataset.workerId;
          displayFloatingModal(workerId);
        } else {
          window.location.href = "/signin"; // Redirect to login page if not logged in
        }
      });
    });
  }

  // Display floating modal with worker details
  function displayFloatingModal(workerId) {
    const event = new CustomEvent("showFloatingModal", { detail: workerId });
    document.dispatchEvent(event);
  }

  document.addEventListener("showFloatingModal", function (event) {
    const workerId = event.detail;
    showFloatingCardModal(workerId);
  });

  // Show floating card modal
  function showFloatingCardModal(workerId) {
    const floatingCardWrapper = document.getElementById(
      "floating-card-wrapper"
    );
    floatingCardWrapper.classList.add("active"); // Show the overlay and modal
  }

  // Populate select dropdowns with data
  function populateSelect(selectId, data) {
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML = `<option value="">Select ${
      selectId.charAt(0).toUpperCase() + selectId.slice(1)
    }</option>`;
    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.name;
      selectElement.appendChild(option);
    });
  }
});
