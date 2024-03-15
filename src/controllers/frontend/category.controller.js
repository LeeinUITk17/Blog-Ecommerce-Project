class categoryController {
    getAll = async (req, res, next) => {
        let{slug}=req.params; 
        res.render('frontend/category',{slug});
    }
}

module.exports = new categoryController();