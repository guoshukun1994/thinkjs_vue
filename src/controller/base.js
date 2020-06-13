const jsonwebtoken = require("jsonwebtoken")
module.exports = class extends think.Controller {
  __before() {

  }

  //session 用到的是 cookie 
  //换了服务器之后如何保证session的统一
  //目前使用JWT 跨域身份验证方案，  JSON WEB TOKEN
  //1用户发送用户名和密码
  //2验证用户名和密码，保存验证信息
  //3返回口令给到前端
  //4前端将口令保存起来
  //5下次发送请求的时候将口令发送给服务器
  //6服务器可以验证口令，判断用户的信息和登陆状态
  //7更新口令

  authFail() {
    this.json({error: "JWT校验失败"})
  }
  checkAuth() {
      let token = this.ctx.headers['x-token'];
      const {secret,cookie,expire} = this.config('jwt')

      try {
        var tokenObj = token ? jsonwebtoken.verify(token,secret)  : {};
        this.ctx.state.username = tokenObj.name;
      } catch (error) {
        return this.authFail()
      }

      if(!tokenObj.name){
        return this.authFail
      }
      
      this.updateAuth(token.name)
  }

  updateAuth(userName){
      const userInfo = {
        name: userName
      };

      // 获取jwt的配置信息
      const {secret,cookie,expire} = this.config('jwt')
      const token = jsonwebtoken.sign(userName,secret,{expiresIn: expire});
      //下面是两种方式发送给前端让前端获取到更新的口令
      this.cookie(cookie,token)
      this.headers("authorization",token)
      return token

  }
};
