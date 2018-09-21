// pages/login/index.js
const { func, globalData } = getApp()
import {login} from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    earStatus: false,
    url: '',
    form: {
      username: '',
      password: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.url)
    this.setData({
      url: options.url || ''
    })
  },
  inputPassword(e) {
    let { form} = this.data
    form.password = e.detail.value
    this.setData({
      form
    })
  },
  submit(e){
    const { password, username} = e.detail.value
    const { url} = this.data

    if (!username || username == '') {
      func.wxUtil.showToast({ title: '请输入手机号！' })
      return false
    }
    if (!password || password == '') {
      func.wxUtil.showToast({ title: '请输入密码！' })
      return false
    }
    login({ data: { username, password, devicetype: 3, lastloginversion: globalData.version}}).then(res => {
      // 存储用户登录态
      wx.setStorageSync('token', res.infor[0].token)
      wx.setStorageSync('userId', res.infor[0].id)
      // 存储用户信息
      globalData.userInfo = res.infor[0]
      // 登陆成功重定向页面地址
      globalData.loginNavigateUrl = url
      // 重新调用接口
      globalData.isAgainGet = true
      // 提示
      func.wxUtil.showToast({ title: '登陆成功！' })
      // 1秒后页面跳转
      setTimeout(() => {

        wx.navigateBack({
          delta: 1,
        })
        // if (globalData.tabBar.some((item, index) => {item == url})) {
        //   wx.switchTab({
        //     url
        //   })
        // } else {
        //   wx.redirectTo({
        //     url
        //   })
        // }
        
      },1000)
    })
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
  target() {   //  密码是否显示
    let earStatus = this.data.earStatus
    this.setData({
      earStatus: !earStatus
    })
  },
  forget() {
    wx.navigateTo({
      url: '../set-phone/index?type=2'
    })
  },
  register() {
    const {url} = this.data

    wx.navigateTo({
      url: `../register/index?url=${url}`
    })
  }
})