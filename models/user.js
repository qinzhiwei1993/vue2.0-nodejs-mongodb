var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    nickName: String,
    headimgurl: String,
    accountId: String, //用户名 唯一的
    password: String //密码
})

mongoose.model('Users', userSchema); //users