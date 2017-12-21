var models = require('../models'),
    Goods = models.Goods;//创建Goods的model
var async = require('async');
var _ = require('underscore');

exports.save = function(obj, callback){
    var goods = new Goods(obj);
    goods.save(function(err, doc){
        if(err){
            return callback(err);
        }
        callback(err, doc);
    })
}

exports.getList = function(conditions, fields, page, callback){
    //分页
    var pageSize = +page.pageSize, //转为number类型
        start = pageSize * (page.pageNum - 1),
        sort = page.sort;
    async.auto({
        findItems: function(callback){
            var query = Goods.find(conditions, null).lean()//返回纯JavaScript对象 默认为true
                .skip(start).limit(pageSize).sort({"salePrice": sort})
            query.exec(function(err, doc){
                callback(err, doc);
            })
        },
        itemCount: function(callback){
            Goods.count(conditions, function(err, count){
                callback(err, count);
            })
        }
    }, function(err, results){
        if(err){
            return callback(err, {});
        }
        var data = results.findItems,
            count = results.itemCount,
            result = {
                total: count,
                data: data
            }
        callback(null, result);
    })
}
