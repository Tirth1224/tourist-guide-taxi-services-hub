// document.addEventListener("DOMContentLoaded", function () {
//   showUserData();
// });

// function showUserData() {
//   fetch("/admin/users")
//     .then((response) => response.json())
//     .then((data) => {
//       const tableBody = document.getElementById("users-table-body");
//       tableBody.innerHTML = ""; // Clear existing table data
//       data.forEach((user) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//                     <td>${user.name}</td>
//                     <td>${user.email}</td>
//                     <td>${user.mobile}</td>
//                     <td><button onclick="deleteUser(${user.id})">Delete</button></td>
//                 `;
//         tableBody.appendChild(row);
//       });
//     })
//     .catch((error) => console.error("Error fetching users:", error));
// }

// function deleteUser(id) {
//   fetch(`/admin/user/${id}`, { method: "DELETE" })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success) {
//         showUserData(); // Refresh the user data
//       }
//     })
//     .catch((error) => console.error("Error deleting user:", error));
// }

// function showTaxiDriverData() {
//   fetch("/admin/taxi-drivers")
//     .then((response) => response.json())
//     .then((data) => {
//       const tableBody = document.getElementById("taxi-drivers-table-body");
//       tableBody.innerHTML = ""; // Clear existing table data
//       data.forEach((driver) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//                     <td>${driver.name}</td>
//                     <td>${driver.email}</td>
//                     <td>${driver.mobile}</td>
//                     <td><button onclick="deleteTaxiDriver(${driver.id})">Delete</button></td>
//                 `;
//         tableBody.appendChild(row);
//       });
//     })
//     .catch((error) => console.error("Error fetching taxi drivers:", error));
// }

// function deleteTaxiDriver(id) {
//   fetch(`/admin/taxi-driver/${id}`, { method: "DELETE" })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success) {
//         showTaxiDriverData(); // Refresh the taxi driver data
//       }
//     })
//     .catch((error) => console.error("Error deleting taxi driver:", error));
// }

// function showGuideData() {
//   fetch("/admin/guides")
//     .then((response) => response.json())
//     .then((data) => {
//       const tableBody = document.getElementById("guides-table-body");
//       tableBody.innerHTML = ""; // Clear existing table data
//       data.forEach((guide) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//                     <td>${guide.name}</td>
//                     <td>${guide.email}</td>
//                     <td>${guide.mobile}</td>
//                     <td><button onclick="deleteGuide(${guide.id})">Delete</button></td>
//                 `;
//         tableBody.appendChild(row);
//       });
//     })
//     .catch((error) => console.error("Error fetching guides:", error));
// }

// function deleteGuide(id) {
//   fetch(`/admin/guide/${id}`, { method: "DELETE" })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success) {
//         showGuideData(); // Refresh the guide data
//       }
//     })
//     .catch((error) => console.error("Error deleting guide:", error));
// }

document.addEventListener("DOMContentLoaded", function () {
  showUserData();
});

function showUserData() {
  hideAllSections();
  document.getElementById("users-section").style.display = "block";
  fetch("/admin/users")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("users-table-body");
      tableBody.innerHTML = ""; // Clear existing table data
      data.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.mobile}</td>
                    <td><button onclick="deleteUser(${user.id})">Delete</button></td>
                `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching users:", error));
}

function deleteUser(id) {
  fetch(`/admin/user/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showUserData(); // Refresh the user data
      }
    })
    .catch((error) => console.error("Error deleting user:", error));
}

function showTaxiDriverData() {
  hideAllSections();
  document.getElementById("taxi-drivers-section").style.display = "block";
  fetch("/admin/taxi-drivers")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("taxi-drivers-table-body");
      tableBody.innerHTML = ""; // Clear existing table data
      data.forEach((driver) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${driver.name}</td>
                    <td>${driver.email}</td>
                    <td>${driver.mobile}</td>
                    <td><button onclick="deleteTaxiDriver(${driver.id})">Delete</button></td>
                `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching taxi drivers:", error));
}

function deleteTaxiDriver(id) {
  fetch(`/admin/taxi-driver/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showTaxiDriverData(); // Refresh the taxi driver data
      }
    })
    .catch((error) => console.error("Error deleting taxi driver:", error));
}

function showGuideData() {
  hideAllSections();
  document.getElementById("guides-section").style.display = "block";
  fetch("/admin/guides")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("guides-table-body");
      tableBody.innerHTML = ""; // Clear existing table data
      data.forEach((guide) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${guide.name}</td>
                    <td>${guide.email}</td>
                    <td>${guide.mobile}</td>
                    <td><button onclick="deleteGuide(${guide.id})">Delete</button></td>
                `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching guides:", error));
}

function deleteGuide(id) {
  fetch(`/admin/guide/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showGuideData(); // Refresh the guide data
      }
    })
    .catch((error) => console.error("Error deleting guide:", error));
}

function hideAllSections() {
  document.getElementById("users-section").style.display = "none";
  document.getElementById("taxi-drivers-section").style.display = "none";
  document.getElementById("guides-section").style.display = "none";
}
