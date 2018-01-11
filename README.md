# vue2.0-nodejs-mongodb
vue2.0+nodejs+mongodb全栈打造商城

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install


#本地测试
npm start 启动node服务器，浏览器运行vue

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### 接口

====goodslist======================

/goods/list  get



==== users ========================

/users/login  get: accountId password

/users/register get accountId password


====== carts ===========================

/carts/add  get: accountId goodsId

/carts/list  get: accountId


====== orders ============================

/orders/save  post: users_id addressId goodsArr

/orders/list  get: users_id



