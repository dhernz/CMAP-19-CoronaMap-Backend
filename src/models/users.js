const dbConnection = require('../config/dbConnection');

module.exports = {
    getUserByIdentity:(identity) => {
        return new Promise((resolve,reject)=>{
            dbConnection().query('SELECT * FROM users WHERE identity = ? ', identity, (err, result) => {
                if(err)
                    resolve({error: "error_on_mysql", info: error}) 
                else if(result.length > 0) 
                    resolve(result[0])
                else
                    resolve({error:"user_not_found"})
            });
        })
    },
    countUsersByDevice:(device_id) => {
        return new Promise((resolve,reject)=>{
            dbConnection().query('SELECT * FROM users WHERE device_id = ? ', device_id, (err, result) => {
                if(err)
                    resolve({error: "error_on_mysql", info: error}) 
                else
                    resolve(result.length)            
            });
        })
    },
    addUser:(userData) => {
        return new Promise((resolve,reject)=>{
            dbConnection().query('INSERT INTO users SET ? ',userData , (err, result) => {
                if(err) 
                    resolve({error: "error on mysql", info: error}) 
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
            dbConnection().query('UPDATE users SET '+dataToUpdate + ' WHERE id = ?' , array ,(err,results,fields)=>{
                if(err) 
                    resolve({error: "error on mysql", info: error}) 
                else
                    resolve(results)
            });
        })
    }
}