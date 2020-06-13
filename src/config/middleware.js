const path = require('path');
const isDev = think.env === 'development';
const jwt = require("koa-jwt")  //自己引入之后需要安装 koa-jwt 和 jsonwebtoken


module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {}
  },
  //自己添加的koa-jwt的配置
  {
    handle: jwt,
    options: {
      cookie: think.config('jwt')['cookie'],
      secret: think.config('jwt')['secret'],
      passthrought: true
    }
  },
  'logic',
  'controller'
];
