var express = require('express');
var fs = require('fs');

global.__dirname = __dirname;


var app = express();
//app.set("view engine", 'ejs');
app.use(express.static('public'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.get('/goods', function(req, res, next){
    fs.readFile(__dirname + '/public/mock/goods.json', function(err ,data){
        if(err){
            console.log(err);

        }else{
            res.send(data.toString());
        }
    })
})


app.listen(3000);
