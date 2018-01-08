var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var cartsSchema = new Schema({
    accountId: {type: Schema.Types.ObjectId, ref: 'Users'}, //用户
    goodsId: {type: Schema.Types.ObjectId, ref: 'Goods'}, //商品
    num: Number, //商品数量
})

mongoose.model('Carts', cartsSchema);//carts