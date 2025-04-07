const pool = require('../DB.js');

async function getSuppliers(){
    try{
        const sql='SELECT s.  FROM users u , clients c WHERE  u.id=c.userId and u.roleId=3';
        const result = await pool.query(sql);
        console.log('result[0]')
        console.log(result[0])

        return result[0];
       }
    catch(err){
        throw err;
    }
  }