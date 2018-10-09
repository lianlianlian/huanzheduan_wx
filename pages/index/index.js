//index.js
//获取应用实例
const { globalData, func} = getApp();
const util = require('../../utils/util.js');
import { getMsgList, getAdList, getMyDoctor, userDetail, getUnreadNumber} from '../../api/api.js';
// import cookies from '../../utils/vendor/weapp-cookie/index'

function _getMsg(content, data) {
  getMsgList({data}).then(res => {
    content.setData({
      msgList: res.infor.listItems
    })
  })
}
function _getAd(content, data) {
  getAdList({ data }).then(res => {
    content.setData({
      adList: res.infor.listItems
    })
  })
}
function _getMyDoctor(content) {
  getMyDoctor({ data: { parentid: 1}}).then(res => {
    console.log(res)
  })
}
function _userDetail(content, data) {
  userDetail({ data }).then(res => {
    const result = res.infor[0]
    globalData.userInfo = result
  })
}
function _getUnreadNumber(content) {
  getUnreadNumber().then(res => {
    let {nav} = content.data
    nav[2].num = res.infor[0].num

    content.setData({
      nav
    })
  })
}
Page({
  data: {
    nav: [
      {
        name: '心情测评',
        src: '../mood-evaluation/index'
      },
      {
        name: '随访',
        src: '../follow-up/index'
      },
      {
        name: '消息',
        src: '../news/index',
        isLogin: true
      }
    ]
  },
  onLoad: function (options) {
    // new app.func.WeToast();
    const id = wx.getStorageSync('userId')
    
    _getAd(this)
    _getMsg(this, { keytype: 0, clienttype: 1, page: 0})
    _getMyDoctor(this)

    if (id) {
      _userDetail(this, { id })
      _getUnreadNumber(this)
    }
  },
  onShow: function() {
    // 解决未登录进入，先登录，后进入该页面
    const url = globalData.loginNavigateUrl
    // 处理登录态失效后，重新登录，获取数据
    const isAgainGet = globalData.isAgainGet
    const pageUrlStore = wx.getStorageSync('pageUrlStore')
    const pageUrl = func.wxUtil.getPages()
    // 登台态失效，登录保存状态，比较失效的页面与该页面是否一致，如果符合，状态置位false，重新加载数据
    if (pageUrlStore == pageUrl && isAgainGet) {
      globalData.isAgainGet = false
      _getUnreadNumber(this)
    }
    // 如果存在url，则先清空保存的url，然后页面跳转
    if (url){
      globalData.loginNavigateUrl = ''

      wx.navigateTo({
        url
      })
    }
  },
  nav(e) {
    const { index } = e.currentTarget.dataset
    const { nav } = this.data
    const token = wx.getStorageSync('token')

    if (!nav[index].isLogin || nav[index].isLogin && token){
      wx.navigateTo({
        url: nav[index].src
      })
    } else {
      func.wxUtil.showToast({ title: '请先登录！' })
      setTimeout(() => {
        wx.navigateTo({
          url: '../login/index?url=' + func.wxUtil.getPages()
        })
      },1000)
    }
  },
  more() {
    wx.navigateTo({
      url: '../msg/index'
    })
  }
})
