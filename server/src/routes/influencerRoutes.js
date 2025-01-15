const express = require('express');
const router = express.Router();
const {processIncluencer} = require("../controller/influencerController");

router.get('/process-influencer', processIncluencer);

module.exports = router;