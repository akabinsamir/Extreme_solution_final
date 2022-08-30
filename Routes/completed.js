
const express = require('express');
const router = express.Router();

const completedController = require('../Controllers/completed');

router.get('/completed/:id', completedController.listReport);
//here 1st

module.exports = router;