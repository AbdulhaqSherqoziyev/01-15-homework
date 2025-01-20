const express = require('express');
const router = express.Router();
const deleteController = require('../controllers/deleteController');

router.delete('/delete/:filename', deleteController.deleteFile);

module.exports = router;