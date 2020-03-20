const dbConnection = require('../config/dbConnection');

module.exports = {
    getByUserId:(userId) => {
        return new Promise((resolve,reject)=>{
            dbConnection().query('SELECT * FROM reports WHERE user_id = ? ', userId, (err, result) => {
                if(err)
                    resolve({error: "error_on_mysql", info: err}) 
                else if(result.length > 0) 
                    resolve(result[0])
                else
                    resolve({error:"report_not_found"})
            });
        })
    },
    add:(data) => {
        return new Promise((resolve,reject)=>{
            dbConnection().query('INSERT INTO reports SET ? ',data , (err, result) => {
                if(err) 
                    resolve({error: "error on mysql", info: err}) 
                else
                    resolve(result)
            });
        });
    },
    update: (report,id) => {
        return new Promise((resolve,reject)=>{
            let dataToUpdate = "";
            let array = [];
            Object.keys(report).forEach(key=>{
                if(dataToUpdate != "")dataToUpdate+=",";
                dataToUpdate += key+" = ? ";
                array.push(report[key]);
            });
            array.push(id);
            dbConnection().query('UPDATE reports SET '+dataToUpdate + ' WHERE id = ?' , array ,(err,results,fields)=>{
                if(err) 
                    resolve({error: "error on mysql", info: err}) 
                else
                    resolve(results)
            });
        })
    }
}