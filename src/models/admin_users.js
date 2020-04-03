const dbConnection = require('../config/dbConnection');

module.exports = {
    getUserByEmail:(email) => {
        return new Promise((resolve,reject)=>{
            dbConnection.query('SELECT * FROM admin_users WHERE email = ? ', email, (err, result) => {
                if(err)
                    resolve({error: "error_on_mysql", info: err}) 
                else if(result.length > 0) 
                    resolve(result[0])
                else
                    resolve({error:"user_not_found"})
            });
        })
    },
    addUser:(userData) => {
        return new Promise((resolve,reject)=>{
            dbConnection.query('INSERT INTO admin_users SET ? ',userData , (err, result) => {
                if(err) 
                    resolve({error: "error on mysql", info: err}) 
                else
                    resolve(result)
            });
        });
    },
    update: (user,id) => {
        return new Promise((resolve,reject)=>{
            let dataToUpdate = "";
            let array = [];
            Object.keys(user).forEach(key=>{
                if(dataToUpdate != "")dataToUpdate+=",";
                dataToUpdate += key+" = ? ";
                array.push(user[key]);
            });
            array.push(id);
            dbConnection.query('UPDATE admin_users SET '+dataToUpdate + ' WHERE id = ?' , array ,(err,results,fields)=>{
                if(err) 
                    resolve({error: "error on mysql", info: err}) 
                else
                    resolve(results)
            });
        })
    }
}