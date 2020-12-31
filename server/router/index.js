"use strict";

const Router = require("koa-router");
const router = new Router({
  prefix: "/api/wx",
});

const wx = require("../controller/wx");

// 接口测试
router.get("/", wx.test);

// 微信sdk授权接口
router.post("/jsSdkAuth", wx.jsSdkAuth);
module.exports = router;
