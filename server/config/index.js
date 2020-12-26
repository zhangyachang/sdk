"use strict";

/**
 * 为了保护数据库的账号密码，git中不上传sql文件，使用default.js中的账号密码
 */

let sqlConfig;
try {
  sqlConfig = require("./sql.private");
} catch (e) {
  sqlConfig = require("./sql");
}

module.exports = {
  port: 3000, // 服务端口号
  sql: { ...sqlConfig },

  // 缓存数据
  cacheData: {
    access_token: "", // 微信的token
    jsapi_ticket: "", // jsapi_ticket
  },

  wx: {
    url: "https://api.weixin.qq.com",
    grant_type: "gh_dcff9f7af4fa", // 获取access_token填写client_credential
    appid: "wxcacd35d40eeb1b09", // 第三方用户唯一凭证
    secret: "826193de9604ca6193d638f767758627", // 第三方用户唯一凭证密钥，即appsecret
    refreshTime: 7000, // 单位s，多长时间自动刷新 access_token
  },
};
