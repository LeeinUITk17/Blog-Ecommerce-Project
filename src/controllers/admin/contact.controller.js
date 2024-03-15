const {
    addItem,
    getItems,
    deleteItem,
    getItemById,
    updateItem,
    getStatusCounts,
  } = require ("../../services/contact.service");
class contactController {
     getAll=async(req,res,next)=>{
     const  data=await getItems();
        res.render("admin/contact",{data});
     }
    getForm = async ( req , res , next) => {
        let { id } = req.params;
    if (id == "") {
      res.render("admin/contact/form");
    } else {
      let data = await getItemById(id);
      res.render("admin/contact/form", { data });
    }
    }
    deleteItem = async (req, res, next) => {
      let { id } = req.params;
      await deleteItem(id);
      req.flash("success", "Delete item thành công", false);
      res.redirect(`/admin`);
    };
   
}

module.exports = new contactController();

