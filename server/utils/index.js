"use strict";

// const result = require('./result');
const crypto = require("crypto");
const colors = require("colors/safe");

/**
 * 打印的一些方法，前缀有颜色标识提示，为了更加显示的提醒用户
 *
 * consoleSuccess 成功
 * consoleWarn 警告
 * consoleError 错误
 * consoleGlobalError 全部红色字体标注
 * consoleDebugger 提醒调试
 */
exports.consoleSuccess = (...msg) => {
  console.log(colors.green(`success`), ...msg);
};

exports.consoleWarn = (...msg) => {
  console.log(colors.yellow(`warning`), ...msg);
};

exports.consoleError = (...msg) => {
  console.log(colors.red(`error`), ...msg);
};

exports.consoleGlobalError = (msg) => {
  console.log(colors.red(`error ${msg}`));
};

exports.consoleDebugger = (...msg) => {
  console.log(colors.blue(`info`), ...msg);
};

/**
 * 对字符串进行字典排序并进行sha1加密
 */
exports.sha1 = (...rest) => {
  return crypto.createHash("sha1").update(rest.sort().join("")).digest("hex");
};

/**
 * 对字符串进行 sha1 加密
 */
exports.sha1String = (str) => {
  return crypto.createHash("sha1").update(str).digest("hex");
};

/**
 * 生成随机字符串
 * @params {Number} len 生成字符串的长度 默认 32 位
 */
exports.randomString = (len) => {
  len = len || 32;
  var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};
