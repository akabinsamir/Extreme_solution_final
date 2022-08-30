const express = require('express');
const router = express.Router();

const listbyidController = require('../Controllers/listbyid');

router.get('/list/:id', listbyidController.listReport)
//here 1st

module.exports = router;