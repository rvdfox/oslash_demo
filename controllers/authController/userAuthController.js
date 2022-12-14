const {user} = require('../../models');
const {userAuth} = require('../../models');

module.exports = {
	authenticateUser: async (req, res, next) => {
		let success = false;
		var msg = '';
		var value;
		let token = req.query.authToken || req.body.authToken;
		
        try{
            const isuser = await userAuth.findOne({
                    where:{
                        authToken:token
                    },
                    include: {
                        model: user,
                        attributes: ['accountStatus']
                    }
                })
            if(isuser && isuser.user.accountStatus == 'ACTIVE') {
                res.locals.activeuser = await isuser.getUser();
                await isuser.update({lastActivity: new Date()});
                next();
            } else {
                throw new Error('Invalid credentials, please contact support');
            }
        } catch(error) {
            return res.status(401).send({
                        success: false,
                        message: error.message
                    })
        }
    }
}
