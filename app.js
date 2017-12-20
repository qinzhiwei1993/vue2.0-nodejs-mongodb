var express = require('express')
    //, routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , fs = require('fs')
    , juicer = require('juicer');
    juicer.set('strip',false);
    juicer.register('JSON', JSON);


var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');

global.__dirname = __dirname;

var app = express(),
    server = http.createServer(app);


// all environments
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

app.set('env', 'production');

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

require('./timer/timerProcessExpireKey')({});


server.listen(app.get('port'), function(){
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});

module.exports = app;


//var app = express();
////app.set("view engine", 'ejs');
//app.use(express.static('public'));
//
//app.use(function (req, res, next) {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
//    next();
//});
//
//app.get('/goods', function(req, res, next){
//    fs.readFile(__dirname + '/public/mock/goods.json', function(err ,data){
//        if(err){
//            console.log(err);
//
//        }else{
//            res.send(data.toString());
//        }
//    })
//})
//
//
//app.listen(3000);
