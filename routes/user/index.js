const userController = require('../../controllers/userController').userAccountControllerExport;
const userAuthController = require('../../controllers/authController').userAuthControllerExport;
const validate = require('../../middleware/validation-middleware');

let router = require('express').Router();

router.post('/', validate.createUser, userController.create);
router.post('/login', validate.loginUser, userController.login);
router.get('/logout', validate.authUser, userAuthController.authenticateUser, userController.logout);

router.all('*',(req,res)=>{
    res.status(404).send('Incorrect or unauthorized path');
})

module.exports = router;
