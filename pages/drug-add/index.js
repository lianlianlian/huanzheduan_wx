// pages/drug-add/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numberList: ['1mg/次', '2mg/次', '3mg/次', '4mg/次', '5mg/次'],
    numberIndex: 0
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
  chooseNumber() {
    const { numberList} = this.data

    wx.showActionSheet({
      itemList: numberList,
      itemColor: '#000',
      success: res => {
        this.setData({
          numberIndex: res.tapIndex
        })
      }
    })
  }
})