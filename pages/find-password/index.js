// pages/updata-password/index.js
const { func, globalData} = getApp()
import { resetPassword } from '../../api/api.js'

function _resetPassword(content, data) {

  resetPassword({ data }).then(res => {

    func.wxUtil.showToast({ title: '密码重设成功！' })

    setTimeout(() => {
      wx.navigateBack({
        delta: 1,
      })
    }, 1000)
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    temp_token: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { temp_token} = options

    this.setData({
      temp_token
    })
    
  },
  submit(e) {
    const { password, passwordAgain} = e.detail.value
    const { temp_token} = this.data

    if (!password || password == '') {
      func.wxUtil.showToast({ title: '请输入新密码！' })
      return false
    }
    if (!passwordAgain || passwordAgain == '') {
      func.wxUtil.showToast({ title: '请重新输入新密码！' })
      return false
    }
    if (passwordAgain != password) {
      func.wxUtil.showToast({ title: '两次密码输入不一致！' })
      return false
    }
    _resetPassword(this, { temp_token, keytype: 1, new_password: password})
  }
})