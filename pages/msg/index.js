// pages/msg/index.js
import { getMsgList, getTypeList} from '../../api/api.js';
const { globalData} = getApp()

function _getMsg(content, data) {
  getMsgList({ data }).then(res => {
    let result = res.infor.listItems
    let msgList = content.data.msgList

    result = data.page === 0 ? result : [...msgList, ...result]

    content.setData({
      msgList: result,
      page: ++ data.page
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
    keytype: 0,
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const { keytype} = this.data

    _getMsg(this, { keytype, page: 0})
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const { page, msgList, keytype } = this.data

    if (msgList.length >= page * globalData.pageSize) {
      _getMsg(this, { keytype, page})
    }
  }

})