var express = require('express');
var usersRouter = express.Router();

var models = require('../models');
var Users = models.Users;
var usersDao = require('../daos/usersDao');

var async = require('async');
var _ = require('underscore');
var URL = require('url');
var utils = require('../utils');
var looger = require('../Logger');


usersRouter.get('/register', function(req, res, next){
    var params = URL.parse(req.url, true);
    var queryParams = req.query;
    var accountId = queryParams.accountId,
        password = queryParams.password;
    looger.info('----req.query-----', queryParams);

    var status = 400;
    var errmsg = "";

    //检查用户名、密码是否为空
    if(_.isEmpty(accountId) || _.isEmpty(password)){
        errmsg = "accountId or password is empty"
    }


    if(errmsg){
        utils.resToClient(res, params,{status: status, errmsg: errmsg})
    }

    async.auto({
        checkAccountId: function(callback){//检查用户名是否已经存在
            usersDao.findOne({accountId: accountId}, null, function(err, doc){
                if(err){
                    callback(err)
                }
                if(!_.isEmpty(doc)){//是否有当前用户
                    return utils.resToClient(res, params,{status: status, msg: "当前用户ID已被占用！"})
                }
                callback(null);
            })
        },
        saveToMogodb: ["checkAccountId", function(result, callback){//保存到mongodb
            //nickname 和 headimgurl
            var userInfo = _.extend(queryParams, {nickname: accountId, headimgurl: '/images/headimgurl_default.png'})
            usersDao.save(queryParams, function(err, doc){
                if(err){
                    return callback(err);
                }
                callback(null, doc)
            })
        }]
    }, function(err, results){
        if(err){
            return utils.resToClient(res, params, {status: 500, errmsg: err.message})
        }
        looger.info('-----user info ------', results.saveToMogodb);
        utils.resToClient(res, params, {status: 200, data: results.saveToMogodb})
    })
})

module.exports = usersRouter;