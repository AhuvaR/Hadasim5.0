const service = require('../services/productService');

async function getAll(req, res) {
    try {
        const data = await service.getAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function setProducts(req, res){
    try {
           const data = await service.newProducts(req.body)
           res.json(data);
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   }

module.exports = { getAll ,setProducts};