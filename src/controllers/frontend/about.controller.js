const { getGoldValue } = require('../../helper/api.helper');

class AboutController {
    getAll = async (req, res, next) => {
        try {
            const goldData = await getGoldValue(); 
            res.render('frontend/about', { goldData });
        } catch (error) {
            console.error('Error in aboutController:', error);
            res.status(500).render('error', { error });
        }
    }
}

module.exports = new AboutController();
