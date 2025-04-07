const service = require('../services/orderService');

async function getOrderBySupplier(req, res) {
    try {
        const data = await service.getOrderBySupplier(req.params.id)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getOrderBySupplier };