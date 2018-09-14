// pages/see-doctor/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        name: '去就诊',
        src: '../see-doctor/index'
      },
      {
        name: '待就诊',
        src: '../wait-doctor/index'
      },
      {
        name: '就诊记录',
        src: '../records/index'
      }, {
        name: '检验单查询',
        src: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  navgition(e) {
    const { index } = e.currentTarget.dataset
    const { list} = this.data

    wx.navigateTo({
      url: list[index].src
    })
  }
  ,
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
  
  }
})