//开发环境配置
module.exports = {
    port: 3000,
    mongodb: {
        mongos: false,
        str: 'mongodb://localhost:27017/mall',
        opts: {
            server: { poolSize: 5 }
//            replset: {strategy: 'ping', rs_name: 'ali'}
        }
    }
}