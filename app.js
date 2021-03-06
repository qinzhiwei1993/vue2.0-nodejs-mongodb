var express = require('express')
    ,favicon = require('static-favicon')
    ,cookieParser = require('cookie-parser')
    ,bodyParser = require('body-parser')
    ,mongoose=require('mongoose')
    , http = require('http')
    , path = require('path')
    , fs = require('fs')
    , juicer = require('juicer'),
    session = require('express-session');
    juicer.set('strip',false);
    juicer.register('JSON', JSON);

var config = require("./config")
    , routes = require('./routes')

global.__dirname = __dirname;

var app = express(),
    server = http.createServer(app);


//all environments
app.set('port', process.env.PORT || config.port);
app.set('views', __dirname + '/views');

app.engine('html', function(path, options, fn){
    fs.readFile(path, 'utf8', function(err, str){
        if (err) return fn(err);
        str = juicer(str, options);
        fn(null, str);
    });
});
app.set('view engine', 'html');
app.set('view options', {layout: false});
// production development
app.set('env', 'development');

//配置session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(favicon());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded());
app.use(cookieParser('your secret here'));
app.use(express.static(__dirname + '/public'));



app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
routes.runApp(app);


server.listen(app.get('port'), function(){
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});

module.exports = app;
