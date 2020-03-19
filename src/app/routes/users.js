const dbConnection = require('../../config/dbConnection');
const users = require('../../models/users')
module.exports = app => {

  const connection = dbConnection();

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
};
