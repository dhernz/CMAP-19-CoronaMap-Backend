const dbConnection = require('../../config/dbConnection');
const symptoms = require('../../models/symptoms')
module.exports = app => {


  app.get('/symptoms', async (req, res) => {
    let symptomsList = await symptoms.getAll()
    res.status(200).send(symptomsList)    
  });
};
