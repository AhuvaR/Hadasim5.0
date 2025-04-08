const express = require('express');
const router = express.Router();
const productController=require('../controllers/productsController')


router.get("/", productController.getAll);
router.post('/',productController.setProducts)


module.exports = router;

