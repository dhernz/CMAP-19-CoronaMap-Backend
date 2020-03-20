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
    var reportData = { latitude, longitude, status_id, user_id: req.tokenData.id, date: new Date() }
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
      let result = await reports.update(reportData,currentReport.id)
      if(result.error) res.send(result)
      else {      
        console.log("success ==> ",result)  
        res.status(200).send({reportId:currentReport.id})
      }
    }
  });
  app.get('/report', jwtCheck, async (req, res) => {
    let reportResult = await reports.getByUserId(parseInt(req.tokenData.id))
    if(!reportResult.error) {
      res.status(200).send(reportResult)
    }else{
      res.status(200).send(reportResult)
    }
  });
  app.get('/report/:latitude/:longitude', jwtCheck, async (req, res) => {
    let latitude = parseFloat(req.params.latitude);
    let longitude = parseFloat(req.params.longitude);
    let reportResult = await reports.getByGeolocation(latitude,longitude)
    res.status(200).send(reportResult)    
  });
};
