"use strict";

const request = require("../utils/request");
const { url, grant_type, appid, secret } = require("../config").wx;

// : "https://api.weixin.qq.com",
// : "gh_dcff9f7af4fa", //获取access_token填写client_credential
// : "wxcacd35d40eeb1b09", // 第三方用户唯一凭证
// : "826193de9604ca6193d638f767758627", // 第三方用户唯一凭证密钥，即appsecret

/**
 * 请求微信的api接口文档
 *
 */
exports.getAccessToken = () => {
  return request({
    url: `${url}/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
  });
};

/**
 * 获取jspi_ticket
 */
exports.getJsApiTicket = (access_token) => {
  return request({
    url: `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`,
  });
};
