const sql = require("msnodesqlv8");

const connectionString = "Driver={SQL Server};Server=localhost\\MSSQLSERVER01;Database=superMarket;Trusted_Connection=True;";


async function queryFromSQL(queryText ,params=[]){
    return new Promise((resolve, reject) => {
    sql.query(connectionString, queryText, params,(err, rows) => {
        if (err) {
            console.error('Error executing query:', err); 
            return reject(err);
        }
         
    resolve(rows)
    });
});
}

module.exports={queryFromSQL}

