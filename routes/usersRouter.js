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
        return utils.resToClient(res, params,{status: status, errmsg: errmsg})
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

usersRouter.post('/login', function(req, res, next){
    var params = URL.parse(req.url, true);
    var body = req.body,
        accountId = body.accountId,
        password = body.password;

    var status = 400,
        errmsg = "";

    if(_.isEmpty(accountId) || _.isEmpty(password)){
        errmsg = "accountId or password is empty";
    }

    if(errmsg){
        return utils.resToClient(res, params, {status:status, errmsg:errmsg})
    }

    async.auto({
        checkAccountId: function(callback){
            usersDao.findOne({accountId: accountId}, null, function(err, doc){
                if(err){
                    return callback(err, {})
                }

                callback(null, doc);
            })
        },
        checkPassword:['checkAccountId', function(result, callback){
            var user = result.checkAccountId;
            if(_.isEmpty(user)){
                return callback(null, "用户名不存在")
            }

            if(user.password == password){
                callback(null, 'ok')
            }else{
                callback(null, '密码错误')
            }
        }]
    }, function(err, results){

        looger.info("==== login result ===", results.checkPassword)
        if(err){
            return utils.resToClient(res, params, {status: 500, errmsg: err.message})
        }

        if(results.checkPassword == 'ok'){//登录成功
            req.session.accountId = accountId;
            return res.redirect('/');
        }

        utils.resToClient(res, params, {status: 400, errmsg: results.checkPassword})

    })
})

module.exports = usersRouter;