"use strict";
/**
 * 专门写了几个接口给测试使用
 *
 */
const sql = require("./mysql");
const MSG = require("../utils/msg");
const utils = require("../utils");
const { consoleError, consoleDebugger, consoleSuccess, consoleWarn, consoleApiTips } = utils;

let currentId = 2;
const config = {
  // 班级的人员
  users: [
    {
      id: 1,
      name: "张三",
      age: 12,
      sex: "男",
    },
  ],
};

class Wx {
  constructor() {
    // this.initWxServer();
  }

  /**
   * 接口测试
   */
  async test(ctx) {
    // const result = await sql(`select * from plan`);
    // if (result.code !== 0) {
    //   return (ctx.body = {
    //     code: -1,
    //     msg: MSG.FAIL_MSG,
    //     data: result.data,
    //   });
    // }
    // 返回值
    ctx.body = {
      code: 0,
      msg: MSG.SUCCESS_MSG,
      data: [],
    };
  }

  /**
   * 登录
   */
  async login(ctx) {
    console.log("登录接口");
    const { name, password } = ctx.request.body;
    if (!name || !password) {
      return (ctx.body = {
        code: -1,
        msg: MSG.PARAMS_ERROR,
      });
    }

    const result = config.users.find((item) => {
      return item.name === name;
    });
    if (result === undefined) {
      return (ctx.body = {
        code: -1,
        msg: MSG.FAIL_MSG,
        result: "用户不存在",
      });
    } else if (password !== "123456") {
      return (ctx.body = {
        code: -1,
        msg: MSG.FAIL_MSG,
        result: "账号或密码错误",
      });
    }
    ctx.body = {
      code: 0,
      msg: MSG.SUCCESS_MSG,
      result,
    };
  }

  async getUserById(ctx) {
    const { id } = ctx.query;
    if (!id) {
      return (ctx.body = {
        code: -1,
        msg: MSG.PARAMS_ERROR,
      });
    }
    const result = config.users.find((item) => {
      return item.id == id;
    });
    if (result === undefined) {
      return (ctx.body = {
        code: -1,
        msg: MSG.FAIL_MSG,
        result: "不存在的人",
      });
    }
    return (ctx.body = {
      code: 0,
      msg: MSG.SUCCESS_MSG,
      result,
    });
  }

  /**
   * 查询所有人
   */
  async getAllUsers(ctx) {
    return (ctx.body = {
      code: 0,
      msg: MSG.SUCCESS_MSG,
      result: config.users,
    });
  }

  /**
   * 删除用户
   */
  async deleteUser(ctx) {
    console.log("删除用户");
    const { id } = ctx.request.body;
    if (!id) {
      return (ctx.body = {
        code: -1,
        msg: MSG.PARAMS_ERROR,
      });
    }
    let findIndex = undefined;
    for (let i = 0; i < config.users.length; i++) {
      if (config.users[i].id == id) {
        findIndex = i;
        break;
      }
    }
    if (findIndex === undefined) {
      return (ctx.body = {
        code: -1,
        msg: MSG.FAIL_MSG,
        result: "不存在的人",
      });
    }

    config.users.splice(findIndex, 1);
    ctx.body = {
      code: 0,
      msg: MSG.SUCCESS_MSG,
      result: "删除成功",
    };
  }

  /**
   * addUser
   */
  // id: 1,
  //     name: "张三",
  //     age: 12,
  //     sex: "男",
  async addUser(ctx) {
    const { name, age, sex } = ctx.request.body;
    if (!name && !age && !sex) {
      ctx.response.status = 400;
      return (ctx.body = {
        code: -1,
        msg: MSG.PARAMS_ERROR,
      });
    }

    config.users.push({
      id: currentId++,
      name,
      age,
      sex,
    });

    ctx.body = {
      code: 0,
      msg: MSG.SUCCESS_MSG,
    };
  }

  /**
   * 更新用户信息
   */
  async updateUser(ctx) {
    const { id, name, age, sex } = ctx.request.body;
    if (!name && !age && !sex) {
      return (ctx.body = {
        code: -1,
        msg: MSG.PARAMS_ERROR,
      });
    }

    // 查找该用户是否存在
    const result = config.users.find((item) => {
      return item.id == id;
    });

    if (result === undefined) {
      return (ctx.body = {
        code: -1,
        msg: MSG.FAIL_MSG,
        result: "不存在的人",
      });
    }
    result.name = name || result.name;
    result.age = age || result.age;
    result.sex = sex || result.sex;

    ctx.body = {
      code: 0,
      msg: MSG.SUCCESS_MSG,
    };
  }
}

module.exports = new Wx();
