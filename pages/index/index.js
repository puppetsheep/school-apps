//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cardCur: 0,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: {},
    hasUserInfo: false,
    app:[],
    content:[],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    homes: false,
    back:false,
    chosedate:false,
    toggleDelay: true,
    picdone:false,
    dateSelect:[],
    showabout:false
  },
  //事件处理函数
  exp() {
    let BirthDay = new Date("05/01/2020 00:00:00");
    let today = new Date();
    let timeold = (today.getTime() - BirthDay.getTime());
    let sectimeold = timeold / 1000
    let secondsold = Math.floor(sectimeold);
    let msPerDay = 24 * 60 * 60 * 1000
    let e_daysold = timeold / msPerDay
    let daysold = Math.floor(e_daysold);
    // console.log(daysold, today, timeold, sectimeold, secondsold, msPerDay, e_daysold)
    let slice = this.data.content;
    let daytemp = daysold + 1;
    for (let i = 0; i < slice.length; i++) {
      if(daytemp==0){
        break;
      }
      for (let j = 0; j < slice[i].day.length; j++) {
        daytemp -= 1;
        if (daytemp == 0) {
          this.setData({
            content: slice[i].day[j]
          })
          break;
        }
      }
    }
  },
  history(){
    wx.navigateTo({
      url: '../history/history',
    })
  },
  onLoad: function() {
    var that = this;
    wx.request({
      url: 'https://api.puppetsheep.cn/school/section.json',
      data: '',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
             content: res.data
          })
          that.exp();
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })

    wx.request({
      url: 'https://api.puppetsheep.cn/school/index.json',
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
            app: res.data
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // choseDay(e){
  //   console.log(e.currentTarget.dataset.day)
  //   console.log(e.currentTarget.dataset.month)
  //   var month = (this.data.monthforday + 5<10?'0':0)+(this.data.monthforday+5)
  //   console.log(month)
  //   var that = this;
  //   wx.request({
  //     url: 'https://api.puppetsheep.cn/school/' + month + e.currentTarget.dataset.day + '.json',
  //     data: '',
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     method: 'GET',
  //     dataType: 'json',
  //     responseType: 'text',
  //     success: function (res) {
  //       if (res.statusCode == 200) {
  //         that.setData({
  //           content: res.data
  //         })
  //       }
  //     },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // },
  // choseMonth(e){
  //   console.log(e.currentTarget.dataset.mon)
  //   this.setData({
  //     monthforday: e.currentTarget.dataset.mon
  //   })
  // },
  about(e){
    // console.log(this.data.showabout)
    wx.navigateTo({
      url: '../about/about'
    })
    // this.setData({
    //   showabout: !this.data.showabout
    // })
  },
  ohtermini(){
    wx.navigateToMiniProgram({
      appId: 'wx19b23e057743b5d8',
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },
  toggleDelay() {
    var that = this;
    that.setData({
      toggleDelay: true
    })
    setTimeout(function () {
      that.setData({
        toggleDelay: false
      })
    }, 1000)
  },
  openhome() {
    var that = this;
    if (this.data.homes == false) {
      that.setData({
        homes: true,
        back:false
      })
    }else{
      that.setData({
        back: true
      })
      setTimeout(function () {
        that.setData({
          homes: false,
          showabout: false
        })
      }, 800)
    }
  },
  opendate(){
    wx.navigateTo({
      url: '../history/history',
    })
    // var that = this;
    // if(this.data.chosedate==false){
    //   that.setData({
    //     chosedate:true,
    //     back: false
    //   })
    // }else{
    //   that.setData({
    //     back: true
    //   })
    //   setTimeout(function(){
    //     that.setData({
    //       chosedate:false
    //     })
    //   },800)
    // }
  },
  originimage(){
    // wx.navigateTo({
    //   url: '../origin/origin',
    // })
    var that = this;
    that.setData({
      picdone:true
    })
    wx.downloadFile({
      url: this.data.content.img2, 
      success(res) {
        if (res.statusCode === 200) {
          that.setData({
            picdone:false
          })
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (data) {
              console.log(data)
            },
            fail:function(err){
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
      fail(err){
        that.setData({
          picdone: false
        })
      }
    })
  },
  // pixivc(e){
  //   console.log(this.data.picdone)
  //    this.setData({

  //    })
  // },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})