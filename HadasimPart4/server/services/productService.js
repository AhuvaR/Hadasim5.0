
const server = require('../server')
const db = require('../DB')



async function getAll() {
    try {
        const sql = `SELECT * FROM products`;
        const result = await db.queryFromSQL(sql);
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function newProducts(productArray) {
    try {
        const results = [];
        for (let i = 0; i < productArray.length; i++) {
            const product = productArray[i];
            const query = `
                INSERT INTO products (supplier_id, product_name, product_price,minimum_items_for_order)
                OUTPUT INSERTED.product_id
                VALUES ('${product.supplier_id}', '${product.product_name}', '${product.product_price}','${product.minimum_items_for_order}' );
            `;
            
            const result = await db.queryFromSQL(query);  
            results.push(result);  
        }

        return results; 
    }
    catch {
        throw err;
    }
}



module.exports ={getAll,newProducts} ;


