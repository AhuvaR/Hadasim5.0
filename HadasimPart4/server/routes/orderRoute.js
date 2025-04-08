const express = require('express');
const router = express.Router();
const orderController=require('../controllers/orderController')

router.get("/:id", orderController.getOrderBySupplier)

// router.get("/:id",(req,res,next)=>{
//     const supplier_id_from_url=req.params.id
//     const supplier_id_from_session=req.session.supplier_id
//     if(supplier_id_from_url!=String(supplier_id_from_session)){
//         console.log(supplier_id_from_url)
//         console.log(supplier_id_from_session)
//         console.log('אין לך הרשאה לצפות בהזמנות האלה')
//         return res.status(403).send('אין לך הרשאה לצפות בהזמנות האלה');
//     }
//      orderController.getOrderBySupplier
// });




module.exports = router;