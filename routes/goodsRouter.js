var express = require('express');
var goodsRouter = express.Router();

var models = require('../models');
var Goods = models.Goods;
var goodsDao = require('../daos/goodsDao');

var async = require('async');
var _ = require('underscore');
var URL = require('url');
var uitls = require('../utils');
var looger = require('../Logger');


goodsRouter.get('/list', function(req, res, next){
    var params = URL.parse(req.url, true);
    var queryParams = req.query;
    queryParams.pageSize = queryParams.pageSize || 8;//默认取8条
    queryParams.pageNum = queryParams.pageNum || 1;//默认第一页
    queryParams.sort = queryParams.sort || 1;

    var status = 400,
        errmsg = "";
    async.auto({
        getInfo: function(callback){
            goodsDao.getList({}, null, queryParams, function(err, result){
                if(err){
                    status = 500;
                    return callback(err);
                }
                callback(null, result);
            })
        }
    },function(err, results){
        if(err){
            return uitls.resToClient(res, params, {status: status, msg: err.message});
        }
        var data = results.getInfo;
        _.extend(data, {status: 200})
        uitls.resToClient(res, params, data);
    })
})

goodsRouter.get('/add', function(req, res, next){
    var params = URL.parse(req.url, true);
    var obj = {
        productId: 100001,
        productName: "小米6",
        salePrice: 2499,
        productImg: "1.jpg",
        productNum: 100
    }
    goodsDao.save(obj, function(err, result){
        uitls.resToClient(res, params, {status: 200, data: result})
    })
})

module.exports = goodsRouter;