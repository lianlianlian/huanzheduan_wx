// pages/msg-detail/index.js
const {func} = getApp()
const { getMsgDetail, updataMsg} = require('../../api/api.js');

function _getMsgDetail(content, data) {
  getMsgDetail({data}).then(res => {
    content.setData({
      msgDetail: res.infor[0]
    })
  })
}

function _updataMsg(content, data) {
  let { msgDetail } = content.data

  updataMsg({data}).then(res => {
    msgDetail.loveflag = msgDetail.loveflag == 0 ? 1 : 0
    func.wxUtil.showToast({ title: '操作成功！' })
    content.setData({
      msgDetail
    })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    msgDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options

    this.setData({
      id
    })
    _getMsgDetail(this, { article_id: id})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  collect() {
    let { msgDetail, id} = this.data
    let keytype = msgDetail.loveflag == 0 ? 1 : 0
    let token = wx.getStorageSync('token')

    if(!token) {
      func.wxUtil.showModal({ title: '温馨提示', content: '您未登录，请确定要登录吗？'}).then(res => {
        wx.navigateTo({
          url: `../login/index?url=${func.wxUtil.getPages()}`
        })
      })
      return false
    }
    _updataMsg(this, { keytype, article_id: id, clienttype: 1})
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})