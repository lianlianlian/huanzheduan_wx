// pages/records/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  navigator(e) {
    const { navigator } = e.detail

    if (navigator) {
      wx.navigateTo({
        url: '../treatment-feedback/index'
      })
    }
  }
})