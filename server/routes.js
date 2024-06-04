const express = require("express");
const router = express.Router();
const db = require("./db");
const authController = require("./controllers/auth");
const imageController = require("./controllers/imageUpload");
const geolocationController = require("./controllers/geolocation");
const forgotPasswordController = require("./controllers/forgot-password");
const findWorkerController = require("./controllers/auth-findworker");
const adminController = require("./controllers/auth-adminController");
const appointmentController = require("./controllers/appointments");

// router.get("/admin/users", adminController.getUsers);
// router.delete("/admin/user/:id", adminController.deleteUser);
// router.get("/admin/taxi-drivers", adminController.getTaxiDrivers);
// router.delete("/admin/taxi-driver/:id", adminController.deleteTaxiDriver);
// router.get("/admin/guides", adminController.getGuides);
// router.delete("/admin/guide/:id", adminController.deleteGuide);

router.get("/admin", (req, res) => {
  res.render("admindashboard", { data: [] });
});

// Fetch users data and render
router.get("/admin/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error fetching users data:", err);
      res.status(500).send("Error fetching users data");
    } else {
      res.render("admindashboard", { data: results });
    }
  });
});

// Fetch guides data and render
router.get("/admin/guides", (req, res) => {
  db.query("SELECT * FROM guide", (err, results) => {
    if (err) {
      console.error("Error fetching guides data:", err);
      res.status(500).send("Error fetching guides data");
    } else {
      res.render("admindashboard", { data: results });
    }
  });
});

// Fetch taxi drivers data and render
router.get("/admin/taxi-drivers", (req, res) => {
  db.query("SELECT * FROM taxidriver", (err, results) => {
    if (err) {
      console.error("Error fetching taxi drivers data:", err);
      res.status(500).send("Error fetching taxi drivers data");
    } else {
      res.render("admindashboard", { data: results });
    }
  });
});

// Delete routes
router.delete("/admin/user/:id", adminController.deleteUser);
router.delete("/admin/taxi-driver/:id", adminController.deleteTaxiDriver);
router.delete("/admin/guide/:id", adminController.deleteGuide);

router.get("/", authController.renderHomePage);
router.get("/index", authController.renderHomePage);
router.get("/guide", authController.renderServiceSelection);
router.get("/guide", authController.renderPackages);
router.get("/guide", authController.renderPricing);
router.get("/aboutus", authController.renderAboutUs);
router.get("/aboutus", authController.renderReview);
router.get("/joinus", authController.renderJoinUs);
router.get("/joinus", authController.renderCareers);
router.get("/help", authController.renderHelp);
router.get("/help", authController.renderContactUs);
router.get("/help", authController.renderfaqs);
router.get("/signin", authController.renderLoginPage);
router.get("/signup", authController.renderSignupPage);
router.get("/logout", authController.logout);
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/states", geolocationController.state);
router.get("/districts/:stateId", geolocationController.district);
router.get("/cities/:districtId", geolocationController.city);
router.get("/userprofile", authController.renderUserProfilePage);
router.post("/api/update-user-info", authController.updateUserInfo);
router.get("/userchangepassword", authController.renderChangePassword);
router.get("/workerchangepassword", authController.renderChangePassword);
router.get("/workerservice", authController.renderWorkerServiceDashboardPage);
router.post("/api/upload-profile-image", imageController.handleUpload);
router.post("/forgot-password/send-otp", forgotPasswordController.sendOTP); // Send OTP route
router.post("/forgot-password/verify-otp", forgotPasswordController.verifyOTP); // Verify OTP route
router.post(
  "/forgot-password/set-password",
  forgotPasswordController.setPassword
); // Set new password route
router.post("/api/update-password", authController.updatePassword); // Add this line for updating password
router.post("/submit-form", authController.submitForm);
router.get("/workerprofile", authController.renderWorkerProfilePage);
router.post("/api/findworkers", findWorkerController.findWorkers);
router.get("/userservice", authController.renderServiceDashboardPage);
router.post("/api/book-appointment", appointmentController.bookAppointment); // Route for booking appointments
router.post("/api/appointments/book", appointmentController.bookAppointment); // Route for booking an appointment
router.get("/api/appointments/user", appointmentController.getUserAppointments); // Route for fetching user appointments
router.get("/api/appointments/worker", appointmentController.getWorkerRequests); // Route for fetching worker requests
router.post(
  "/api/appointments/accept",
  appointmentController.acceptAppointment
); // Route for accepting an appointment
router.post(
  "/api/appointments/reject",
  appointmentController.rejectAppointment
); // Route for canceling an appointment
router.post(
  "/api/appointments/cancel",
  appointmentController.cancelAppointment
); // Route for canceling an appointment

module.exports = router;
