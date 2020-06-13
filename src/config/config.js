// default config
module.exports = {
  workers: 1,
  jwt: {
    secret: "gsk-password",
    cookie: "jwt-token",
    expire: 30  //秒，口令的有效时间
  }
};
