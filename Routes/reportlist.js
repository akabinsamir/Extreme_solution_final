const express = require('express');
const router = express.Router();

const ReportlistController = require('../Controllers/reportlist');

router.get('/list', ReportlistController.listReport)
//here 1st

module.exports = router;