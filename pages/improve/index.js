      
      
      // pages/improve/index.js
import { register, login} from '../../api/api.js'
const { func } = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexList: ['男', '女'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { temp_token, username, password, url} = options
    
    this.setData({
      temp_token,
      username,
      password,
      url
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
  chooseSex() {
    wx.showActionSheet({
      itemList: this.data.sexList,
      itemColor: '',
      success: (res) => {
        this.setData({
          sexIndex: res.tapIndex
        })
      }
    })
  },
  chooseBirthday(e){
    this.setData({
      birthday: e.detail.value
    })
  },
  chooseCity(e) {
    this.setData({
      city: e.detail.value
    })
  },
  submit(e) {
    const { temp_token, username, password, url} = this.data
    const { birthday, idcard, nickname, realname, sex, district_name} = e.detail.value
    if (!nickname || nickname == '') {
      func.wxUtil.showToast({ title: '请输入用户名！' })
      return false
    }
    if (!nickname || nickname == '') {
      func.wxUtil.showToast({ title: '请输入用户名！' })
      return false
    }
    if (!realname || realname == '') {
      func.wxUtil.showToast({ title: '请输入姓名！' })
      return false
    }
    if (!birthday || birthday == '') {
      func.wxUtil.showToast({ title: '请输入出生日期！' })
      return false
    }
    if (!sex || sex == '') {
      func.wxUtil.showToast({ title: '请输入性别！' })
      return false
    }
    register({ data: { temp_token, username, password, nickname, realname, idcard, birthday, sex, district_name}}).then(res => {

      login({ data: { username, password, devicetype: 3, lastloginversion: globalData.version } }).then(res => {
        // 存储用户登录态
        wx.setStorageSync('token', res.infor[0].token)
        wx.setStorageSync('userId', res.infor[0].id)
        // 初始化修改密码态
        globalData.isUpdataPassword = false
        globalData.userInfo = res.infor[0]
        // 提示
        func.wxUtil.showToast({ title: '登陆成功！' })
        // 1秒后页面跳转
        setTimeout(() => {
          if (globalData.tabBar.some((item, index) => { item == url })) {
            wx.switchTab({
              url
            })
          } else {
            wx.redirectTo({
              url
            })
          }
        }, 1000)
      })
      wx.redirectTo({
        url: '../index/index'
      })
    })
  }
})