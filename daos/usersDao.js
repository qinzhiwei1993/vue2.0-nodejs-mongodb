var models = require('../models'),
    Users = models.Users;

var async = require('async');
var _ = require('underscore');


//注册用户
exports.save = function(obj, callback){
    var user = new Users(obj);
    user.save(obj, function(err, doc){
        if(err){
            return callback(err);
        }
        callback(null, doc);
    })
}

//获取用户信息，登录
exports.findOne = function(conditions, fileds, callback){
    Users.findOne(conditions, fileds || "-__v", function(err, doc){
        callback(err, doc || {})
    })
}