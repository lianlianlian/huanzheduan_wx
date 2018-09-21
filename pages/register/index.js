// pages/register/index.js
const {func} = getApp()
import { sendCode, verifyCode} from '../../api/api.js'
function _sendCode(content, data) {
  sendCode({data}).then(res => {
    let form = content.data.form
    form.code = 1234
    content.setData({
      form
    })
  }) 
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      username: '',
      code: '',
      password: '',
      againPassword: ''
    },
    checked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: options.url
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
  inputUsername(e) {
    let {form} = this.data;
    const value = e.detail.value
    form.username = value

    this.setData({
      form
    })
  },
  sendCode(e) {
    let { form } = this.data
    form.code = e.detail

    this.setData({
      form
    })
  },
  inputPassword(e) {
    let { form } = this.data;
    const value = e.detail.value
    form.password = value

    this.setData({
      form
    })
  },
  inputAgainPassword(e) {
    let { form } = this.data;
    const value = e.detail.value
    form.againPassword = value

    this.setData({
      form
    })
  },
  agree(e) {
    let { checked} = this.data

    this.setData({
      checked: !checked
    })
  },
  send() {
    const { form: { username} } = this.data
    if (!username || username == '') {
      func.wxUtil.showToast({ title: '请输入手机号！' })
      return false
    }

    _sendCode(this, { keytype: 1, username: this.data.form.username})
  },
  submit() {
    const { form: { username, code, password, againPassword }, url, checked} = this.data

    if (!username || username == ''){
      func.wxUtil.showToast({ title: '请输入手机号！' })
      return false
    }
    if (!code || code == '') {
      func.wxUtil.showToast({ title: '请输入验证码！' })
      return false
    }
    if (!password || password == '') {
      func.wxUtil.showToast({ title: '请输入密码！' })
      return false
    }
    if (!againPassword || againPassword == '') {
      func.wxUtil.showToast({ title: '请再次输入密码！' })
      return false
    }
    if (password != againPassword){
      func.wxUtil.showToast({ title: '两次输入密码不一致！' })
      return false
    }
    if (!checked) {
      func.wxUtil.showToast({ title: '请先同意注册协议！' })
      return false
    }

    verifyCode({ data: { username, code}}).then(res => {
      wx.redirectTo({
        url: `../improve/index?temp_token=${res.infor[0].temp_token}&username=${username}&password=${password}&url=${url}`
      })
    })
  }
})