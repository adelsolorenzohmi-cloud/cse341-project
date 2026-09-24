const express = require('express');
const router = express.Router();
const zonesController = require('../controllers/zones');
const { isAuthenticated } = require('../middleware/authenticate');

// Public GET routes
router.get('/', zonesController.getAllZones);
router.get('/:id', zonesController.getZoneById);

// Protected routes (Require GitHub OAuth Authentication)
router.post('/', isAuthenticated, zonesController.createZone);
router.put('/:id', isAuthenticated, zonesController.updateZone);
router.delete('/:id', isAuthenticated, zonesController.deleteZone);

module.exports = router;