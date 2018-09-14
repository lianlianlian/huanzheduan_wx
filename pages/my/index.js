// pages/my/index.js
const { globalData, func} = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    tabNav: [
      {
        name: '筛查记录',
        src: '',
        img: '../../static/img/m-n-icon-1.png'
      },
      {
        name: '随访记录',
        src: '',
        img: '../../static/img/m-n-icon-2.png'
      },
      {
        name: '就诊记录',
        src: '',
        img: '../../static/img/m-n-icon-3.png'
      }
    ],
    list: [
      [{
        name: '我的收藏',
        src: '../my-collection/index',
        img: '../../static/img/m-icon-1.png'
      },
      {
        name: '我发布的',
        src: '../my-publish/index',
        img: '../../static/img/m-icon-2.png'
      },
      {
        name: '我的关注',
        src: '../my-concern/index',
        img: '../../static/img/m-icon-3.png'
      },
      {
        name: '我的留言',
        src: '../my-leave-message/index',
        img: '../../static/img/m-icon-4.png'
      }],
      [{
        name: '软件反馈',
        src: '../feed-back/index',
        img: '../../static/img/m-icon-5.png'
      },
      {
        name: '法律条款',
        src: '../provision/index',
        img: '../../static/img/m-icon-6.png'
      },
      {
        name: '设置',
        src: '../set/index',
        img: '../../static/img/m-icon-7.png'
      }]
    ]
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const isUpdataPassword = globalData.isUpdataPassword
    const url = globalData.loginNavigateUrl

    this.setData({
      id: wx.getStorageSync('userId') || '',
      show: true,
      userInfo: globalData.userInfo || {}
    })
    // 是否修改了密码
    if (isUpdataPassword) {
      func.wxUtil.showModal({ title: '密码修改提示', content: '您的密码已修改，确定重新登陆吗？', showCancel: false }).then(res => {
        if (res.confirm) {
          wx.navigateTo({
            url: '../login/index'
          })
        }
      })
    }
    // 登录成功后重定向页面链接
    if (url) {
      globalData.loginNavigateUrl = ''

      wx.navigateTo({
        url
      })
    }
  },
  nav(e) {
    const token = wx.getStorageSync('token')
    const { list } = this.data
    const { index, subindex } = e.currentTarget.dataset
    const url = list[index][subindex].src

    if (!token) {
      func.wxUtil.showToast({ title: '请先登录！' })
      setTimeout(() => {
        wx.navigateTo({
          url: '../login/index?url=' + url
        })
      },1000)
    } else {
      wx.navigateTo({
        url
      })
    }
  },
  goMyInfo() {
    wx.navigateTo({
      url: '../my-infor/index'
    })
  },
  login() {
    wx.navigateTo({
      url: '../login/index'
    })
  }
})