const {user} = require('../../models');
const bcrypt = require('bcrypt');
const secureRandom = require('secure-random');

module.exports = {
  create: async (req,res) => {
    const email = req.body.email;
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    
    try {
      const newUser = await user.create({firstName, lastName, email, hashedPassword});
      const token = secureRandom.randomBuffer(30).toString('hex');
      const userAuthEntry = await newUser.createUserAuth({authToken: token, lastActivity: new Date()});
      return res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
          authToken: token
        }
      })
    } catch(error) {
      return res.status(412).send({
        success: false,
        message: error.message
      })
    }
  },

  login: async (req,res) => {
    const {email, password} = req.body;
    
    try{
      const isuser = await user.findOne({
        where:{
          email: email
        }
      })

      if(isuser) {
        const ispassword = await bcrypt.compare(password, isuser.hashedPassword);
        const authrecord = await isuser.getUserAuth();
        let token = '';
        if(ispassword) {
          if(authrecord)
          {
            token = authrecord.authToken;
          } else { //If user auth entry is not found
            token = secureRandom.randomBuffer(30).toString('hex');
            const newauthrecord = await isuser.createUserAuth({authToken: token, lastActivity: new Date()});
          }

          return res.status(200).json({
            success: true,
            message: 'User logged-in successfully',
            data: {
              authToken: token
            }
          })
        } else {
          throw new Error('Invalid password');
        }
      } else {
        throw new Error('Invalid email');
      }
    }
    catch(error) {
      return res.status(401).send({
        success: false,
        message: error.message
      })
    }
  },

  logout: async (req,res) => {
    const activeuser = res.locals.activeuser;

    try {
      const userauthrecord = await activeuser.getUserAuth();
      const removeToken = await userauthrecord.destroy();
      if(removeToken) {
        return res.status(200).json({
          success: true,
          message: 'User logged out'
        })
      } else {
        throw new Error('Unable to logout at the moment');
      }

    } catch(error) {
      return res.status(500).send({
        success: false,
        message: error.message
      })
    }
  }
}
