const dbConnection = require('../../config/dbConnection');
const statusList = require('../../models/status')
module.exports = app => {


  app.get('/status', async (req, res) => {
    let statusAll = await statusList.getAll()
    if(!statusAll.error) {
      res.send(statusAll)
    }else{
      res.send(error).code(500)
    }
  });
};
