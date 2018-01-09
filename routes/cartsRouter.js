var express = require('express'),
    cartsRouter = express.Router();

var models = require('../models'),
    Carts = models.Carts;
var cartsDao = require('../daos/cartsDao');

var async = require('async');
var _ = require('underscore');
var URL = require('url');
var utils = require('../utils');
var looger = require('../Logger');


//添加到购物车
cartsRouter.get('/add', function(req, res, next){
    var params = URL.parse(req.url, true);
    var queryParams = req.query;
    var accountId = queryParams.accountId,
        goodsId = queryParams.goodsId;

    var status = 400;
    var errmsg = "";

    if(_.isEmpty(goodsId) || _.isEmpty(accountId)){
        errmsg = "goodsId or accountId is empty";
    }

    if(errmsg){
        return utils.resToClient(res, params, {status:status, errmsg: errmsg});
    }

    looger.info('----add to cart---');

    async.auto({
        findCart: function(callback){
            cartsDao.findOne(queryParams, null, function(err, doc){
                if(err){
                    return callback(null);
                }

                callback(null, doc);
            })
        },
        saveToMogodb: ["findCart", function(result, callback){
            var cart_db = result.findCart;
            if(_.isEmpty(cart_db)){//目前该商品没有加入购物车
                cart_db = queryParams;
            }else{
                cart_db.num++;
            }


            cartsDao.save(cart_db, function(err, doc){
                if(err){
                    return callback(err);
                }
                callback(null, doc);
            })
        }]
    }, function(err, results){
        if(err){
            return utils.resToClient(res, params, {status: 500, errmsg: err.message});
        }

        var obj = {
            status: 200,
            msg: '保存成功',
            data: results.saveToMogodb
        }

        utils.resToClient(res, params, obj);
    })
})

//购物车查询
cartsRouter.get('/list', function(req, res, next){
    var params = URL.parse(req.url, true);
    var queryparams = req.query;
    queryparams.pageNum = queryparams.pageNum || 1;
    queryparams.pageSize = queryparams.pageSize || 10;
    var accountId = queryparams.accountId;

    var status = 400,
        errmsg = "";

    if(_.isEmpty(accountId)){
        errmsg = "accountId is empty";
    }

    if(errmsg){
        return utils.resToClient(res, params, {status: status, errmsg: errmsg})
    }

    async.auto({
        findItems: function(callback){
            cartsDao.getList({accountId: accountId}, null, queryparams, function(err, doc){
                if(err){
                    return callback(err);
                }
                callback(null, doc);
            })
        }
    }, function(err, results){
        if(err){
            return utils.resToClient(res, params, {status: 500, errmsg: err.message})
        }
        utils.resToClient(res, params, {status: 200, data: results.findItems})
    })
})

module.exports = cartsRouter;