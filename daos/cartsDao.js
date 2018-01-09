var mogoose = require('mongoose'),
    Schema = mogoose.Schema;
var Carts = require('../models').Carts;

var _ = require('underscore');
var async = require('async');

//查询购物车列表
exports.getList = function(conditions, fields, options, callback){
    var limit = +options.pageSize,
        start = options.pageSize * (options.pageNum - 1);
    async.auto({
        findItems: function(callback){
            var query = Carts.find(conditions, fields || '-accountId -__v')
                .populate({
                    path: 'goodsId',
                    select:"-__v -productId" //不写就默认选全部
                }).lean().skip(start).limit(limit);
            query.exec(function(err, doc){
                callback(err, doc);
            })
        },
        itemCount: function(callback){
            Carts.count(conditions, function(err, doc){
                callback(err, doc);
            })
        }
    }, function(err, results){
        if(err){
            return callback(err, {});
        }

        var result = {
            goods: results.findItems,
            total: results.itemCount,
            pageCount: Math.ceil(results.itemCount/options.pageSize)
        }
        callback(null, result);
    })

}


//创建一个购物车
exports.save = function(obj, callback){
    var cart = new Carts(obj);
    cart.save(function(err, doc){
        if(err){
            return callback(err);
        }
        callback(null, doc);
    })
}



//增减，删除
exports.update = function(conditions, update, callback){
    Carts.findOneAndUpdate(conditions, update, function(err, doc){
        if(err){
            return callback(err)
        }
        callback(null, doc);
    })
}

exports.findOne = function(conditions, fields, callback){
    Carts.findOne(conditions, fields || "-__v", function(err, doc){
        if(err){
            return callback(err);
        }
        callback(null, doc);
    })
}

