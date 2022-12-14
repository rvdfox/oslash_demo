const {shortcut} = require('../../models');
const {user} = require('../../models');
const {Op} = require('sequelize');
const { query } = require('express');
const sequelize = require('sequelize');

module.exports = {
  create: async(req, res) => {
    const { shortlink, description, url, tags} = req.body;
    const activeuser = res.locals.activeuser;
    
    try{
      console.log(`Tags ${JSON.stringify(req.body.description)}`);
      const duplicateUrl = await activeuser.getShortcuts({ where : { fullurl : url }});
      if(duplicateUrl.length)throw new Error('Shortlink already exists for given url');
  
      const duplicateShortcut = await activeuser.getShortcuts({ where : { shortlink : shortlink }});
      if(duplicateShortcut.length) throw new Error('Provided Shortcut already in use');

      const newShortcut = await activeuser.createShortcut({ shortlink, fullurl: url, tags,  description});
      
      return res.status(201).json({
          success: true,
          message: 'Shotcut created successfully',
          data: {
            shortcut: shortlink,
            fullurl: url
          }
        })
    } catch(error) {
        return res.status(500).send({
            success: false,
            message: error.message
          })
    }
  },

  list: async(req, res) =>{
    const { sort, order, sort_by } = req.query;
    const activeuser = res.locals.activeuser;
    let order_object = ['id'];
    if(sort == 'yes')
    {
      order_object = [sort_by, (order == 'descending')? 'DESC': 'ASC' ]
    }
    
    try{
      const shortcutList = await activeuser.getShortcuts({
        order: [order_object]
      })
      return res.status(200).send({
        success: true,
        data: shortcutList
      })
    
    } catch(error) {
      return res.status(500).send({
        success: false,
        message: error.message
      })
    }
  },

  delete: async(req, res) =>{
    const shortcutId = req.params.id;
    const activeuser = res.locals.activeuser;

    try {
      const shortcutEntry = await activeuser.getShortcuts({where:{id:shortcutId}});
      if(!shortcutEntry.length) throw new Error('Invalid Id provided or entry already deleted');
      else {
        await shortcutEntry[0].destroy();
        return res.status(200).json({
          success: true,
          message: 'Shortcut deleted successfully'
        })
      }
    } catch(error) {
      return res.status(500).send({
        success: false,
        message: error.message
      })
    }
  },

  search: async(req, res) =>{
    const { query } = req.query;
    const activeuser = res.locals.activeuser;

    try {
      const shortcuts = await activeuser.getShortcuts({
        where:{
          [Op.or]:[
            { shortlink: {[Op.iLike]: '%'+query+'%'} },
            { description: {[Op.iLike]: '%'+query+'%'} },
            { tags: {[Op.iLike]: '%'+query+'%'} }
          ]
        }
      })

      return res.status(200).send({
        success: true,
        data: shortcuts
      })
    } catch(error){
      return res.status(500).send({
        success: false,
        message: error.message
      })
    }
  }

}
