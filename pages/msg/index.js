// pages/msg/index.js
import { getMsgList, getTypeList} from '../../api/api.js';

function _getMsg(content, data) {
  getMsgList({ data }).then(res => {
    content.setData({
      msgList: res.infor.listItems
    })
  })
}
function _getTypeList(content, data) {
  getTypeList({data}).then(res => {
    console.log(res)
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    msgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _getTypeList(this, { keytype: 6})
    _getMsg(this, { keytype: 1, page: 0 })
  },
  add() {
    wx.navigateTo({
      url: '../msg-type/index'
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
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

})