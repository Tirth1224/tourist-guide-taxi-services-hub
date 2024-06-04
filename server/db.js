const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Guide_Wheels_GW",
});
// We are storing image url in database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");

  // Create users table if it doesn't exist
  connection.query(
    `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    pin_code VARCHAR(10) NOT NULL,
    profile_image VARCHAR(255) 
  )`,
    (err) => {
      if (err) {
        console.error("Error creating users table:", err);
      } else {
        console.log("Users table created successfully");
      }
    }
  );

  // Create workers table if it doesn't exist
  connection.query(
    `CREATE TABLE IF NOT EXISTS taxidriver (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,        
    name VARCHAR(255) NOT NULL,      
    mobile VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    profession VARCHAR(255) NOT NULL,
    experience VARCHAR(255) NOT NULL,
    rating VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    pin_code VARCHAR(10) NOT NULL, 
    licence_number VARCHAR(50) NOT NULL,
    vehicle_type VARCHAR(50) NOT NULL,
    rc VARCHAR(50) NOT NULL,
    vehicle_number VARCHAR(50) NOT NULL,
    aadhar_number VARCHAR(255) NOT NULL,
    pancard_number VARCHAR(255) NOT NULL,  
    profile_image VARCHAR(255) 
  )`,
    (err) => {
      if (err) {
        console.error("Error creating workers table:", err);
      } else {
        console.log("Taxi Driver table created successfully");
      }
    }
  );
});

connection.query(
  `CREATE TABLE IF NOT EXISTS guide (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,    
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    profession VARCHAR(255) NOT NULL,
    experience VARCHAR(255) NOT NULL,
    rating VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    pin_code VARCHAR(10) NOT NULL,
    aadhar_number VARCHAR(255) NOT NULL,
    pancard_number VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255) 
  )`,
  (err) => {
    if (err) {
      console.error("Error creating workers table:", err);
    } else {
      console.log("Guide table created successfully");
    }
  }
);
connection.query(
  `CREATE TABLE IF NOT EXISTS review (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    rating FLOAT NOT NULL,
    message TEXT
  )`,
  (err) => {
    if (err) {
      console.error("Error creating review table:", err);
    } else {
      console.log("Review table created successfully");
    }
  }
);

connection.query(
  `CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_name VARCHAR(255) NOT NULL
)`,
  (err) => {
    if (err) {
      console.error("Error creating services table:", err);
    } else {
      console.log("Services table created successfully");
    }
  }
);

connection.query(
  `CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  worker_id INT NOT NULL,
  user_id INT NOT NULL,
  worker_type VARCHAR(255) NOT NULL,
  task_details TEXT NOT NULL,
  task_date DATE NOT NULL,
  task_time_slot VARCHAR(255) NOT NULL,
  status ENUM('pending', 'accepted', 'rejected', 'cancelled','in_progress','completed') DEFAULT 'pending'
)`,
  (err) => {
    if (err) {
      console.error("Error creating appointments table:", err);
    } else {
      // console.log('Appointments table created successfully');
    }
  }
);

module.exports = connection;
