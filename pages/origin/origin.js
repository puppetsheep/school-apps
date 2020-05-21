const app = getApp();
Page({
  data: {
    counting: 0,
    colorCount: 0,
    mathCount: 0,
    networkCount: 0,
    chinaCount: 0,
    version: '',
    ColorList: app.globalData.ColorList
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://api.puppetsheep.cn/miniprogram/counting.json',
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            version: res.data.version
          })
        }

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '校园应用', // 分享标题
      desc: '每日打卡，每日学一点', // 分享描述
      path: 'pages/index/index' // 分享路径
    }
  }
})