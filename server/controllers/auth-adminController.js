// const db = require("../db");

// // Fetch users from the database
// exports.getUsers = (req, res) => {
//   const getUsersQuery = "SELECT * FROM users";
//   db.query(getUsersQuery, (err, users) => {
//     if (err) {
//       console.error("Error fetching users data:", err);
//       return res.status(500).send("Error fetching users data");
//     }
//     res.json(users);
//   });
// };

// // Delete User
// exports.deleteUser = (req, res) => {
//   const userId = req.params.id;
//   const deleteUserQuery = "DELETE FROM users WHERE id = ?";
//   db.query(deleteUserQuery, [userId], (err, result) => {
//     if (err) {
//       console.error("Error deleting user:", err);
//       return res.status(500).send("Error deleting user");
//     }
//     res.json({ success: true });
//   });
// };

// // Fetch taxi drivers from the database
// exports.getTaxiDrivers = (req, res) => {
//   const getTaxiDriversQuery = "SELECT * FROM taxidriver";
//   db.query(getTaxiDriversQuery, (err, drivers) => {
//     if (err) {
//       console.error("Error fetching taxi drivers data:", err);
//       return res.status(500).send("Error fetching taxi drivers data");
//     }
//     res.json(drivers);
//   });
// };

// // Delete Taxi Driver
// exports.deleteTaxiDriver = (req, res) => {
//   const driverId = req.params.id;
//   const deleteTaxiDriverQuery = "DELETE FROM taxidriver WHERE id = ?";
//   db.query(deleteTaxiDriverQuery, [driverId], (err, result) => {
//     if (err) {
//       console.error("Error deleting taxi driver:", err);
//       return res.status(500).send("Error deleting taxi driver");
//     }
//     res.json({ success: true });
//   });
// };

// // Fetch guides from the database
// exports.getGuides = (req, res) => {
//   const getGuidesQuery = "SELECT * FROM guide";
//   db.query(getGuidesQuery, (err, guides) => {
//     if (err) {
//       console.error("Error fetching guides data:", err);
//       return res.status(500).send("Error fetching guides data");
//     }
//     res.json(guides);
//   });
// };

// // Delete Guide
// exports.deleteGuide = (req, res) => {
//   const guideId = req.params.id;
//   const deleteGuideQuery = "DELETE FROM guide WHERE id = ?";
//   db.query(deleteGuideQuery, [guideId], (err, result) => {
//     if (err) {
//       console.error("Error deleting guide:", err);
//       return res.status(500).send("Error deleting guide");
//     }
//     res.json({ success: true });
//   });
// };

// const db = require("../db");

// // Fetch users from the database
// exports.getUsers = (req, res) => {
//   const getUsersQuery = "SELECT * FROM users";
//   db.query(getUsersQuery, (err, users) => {
//     if (err) {
//       console.error("Error fetching users data:", err);
//       return res.status(500).send("Error fetching users data");
//     }
//     res.json(users);
//   });
// };

// // Delete User
// exports.deleteUser = (req, res) => {
//   const userId = req.params.id;
//   const deleteUserQuery = "DELETE FROM users WHERE id = ?";
//   db.query(deleteUserQuery, [userId], (err, result) => {
//     if (err) {
//       console.error("Error deleting user:", err);
//       return res.status(500).send("Error deleting user");
//     }
//     res.json({ success: true });
//   });
// };

// // Fetch taxi drivers from the database
// exports.getTaxiDrivers = (req, res) => {
//   const getTaxiDriversQuery = "SELECT * FROM taxidriver";
//   db.query(getTaxiDriversQuery, (err, drivers) => {
//     if (err) {
//       console.error("Error fetching taxi drivers data:", err);
//       return res.status(500).send("Error fetching taxi drivers data");
//     }
//     res.json(drivers);
//   });
// };

// // Delete Taxi Driver
// exports.deleteTaxiDriver = (req, res) => {
//   const driverId = req.params.id;
//   const deleteTaxiDriverQuery = "DELETE FROM taxidriver WHERE id = ?";
//   db.query(deleteTaxiDriverQuery, [driverId], (err, result) => {
//     if (err) {
//       console.error("Error deleting taxi driver:", err);
//       return res.status(500).send("Error deleting taxi driver");
//     }
//     res.json({ success: true });
//   });
// };

// // Fetch guides from the database
// exports.getGuides = (req, res) => {
//   const getGuidesQuery = "SELECT * FROM guide";
//   db.query(getGuidesQuery, (err, guides) => {
//     if (err) {
//       console.error("Error fetching guides data:", err);
//       return res.status(500).send("Error fetching guides data");
//     }
//     res.json(guides);
//   });
// };

// // Delete Guide
// exports.deleteGuide = (req, res) => {
//   const guideId = req.params.id;
//   const deleteGuideQuery = "DELETE FROM guide WHERE id = ?";
//   db.query(deleteGuideQuery, [guideId], (err, result) => {
//     if (err) {
//       console.error("Error deleting guide:", err);
//       return res.status(500).send("Error deleting guide");
//     }
//     res.json({ success: true });
//   });
// };

const db = require("../db");

// Fetch users from the database
exports.getUsers = (req, res) => {
  const getUsersQuery = "SELECT * FROM users";
  db.query(getUsersQuery, (err, users) => {
    if (err) {
      console.error("Error fetching users data:", err);
      return res.status(500).send("Error fetching users data");
    }
    res.json(users);
  });
};

// Delete User
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  const deleteUserQuery = "DELETE FROM users WHERE id = ?";
  db.query(deleteUserQuery, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).send("Error deleting user");
    }
    res.json({ success: true });
  });
};

// Fetch taxi drivers from the database
exports.getTaxiDrivers = (req, res) => {
  const getTaxiDriversQuery = "SELECT * FROM taxidriver";
  db.query(getTaxiDriversQuery, (err, drivers) => {
    if (err) {
      console.error("Error fetching taxi drivers data:", err);
      return res.status(500).send("Error fetching taxi drivers data");
    }
    res.json(drivers);
  });
};

// Delete Taxi Driver
exports.deleteTaxiDriver = (req, res) => {
  const driverId = req.params.id;
  const deleteTaxiDriverQuery = "DELETE FROM taxidriver WHERE id = ?";
  db.query(deleteTaxiDriverQuery, [driverId], (err, result) => {
    if (err) {
      console.error("Error deleting taxi driver:", err);
      return res.status(500).send("Error deleting taxi driver");
    }
    res.json({ success: true });
  });
};

// Fetch guides from the database
exports.getGuides = (req, res) => {
  const getGuidesQuery = "SELECT * FROM guide";
  db.query(getGuidesQuery, (err, guides) => {
    if (err) {
      console.error("Error fetching guides data:", err);
      return res.status(500).send("Error fetching guides data");
    }
    res.json(guides);
  });
};

// Delete Guide
exports.deleteGuide = (req, res) => {
  const guideId = req.params.id;
  const deleteGuideQuery = "DELETE FROM guide WHERE id = ?";
  db.query(deleteGuideQuery, [guideId], (err, result) => {
    if (err) {
      console.error("Error deleting guide:", err);
      return res.status(500).send("Error deleting guide");
    }
    res.json({ success: true });
  });
};
