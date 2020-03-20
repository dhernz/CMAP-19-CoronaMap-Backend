const dbConnection = require('../../config/dbConnection');
const statusList = require('../../models/status')
module.exports = app => {


  app.get('/status', async (req, res) => {
    let statusAll = await statusList.getAll()
    if(!statusAll.error) {
      res.status(200).send(statusAll)
    }else{
      res.status(500).send(statusAll)
    }
  });
};
