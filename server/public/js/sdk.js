(function () {
  var oApiList = document.getElementById("api_list");
  var oClearBtn = document.getElementById("clear_btn");

  function initWxSdk() {
    axios({
      url: "http://wxgz.xiaoye121.com/api/wx/jsSdkAuth?a=12&name=张三",
      method: "POST",
      data: {
        url: window.location.href.split("#")[0],
      },
    })
      .then((res) => {
        console.log("成功了", res);
        if (res.status !== 200) {
          return;
        }
        if (res.data.code !== 0) {
          return;
        }
        // 成功了
        // const data = res.data;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.data.appId, // 必填，公众号的唯一标识
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.data.signature, // 必填，签名
          jsApiList: ["scanQRCode", "chooseImage"], // 必填，需要使用的JS接口列表
        });
      })
      .catch((err) => {
        console.log(err);
        alert("服务繁忙，请稍后再试");
      });

    wx.ready(function () {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      alert("成功了");
    });

    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      console.log("验证失败了");
    });
  }

  // 初始化api sdk接口
  initWxSdk();

  function getTime() {
    var time = new Date();

    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
  }

  function sdkSucces(msg) {
    var oItem = document.createElement("div");
    oItem.className = "api_item";
    oItem.innerHTML = `<span>${getTime()}</span>
    <span class="api_item_status">成功</span>
    <span>:</span>
    <span>${JSON.stringify(msg)}</span>`;
    oApiList.appendChild(oItem);
  }

  function sdkFail(msg) {
    var oItem = document.createElement("div");
    oItem.className = "api_item";
    oItem.innerHTML = `<span>${getTime()}</span>
    <span class="api_item_error">失败</span>
    <span>:</span>
    <span>${JSON.stringify(msg)}</span>`;
    oApiList.appendChild(oItem);
  }

  // sdk调用列表
  document.getElementById("scan").onclick = function () {
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {
        // var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        // alert(result);
        sdkSucces(res);
      },
      fail: function (err) {
        sdkFail(err);
      },
    });
  };

  document.getElementById("select_file").onclick = function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        sdkSucces(res);
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        var oImg = document.createElement("img");
        oImg.src = localIds;
        oImg.className = "wx_img";
        oApiList.appendChild(oImg);
      },
      fail: function (error) {
        sdkFail(error);
      },
    });
  };

  document.onclick = function (e) {
    // console.log("e.target", e.target.tagName);
    // console.log(e.target.tagName.toLowerCase());
    var url = e.target.src;
    if (e.target.tagName.toLowerCase() === "img") {
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: [url], // 需要预览的图片http链接列表
      });
    }
  };

  // 清空按钮点击
  oClearBtn.onclick = function () {
    oApiList.innerHTML = "";
  };
})();
