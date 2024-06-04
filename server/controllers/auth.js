const multer = require("multer");
const path = require("path");
const db = require("../db");
const { log } = require("console");

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Set the destination folder for storing uploads
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Generate a unique filename
  },
});

// Initialize multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Set file size limit (10MB in this example)
}).single("profile_image"); // 'profileImage' should match the name attribute of your file input field

exports.renderHomePage = (req, res) => {
  const { loggedin, user } = req.session;
  res.render("index", { loggedin, user });
};

exports.renderServiceSelection = (req, res) => {
  const { loggedin, user } = req.session;
  res.render("guide", { loggedin, user });
};

exports.renderPackages = (req, res) => {
  const { loggedin, user } = req.session;
  res.render("guide", { loggedin, user });
};

exports.renderReview = (req, res) => {
  const { loggedin, user } = req.session;
  res.render("aboutus", { loggedin, user });
};

exports.renderPricing = (req, res) => {
  const { loggedin, user } = req.session;
  res.render("guide", { loggedin, user });
};

exports.renderfaqs = (req, res) => {
  const { loggedin, user } = req.session;
  res.render("help", { loggedin, user });
};

exports.renderHelp = (req, res) => {
  const { loggedin, user } = req.session;
  res.render("help", { loggedin, user });
};

exports.renderCareers = (req, res) => {
  const { loggedin, user } = req.session;
  res.render("joinus", { loggedin, user });
};

exports.renderAboutUs = (req, res) => {
  const { loggedin, user } = req.session;
  res.render("aboutus", { loggedin, user });
};

exports.renderContactUs = (req, res) => {
  const { loggedin, user } = req.session;
  res.render("help", { loggedin, user });
};

exports.renderJoinUs = (req, res) => {
  const { loggedin, user } = req.session;
  res.render("joinus", { loggedin, user });
};

exports.renderLoginPage = (req, res) => {
  req.session.returnTo = req.query.from || req.get("referer") || "/index";
  if (req.session.loggedin) {
    res.redirect(req.session.returnTo);
  } else {
    res.render("signin", { error: req.query.error, reset: req.query.reset });
  }
};

exports.renderSignupPage = (req, res) => {
  if (req.session.loggedin) {
    res.redirect("/index");
  } else {
    req.session.returnTo = req.query.from || req.get("referer") || "/";
    res.render("signup", { reset: req.query.reset });
  }
};
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Error logging out");
    } else {
      res.redirect("/index");
    }
  });
};

exports.signup = (req, res) => {
  const { name, email, password, confirmpassword, role } = req.body;
  let tableName;
  let values;
  let profession = null;

  // Validate password and confirm-password match
  if (password !== confirmpassword) {
    return res.redirect(
      "/signup?error=Password+and+Confirm+Password+do+not+match&reset=true"
    );
  }

  // Set table name and values based on the role
  switch (role) {
    case "customer":
      tableName = "users";
      values = [email, password, name, role];
      break;
    case "tour-guide":
      tableName = "guide";
      profession = "guide";
      values = [email, password, name, role, profession];
      break;
    case "taxi-driver":
      tableName = "taxidriver";
      profession = "taxi driver";
      values = [email, password, name, role, profession];
      break;
    default:
      return res.redirect("/signup?error=Invalid+role&reset=true");
  }

  const insertQuery = `INSERT INTO ${tableName} (email, password, name, role${
    profession ? ", profession" : ""
  }) VALUES (?, ?, ?, ?${profession ? ", ?" : ""})`;

  console.log("Insert Query:", insertQuery);
  console.log("Values:", values);

  // Insert the user into the database
  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err.message);
      console.error("SQL Query:", insertQuery);
      console.error("Values:", values);
      return res.redirect(
        "/signup?error=Error+inserting+data+into+database&reset=true"
      );
    }

    // Fetch the user's data after signup
    db.query(
      `SELECT * FROM ${tableName} WHERE email = ?`,
      [email],
      (err, results) => {
        if (err) {
          console.error("Error fetching user data:", err.message);
          return res.status(500).send("Error fetching user data");
        }

        // Store all user data in the session
        req.session.loggedin = true;
        req.session.user = results[0]; // Assuming only one user with the given email

        // Redirect based on role
        if (role === "tour-guide" || role === "taxi-driver") {
          return res.redirect("/workerprofile");
        } else {
          return res.redirect("/index");
        }
      }
    );
  });
};

