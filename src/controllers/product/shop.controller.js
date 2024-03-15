class shopController {
    getAll = async (req, res, next) => {
        res.render('product/shop');
    }
    getDetail=async(req,res,next)=>{
        let{name}=req.params;
        console.log(name);
        res.render('product/shop/detail',{name});
    }
}

module.exports = new shopController();