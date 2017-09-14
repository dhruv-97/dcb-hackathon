var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Banks = require('../models/bank');


var bankRouter = express.Router();

bankRouter.use(bodyParser.json());

bankRouter.route('/')
.get(function (req, res, next) {
    
    Banks.find({},function(err, banks) { 
        if (err) throw err;
        res.json(banks); 
    });
})

.post(function (req, res, next) {
    Banks.create(req.body, function (err, bank) {
        if (err) throw(err);
        console.log('Bank created!');
        var id = bank._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the bank with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Banks.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

bankRouter.route('/:bankId')
.get( function (req, res, next) {
    Banks.findById(req.params.bankId,function (err, bank) {
        if (err) next(err);
        if(bank==[])
            res.json([{name:"Dhruv Mongia",message:"Faculty messages will be posted here",
                date:createDate(),time:createTime()}]);
        else
            res.json(bank);
        });
})

.put(function (req, res, next) {
    Banks.findByIdAndUpdate(req.params.bankId, {
        $set: req.body
    }, {
        new: true
    }, function (err, bank) {
        if (err) next(err);
        res.json(bank);
    });
})

.delete(function (req, res, next) {
        Banks.findByIdAndRemove(req.params.bankId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
module.exports=bankRouter;