var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var fraudRouter = express.Router();

fraudRouter.use(bodyParser.json());

fraudRouter.route('/')
.post(function (req, res, next) {
    console.log(req.body);
    let complete=''; 
    Object.keys(req.body).forEach((key, index) => {
      console.log(req.body[key]);
      if(req.body[key]!='')
        complete+='&'+key+'='+req.body[key];
    });
    console.log(complete);
    request('https://api.fraudlabspro.com/v1/order/screen?key=TBT0WDBFIIBNXCVCKMWJLAKSRKNHHCHB&format=json'+complete, function(err,resp,body){
      if(err)
          throw err;
      body= JSON.parse(body);
      if(body.fraudlabspro_status=="APPROVE" && req.body.ccn.length==16)
        res.send("This transaction is approved");
      else if(body.fraudlabspro_status=="REVIEW")
        res.send("This transaction is risky and must be checked manually");
      else
        res.send("This transaction is rejected due to high risk");
    });
});
module.exports=fraudRouter;