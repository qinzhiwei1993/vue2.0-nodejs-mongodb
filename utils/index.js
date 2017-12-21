exports.resToClient = function(res, params, buffer){
    res.writeHead(200, {"Content-type": "application/json;charset=utf-8"})
    if(params.query && params.query.callback){
        var str = params.query.callback + '(' + JSON.stringify(buffer) + ')';//jsonp
        res.end(str);
    }else{
        res.end(JSON.stringify(buffer));// 普通的jsonp
    }
}