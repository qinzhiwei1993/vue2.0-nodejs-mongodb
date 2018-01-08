

// var file = './local.js'; //本地环境开启
var file = './dev.js';// 开发环境下开启
// var file = './qa.js';// 生产环境下开启

var env = process.env.NODE_ENV || 'production'; //设置系统环境变量
env.toLowerCase();


try{
    var config = module.exports = require(file);
    console.log('Load config: [%s] %s', env, file);
} catch(err){
    console.error('Cannot load config: [%s] %s', env, file);
    throw err;
}