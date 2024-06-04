document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/appointments/worker")
    .then((response) => response.json())
    .then((data) => {
      // console.log('Received user requests:', data);
      displayUserRequests(data.requests);
    })
    .catch((error) => {
      console.error("Error fetching user requests:", error);
    });
});

function displayUserRequests(requests) {
  const requestList = document.querySelector(".request-list");

  if (requests && requests.length > 0) {
    requests.forEach((request) => {
      const requestItem = document.createElement("div");
      requestItem.classList.add("service-item");

      // Correctly parse the appointment date
      const appointmentDate = new Date(request.date);

      // Check if the appointment date is today
      const today = new Date();
      const isToday =
        today.toISOString().split("T")[0] ===
        appointmentDate.toISOString().split("T")[0];

      // Construct HTML for displaying user request and service details
      let actionButtonsHTML = "";

      if (request.status === "pending") {
        actionButtonsHTML = `
                    <button class="accept-button" onclick="acceptRequest(${request.requestId}, '${request.serviceName}')">Accept</button>
                    <button class="reject-button" onclick="rejectRequest(${request.requestId}, '${request.serviceName}')">Reject</button>
                `;
      } else if (request.status === "accepted") {
        actionButtonsHTML = `
                        <button class="cancel-button" onclick="cancelRequest(${request.requestId})">Cancel</button>
                    `;
      }
      const requestHTML = `
                <h3>Service Request</h3>
                <div class="user-details">
                    <p>User Name: ${request.userName}</p>
                    <p>User Mobile No: ${request.userMobile}</p>
                    <p>Address: ${request.userAddress}</p>
                    <p>City: ${request.userCity}</p>
                    <p>Postal Code: ${request.userPostalCode}</p>
                </div>
                <div class="service-details">
                    <p>Service Name: ${request.serviceName}</p>
                    <p>Date: ${request.date}</p>
                    <p>Time Slot: ${request.timeSlot}</p>
                    <p>Description: ${request.serviceDescription}</p>
                </div>
                <p class="status ${request.status.toLowerCase()}">Status: ${
        request.status
      }</p>
                <div class="action-buttons">
                    ${actionButtonsHTML}
                </div>
            `;

      requestItem.innerHTML = requestHTML;
      requestList.appendChild(requestItem);
    });
  } else {
    const noRequestMessage = document.createElement("p");
    noRequestMessage.textContent = "No user requests available.";
    requestList.appendChild(noRequestMessage);
  }
}

function acceptRequest(requestId, serviceName) {
  fetch(`/api/appointments/accept`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ appointmentId: requestId, workerType: serviceName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Request accepted successfully");
        location.reload();
      } else {
        alert("Failed to accept request");
      }
    })
    .catch((error) => {
      console.error("Error accepting request:", error);
      alert("Error accepting request");
    });
}

function rejectRequest(requestId, serviceName) {
  fetch(`/api/appointments/reject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ appointmentId: requestId, workerType: serviceName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Request rejected successfully");
        location.reload();
      } else {
        alert("Failed to reject request");
      }
    })
    .catch((error) => {
      console.error("Error rejecting request:", error);
      alert("Error rejecting request");
    });
}

function cancelRequest(appointmentId) {
  fetch(`/api/appointments/cancel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ appointmentId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Request cancelled successfully");
        location.reload();
      } else {
        alert(`Failed to cancel request: ${data.error}`);
      }
    })
    .catch((error) => {
      console.error("Error cancelling request:", error);
      alert("Error cancelling request");
    });
}
