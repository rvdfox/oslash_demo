const shortcutController = require('../../controllers/shortcutController').shortcutControllerExport;
const userAuthController = require('../../controllers/authController').userAuthControllerExport;
const validate = require('../../middleware/validation-middleware');

let router = require('express').Router();

router.post('/', validate.authUser, userAuthController.authenticateUser, validate.createShortcut, shortcutController.create);
router.get('/', validate.authUser, userAuthController.authenticateUser, validate.listShortcut, shortcutController.list);
router.delete('/:id', validate.authUser, userAuthController.authenticateUser, shortcutController.delete);
router.get('/search', validate.authUser, userAuthController.authenticateUser, shortcutController.search);

router.all('*',(req,res)=>{
    res.status(404).send('Incorrect or unauthorized path');
})

module.exports = router;
