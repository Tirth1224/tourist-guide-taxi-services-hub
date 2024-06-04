document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/appointments/user")
    .then((response) => response.json())
    .then((data) => {
      // console.log('Received appointments:', data);
      displayAppointments(data.services);
    })
    .catch((error) => {
      console.error("Error fetching appointments:", error);
    });
});

function displayAppointments(services) {
  const serviceList = document.querySelector(".service-list");

  if (services && services.length > 0) {
    services.forEach((service) => {
      const serviceItem = document.createElement("div");
      serviceItem.classList.add("service-item");

      // Construct HTML for displaying service details
      const serviceHTML = `
            <h3>${service.serviceName}</h3>
            <p>Date: ${service.date}</p>
            <p>Time Slot: ${service.timeSlot}</p>
            <p>Description: ${service.serviceDescription}</p>
            <div class="worker-details">
                <p>Worker Name: ${service.workerName}</p>
                <p>Worker Mobile No: ${service.workerMobile}</p>
            </div>
            <p class="status ${service.status.toLowerCase()}">Status: ${
        service.status
      }</p>
            <button class="cancel-button" onclick="cancelRequest(${
              service.appointmentId
            })">Cancel</button>
            `;

      serviceItem.innerHTML = serviceHTML;
      serviceList.appendChild(serviceItem);
    });
  } else {
    const noAppointmentMessage = document.createElement("p");
    noAppointmentMessage.textContent = "You do not have any appointments yet.";
    serviceList.appendChild(noAppointmentMessage);
  }
}

function cancelRequest(appointmentId) {
  console.log(appointmentId);
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
