var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var goodsSchema = new Schema({
    productId: String,
    productName: String,
    salePrice: Number,
    productImage: String,
    productNum: Number
})

mongoose.model('Goods', goodsSchema);