var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var goodsSchema = new Schema({
    productId: String,
    productName: String,
    salePrice: Number,
    productImage: String
})

mongoose.model('Goods', goodsSchema);