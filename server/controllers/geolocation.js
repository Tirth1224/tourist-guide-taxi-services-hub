// geolocationController.js
const db = require("../db");

exports.state = (req, res) => {
  const query =
    "SELECT id, name FROM geo_locations WHERE location_type = 'State'";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

exports.district = (req, res) => {
  const stateId = req.params.stateId;
  const query =
    "SELECT id, name FROM geo_locations WHERE location_type = 'District' AND parent_id = ?";
  db.query(query, [stateId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

exports.city = (req, res) => {
  const districtId = req.params.districtId;
  const query =
    "SELECT id, name, pin FROM geo_locations WHERE location_type = 'SUBDISTRICT' AND parent_id = ?";
  db.query(query, [districtId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};
