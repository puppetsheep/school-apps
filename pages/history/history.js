const app = getApp();
let rewardedVideoAd = null;
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    section: [],
    picdone: false,
    videoAd: false,
    slice: [],
    swiper: []
  },
  createlist() {
    var list = [{}];
    for (let i = 0; i < this.data.section.length; i++) {
      list[i] = {};
      // list[i].name = String.fromCharCode(65 + i);
      list[i].id = i;
    }
    // console.log(list)
    this.setData({
      list: list,
      listCur: list[0]
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
  originimage(e) {
    var that = this;
    if (this.data.videoAd) {
      that.setData({
        picdone: true
      })
      wx.downloadFile({
        url: e.currentTarget.dataset.img2,
        success(res) {
          if (res.statusCode === 200) {
            that.setData({
              picdone: false
            })
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function(data) {
                console.log(data)
              },
              fail: function(err) {
                console.log(err);
                if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                  // console.log("用户一开始拒绝了，我们想再次发起授权")
                  // alert('打开设置窗口')
                  wx.openSetting({
                    success(settingdata) {
                      // console.log(settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                      } else {
                        console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                      }
                    }
                  })
                }
              }
            })
          }
        },
        fail(err) {
          that.setData({
            picdone: false
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '观看一小段广告后即可任意下载原图',
        success(res) {
          if (res.confirm) {
            if (wx.createRewardedVideoAd) {
              rewardedVideoAd = wx.createRewardedVideoAd({
                adUnitId: 'adunit-ed42fdebaec7c0f2'
              })
              rewardedVideoAd.onLoad(() => {
                console.log('onLoad event emit')
              })
              rewardedVideoAd.show(() => {})
              rewardedVideoAd.onError((err) => {
                console.log('onError event emit', err)
              })
              rewardedVideoAd.onClose((res) => {
                if (res && res.isEnded) {
                  that.setData({
                    picdone: true,
                    videoAd: true
                  })
                  wx.downloadFile({
                    url: e.currentTarget.dataset.img2,
                    success(res) {
                      if (res.statusCode === 200) {
                        that.setData({
                          picdone: false
                        })
                        wx.saveImageToPhotosAlbum({
                          filePath: res.tempFilePath,
                          success: function(data) {
                            console.log(data)
                          },
                          fail: function(err) {
                            console.log(err);
                            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                              // console.log("用户一开始拒绝了，我们想再次发起授权")
                              // alert('打开设置窗口')
                              wx.openSetting({
                                success(settingdata) {
                                  // console.log(settingdata)
                                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                                  } else {
                                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                                  }
                                }
                              })
                            }
                          }
                        })
                      }
                    },
                    fail(err) {
                      that.setData({
                        picdone: false
                      })
                    }
                  })
                } else {
                  console.log('onClose event emit', res)
                }
              })
            }
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  onLoad() {
    var that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    wx.request({
      url: 'https://api.puppetsheep.cn/school/section.json',
      data: '',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.statusCode == 200) {
          // console.log(res.data)
          that.setData({
            section: res.data
          })
          that.exp()
          that.createlist()
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.request({
      url: 'https://api.puppetsheep.cn/school/swiper.json',
      success: function(res) {
        if (res.statusCode == 200) {
          that.setData({
            swiper: res.data
          })
        }
      }
    })

  },
  exp() {
    var BirthDay = new Date("05/01/2020 00:00:00");
    var today = new Date();
    var timeold = (today.getTime() - BirthDay.getTime());
    var sectimeold = timeold / 1000
    var secondsold = Math.floor(sectimeold);
    var msPerDay = 24 * 60 * 60 * 1000
    var e_daysold = timeold / msPerDay
    var daysold = Math.floor(e_daysold);
    // console.log(daysold, today, timeold, sectimeold, secondsold, msPerDay, e_daysold)
    let slice = this.data.section;
    let daytemp = daysold + 1;
    for (let i = 0; i < slice.length; i++) {
      if (daytemp > slice[i].day.length) {
        daytemp -= slice[i].day.length
        continue;
      } else {
        for (let j = 0; j < slice[i].day.length; j++) {
          daytemp -= 1;
          if (daytemp < 0) {
            slice[i].day[j] = null
          }
        }
        slice[i].day = [...new Set(slice[i].day)]
        if (slice[i].day[slice[i].day.length] == null) {
          slice[i].day.pop()
        }
      }
    }
    slice = [...new Set(slice)]
    for (let k = slice.length; k > 0; k--) {
      if (slice[k - 1].day.length == 0) {
        slice.pop()
      }
    }
    let temp = slice
    // console.log(temp)
    this.setData({
      section: temp
    })
  },
  onShow() {},
  onReady() {
    wx.hideLoading()

  },
  tabSelect(e) {
    // console.log(this.data.list)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})