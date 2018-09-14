// pages/revise-password/index.js
const { func, globalData } = getApp()
import { updataPassword } from '../../api/api.js'

function _updataPassword(content, data) {

  updataPassword({ data }).then(res => {

    func.wxUtil.showToast({ title: '密码重设成功！' })

      // 清楚用户登录态和用户信息，并且给个人中心页面登录提示
      wx.removeStorageSync('token')
      wx.removeStorageSync('userId')
      globalData.userInfo = null

      globalData.isUpdataPassword = true

      setTimeout(() => {
        wx.reLaunch({
          url: '../my/index'
        })
      }, 1000)
  })
}

Page({

  submit(e) {
    const { oldPassword, password, passwordAgain } = e.detail.value

    if (!oldPassword || oldPassword == '') {
      func.wxUtil.showToast({ title: '请输入旧密码！' })
      return false
    }
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
    _updataPassword(this, { keytype: 1, old_password: oldPassword, new_password: password })
  }
})