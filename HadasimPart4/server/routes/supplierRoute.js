const express = require('express');
const router = express.Router();
const supplierContoller=require('../controllers/supplierContoller')

router.get("/:code", supplierContoller.getSupplier);

module.exports = router;