const express = require('express');
const router = express.Router();

const ReportController = require('../Controllers/report');

router.get('/submit', ReportController.submitReport)
//here 1st

module.exports = router;