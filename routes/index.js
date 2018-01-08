var goodsRouter = require('./goodsRouter');
var usersRouter = require('./usersRouter');
var cartsRouter = require('./cartsRouter');

exports.runApp = function(app) {
    app.use('/goods', goodsRouter);
    app.use('/users', usersRouter);
    app.use('/carts', cartsRouter);
    app.get('/', function(req, res){
        res.render('index', {
            title: '哈哈'
        })
    })
}