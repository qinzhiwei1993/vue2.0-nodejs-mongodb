var mogoose = require('mongoose'),
    Schema = mogoose.Schema;
var Carts = require('../models').Carts;

var _ = require('underscore');
var async = require('async');

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