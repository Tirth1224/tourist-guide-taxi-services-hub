const connection = require("../db");

exports.bookAppointment = (req, res) => {
  const { workerId, workerType, taskDetails, taskDate, taskTime } = req.body;
  const userId = req.session.user.id; // Assuming user ID is stored in session
  // console.log(userId);
  // console.log(workerId);
  // console.log(workerType);
  // console.log(taskDetails);
  // console.log(taskDate);
  // console.log(taskTime);
  if (!workerId || !userId || !taskDetails || !taskDate || !taskTime) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `INSERT INTO appointments (worker_id, user_id, worker_type, task_details, task_date, task_time_slot)
                 VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [workerId, userId, workerType, taskDetails, taskDate, taskTime],
    (err, results) => {
      if (err) {
        console.error("Error booking appointment:", err);
        return res.status(500).json({ error: "Failed to book appointment" });
      }
      res.status(201).json({
        message: "Appointment booked successfully",
        appointmentId: results.insertId,
      });
    }
  );
};

exports.getUserAppointments = (req, res) => {
  const userId = req.session.user.id;
  const query = `SELECT * FROM appointments WHERE user_id = ?`;
  connection.query(query, [userId], (err, appointments) => {
    if (err) {
      console.error("Error fetching appointments:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (appointments.length === 0) {
      return res.status(200).json({ services: [] });
    }

    const servicePromises = appointments.map((appointment) => {
      const {
        id: appointmentId,
        worker_id: workerId,
        worker_type: workerType,
      } = appointment;
      const workerQuery = `SELECT * FROM ${workerType} WHERE id = ?`;

      return new Promise((resolve, reject) => {
        connection.query(workerQuery, [workerId], (err, workerDetails) => {
          if (err) {
            console.error(
              `Error fetching ${workerType} details for appointment ID ${appointmentId}:`,
              err
            );
            reject(err);
            return;
          }

          if (workerDetails.length === 0) {
            resolve(null);
            return;
          }

          // Convert date to local time and format as YYYY-MM-DD
          const appointmentDate = new Date(appointment.task_date);
          const localDate = new Date(
            appointmentDate.getTime() -
              appointmentDate.getTimezoneOffset() * 60000
          )
            .toISOString()
            .split("T")[0];

          const service = {
            appointmentId: appointment.id,
            serviceName: workerType,
            serviceDescription: appointment.task_details,
            date: localDate, // Formatted local date
            timeSlot: appointment.task_time_slot,
            workerName: `${workerDetails[0].name}`,
            workerMobile: workerDetails[0].mobile,
            status: appointment.status,
          };
          resolve(service);
        });
      });
    });

    Promise.all(servicePromises)
      .then((services) => {
        const validServices = services.filter((service) => service !== null);
        res.status(200).json({ services: validServices });
      })
      .catch((error) => {
        console.error("Error processing appointments:", error);
        res.status(500).json({ error: "Error processing appointments" });
      });
  });
};

// Get worker requests
exports.getWorkerRequests = (req, res) => {
  const workerId = req.session.user.id;
  const profession = req.session.user.profession;

  const query = `SELECT * FROM appointments WHERE worker_id = ? AND worker_type = ? `;

  connection.query(query, [workerId, profession], (err, appointments) => {
    if (err) {
      console.error("Error fetching worker requests:", err);
      return res.status(500).json({ error: "Failed to fetch requests" });
    }

    if (appointments.length === 0) {
      // console.log('No pending requests found for the worker');
      return res.status(200).json({ requests: [] });
    }

    // console.log('Worker requests:', appointments);

    const requestPromises = appointments.map((appointment) => {
      const {
        id: requestId,
        user_id: userId,
        worker_type: workerType,
      } = appointment;
      const userQuery = `SELECT * FROM users WHERE id = ?`;

      return new Promise((resolve, reject) => {
        connection.query(userQuery, [userId], (err, userDetails) => {
          if (err) {
            console.error(
              `Error fetching user details for request ID ${requestId}:`,
              err
            );
            reject(err);
            return;
          }

          if (userDetails.length === 0) {
            console.warn(`User details not found for request ID ${requestId}`);
            resolve(null);
            return;
          }

          const appointmentDate = new Date(appointment.task_date);
          const localDate = new Date(
            appointmentDate.getTime() -
              appointmentDate.getTimezoneOffset() * 60000
          )
            .toISOString()
            .split("T")[0];

          const request = {
            requestId: requestId,
            userName: `${userDetails[0].name}`,
            userEmail: userDetails[0].email,
            userMobile: userDetails[0].mobile,
            userAddress: userDetails[0].address,
            userCity: userDetails[0].city,
            userPostalCode: userDetails[0].pin_code,
            serviceName: workerType, // Change to the worker table name
            serviceDescription: appointment.task_details, // Service description/details
            date: localDate, // Format date as YYYY-MM-DD
            timeSlot: appointment.task_time_slot, // Assuming task_time_slot contains the time range
            status: appointment.status,
          };

          resolve(request);
        });
      });
    });

    Promise.all(requestPromises)
      .then((requests) => {
        const validRequests = requests.filter((request) => request !== null);
        // console.log('All requests processed. Sending response.');
        // console.log(validRequests);
        return res.status(200).json({ requests: validRequests });
      })
      .catch((error) => {
        console.error("Error processing requests:", error);
        res.status(500).json({ error: "Error processing requests" });
      });
  });
};

// Accept an appointment
exports.acceptAppointment = (req, res) => {
  const { appointmentId, workerType } = req.body;
  const workerId = req.session.user.id;

  const query = `UPDATE appointments SET status = 'accepted' WHERE id = ? AND worker_id = ? AND worker_type = ?`;

  connection.query(
    query,
    [appointmentId, workerId, workerType],
    (err, results) => {
      if (err) {
        console.error("Error accepting appointment:", err);
        return res.status(500).json({ error: "Failed to accept appointment" });
      }

      if (results.affectedRows > 0) {
        res.status(200).json({
          success: true,
          message: "Appointment accepted successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          error: "Appointment not found or already accepted",
        });
      }
    }
  );
};

exports.rejectAppointment = (req, res) => {
  const { appointmentId, workerType } = req.body;
  const workerId = req.session.user.id;

  // Query to delete appointment
  const deleteAppointmentQuery = ` DELETE FROM appointments WHERE id = ? AND worker_id = ? AND worker_type = ?`;

  connection.query(
    deleteAppointmentQuery,
    [appointmentId, workerId, workerType],
    (err, results) => {
      if (err) {
        console.error("Error rejecting appointment:", err);
        return res
          .status(500)
          .json({ success: false, error: "Failed to reject appointment" });
      } else {
        // No rows were affected, indicating either the appointment was not found or already rejected
        res.status(404).json({
          success: false,
          error: "Appointment not found or already rejected",
        });
      }
    }
  );
};

exports.cancelAppointment = (req, res) => {
  const { appointmentId } = req.body;
  console.log(appointmentId);

  const deleteAppointmentQuery = `DELETE FROM appointments WHERE id = ?`;

  connection.query(
    deleteAppointmentQuery,
    [appointmentId],
    (err, deleteResults) => {
      if (err) {
        console.error("Error cancelling appointment:", err);
        return res
          .status(500)
          .json({ success: false, error: "Failed to cancel appointment" });
      }

      if (deleteResults.affectedRows > 0) {
        // Send email notification to the user and worker

        return res
          .status(200)
          .json({
            success: true,
            message: "Appointment cancelled successfully",
          });
      } else {
        return res
          .status(404)
          .json({
            success: false,
            error: "Appointment not found or already cancelled",
          });
      }
    }
  );
};
