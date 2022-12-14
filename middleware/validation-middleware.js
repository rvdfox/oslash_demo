const validator =  require('../helpers/validate');

const validationFn = async(data, validationRule, res, next) =>{
  await validator(data, validationRule, {}, (err)=>{
    if(err)
    {
      console.log('Validation check ',err);
      res.status(412)
        .send({
          success: false,
          message: 'validation failed',
          data: err
        })
    }
    else{
      next();
    }
  }).catch((err)=>{
    console.log(err);
  })
}

const createUser = async(req, res, next) => {
  const validationRule = {
      "email": "required|string|email",
      "firstname": "required|string",
      "lastname": "required|string",
      "password": "required|string"
  }

  validationFn(req.body, validationRule, res, next);
}

const authUser = async(req, res, next) => {
  const validationRule = {
    "authToken":"required|string"
  }

  validationFn({authToken: req.query.authToken || req.body.authToken}, validationRule, res, next);
}

const loginUser = async(req, res, next) => {
  const validationRule = {
    "email":"required|string|email",
    "password":"required|string"
  }

  validationFn(req.body, validationRule, res, next);
}

const createShortcut = async(req, res, next) =>{
  const validationRule = {
    "shortlink":"required|string",
    "description":"string",
    "url":"required|url"
  }

  validationFn(req.body, validationRule, res, next);
}

const listShortcut = async(req, res, next) => {
  const validationRule = {
    "sort":"required|in:yes,no",
    "order":"in:ascending,descending",
    "sort_by":"in:createdAt,shortlink,description,fullurl"
  }
  
  validationFn(req.query, validationRule, res, next);
}

module.exports = {
    createUser,
    loginUser,
    authUser,
    createShortcut,
    listShortcut
}


