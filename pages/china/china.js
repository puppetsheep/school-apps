
Page({

  /**
   * 页面的初始数据
   */
  data: {
    china: [],
    pageindex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://api.puppetsheep.cn/miniprogram/exchina.json',
      data: '',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.statusCode == 200) {
          //  console.log(res.data)
          that.setData({
            china: res.data.data
          })
        }

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  pagenext(e) {
    this.setData({
      pageindex: this.data.pageindex - 1
    })
  },
  pageback(e) {
    this.setData({
      pageindex: this.data.pageindex + 1
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
    });
    setTimeout(() => {
      this.setData({
        pageindex: 0
      })
    }, 600)
  },
  onPageScroll: function (e) {
    // console.log(e)
    if (e.scrollTop > 200) {
      this.setData({
        floorstatus: true,
        modalName: null
      });
      setTimeout(() => {
        this.setData({
          pageindex: 0
        })
      }, 600)
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
      title: '灵魂BUG', // 分享标题
      desc: '人性自有缺点，灵魂各有BUG', // 分享描述
      path: 'pages/index/index' // 分享路径
    }
  }
})