const productModel = require('../models/productsModel')
const server = require('../server')
const db = require('../DB')



async function getOrderBySupplier(id) {
    try {
        const sql = `select * from orders o left join products p on o.product_id=p.product_id where supplier_id=${id}`;
        const result = await db.queryFromSQL(sql);
        console.log(result)
        return result;
    }
    catch (err) {
        throw err;
    }
}


module.exports = { getOrderBySupplier };