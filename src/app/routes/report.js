const dbConnection = require('../../config/dbConnection');
const reports = require('../../models/reports')
const jwt = require('jsonwebtoken')
const symptoms_x_users = require('../../models/symptoms_x_user')
const jwtMiddleware = require('express-jwt-middleware');
var jwtCheck = jwtMiddleware(process.env.JWT_SECCRET)
module.exports = app => {

  app.post('/report', jwtCheck, async (req, res) => {
    const { latitude, longitude, status_id } = req.body;
    console.log(req.tokenData)
    var reportData = { latitude, longitude, status_id, user_id: req.tokenData.id, date: new Date(), last_update: Date.now() }
    let currentReport = await reports.getByUserId(parseInt(req.tokenData.id));
    console.log(currentReport);
    if(currentReport.error == "report_not_found") {
      console.log("report not found")
      let result = await reports.add(reportData)
      if(result.error) res.send(result)
      else {      
        console.log("success ==> ",result)  
        res.status(200).send({reportId:result.insertId})
      }
    }else{
      console.log("report found")
      let millisecondsToLastUpdate = currentReport.last_update
      let hoursToLastUpdate = (((Date.now() - millisecondsToLastUpdate) / 1000) / 60) / 60
      console.log(hoursToLastUpdate)
      if( parseInt(hoursToLastUpdate) > parseInt(process.env.LIMIT_HOUR_FOR_UPDATE)){
        res.status(200).send({error:"Espera "+hoursToLastUpdate+" horas para actualizar tu estado."})
      }else{
        let result = await reports.update(reportData,currentReport.id)
        if(result.error) res.send(result)
        else {      
          console.log("success ==> ",result)  
          res.status(200).send({reportId:currentReport.id})
        }
      }
    }
  });

  app.post('/updateReport', jwtCheck, async (req, res) => {
    const { sick_days, who_been, address, reportId } = req.body;
    console.log(req.tokenData)
    var reportData = { sick_days, who_been, address }
    let result = await reports.update(reportData,parseInt(reportId))
    if(result.error) res.send(result)
    else {      
      res.status(200).send({reportId:reportId})
    }
  });
  
  app.get('/report', jwtCheck, async (req, res) => {
    let reportResult = await reports.getByUserId(parseInt(req.tokenData.id))
      res.status(200).send(reportResult)
  });

  app.get('/report/:latitude/:longitude', jwtCheck, async (req, res) => {
    let latitude = parseFloat(req.params.latitude);
    let longitude = parseFloat(req.params.longitude);
    let reportResult = await reports.getByGeolocation(latitude,longitude)
    res.status(200).send(reportResult)    
  });
};
