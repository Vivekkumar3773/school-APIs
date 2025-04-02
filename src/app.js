const express = require('express');
const bodyParser = require('body-parser');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the school routes for API endpoints with /api
app.use('/api', schoolRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
