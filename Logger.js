var log4js = require('log4js');

log4js.configure({
    appenders:[
        {type: 'console'}
    ],
    replaceConsole: true
})

var Logger = function(name){
    var logger = log4js.getLogger(name);
    logger.setLevel("DEBUG");
    return logger;
}

module.exports = Logger();