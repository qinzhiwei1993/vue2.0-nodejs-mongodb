var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var config = require('../config');

var db = mongoose.createConnection(config.mongodb.str, config.mongodb.opts, function(error){
    if(error){
        console.log('connect to MongoDB error ', error);
        process.exit(1);// 强制进程尽快结束。即使仍然有很多处于等待中的异步操作没有全部执行完成
    }
})


require('./goods');
require('./user');
require('./carts');
require('./address')
require('./orders');


exports.Goods = db.model('Goods');
exports.Users = db.model('Users');
exports.Carts = db.model('Carts');
exports.Address = db.model('Address');
exports.Orders = db.model('Orders');



exports.close = function(){
    db.close(function(){
        console.log('close Mongodb');
    })
}