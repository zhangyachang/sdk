"use strict";

const mysql = require("mysql");
const { host, user, password, database, port } = require("../config").sql;

const pool = mysql.createPool({
  connectionLimit: 20,
  host: host,
  user,
  password,
  database,
  port,
});

// // 不带事务的那个 就是随意的一条 sql 语句
// const query = (sql, options) => {
//   // 从一个创建的连接池中获取到一个我们需要的链接
//   pool.getConnection((error, connection) => {
//     if (error) {
//       return callback(error, null);
//     } else {
//       connection.query(sql, options, function (err, result) {
//         // 释放连接
//         connection.release();
//         callback && callback(err, result);
//       });
//     }
//   });
// };

// 封装为Promise对象使用起来更加方便
const query = (sql, options = []) => {
  // 从一个创建的连接池中获取到一个我们需要的链接
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        return resolve({
          code: -1,
          data: error,
        });
      } else {
        connection.query(sql, options, function (err, result) {
          // 释放连接
          connection.release();
          resolve({ code: 0, data: result });
        });
      }
    });
  });
};

// 不带事务sql语句
module.exports = query;
