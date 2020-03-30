const dbConnection = require('../../config/dbConnection');
const conditions = require('../../models/conditions')
module.exports = app => {


  app.get('/conditions', async (req, res) => {
    let conditionsList = await conditions.getAll()
    res.status(200).send(conditionsList)    
  });
};
