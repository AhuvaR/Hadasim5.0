const productModel = require('../models/productsModel')
const server = require('../server')
const db = require('../DB')



async function getAll() {
    try {
        const sql = `SELECT * FROM products`;
        const result = await db.queryFromSQL(sql);
        console.log(result)
        return result;
    }
    catch (err) {
        throw err;
    }
}


module.exports ={getAll} ;


// const query="SELECT * FROM products";
// sql.query(connectionString, query, (err, rows) => {
//     if (err) {
//         console.error('Error executing query:', err);  // הצגת שגיאה אם יש
//         return;
//     }
    
//     console.log('Rows:', rows);  // הצגת התוצאות
// });