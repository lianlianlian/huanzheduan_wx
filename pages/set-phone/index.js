// pages/set-password/index.js
const { func, globalData} = getApp()
import { verifyCode, updataUsername} from '../../api/api.js'

function _verifyCode(content, data) {
  verifyCode({data}).then(res => {
    const type = content.data.type
    const tempToken = res.infor[0].temp_token

    // 更换手机号
    if(type == 1) {

      _updataUsername(content, { temp_token: tempToken, username: data.username})
      // 找回密码
    } else if (type == 2) {
      wx.redirectTo({
        url: `../find-password/index?temp_token=${tempToken}`
      })
    }
  })
}
function _updataUsername(content, data) {
  updataUsername({data}).then(res => {
    func.wxUtil.showToast({ title: '手机号更换成功！' })
    globalData.userInfo = { ...globalData.userInfo, username: data.username}

    setTimeout(() => {
      wx.navigateBack({
        delta: 1,
      })
    }, 1000)
  })
}
// g更换手机号页面与找回密码输入手机号页面 ，根据type 作区分
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      username: '',
      code: ''
    },
    type: null    //  type 是2代表找回密码，需要去重置密码页面  ，否则是更换手机号，两者页面一直
  },
  onLoad: function (options) {
    const type = options.type
    // 设置导航头部文字
    wx.setNavigationBarTitle({
      title: type == 1 ? '更换手机号' : '找回密码'
    })
    this.setData({
      type
    })

  },
  sendCode(e) {
    let {form} = this.data
    form.code = e.detail

    this.setData({
      form
    })
  },
  inputUsername(e) {
    let { form } = this.data
    let value = e.detail.value
    form.username = value
    // phonePassword = value.subStr(0, 3) + '****' + value.subStr(-4)
    this.setData({
      form,
      // phonePassword
    })
  },
  submit() {
    const { form: { username, code}} = this.data

    if (!username || username == '') {
      func.wxUtil.showToast({ title: '请输入手机号！' })
      return false
    }
    if (!code || code == '') {
      func.wxUtil.showToast({ title: '请输入验证码！' })
      return false
    }
    _verifyCode(this, { username, code})
  }
})