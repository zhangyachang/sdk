"use strict";

const axios = require("axios");

/**
 * 请求服务
 */

module.exports = ({ url, method = "GET", params = {}, data = {} }) => {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method,
      params: params,
      data: data,
    })
      .then((res) => {
        if (res.status !== 200) {
          return resolve({ status: 400, data: res });
        }
        resolve({ status: 200, data: res.data });
      })
      .catch((err) => {
        resolve({ status: 500, data: err });
      });
  });
};