exports.signin = (req, res) => {
  const { email, password, role } = req.body;

  const tableName =
    role === "customer"
      ? "users"
      : role === "taxi-driver"
      ? "taxidriver"
      : "guide";

  db.query(
    `SELECT * FROM ${tableName} WHERE email = ? AND password = ?`,
    [email, password],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).send("Error connecting to database");
      }

      if (results.length > 0) {
        // Store all user data in the session upon successful login
        req.session.loggedin = true;
        req.session.user = results[0];

        const returnTo = req.session.returnTo || "/index";
        delete req.session.returnTo;
        res.redirect(returnTo);
      } else {
        res.redirect("/login?error=Invalid+email+or+password&reset=true");
      }
    }
  );
};

exports.renderUserProfilePage = (req, res) => {
  const { loggedin, user } = req.session;
  if (!loggedin || !user || !user.email) {
    return res.status(401).send("Unauthorized");
  }

  // Fetch user data from the database based on the email
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [user.email],
    (err, results) => {
      if (err) {
        console.error("Error fetching user data:", err);
        return res.status(500).send("Error fetching user data");
      }

      // Check if user data exists
      if (results.length > 0) {
        const userData = results[0]; // Assuming only one user with the given email
        req.session.user = userData; // Update session data with fetched user data
        res.render("dashboard/userprofile", { loggedin, user: userData }); // Pass user data to the template
      } else {
        // Handle case where user data does not exist
        res.status(404).send("User not found");
      }
    }
  );
};

// exports.updateUserInfo = (req, res) => {
//   // Check if a file is uploaded
//   if (req.file) {
//     // If a file is uploaded, update profile image path in user data
//     req.body.profile_image = "/uploads/" + req.file.filename; // Save the file path in the database
//   }

//   const updatedUserInfo = req.body;
//   const userEmail = req.session.user.email; // Retrieve email from the session

//   console.log("Updating user information:", updatedUserInfo); // Log updated user information

//   // Prepare arrays to store columns and values for the update query
//   const columns = [];
//   const values = [];

//   // Iterate through the updatedUserInfo object to check for non-empty fields
//   Object.entries(updatedUserInfo).forEach(([key, value]) => {
//     if (value !== "") {
//       // Check if the value is not empty
//       columns.push(`${key} = ?`);
//       values.push(value);
//     }
//   });

//   // Add the user's email to the values array
//   values.push(userEmail);

//   // Update user information in the database
//   if (columns.length > 0) {
//     db.query(
//       `UPDATE users SET ${columns.join(", ")} WHERE email = ?`,
//       values,
//       (err, result) => {
//         if (err) {
//           console.error("Error updating user information:", err);
//           return res.status(500).send("Failed to update user information");
//         }
//         // Update session data with the new user information
//         Object.assign(req.session.user, updatedUserInfo);
//         res.status(200).send("User information updated successfully");
//       }
//     );
//   } else {
//     // If no non-empty fields are provided, send a response indicating that no update is performed
//     res.status(200).send("No fields provided for update");
//   }
// };
// exports.updateUserInfo = (req, res) => {
//   const updatedUserInfo = req.body;
//   const userEmail = req.session.user.email; // Retrieve email from the session
//   const role = req.session.user.role; // Retrieve role from the session

//   console.log("Updating user information:", updatedUserInfo); // Log updated user information

//   // Prepare arrays to store columns and values for the update query
//   const columns = [];
//   const values = [];

//   // Iterate through the updatedUserInfo object to check for non-empty fields
//   Object.entries(updatedUserInfo).forEach(([key, value]) => {
//     if (value !== "" && key !== "profile_image") {
//       // Check if the value is not empty and not profile_image
//       columns.push(`${key} = ?`);
//       values.push(value);
//     }
//   });

//   let tableName;
//   if (role === "customer") {
//     tableName = "users";
//   } else if (role === "tour-guide") {
//     tableName = "guide";
//   } else if (role === "taxi-driver") {
//     tableName = "taxidriver";
//   } else {
//     // Handle unexpected roles if needed
//     return res.status(400).send("Invalid role");
//   }

//   // Add the user's email to the values array
//   values.push(userEmail);

