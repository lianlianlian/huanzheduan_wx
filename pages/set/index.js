// pages/set/index.js
const { globalData} = getApp()
import {loginOut} from '../../api/api.js'

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
  loginOut() {
    let {isShow} = this.data
    this.setData({
      isShow: !isShow
    })
  },
  cancel() {
    let { isShow } = this.data
    this.setData({
      isShow: !isShow
    });
  },
  submit() {
    let { isShow } = this.data
    this.setData({
      isShow: !isShow
    });
    loginOut().then(res => {
      wx.removeStorageSync('token')
      wx.removeStorageSync('userId')
      globalData.userInfo = null
      wx.switchTab({
        url: '../my/index'
      })
    })
  }
})