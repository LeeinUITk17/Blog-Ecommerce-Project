const {
    addItem,
    getItems,
    deleteItem,
    getItemById,
    updateItem,
    getStatusCounts,
  } = require("../../services/news.services");
class NewsController {
    async getForm(req, res, next) {
        try {
            const { id } = req.params;
            // console.log(id);
            if (id){
    const data = await getItemById(id);
                res.render('frontend/news', { data });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new NewsController();
