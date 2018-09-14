// pages/mood-evaluation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [['项目','介绍'], ['知情','同意'], ['问卷'], ['心情','建议']],
    listIndex: 0,
    btnText: '下一步'
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
  submit() {
    let { listIndex, btnText} = this.data;
    if (listIndex < 3) {
      listIndex ++
    }
    if (listIndex === 1) {
      btnText = '我同意'
    } 
    this.setData({
      listIndex,
      btnText
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})