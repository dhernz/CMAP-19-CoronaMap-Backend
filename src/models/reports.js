const dbConnection = require('../config/dbConnection');

module.exports = {
    add:(data) => {
        return new Promise((resolve,reject)=>{
            dbConnection().query('INSERT INTO reports SET ? ',data , (err, result) => {
                if(err) 
                    resolve({error: "error on mysql", info: err}) 
                else
                    resolve(result)
            });
        });
    }
}