// pages/post-publish/index.js
import { addBlog} from '../../api/api.js'
const {func} = getApp()

function _addBlog(content, data) {
  addBlog({data}).then(res => {
    func.wxUtil.showToast({ title: '发表成功！' })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },
  submit(e) {
    const { content, title } = e.detail.value
    const {id} = this.data

    if (!title || title == '') {
      func.wxUtil.showToast({ title: '请输入帖子主题！' })
      return false
    }
    if (!content || content == '') {
      func.wxUtil.showToast({ title: '请输入帖子内容！' })
      return false
    }
    _addBlog(this, { title, content, type_id: id})
  }
})