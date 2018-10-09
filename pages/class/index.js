// pages/class/index.js
import { getMsgList, getTypeList} from '../../api/api.js';

function _getMsg(content, data) {
  getMsgList({ data }).then(res => {
    content.setData({
      msgList: res.infor.listItems
    })
  })
}
function _getTypeList(content, data) {
  getTypeList({ data }).then(res => {
    content.setData({
      nav: res.infor.listItems
    })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [],
    msgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _getTypeList(this, { keytype: 5})
    _getMsg(this, { keytype: 0, clienttype: 1, page: 0 })
  },

  nav(e) {
    const { index } = e.currentTarget.dataset
    const { nav } = this.data

    wx.navigateTo({
      url: '../class-mood-adjust/index?id=' + nav[index].id
    })
  },
  more(){
    wx.navigateTo({
      url: '../msg/index'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})