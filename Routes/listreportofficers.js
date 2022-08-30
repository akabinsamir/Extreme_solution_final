
const express = require('express');
const router = express.Router();

const listreportofficers = require('../Controllers/listreportofficers');

router.get('/listofficers/:id', listreportofficers.listReport);
//here 1st

module.exports = router;