const dbConnection = require('../../config/dbConnection');
const symptoms = require('../../models/symptoms')
module.exports = app => {


  app.get('/symptoms', async (req, res) => {
    let symptomsList = await symptoms.getAll()
    if(!symptomsList.error) {
      res.status(200).send(symptomsList)
    }else{
      res.status(500).send(error)
    }
  });
};
