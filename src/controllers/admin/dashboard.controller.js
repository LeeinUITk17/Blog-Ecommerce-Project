const {
    addItem,
    getItems,
    deleteItem,
    getItemById,
    updateItem,
    getStatusCounts,
  } = require("../../services/contact.service");
class DashboardController {
    getAll = async ( req , res , next) => {
        res.render('admin/dashboard');
    }
    updateStatus = async (req, res, next) => {
        try {
          const { id, status } = req.params;
          const newStatus = status === 'active' ? 'inactive' : 'active';
          await updateItem(id, { status: newStatus });
          res.status(200).json({ message: 'Successfully updated status', id, status: newStatus });
        //  res.redirect('/admin/dashboard');
        } catch (error) {
          console.error("Error during status update:", error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
        
    };
    deleteItem = async (req, res, next) => {
        let { id } = req.params;
        await deleteItem(id);
        req.flash("success", "Delete item thành công", false);
        res.redirect(`/admin`);
      };
}

module.exports = new DashboardController();

