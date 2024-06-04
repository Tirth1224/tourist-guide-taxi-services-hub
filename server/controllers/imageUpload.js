const multer = require("multer");
const db = require("../db"); // Import your database module

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    if (req.session.user && req.session.user.email) {
      const userEmail = req.session.user.email;
      const fileExtension = file.originalname.split(".").pop();
      const fileName = `${userEmail}_profile_image.${fileExtension}`;
      cb(null, fileName); // Set the file name
    } else {
      cb(new Error("User email not available in session"));
    }
  },
});

// Use the correct field name here based on your form's file input field name
const upload = multer({ storage: storage }).single("profile_image"); // 'profileImage' is the name attribute of the file input field in the form

// Function to handle image upload
function handleUpload(req, res, next) {
  console.log("Received image upload request");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      console.error("Multer error:", err);
      return res.status(400).json({ message: "Multer error: " + err.message });
    } else if (err) {
      // An unknown error occurred when uploading
      console.error("Unknown error:", err);
      return res.status(500).json({ message: "Unknown error: " + err.message });
    }

    // File uploaded successfully
    console.log("Image uploaded successfully");

    if (req.file && req.session.user && req.session.user.email) {
      // Save the image path to the database
      const imagePath = `/uploads/${req.file.filename}`; // Adjusted image path
      const userEmail = req.session.user.email; // Assuming user email is available in the session
      let tableName; // Define table name dynamically based on user's role

      // Check if role property exists in req.session.user object
      if (req.session.user.role === "customer") {
        tableName = "users"; // Set tableName to 'users' if user is a customer
      } else if (req.session.user.role === "tour-guide") {
        tableName = "guide"; // Set tableName to 'guide' if user is a tour guide
      } else if (req.session.user.role === "taxi-driver") {
        tableName = "taxidriver"; // Set tableName to 'taxidriver' if user is a taxi driver
      } else {
        // Handle unexpected roles if needed
        console.error("Unexpected role:", req.session.user.role);
        return res.status(400).json({ message: "Unexpected role" });
      }

      const updateQuery = `UPDATE ${tableName} SET profile_image = ? WHERE email = ?`;

      // Execute the SQL query
      db.query(
        updateQuery,
        [imagePath, userEmail],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error(
              "Error updating profile image path in database:",
              updateErr
            );
            return res
              .status(500)
              .json("Error updating profile image path in database");
          }
          console.log("Profile image path updated in database");
          // Update session user object with new profile image path
          req.session.user.profile_image = imagePath;
          // Send success response
          return res.status(200).json({
            message:
              "Image uploaded and profile image path updated successfully",
          });
        }
      );
    } else {
      console.error("File or user session information missing");
      return res
        .status(400)
        .json({ message: "File or user session information missing" });
    }
  });
}

module.exports = {
  handleUpload,
};
