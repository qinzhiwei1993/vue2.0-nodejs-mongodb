var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var goodsSchem = new Schema({
    _id: false,
    goodsId: {type: Schema.Types.ObjectId, ref: "Goods"},
    num: {type: Number, default: 0}
})

var cartsSchema = new Schema({
    accountId: {type: String}, //用户
    // goods: {type: [goodsSchem], default: []}, //商品
    goodsId: {type: Schema.Types.ObjectId, ref: "Goods"},
    num: {type: Number, default: 1}
})

mongoose.model('Carts', cartsSchema);//carts