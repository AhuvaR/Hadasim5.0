const express = require('express');
const router = express.Router();
const supplierContoller=require('../controllers/supplierContoller')

router.get("/:code", supplierContoller.getSupplier);
router.post('/',supplierContoller.setSupplier)

// router.post('/',async (req, res) => {
//     console.log(' הגיעה בקשה ל-POST /login');
//     supplierContoller.setSupplier(req, res);
// });

  

module.exports = router;