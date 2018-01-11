var express = require('express'),
    orderRouter = express.Router();
var ordersDao = require('../daos/ordersDao');

var async = require('async'),
    _ = require('underscore'),
    Logger = require('../Logger'),
    utils = require('../utils');


orderRouter.post('/save', function(req, res){
    var params = req.params;
    var body = req.body;
    var queryparams = req.query,
        accountId = queryparams.accountId,
        addressId = queryparams.addressId;
    var status = 400,
        errmsg = "";


    if(_.isEmpty(accountId) || _.isEmpty(addressId)){
        errmsg = "accountId or addressId is empty"
    }

    if(_.isEmpty(body)){
        errmsg = "body is empty";
    }

    if(errmsg){
        return utils.resToClient(res, params, {status: status, errmsg: errmsg});
    }

    //合并body和两个queryparams属性
    _.extend(body, queryparams);
    console.log(body);
    ordersDao.addOrder(body, function(err, doc){

        Logger.info("==== addorder result ====", doc);
        if(err){
            return utils.resToClient(res, params, {status: 500, errmsg: err.message})
        }

        utils.resToClient(res, params, {status: '200', msg: '保存成功'});
    })


})


//订单查询
orderRouter.get('/list', function(req, res, next){
    var params = req.params;
    var queryparams = req.query,
        accountId = queryparams.accountId;
    queryparams.pageNum = queryparams.pageNum || 1,
    queryparams.pageSize = queryparams.pageSize || 10;

    var status = 400,
        errmsg = "";

    if(_.isEmpty(accountId)){
        errmsg = "accountId is empty";
    }

    if(errmsg){
        return utils.resToClient(res, params, {status: status, errmsg: errmsg});
    }

    ordersDao.getList({accountId: accountId}, null, queryparams, function(err, doc){
        if(err){
            return utils.resToClient(res, params, {status: 500, errmsg: err.message});
        }
        _.extend(doc, {status: 200})
        utils.resToClient(res, params, doc)
    })


})


module.exports = orderRouter;