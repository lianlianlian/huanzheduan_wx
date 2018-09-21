// pages/comment-home/index.js
import { getCommentList } from '../../api/api.js'
const { globalData} = getApp()

function _getCommentList(content, data) {
  getCommentList({ data }).then(res => {
    let result = res.infor.listItems
    let commentList = content.data.commentList

    result = data.page === 0 ? result : [...commentList, ...result]

    content.setData({
      commentList: result,
      page: ++ data.page
    })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { keyId, keytype} = options

    this.setData({
      keyId,
      keytype
    })
    _getCommentList(this, { keytype, keyid: keyId, page: 0})
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const { keyid, keyId} = this.data

    _getCommentList(this, { keytype, keyid: keyId, page: 0 })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const { page, commentList, keytype, keyId} = this.data

    if (commentList.length >= page * globalData.pageSize) {
      _getCommentList(this, { keytype, keyid: keyId, page })
    }
  }
})