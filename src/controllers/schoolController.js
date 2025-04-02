const mysql = require('mysql');

// Create a connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306 // Default MySQL port
});

// Example query
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Database connected successfully');
  connection.release();
});

module.exports = db;

// Controller function to add a new school
exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validate input data
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).send('All fields are required');
  }

  // Insert the new school into the database
  const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  db.query(query, [name, address, latitude, longitude], (err, results) => {
    if (err) throw err;
    res.status(201).send('School added successfully');
  });
};

// Controller function to list schools sorted by proximity
exports.listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  // Validate input data
  if (!latitude || !longitude) {
    return res.status(400).send('Latitude and longitude are required');
  }

  // Fetch all schools from the database
  const query = 'SELECT * FROM schools';
  db.query(query, (err, results) => {
    if (err) throw err;

    // Calculate the distance for each school and sort by proximity
    const schools = results.map(school => {
      const distance = calculateDistance(latitude, longitude, school.latitude, school.longitude);
      return { ...school, distance };
    });

    schools.sort((a, b) => a.distance - b.distance);
    res.status(200).json(schools);
  });
};

// Function to calculate the distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

// Function to convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
