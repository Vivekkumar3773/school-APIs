const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

// Route to add a new school
router.post('/addSchool', schoolController.addSchool);

// Route to list schools sorted by proximity
router.get('/listSchools', schoolController.listSchools);

module.exports = router;
