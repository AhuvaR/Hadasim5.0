const express = require('express');
const router = express.Router();
const supplierContoller=require('../controllers/supplierContoller')

router.get("/:code", supplierContoller.getSupplier);
router.post('/',supplierContoller.setSupplier)



  

module.exports = router;