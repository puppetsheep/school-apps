// pages/guose/guose.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://api.puppetsheep.cn/miniprogram/chineseColor.json',
      data: '',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.statusCode == 200) {
          // console.log(res.data.colorlist)
          that.setData({
            colorList: res.data.colorlist
          })
        }

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
    // console.info(e.currentTarget.dataset.target)
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  onPageScroll: function (e) {
    // console.log(e)
    if (e.scrollTop > 200) {
      this.setData({
        // floorstatus: true,
        modalName: null
      });
    }
    // else {
    //   this.setData({
    //     floorstatus: false
    //   });
    // }
  },
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制16位hex值',
          duration: 1200,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '中国传统色', // 分享标题
      desc: '百种色，识几何？', // 分享描述
      path: 'pages/index/index' // 分享路径
    }
  }
})