"use strict";

console.log("微信服务启动中...");
const Koa = require("koa");
const koaStatic = require("koa-static");
const logger = require("koa-logger");
const koaBody = require("koa-body");
const path = require("path");

const config = require("./config");
const router = require("./router");
const mockRouter = require("./router/mock");
const utils = require("./utils");

const app = new Koa();
let apiIndex = 0;

app.use(async (ctx, next) => {
  // 加上去了 解决 cors 跨域问题
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // ctx.set("Access-Control-Max-Age", 1728000); // 阻止非预检请求 20天
  // ctx.set("Access-Control-Expose-Headers", "Authorization"); // 如果想要浏览器响应其他内容 需要加上
  // ctx.set("Access-Control-Expose-Headers", "zaa"); // 如果想要浏览器响应其他内容 需要加上
  if (ctx.method == "OPTIONS") ctx.status = 200;
  else await next();
});

app.use(logger());

// 进行全局错误捕获处理
app.use(async (ctx, next) => {
  try {
    await next();

    // 打印返回信息日志
    utils.consoleSuccess(++apiIndex + ':----' + JSON.stringify(ctx.body));
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    // console.log("全局捕获错误处理", err);
    utils.consoleGlobalError(err);
    ctx.body = {
      code: -1,
      message: err.message,
    };
  }
});

// 将 post 请求的 body 数据挂载到 ctx.request.body 上面
app.use(
  koaBody({
    parsedMethods: ["POST", "PUT", "DELETE"],
  })
);
app.use(router.routes()).use(router.allowedMethods());
app.use(mockRouter.routes()).use(mockRouter.allowedMethods());

app.use(koaStatic(path.join(__dirname, "./public")));

app.listen(config.port, () => {
  utils.consoleSuccess(`${config.port}端口服务启动成功...`);
});
