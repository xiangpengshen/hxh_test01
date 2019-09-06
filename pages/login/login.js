//index.js
//获取应用实例
var MCAP = require('../../utils/mcaptcha.js');
const app = getApp()

Page({
  data: {
    title: '登录页面',
    userName: '',
    password: '',
    yzm: '', //输入的验证码
    codeStr: '', //生成的验证码
  },
  //事件处理函数
  userName: function (e) {
    this.data.userName = e.detail.value;
  },
  password: function (e) {
    this.data.password = e.detail.value;
  },
  yzm: function (e) {
    this.data.yzm = e.detail.value;
  },

  submit: function (e) {
    console.log(this.data);
    var that = this;
    console.log('系统生成的验证码：' + this.data.sysyzm.toLowerCase());
    console.log('您输入的验证码：' + this.data.yzm.toLowerCase());
    wx.request({
      url: 'https://localhost/wxlogin',//上线的话必须是https，没有appId的本地请求貌似不受影响
      data: {
        mobile: that.data.userName,
        password: that.data.password,
        yzm: that.data.yzm,
        code: app.globalData.code //微信登录code去后台获取sessionId
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
    
    if (that.data.userName == null || that.data.userName == "") {
      console.log("不能为空")
      wx.showModal({
        title: '提示',
        content: '用户名不能为空'
      })
    }
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
  getRanNum: function () {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var yzm = '';
    for (var i = 0; i < 4; i++) {
      if (Math.random() < 48) {
        yzm += chars.charAt(Math.random() * 48 - 1);
      }
    }
    this.setData({
      sysyzm: yzm
    });
    return yzm;
  },
})
