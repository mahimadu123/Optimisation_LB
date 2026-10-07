const express = require('express');
const premiumFeatureController = require('../controllers/premiumFeature');

const router = express.Router();

router.get('/showLeaderBoard', premiumFeatureController.getUserLeaderboard);

module.exports = router;