const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.renderHome);
router.get('/dashboard', homeController.renderDashboard);

module.exports = router;