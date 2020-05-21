// pages/net/net.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    network: [],
    taglist: [],
    showAll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://api.puppetsheep.cn/miniprogram/network.json',
      data: '',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.statusCode == 200) {
          // console.log(res.data.data.network)
          that.setData({
            network: res.data.data.network,
            taglist: res.data.data.network.slice(0, 9)
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
  showAll(e) {
    this.setData({
      showAll: !this.data.showAll
    })
  },
  onPageScroll: function (e) {
    // console.log(e)
    if (e.scrollTop > 200) {
      this.setData({
        floorstatus: true,
        modalName: null
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  gotop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
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
      title: '计算机网络术语', // 分享标题
      desc: '一般人看不懂', // 分享描述
      path: 'pages/index/index' // 分享路径
    }
  }
})