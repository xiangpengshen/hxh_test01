//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userName: '',
    password: '',
    yzm: ''
  },
  //事件处理函数
  userNameInput: function(e) {
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
        mobile:     this.data.userName,
        password:   this.data.password
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
  onLoad: function () {
    this.setData({
        yzm: ''
    })
  }
})
