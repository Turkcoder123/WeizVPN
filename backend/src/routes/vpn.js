const express = require('express');
const router = express.Router();
const vpnController = require('../controllers/vpnController');
const authMiddleware = require('../middleware/auth');

// Public endpoints
router.get('/servers', vpnController.getServers);
router.get('/servers/:id', vpnController.getServerById);

// Protected endpoints
router.post('/connect', authMiddleware, vpnController.connect);
router.post('/disconnect', authMiddleware, vpnController.disconnect);
router.get('/status', authMiddleware, vpnController.getStatus);
router.get('/usage', authMiddleware, vpnController.getUsage);

module.exports = router;
