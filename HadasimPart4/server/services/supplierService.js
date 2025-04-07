const server = require('../server')
const db = require('../DB')



async function getSupplier(code) {
    console.log("code"+code)
        console.log("codeccccccc")
    try {
        const sql = `SELECT * FROM supplier WHERE company_code='${code}'`;
        const result = await db.queryFromSQL(sql);
        console.log("code"+code)
        console.log("codeccccccc")
        return result;
    }
    catch (err) {
        throw err;
    }
}


module.exports ={getSupplier} ;

