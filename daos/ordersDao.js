var model = require('../models'),
    Orders = model.Orders;

var async = require('async'),
    _ = require('underscore'),
    Logger = require('../Logger');


exports.addOrder = function(obj, callback){//添加订单
    var order = new Orders(obj);
    order.save(function(err, doc){
        callback(err, doc);
    })
}

exports.getList = function(conditions, fields, options, callback){
    var pageSize = +options.pageSize,
        start = (options.pageNum - 1) * pageSize;


    async.auto({
        findItems: function(callback){
            var query = Orders.find(conditions, fields || "-__v")
                .populate({
                    path: 'accountId',
                    select: 'phone address -_id'
                }).populate({
                    path: 'addressId',
                    select: "recName recPhone recAddress"
                })
                .lean().skip(start).limit(pageSize);

            query.exec(function(err, doc){
                callback(err, doc);
            })
        },
        itemCount: function(callback){
            Orders.count(conditions, function(err, doc){
                callback(err, doc);
            })
        }
    }, function(err, results){
        if(err){
            return callback(err, {})
        }
        Logger.info('==== orderlist result ====', results);

        var total = results.itemCount,
            pageCount = Math.ceil(total/pageSize);
        var result = {
            data: results.findItems,
            total: total,
            pageCount: pageCount
        }
        callback(null, result);
    })
}

