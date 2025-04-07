
const productModel = class product {

    constructor(id, s_id, name, price) {
        this.id = id;
        this.suplplierId = s_id
        this.name = name;
        this.price = price;
    }

}

module.exports = productModel








// const pool = require('../DB.js');

// async function getProducts(){
//     try{
//         const sql='SELECT *  FROM products WHERE  ';
//         const result = await pool.query(sql);
//         console.log('result[0]')
//         console.log(result[0])

//         return result[0];
//        }
//     catch(err){
//         throw err;
//     }
//   }
//   module.exports = { getProducts}