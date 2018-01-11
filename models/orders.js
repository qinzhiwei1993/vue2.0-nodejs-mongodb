var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var goodsSchema = new Schema({
    productName: String,
    salePrice: Number,
    productImage: String,
    num: Number
})

var orderSchema = new Schema({
    accountId: {type: Schema.Types.ObjectId, ref: 'Users'},//寄件人信息
    addressId: {type: Schema.Types.ObjectId, ref: 'Address'},//收件人信息
    goods: {type: [goodsSchema], default: []}, //商品信息
    price: Number
})

mongoose.model('Orders', orderSchema);

