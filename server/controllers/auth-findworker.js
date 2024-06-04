// const db = require("../db"); // Import your database module

// exports.findWorkers = (req, res) => {
//   const { service, state, district, city } = req.body;

//   // Convert service to lowercase to match the table name convention
//   const tableName = service.toLowerCase();

//   // Query the database to find workers based on the provided criteria
//   db.query(
//     `SELECT * FROM ${tableName} WHERE state = ? AND district = ? AND city = ?`,
//     [state, district, city],
//     (err, results) => {
//       if (err) {
//         console.error("Error executing query:", err);
//         return res.status(500).send("Error connecting to database");
//       }

//       // Send the list of workers found as a response
//       res.status(200).json(results);
//     }
//   );
// };

const db = require("../db"); // Import your database module

exports.findWorkers = (req, res) => {
  const { service, state, district, city } = req.body;

  // Determine the table name based on the service provided
  let tableName;
  if (service === "guide") {
    tableName = "guide";
  } else {
    tableName = "taxidriver";
  }

  // Validate and sanitize the table name
  const allowedTableNames = ["taxidriver", "guide"];
  if (!allowedTableNames.includes(tableName)) {
    return res.status(400).send("Invalid service name");
  }

  // Query the database to find workers based on the provided criteria
  db.query(
    `SELECT * FROM \`${tableName}\` WHERE state = ? AND district = ? AND city = ?`,
    [state, district, city],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).send("Error connecting to database");
      }

      // Send the list of workers found as a response
      res.status(200).json(results);
    }
  );
};
