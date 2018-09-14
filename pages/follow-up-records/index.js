// pages/follow-up-records/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [
      {
        src: '',
        name: '按随访时间'
      },
      {
        src: '',
        name: '按随访内容'
      }
    ],
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
  nav(e) {
    const { index } = e.currentTarget.dataset
    
    this.setData({
      navIndex: index
    })
  }
})