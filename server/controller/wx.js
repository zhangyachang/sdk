const sql = require("./mysql");
const MSG = require("../utils/msg");
const { cacheData, wx } = require("../config");
const wxAPi = require("../api/wx");
const utils = require("../utils");
const { consoleError, consoleDebugger, consoleSuccess, consoleWarn, consoleApiTips } = utils;

class Wx {
  constructor() {
    this.initWxServer();
  }

  // 初始化微信服务
  initWxServer() {
    this.getAccessToken();
    this.intervalRefreshAccessToken();
  }

  // 获取access_token
  async getAccessToken() {
    try {
      const result = await wxAPi.getAccessToken();
      if (result.status !== 200) {
        console.log(result.data);
        return;
      }
      if (!result.data.access_token) {
        consoleError("access_token获取失败", result);
        return;
      }
      cacheData.access_token = result.data.access_token;
      this.getJsApiTicket(cacheData.access_token);
    } catch (e) {
      consoleError(e);
    }
  }

  /**
   * 获取 jsapi_ticket
   *
   * @param {String} access_token 微信接口的access_token
   */
  async getJsApiTicket(access_token) {
    try {
      const result = await wxAPi.getJsApiTicket(access_token);
      if (result.status !== 200) {
        return consoleError("服务端异常报错");
      }
      if (result.data.errcode !== 0) {
        return consoleError("获取ticket异常", result);
      }
      cacheData.jsapi_ticket = result.data.ticket;
      consoleDebugger("微信初基本信息始化成功");
      // console.log("缓存结果", cacheData);
    } catch (e) {
      consoleError("获取——-getJsApiTicket失败错误", e);
    }
  }

  intervalRefreshAccessToken() {
    setInterval(() => {
      consoleDebugger("access_token自刷新");
      this.getAccessToken();
    }, wx.refreshTime * 1000);
  }

  /**
   * 接口测试
   */
  async test(ctx) {
    const result = await sql(`select * from plan`);
    if (result.code !== 0) {
      return (ctx.body = {
        code: -1,
        msg: MSG.FAIL_MSG,
        data: result.data,
      });
    }
    // 返回值
    ctx.body = {
      code: 0,
      msg: MSG.SUCCESS_MSG,
      data: result.data,
    };
  }

  /**
   * 微信sdk的授权认证
   * 请求方式 POST
   *
   * @param {Object}
   *  url 地址域名
   */
  async jsSdkAuth(ctx) {
    consoleApiTips("微信sdk的授权认证");
    const { url } = ctx.request.body;
    const timestamp = Date.now();
    const nonceStr = utils.randomString();
    const jsapi_ticket = cacheData.jsapi_ticket;

    const string = `jsapi_ticket=${jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
    const signature = utils.sha1String(string);
    // console.log(timestamp, nonceStr, signature, url);

    ctx.body = {
      code: 0,
      msg: MSG.SUCCESS_MSG,
      data: {
        appId: wx.appid, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名
      },
    };
  }
}

module.exports = new Wx();
