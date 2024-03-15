const {
    addItem,
    getItems,
    deleteItem,
    getItemById,
    updateItem,
    getStatusCounts,
  } = require("../../services/productView.service");
class viewproductController {
    async getForm(req, res, next) {
        try {
            const { id } = req.params;
            if (id){
    const data = await getItemById(id);
                res.render('product/viewproduct', { data });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new viewproductController();