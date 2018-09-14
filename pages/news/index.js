// pages/news/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: ['医生消息', '系统消息'],
    navIndex: 0,
    actions: [
      {
        name: '标为已读',
        color: '#fff',
        fontsize: '25',
        width: 80,
        background: '#c7c7cd'
      },
      {
        name: '删除',
        width: 80,
        color: '#fff',
        fontsize: '25',
        background: '#ff4445'
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

  tabNav(e) {
    const index = e.detail

    this.setData({
      navIndex: index
    })
  }
})