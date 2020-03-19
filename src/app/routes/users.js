const dbConnection = require('../../config/dbConnection');
const users = require('../../models/users')
const symptoms_x_users = require('../../models/symptoms_x_user')
module.exports = app => {

  app.post('/user', async (req, res) => {
    const { name, address, identity, device_id, phone, country_code, mac_address } = req.body;
    let user = await users.getUserByIdentity(identity);
    if(user.error == "user_not_found") {
      let cantUsersByDevice = await users.countUsersByDevice(device_id);
      if(cantUsersByDevice > parseInt(process.env.CANT_USERS_BY_DEVICE))
        res.send("limit of useres for device exceded")
      else{
        let result = await users.addUser({ name, address, identity, device_id, phone, country_code, mac_address, ip_address: req.ipInfo.ip })
        if(result.error) res.send(result.error)
        else res.send(result)
      }
    }else{
      res.send(user)
    }
  });

  app.post('/user/diagnosed', async (req, res) => {
    const { diagnosed, user_id } = req.body;
    let result = await users.update({diagnosed: parseInt(diagnosed)},user_id)
    if(result.error) res.send(result.error)
    else res.send(result)
  });

  app.post('/user/symptom', async (req, res) => {
    const { symptom_id, user_id } = req.body;
    let new_symptom_x_users = await symptoms_x_users.add({symptom_id,user_id});
    if(new_symptom_x_users.error) res.send(new_symptom_x_users.error)
    else res.send(new_symptom_x_users)
  });
};
