const dbConnection = require('../config/dbConnection');

module.exports = {
    getAll:() => {
        return new Promise((resolve,reject)=>{
            dbConnection().query('SELECT * FROM symptoms', (err, result) => {
                if(err)
                    resolve({error: "error_on_mysql", info: err}) 
                else
                    resolve(result)
            });
        })
    }
}