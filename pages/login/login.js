//index.js
//获取应用实例
var MCAP = require('../../utils/mcaptcha.js');
const app = getApp()

Page({
  data: {
    title: '登录页面',
    userName: '',
    password: '',
    yzm: '',
    codeStr: '', //生成的验证码
    code: '', //输入的验证码
  },
  //事件处理函数
  userNameInput: function (e) {
    this.data.userName = e.detail.value;
  },

  passwordInput: function (e) {
    this.data.password = e.detail.value;
  },
  yzmInput: function (e) {
    this.data.yzm = e.detail.value;
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  clickMe: function () {
    wx.request({
      url: 'https://localhost/wxlogin',//上线的话必须是https，没有appId的本地请求貌似不受影响
      data: {
        verifycode: this.data.yzm,
        mobile: this.data.userName,
        password: this.data.password
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  onLoad: function (options) {
    var that = this;
    that.initDraw(); //生成验证码
  },
  initDraw() {
    var that = this;
    var codes = that.getRanNum();
    that.setData({
      codeStr: codes //生成的验证码
    })
    new MCAP({
      el: 'canvas',
      width: 100,
      height: 45,
      code: codes
    });
  },
  changeImg: function () {
    this.initDraw();
  },
  bindCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getRanNum: function () {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var pwd = '';
    for (var i = 0; i < 4; i++) {
      if (Math.random() < 48) {
        pwd += chars.charAt(Math.random() * 48 - 1);
      }
    }
    return pwd;
  },
})
