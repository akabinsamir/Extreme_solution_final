const express = require('express');
const router = express.Router();

const officersallowedController = require('../Controllers/officersallowed');

router.get('/allowedofficers/:id', officersallowedController.listReport)
//here 1st

module.exports = router;