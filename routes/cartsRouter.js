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
        checkCart: function(callback){
            cartsDao.findOne({accountId: accountId}, null, function(err, doc){
                looger.info(doc);
                if(err){
                    return callback(err);
                }

                if(_.isEmpty(doc)){
                    var cart = {
                        accountId: accountId,
                        goods: []
                    }

                    return cartsDao.save(obj, function(err, doc){
                        if(err){
                            return callback(err);
                        }
                        callback(null, doc)
                    })
                }
                callback(null, doc)
            })
        },
        findGoodsAndAdd: ["checkCart", function(result, callback){
            var conditions = {
                accountId: accountId,
                goods: [{goodsId: goodsId}]
            }
            cartsDao.findOne(conditions, null, function(err, doc){
                looger.info("---find goods---", doc)
                if(err){
                    return callback(err);
                }

                if(_.isEmpty(doc)){
                    return result.goods.push({goodsId: goodsId, num: 1})
                }
            })
        }]
    }, function(err, results){
        if(err){
            return utils.resToClient(res, params, {status: 500, errmsg: err.message});
        }

        console.log(results);
    })
})


cartsRouter.get('/save', function(req, res, next){
    var queryparams = req.query;
    console.log(queryparams);
    cartsDao.save(queryparams, function(err, doc){
        console.log(doc);
    })
})

module.exports = cartsRouter;