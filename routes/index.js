var goodsRouter = require('./goodsRouter');



exports.runApp = function(app) {
    app.use('/goods', goodsRouter);
    app.get('/', function(req, res){
        res.render('index', {
            title: '哈哈'
        })
    })
}