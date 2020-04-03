const dbConnection = require('../../config/dbConnection');
const users = require('../../models/users')
const jwt = require('jsonwebtoken')
const adminUsers = require('../../models/admin_users')
const jwtMiddleware = require('express-jwt-middleware');
var jwtCheck = jwtMiddleware(process.env.JWT_SECCRET)
const bcrypt = require("bcrypt");

module.exports = app => {
  app.post('/adminUserSignin', async (req, res) => {
    const { email, password } = req.body;
    let user = await adminUsers.getUserByEmail(email);
    console.log(password)
    
    /*bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          // Store hash in your password DB.
          console.log("--------------")
          console.log(err,hash)
      });
    });*/
    if(user.error == "user_not_found") {
      res.status(200).send({error:"No existe un usuario con ese correo"})
    } else {
      bcrypt.compare(password, user.password, function(err, result) {
        if(result){
          let token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT_SECCRET);
          res.status(200).send({token,name:user.name})
        }else{
          res.status(200).send({error:"Contraseña incorrecta"})
        }
      });
    }
  });

};