//   // Update user information in the database
//   if (columns.length > 0) {
//     db.query(
//       `UPDATE ${tableName} SET ${columns.join(", ")} WHERE email = ?`,
//       values,
//       (err, result) => {
//         if (err) {
//           console.error("Error updating user information:", err);
//           return res.status(500).send("Failed to update user information");
//         }
//         // Update session data with the new user information
//         Object.assign(req.session.user, updatedUserInfo);
//         res.status(200).send("User information updated successfully");
//       }
//     );
//   } else {
//     // If no non-empty fields are provided, send a response indicating that no update is performed
//     res.status(200).send("No fields provided for update");
//   }
// };

exports.updateUserInfo = (req, res) => {
  const updatedUserInfo = req.body;
  const userEmail = req.session.user.email; // Retrieve email from the session
  const role = req.session.user.role; // Retrieve role from the session

  console.log("Updating user information:", updatedUserInfo); // Log updated user information

  // Prepare arrays to store columns and values for the update query
  const columns = [];
  const values = [];

  // Iterate through the updatedUserInfo object to check for non-empty fields
  Object.entries(updatedUserInfo).forEach(([key, value]) => {
    if (value !== "" && key !== "profile_image") {
      // Check if the value is not empty and not profile_image
      columns.push(`${key} = ?`);
      values.push(value);
    }
  });

  let tableName;
  if (role === "customer") {
    tableName = "users";
  } else if (role === "tour-guide") {
    tableName = "guide";
  } else if (role === "taxi-driver") {
    tableName = "taxidriver";
  } else {
    // Handle unexpected roles if needed
    return res.status(400).send("Invalid role");
  }

  // Add the user's email to the values array
  values.push(userEmail);

  // Update user information in the database
  if (columns.length > 0) {
    db.query(
      `UPDATE ${tableName} SET ${columns.join(", ")} WHERE email = ?`,
      values,
      (err, result) => {
        if (err) {
          console.error("Error updating user information:", err);
          return res.status(500).send("Failed to update user information");
        }
        // Update session data with the new user information
        Object.assign(req.session.user, updatedUserInfo);
        res.status(200).send("User information updated successfully");
      }
    );
  } else {
    // If no non-empty fields are provided, send a response indicating that no update is performed
    res.status(200).send("No fields provided for update");
  }
};

// exports.updatePassword = (req, res) => {
//   const { password, newPassword } = req.body;
//   const userEmail = req.session.user.email; // Retrieve email from the session
//   const role = req.session.user.role; // Retrieve email from the session

//   if (password !== req.session.user.password) {
//     return res.status(400).send("Current password does not match");
//   }
//   const tableName =
//     role === "customer"
//       ? "users"
//       : role === "taxi-driver"
//       ? "taxidriver"
//       : "guide";

//   console.log(userEmail);
//   console.log(role);
//   console.log(tableName);
//   db.query(
//     `UPDATE ${tableName} SET password = ? WHERE email = ?`,
//     [newPassword, userEmail],
//     (err, result) => {
//       if (err) {
//         console.error("Error updating user password:", err);
//         return res.status(500).send("Failed to update user password");
//       }
//       // Update session data with the new password
//       req.session.user.password = newPassword;
//       res
//         .status(200)
//         .json({ success: true, message: "Password updated successfully" });
//     }
//   );
// };

exports.updatePassword = (req, res) => {
  const { password, newPassword } = req.body;
  const userEmail = req.session.user.email; // Retrieve email from the session
  const role = req.session.user.role; // Retrieve role from the session

  if (password !== req.session.user.password) {
    return res.status(400).send("Current password does not match");
  }

  let tableName;
  if (role === "customer") {
    tableName = "users";
  } else if (role === "taxi-driver") {
    tableName = "taxidriver";
  } else if (role === "tour-guide") {
    tableName = "guide";
  } else {
    return res.status(400).send("Invalid role");
  }

  db.query(
    `UPDATE ${tableName} SET password = ? WHERE email = ?`,
    [newPassword, userEmail],
    (err, result) => {
      if (err) {
        console.error("Error updating user password:", err);
        return res.status(500).send("Failed to update user password");
      }
      // Update session data with the new password
      req.session.user.password = newPassword;
      res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });
    }
  );
};

