const sql = require("msnodesqlv8");
// const { query } = require("mssql");

const connectionString = "Driver={SQL Server};Server=localhost\\MSSQLSERVER01;Database=superMarket;Trusted_Connection=True;";


async function queryFromSQL(queryText){
    return new Promise((resolve, reject) => {
    sql.query(connectionString, queryText, (err, rows) => {
        if (err) {
            console.error('Error executing query:', err);  // הצגת שגיאה אם יש
            return reject(err);
        }
        
        console.log('Rows:', rows);  // הצגת התוצאות
    resolve(rows)
    });
});
}

module.exports={queryFromSQL}

// const query="SELECT * FROM products";



/*
// async function getSuppliers() {
//     try {
//         let pool = await sql.connect(config);
//         let result = await pool.request().query('SELECT * FROM supplier');
//         console.log(result.recordset);
//     } catch (err) {
//         console.error('Database connection error:', err);
//     }
// }

// getSuppliers();
*/
// sql.query(connectionString, query, (err, rows) => {
//     if (err) {
//         console.error('Error executing query:', err);  // הצגת שגיאה אם יש
//         return;
//     }
    
//     console.log('Rows:', rows);  // הצגת התוצאות
// });
