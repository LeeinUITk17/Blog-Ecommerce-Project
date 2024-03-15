const{
    addItem,
}=require('../../services/bill.service');
class thanksController {
    getAll = async (req, res, next) => {
        res.render('product/thanks');
    }
    add=async(req,res,next)=>{
       console.log(req.body);
       await addItem(req.body);
        res.redirect('/shop/thanks');
      }
}

module.exports = new thanksController();