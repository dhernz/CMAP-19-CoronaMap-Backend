const dbConnection = require('../../config/dbConnection');
const users = require('../../models/users')
const jwt = require('jsonwebtoken')
const symptoms_x_users = require('../../models/symptoms_x_user')
const jwtMiddleware = require('express-jwt-middleware');
var jwtCheck = jwtMiddleware(process.env.JWT_SECCRET)
module.exports = app => {

  app.post('/user', async (req, res) => {
    const { name, address, identity, gender, birthDate, device_id, phone, country_code, mac_address } = req.body;
    console.log(req.body)
    var userData = { name, address, identity, gender, birthdate : new Date(birthDate), device_id, phone, country_code, mac_address, ip_address: req.ipInfo.ip }
    let user = await users.getUserByIdentity(identity);
    let userPhone = await users.getUserByPhone(phone);
    if(!user.error){
      res.status(200).send({error:"Esta identidad ya esta registrada"})
    } else if(!userPhone.error) {
      res.status(200).send({error:"Este telefono ya esta registrado"})
    } else if(user.error == "error_on_mysql"){
      res.status(200).send(user)
    } else {
      let cantUsersByDevice = await users.countUsersByIp(req.ipInfo.ip);
      if(cantUsersByDevice > parseInt(process.env.CANT_USERS_BY_DEVICE))
        res.status(200).send({error:"Por medidas de seguridad no se puede crear mas de "+process.env.CANT_USERS_BY_DEVICE+" usuarios por dispositivo"})
      else{
        let result = await users.addUser(userData)
        if(result.error) res.send(result)
        else {
          userData.id = result.insertId
          let token = jwt.sign(userData, process.env.JWT_SECCRET);
          res.status(200).send({token})
        }
      }
    }
  });

  app.post('/userSignin', async (req, res) => {
    const { identity } = req.body;
    console.log(req.body)
    let user = await users.getUserByIdentity(identity);
    if(user.error == "user_not_found") {
      res.status(200).send(user)
    } else {
      let token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT_SECCRET);
      res.status(200).send({token,name:user.name})
    }
  });

  app.post('/user/diagnosed',jwtCheck, async (req, res) => {
    const { diagnosed } = req.body;
    let result = await users.update({diagnosed: parseInt(diagnosed)},req.tokenData.id)
    res.status(200).send(result)
  });

  app.post('/user/symptom',jwtCheck, async (req, res) => {
    const { symptom_id } = req.body;
    let new_symptom_x_users = await symptoms_x_users.add({symptom_id,user_id:req.tokenData.id});
    res.status(200).send(new_symptom_x_users)
  });

};
