
const server = require('../server')
const db = require('../DB')



async function getOrderBySupplier(id) {
    try {
        const sql = `select * from orders o left join products p on o.product_id=p.product_id where supplier_id=${id}`;
        const result = await db.queryFromSQL(sql);
        return result;
    }
    catch (err) {
        throw err;
    }
}


module.exports = { getOrderBySupplier };