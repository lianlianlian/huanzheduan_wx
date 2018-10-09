// pages/my-publish/index.js
import { getBlogList} from '../../api/api.js'
const { globalData} = getApp()

// 帖子列表
function _getBlogList(content, data) {
  getBlogList({ data }).then(res => {
    let { blogList } = content.data
    let result = res.infor.listItems

    result = data.page === 0 ? result : [...blogList, ...result]

    content.setData({
      blogList: result,
      page: ++data.page
    })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    blogList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _getBlogList(this, { keytype: 2, page: 0})
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    _getBlogList(this, { keytype: 2, page: 0 })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const { page, blogList } = this.data

    if (blogList.length >= page * globalData.pageSize) {
      _getBlogList(this, { keytype: 2, page })
    }
  }
})