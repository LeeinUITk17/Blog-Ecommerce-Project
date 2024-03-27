const ensureadmin = (req, res, next) => {
    if (!req.user) {
         return res.redirect('/admin/login'); 
    }
    if (req.user.role !== 'admin') {
        return res.status(403).send('You do not have permission to access this page.');
    }
    next();
}

module.exports = ensureadmin;