exports.renderChangePassword = (req, res) => {
  const { loggedin, user } = req.session;
  if (!loggedin || !user || !user.email) {
    return res.status(401).send("Unauthorized");
  }

  // Define the table name based on the user's role
  let tableName;
  if (user.role === "customer") {
    tableName = "users";
  } else if (user.role === "taxi-driver") {
    tableName = "taxidriver";
  } else if (user.role === "tour-guide") {
    tableName = "guide";
  } else {
    // Default to 'users' table for unknown roles
    tableName = "users";
  }

  // Fetch user data from the database based on the email and selected table name
  db.query(
    `SELECT * FROM ${tableName} WHERE email = ?`,
    [user.email],
    (err, results) => {
      if (err) {
        console.error("Error fetching user data:", err);
        return res.status(500).send("Error fetching user data");
      }

      // Check if user data exists
      if (results.length > 0) {
        const userData = results[0]; // Assuming only one user with the given email
        req.session.user = userData; // Update session data with fetched user data
        // Render the change password page based on user's role
        if (user.role === "customer") {
          res.render("dashboard/userchangepassword", {
            loggedin,
            user: userData,
          });
        } else if (user.role === "taxi-driver" || user.role === "tour-guide") {
          res.render("dashboard/workerchangepassword", {
            loggedin,
            user: userData,
          });
        }
      } else {
        // Handle case where user data does not exist
        res.status(404).send("User not found");
      }
    }
  );
};

// exports.submitForm = (req, res) => {
//   const { name, email, message, rating } = req.body;

//   // Insert data into review table
//   db.query(
//     "INSERT INTO review (name, email, message, rating) VALUES (?, ?, ?, ?)",
//     [name, email, message, rating],
//     (err, result) => {
//       if (err) {
//         console.error("Error inserting data into review table:", err);
//         return res.status(500).send("Error inserting data into review table");
//       }
//       console.log("Data inserted into review table successfully");
//       res.status(200).send("Data inserted into review table successfully");
//     }
//   );
// };

exports.submitForm = (req, res) => {
  // Check if user is logged in
  if (!req.session.loggedin) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized: Please log in to submit a review",
    });
  }

  const { name, email, message, rating } = req.body;

  // Validate that all required fields are provided
  if (!name || !email || !message || !rating) {
    return res.status(400).json({
      status: 400,
      message: "All fields are required",
    });
  }

  // Insert data into review table
  db.query(
    "INSERT INTO review (name, email, message, rating) VALUES (?, ?, ?, ?)",
    [name, email, message, rating],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into review table:", err);
        return res.status(500).json({
          status: 500,
          message: "Error inserting data into review table",
        });
      }
      console.log("Data inserted into review table successfully");
      res.status(200).json({
        status: 200,
        message: "Review submitted successfully",
      });
    }
  );
};

exports.renderWorkerProfilePage = (req, res) => {
  const { loggedin, user } = req.session;

  // Check if user is logged in and user object exists in session
  if (!loggedin || !user || !user.email) {
    return res.status(401).send("Unauthorized");
  }

  // Define the table name based on the user's role
  let tableName;
  if (user.role === "customer") {
    // Redirect to user profile page as this function is for worker profile
    return res.redirect("/userprofile");
  } else if (user.role === "tour-guide") {
    tableName = "guide";
  } else if (user.role === "taxi-driver") {
    tableName = "taxidriver";
  } else {
    // Handle unexpected roles if needed
    return res.status(400).send("Invalid role");
  }

  // Fetch worker data from the database based on the email and selected table name
  db.query(
    `SELECT * FROM ${tableName} WHERE email = ?`,
    [user.email],
    (err, results) => {
      if (err) {
        console.error("Error fetching worker data:", err);
        return res.status(500).send("Error fetching worker data");
      }

      // Check if worker data exists
      if (results.length > 0) {
        const workerData = results[0]; // Assuming only one worker with the given email
        req.session.user = workerData; // Update session data with fetched worker data
        res.render("dashboard/workerprofile", { loggedin, user: workerData }); // Pass worker data to the template
      } else {
        // Handle case where worker data does not exist
        res.status(404).send("Worker not found");
      }
    }
  );
};

exports.renderServiceDashboardPage = (req, res) => {
  const { loggedin, user } = req.session; // Move the declaration here

  if (!loggedin || !user || !user.email) {
    return res.status(401).send("Unauthorized");
  }

  const services = [];
  res.render("dashboard/userservice", { loggedin, user, services }); // Pass services data
};

exports.renderWorkerServiceDashboardPage = (req, res) => {
  const { loggedin, user } = req.session;

  if (!loggedin || !user || !user.id) {
    return res.status(401).send("Unauthorized");
  }
  res.render("dashboard/workerservice", { loggedin, user });
};
