const service = require('../services/supplierService');

async function getSupplier(req, res) {
    try {
        const data = await service.getSupplier(req.params.code)
        //req.session.supplier_id=data[0].supplier_id
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }

}
async function setSupplier(req, res) {
    try {
        const data = await service.newSupplier(req.body)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getSupplier ,setSupplier};