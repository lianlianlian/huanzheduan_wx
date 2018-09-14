// pages/my-leave-message/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: ['小课堂', '聊一聊'],
    navIndex: 0
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
  tabNav(e) {
    this.setData({
      navIndex: e.detail
    })
  }
})