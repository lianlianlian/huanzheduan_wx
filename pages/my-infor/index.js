// pages/my-infor/index.js
const { globalData, func} = getApp()
import { updataUser} from '../../api/api.js'

function _updataUser(content, data) {
  updataUser({data}).then(res => {
    globalData.userInfo = { ...globalData.userInfo, ...data}
    func.wxUtil.showToast({ title: '保存成功！' })

    setTimeout(() => {
      wx.switchTab({
        url: '../my/index'
      })
    })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    sexList: ['男', '女'],
    form: {
      realname: '',
      nickname: '',
      birthday: '',
      sex: '',
      idCard: '',
      avatar: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: globalData.userInfo
    })
  },
  chooseSex() {
    let { form, sexList} = this.data

    wx.showActionSheet({
      itemList: this.data.sexList,
      itemColor: '#000',
      success: (res) => {
        form.sex = sexList[res.tapIndex]

        this.setData({
          form
        })
      }
    })
  },
  chooseBirthday(e) {
    let {form} = this.data
    form.birthday = e.detail.value

    this.setData({
      form
    })
  },
  submit(e) {
    const { birthday, idcard, realname, nickname, sex } = e.detail.value
    const { avatar} = this.data

    _updataUser(this, { nickname, avatar, sex, birthday, idcard, realname})
  }
})