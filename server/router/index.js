"use strict";

const Router = require("koa-router");
const router = new Router({
  prefix: "/api/wx",
});

const wx = require("../modules/wx");

// 接口测试
router.get("/", wx.test);
router.post("/jsSdkAuth", wx.jsSdkAuth);
module.exports = router;