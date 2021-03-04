"use strict";

const Router = require("koa-router");
const router = new Router({
  prefix: "/api/mock",
});

const mock = require("../controller/mock");

// 接口测试
router.get("/", mock.test);

// 登录接口
router.post("/login", mock.login);

// 根据id查询人员
router.get("/userById", mock.getUserById);

// 查询所有人
router.get("/allUsers", mock.getAllUsers);

// 删除人员
router.delete("/user", mock.deleteUser);

// 增加用户
router.post('/user', mock.addUser);

// 修改人员
router.put('/user', mock.updateUser);

module.exports = router;
