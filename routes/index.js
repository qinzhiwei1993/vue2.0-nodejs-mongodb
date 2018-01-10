var goodsRouter = require('./goodsRouter');
var usersRouter = require('./usersRouter');
var cartsRouter = require('./cartsRouter');

exports.runApp = function(app) {
    app.use(function(req, res, next){//判断用户是否登录使用session  express-session
        console.log(req.session);
        if(req.session.accountId || req.path == '/register' || req.path == '/users/register' || req.path =='/users/login'){
            next()
        }else{
            res.render('login')
        }
    });
    app.use('/goods', goodsRouter);
    app.use('/users', usersRouter);
    app.use('/carts', cartsRouter);
    app.get('/register', function(req, res){
        res.render('register');
    })
    app.get('/', function(req, res){
        res.render('index', {
            title: '哈哈'
        })
    })
}