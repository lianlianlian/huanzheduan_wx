// pages/assess/index.js
import { addComment} from '../../api/api.js'
const {func} = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { keytype, id, clientId, clientName, commentId} = options

    this.setData({
      placeholder: clientName ? `评论${clientName}` :'写下评价内容吧...',
      reply_client_id: clientId || 0,
      reply_comment_id: commentId || 0,
      keytype,
      id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  inputContent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  submit() {
    const { keytype, id, content, reply_comment_id, reply_client_id} = this.data

    if (!content) {
      func.wxUtil.showToast({ title: '请输入评价内容！' })
      return false
    }
    addComment({ data: { keytype, keyid: id, reply_comment_id, reply_client_id, content} }).then(res => {
      func.wxUtil.showToast({ title: '发表成功！' })

      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 1000)
    })
  }
})