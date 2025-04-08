const server = require('../server')
const db = require('../DB')


async function getSupplier(code) {
    try {
        const query = `SELECT * FROM supplier WHERE company_code='${code}'`;
        const result = await db.queryFromSQL(query);
        return result;

    }
    catch (err) {
        throw err;
    }
}

async function newSupplier(supplier) {
    try {
        const query = `INSERT INTO supplier (company_name, company_code, phone_number, supplier_name)
                        OUTPUT INSERTED.supplier_id
                        VALUES ('${supplier.company_name}', '${supplier.company_code}', '${supplier.phone_number}', '${supplier.supplier_name}');`;

        const result = await db.queryFromSQL(query)
        return result
    }
    catch {
        throw err;
    }
}




module.exports = { getSupplier, newSupplier };

