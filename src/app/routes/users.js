const dbConnection = require('../../config/dbConnection');
const users = require('../../models/users')
const jwt = require('jsonwebtoken')
const symptoms_x_users = require('../../models/symptoms_x_user')
const jwtMiddleware = require('express-jwt-middleware');
var jwtCheck = jwtMiddleware(process.env.JWT_SECCRET)
module.exports = app => {

  app.post('/user', async (req, res) => {
    const { name, address, identity, device_id, phone, country_code, mac_address } = req.body;
    var userData = { name, address, identity, device_id, phone, country_code, mac_address, ip_address: req.ipInfo.ip }
    let user = await users.getUserByIdentity(identity);
    if(user.error == "user_not_found") {
      let cantUsersByDevice = await users.countUsersByDevice(device_id);
      if(cantUsersByDevice > parseInt(process.env.CANT_USERS_BY_DEVICE))
        res.status(302).send("limit of useres for device exceded")
      else{
        let result = await users.addUser(userData)
        if(result.error) res.send(result)
        else {
          userData.id = result.insertId
          let token = jwt.sign(userData, process.env.JWT_SECCRET);
          res.status(200).send({token})
        }
      }
    }else{
      let token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT_SECCRET);
      res.status(200).send({token})
    }
  });

  app.post('/user/diagnosed',jwtCheck, async (req, res) => {
    const { diagnosed } = req.body;
    let result = await users.update({diagnosed: parseInt(diagnosed)},req.tokenData.id)
    if(result.error) res.status(500).send(result)
    else res.status(200).send(result)
  });

  app.post('/user/symptom',jwtCheck, async (req, res) => {
    const { symptom_id } = req.body;
    let new_symptom_x_users = await symptoms_x_users.add({symptom_id,user_id:req.tokenData.id});
    if(new_symptom_x_users.error) res.status(500).send(new_symptom_x_users)
    else res.status(200).send(new_symptom_x_users)
  });
};
