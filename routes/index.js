var goodsRouter = require('./goodsRouter');
var usersRouter = require('./usersRouter');


exports.runApp = function(app) {
    app.use('/goods', goodsRouter);
    app.use('/users', usersRouter)
    app.get('/', function(req, res){
        res.render('index', {
            title: '哈哈'
        })
    })
}